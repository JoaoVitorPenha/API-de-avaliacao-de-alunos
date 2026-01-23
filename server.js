const express = require("express");
const fs = require("fs");
const path = require("path");

const avaliarAluno = require("./src/avaliacao");

const app = express();
app.use(express.json());
app.use(express.static("public"));

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

    const novoAlunoComId = {
    	id: Date.now();
    	nome: novoAluno.nome;
    	notas: novoAluno.notas;
    }

    alunos.push(novoAlunoComId);

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
// DELETE /alunos/:id
// =========================
app.delete("/alunos/:id", (req, res) => {
	const id = Number(req, params, id);

	const dados = fs.readFileSync(caminhoAlunos, "utf-8");
	let alunos = JSON.parse(dados);

	const tamanhoAntes = alunos.length;
	alunos = alunos.filter(aluno => aluno.id !== id);

	if (alunos.length === tamanhoAntes) {
		return res.status(404).json({erro: "Aluno não encontrado"});
	}

	fs.writeFileSync(
		caminhoAlunos;
		JSON.stringify(alunos, null, 2)
	);

	res.json({mensagem: "Aluno removido com sucesso"});
})

// =========================
// PUT /alunos/:id
// =========================
app.put("/alunos/:id", (req, res) => {
  const id = Number(req.params.id);
  const { nome, notas } = req.body;

  if (!nome || !Array.isArray(notas)) {
    return res.status(400).json({ erro: "Dados inválidos" });
  }

  const dados = fs.readFileSync(caminhoAlunos, "utf-8");
  const alunos = JSON.parse(dados);

  const aluno = alunos.find(a => a.id === id);

  if (!aluno) {
    return res.status(404).json({ erro: "Aluno não encontrado" });
  }

  aluno.nome = nome;
  aluno.notas = notas;

  fs.writeFileSync(
    caminhoAlunos,
    JSON.stringify(alunos, null, 2)
  );

  res.json({ mensagem: "Aluno atualizado com sucesso" });
});


// =========================
// SUBIR SERVIDOR
// =========================
app.listen(3000, () => {
  console.log("Servidor rodando em http://localhost:3000");
});
