// create an api router
// attach other routers from files in this api directory (users, activities...)
// export the api router
const cors=require('cors')
const express = require('express');
const apiRouter = express.Router();
const activitiesRouter = require('./activitiesRouter');
const routineActivitiesRouter = require('./routineActivitiesRouter');
const routinesRouter = require('./routinesRouter');
const usersRouter = require('./usersRouter');
apiRouter.use(cors());
apiRouter.use(routinesRouter);
apiRouter.use(activitiesRouter);
apiRouter.use(usersRouter);
apiRouter.use(routineActivitiesRouter);

module.exports=apiRouter;

