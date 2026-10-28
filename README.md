# Desafio Overlabs — API de Filmes

## Sobre o projeto

O objetivo deste desafio foi desenvolver uma API com Node.js e Express que consome uma API externa de metadados de filmes e transforma os dados recebidos conforme os requisitos propostos.

A rota `/filmes` retorna os filmes com as seguintes transformações:

- Cálculo e formatação do lucro, subtraindo o orçamento da bilheteria.
- Conversão da duração de minutos para segundos.
- Seleção da nota do IMDb, retornada como string.
- Identificação da premiação de maior relevância.
- Seleção de uma sinopse seguindo a prioridade de idioma: português (`pt-br`), inglês (`en`) e, como alternativa, a primeira disponível.
- Retorno somente das propriedades solicitadas, sem `locacoes`, `poster` e `trailer`.

## Tecnologias utilizadas

- Node.js
- Express
- JavaScript
- Git e GitHub

## Como executar o projeto

1. Clone o repositório.
2. Instale as dependências:

   ```bash
   npm install
   ```

3. Inicie o servidor:

   ```bash
   node app.js
   ```

4. Acesse a rota `/filmes` pelo navegador ou por uma ferramenta de requisições HTTP.

Por padrão, o servidor utiliza a porta `3000`.

## Principais conceitos aplicados

Durante o desenvolvimento, utilizei `fetch()` para consumir a API externa, `map()` para gerar um novo array de filmes transformados, `find()` para localizar informações específicas e `reduce()` para identificar a premiação de maior relevância. Também criei funções auxiliares para converter e formatar os valores financeiros.

## Documentação

Consulte a [documentação completa](docs/documentacao.md) para conhecer as etapas de desenvolvimento e os testes realizados.
