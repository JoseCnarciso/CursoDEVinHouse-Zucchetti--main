// Classe usuario
class User {
    constructor(name, age, profession, maritalStatus, schooling) {
        this.name = name;
        this.age = age;
        this.profession = profession;
        this.maritalStatus = maritalStatus;
        this.schooling = schooling;
    }
}

// Array vazio para armazenar os usuários
let userArray = []; 


// Cria novos usuarios e adiciona no array userArray
function createUser(name, age, profession, maritalStatus, schooling) {
    const newUser = new User(name, age, profession, maritalStatus, schooling);
    userArray.push(newUser);
}

// Captura os dados dos inputs e adicionando a função 
function inputUser(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const age = document.getElementById('age').value;
    const profession = document.getElementById('profession').value;
    const maritalStatus = document.getElementById('maritalStatus').value;
    const schooling = document.getElementById('schooling').value;

    createUser(name, age, profession, maritalStatus, schooling);

    console.log(userArray)

    const output = document.getElementById('output');
    const paragraph = document.createElement('p');
    paragraph.textContent = `Nome: ${name}, Idade: ${age}, Profissão: ${profession}, Estado cívil: ${maritalStatus}, Escolaridade: ${schooling}`;
    output.appendChild(paragraph);
}


// capta o evento de click do mouse au clicar em registrar
const registerButton = document.getElementById('addButton');
registerButton.addEventListener('click', inputUser);

