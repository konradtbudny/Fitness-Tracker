// create an api router
// attach other routers from files in this api directory (users, activities...)
// export the api router
const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const { createUser } = require("../db/users");
const activitiesRouter = require("./activities");
const apiRouter = express.Router();
apiRouter.use(cors());
apiRouter.post("/users/register", async (req, res, next) => {
  try {
    const username = req.params.username;
    const password = req.params.password;
    const user = await createUser({ username, password });
    console.log(user, "!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
    res.send(user);
  } catch (error) {
    next(error);
  }
});
apiRouter.use("/activities", activitiesRouter);
module.exports = apiRouter;
