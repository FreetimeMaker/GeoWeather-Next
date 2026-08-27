"use client";

import { useParams, useRouter } from "next/navigation";
import { useMemo } from "react";
import { useCities } from "@/components/CitiesContext";
import { useSettings } from "@/components/SettingsContext";
import { useForecast } from "@/hooks/useForecast";
import { getDescription } from "@/lib/weatherCodes";
import { displayTemp, formatWind } from "@/lib/units";

export default function CityDetail() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const { cities } = useCities();
  const { settings } = useSettings();
  const lang = settings.lang;

  const loc = useMemo(
    () => cities.find((c) => String(c.id) === params.id) ?? null,
    [cities, params.id],
  );

  const { data, loading, error } = useForecast(loc, settings);

  if (!loc) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-6">
        <p className="text-lg text-gray-600">City not found</p>
        <button
          onClick={() => router.push("/")}
          className="mt-4 text-purple-600 font-medium"
        >
          Go back
        </button>
      </div>
    );
  }

  const cw = data?.current;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="px-4 pt-4">
        <button
          onClick={() => router.push("/")}
          className="p-2 text-gray-400 hover:text-gray-600 transition"
          aria-label="Back"
        >
          <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="2.2">
            <path d="M9 14l-4-4 4-4" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M5 10h11a4 4 0 010 8h-1" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      <div className="flex flex-col items-center px-6 pt-4 pb-12">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">{loc.name}</h1>

        {loading && (
          <div className="mt-20 flex flex-col items-center gap-3">
            <div className="h-8 w-8 animate-spin rounded-full border-3 border-gray-300 border-t-purple-500" />
          </div>
        )}

        {error && !loading && (
          <div className="mt-20 text-center">
            <p className="text-gray-500">Failed to load weather.</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-3 text-purple-600 font-medium"
            >
              Retry
            </button>
          </div>
        )}

        {!loading && !error && cw && (
          <>
            <p className="text-[120px] font-light leading-none text-gray-900 mt-2 tracking-tight">
              {displayTemp(cw.temperature_2m, settings)}
            </p>

            <p className="text-xl text-gray-500 mt-2">
              {getDescription(cw.weather_code, lang)}
            </p>

            <div className="mt-8 w-full max-w-sm rounded-2xl bg-white p-5 shadow-sm ring-1 ring-gray-100">
              <div className="space-y-2">
                <p className="text-gray-700">
                  Wind: {formatWind(cw.wind_speed_10m, settings)}
                </p>
                <p className="text-gray-700">
                  Humidity: {cw.relative_humidity_2m != null ? `${cw.relative_humidity_2m}%` : "—"}
                </p>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
