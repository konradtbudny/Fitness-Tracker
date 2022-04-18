function requireUser(req, res, next) {
    if (! req.user) {
        next({name: "MissingUserError", message: "You must be logged in to perform this action"});
    }

    next();
}

function requireLogin(req, res, next) {
    const {username, password}=req;
    if (!username||!password) {
        next({name: "MissingLoginInfoError", message: "You must provide login info"});
    }

    next();
}


module.exports = {
    requireUser,
    requireLogin
};
