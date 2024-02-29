const express = require("express");
const { fetchDashboardStats } = require("../query/dashboard");

const router = express.Router();

router.get("/dashboard-stats", async function (req, res, next) {
  const [dashboardStats, error] = await fetchDashboardStats();

  if (dashboardStats && !error) {
    res.json(dashboardStats);
  } else {
    res
      .status(401)
      .json({ message: error?.message || "Error fetching dashboard" });
  }
});

module.exports = router;
