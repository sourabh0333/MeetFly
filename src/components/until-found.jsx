"use client";

import { useEffect, useRef } from "react";

// Text that's in the page (so search engines read it) but not shown until someone looks for it:
// `hidden="until-found"`. Visitors see the section's own design; the browser's find-in-page can
// still reach the words, and when it does it fires `beforematch`, so the section opens that item
// (`onFound`). Used for answers that only appear when their question is picked.
export function UntilFound({ onFound, className, children, as: Tag = "div" }) {
  const ref = useRef(null);
  const found = useRef(onFound);
  found.current = onFound;

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    // React writes a plain `hidden` on the server (the text is still in the HTML for crawlers);
    // in the browser it becomes "until-found", so find-in-page can reach it.
    el.setAttribute("hidden", "until-found");
    const handle = () => found.current?.();
    el.addEventListener("beforematch", handle);
    return () => el.removeEventListener("beforematch", handle);
  }, []);

  return (
    <Tag ref={ref} className={className} hidden>
      {children}
    </Tag>
  );
}
