const express = require('express');
const { getAllPublicRoutines ,createRoutine,updateRoutine, destroyRoutine} = require('../db');
const routinesRouter = express.Router();
const jwt = require("jsonwebtoken");
const {requireUser,requireLogin}=require('./utils');

routinesRouter.get("/",async(req,res,next)=>{
    try {
        const routines=await getAllPublicRoutines();
        res.send(routines);
        
    } catch (error) {
        next(error)
    }
})
routinesRouter.post("/",requireUser,async(req,res,next)=>{
    const{isPublic,name,goal}=req.body;
    let data={}
    try{
        data.creatorId=req.user.id;
        data.isPublic=isPublic;
        data.name=name;
        data.goal=goal;
        const routine=await createRoutine(data);
        res.send(routine)
    }catch({name,message}){
        next({name,message})
    }
})
routinesRouter.patch("/:routineId",requireUser,async(req,res,next)=>{
    const {isPublic,name,goal}=req.body;

    let data={}
    data.id=req.params.routineId;
    data.isPublic=isPublic;
    data.name=name;
    data.goal=goal;

    try {
        const update= await updateRoutine(data)
        res.send(update)
    } catch ({name,message}) {
        next(name,message)
    }
})
routinesRouter.delete("/:routineId",requireUser,async(req,res,next)=>{
    console.log(req.body, "body");
    console.log(req.params,"params")
    const {routineId}=req.params
    const id=routineId
    console.log(id)
    try {
        const deleted=await destroyRoutine(id)
        console.log(deleted,"deleted")
        res.send(deleted)
    } catch ({name,message}) {
        next({name,message})
    }

})
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
/*

DELETE /routines/:routineId (**)
Hard delete a routine. Make sure to delete all the routineActivities whose routine is the one being deleted.

POST /routines/:routineId/activities
Attach a single activity to a routine. Prevent duplication on (routineId, activityId) pair. */
module.exports=routinesRouter;