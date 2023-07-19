const lista = document.getElementById('lista');
const itens = document.getElementsByTagName("li")
const itensArray =[...itens];



console.log({lista});

console.log(lista);


// um único elemento
const elemPorId = document.getElementById("idDeUmElemento");


// arrays de elementos
const elemsPorClass = document.getElementsByClassName("classeDeElementos");

const elemsPorTag = document.getElementsByTagName("p");


const elemsPorName = document.getElementsByName("nomeDeElemento");

// primeiro elemento encontrado
const elem = document.querySelector("p#idDesseP");

// todos elementos encontrados
const elems = document.querySelectorAll("p.classeDosPs");


// pega elemento de id #app
const appElement = document.querySelector("#app");
// modifica estilos
appElement.style.color = "brown";
// cria elemento p
const novoParagrafo = document.createElement("p");
// adiciona conteúdo a p
novoParagrafo.innerHTML = "Texto no parágrafo.";
// adiciona p ao appEl
appElement.appendChild(novoParagrafo);
// remove p de appEl
novoParagrafo.parentNode.removeChild(novoParagrafo);
// (novoParagrafo.parentNode) equivale a (appElement)



