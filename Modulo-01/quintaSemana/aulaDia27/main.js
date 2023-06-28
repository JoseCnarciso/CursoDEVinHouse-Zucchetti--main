// Utilizar no inicio do codigo .. impede que variavés não explicitamente definidas sejam usadas, causando erro no codigo
"use strict";
const texto = "casa da mãe Joana";
console.log(texto);

const vetor = ["teste 1", "Batata Doce", "Diabetes"];
console.log(vetor);
console.log(vetor[1]);

// adicionando novos dados no vetor
vetor.push("Ovo frito")

// Acessa item 4
console.log(vetor,vetor[3])


const inicializandoVetor =[];

// Verificando o tamanho do vetor
console.log(vetor.length);

// Acessar o ultimo item do vetor
console.log(vetor[vetor.length -1]);
// acessa o ultimo item  (Se colocar os numeros negativos será decrescente)
console.log(vetor.at(-1));

// exemplo objeto vazio
const objeto = {};

// adicionando dado dentro de um objeto
// Key-valeu
objeto.a = 1;

console.log(objeto);

// Exemplo de estrutura de array com objetos

const listaPessoas =[
    {
        id: 1,
        nome: "José",
        profissao: "Programador"
    },
    {
        id:2,
        nome:"Carlos",
        profissao:"Aprendiz"
    }

]

console.log(listaPessoas[0].profissao);




