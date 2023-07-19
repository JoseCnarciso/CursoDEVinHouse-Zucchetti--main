// Array vazio para armazenar os dados do formulario
const users = [];
// objeto usuario
// let user = {
//     name: '',
//     age: '',
//     profession: '',
//     maritalStatus: '',
//     schooling: ''
// }


// Classe JavaScript
class User{
    constructor(name, age,profession,maritalStatus,schooling){
        this.name = name;
        this.age = age;
        this.profession = profession;
        this.maritalStatus = maritalStatus;
        this.schooling = schooling;
    }
}


const novoUsuario = new User;



//função criada para adicionar de forma dinamica elementos dentro do array de objetos
function addUser(name, age, profession, maritalStatus, schooling) {
    const newUser = {
        name: name,
        age: age,
        profession: profession,
        maritalStatus:maritalStatus,
        schooling: schooling
    };
    users.push(newUser);
    return newUser;
};

// Função para pegar os dados enviados pelos campos de inputs
function createUser(event) {
    // evento para que o navewgador não atualize automaticamente apos receber os dados
    event.preventDefault();

    // captação de dados
    const name = document.getElementById('name').value;
    const age = document.getElementById('age').value;
    const profession = document.getElementById('profession').value;
    const maritalStatus = document.getElementById('maritalStatus').value;
    const schooling = document.getElementById('schooling').value;

    // Montando novo usuário
    const newUser = addUser(name, age, profession, maritalStatus, schooling);

    // saida de informação para o navegador
    const output = document.getElementById('output');
    // Criação do elemento paragrafo para que possa ser impresso no navegador as informaççoes
    const paragraph = document.createElement('p');
    paragraph.textContent = `Name: ${newUser.name}, Age: ${newUser.age}, Profession: ${newUser.profession}, Marital Status: ${newUser.maritalStatus}, Schooling: ${newUser.schooling}`;
    //Paramentro para colocar os dados o navegador
    output.appendChild(paragraph);
};

// capta o evento de click do mouse au clicar em registrar
const registerButton = document.getElementById('addButton');
registerButton.addEventListener('click', createUser);
