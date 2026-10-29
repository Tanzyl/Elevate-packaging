"use client";

import { useEffect, useState } from "react";

export function useCountUp(target: number, start: boolean, duration = 1.6) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!start) return;
    let raf = 0;
    let begin: number | null = null;
    const tick = (t: number) => {
      if (begin === null) begin = t;
      const p = Math.min(1, (t - begin) / (duration * 1000));
      const eased = 1 - Math.pow(1 - p, 4);
      setValue(eased * target);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, start, duration]);

  return value;
}
