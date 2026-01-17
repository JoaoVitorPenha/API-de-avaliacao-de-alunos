const express = require("express");
const fs = require("fs");
const path = require("path");

const avaliarAluno = require("./src/avaliacao");

const app = express();
app.use(express.json());

// caminho correto para o JSON
const caminhoAlunos = path.join(__dirname, "data", "alunos.json");

// =========================
// GET /avaliar
// =========================
app.get("/avaliar", (req, res) => {
  try {
    const dados = fs.readFileSync(caminhoAlunos, "utf-8");
    const alunos = JSON.parse(dados);

    const resultados = alunos.map(aluno => ({
      nome: aluno.nome,
      resultado: avaliarAluno(aluno)
    }));

    res.json(resultados);
  } catch (erro) {
    res.status(500).json({ erro: erro.message });
  }
});

// =========================
// POST /alunos
// =========================
app.post("/alunos", (req, res) => {
  try {
    const novoAluno = req.body;

    if (!novoAluno.nome || !Array.isArray(novoAluno.notas)) {
      return res.status(400).json({ erro: "Dados inválidos" });
    }

    const dados = fs.readFileSync(caminhoAlunos, "utf-8");
    const alunos = JSON.parse(dados);

    alunos.push(novoAluno);

    fs.writeFileSync(
      caminhoAlunos,
      JSON.stringify(alunos, null, 2)
    );

    res.status(201).json({
      mensagem: "Aluno adicionado com sucesso"
    });

  } catch (erro) {
    res.status(500).json({ erro: erro.message });
  }
});

// =========================
// SUBIR SERVIDOR
// =========================
app.listen(3000, () => {
  console.log("Servidor rodando em http://localhost:3000");
});
