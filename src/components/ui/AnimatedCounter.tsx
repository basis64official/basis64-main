import { useEffect, useState, useRef } from "react";

interface AnimatedCounterProps {
  target: number;
  duration?: number;
}

export const AnimatedCounter = ({ target = 100, duration = 2000 }: AnimatedCounterProps) => {
  const [value, setValue] = useState(0);
  const prevTarget = useRef(0);

  useEffect(() => {
    let start: number | null = null;
    const initialValue = prevTarget.current;
    const change = target - initialValue;

    const step = (timestamp: number) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      setValue(Math.floor(initialValue + change * progress));
      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };

    requestAnimationFrame(step);
    prevTarget.current = target;
  }, [target, duration]);

  return <span>{value}</span>;
};
