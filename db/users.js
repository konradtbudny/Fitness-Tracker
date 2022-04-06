// finish getUser
const {rows} = require("pg/lib/defaults");
// const client = ...require("./client");
const {getAllRoutinesByUser} = require("./routines")

async function createUser({username, password}) {
    console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! username:", username);
    try {
        const {rows: [user]} = await client.query(`
        INSERT INTO users(username, password)
        VALUES ($1,$2)
        ON CONFLICT (username) DO NOTHING
        RETURNING *;
        `, [username, password]);
        return user;
    } catch (error) {
        throw error;
    }
}
async function getUser({username, password}) {}

async function getUserById(userId) {
    try {
        const {rows: [user]} = await client.query(`
        SELECT id,username FROM users WHERE id=$1;
        `, [{
                userId
            }]);
        if (!user) {
            return null;
        }
        user.routine = await getAllRoutinesByUser(user.username);
        return user;
    } catch (error) {
        throw error;
    }
}
async function getUserByUsername(username) {
    try {
        const {rows: [user]} = await client.query(`
        SELECT * FROM users WHERE username=$1;
        `, username);
        return user;
    } catch (error) {
        throw error;
    }
}
module.exports = {
    createUser,
    getUser,
    getUserById,
    getUserByUsername
};
