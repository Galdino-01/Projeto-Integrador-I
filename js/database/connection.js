import knex from "knex";

export const database = knex({
    client: "sqlite3",
    useNullAsDefault: true,
    connection: {
        filename: "./database.sqlite"
    },
    pool: {
        afterCreate: (connection, done) => {
            connection.run("PRAGMA foreing_keys = ON");
            done();
        }
    }
});

import { initializeDatabase } from "./migration.js";
initializeDatabase();