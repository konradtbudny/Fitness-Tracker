const express = require("express");
const router = express.Router();
const { getAllActivities, createActivity } = require("../db");
const { requireUser } = require("./utils");
/*
PATCH /activities/:activityId (*)
Anyone can update an activity (yes, this could lead to long term problems a la wikipedia)

GET /activities/:activityId/routines
Get a list of all public routines which feature that activity */
router.get("/activities", async (req, res, next) => {
  try {
    const activities = await getAllActivities();
    res.send(activities);
  } catch (error) {
    next(error);
  }
});
router.post("/",requireUser,async(req,res,next)=>{
  const {name,description}=req.body;
  const data={};
  try {
    data.name=name;
    data.description=description;
    const activity=await createActivity(data);
    res.send({activity});
  } catch ({name, message}) {
    next({name,message})
  }
})
router.patch("/:activityId",requireUser,async(req,res,next)=>{
  const {activityId}=req.params;
  const {name,description}=req.body;
  const updateFields={};
  if(name){
    updateFields.name=name;
  }
  if(description){
    updateFields.description=description;
  }
  try{
    const 
  }
})
module.exports = router;
