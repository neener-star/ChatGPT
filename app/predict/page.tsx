"use client";

import { useState } from "react";

export default function PredictPage() {
  const [scenario, setScenario] = useState("");
  const [answer, setAnswer] = useState("");
  const [prediction, setPrediction] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function reveal() {
    setSubmitted(true);
    setPrediction("AUGUST's prediction engine will appear here once the local model is connected to the scenario evaluator.");
  }

  return <main className="august-shell"><header className="topbar"><div className="brand"><span className="brand-mark">T.W.I.N.</span><span className="brand-name">AUGUST / PREDICT ME</span></div><div className="system-state"><span className="state-dot" /> SIMULATION</div></header><section style={{maxWidth:900,margin:"0 auto",padding:"70px 28px"}}><div className="eyebrow">BEHAVIORAL MIRROR / 001</div><h1 style={{fontSize:"clamp(48px,8vw,100px)",letterSpacing:"-.06em",margin:"18px 0"}}>WHAT<br/>WOULD YOU DO?</h1><p className="subtitle">AUGUST predicts your response before you give it. Then you find out how close it got.</p><textarea value={scenario} onChange={e=>setScenario(e.target.value)} placeholder="Give yourself a scenario..." style={{width:"100%",minHeight:150,marginTop:45,padding:20,border:"1px solid var(--line)",background:"rgba(255,255,255,.6)",font:"15px Inter"}}/><button className="action primary" style={{marginTop:14}} onClick={reveal} disabled={!scenario.trim()}>PREDICT ME</button>{submitted&&<div style={{display:"grid",gap:20,marginTop:45}}><div><div className="eyebrow">AUGUST'S PREDICTION</div><div style={{padding:20,border:"1px solid var(--line)",marginTop:10}}>{prediction}</div></div><div><div className="eyebrow">YOUR ACTUAL RESPONSE</div><textarea value={answer} onChange={e=>setAnswer(e.target.value)} placeholder="Now answer honestly..." style={{width:"100%",minHeight:120,padding:20,border:"1px solid var(--line)",marginTop:10,background:"rgba(255,255,255,.6)"}}/></div></div>}</section></main>;
}
