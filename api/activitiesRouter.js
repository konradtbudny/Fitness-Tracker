const express = require('express');
const activitiesRouter = express.Router();
const {getAllActivities}=require("../db")

activitiesRouter.get("/activities", async (req, res, next) => {
    try {
        const activities = await getAllActivities();
        console.log("api activities",activities)
        res.send(activities);
    } catch (error) {
        next(error);
    }
});
module.exports=activitiesRouter;