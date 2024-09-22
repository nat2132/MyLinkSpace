import axios from "axios";
import { baseURL } from "../data/const";

// Set up your base URL
const api = axios.create({
  baseURL,
  withCredentials: true,
});
const userId = "1111";

export const fetchAnalyticsSummary = async () => {
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

    return {
      error: null,
      data: {
        clicks: clicksResponse.data || "N/A",
        visitors: visitorsResponse.data || 0,
        bounce_rate: bounceRateResponse.data || 0,
        engagement: engagementResponse.data || 0,
      },
    };
  } catch (error) {
    return {
      error: "Error fetching analytics summary",
      data: {
        clicks: "N/A",
        visitors: "N/A",
        bounce_rate: "N/A",
        engagement: "N/A",
      },
    };
  }
};

export const fetchClicksPerLink = async () => {
  try {
    const response = await api.get(`/users/${userId}/clicks-per-link`);
    return {
      error: null,
      data: response.data,
    };
  } catch (error) {
    return {
      error: "Error fetching clicks per link",
      data: [],
    };
  }
};

export const fetchPerformancedata = async () => {
  try {
    const response = await api.get(`/users/${userId}/performance`);
    response.data;

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
      error: "Error fetching performance data",
      data: [],
    };
  }
};

export const fetchTopAndBottomLinks = async () => {
  try {
    const response = await api.get(`/users/${userId}/top-bottom-links`);
    return {
      error: null,
      data: response.data,
    };
  } catch (error) {
    return {
      error: "Error fetching daily clicks",
      data: {
        top_links: [],
        bottom_links: [],
      },
    };
  }
};
