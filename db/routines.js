const { client } = require("./client");
const { attachActivitiesToRoutines } = require("./activities");

async function getRoutineById(routineId) {
  try {
    const {
      rows: [routine],
    } = await client.query(
      `
            SELECT * FROM routines WHERE id = $1; 
            `,
      [routineId]
    );
    // if (!activity) {
    // return null;
    // }
    return routine;
  } catch (error) {
    throw error;
  }
}

async function getAllRoutines() {
  try {
    const { rows: routines } = await client.query(`
    SELECT routines.*, users.username AS "creatorName"
    FROM routines
    JOIN users ON routines."creatorId" = users.id
    `);
    return attachActivitiesToRoutines(routines);
  } catch (error) {
    throw error;
  }
}

async function getRoutinesWithoutActivities() {
  try {
    const { rows: routines } = await client.query(`
    SELECT routines.* 
    FROM routines
    `);
    return routines;
  } catch (error) {
    throw error;
  }
}

async function getAllPublicRoutines() {
  try {
    const { rows: routines } = await client.query(`
        SELECT routines.*, users.username AS "creatorName"
        FROM routines
        JOIN users ON routines."creatorId" = users.id
        WHERE "isPublic"=${true};
        `);
    return attachActivitiesToRoutines(routines);
  } catch (error) {
    throw error;
  }
}

async function createRoutine({ creatorId, isPublic, name, goal }) {
  try {
    const {
      rows: [routine],
    } = await client.query(
      `
        INSERT INTO routines("creatorId","isPublic",name, goal)
        VALUES ($1, $2, $3,$4)
        ON CONFLICT (name) DO NOTHING
        RETURNING * ;
        `,
      [creatorId, isPublic, name, goal]
    );
    return routine;
  } catch (error) {
    throw error;
  }
}
async function getAllRoutinesByUser({ username }) {
  try {
    const { rows: routines } = await client.query(
      `
        SELECT routines.*, users.username AS "creatorName"
        FROM routines
        JOIN users ON routines."creatorId" = users.id
        WHERE users.username=$1;
        `,
      [username]
    );
    return attachActivitiesToRoutines(routines);
  } catch (error) {
    throw error;
  }
}

async function getPublicRoutinesByUser() {}
async function getPUblicRoutinesByActivity() {}
async function updateRoutine() {}

async function destroyRoutine() {}
module.exports = {
  getRoutineById,
  getRoutinesWithoutActivities,
  getAllRoutines,
  getAllPublicRoutines,
  getAllRoutinesByUser,
  getPublicRoutinesByUser,
  getPUblicRoutinesByActivity,
  createRoutine,
  updateRoutine,
  destroyRoutine,
};
