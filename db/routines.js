const { rows } = require("pg/lib/defaults");
const { client } = require("./client");

 async function getRoutineById(routineId) {
    try {
        const {
          rows: [routine],
        } = await client.query(
          `
              SELECT * FROM routine WHERE id = $1; 
              `,
          [routineId]
        );
        // if (!activity) {
        //   return null;
        // }
        return routine;
      } catch (error) {
        throw error;
      }
 }
// async function getRoutinesWithoutActivities() {}
// async function getAllRoutines() {}
// async function getAllPublicRoutines() {}
async function createRoutine({ creatorId, isPublic, name, goal }){
try {
    const {
        rows: [routine],
      } = await client.query(
        `
          INSERT INTO routines   ("creatorId","isPublic",name, goal)
          VALUES ($1, $2, $3,$4)
          ON CONFLICT (name) DO NOTHING
          RETURNING * ;
          `,
        [creatorId,isPublic,name,goal]
      );
      return routine;
} catch (error) {
    throw error;
}
}
 module.exports = {
   getRoutineById,
//   getRoutinesWithoutActivities,
//   getAllRoutines,
//   getAllPublicRoutines,
//   getAllRoutinesByUser,
//   getPublicRoutinesByUser,
//   getPUblicRoutinesByActivity,
   createRoutine,
//   updateRoutine,
//   destroyRoutine,
 };
