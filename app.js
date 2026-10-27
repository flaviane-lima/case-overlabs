const express = require('express');
const app = express();

//rota de teste
app.get('/', (req, res) => {
  res.send('Hello World!')
});

//rota dos filmes
app.get('/filmes', async (req, res) => {
  const resposta = await fetch('https://tv5hn2gvyijpl76yxlmsy66jwa0nlmxn.lambda-url.us-east-1.on.aws/')

  const dados = await resposta.json();

  const filmesTransformados = dados.filmes.map(function (item) {
    return item;
  });

  res.json(filmesTransformados);

});

//inicialização do servidor
app.listen(3000, () => {
  console.log('Server running on port 3000')
});

