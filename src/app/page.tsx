"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCities } from "@/components/CitiesContext";
import CitySearchDialog from "@/components/CitySearchDialog";

export default function Home() {
  const { cities, removeCity } = useCities();
  const [searchOpen, setSearchOpen] = useState(false);
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <div className="divide-y divide-gray-200">
        {cities.map((c) => (
          <div
            key={c.id}
            className="flex items-center justify-between px-6 py-5 transition hover:bg-gray-100 cursor-pointer"
            onClick={() => router.push(`/city/${c.id}`)}
          >
            <div>
              <p className="text-lg font-semibold text-gray-900">{c.name}</p>
              <p className="text-sm text-gray-500">
                Lat: {c.latitude.toFixed(4)}, Lon: {c.longitude.toFixed(4)}
              </p>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                removeCity(c.id);
              }}
              className="p-2 text-gray-400 hover:text-red-500 transition"
              title="Remove"
              aria-label="Remove city"
            >
              <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M3 6h18M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2m3 0v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6h14z" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M10 11v6M14 11v6" strokeLinecap="round" />
              </svg>
            </button>
          </div>
        ))}
      </div>

      <button
        onClick={() => setSearchOpen(true)}
        className="fixed bottom-6 right-6 flex h-14 w-14 items-center justify-center rounded-full bg-purple-300 text-purple-900 shadow-lg transition hover:bg-purple-400 z-30"
        aria-label="Add city"
      >
        <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M12 5v14M5 12h14" strokeLinecap="round" />
        </svg>
      </button>

      <button
        onClick={() => window.open("https://github.com/FreetimeMaker/GeoWeather", "_blank")}
        className="fixed bottom-6 left-6 flex h-14 w-14 items-center justify-center rounded-full bg-purple-300 text-purple-900 shadow-lg transition hover:bg-purple-400 z-30"
        aria-label="Donate"
      >
        <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      <CitySearchDialog open={searchOpen} onClose={() => setSearchOpen(false)} />
    </div>
  );
}
