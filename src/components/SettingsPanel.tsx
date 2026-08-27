"use client";

import { useSettings } from "@/components/SettingsContext";
import { translate } from "@/lib/i18n";
import type { LangCode, PressureUnit, TemperatureUnit, WindSpeedUnit } from "@/lib/types";
import { PRESSURE_SYMBOLS, TEMP_SYMBOLS, WIND_SYMBOLS } from "@/lib/units";

export default function SettingsPanel() {
  const { settings, update } = useSettings();
  const lang = settings.lang;
  const t = (k: Parameters<typeof translate>[1]) => translate(lang, k);

  const tempOptions: TemperatureUnit[] = ["celsius", "fahrenheit"];
  const windOptions: WindSpeedUnit[] = ["kmh", "mph", "ms", "kn"];
  const pressureOptions: PressureUnit[] = ["hpa", "mmhg"];
  const langOptions: LangCode[] = ["en", "de", "ru"];

  return (
    <section className="rounded-3xl bg-white/10 p-6 backdrop-blur-md ring-1 ring-white/20 shadow-xl">
      <h3 className="mb-4 text-sm uppercase tracking-widest text-white/60">
        {t("settings")}
      </h3>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <p className="mb-2 text-sm text-white/80">{t("temperatureUnit")}</p>
          <Segmented
            options={tempOptions.map((o) => ({ value: o, label: TEMP_SYMBOLS[o] }))}
            value={settings.tempUnit}
            onChange={(v) => update({ tempUnit: v as TemperatureUnit })}
          />
        </div>
        <div>
          <p className="mb-2 text-sm text-white/80">{t("windUnit")}</p>
          <Segmented
            options={windOptions.map((o) => ({ value: o, label: WIND_SYMBOLS[o] }))}
            value={settings.windUnit}
            onChange={(v) => update({ windUnit: v as WindSpeedUnit })}
          />
        </div>
        <div>
          <p className="mb-2 text-sm text-white/80">{t("pressureUnit")}</p>
          <Segmented
            options={pressureOptions.map((o) => ({ value: o, label: PRESSURE_SYMBOLS[o] }))}
            value={settings.pressureUnit}
            onChange={(v) => update({ pressureUnit: v as PressureUnit })}
          />
        </div>
        <div>
          <p className="mb-2 text-sm text-white/80">{t("language")}</p>
          <Segmented
            options={langOptions.map((o) => ({ value: o, label: o.toUpperCase() }))}
            value={settings.lang}
            onChange={(v) => update({ lang: v as LangCode })}
          />
        </div>
      </div>
    </section>
  );
}

function Segmented<T extends string>({
  options,
  value,
  onChange,
}: {
  options: { value: T; label: string }[];
  value: T;
  onChange: (v: T) => void;
}) {
  return (
    <div className="flex flex-wrap gap-1 rounded-2xl bg-white/10 p-1">
      {options.map((o) => (
        <button
          key={o.value}
          onClick={() => onChange(o.value)}
          className={`flex-1 rounded-xl px-3 py-2 text-sm font-medium transition ${
            value === o.value
              ? "bg-white text-sky-700 shadow"
              : "text-white/80 hover:bg-white/10"
          }`}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}
