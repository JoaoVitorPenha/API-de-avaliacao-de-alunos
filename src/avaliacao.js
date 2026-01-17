const calcularMedia = require("./media");

function avaliarAluno(aluno) {
  try {
    let media = calcularMedia(aluno.notas);

    if (media >= 8) {
      return `${aluno.nome} passou de ano com média ${media}`;
    } else {
      return `${aluno.nome} foi reprovado com média ${media}`;
    }

  } catch (erro) {
    return `Erro ao avaliar ${aluno.nome}: ${erro.message}`;
  }
}

module.exports = avaliarAluno;