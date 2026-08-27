"use client";

import CitySearch from "@/components/CitySearch";
import CityCard from "@/components/CityCard";
import SettingsPanel from "@/components/SettingsPanel";
import { useCities } from "@/components/CitiesContext";
import { useSettings } from "@/components/SettingsContext";
import { translate } from "@/lib/i18n";

export default function Home() {
  const { cities } = useCities();
  const { settings } = useSettings();
  const lang = settings.lang;
  const t = (k: Parameters<typeof translate>[1]) => translate(lang, k);

  return (
    <main className="mx-auto max-w-4xl space-y-6 px-4 py-8">
      <header className="text-center">
        <div className="mx-auto mb-2 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15 text-3xl shadow-inner ring-1 ring-white/25">
          🌤️
        </div>
        <h1 className="text-3xl font-bold">{t("appName")}</h1>
        <p className="text-white/70">{t("tagline")}</p>
      </header>

      <div className="flex justify-center">
        <CitySearch />
      </div>

      <section>
        <h2 className="mb-3 text-sm uppercase tracking-widest text-white/60">
          {t("myCities")}
        </h2>
        {cities.length === 0 ? (
          <div className="rounded-3xl bg-white/10 p-8 text-center backdrop-blur-md ring-1 ring-white/20">
            <p className="font-semibold">{t("noCities")}</p>
            <p className="mt-1 text-white/70">{t("noCitiesHint")}</p>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2">
            {cities.map((c) => (
              <CityCard key={c.id} loc={c} />
            ))}
          </div>
        )}
      </section>

      <SettingsPanel />

      <footer className="pt-2 text-center text-xs text-white/50">
        {t("basedOn")}
      </footer>
    </main>
  );
}
