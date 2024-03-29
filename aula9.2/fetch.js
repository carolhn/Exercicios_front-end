const fetch = require('node-fetch');

const fetchJoke = () => {
  const url = 'https://api.chucknorris.io/jokes/random?category=dev';
  console.log(fetch(url)); // Promise { <pending> }
}

fetchJoke();
// Como foi explicado no tópico de Promises, se o fluxo assíncrono não for controlado, ela vai retornar o seu estado e não o dado requisitado.


// Agora vamos corrigir esse problema:

const fetchJokes = () => {
  const url = 'https://api.chucknorris.io/jokes/random?category=dev';

  fetch(url)
    .then((response) => response.json())
    .then((data) => console.log(data.value));
}

fetchJokes();

// Chuck Norris writes code that optimizes itself.

// O .then() é usado "em cadeia", um conceito chamado de chaining. Assim, podemos colocar vários .then() em cadeia, e o argumento da função
// interna de um será o retorno do anterior.** A parte mais importante é que o .then() espera a resposta do fetch (ou o .then() anterior)
// ser concluída para começar a sua execução. Assim, nosso fluxo está controlado!

// COMO FUNCIONA A FUNÇÃO?

// A função fetchJoke chama o fetch que é executado e após sua execução, caso a requisição seja bem sucedida, 
// retorna para o parâmetro da função do primeiro .then() uma resposta e na sua execução iremos pegar a versão JSON dessa resposta por meio da função .json()

// Note que a função .json() também é assíncrona, por isso temos o segundo .then() que, por sua vez, vai pegar o JSON vindo do primeiro .then() 
// e dentro dele acessar o elogio que esta armazenado no campo value para mostrar no console.

// _________________________________________________________________________________________________________________________________________

// E SE DER ERRO EM ALGUMA REQUISIÇÃO?

const fetchJokeR = () => {
  const url = 'api.chucknorris.io/jokes/random?category=dev'; // Note que para forçar o erro retiramos o https:// do início da url.
  fetch(url)
    .then((response) => response.json())
    .then((data) => console.log(data.value))
    .catch((error) => console.log(`Algo deu errado :( \n${error}`));
}

fetchJokeR();

// Algo deu errado :(
// TypeError: Only absolute URLs are supported

// COMO FUNCIONA O (.catch)??

//  o .catch() recebe o erro gerado caso a requisição não seja bem sucedida, que é passado para ele como argumento de sua função interna.
// Assim, quando o fetch retorna algum erro, todos os .then() são pulados e é executado o PRIMEIRO .catch() encontrado. 
// E tem mais! O .catch() também "pega" qualquer erro que acontecer dentro de qualquer .then() anterior a ele.
// Por esse motivo ele é geralmente usado no final.
