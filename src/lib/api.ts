import type {
  AirQualityData,
  ArchiveData,
  ForecastData,
  GeocodingResponse,
  GeoLocation,
  Settings,
} from "@/lib/types";

const FORECAST_URL = "https://api.open-meteo.com/v1/forecast";
const GEOCODING_URL = "https://geocoding-api.open-meteo.com/v1/search";
const AIR_QUALITY_URL = "https://air-quality-api.open-meteo.com/v1/air-quality";
const ARCHIVE_URL = "https://archive-api.open-meteo.com/v1/archive";

function buildWeatherUnits(s: Settings): { [k: string]: string } {
  const params: { [k: string]: string } = {};
  if (s.tempUnit === "fahrenheit") params.temperature_unit = "fahrenheit";
  if (s.windUnit !== "kmh") params.wind_speed_unit = s.windUnit;
  return params;
}

export async function getForecast(
  lat: number,
  lon: number,
  settings: Settings,
): Promise<ForecastData> {
  const unitParams = new URLSearchParams(buildWeatherUnits(settings)).toString();
  const url =
    `${FORECAST_URL}?latitude=${lat}&longitude=${lon}` +
    `&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,weather_code,cloud_cover,surface_pressure,wind_speed_10m,wind_direction_10m,wind_gusts_10m` +
    `&hourly=temperature_2m,apparent_temperature,precipitation_probability,weather_code,is_day` +
    `&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max,precipitation_sum,wind_speed_10m_max,wind_gusts_10m_max,sunrise,sunset` +
    `&forecast_days=16&timezone=auto&${unitParams}`;

  const res = await fetch(url, { next: { revalidate: 1800 } });
  if (!res.ok) throw new Error(`Forecast request failed: ${res.status}`);
  return (await res.json()) as ForecastData;
}

export async function searchCities(
  query: string,
  count = 8,
): Promise<GeoLocation[]> {
  const url =
    `${GEOCODING_URL}?name=${encodeURIComponent(query)}` +
    `&count=${count}&language=en&format=json`;
  const res = await fetch(url, { next: { revalidate: 3600 } });
  if (!res.ok) throw new Error(`Geocoding request failed: ${res.status}`);
  const data = (await res.json()) as GeocodingResponse;
  return data.results ?? [];
}

export function cityLabel(loc: GeoLocation): string {
  const parts: string[] = [loc.name];
  if (loc.admin1 && loc.country_code && loc.admin1 !== loc.country_code)
    parts.push(loc.admin1);
  if (loc.country) parts.push(loc.country);
  return parts.join(", ");
}

export async function getAirQuality(
  lat: number,
  lon: number,
): Promise<AirQualityData> {
  const url =
    `${AIR_QUALITY_URL}?latitude=${lat}&longitude=${lon}` +
    `&hourly=pm10,pm2_5,us_aqi,eu_aqi,nitrogen_dioxide,ozone` +
    `&timezone=auto`;
  const res = await fetch(url, { next: { revalidate: 3600 } });
  if (!res.ok) throw new Error(`Air quality request failed: ${res.status}`);
  return (await res.json()) as AirQualityData;
}

export async function getArchive(
  lat: number,
  lon: number,
  startDate: string,
  endDate: string,
  settings: Settings,
): Promise<ArchiveData> {
  const unitParams = new URLSearchParams(buildWeatherUnits(settings)).toString();
  const url =
    `${ARCHIVE_URL}?latitude=${lat}&longitude=${lon}` +
    `&start_date=${startDate}&end_date=${endDate}` +
    `&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_sum,wind_speed_10m_max` +
    `&timezone=auto&${unitParams}`;
  const res = await fetch(url, { next: { revalidate: 3600 } });
  if (!res.ok) throw new Error(`Archive request failed: ${res.status}`);
  return (await res.json()) as ArchiveData;
}
