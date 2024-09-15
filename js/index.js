import { SerialPort, ReadlineParser } from "serialport";
import { inserirPonto } from "./database/provider.js";
import { startServer } from "./server.js";

startServer();

const serialPort = new SerialPort({
    path: "COM3",
    baudRate: 9600
});

const parser = serialPort.pipe(new ReadlineParser({ delimiter: "\r\n" }));

parser.on("data", (data) => {
    inserirPonto(data);
});