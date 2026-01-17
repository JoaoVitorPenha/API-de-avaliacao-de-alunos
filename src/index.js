const fs = require("fs");
const path = require("path");
const avaliarAluno = require("./avaliacao");

// caminho absoluto até o JSON
const caminhoArquivo = path.join(__dirname, "../data/alunos.json");

// ler ficheiro
const dados = fs.readFileSync(caminhoArquivo, "utf-8");
const alunos = JSON.parse(dados);

let resultados = [];

for (let aluno of alunos) {
  resultados.push({
    nome: aluno.nome,
    resultado: avaliarAluno(aluno)
  });
}

// escrever resultado
const caminhoResultado = path.join(__dirname, "../data/resultado.json");

fs.writeFileSync(
  caminhoResultado,
  JSON.stringify(resultados, null, 2)
);

console.log("Processamento concluído. Ver data/resultado.json");