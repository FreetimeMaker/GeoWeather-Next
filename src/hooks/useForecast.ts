"use client";

import { useCallback, useEffect, useState } from "react";
import { getForecast } from "@/lib/api";
import type { ForecastData, GeoLocation, Settings } from "@/lib/types";

interface State {
  data: ForecastData | null;
  loading: boolean;
  error: boolean;
  retry: () => void;
}

const cache = new Map<string, ForecastData>();

export function useForecast(loc: GeoLocation | null, settings: Settings): State {
  const [data, setData] = useState<ForecastData | null>(null);
  const [loading, setLoading] = useState<boolean>(!!loc);
  const [error, setError] = useState<boolean>(false);
  const [reloadToken, setReloadToken] = useState(0);

  const retry = useCallback(() => setReloadToken((t) => t + 1), []);

  useEffect(() => {
    if (!loc) {
      setData(null);
      setLoading(false);
      setError(false);
      return;
    }
    const ck = `${loc.latitude},${loc.longitude}`;
    let active = true;

    const load = async () => {
      if (cache.has(ck) && reloadToken === 0) {
        setData(cache.get(ck)!);
        setLoading(false);
        setError(false);
        return;
      }
      setLoading(true);
      setError(false);
      try {
        const d = await getForecast(loc.latitude, loc.longitude, settings);
        cache.set(ck, d);
        if (active) {
          setData(d);
          setLoading(false);
        }
      } catch {
        if (active) {
          setError(true);
          setLoading(false);
        }
      }
    };

    load();
    return () => {
      active = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loc, reloadToken, settings.tempUnit, settings.windUnit]);

  return { data, loading, error, retry };
}
