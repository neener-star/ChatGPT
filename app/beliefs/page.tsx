"use client";

import { useEffect, useState } from "react";

type Belief = { id?: string; topic?: string; statement?: string; confidence?: number; evidence?: string[]; openness?: number };

export default function BeliefsPage() {
  const [beliefs, setBeliefs] = useState<Belief[]>([]);
  useEffect(() => { fetch("/api/august/state").then((r) => r.json()).then((d) => setBeliefs(d.beliefs ?? [])); }, []);

  return <main className="august-shell"><header className="topbar"><div className="brand"><span className="brand-mark">T.W.I.N.</span><span className="brand-name">AUGUST / BELIEF ANCHORS</span></div><div className="system-state"><span className="state-dot" /> OBSERVING</div></header><section style={{maxWidth:1000,margin:"0 auto",padding:"70px 28px"}}><div className="eyebrow">LIVING HYPOTHESES / {beliefs.length} ANCHORS</div><h1 style={{fontSize:"clamp(48px,8vw,100px)",letterSpacing:"-.06em",margin:"18px 0"}}>WHAT I<br/>THINK YOU BELIEVE.</h1><p className="subtitle">These are not facts. They are AUGUST's current hypotheses about you, built from evidence and allowed to change.</p><div style={{display:"grid",gap:14,marginTop:50}}>{beliefs.length === 0 ? <div style={{borderTop:"1px solid var(--line)",paddingTop:25,color:"var(--muted)"}}>No strong beliefs have been learned yet. Keep talking. AUGUST is listening.</div> : beliefs.map((b,i)=><article key={b.id ?? i} style={{borderTop:"1px solid var(--line)",padding:"24px 0",display:"grid",gridTemplateColumns:"1fr 2fr 160px",gap:20}}><div className="eyebrow">{b.topic ?? "UNKNOWN"}</div><div><strong>{b.statement}</strong><p style={{color:"var(--muted)",fontSize:13}}>Evidence: {b.evidence?.length ?? 0} signals · Openness: {Math.round((b.openness ?? 0)*100)}%</p></div><div className="eyebrow">CONFIDENCE {Math.round((b.confidence ?? 0)*100)}%</div></article>)}</div></section></main>;
}
