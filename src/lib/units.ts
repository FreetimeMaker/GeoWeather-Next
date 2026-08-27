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

export function displayTemp(value: number, s: Settings): string {
  return `${Math.round(value)}${TEMP_SYMBOLS[s.tempUnit]}`;
}

export function formatWind(value: number, s: Settings): string {
  let display = value;
  if (s.windUnit === "mph") display = value * 1.609344;
  else if (s.windUnit === "ms") display = value * 3.6;
  else if (s.windUnit === "kn") display = value * 1.852;
  return `${display.toFixed(1)} ${WIND_SYMBOLS[s.windUnit]}`;
}

export function formatPressure(hpa: number, s: Settings): string {
  if (s.pressureUnit === "mmhg") {
    return `${Math.round(hpa * 0.750062)} ${PRESSURE_SYMBOLS.mmhg}`;
  }
  return `${Math.round(hpa)} ${PRESSURE_SYMBOLS.hpa}`;
}
