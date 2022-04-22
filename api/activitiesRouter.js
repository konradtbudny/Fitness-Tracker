const express = require("express");
const router = express.Router();
const {getAllActivities, createActivity, updateActivity, getPublicRoutinesByActivity} = require("../db");

router.get("/", async (req, res, next) => {
    try {
        const activities = await getAllActivities();
        res.send(activities);
    } catch ({name, message}) {
        next({name, message})
    }
});

router.post("/", async (req, res, next) => {
    try {
        const {name, description} = req.body;
        const data = {
            name,
            description
        };
        const activity = await createActivity(data);
        res.send(activity);
    } catch ({name, message}) {
        next({name, message})
    }
});

router.patch("/:activityId", async (req, res, next) => {
    try {
        const {name, description} = req.body;
        const {activityId} = req.params;
        let data = {
            id: activityId,
            name,
            description
        }
        const update = await updateActivity(data)
        res.send(update)

    } catch ({name, description}) {
        next({name, description})
    }
});

router.get("/:activityId/routines", async (req, res, next) => {
    try {
        const routines = await getPublicRoutinesByActivity({id: req.params.activityId})
        res.send(routines)

    } catch ({name, description}) {
        next({name, description})
    }

});

module.exports = router;
