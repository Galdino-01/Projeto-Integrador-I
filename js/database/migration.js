import { database } from './connection.js';

export async function initializeDatabase() {
    try {
        await database.schema.createTableIfNotExists('pontos', (table) => {
            table.increments('id').primary();
            table.string('nome_funcionario').notNullable();
            table.datetime('data').notNullable();
        });

    } catch (error) {
        console.error('Erro ao inicializar o banco de dados:', error);
    }
}

