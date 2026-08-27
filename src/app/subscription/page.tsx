"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/AuthContext";
import { useSubscription } from "@/components/SubscriptionContext";

export default function SubscriptionPage() {
  const { user } = useAuth();
  const { plan, planDetails, allPlans, subscription, loading, redeem, refresh } = useSubscription();
  const router = useRouter();
  const [code, setCode] = useState("");
  const [msg, setMsg] = useState("");
  const [busy, setBusy] = useState(false);

  if (!user) { router.push("/login"); return null; }

  const handleRedeem = async () => {
    if (!code.trim()) return;
    setBusy(true); setMsg("");
    const res = await redeem(code.trim());
    setMsg(res.message ?? (res.success ? "Erfolg!" : "Fehler"));
    setCode("");
    setBusy(false);
  };

  const planOrder = ["free", "freemium", "premium", "ultrimium"];

  return (
    <main className="mx-auto max-w-2xl space-y-6 px-4 py-8">
      <div className="flex items-center justify-between">
        <button onClick={() => router.push("/")} className="rounded-full bg-white/10 px-4 py-2 text-sm text-white backdrop-blur-md ring-1 ring-white/20 hover:bg-white/20">← Zurück</button>
        <h1 className="text-2xl font-bold">Abo & Pläne</h1>
      </div>

      {/* Current Plan */}
      <section className="rounded-3xl bg-white/10 p-6 backdrop-blur-md ring-1 ring-white/20 shadow-xl">
        <p className="text-sm uppercase tracking-widest text-white/60">Aktueller Plan</p>
        <div className="mt-3 flex items-center gap-3">
          <span className="text-3xl">{plan === "ultrimium" ? "💎" : plan === "premium" ? "👑" : plan === "freemium" ? "⭐" : "☁️"}</span>
          <div>
            <p className="text-2xl font-bold capitalize">{plan}</p>
            {subscription?.expiresAt && <p className="text-sm text-white/60">Gültig bis: {new Date(subscription.expiresAt).toLocaleDateString("de-DE")}</p>}
          </div>
        </div>
        <div className="mt-4 grid grid-cols-3 gap-3 text-center text-sm">
          <div className="rounded-2xl bg-white/10 p-3">
            <p className="text-white/60">Max. Städte</p>
            <p className="text-lg font-bold">{planDetails.maxLocations}</p>
          </div>
          <div className="rounded-2xl bg-white/10 p-3">
            <p className="text-white/60">Vorhersage-Tage</p>
            <p className="text-lg font-bold">{planDetails.forecastDays}</p>
          </div>
          <div className="rounded-2xl bg-white/10 p-3">
            <p className="text-white/60">Benachrichtigungen</p>
            <p className="text-lg font-bold">{planDetails.notifications ? "✓" : "✗"}</p>
          </div>
        </div>
      </section>

      {/* Redeem Code */}
      <section className="rounded-3xl bg-white/10 p-6 backdrop-blur-md ring-1 ring-white/20 shadow-xl">
        <p className="text-sm uppercase tracking-widest text-white/60">Code einlösen</p>
        <div className="mt-3 flex gap-2">
          <input value={code} onChange={e => setCode(e.target.value)} placeholder="Code eingeben..."
            className="flex-1 rounded-xl bg-white/15 px-4 py-3 text-white placeholder-white/50 outline-none ring-1 ring-white/20 focus:ring-2 focus:ring-white/60" />
          <button onClick={handleRedeem} disabled={busy || !code.trim()}
            className="rounded-xl bg-white px-5 py-3 font-semibold text-sky-700 transition hover:bg-white/90 disabled:opacity-50">
            {busy ? "..." : "Einlösen"}
          </button>
        </div>
        {msg && <p className="mt-2 text-sm text-white/80">{msg}</p>}
      </section>

      {/* All Plans */}
      <section className="rounded-3xl bg-white/10 p-6 backdrop-blur-md ring-1 ring-white/20 shadow-xl">
        <p className="text-sm uppercase tracking-widest text-white/60">Alle Pläne</p>
        <div className="mt-3 space-y-3">
          {planOrder.map(p => {
            const details = allPlans[p];
            if (!details) return null;
            const isCurrent = p === plan;
            return (
              <div key={p} className={`flex items-center justify-between rounded-2xl p-4 ring-1 transition ${isCurrent ? "bg-white/15 ring-white/40" : "bg-white/5 ring-white/10"}`}>
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{p === "ultrimium" ? "💎" : p === "premium" ? "👑" : p === "freemium" ? "⭐" : "☁️"}</span>
                  <div>
                    <p className="font-semibold capitalize">{p}</p>
                    <p className="text-xs text-white/60">{details.maxLocations} Städte · {details.forecastDays} Tage · {details.notifications ? "Benachrichtigungen" : ""}</p>
                  </div>
                </div>
                {isCurrent && <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-medium">Aktuell</span>}
              </div>
            );
          })}
        </div>
      </section>

      <button onClick={refresh} className="w-full rounded-xl bg-white/10 py-3 text-sm text-white/70 transition hover:bg-white/20">Aktualisieren</button>
    </main>
  );
}
