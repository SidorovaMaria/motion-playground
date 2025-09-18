import { useEffect, useState } from "react";

export function usePersistentBoolean(key: string, initial: boolean) {
  const [val, setVal] = useState(initial);

  // hydrate from localStorage on mount
  useEffect(() => {
    if (typeof window === "undefined") return;
    const raw = window.localStorage.getItem(key);
    if (raw !== null) setVal(raw === "1");
  }, [key]);

  // save whenever it changes
  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(key, val ? "1" : "0");
  }, [key, val]);

  return [val, setVal] as const;
}
