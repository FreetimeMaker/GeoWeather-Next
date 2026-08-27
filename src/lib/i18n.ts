import type { LangCode } from "@/lib/types";

export type TKey =
  | "appName"
  | "tagline"
  | "searchPlaceholder"
  | "addCity"
  | "myCities"
  | "currentConditions"
  | "hourlyForecast"
  | "dailyForecast"
  | "feelsLike"
  | "humidity"
  | "wind"
  | "pressure"
  | "cloudCover"
  | "precipitation"
  | "precipProb"
  | "sunrise"
  | "sunset"
  | "noCities"
  | "noCitiesHint"
  | "searchNoResults"
  | "units"
  | "temperature"
  | "temperatureUnit"
  | "windSpeed"
  | "windUnit"
  | "pressureUnit"
  | "language"
  | "settings"
  | "removeCity"
  | "addedOn"
  | "loading"
  | "error"
  | "retry"
  | "back"
  | "basedOn"
  | "tomorrow"
  | "today"
  | "clear"
  | "feelsLikeShort"
  | "now"
  | "airQuality"
  | "aqiGood"
  | "aqiModerate"
  | "aqiUnhealthySensitive"
  | "aqiUnhealthy"
  | "aqiVeryUnhealthy"
  | "aqiHazardous"
  | "pm10"
  | "pm25"
  | "no2"
  | "ozone"
  | "history"
  | "historyRange"
  | "historyHint"
  | "last30Days"
  | "last90Days"
  | "lastYear"
  | "maxTemp"
  | "minTemp"
  | "radar"
  | "radarTitle"
  | "precipitation";

const en: Record<TKey, string> = {
  appName: "GeoWeather",
  tagline: "A modern weather app",
  searchPlaceholder: "Search for a city...",
  addCity: "Add",
  myCities: "My Cities",
  currentConditions: "Current Conditions",
  hourlyForecast: "Hourly Forecast",
  dailyForecast: "16-Day Forecast",
  feelsLike: "Feels like",
  humidity: "Humidity",
  wind: "Wind",
  pressure: "Pressure",
  cloudCover: "Cloud cover",
  precipitation: "Precipitation",
  precipProb: "Precip. prob.",
  sunrise: "Sunrise",
  sunset: "Sunset",
  noCities: "No cities yet",
  noCitiesHint: "Search above to add a city and see its weather.",
  searchNoResults: "No matching cities found.",
  units: "Units",
  temperature: "Temperature",
  temperatureUnit: "Temperature unit",
  windSpeed: "Wind speed",
  windUnit: "Wind speed unit",
  pressureUnit: "Pressure unit",
  language: "Language",
  settings: "Settings",
  removeCity: "Remove",
  addedOn: "Average",
  loading: "Loading...",
  error: "Something went wrong while loading the weather.",
  retry: "Retry",
  back: "Back",
  basedOn: "Forecast by Open-Meteo",
  tomorrow: "Tomorrow",
  today: "Today",
  clear: "Clear",
  feelsLikeShort: "Feels like",
  now: "Now",
  airQuality: "Air Quality",
  aqiGood: "Good",
  aqiModerate: "Moderate",
  aqiUnhealthySensitive: "Unhealthy for Sensitive Groups",
  aqiUnhealthy: "Unhealthy",
  aqiVeryUnhealthy: "Very Unhealthy",
  aqiHazardous: "Hazardous",
  pm10: "PM10",
  pm25: "PM2.5",
  no2: "NO₂",
  ozone: "Ozone",
  history: "Weather History",
  historyRange: "Time range",
  historyHint: "View past weather conditions for this location.",
  last30Days: "Last 30 days",
  last90Days: "Last 90 days",
  lastYear: "Last year",
  maxTemp: "Max Temp",
  minTemp: "Min Temp",
  radar: "Radar",
  radarTitle: "Precipitation Radar",
  precipitation: "Precipitation",
};

const de: Record<TKey, string> = {
  appName: "GeoWeather",
  tagline: "Eine moderne Wetter-App",
  searchPlaceholder: "Stadt suchen...",
  addCity: "Hinzufügen",
  myCities: "Meine Städte",
  currentConditions: "Aktuelle Bedingungen",
  hourlyForecast: "Stündliche Vorhersage",
  dailyForecast: "16-Tage-Vorhersage",
  feelsLike: "Gefühlt",
  humidity: "Luftfeuchtigkeit",
  wind: "Wind",
  pressure: "Druck",
  cloudCover: "Bewölkung",
  precipitation: "Niederschlag",
  precipProb: "Niederschl.-Wahrsch.",
  sunrise: "Sonnenaufgang",
  sunset: "Sonnenuntergang",
  noCities: "Noch keine Städte",
  noCitiesHint: "Suche oben, um eine Stadt hinzuzufügen.",
  searchNoResults: "Keine passenden Städte gefunden.",
  units: "Einheiten",
  temperature: "Temperatur",
  temperatureUnit: "Temperatureinheit",
  windSpeed: "Windgeschwindigkeit",
  windUnit: "Windgeschwindigkeitseinheit",
  pressureUnit: "Druckeinheit",
  language: "Sprache",
  settings: "Einstellungen",
  removeCity: "Entfernen",
  addedOn: "Durchschnitt",
  loading: "Wird geladen...",
  error: "Beim Laden des Wetters ist ein Fehler aufgetreten.",
  retry: "Erneut versuchen",
  back: "Zurück",
  basedOn: "Vorhersage von Open-Meteo",
  tomorrow: "Morgen",
  today: "Heute",
  clear: "Klar",
  feelsLikeShort: "Gefühlt",
  now: "Jetzt",
  airQuality: "Luftqualität",
  aqiGood: "Gut",
  aqiModerate: "Mäßig",
  aqiUnhealthySensitive: "Ungesund für empfindliche Gruppen",
  aqiUnhealthy: "Ungesund",
  aqiVeryUnhealthy: "Sehr ungesund",
  aqiHazardous: "Gefährlich",
  pm10: "PM10",
  pm25: "PM2.5",
  no2: "NO₂",
  ozone: "Ozon",
  history: "Wetterverlauf",
  historyRange: "Zeitraum",
  historyHint: "Vergangene Wetterbedingungen für diesen Ort anzeigen.",
  last30Days: "Letzte 30 Tage",
  last90Days: "Letzte 90 Tage",
  lastYear: "Letztes Jahr",
  maxTemp: "Höchsttemperatur",
  minTemp: "Tiefsttemperatur",
  radar: "Radar",
  radarTitle: "Niederschlagsradar",
  precipitation: "Niederschlag",
};

const ru: Record<TKey, string> = {
  appName: "GeoWeather",
  tagline: "Современное приложение о погоде",
  searchPlaceholder: "Поиск города...",
  addCity: "Добавить",
  myCities: "Мои города",
  currentConditions: "Текущие условия",
  hourlyForecast: "Почасовая погода",
  dailyForecast: "Прогноз на 16 дней",
  feelsLike: "Ощущается как",
  humidity: "Влажность",
  wind: "Ветер",
  pressure: "Давление",
  cloudCover: "Облачность",
  precipitation: "Осадки",
  precipProb: "Вероятность осадков",
  sunrise: "Восход",
  sunset: "Закат",
  noCities: "Пока нет городов",
  noCitiesHint: "Найдите город выше, чтобы посмотреть его погоду.",
  searchNoResults: "Города не найдены.",
  units: "Единицы",
  temperature: "Температура",
  temperatureUnit: "Единица температуры",
  windSpeed: "Скорость ветра",
  windUnit: "Единица скорости ветра",
  pressureUnit: "Единица давления",
  language: "Язык",
  settings: "Настройки",
  removeCity: "Удалить",
  addedOn: "Среднее",
  loading: "Загрузка...",
  error: "Не удалось загрузить данные о погоде.",
  retry: "Повторить",
  back: "Назад",
  basedOn: "Прогноз Open-Meteo",
  tomorrow: "Завтра",
  today: "Сегодня",
  clear: "Ясно",
  feelsLikeShort: "Ощущается",
  now: "Сейчас",
  airQuality: "Качество воздуха",
  aqiGood: "Хорошо",
  aqiModerate: "Умеренно",
  aqiUnhealthySensitive: "Нездоров для чувствительных групп",
  aqiUnhealthy: "Нездоров",
  aqiVeryUnhealthy: "Очень нездоров",
  aqiHazardous: "Опасно",
  pm10: "PM10",
  pm25: "PM2.5",
  no2: "NO₂",
  ozone: "Озон",
  history: "История погоды",
  historyRange: "Период",
  historyHint: "Просмотр прошлых погодных условий для этого места.",
  last30Days: "Последние 30 дней",
  last90Days: "Последние 90 дней",
  lastYear: "Последний год",
  maxTemp: "Макс. температура",
  minTemp: "Мин. температура",
  radar: "Радар",
  radarTitle: "Радар осадков",
  precipitation: "Осадки",
};

const dicts: Record<LangCode, Record<TKey, string>> = { en, de, ru };

export function translate(lang: LangCode, key: TKey): string {
  return dicts[lang]?.[key] ?? en[key];
}
