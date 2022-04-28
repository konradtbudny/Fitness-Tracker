const express = require('express');
const {
    getAllPublicRoutines,
    createRoutine,
    updateRoutine,
    destroyRoutine,
    getRoutineById,
    getRoutineActivitiesByRoutine,
    addActivityToRoutine
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

routinesRouter.post('/:routineId/activities', async (req, res, next) => {
    try {
      const {activityId, count, duration} = req.body;
      const {routineId} = req.params;
      const foundRoutineActivities = await getRoutineActivitiesByRoutine({id: routineId});
      const existingRoutineActivities = foundRoutineActivities && foundRoutineActivities.filter(routineActivity => routineActivity.activityId === activityId);
      if(existingRoutineActivities && existingRoutineActivities.length) {
        next({
          name: 'RoutineActivityExistsError',
          message: `A routine_activity by that routineId ${routineId}, activityId ${activityId} combination already exists`
        });
      } else {
        const createdRoutineActivity = await addActivityToRoutine({ routineId, activityId, count, duration });
        if(createdRoutineActivity) {
          res.send(createdRoutineActivity);
        } else {
          next({
            name: 'FailedToCreate',
            message: `There was an error adding activity ${activityId} to routine ${routineId}`
          })
        }
      }
    } catch (error) {
      next(error);
    }
  });

module.exports = routinesRouter;
