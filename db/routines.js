const {client} = require("./client");
const {attachActivitiesToRoutines} = require("./activities");

async function getRoutineById(routineId) {
    try {
        const {rows: [routine]} = await client.query(`SELECT * FROM routines WHERE id = $1;`, [routineId]);
        return routine;
    } catch (error) {
        throw error;
    }
}

async function getAllRoutines() {
    try {
        const {rows: routines} = await client.query(`
        SELECT routines.*, users.username AS "creatorName"
        FROM routines
        JOIN users ON routines."creatorId" = users.id`);
        return attachActivitiesToRoutines(routines);
    } catch (error) {
        throw error;
    }
}

async function getRoutinesWithoutActivities() {
    try {
        const {rows: routines} = await client.query(`SELECT routines.* FROM routines`);
        return routines;
    } catch (error) {
        throw error;
    }
}

async function getAllPublicRoutines() {
    try {
        const {rows: routines} = await client.query(`
        SELECT routines.*, users.username AS "creatorName"
        FROM routines
        JOIN users ON routines."creatorId" = users.id
        WHERE "isPublic"=${true};`);
        return attachActivitiesToRoutines(routines);
    } catch (error) {
        throw error;
    }
}

async function createRoutine({creatorId, isPublic, name, goal}) {
    try {
        const {rows: [routine]} = await client.query(`
        INSERT INTO routines("creatorId","isPublic",name, goal)
        VALUES ($1, $2, $3,$4)
        ON CONFLICT (name) DO NOTHING
        RETURNING * ;`, [creatorId, isPublic, name, goal]);
        return routine;
    } catch (error) {
        throw error;
    }
}
async function getAllRoutinesByUser({username}) {
    try {
        const {rows: routines} = await client.query(`
        SELECT routines.*, users.username AS "creatorName"
        FROM routines
        JOIN users ON routines."creatorId" = users.id
        WHERE users.username=$1;`, [username]);
        return attachActivitiesToRoutines(routines);
    } catch (error) {
        throw error;
    }
}

async function getPublicRoutinesByUser({username}) {
    try {
        const {rows: routines} = await client.query(`
        SELECT routines.*, users.username AS "creatorName"
        FROM routines
        JOIN users ON routines."creatorId" = users.id
        WHERE users.username=$1 AND "isPublic" = $2;`, [username, true]);
        return attachActivitiesToRoutines(routines);
    } catch (error) {
        throw error;
    }
}

async function getPublicRoutinesByActivity({id}) {
    try {
        const {rows: routines} = await client.query(`
        SELECT routines.*, users.username AS "creatorName"
        FROM routines
        JOIN users ON routines."creatorId"=users.id
        JOIN routine_activities ON routine_activities."routineId"=routines.id
        WHERE routines."isPublic"=true AND routine_activities."activityId"=$1`, [id]);
        const publicRoutinesByActivity = await attachActivitiesToRoutines(routines);
        return publicRoutinesByActivity;
    } catch (error) {
        throw error;
    }
}
async function updateRoutine({id, isPublic, name, goal}) {
    try {
        const temp = await getRoutineById(id);
        isPublic = isPublic ? isPublic : temp.isPublic;
        name = name ? name : temp.name;
        goal = goal ? goal : temp.goal;
        const {rows: [routine]} = await client.query(`
        UPDATE routines
        SET "isPublic" =$1, name = $2, goal=$3
        WHERE id=$4
        RETURNING *`, [isPublic, name, goal, id]);
        return routine;
    } catch (error) {
        throw error;
    }
}

async function destroyRoutine(id) {
    try {
        const {rows: [routine_activities]} = await client.query(`
        DELETE FROM routine_activities 
        WHERE "routineId" = $1
        ;
        `, [id]);

        const {rows: [routine]} = await client.query(`
        DELETE FROM routines
        WHERE id = $1
        RETURNING *;
        `, [id]);
        return routine;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    getRoutineById,
    getRoutinesWithoutActivities,
    getAllRoutines,
    getAllPublicRoutines,
    getAllRoutinesByUser,
    getPublicRoutinesByUser,
    getPublicRoutinesByActivity,
    createRoutine,
    updateRoutine,
    destroyRoutine
};
