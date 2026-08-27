"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/AuthContext";

export default function LoginPage() {
  const { user, login, signup, loading: authLoading } = useAuth();
  const router = useRouter();
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [name, setName] = useState("");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");
  const [success, setSuccess] = useState("");

  if (authLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-white/30 border-t-white" />
      </div>
    );
  }

  if (user) {
    router.push("/");
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr("");
    setSuccess("");

    if (mode === "signup" && password !== confirm) {
      setErr("Passwörter stimmen nicht überein");
      return;
    }
    if (password.length < 6) {
      setErr("Passwort muss mindestens 6 Zeichen lang sein");
      return;
    }

    setBusy(true);
    try {
      if (mode === "login") {
        const res = await login(email, password);
        if (res.error) { setErr(res.error); return; }
        router.push("/");
      } else {
        const res = await signup(email, password, name);
        if (res.error) { setErr(res.error); return; }
        setSuccess("Bestätigungs-E-Mail gesendet! Bitte E-Mail-Bestätigung abschließen.");
      }
    } catch {
      setErr("Ein Fehler ist aufgetreten");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/15 text-4xl shadow-inner ring-1 ring-white/25">
            🌤️
          </div>
          <h1 className="text-3xl font-bold">
            {mode === "login" ? "Willkommen zurück" : "Konto erstellen"}
          </h1>
          <p className="mt-1 text-white/70">
            {mode === "login"
              ? "Melde dich an, um deine Städte zu synchronisieren"
              : "Erstelle ein Konto, um loszulegen"}
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-4 rounded-3xl bg-white/10 p-6 backdrop-blur-md ring-1 ring-white/20 shadow-xl"
        >
          {mode === "signup" && (
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="Name (optional)"
              className="w-full rounded-xl bg-white/15 px-4 py-3 text-white placeholder-white/50 outline-none ring-1 ring-white/20 focus:ring-2 focus:ring-white/60"
            />
          )}
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="E-Mail"
            required
            className="w-full rounded-xl bg-white/15 px-4 py-3 text-white placeholder-white/50 outline-none ring-1 ring-white/20 focus:ring-2 focus:ring-white/60"
          />
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Passwort"
            required
            minLength={6}
            className="w-full rounded-xl bg-white/15 px-4 py-3 text-white placeholder-white/50 outline-none ring-1 ring-white/20 focus:ring-2 focus:ring-white/60"
          />
          {mode === "signup" && (
            <input
              type="password"
              value={confirm}
              onChange={e => setConfirm(e.target.value)}
              placeholder="Passwort bestätigen"
              required
              minLength={6}
              className="w-full rounded-xl bg-white/15 px-4 py-3 text-white placeholder-white/50 outline-none ring-1 ring-white/20 focus:ring-2 focus:ring-white/60"
            />
          )}

          {err && <p className="rounded-lg bg-red-500/20 px-3 py-2 text-sm text-red-200">{err}</p>}
          {success && <p className="rounded-lg bg-green-500/20 px-3 py-2 text-sm text-green-200">{success}</p>}

          <button
            type="submit"
            disabled={busy}
            className="w-full rounded-xl bg-white py-3 font-semibold text-sky-700 transition hover:bg-white/90 disabled:opacity-50"
          >
            {busy ? "..." : mode === "login" ? "Anmelden" : "Registrieren"}
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-white/70">
          {mode === "login" ? "Noch kein Konto? " : "Bereits ein Konto? "}
          <button
            onClick={() => { setMode(mode === "login" ? "signup" : "login"); setErr(""); setSuccess(""); }}
            className="font-semibold text-white underline"
          >
            {mode === "login" ? "Registrieren" : "Anmelden"}
          </button>
        </p>
      </div>
    </div>
  );
}
