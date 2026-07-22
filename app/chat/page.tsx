"use client";

import { FormEvent, useState } from "react";

type Message = { role: "you" | "august"; content: string };

type Behavior = {
  orbState?: string;
  confidence?: number;
  emotionalIntensity?: number;
};

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [behavior, setBehavior] = useState<Behavior>({ orbState: "idle" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function send(event: FormEvent) {
    event.preventDefault();
    const message = input.trim();
    if (!message || loading) return;

    setInput("");
    setError("");
    setMessages((current) => [...current, { role: "you", content: message }]);
    setLoading(true);
    setBehavior({ orbState: "thinking" });

    try {
      const response = await fetch("/api/august", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error ?? "AUGUST could not respond.");

      setBehavior(data.behavior ?? { orbState: "speaking" });
      setMessages((current) => [
        ...current,
        { role: "august", content: data.response ?? data.message ?? "AUGUST is connected, but the local model is not configured yet." },
      ]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setBehavior({ orbState: "uncertain" });
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="august-shell">
      <header className="topbar">
        <div className="brand"><span className="brand-mark">T.W.I.N.</span><span className="brand-name">AUGUST / CONVERSATION</span></div>
        <div className="system-state"><span className="state-dot" /> {String(behavior.orbState ?? "idle").toUpperCase()}</div>
      </header>

      <section style={{ maxWidth: 920, margin: "0 auto", padding: "48px 24px 110px" }}>
        <div className="orb-stage" style={{ height: 250, minHeight: 250 }}>
          <div className="orb-frame" style={{ inset: "5% 20%" }}>
            <div className="orb-placeholder">
              <div className="orb" style={{ width: 150, height: 150, minWidth: 150, minHeight: 150 }}>
                <div className="pupil" style={{ width: 42, height: 42 }} />
              </div>
            </div>
          </div>
        </div>

        <div style={{ display: "grid", gap: 14, marginBottom: 28 }}>
          {messages.length === 0 && <p style={{ color: "var(--muted)", fontFamily: "DM Mono", fontSize: 12 }}>AUGUST IS LISTENING. SAY SOMETHING.</p>}
          {messages.map((message, index) => (
            <div key={`${message.role}-${index}`} style={{ display: "flex", justifyContent: message.role === "you" ? "flex-end" : "flex-start" }}>
              <div style={{ maxWidth: "78%", padding: "15px 18px", border: "1px solid var(--line)", background: message.role === "you" ? "var(--ink)" : "rgba(255,255,255,.65)", color: message.role === "you" ? "var(--white)" : "var(--ink)", lineHeight: 1.55 }}>
                <div style={{ font: "10px DM Mono", opacity: .55, marginBottom: 7 }}>{message.role === "you" ? "YOU" : "AUGUST"}</div>
                {message.content}
              </div>
            </div>
          ))}
          {loading && <div style={{ color: "var(--muted)", fontFamily: "DM Mono", fontSize: 12 }}>AUGUST IS THINKING...</div>}
        </div>

        {error && <p style={{ color: "#b42318", fontSize: 13 }}>{error}</p>}
        <form onSubmit={send} style={{ display: "flex", gap: 10 }}>
          <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Talk to AUGUST..." style={{ flex: 1, padding: "15px 16px", border: "1px solid var(--line)", background: "rgba(255,255,255,.7)", outline: "none" }} />
          <button className="action primary" disabled={loading}>{loading ? "..." : "SEND"}</button>
        </form>
        <div style={{ display: "flex", gap: 24, marginTop: 18, color: "var(--muted)", font: "10px DM Mono" }}>
          <span>CONFIDENCE / {Math.round((behavior.confidence ?? 0) * 100)}%</span>
          <span>INTENSITY / {Math.round((behavior.emotionalIntensity ?? 0) * 100)}%</span>
        </div>
      </section>
    </main>
  );
}
