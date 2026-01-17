function validarNotas(notas) {
  if (!Array.isArray(notas)) {
    throw new Error("Notas precisam ser uma lista");
  }

  if (notas.length === 0) {
    throw new Error("Aluno sem notas");
  }

  for (let nota of notas) {
    if (typeof nota !== "number") {
      throw new Error("Nota inválida: não é número");
    }

    if (nota < 0 || nota > 10) {
      throw new Error("Nota fora do intervalo permitido (0 - 10)");
    }
  }
}

module.exports = validarNotas;