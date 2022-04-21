const express = require('express');
const {updateRoutineActivity, getRoutineById, destroyRoutineActivity, getRoutineActivityById} = require('../db')
const {requireUser} = require('./utils');
const jwt = require("jsonwebtoken");
const req = require('express/lib/request');
const {de} = require('faker/lib/locales');
const routineActivitiesRouter = express.Router();

routineActivitiesRouter.patch("/:routineActivityId", requireUser, async (req, res, next) => {
    const {count, duration} = req.body
    let data = {}
    data.count = count
    data.duration = duration
    const id=req.params.routineActivityId
    data.id=id
    try {
        console.log(id,"data")
        const routineActivity=await getRoutineActivityById(data)
        console.log(routineActivity,"routineActivity")
        const routine = await getRoutineActivityById(routineActivity.routineId)
        console.log(routine,"routine")
        if (routine.creatorId == req.user.id) {
            const update = await updateRoutineActivity(data)
            res.send(update)
        } else {
            next({name: "UnauthorizedUserError", message: "You cannot update a routine activity that is not yours"})
}}catch({name,message}){
    next({name,message})
}})

routineActivitiesRouter.delete("/:routineActivityId", requireUser, async (req, res, next) => {
    const id = req.params.routineActivityId;
    try {
        const deleted = await destroyRoutineActivity(id)

    } catch ({name, message}) {
        next({name, message});
    }
})
/*
PATCH /routine_activities/:routineActivityId (**)
Update the count or duration on the routine activity

DELETE /routine_activities/:routineActivityId (**)
Remove an activity from a routine, use hard delete

routinesRouter.post("/:routineId/activities",requireUser,async(req,res,next)=>{
    try {
        console.log(req.body, "body");
        console.log(req.params,"params")
        let routine= await getRoutineById(req.params.routineId);
        res.send(routine);
    } catch ({name,message}) {
        next({name,message})
    }

})

*/
module.exports = routineActivitiesRouter;
