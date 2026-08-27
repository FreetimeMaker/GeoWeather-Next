"use client";

import { useEffect, useState } from "react";
import { getArchive } from "@/lib/api";
import type { ArchiveData, GeoLocation, Settings } from "@/lib/types";

interface State {
  data: ArchiveData | null;
  loading: boolean;
  error: boolean;
}

const cache = new Map<string, ArchiveData>();

export function useArchive(
  loc: GeoLocation | null,
  startDate: string,
  endDate: string,
  settings: Settings,
): State {
  const [data, setData] = useState<ArchiveData | null>(null);
  const [loading, setLoading] = useState<boolean>(!!loc);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    if (!loc || !startDate || !endDate) {
      setData(null);
      setLoading(false);
      setError(false);
      return;
    }
    const ck = `arch:${loc.latitude},${loc.longitude}:${startDate}:${endDate}:${settings.tempUnit}`;
    let active = true;

    const load = async () => {
      if (cache.has(ck)) {
        setData(cache.get(ck)!);
        setLoading(false);
        setError(false);
        return;
      }
      setLoading(true);
      setError(false);
      try {
        const d = await getArchive(loc.latitude, loc.longitude, startDate, endDate, settings);
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
    return () => { active = false; };
  }, [loc, startDate, endDate, settings.tempUnit]);

  return { data, loading, error };
}
