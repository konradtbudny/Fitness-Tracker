// create an api router
// attach other routers from files in this api directory (users, activities...)
// export the api router
const express = require('express');
const jwt = require('jsonwebtoken');
const {JWT_SECRET} = process.env;
const bcrypt = require('bcrypt');
const apiRouter = express.Router();
const {getUserById} = require('../db');

apiRouter.use(async (req, res, next) => {
    const prefix = 'Bearer ';
    const auth = req.header('Authorization');

    if (! auth) {
        next();
    } else if (auth.startsWith(prefix)) {
        const token = auth.slice(prefix.length);

        try {
            const {id} = jwt.verify(token, JWT_SECRET);

            if (id) {
                req.user = await getUserById(id)
                next();
            }
        } catch ({name, message}) {
            next({name, message});
        }
    } else {
        next({name: 'AuthorizationHeaderError', message: `Authorization token must start with ${prefix}`});
    }
});


apiRouter.use((req, res, next) => {
    if (req.user) {
        console.log("User is set:", req.user);
    }

    next();
});

apiRouter.get("/health", (req, res, next) => {
    res.send({message: "Server is healthy all is well"});
});

const usersRouter = require("./usersRouter");
apiRouter.use("/users", usersRouter);

const activitiesRouter = require("./activitiesRouter");

apiRouter.use("/activities", activitiesRouter);
const cors = require('cors')
const routineActivitiesRouter = require('./routineActivitiesRouter');
const routinesRouter = require('./routinesRouter');
apiRouter.use(cors());
apiRouter.use(routinesRouter);
apiRouter.use(activitiesRouter);
apiRouter.use(usersRouter);
apiRouter.use(routineActivitiesRouter);

module.exports = apiRouter;
