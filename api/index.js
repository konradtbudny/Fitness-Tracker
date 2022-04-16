// create an api router
// attach other routers from files in this api directory (users, activities...)
// export the api router

const express = require("express");
const bcrypt = require("bcrypt");
const { createUser } = require("../db/users");
const apiRouter = express.Router();

apiRouter.get("/health", (req, res, next) => {
  res.send({ message: "Server is healthy all is well" });
});

const usersRouter = require("./users");
apiRouter.use("/users", usersRouter);

const activitiesRouter = require("./activities");

apiRouter.use("/activities", activitiesRouter);
module.exports = apiRouter;
const cors=require('cors')
const routineActivitiesRouter = require('./routineActivitiesRouter');
const routinesRouter = require('./routinesRouter');
apiRouter.use(cors());
apiRouter.use(routinesRouter);
apiRouter.use(activitiesRouter);
apiRouter.use(usersRouter);
apiRouter.use(routineActivitiesRouter);

module.exports=apiRouter;


