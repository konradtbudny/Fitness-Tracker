const {Client} = require("pg");
const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.NODE_ENV === "production" ? {
        rejectUnauthorized: false
    } : undefined
});

module.exports = {
    client
};
