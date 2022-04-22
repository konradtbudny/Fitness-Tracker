const express = require("express");
const usersRouter = express.Router();
const {createUser, getUserByUsername, getPublicRoutinesByUser} = require("../db");
const {requireUser} = require("./utils");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');

usersRouter.post("/register", async (req, res, next) => {
    try {
        const {username, password} = req.body;
        if (password.length < 8) {
            next({name: "Password Too Short", message: "Password must be greater than 8 characters"});
        } else {
            const user = await createUser({username, password});
            res.send({user});
        }
    } catch ({name, description}) {
        next({name, description})
    }
});

usersRouter.get("/me", requireUser, async (req, res, next) => {
    try {
        const users = await getUserByUsername(req.user.username);
        res.send(users);
    } catch ({name, description}) {
        next({name, description})
    }
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
    } catch ({name, description}) {
        next({name, description})
    }
});

usersRouter.get("/:username/routines", async (req, res, next) => {
    try {
        const routines = await getPublicRoutinesByUser(req.params);
        res.send(routines);
    } catch ({name, description}) {
        next({name, description})
    }
});

module.exports = usersRouter;
