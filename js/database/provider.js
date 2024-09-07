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