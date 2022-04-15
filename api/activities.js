const express = require("express");
const router = express.Router();
const { getAllActivities } = require("../db");

router.get("/activities", async (req, res, next) => {
  try {
    console.log("AM I EVEN GETTING TO GET ALL ACTIVITIES");
    const activities = await getAllActivities();
    console.log("!!!!!!!!", getAllActivities);
    res.send(activities);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
