"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [pupil, setPupil] = useState({ x: 0, y: 0 });
  const [state, setState] = useState("IDLE");

  useEffect(() => {
    const move = (event: MouseEvent) => {
      const x = Math.max(-18, Math.min(18, (event.clientX / window.innerWidth - 0.5) * 36));
      const y = Math.max(-18, Math.min(18, (event.clientY / window.innerHeight - 0.5) * 36));
      setPupil({ x, y });
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <main className="august-shell">
      <header className="topbar">
        <div className="brand">
          <span className="brand-mark">T.W.I.N.</span>
          <span className="brand-name">AUGUST</span>
        </div>
        <div className="system-state">
          <span className="state-dot" />
          SYSTEM / {state}
        </div>
      </header>

      <section className="hero">
        <div className="hero-copy">
          <div className="eyebrow">THE T.W.I.N. SYSTEM / 001</div>
          <h1 className="title">AUGUST</h1>
          <p className="subtitle">
            A personal behavioral twin. An evolving model of your language,
            memories, beliefs, contradictions, and the patterns that make you you.
          </p>
          <div className="actions">
            <button className="action primary" onClick={() => setState("LISTENING")}>INITIALIZE</button>
            <button className="action" onClick={() => setState("OBSERVING")}>OBSERVE</button>
          </div>
        </div>

        <div className="orb-stage">
          <div className="orb-label">ENTITY / AUGUST-01</div>
          <div className="orb-frame">
            <div className="orb-placeholder">
              <div className="orb">
                <div
                  className="pupil"
                  style={{ transform: `translate(calc(-50% + ${pupil.x}px), calc(-50% + ${pupil.y}px))` }}
                />
              </div>
            </div>
            <div className="orb-meta">
              <div>STATE / {state}</div>
              <div>MEMORY / INITIALIZING</div>
              <div>BEHAVIOR / OBSERVING</div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
