const cors = require('cors')
const express = require('express');
const jwt = require('jsonwebtoken');
const {JWT_SECRET} = process.env;
const apiRouter = express.Router();
const {getUserById} = require('../db');

const usersRouter = require("./usersRouter");
const activitiesRouter = require("./activitiesRouter");
const routinesRouter = require('./routinesRouter');
const routineActivitiesRouter = require('./routineActivitiesRouter');

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

apiRouter.get("/health", (req, res, next) => {
    res.send({message: "Server is healthy all is well"});
});

apiRouter.use(cors());
apiRouter.use("/users", usersRouter);
apiRouter.use("/activities", activitiesRouter);
apiRouter.use("/routines", routinesRouter);
apiRouter.use("/routine_activities", routineActivitiesRouter);

module.exports = apiRouter;
