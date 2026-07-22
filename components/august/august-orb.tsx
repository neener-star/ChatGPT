"use client";

import { useEffect, useMemo, useState } from "react";

export type OrbState = "idle" | "listening" | "thinking" | "remembering" | "uncertain" | "disagreeing" | "speaking";

export function AugustOrb({ state = "idle" }: { state?: OrbState }) {
  const [pointer, setPointer] = useState({ x: 0, y: 0 });
  const [blink, setBlink] = useState(false);

  useEffect(() => {
    const move = (event: MouseEvent) => {
      const x = Math.max(-1, Math.min(1, (event.clientX / window.innerWidth - 0.5) * 2));
      const y = Math.max(-1, Math.min(1, (event.clientY / window.innerHeight - 0.5) * 2));
      setPointer({ x, y });
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setBlink(true);
      window.setTimeout(() => setBlink(false), 110);
    }, 4200 + Math.random() * 3500);
    return () => window.clearInterval(timer);
  }, []);

  const pupilStyle = useMemo(() => ({
    transform: `translate(calc(-50% + ${pointer.x * 10}px), calc(-50% + ${pointer.y * 7}px))`,
  }), [pointer]);

  return (
    <div className={`august-orb-stage state-${state}`} aria-label={`AUGUST is ${state}`}>
      <div className="august-orb-aura" />
      <div className="august-orb">
        <div className={`august-orb-eye ${blink ? "blink" : ""}`}>
          <div className="august-orb-pupil" style={pupilStyle} />
          <div className="august-orb-glint" />
        </div>
      </div>
    </div>
  );
}
