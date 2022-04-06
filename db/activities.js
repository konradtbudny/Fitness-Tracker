const { rows } = require("pg/lib/defaults");
const { client } = require("./client");

async function getActivityById(activityId) {
  try {
    const {
      rows: [activity],
    } = await client.query(
      `
          SELECT name, description FROM activities WHERE id = $1; 
          `,
      [activityId]
    );
    if (!activity) {
      return null;
    }
    return activity;
  } catch (error) {
    throw error;
  }
}

async function getAllActivities() {
  try {
    const { rows } = await client.query(
      `
          SELECT name, description 
          FROM activities;
          `
    );
    return rows;
  } catch (error) {
    throw error;
  }
}

async function createActivity({ name, description }) {
  try {
    const {
      rows: [activity],
    } = await client.query(
      `
        INSERT INTO activities (name, description)
        VALUES ($1, $2)
        RETURNING * ;
        `,
      [name, description]
    );
    return activity;
  } catch (error) {
    throw error;
  }
}

async function updateActivity({ id, name, description }) {
  try {
  } catch (error) {}
}

module.exports = {
  getActivityById,
  getAllActivities,
  createActivity,
  updateActivity,
};
