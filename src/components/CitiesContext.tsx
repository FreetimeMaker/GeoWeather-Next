"use client";

import { createContext, useContext, useEffect, useState } from "react";
import type { GeoLocation } from "@/lib/types";

const STORAGE_KEY = "geoweather:cities";

interface Ctx {
  cities: GeoLocation[];
  addCity: (loc: GeoLocation) => void;
  removeCity: (id: number) => void;
}

const CitiesContext = createContext<Ctx | null>(null);

const STARTER: GeoLocation[] = [
  {
    id: 1,
    name: "Bern",
    latitude: 46.948,
    longitude: 7.4474,
    country: "Switzerland",
    country_code: "CH",
    admin1: "Bern",
  },
];

export function CitiesProvider({ children }: { children: React.ReactNode }) {
  const [cities, setCities] = useState<GeoLocation[]>(STARTER);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) setCities(parsed);
      }
    } catch {
      /* ignore */
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cities));
    } catch {
      /* ignore */
    }
  }, [cities, hydrated]);

  const addCity = (loc: GeoLocation) => {
    setCities((prev) => (prev.some((c) => c.id === loc.id) ? prev : [...prev, loc]));
  };

  const removeCity = (id: number) => {
    setCities((prev) => prev.filter((c) => c.id !== id));
  };

  return (
    <CitiesContext.Provider value={{ cities, addCity, removeCity }}>
      {children}
    </CitiesContext.Provider>
  );
}

export function useCities(): Ctx {
  const ctx = useContext(CitiesContext);
  if (!ctx) throw new Error("useCities must be used within CitiesProvider");
  return ctx;
}
