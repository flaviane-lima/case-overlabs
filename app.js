const express = require('express');
const app = express();

//rota de teste
app.get('/', (req, res) => {
  res.send('Hello World!')
});

// Função auxiliar: fora da rota
function converterValor(valor) {
  const partes = valor.split(" ");
  const valorSemRefrao = partes[0].replace("$", "");
  const valorFinal = parseFloat(valorSemRefrao)

  if (partes[1] === "milhões") {
    return valorFinal * 1000000
  } else {
    return valorFinal * 1000000000
  }
}
//testando no terminal se a função estava saindo os valores espeardo no calculo
console.log(converterValor("$6 milhões"));
console.log(converterValor("$2 bilhões"));


//rota dos filmes
app.get('/filmes', async (req, res) => {

  const resposta = await fetch('https://tv5hn2gvyijpl76yxlmsy66jwa0nlmxn.lambda-url.us-east-1.on.aws/')

  const dados = await resposta.json();

  const filmesTransformados = dados.filmes.map(function (item) {
    //calculo do lucro
    const lucro = converterValor(item.bilheteria) - converterValor(item.orcamento);

    //transformando para segundos
    const duracaoEmSegundos = item.duracao * 60;

    //encontrar a maior premiação usando item.premios.reduce()
    const maiorPremiacao = item.premios.reduce(
      (acumulador, atual) => {
        if (acumulador.relevancia > atual.relevancia) {
          return acumulador
        } else {
          return atual
        }
      },
      item.premios[0]
    );

    //para achar no array a condição que ele solicita
    const notaIMDb = item.ratings.find((rating) => {
      return rating.fonte === "IMDb";
    });

    //sinopse do filme por prioridade de idioma
    let sinopse = item.sinopse.find((sinopses) => {
      return sinopses.idioma === "pt-br";
    });

    if (sinopse === undefined) {
      sinopse = item.sinopse.find((sinopses) => {
        return sinopses.idioma === "en";
      });
    }

    if (sinopse === undefined) {
      sinopse = item.sinopse[0];
    }

    console.log("Sinopse escolhida:", sinopse);
    return {
      titulo: item.titulo,
      ano: item.ano,
      diretor: item.diretor,
      genero: item.genero,
      duracaoSegundos: duracaoEmSegundos,
      notaIMDb: notaIMDb.valor.toString(),
      lucro: lucro,
      maiorPremiacao: maiorPremiacao.nome,
      sinopse: sinopse.texto
    };
  });

  res.json(filmesTransformados);

});

//inicialização do servidor
app.listen(3000, () => {
  console.log('Server running on port 3000')
});

