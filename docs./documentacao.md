# Documentação do Desafio Overlabs — API de Filmes

## 1. Objetivo do desafio

O objetivo do desafio foi criar uma API com Node.js e Express que consumisse uma API externa de metadados de filmes e transformasse os dados recebidos em um novo objeto, conforme os requisitos solicitados.

Para isso, foi necessário calcular e formatar o lucro dos filmes, converter a duração de minutos para segundos, identificar a premiação de maior relevância, retornar a nota do IMDb como string e selecionar apenas uma sinopse, seguindo a prioridade de idioma definida no enunciado. Também foi necessário remover as propriedades `locacoes`, `poster` e `trailer` do resultado final.

## 2. Configuração inicial do projeto

Antes de iniciar o desenvolvimento do desafio, criei um repositório remoto no GitHub para armazenar o projeto e acompanhar as alterações realizadas.

Em seguida, inicializei o projeto Node.js utilizando o comando `npm init -y`, que criou o arquivo `package.json` com as configurações iniciais do projeto.

Depois, instalei o Express por meio do comando `npm install express`, adicionando ao projeto o framework utilizado para criar o servidor e definir as rotas da API.

## 3. Utilização de uma branch separada

Para desenvolver o desafio, utilizei uma branch separada da principal, criada com o comando `git checkout -b nome-da-sua-branch`.

Essa decisão permitiu trabalhar nas alterações sem modificar diretamente a branch principal. Assim, as alterações podem ser testadas e verificadas antes de serem integradas à branch principal por meio de um *merge*.

## 4. Criação e inicialização do servidor

Após configurar o projeto e instalar o Express, criei o arquivo `app.js` para desenvolver a aplicação.

Inicialmente, importei o Express e criei a instância da aplicação. Em seguida, implementei uma rota de teste (`/`) que retorna a mensagem `Hello World!`.

Essa etapa permitiu verificar se o servidor estava funcionando corretamente e respondendo às requisições. Por fim, inicializei o servidor utilizando a porta `3000`, deixando a aplicação disponível para receber requisições.

## 5. Criação da rota e consumo da API externa

Após validar o funcionamento do servidor, criei a rota `/filmes`, responsável por retornar os dados dos filmes transformados conforme os requisitos do desafio.

Para obter os dados, utilizei o método `fetch()` para realizar uma requisição à API externa de metadados. Como essa operação é assíncrona, utilizei `async` na função da rota e `await` para aguardar a resposta da requisição.

Em seguida, utilizei `resposta.json()` para converter o conteúdo da resposta em dados JavaScript, permitindo acessar o array de filmes e iniciar as transformações solicitadas.

## 6. Transformação dos filmes com `map()`

Após receber os dados da API externa e convertê-los para JavaScript, utilizei o método `map()` para percorrer o array de filmes.

Dentro da função executada pelo `map()`, realizei as transformações necessárias em cada filme e retornei um novo objeto contendo apenas as propriedades exigidas pelo desafio, incluindo os campos calculados e formatados.

Dessa forma, obtive um novo array com os filmes transformados, mantendo o array original recebido da API separado do resultado final.

## 7. Conversão dos valores e cálculo do lucro

Antes de fazer o cálculo do lucro, observei que os valores de orçamento e bilheteria não estavam em um formato adequado para realizar uma subtração diretamente, pois estavam em uma única string, contendo o símbolo `$` e unidades como milhões e bilhões.

Por isso, foi necessário criar uma função auxiliar chamada `converterValor()`. Para separar a string, utilizei o método `split()`. Em seguida, usei o método `replace()` para remover o símbolo `$` e o método `parseFloat()` para converter a parte numérica da string em um número.

Depois dessa conversão, foi possível calcular o lucro subtraindo o orçamento da bilheteria.

Como o desafio também solicitava que o lucro fosse apresentado em formato de string, criei outra função auxiliar, chamada `formatarValor()`, responsável por formatar o resultado em milhões ou bilhões. Nela, utilizei o método `toFixed(1)` para manter uma casa decimal.

Por fim, chamei essa função diretamente na construção do objeto retornado pelo `map()`, mantendo a lógica de formatação separada da lógica de transformação dos filmes.

## 8. Conversão da duração para segundos

O desafio solicitava que a duração dos filmes fosse apresentada em segundos, pois esse é o padrão utilizado pela plataforma.

Como a duração recebida da API estava em minutos, multipliquei o valor por 60 para obter a duração em segundos. Em seguida, utilizei esse resultado na propriedade `duracaoSegundos` do novo objeto retornado pelo `map()`.

## 9. Seleção da nota do IMDb

Para obter a nota do IMDb, utilizei o método `find()` para localizar, no array de avaliações, o elemento cuja fonte fosse `"IMDb"`. Como o desafio solicitava que a nota fosse retornada como string, utilizei o método `toString()` para converter o valor numérico para esse formato.

## 10. Identificação da maior premiação

Para identificar a premiação de maior relevância, utilizei o método `reduce()` para percorrer o array de premiações. A lógica do acumulador foi utilizada para comparar a relevância da premiação acumulada com a relevância da premiação atual. Se o acumulador tivesse uma relevância maior, ele seria mantido; caso contrário, a premiação atual seria retornada. Dessa forma, o método mantém a premiação com maior relevância encontrada durante as comparações.

## 11. Seleção da sinopse

Observei que cada filme poderia ter mais de uma opção de sinopse, mas o desafio solicitava que fosse retornada apenas uma, seguindo uma ordem de prioridade de idioma.

Para atender a essa condição, utilizei o método `find()` para procurar primeiro uma sinopse em português (`pt-br`). Caso o resultado fosse `undefined`, utilizei outro `if` para procurar uma sinopse em inglês (`en`). Se ainda assim o resultado fosse `undefined`, utilizei o índice `[0]` para retornar a primeira sinopse disponível no array.

Dessa forma, consegui selecionar apenas uma sinopse para cada filme, respeitando a prioridade de idioma solicitada no desafio.

## 12. Remoção das propriedades

Para atender ao último requisito do desafio, utilizei o método `map()` para criar um novo array e, no objeto retornado, incluí somente as propriedades necessárias. Dessa forma, as propriedades `locacoes`, `poster` e `trailer` não foram incluídas no objeto final. Por isso, não foi necessário realizar outras transformações para removê-las.

## 13. Testes e validação da rota

Para verificar se os dados estavam sendo retornados de acordo com o desafio, utilizei alguns `console.log()` no próprio código para observar, pelo terminal, os dados que estavam sendo recebidos e transformados durante o desenvolvimento.

Também realizei o teste diretamente no navegador. Para isso, utilizei o comando `node app.js` no terminal para iniciar o servidor e, em seguida, acessei a rota `/filmes` pela URL disponibilizada pelo GitHub Codespaces.

Dessa forma, pude verificar se os filmes estavam sendo retornados com as propriedades solicitadas pelo desafio e se as transformações estavam funcionando corretamente. Para acessar a rota pelo navegador, foi necessário manter o servidor em execução e a porta `3000` acessível.