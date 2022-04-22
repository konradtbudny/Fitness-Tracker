const express = require('express');
const {updateRoutineActivity, destroyRoutineActivity} = require('../db')
const routineActivitiesRouter = express.Router();
const {requireUser} = require('./utils');

routineActivitiesRouter.patch("/:routineActivityId", requireUser, async (req, res, next) => {
    try {
        const {count, duration} = req.body;
        const {routineActivityId} = req.params
        let data = {
            id: routineActivityId,
            count,
            duration
        }
        const update = await updateRoutineActivity(data)
        res.send(update)
    } catch ({name, message}) {
        next(name, message)
    }
})

routineActivitiesRouter.delete("/:routineActivityId", requireUser, async (req, res, next) => {
    try {
        const deleted = await destroyRoutineActivity({id: req.params.routineActivityId})
        res.send(deleted)
    } catch ({name, message}) {
        next({name, message})
    }
})

module.exports = routineActivitiesRouter;
