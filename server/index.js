const express = require("express");
const app = express();
const mysql = require('mysql2');
const cors = require("cors");

// Configuração da conexão com o banco de dados
const db = mysql.createPool({
    host: "localhost",
    user: "root",
    port: 3306,
    password: "J&k1l",
    database: "equidedb",
});

app.use(cors());
app.use(express.json());

// Rota para cadastrar um cliente
app.post("/register/cliente", (req, res) => {
    const { nome, cpf, endereco, email, assunto } = req.body;

    const SQL = "INSERT INTO cliente (nome, cpf, endereco, email, assunto) VALUES (?, ?, ?, ?, ?)";

    db.query(SQL, [nome, cpf, endereco, email, assunto], (err, result) => {
        if (err) {
            console.error("Erro ao cadastrar cliente:", err);
            return res.status(500).json({ error: "Erro ao cadastrar cliente." });
        }
        res.status(200).json({ message: "Cliente cadastrado com sucesso!" });
    });
});

// Rota para cadastrar um cavalo
app.post("/register/cavalo", (req, res) => {
    const { nome, idade, raca, condicoes_saude } = req.body;

    const SQL = "INSERT INTO cavalo (nome, idade, raca, condicoes_saude) VALUES (?, ?, ?, ?)";

    db.query(SQL, [nome, idade, raca, condicoes_saude], (err, result) => {
        if (err) {
            console.error("Erro ao cadastrar cavalo:", err);
            return res.status(500).json({ error: "Erro ao cadastrar cavalo." });
        }
        res.status(200).json({ message: "Cavalo cadastrado com sucesso!" });
    });
});

// Rota para associar cliente e cavalo
app.post("/register/cliente-cavalo", (req, res) => {
    const { cliente_id, cavalo_id } = req.body;

    const SQL = "INSERT INTO cliente_cavalo (cliente_id, cavalo_id) VALUES (?, ?)";

    db.query(SQL, [cliente_id, cavalo_id], (err, result) => {
        if (err) {
            console.error("Erro ao associar cliente e cavalo:", err);
            return res.status(500).json({ error: "Erro ao associar cliente e cavalo." });
        }
        res.status(200).json({ message: "Cliente e cavalo associados com sucesso!" });
    });
});

// Iniciando o servidor
app.listen(3001, () => {
    console.log("Servidor iniciado!");
});