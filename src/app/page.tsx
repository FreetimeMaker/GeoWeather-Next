"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "@/components/AuthContext";
import CitySearch from "@/components/CitySearch";
import CityCard from "@/components/CityCard";
import SettingsPanel from "@/components/SettingsPanel";
import { useCities } from "@/components/CitiesContext";

export default function Home() {
  const { cities } = useCities();
  const { user, logout } = useAuth();
  const router = useRouter();

  if (!user) {
    if (typeof window !== "undefined") router.push("/login");
    return null;
  }

  return (
    <main className="mx-auto max-w-4xl space-y-6 px-4 py-8">
      <header className="flex items-center justify-between">
        <div className="text-center flex-1">
          <div className="mx-auto mb-2 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15 text-3xl shadow-inner ring-1 ring-white/25">🌤️</div>
          <h1 className="text-3xl font-bold">GeoWeather</h1>
          <p className="text-white/70">A modern weather app</p>
        </div>
        <button onClick={() => { logout(); router.push("/login"); }}
          className="rounded-full bg-white/15 px-4 py-2 text-sm text-white backdrop-blur-md ring-1 ring-white/20 hover:bg-white/25">
          Logout
        </button>
      </header>

      <div className="flex justify-center"><CitySearch /></div>

      <section>
        <h2 className="mb-3 text-sm uppercase tracking-widest text-white/60">My Cities</h2>
        {cities.length === 0 ? (
          <div className="rounded-3xl bg-white/10 p-8 text-center backdrop-blur-md ring-1 ring-white/20">
            <p className="font-semibold">No cities yet</p>
            <p className="mt-1 text-white/70">Search above to add a city and see its weather.</p>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2">
            {cities.map(c => <CityCard key={c.id} loc={c} />)}
          </div>
        )}
      </section>

      <SettingsPanel />
      <footer className="pt-2 text-center text-xs text-white/50">Forecast by Open-Meteo</footer>
    </main>
  );
}
