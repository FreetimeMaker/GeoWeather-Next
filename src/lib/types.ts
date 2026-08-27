export type TemperatureUnit = "celsius" | "fahrenheit";
export type WindSpeedUnit = "kmh" | "mph" | "ms" | "kn";
export type PressureUnit = "hpa" | "mmhg";
export type LangCode = "en" | "de" | "ru";

export interface Settings {
  tempUnit: TemperatureUnit;
  windUnit: WindSpeedUnit;
  pressureUnit: PressureUnit;
  lang: LangCode;
}

export interface GeoLocation {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  country?: string;
  country_code?: string;
  admin1?: string;
  timezone?: string;
  elevation?: number;
  feature_code?: string;
}

export interface GeocodingResponse {
  results?: GeoLocation[];
  generationtime_ms?: number;
}

export interface CurrentWeather {
  time: string;
  interval: number;
  temperature_2m: number;
  relative_humidity_2m: number;
  apparent_temperature: number;
  is_day: number;
  precipitation: number;
  weather_code: number;
  cloud_cover: number;
  surface_pressure: number;
  wind_speed_10m: number;
  wind_direction_10m: number;
  wind_gusts_10m: number;
}

export interface HourlyPoint {
  time: string;
  temperature_2m: number;
  apparent_temperature: number;
  precipitation_probability: number;
  weather_code: number;
  is_day: number;
}

export interface DailyPoint {
  time: string;
  weather_code: number;
  temperature_2m_max: number;
  temperature_2m_min: number;
  precipitation_probability_max: number;
  precipitation_sum: number;
  wind_speed_10m_max: number;
  wind_gusts_10m_max: number;
  sunrise: string;
  sunset: string;
}

export interface AirQualityData {
  latitude: number;
  longitude: number;
  timezone: string;
  utc_offset_seconds: number;
  hourly?: {
    time: string[];
    pm10: number[];
    pm2_5: number[];
    us_aqi: number[];
    eu_aqi: number[];
    nitrogen_dioxide: number[];
    ozone: number[];
  };
}

export interface ArchiveDay {
  time: string;
  weather_code: number;
  temperature_2m_max: number;
  temperature_2m_min: number;
  precipitation_sum: number;
  wind_speed_10m_max: number;
}

export interface ArchiveData {
  latitude: number;
  longitude: number;
  timezone: string;
  utc_offset_seconds: number;
  daily?: {
    time: string[];
    weather_code: number[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    precipitation_sum: number[];
    wind_speed_10m_max: number[];
  };
}

export interface ForecastData {
  latitude: number;
  longitude: number;
  timezone: string;
  timezone_abbreviation: string;
  utc_offset_seconds: number;
  current?: CurrentWeather;
  hourly?: {
    time: string[];
    temperature_2m: number[];
    apparent_temperature: number[];
    precipitation_probability: number[];
    weather_code: number[];
    is_day: number[];
  };
  daily?: {
    time: string[];
    weather_code: number[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    precipitation_probability_max: number[];
    precipitation_sum: number[];
    wind_speed_10m_max: number[];
    wind_gusts_10m_max: number[];
    sunrise: string[];
    sunset: string[];
  };
}
