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

export interface HealthResponse {
  status: string;
  service: string;
  timestamp: string;
}

const API_BASE = `${BASE_URL}/api/v1`;

async function apiFetch<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
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

export async function getSubscriptionForUser(userId: string): Promise<Subscription | null> {
  const subs = await getSubscriptions();
  return subs.find(s => s.userId === userId && s.status === "active") ?? null;
}

export async function checkHealth(): Promise<HealthResponse> {
  return apiFetch<HealthResponse>("/health");
}
