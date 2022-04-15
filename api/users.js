const express = require("express");
const usersRouter = express.Router();
const { createUser } = require("../db");
const jwt = require("jsonwebtoken");

usersRouter.post("/register", async (req, res, next) => {
  const { username, password } = req.body;
  try {
    if (password.length < 8) {
      next({
        name: "Password Too Short",
        message: "Password must be greater than 8 characters",
      });
    } else {
      const user = await createUser({ username, password });

      res.send({ user });
    }
  } catch (error) {
    next(error);
  }
});

usersRouter.get("/me", async (req, res, next) => {
  res.send("hello ");
});

usersRouter.post("/login", async (req, res, next) => {
  res.send("hello ");
});

usersRouter.get("/:username/routines", async (req, res, next) => {
  res.send("hello ");
});

module.exports = usersRouter;
