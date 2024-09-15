import moment from "moment";
import { database } from "./connection.js";

export async function inserirPonto(data) {

    let id = data.split(' ').join('');
    let funcionario;
    let dataPonto = moment().format("YYYY-MM-DD HH:mm:ss");

    if (id === "43B74235") {
        funcionario = "Myllena Galdino"
    } else if (id === "533A2114") {
        funcionario = "Matheus Galdino"
    }

    try {
        const register = {
            name: funcionario,
            date: dataPonto
        }
        await database("pontos").insert(register);

        console.log(`Novo registro`, register);
    } catch (error) {
        console.log(error)
    }
};

export async function pegarListaDePontos() {
    try {
        // Consulta todos os registros da tabela "pontos"
        const registros = await database("pontos").select("*");
        
        // Exibe os registros no console para verificar
        console.log("Registros encontrados:", registros.length);

        return registros;
    } catch (error) {
        console.error("Erro ao buscar registros:", error);
        throw error; // Lançar o erro novamente para que o chamador possa tratá-lo
    }
}