"use client";

import { useEffect, useState } from "react";
import type { AirQualityData } from "@/lib/types";
import { getAqiLevel } from "@/lib/units";
import { translate } from "@/lib/i18n";
import { useSettings } from "@/components/SettingsContext";

interface Props {
  data: AirQualityData;
}

export default function AirQualityCard({ data }: Props) {
  const { settings } = useSettings();
  const lang = settings.lang;
  const [idx, setIdx] = useState(0);

  const hourly = data.hourly;
  if (!hourly) return null;

  // find current hour index
  useEffect(() => {
    const now = new Date().toISOString().slice(0, 13) + ":00";
    const i = hourly.time.findIndex((t) => t.slice(0, 13) === now.slice(0, 13));
    if (i >= 0) setIdx(i);
  }, [hourly.time]);

  const aqi = hourly.us_aqi[idx] ?? 0;
  const euAqi = hourly.eu_aqi[idx] ?? 0;
  const pm10 = hourly.pm10[idx] ?? 0;
  const pm25 = hourly.pm2_5[idx] ?? 0;
  const no2 = hourly.nitrogen_dioxide[idx] ?? 0;
  const o3 = hourly.ozone[idx] ?? 0;

  const level = getAqiLevel(aqi);

  return (
    <section className="rounded-3xl bg-white/10 p-6 backdrop-blur-md ring-1 ring-white/20 shadow-xl">
      <h3 className="mb-4 text-sm uppercase tracking-widest text-white/60">
        {translate(lang, "airQuality")}
      </h3>

      <div className="flex items-center gap-4">
        <div className={`flex h-16 w-16 items-center justify-center rounded-2xl text-2xl font-bold ${level.bg} ${level.color}`}>
          {aqi}
        </div>
        <div>
          <p className={`text-lg font-semibold ${level.color}`}>
            {translate(lang, level.labelKey)}
          </p>
          <p className="text-sm text-white/60">
            US AQI {aqi} · EU AQI {euAqi}
          </p>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Pollutant label={translate(lang, "pm10")} value={pm10} unit="μg/m³" />
        <Pollutant label={translate(lang, "pm25")} value={pm25} unit="μg/m³" />
        <Pollutant label={translate(lang, "no2")} value={no2} unit="μg/m³" />
        <Pollutant label={translate(lang, "ozone")} value={o3} unit="μg/m³" />
      </div>
    </section>
  );
}

function Pollutant({ label, value, unit }: { label: string; value: number; unit: string }) {
  return (
    <div className="rounded-2xl bg-white/10 p-3">
      <p className="text-xs text-white/60">{label}</p>
      <p className="font-semibold">{value.toFixed(1)}</p>
      <p className="text-[11px] text-white/50">{unit}</p>
    </div>
  );
}
