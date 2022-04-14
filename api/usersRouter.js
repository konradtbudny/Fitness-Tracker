const express = require("express");
const usersRouter = express.Router();
const { createUser } = require("../db");

usersRouter.post("api/users/register", async (req, res, next) => {
  try {
    if (req.params.username.length > 7) {
      const username = req.params.username;
    } else {
      next("Username too short!");
    }
    if(req.params.password.length>7){
    const password = req.params.password;}
    else{
        next("Password too short!");
    }
    const user = await createUser({ username, password });
    console.log(user, "!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
    res.send(user);
  } catch (error) {
    next(error);
  }
});

module.exports = usersRouter;
