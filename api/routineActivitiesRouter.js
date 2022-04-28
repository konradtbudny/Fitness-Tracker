const express = require('express');
const {updateRoutineActivity, destroyRoutineActivity, getRoutineActivityById, getRoutineById} = require('../db')
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
        const checkUser=await getRoutineActivityById(routineActivityId)
        const routine=await getRoutineById(checkUser.routineId)
        if(routine.creatorId===req.user.id){
        const update = await updateRoutineActivity(data)
        res.send(update)}
        else{
            next({name:"OwnerIssue",message:"User is not an owner"});
        }
    } catch ({name, message}) {
        next(name, message)
    }
})

routineActivitiesRouter.delete("/:routineActivityId", requireUser, async (req, res, next) => {
    try {
        let id= req.params.routineActivityId
        console.log(req.body)
        const check= await getRoutineActivityById(id)
        const routine=await getRoutineById(checkUser.routineId)
        console.log(check)
        if(routine.creatorId===req.body.user.id){
        const deleted = await destroyRoutineActivity(id)
        res.send(deleted)}
        else{

        }
    } catch ({name, message}) {
        next({name, message})
    }
})

module.exports = routineActivitiesRouter;
