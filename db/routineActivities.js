const { client } = require("./client");

async function getRoutineActivityById() {}

async function updateRoutineActivity() {}

async function destroyRoutineActivity() {}

async function getRoutineActivitiesByRoutine({ id }) {
  try {
    const {
      rows: [routine_activity],
    } = await client.query(
      `
      SELECT * FROM routine_activity
      RETURN *;
`
    );
  } catch (error) {
    throw error;
  }
}

async function addActivityToRoutine({
  routineId,
  activityId,
  count,
  duration,
}) {
  try {
    const {
      rows: [routine_activity],
    } = await client.query(
      `
        INSERT INTO routine_activities("routineId", "activityId", count, duration)
        VALUES ($1,$2,$3,$4)
        ON CONFLICT("routineId", "activityId") DO NOTHING
        RETURNING *;
        `,
      [routineId, activityId, count, duration]
    );
    return routine_activity;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  getRoutineActivityById,
  updateRoutineActivity,
  destroyRoutineActivity,
  getRoutineActivitiesByRoutine,
  addActivityToRoutine,
};
