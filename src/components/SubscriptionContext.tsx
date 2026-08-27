"use client";

import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { getPlans, getSubscriptions, redeemCode, type Plan, type Subscription } from "@/lib/api-client";
import { useAuth } from "@/components/AuthContext";

interface SubCtx {
  plan: string;
  planDetails: Plan;
  subscription: Subscription | null;
  allPlans: Record<string, Plan>;
  loading: boolean;
  canAddCity: boolean;
  canShowForecast: (days: number) => boolean;
  redeem: (code: string) => Promise<{ success: boolean; message?: string }>;
  refresh: () => Promise<void>;
}

const DEFAULT_PLAN: Plan = { maxLocations: 5, forecastDays: 1, notifications: false };

const SubscriptionContext = createContext<SubCtx | null>(null);

export function SubscriptionProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const [plan, setPlan] = useState("free");
  const [planDetails, setPlanDetails] = useState<Plan>(DEFAULT_PLAN);
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [allPlans, setAllPlans] = useState<Record<string, Plan>>({});
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    try {
      const plansRes = await getPlans();
      setAllPlans(plansRes.plans);

      if (user) {
        const subs = await getSubscriptions();
        const active = subs.find(s => s.userId === user.id && s.status === "active");
        if (active) {
          setSubscription(active);
          setPlan(active.plan);
          setPlanDetails(plansRes.plans[active.plan] ?? plansRes.plans.free ?? DEFAULT_PLAN);
        } else {
          setSubscription(null);
          setPlan("free");
          setPlanDetails(plansRes.plans.free ?? DEFAULT_PLAN);
        }
      } else {
        setPlanDetails(plansRes.plans.free ?? DEFAULT_PLAN);
      }
    } catch {
      // API offline — use defaults
      setPlanDetails(DEFAULT_PLAN);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const redeem = async (code: string) => {
    try {
      const res = await redeemCode(code);
      if (res.success) {
        await refresh();
        return { success: true, message: res.message ?? "Code eingelöst!" };
      }
      return { success: false, message: res.message ?? "Ungültiger Code" };
    } catch (e) {
      return { success: false, message: "Fehler beim Einlösen" };
    }
  };

  const canAddCity = true; // Always allow — enforce in UI

  const canShowForecast = (days: number) => {
    return days <= planDetails.forecastDays;
  };

  return (
    <SubscriptionContext.Provider value={{ plan, planDetails, subscription, allPlans, loading, canAddCity, canShowForecast, redeem, refresh }}>
      {children}
    </SubscriptionContext.Provider>
  );
}

export function useSubscription(): SubCtx {
  const ctx = useContext(SubscriptionContext);
  if (!ctx) throw new Error("useSubscription must be used within SubscriptionProvider");
  return ctx;
}
