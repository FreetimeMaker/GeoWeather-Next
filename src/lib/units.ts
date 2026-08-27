import type { PressureUnit, Settings, TemperatureUnit, WindSpeedUnit } from "@/lib/types";

export const TEMP_SYMBOLS: Record<TemperatureUnit, string> = {
  celsius: "°C",
  fahrenheit: "°F",
};

export const WIND_SYMBOLS: Record<WindSpeedUnit, string> = {
  kmh: "km/h",
  mph: "mph",
  ms: "m/s",
  kn: "kn",
};

export const PRESSURE_SYMBOLS: Record<PressureUnit, string> = {
  hpa: "hPa",
  mmhg: "mmHg",
};

/**
 * Location-independent temperature conversion. Open-Meteo already returns the
 * requested unit, so this is a no-op passthrough for clarity.
 */
export function displayTemp(value: number, s: Settings): string {
  return `${Math.round(value)}${TEMP_SYMBOLS[s.tempUnit]}`;
}

export function tempNumber(value: number, s: Settings): number {
  return Math.round(value);
}

/**
 * Convert wind speed from the source unit (km/h by default, or as requested
 * by API) into a display string for the selected unit.
 */
export function formatWind(value: number, s: Settings): string {
  let kmh = value;
  if (s.windUnit === "mph") kmh = value * 1.609344;
  else if (s.windUnit === "ms") kmh = value * 3.6;
  else if (s.windUnit === "kn") kmh = value * 1.852;
  return `${Math.round(kmh)} ${WIND_SYMBOLS[s.windUnit]}`;
}

/**
 * Convert a pressure value from hPa into the selected display unit.
 */
export function formatPressure(hpa: number, s: Settings): string {
  if (s.pressureUnit === "mmhg") {
    return `${Math.round(hpa * 0.750062)} ${PRESSURE_SYMBOLS.mmhg}`;
  }
  return `${Math.round(hpa)} ${PRESSURE_SYMBOLS.hpa}`;
}

export function formatPrecipitation(mm: number, s: Settings): string {
  if (mm < 0.1 && mm > 0) return "<0.1 mm";
  return `${mm.toFixed(1)} mm`;
}

export function windDirection(deg: number): string {
  const dirs = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
  return dirs[Math.round(deg / 45) % 8] ?? "N";
}

export function formatHour(time: string): string {
  return time.slice(11, 16);
}

export function formatDay(time: string, lang: string): string {
  const d = new Date(time + "T00:00:00");
  return new Intl.DateTimeFormat(lang === "ru" ? "ru-RU" : lang === "de" ? "de-DE" : "en-US", {
    weekday: "short",
    day: "numeric",
    month: "short",
  }).format(d);
}

export function formatDate(time: string, lang: string): string {
  const d = new Date(time);
  return new Intl.DateTimeFormat(lang === "ru" ? "ru-RU" : lang === "de" ? "de-DE" : "en-US", {
    weekday: "long",
    day: "numeric",
    month: "long",
  }).format(d);
}

export function formatTime(time: string, lang: string): string {
  const d = new Date(time);
  return new Intl.DateTimeFormat(lang === "ru" ? "ru-RU" : lang === "de" ? "de-DE" : "en-US", {
    hour: "2-digit",
    minute: "2-digit",
  }).format(d);
}

/* --- AQI helpers --- */

type AqiLevel = {
  color: string;
  bg: string;
  labelKey: "aqiGood" | "aqiModerate" | "aqiUnhealthySensitive" | "aqiUnhealthy" | "aqiVeryUnhealthy" | "aqiHazardous";
};

const AQI_THRESHOLDS: { max: number; level: AqiLevel }[] = [
  { max: 50, level: { color: "text-green-400", bg: "bg-green-500/20", labelKey: "aqiGood" } },
  { max: 100, level: { color: "text-yellow-400", bg: "bg-yellow-500/20", labelKey: "aqiModerate" } },
  { max: 150, level: { color: "text-orange-400", bg: "bg-orange-500/20", labelKey: "aqiUnhealthySensitive" } },
  { max: 200, level: { color: "text-red-400", bg: "bg-red-500/20", labelKey: "aqiUnhealthy" } },
  { max: 300, level: { color: "text-purple-400", bg: "bg-purple-500/20", labelKey: "aqiVeryUnhealthy" } },
  { max: Infinity, level: { color: "text-rose-500", bg: "bg-rose-500/20", labelKey: "aqiHazardous" } },
];

export function getAqiLevel(aqi: number): AqiLevel {
  for (const t of AQI_THRESHOLDS) {
    if (aqi <= t.max) return t.level;
  }
  return AQI_THRESHOLDS[AQI_THRESHOLDS.length - 1].level;
}

/* --- Date helpers --- */

export function todayISO(): string {
  return new Date().toISOString().slice(0, 10);
}

export function daysAgoISO(days: number): string {
  const d = new Date();
  d.setDate(d.getDate() - days);
  return d.toISOString().slice(0, 10);
}
