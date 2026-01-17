const validarNotas = require("./validacoes");

function calcularMedia(notas) {
  validarNotas(notas);

  let soma = 0;
  for (let nota of notas) {
    soma += nota;
  }

  return soma / notas.length;
}

module.exports = calcularMedia;