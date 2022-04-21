const express = require("express");
const router = express.Router();
const { getAllActivities, createActivity, updateActivity,getPublicRoutinesByActivity } = require("../db");
const { requireUser, requireLogin } = require("./utils");

router.get("/", async (req, res, next) => {
  try {
    const activities = await getAllActivities();
    res.send(activities);
  } catch (error) {
    next(error);
  }
});
router.post("/",async(req,res,next)=>{
  const {name,description}=req.body;
  const data={};
  try {
    data.name=name;
    data.description=description;
    
    const activity=await createActivity(data);
    res.send(activity);
  } catch ({name, message}) {
    next({name,message})
  }
})
router.patch("/:activityId",async(req,res,next)=>{
  const {name,description}=req.body;
  const {activityId}=req.params;
  let data={}
  data.id=activityId;
  data.name=name;
  data.description=description
  const update= await updateActivity(data)
res.send(data)
})
router.get("/:activityId/routines",async(req,res,next)=>{
 const id=req.params.activityId
 let data={}
 data.id=id
  const routines=await getPublicRoutinesByActivity(data)
  res.send(routines)

})

module.exports = router;
