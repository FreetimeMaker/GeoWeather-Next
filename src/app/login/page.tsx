"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/AuthContext";

export default function LoginPage() {
  const { login, signup } = useAuth();
  const router = useRouter();
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr("");
    if (mode === "signup" && password !== confirm) { setErr("Passwords don't match"); return; }
    setBusy(true);
    try {
      if (mode === "login") await login(email, password);
      else await signup(email, password);
      router.push("/");
    } catch { setErr("Authentication failed"); } finally { setBusy(false); }
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/15 text-4xl shadow-inner ring-1 ring-white/25">🌤️</div>
          <h1 className="text-3xl font-bold">{mode === "login" ? "Welcome Back" : "Create Account"}</h1>
          <p className="mt-1 text-white/70">{mode === "login" ? "Sign in to sync your cities" : "Create an account to get started"}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 rounded-3xl bg-white/10 p-6 backdrop-blur-md ring-1 ring-white/20 shadow-xl">
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" required
            className="w-full rounded-xl bg-white/15 px-4 py-3 text-white placeholder-white/50 outline-none ring-1 ring-white/20 focus:ring-2 focus:ring-white/60" />
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" required
            className="w-full rounded-xl bg-white/15 px-4 py-3 text-white placeholder-white/50 outline-none ring-1 ring-white/20 focus:ring-2 focus:ring-white/60" />
          {mode === "signup" && (
            <input type="password" value={confirm} onChange={e => setConfirm(e.target.value)} placeholder="Confirm Password" required
              className="w-full rounded-xl bg-white/15 px-4 py-3 text-white placeholder-white/50 outline-none ring-1 ring-white/20 focus:ring-2 focus:ring-white/60" />
          )}
          {err && <p className="text-sm text-red-300">{err}</p>}
          <button type="submit" disabled={busy}
            className="w-full rounded-xl bg-white py-3 font-semibold text-sky-700 transition hover:bg-white/90 disabled:opacity-50">
            {busy ? "..." : mode === "login" ? "Login" : "Sign Up"}
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-white/70">
          {mode === "login" ? "Don't have an account? " : "Already have an account? "}
          <button onClick={() => { setMode(mode === "login" ? "signup" : "login"); setErr(""); }}
            className="font-semibold text-white underline">
            {mode === "login" ? "Sign Up" : "Login"}
          </button>
        </p>
      </div>
    </div>
  );
}
