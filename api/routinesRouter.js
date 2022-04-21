const express = require('express');
const { getAllPublicRoutines } = require('../db');
const routinesRouter = express.Router();
/*
GET /routines
Return a list of public routines, include the activities with them
*/
routinesRouter.get("/",async(req,res,next)=>{
    try {
        const routines=await getAllPublicRoutines();
        res.send(routines);
        
    } catch (error) {
        next(error)
    }
})
/*
POST /routines (*)
Create a new routine

PATCH /routines/:routineId (**)
Update a routine, notably change public/private, the name, or the goal

DELETE /routines/:routineId (**)
Hard delete a routine. Make sure to delete all the routineActivities whose routine is the one being deleted.

POST /routines/:routineId/activities
Attach a single activity to a routine. Prevent duplication on (routineId, activityId) pair. */
module.exports=routinesRouter;