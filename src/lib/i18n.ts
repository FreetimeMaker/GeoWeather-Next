import type { LangCode } from "@/lib/types";

export type TKey = "appName" | "tagline";

const en: Record<TKey, string> = {
  appName: "GeoWeather",
  tagline: "A modern weather app",
};

const de: Record<TKey, string> = {
  appName: "GeoWeather",
  tagline: "Eine moderne Wetter-App",
};

const ru: Record<TKey, string> = {
  appName: "GeoWeather",
  tagline: "Современное приложение о погоде",
};

const dicts: Record<LangCode, Record<TKey, string>> = { en, de, ru };

export function translate(lang: LangCode, key: TKey): string {
  return dicts[lang]?.[key] ?? en[key];
}
