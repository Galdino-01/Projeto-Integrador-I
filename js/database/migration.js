import { database } from './connection.js';

export async function initializeDatabase() {
    try {
        await database.schema.createTableIfNotExists('pontos', (table) => {
            table.increments('id').primary();
            table.string('name').notNullable();
            table.datetime('date').notNullable();
        });

        await database.schema.createTableIfNotExists('users', (table) => {
            table.increments('id').primary();
            table.string('name').notNullable();
            table.string('user_id').notNullable();
        });
    } catch (error) {
        console.error('Erro ao inicializar o banco de dados:', error);
    }
}

