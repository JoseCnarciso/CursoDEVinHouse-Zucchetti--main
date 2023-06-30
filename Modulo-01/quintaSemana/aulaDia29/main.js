const elementoLista = document.getElementById("lista");
// Array de objetos
const listaExemplo = [
    {
        id: 1,
        nome: "Francisco",
        idade: 2
    },
    {
        id: 2,
        nome: "Ione",
        idade: 30
    },
    {
        id: 3,
        nome: "José",
        idade: 35
    },
    {
        id: 4,
        nome: "Marta",
        idade: 50
    },
];
// Inicialização de array via new Array();
// const vetor = new Array();

const vetor =[3,2]
vetor.push(1);

console.log(vetor);

// Exemplo FOR comum
for(let i = 0; i < listaExemplo.length; i++){
    console.log(listaExemplo[i].nome);
}
// Exemplo FOR OF
for(let item of listaExemplo){
    console.log(item.nome);
}

//Exemplo forEach()
listaExemplo.forEach((item) =>{    
    const {id,nome,idade}= item;
    const elementoItem = document.createElement("li");

    elementoItem.innerHTML = `id: ${id} nome: ${nome} idade: ${idade}`;
    
    elementoLista.appendChild(elementoItem);
});

// Exemplo map()
const objeto = {};
objeto.exemplo = ()=>{
    return 3;
}

console.log(objeto.exemplo);

const resultado = listaExemplo.map(({id,nome,idade}) =>{
    return `id: ${id} nome: ${nome} idade: ${idade}`;
});

console.log(resultado)

// Exemplo filter() cria um novo array com os itens validados no return
const filtrado = listaExemplo.filter(({id,nome,idade}) =>{
    return idade > 31;
});

console.log(filtrado)

//Exemplo find()
// encontra um item a partir de uma condição
const encotrado = listaExemplo.find((item) =>{
    return item.id === 2;
});

console.log(encotrado);

// Exemplo findeIndex 



// Exemplo every() testa se todos satizfasem a condição
const todosSatisfazerCondicao = listaExemplo.every((item)=> {
    return item.idade >= 2;
});

console.log({todosSatisfazerCondicao});


// Exemplo some() testa se apenas alguns elementos satisfazem a condição
const algunsSatisfazem = listaExemplo.some((item) =>{
    return item.idade > 31;
});

console.log({algunsSatisfazem});

// Exemplo includes()
const palavras = ["Arroz","Feijão","Farofa"];

const simIncui = palavras.includes("Feijão");
console.log({simIncui});

// Exemplo reduce()
const numeros = [5,65,12,78,32,45,99];
// let total = 0;

const total = numeros.reduce((acumulador, num) =>{

return acumulador + num })

console.log({total});






