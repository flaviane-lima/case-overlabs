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
        if(acumulador.relevancia > atual.relevancia) {
          return acumulador
        } else {
          return atual
        }
      }, 
      item.premios[0]
     );


    return {
       titulo: item.titulo,
       ano: item.ano,
       diretor: item.diretor,
       genero: item.genero,
       duracaoSegundos: duracaoEmSegundos,
       lucro: lucro,
       maiorPremiacao: maiorPremiacao.nome
    };
  });

  res.json(filmesTransformados);

});

//inicialização do servidor
app.listen(3000, () => {
  console.log('Server running on port 3000')
});

