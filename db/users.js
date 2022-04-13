const {rows} = require("pg/lib/defaults");
const {client} = require("./client");
const {getAllRoutinesByUser} = require("./routines")
const bcrypt=require('bcrypt');

async function createUser({username, password}) {
    try {
        const SALT_COUNT = 10;
        const hashedPassword = await bcrypt.hash(password, SALT_COUNT);
        const {rows: [user]} = await client.query(`
        INSERT INTO users(username, password)
        VALUES ($1,$2)
        ON CONFLICT (username) DO NOTHING
        RETURNING *;
        `, [username, hashedPassword]);
        delete user.hashedPassword;
        delete user.password;
        return user;
    } catch (error) {
        throw error;
    }
}

async function getUserById(userId) {
    try {
        const {rows: [user]} = await client.query(`
        SELECT id,username FROM users WHERE id=$1;
        `, [userId]);
        if (!user) {
            return null;
        }
        // user.routine = await getAllRoutinesByUser(user.username);
        return user;
    } catch (error) {
        throw error;
    }
}
async function getUserByUsername(username) {
    try {
        const {rows: [user]} = await client.query(`
        SELECT * FROM users WHERE username=$1;
        `, [username]);
        if (!user) {
            return null;
        }
        return user;
    } catch (error) {
        throw error;
    }
}
async function getUser({username, password}) {
    try {

        let user = await getUserByUsername(username);
        const hashedPassword=user.password;
        const passwordMatch=await bcrypt.compare(password, hashedPassword);
        if (passwordMatch) {
            delete user.password;
            return user;
        } else {
            return;
        }
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
