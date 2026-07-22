"use client";

import { useState } from "react";

export default function TrainingPage() {
  const [example, setExample] = useState("");
  const [correction, setCorrection] = useState("");
  const [saved, setSaved] = useState(false);

  return (
    <main className="august-shell">
      <header className="topbar">
        <div className="brand"><span className="brand-mark">T.W.I.N.</span><span className="brand-name">AUGUST / TRAINING</span></div>
        <div className="system-state"><span className="state-dot" /> TRAINING MODE</div>
      </header>
      <section style={{ maxWidth: 900, margin: "0 auto", padding: "70px 28px" }}>
        <div className="eyebrow">BEHAVIORAL CALIBRATION / 001</div>
        <h1 style={{ fontSize: "clamp(48px, 8vw, 100px)", letterSpacing: "-.06em", margin: "18px 0" }}>TEACH<br />AUGUST.</h1>
        <p className="subtitle">Show AUGUST how you actually communicate. Corrections become evidence, not commands.</p>

        <div style={{ display: "grid", gap: 20, marginTop: 50 }}>
          <label className="eyebrow">CONVERSATION / EXAMPLE</label>
          <textarea value={example} onChange={(e) => setExample(e.target.value)} placeholder="Paste a conversation, transcript, or example of how you talk..." style={{ minHeight: 180, padding: 20, border: "1px solid var(--line)", background: "rgba(255,255,255,.55)", font: "15px Inter", resize: "vertical" }} />
          <label className="eyebrow">CORRECTION / YOUR VERSION</label>
          <textarea value={correction} onChange={(e) => setCorrection(e.target.value)} placeholder="How would you have actually responded?" style={{ minHeight: 140, padding: 20, border: "1px solid var(--line)", background: "rgba(255,255,255,.55)", font: "15px Inter", resize: "vertical" }} />
          <button className="action primary" onClick={() => setSaved(true)}>{saved ? "EXAMPLE QUEUED" : "TEACH AUGUST"}</button>
        </div>

        <div style={{ marginTop: 70, paddingTop: 30, borderTop: "1px solid var(--line)", display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
          {[["TONE", "How you sound"], ["WORD CHOICE", "What you reach for"], ["RHYTHM", "How your thoughts move"]].map(([title, text]) => <div key={title}><div className="eyebrow">{title}</div><p style={{ color: "var(--muted)", lineHeight: 1.5 }}>{text}</p></div>)}
        </div>
      </section>
    </main>
  );
}
