import express from "express";
import { pegarListaDePontos } from "./database/provider.js";

const app = express();
const port = 3000;

// Configurar o middleware para servir arquivos estáticos (como HTML)
app.use(express.static('public'));

// Rota para a tabela HTML
app.get('/tabela', async (req, res) => {
    const registros = await pegarListaDePontos();
    let tabelaHTML = `
    <!DOCTYPE html>
    <html>
    <head>
        <title>Tabela de Pontos</title>
        <style>
            table {
                width: 100%;
                border-collapse: collapse;
            }
            table, th, td {
                border: 1px solid black;
            }
            th, td {
                padding: 8px;
                text-align: left;
            }
            th {
                background-color: #f2f2f2;
            }
            .filter-group {
                margin-bottom: 20px;
            }
        </style>
    </head>
    <body>
        <h1>Tabela de Pontos</h1>
        <div class="filter-group">
            <label for="nome">Filtrar por Nome:</label>
            <input type="text" id="nome" placeholder="Digite o nome">
            <label for="data">Filtrar por Data:</label>
            <input type="date" id="data">
            <button onclick="filtrarTabela()">Filtrar</button>
            <button onclick="exportarParaExcel()">Exportar para Excel</button>
        </div>
        <table id="tabela">
            <thead>
                <tr>
                    <th>Nome</th>
                    <th>Data e Hora</th>
                </tr>
            </thead>
            <tbody id="tabela-corpo">
                <!-- Dados serão preenchidos aqui -->
            </tbody>
        </table>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.17.2/xlsx.full.min.js"></script>
        <script>
            const dados = ${JSON.stringify(registros)};

            function preencherTabela(dadosFiltrados) {
                const tbody = document.getElementById('tabela-corpo');
                tbody.innerHTML = '';
                dadosFiltrados.forEach(registro => {
                    const tr = document.createElement('tr');
                    tr.innerHTML = \`
                        <td>\${registro.name}</td>
                        <td>\${registro.date}</td>
                    \`;
                    tbody.appendChild(tr);
                });
            }

            function filtrarTabela() {
                const nomeFiltro = document.getElementById('nome').value.toLowerCase();
                const dataFiltro = document.getElementById('data').value;

                const dadosFiltrados = dados.filter(registro => {
                    const nomeMatch = registro.name.toLowerCase().includes(nomeFiltro);
                    const dataMatch = dataFiltro ? registro.date.startsWith(dataFiltro) : true;
                    return nomeMatch && dataMatch;
                });

                preencherTabela(dadosFiltrados);
            }

            function exportarParaExcel() {
                const dadosParaExportar = dados.map(({ id, ...resto }) => resto); // Remove o ID
                const ws = XLSX.utils.json_to_sheet(dadosParaExportar);
                const wb = XLSX.utils.book_new();
                XLSX.utils.book_append_sheet(wb, ws, "Pontos");
                XLSX.writeFile(wb, "pontos.xlsx");
            }

            window.onload = () => {
                preencherTabela(dados);
            };
        </script>
    </body>
    </html>`;

    res.send(tabelaHTML);
});

export const startServer = () => {
    app.listen(port, () => {
        console.log(`Servidor rodando em http://localhost:${port}`);
    });
}
