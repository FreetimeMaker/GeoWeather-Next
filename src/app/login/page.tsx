"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/AuthContext";
import { getSupabase } from "@/lib/supabase/client";

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

  const handleOAuth = async (provider: "github" | "gitlab") => {
    const sb = getSupabase();
    if (!sb) { setErr("Supabase nicht konfiguriert"); return; }
    setBusy(true);
    setErr("");
    const { error } = await sb.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${window.location.origin}/`,
      },
    });
    if (error) { setErr(error.message); setBusy(false); }
  };

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

        <div className="space-y-3 rounded-3xl bg-white/10 p-6 backdrop-blur-md ring-1 ring-white/20 shadow-xl">
          {/* OAuth Buttons */}
          <button
            onClick={() => handleOAuth("github")}
            disabled={busy}
            className="flex w-full items-center justify-center gap-3 rounded-xl bg-[#24292F] py-3 font-medium text-white transition hover:bg-[#32383F] disabled:opacity-50"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
            </svg>
            Mit GitHub anmelden
          </button>

          <button
            onClick={() => handleOAuth("gitlab")}
            disabled={busy}
            className="flex w-full items-center justify-center gap-3 rounded-xl bg-[#FC6D26] py-3 font-medium text-white transition hover:bg-[#E55A1B] disabled:opacity-50"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
              <path d="M23.955 13.587l-1.342-4.135-2.664-8.189a.455.455 0 00-.867 0L16.418 9.45H7.582L4.918 1.263a.455.455 0 00-.867 0L1.387 9.452.045 13.587a.924.924 0 00.331 1.023L12 23.952l11.624-9.341a.92.92 0 00.33-1.024"/>
            </svg>
            Mit GitLab anmelden
          </button>

          {/* Divider */}
          <div className="relative flex items-center py-2">
            <div className="flex-grow border-t border-white/20" />
            <span className="mx-3 text-xs text-white/50">oder</span>
            <div className="flex-grow border-t border-white/20" />
          </div>

          {/* Email/Password Form */}
          <form onSubmit={handleSubmit} className="space-y-3">
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
        </div>

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
