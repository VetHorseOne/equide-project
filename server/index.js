const express = require("express");
const app = express();
const mysql = require("mysql2");
const cors = require("cors");

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  port: 3306,
  password: "J&k1l",
  database: "equidedb",
});

app.use(cors());
app.use(express.json());

app.post("/register", (req, res) => {
  const { cliente, cavalo } = req.body;

  console.log("Dados recebidos:", cliente, cavalo); // Logando os dados recebidos

  const clienteQuery =
    "INSERT INTO cliente (nome, cpf, endereco, email, assunto) VALUES (?, ?, ?, ?, ?)";
  db.query(clienteQuery, [cliente.nome, cliente.cpf, cliente.endereco, cliente.email, cliente.assunto], (err, result) => {
    if (err) {
      console.error("Erro ao cadastrar cliente:", err);  // Log do erro
      return res.status(500).json({ message: "Erro ao cadastrar cliente", error: err });
    }

    const clienteId = result.insertId;

    const cavaloQuery =
      "INSERT INTO cavalo (nome, idade, raca, condicoes_saude) VALUES (?, ?, ?, ?)";
    db.query(cavaloQuery, [cavalo.nome, cavalo.idade, cavalo.raca, cavalo.condicoes_saude], (err, result) => {
      if (err) {
        console.error("Erro ao cadastrar cavalo:", err); // Log do erro
        return res.status(500).json({ message: "Erro ao cadastrar cavalo", error: err });
      }

      const cavaloId = result.insertId;

      const relacaoQuery =
        "INSERT INTO cliente_cavalo (cliente_id, cavalo_id) VALUES (?, ?)";
      db.query(relacaoQuery, [clienteId, cavaloId], (err, result) => {
        if (err) {
          console.error("Erro ao associar cliente e cavalo:", err); // Log do erro
          return res.status(500).json({ message: "Erro ao associar cliente e cavalo", error: err });
        }

        res.status(200).json({ message: "Cadastro realizado com sucesso!" });
      });
    });
  });
});

app.get("/listar", (req, res) => {
    const query =
    "SELECT cliente.id AS cliente_id, cliente.nome AS cliente_nome, cliente.cpf AS cliente_cpf, cliente.endereco AS cliente_endereco, cliente.email AS cliente_email, cliente.assunto AS cliente_assunto, " +
    "cavalo.id AS cavalo_id, cavalo.nome AS cavalo_nome, cavalo.idade, cavalo.raca, cavalo.condicoes_saude " +
    "FROM cliente " +
    "JOIN cliente_cavalo ON cliente.id = cliente_cavalo.cliente_id " +
    "JOIN cavalo ON cavalo.id = cliente_cavalo.cavalo_id";


  db.query(query, (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Erro ao listar clientes e cavalos", error: err });
    }

    res.status(200).json(result);
  });
});

app.delete('/excluir/:clienteId/:cavaloId', async (req, res) => {
    const { clienteId, cavaloId } = req.params;
  
    try {
      await db.promise().query(
        'DELETE FROM cliente_cavalo WHERE cliente_id = ? AND cavalo_id = ?',
        [clienteId, cavaloId]
      );
      await db.promise().query(
        'DELETE FROM cavalo WHERE id = ?',
        [cavaloId]
      );
      await db.promise().query(
        'DELETE FROM cliente WHERE id = ?',
        [clienteId]
      );
  
      res.status(200).send({ message: 'Cliente e cavalo excluídos com sucesso!' });
    } catch (error) {
      console.error('Erro ao excluir cliente e cavalo:', error);
      res.status(500).send({ message: 'Erro ao excluir cliente e cavalo.' });
    }
  });
  

app.put("/editar/:id", (req, res) => {
  const clienteId = req.params.id;
  const { nome, cpf, endereco, email, assunto } = req.body;

  const updateQuery =
    "UPDATE cliente SET nome = ?, cpf = ?, endereco = ?, email = ?, assunto = ? WHERE id = ?";
  db.query(updateQuery, [nome, cpf, endereco, email, assunto, clienteId], (err) => {
    if (err) {
      return res.status(500).json({ message: "Erro ao editar cliente", error: err });
    }

    res.status(200).json({ message: "Cliente editado com sucesso!" });
  });
});


app.put("/editar-cavalo/:id", (req, res) => {
  const cavaloId = req.params.id;
  const { nome, idade, raca, condicoes_saude } = req.body;

  const updateQuery =
    "UPDATE cavalo SET nome = ?, idade = ?, raca = ?, condicoes_saude = ? WHERE id = ?";
  db.query(updateQuery, [nome, idade, raca, condicoes_saude, cavaloId], (err) => {
    if (err) {
      return res.status(500).json({ message: "Erro ao editar cavalo", error: err });
    }

    res.status(200).json({ message: "Cavalo editado com sucesso!" });
  });
});


app.listen(3001, () => {
  console.log("Servidor rodando na porta 3001");
});
