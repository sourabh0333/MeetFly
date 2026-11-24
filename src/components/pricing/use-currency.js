"use client";

import { useEffect, useSyncExternalStore } from "react";

// The page's currency (USD / INR), shared by every pricing section: switching it in the hero
// changes the prices further down too. INR is picked once for visitors in India.
let current = "usd";
let guessed = false;
const subs = new Set();

const setCurrency = (c) => {
  current = c;
  subs.forEach((fn) => fn());
};

const subscribe = (fn) => {
  subs.add(fn);
  return () => subs.delete(fn);
};

export function useCurrency() {
  const cur = useSyncExternalStore(subscribe, () => current, () => "usd");
  useEffect(() => {
    if (guessed) return;
    guessed = true;
    try {
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || "";
      if (/Asia\/(Kolkata|Calcutta)/.test(tz)) setCurrency("inr");
    } catch {}
  }, []);
  return [cur, setCurrency];
}
