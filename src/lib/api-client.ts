import { getSupabase } from "@/lib/supabase/client";

const BASE_URL = "https://all-api-node.vercel.app";

export interface Plan {
  maxLocations: number;
  forecastDays: number;
  notifications: boolean;
}

export interface PlansResponse {
  plans: Record<string, Plan>;
  types: string[];
}

export interface Subscription {
  id: string;
  userId: string;
  plan: string;
  status: string;
  createdAt?: string;
  expiresAt?: string;
}

const API_BASE = `${BASE_URL}/api/v1`;

async function apiFetch<T>(path: string, options?: RequestInit): Promise<T> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...((options?.headers as Record<string, string>) ?? {}),
  };

  try {
    const sb = getSupabase();
    if (sb) {
      const { data: { session } } = await sb.auth.getSession();
      if (session?.access_token) {
        headers["Authorization"] = `Bearer ${session.access_token}`;
      }
    }
  } catch {}

  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers,
  });
  if (!res.ok) {
    const text = await res.text().catch(() => "Unknown error");
    throw new Error(`API ${res.status}: ${text}`);
  }
  return res.json();
}

export async function getPlans(): Promise<PlansResponse> {
  return apiFetch<PlansResponse>("/geoweather/subscriptions/plans");
}

export async function getSubscriptions(): Promise<Subscription[]> {
  const res = await apiFetch<{ subscriptions: Subscription[] }>("/geoweather/subscriptions");
  return res.subscriptions ?? [];
}

export async function redeemCode(code: string): Promise<{ success: boolean; plan?: string; message?: string }> {
  return apiFetch("/geoweather/subscriptions/redeem", {
    method: "POST",
    body: JSON.stringify({ code }),
  });
}

export async function checkHealth() {
  return apiFetch<{ status: string; service: string; timestamp: string }>("/health");
}
