"use client";

import { useEffect, useState } from "react";
import { formatRupiah } from "@/lib/utils";

type AnimatedAmountProps = {
  value: number;
  className?: string;
};

export function AnimatedAmount({ value, className }: AnimatedAmountProps) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    let frame = 0;
    const totalFrames = 46;
    const start = performance.now();

    const animate = () => {
      frame += 1;
      const progress = Math.min(frame / totalFrames, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(value * eased));

      if (performance.now() - start < 1200 && progress < 1) {
        window.requestAnimationFrame(animate);
      }
    };

    const id = window.requestAnimationFrame(animate);
    return () => window.cancelAnimationFrame(id);
  }, [value]);

  return <span className={className}>{formatRupiah(display)}</span>;
}
