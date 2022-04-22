const express = require('express');
const {
    getAllPublicRoutines,
    createRoutine,
    updateRoutine,
    destroyRoutine,
    getRoutineById
} = require('../db');

const routinesRouter = express.Router();
const {requireUser} = require('./utils');

routinesRouter.get("/", async (req, res, next) => {
    try {
        const routines = await getAllPublicRoutines();
        res.send(routines);

    } catch ({name, message}) {
        next({name, message})
    }
})

routinesRouter.post("/", requireUser, async (req, res, next) => {
    try {
        const {isPublic, name, goal} = req.body;
        let data = {
            creatorId: req.user.id,
            isPublic,
            name,
            goal
        }
        const routine = await createRoutine(data);
        res.send(routine)
    } catch ({name, message}) {
        next({name, message})
    }
})

routinesRouter.patch("/:routineId", requireUser, async (req, res, next) => {
    try {
        const {isPublic, name, goal} = req.body;
        let data = {
            id: req.params.routineId,
            isPublic,
            name,
            goal
        }
        const update = await updateRoutine(data)
        res.send(update)
    } catch ({name, message}) {
        next({name, message})
    }
})

routinesRouter.delete("/:routineId", requireUser, async (req, res, next) => {
    try {
        const {routineId} = req.params
        const deleted = await destroyRoutine(routineId)
        res.send(deleted)
    } catch ({name, message}) {
        next({name, message})
    }

})

routinesRouter.post("/:routineId/activities", async (req, res, next) => {
    try {
        let {routineId} = req.params;
        let {activityId} = req.body
        let routine = await getRoutineById(routineId);
        routine.activityId = activityId
        delete routine.id
        res.send(routine);
    } catch ({name, message}) {
        next({name, message})
    }

})

module.exports = routinesRouter;
