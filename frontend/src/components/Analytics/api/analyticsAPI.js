import {
  getStoredUserId,
  getStoredUser,
  client as authedClient,
} from "../../../lib/api";

/**
 * Analytics API helpers.
 * Endpoint paths mirror backend/routes/api.php, which mounts routes/api.php
 * under the `api` prefix (see RouteServiceProvider::prefix('api')).
 *
 * Uses the shared authenticated axios client from src/lib/api.js, whose
 * baseURL already embeds `${VITE_API_BASE_URL}/api`.
 */

const api = authedClient;

/** Re-expose the shared authed client for components (ExportWordReport). */
export { authedClient as client };

/**
 * Resolve the analytics owner. Analytics look at the signed-in user's data,
 * not an arbitrary route param.
 */
export function resolveUserId() {
  const storedId = getStoredUserId();
  if (storedId) return storedId;
  const fallback = getStoredUser();
  return fallback?.user?.id ?? null;
}

export const fetchAnalyticsSummary = async () => {
  const userId = resolveUserId();
  if (!userId) {
    return {
      error: "No logged in user — analytics unavailable.",
      data: {
        clicks: "—",
        visitors: "—",
        bounce_rate: "—",
        engagement: "—",
      },
    };
  }
  try {
    const [
      clicksResponse,
      bounceRateResponse,
      visitorsResponse,
      engagementResponse,
    ] = await Promise.all([
      api.get(`/users/${userId}/analytics/total-clicks`),
      api.get(`/users/${userId}/analytics/bounce-rate`),
      api.get(`/users/${userId}/analytics/return-visitors`),
      api.get(`/users/${userId}/analytics/engagement-rate`),
    ]);

    const pick = (value) => (typeof value === "object" && value !== null ? null : value);

    return {
      error: null,
      data: {
        clicks: pick(clicksResponse.data) ?? "—",
        visitors: pick(visitorsResponse.data) ?? 0,
        bounce_rate: pick(bounceRateResponse.data) ?? 0,
        engagement: pick(engagementResponse.data) ?? 0,
      },
    };
  } catch (error) {
    return {
      error: "Analytics are unavailable right now. " + (error?.response?.data?.message || ""),
      data: {
        clicks: "—",
        visitors: "—",
        bounce_rate: "—",
        engagement: "—",
      },
    };
  }
};

export const fetchClicksPerLink = async () => {
  const userId = resolveUserId();
  if (!userId) {
    return { error: "No logged in user — analytics unavailable.", data: [] };
  }
  try {
    const response = await api.get(`/users/${userId}/analytics/clicks-per-link`);
    return {
      error: null,
      data: response.data,
    };
  } catch (error) {
    return {
      error: "Analytics are unavailable right now. " + (error?.response?.data?.message || ""),
      data: [],
    };
  }
};

export const fetchPerformancedata = async () => {
  const userId = resolveUserId();
  if (!userId) {
    return { error: "No logged in user — analytics unavailable.", data: [] };
  }
  try {
    const response = await api.get(`/users/${userId}/analytics/performance`);

    return {
      error: null,
      data: [
        {
          name: "Daily",
          clicks: response.data.daily_clicks,
          color: "#FF6384",
        },
        {
          name: "Weekly",
          clicks: response.data.weekly_clicks,
          color: "#36A2EB",
        },
        {
          name: "Monthly",
          clicks: response.data.monthly_clicks,
          color: "#FFCE56",
        },
      ],
    };
  } catch (error) {
    return {
      error: "Analytics are unavailable right now. " + (error?.response?.data?.message || ""),
      data: [],
    };
  }
};

export const fetchTopAndBottomLinks = async () => {
  const userId = resolveUserId();
  if (!userId) {
    return {
      error: "No logged in user — analytics unavailable.",
      data: { top_links: [], bottom_links: [] },
    };
  }
  try {
    const response = await api.get(`/users/${userId}/analytics/top-bottom-links`);
    return {
      error: null,
      data: response.data,
    };
  } catch (error) {
    return {
      error: "Analytics are unavailable right now. " + (error?.response?.data?.message || ""),
      data: {
        top_links: [],
        bottom_links: [],
      },
    };
  }
};
