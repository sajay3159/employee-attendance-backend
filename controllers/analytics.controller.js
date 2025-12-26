import { getDashboardAnalyticsService } from "../services/analytics.service.js";

export const getDashboardAnalytics = async (req, res) => {
  try {
    const analytics = await getDashboardAnalyticsService();
    res.json(analytics);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
