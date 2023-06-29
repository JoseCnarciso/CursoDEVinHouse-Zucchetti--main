const elementoh1 = document.getElementById('titulo');

console.log(elementoh1);

// Estruturas condicionais e estruturas de repetição

// Valores equivalentes a FALSO
// false, 0, "", null, undefined, NaN

// Valores equivalentes a TRUE
// true, numeros(positivos ou negativos), "abc", [],{} 

// Exemplo estruturas condicionais
// if SIMPLES


let valor = 0;
if(valor <= 100 ){
    console.log("Tô pobre");
}

// Exemplo de estruturas condicional 
// else 

const idade = 0;

function validardidade(){
    if(idade >= 18){
        console.log("Maior de idade");
    }else{
        console.log("Menor de idade");
    }
}

validardidade(17);

// equivalente em switch
const numero = 1;
switch(numero ){
    case 0: 
    console.log("zero");
    break;
    case 1: console.log("um");
    break;
    case 2: console.log("dois");
    break;
    default: console.log("Numero errado");
}

// Estruturas de repetição
// Exemplo for
//({inicialização}{condiçoa}{incremento})
for(let i = 0;    i < 5;    i++){
    console.log("Numero = " + i)
}

const listaA=["banana","limao", "pereira"]

for(let i = 0;    i < listaA.length;    i++){
    console.log(listaA[i])
}

// while
// let entrada ="";
// while(entrada !== "fim"){
//    let entrada = prompt("Digite fim");
//     console.log(entrada);
// }

// Exemplo forEach
const lista2 =[1,2,4,3,5,6,8,7];

lista2.push("Jabiticaba pretissima")
//imprime todos os itens da lista2
// lista2.forEach((item,indice,lista) =>{
//     console.log(item,indice,lista === listaA)
// });

// SPREAD com vetores
const vertoA = [1,2,3];
const vetorB = [4,5,6];
const vetorC = [...vetorB,...vertoA];

console.log(vetorC);

// SPREAD com objetos
const objetoA = {a:1,b:2,c:3};
const objetoB = {d:24,e:25,f:26};
const objetoC ={...objetoB,...objetoA}
console.log(objetoC);