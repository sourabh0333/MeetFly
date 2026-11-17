"use client";

import { useEffect, useRef, useState } from "react";
import { featureGroups, featuresPage } from "@/content/features";
import styles from "./feature-reels.module.css";

// The Features hero's reels. Four rows, one per part of the call (01 Before, 02 During, 03 After,
// 04 Everywhere), laid out on a grid: the row's name | the reel | a counter. Each reel drifts
// sideways (rows alternate direction) and bends like a drum: names curve away into depth and fade
// towards the edges, and turn sharp ink in the lens in the middle. Scrolling the page speeds the
// reels up; you can drag or fling a reel. Every few seconds the next row slides its nearest name
// exactly into the lens and that feature is picked; what it does shows below. Hover holds a row;
// hover, focus or tap a name to pick it. /features#<id> picks it too. The right column counts
// which of the row's features is in the lens; two hairlines frame the lens down all four rows.
// All motion is one rAF loop writing transforms directly, and only while the reels are on screen.
const ORDER = ["before", "during", "after", "everywhere"];
const groups = ORDER.map((id) => featureGroups.find((g) => g.id === id));
const all = groups.flatMap((g) => g.items.map((f) => ({ ...f, group: g })));
const COPIES = 5;
const SPEED = 26; // px per second
const CYCLE = 2800;

const Spark = () => (
  <svg className={styles.spark} viewBox="0 0 24 24" aria-hidden="true">
    <path d="M12 2.5l2.2 7.3 7.3 2.2-7.3 2.2L12 21.5l-2.2-7.3L2.5 12l7.3-2.2z" />
  </svg>
);

export function FeatureReels() {
  const wrapRef = useRef(null);
  const windows = useRef([]);
  const counters = useRef([]);
  const rows = useRef(groups.map(() => ({ x: 0, v: 0, target: null, hold: 0, hover: false, drag: null })));
  const api = useRef({});
  const [activeId, setActiveId] = useState(all[0].id);
  const touched = useRef(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let geo = []; // per row: { W, L, items: [{ el, id, c, w }] }
    let frame = 0;
    let last = 0;
    let onScreen = false;
    let lastScroll = window.scrollY;
    let boost = 0;

    const measure = () => {
      geo = windows.current.map((win) => {
        const items = [...win.querySelectorAll("li")].map((el) => ({
          el,
          id: el.dataset.id,
          c: el.offsetLeft + el.offsetWidth / 2,
          w: el.offsetWidth,
        }));
        const n = items.length / COPIES;
        // The gauge marks where the visible reel starts (it sits at the edge of the name column).
        const inset = win.querySelector("[data-gauge]").offsetLeft;
        return { W: win.clientWidth, half: Math.max(120, win.clientWidth / 2 - inset), L: items[n].c - items[0].c, items };
      });
      rows.current.forEach((r, i) => {
        if (!r.x) r.x = -geo[i].L * 1.5;
      });
    };

    // Keep x inside one loop length, shifting a running slide target with it.
    const wrap = (r, L) => {
      let shift = 0;
      while (r.x + shift > -L) shift -= L;
      while (r.x + shift <= -2 * L) shift += L;
      r.x += shift;
      if (r.target != null) r.target += shift;
    };

    const paint = (i) => {
      const r = rows.current[i];
      const g = geo[i];
      const track = windows.current[i].firstChild;
      track.style.transform = `translate3d(${r.x.toFixed(2)}px,0,0)`;
      const mid = g.W / 2;
      let near = -1;
      let nearD = Infinity;
      g.items.forEach((it, k) => {
        const dd = Math.abs(it.c + r.x - mid);
        if (dd < nearD) {
          nearD = dd;
          near = k;
        }
      });
      // The row's counter: which of its features is nearest the lens.
      const n = g.items.length / COPIES;
      const label = `${String((near % n) + 1).padStart(2, "0")} / ${String(n).padStart(2, "0")}`;
      const out = counters.current[i];
      if (out && out.textContent !== label) out.textContent = label;
      for (const it of g.items) {
        const cx = it.c + r.x;
        if (cx < -it.w || cx > g.W + it.w) continue;
        const d = Math.max(-1.2, Math.min(1.2, (cx - mid) / g.half));
        const focus = Math.max(0, 1 - Math.abs(cx - mid) / (it.w / 2 + 170));
        const a = Math.abs(d);
        it.el.style.transform = `rotateY(${(d * -38).toFixed(2)}deg) translateZ(${(-a * 140).toFixed(1)}px) scale(${(1 - a * 0.12).toFixed(3)})`;
        it.el.style.opacity = (0.2 + 0.8 * Math.min(1, focus * 1.25)).toFixed(3) * (1 - Math.max(0, a - 0.85) * 2.2);
      }
    };

    const nearest = (i) => {
      const g = geo[i];
      const r = rows.current[i];
      const mid = g.W / 2;
      let best = 0;
      let dist = Infinity;
      g.items.forEach((it, k) => {
        const dd = Math.abs(it.c + r.x - mid);
        if (dd < dist) {
          dist = dd;
          best = k;
        }
      });
      return { k: best, it: g.items[best] };
    };

    const center = (i, k) => {
      const g = geo[i];
      const r = rows.current[i];
      r.target = r.x + (g.W / 2 - (g.items[k].c + r.x));
      r.v = 0;
      if (!frame) frame = requestAnimationFrame(tick);
    };

    const tick = (now) => {
      frame = 0;
      const dt = Math.min(0.05, last ? (now - last) / 1000 : 0.016);
      last = now;
      const dy = window.scrollY - lastScroll;
      lastScroll = window.scrollY;
      boost += (Math.max(-60, Math.min(60, dy)) * 14 - boost) * Math.min(1, dt * 6);
      rows.current.forEach((r, i) => {
        const dir = i % 2 ? 1 : -1;
        if (r.drag) {
          // moved by the pointer
        } else if (r.target != null) {
          r.x += (r.target - r.x) * (1 - Math.exp(-dt * 7));
          if (Math.abs(r.target - r.x) < 0.4) {
            r.x = r.target;
            r.target = null;
            r.hold = now + 1600;
          }
        } else {
          r.x += r.v * dt;
          r.v *= Math.exp(-dt * 3.5);
          if (!reduce && !r.hover && now > r.hold) r.x += dir * (SPEED + Math.abs(boost)) * dt;
        }
        wrap(r, geo[i].L);
        paint(i);
      });
      if (onScreen && !reduce) frame = requestAnimationFrame(tick);
    };

    measure();
    rows.current.forEach((_, i) => paint(i));

    // Auto-pick: the next row slides its nearest name into the lens.
    let rowTurn = 0;
    const auto = () => {
      if (touched.current || !onScreen) return;
      const i = rowTurn % ORDER.length;
      rowTurn += 1;
      const { k, it } = nearest(i);
      center(i, k);
      setActiveId(it.id);
    };
    const autoId = reduce ? 0 : setInterval(auto, CYCLE);

    const io = new IntersectionObserver(([e]) => {
      onScreen = e.isIntersecting;
      if (onScreen && !frame) {
        last = 0;
        frame = requestAnimationFrame(tick);
      }
    });
    io.observe(wrapRef.current);
    const onResize = () => {
      measure();
      rows.current.forEach((_, i) => paint(i));
    };
    window.addEventListener("resize", onResize);

    api.current = {
      pickAt: (i, k) => {
        center(i, k);
        setActiveId(geo[i].items[k].id);
      },
      centerId: (id) => {
        const i = groups.findIndex((g) => g.items.some((f) => f.id === id));
        const g = geo[i];
        const r = rows.current[i];
        let best = 0;
        let dist = Infinity;
        g.items.forEach((it, k) => {
          const dd = Math.abs(it.c + r.x - g.W / 2);
          if (it.id === id && dd < dist) {
            dist = dd;
            best = k;
          }
        });
        api.current.pickAt(i, best);
      },
      kick: () => {
        if (!frame) frame = requestAnimationFrame(tick);
      },
    };

    const fromHash = () => {
      const f = all.find((x) => `#${x.id}` === window.location.hash);
      if (f) {
        touched.current = true;
        api.current.centerId(f.id);
        wrapRef.current.scrollIntoView({ block: "center", behavior: "smooth" });
      }
    };
    fromHash();
    window.addEventListener("hashchange", fromHash);

    return () => {
      cancelAnimationFrame(frame);
      clearInterval(autoId);
      io.disconnect();
      window.removeEventListener("resize", onResize);
      window.removeEventListener("hashchange", fromHash);
    };
  }, []);

  const pick = (id) => {
    touched.current = true;
    setActiveId(id);
  };

  // Drag / fling a reel. Pointer capture starts only once it really moves, so taps still click.
  const dragHandlers = (i) => ({
    onPointerDown: (e) => {
      rows.current[i].drag = { x0: e.clientX, last: e.clientX, t: performance.now(), moved: false, id: e.pointerId };
    },
    onPointerMove: (e) => {
      const r = rows.current[i];
      const d = r.drag;
      if (!d) return;
      const dx = e.clientX - d.last;
      if (!d.moved && Math.abs(e.clientX - d.x0) > 6) {
        d.moved = true;
        r.target = null;
        e.currentTarget.setPointerCapture(d.id);
      }
      if (d.moved) {
        const now = performance.now();
        r.x += dx;
        r.v = (dx / Math.max(1, now - d.t)) * 1000;
        d.t = now;
        api.current.kick?.();
      }
      d.last = e.clientX;
    },
    onPointerUp: () => {
      const r = rows.current[i];
      if (r.drag?.moved) touched.current = true;
      r.dragged = r.drag?.moved;
      r.drag = null;
    },
    onPointerCancel: () => {
      rows.current[i].drag = null;
    },
    onClickCapture: (e) => {
      if (rows.current[i].dragged) {
        e.preventDefault();
        e.stopPropagation();
        rows.current[i].dragged = false;
      }
    },
    onPointerEnter: (e) => {
      if (e.pointerType === "mouse") rows.current[i].hover = true;
    },
    onPointerLeave: () => {
      rows.current[i].hover = false;
    },
  });

  const cur = all.find((f) => f.id === activeId);
  const n = all.indexOf(cur) + 1;

  return (
    <div ref={wrapRef} className={styles.wrap} style={{ "--tone": cur.group.tone }}>
      <p className={styles.sr}>{featuresPage.stageLabel}</p>
      <div className={styles.rows}>
        <span className={styles.frame} aria-hidden="true" />
        {groups.map((g, gi) => {
          const items = Array.from({ length: COPIES }, () => g.items).flat();
          return (
            <div key={g.id} className={styles.row} style={{ "--tone": g.tone }} data-on={cur.group.id === g.id || undefined}>
              <p className={styles.name}>
                <span>{g.n}</span>
                <b>{g.id === "everywhere" ? featuresPage.railLabel : g.title}</b>
                <em>{g.items.length}</em>
              </p>
              <div className={styles.window} ref={(el) => (windows.current[gi] = el)} {...dragHandlers(gi)}>
                <ul className={styles.track}>
                  {items.map((f, k) => {
                    const first = k >= g.items.length && k < g.items.length * 2;
                    return (
                      <li key={`${f.id}-${k}`} data-id={f.id} id={first ? f.id : undefined}>
                        <button
                          type="button"
                          tabIndex={first ? 0 : -1}
                          aria-hidden={!first || undefined}
                          aria-pressed={first ? f.id === activeId : undefined}
                          data-on={f.id === activeId || undefined}
                          onPointerEnter={(e) => e.pointerType === "mouse" && pick(f.id)}
                          onFocus={() => {
                            touched.current = true;
                            api.current.centerId?.(f.id);
                          }}
                          onClick={() => {
                            touched.current = true;
                            api.current.pickAt?.(gi, k);
                          }}
                        >
                          {f.name}
                        </button>
                        <Spark />
                      </li>
                    );
                  })}
                </ul>
                <span className={styles.lens} aria-hidden="true" />
                <span className={styles.gauge} data-gauge aria-hidden="true" />
              </div>
              <p className={styles.count} aria-hidden="true">
                <span ref={(el) => (counters.current[gi] = el)}>01 / {String(g.items.length).padStart(2, "0")}</span>
              </p>
            </div>
          );
        })}
      </div>

      {/* What the picked feature does, on the same grid as the rows: where | what | how far. */}
      <div className={styles.detail}>
        <p className={styles.where}>
          <i aria-hidden="true" />
          <span>{cur.group.title}</span>
          <b>
            {String(n).padStart(2, "0")} / {all.length}
          </b>
        </p>
        <div className={styles.detailBody} key={cur.id} aria-live="polite">
          <h2>{cur.name}</h2>
          <p className={styles.text}>{cur.text}</p>
          {cur.chips && (
            <p className={styles.chips}>
              {cur.chips.map((c) => (
                <span key={c}>{c}</span>
              ))}
            </p>
          )}
        </div>
        <p className={styles.ticks} aria-hidden="true">
          {all.map((f) => (
            <i key={f.id} style={{ "--tone": f.group.tone }} data-on={f.id === activeId || undefined} />
          ))}
        </p>
      </div>
    </div>
  );
}
