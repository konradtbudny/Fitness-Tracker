const express = require("express");
const usersRouter = express.Router();
const {createUser, getUserByUsername} = require("../db");
const {requireLogin} = require("./utils");
const jwt = require("jsonwebtoken");
const bcrypt=require('bcrypt');

usersRouter.post("/register", async (req, res, next) => {
    const {username, password} = req.body;
    try {
        if (password.length < 8) {
            next({name: "Password Too Short", message: "Password must be greater than 8 characters"});
        } else {
            const user = await createUser({username, password});
            res.send({user});
        }
    } catch (error) {
        next(error);
    }
});

usersRouter.get("/me", async (req, res, next) => {
    res.send("hello ");
});

usersRouter.post("/login", async (req, res, next) => {
    const {username, password} = req.body;
    if (!username || !password) {
        next({name: "MissingCredentialsError", message: "Please supply both a username and password"});
    }

    try {
        const user = await getUserByUsername(username);
        const comparePasswords = await bcrypt.compare(password, user.password)
        if (user && comparePasswords) {
            const token = jwt.sign({
                username,
                id: user.id
            }, process.env.JWT_SECRET);
            res.send({message: "you're logged in!", token: token});
        } else {
            next({name: "IncorrectCredentialsError", message: "Username or password is incorrect"});
        }
    } catch (error) {
        console.log(error);
        next(error);
    }
});

usersRouter.get("/:username/routines", async (req, res, next) => {
    res.send("hello ");
});

module.exports = usersRouter;
