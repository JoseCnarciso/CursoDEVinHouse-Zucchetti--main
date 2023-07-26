import { users } from "../constants/users";


document.addEventListener('submit',login)

const loginBtn = document.getElementById('login-btn');
const inputEmail = document.getElementById('input-email');
const inputPassword = document.getElementById('input-password');

function login(event) {

    event.preventDefault();

    const email = inputEmail.value;
    const password = inputPassword.value;
    resetForm();

    if (!email) {
        inputEmail.classList.add('input-error');
        inputEmail.focus;
    } else if (!password) {
        inputPassword.classList.add('input-error');
        inputPassword.focus;
    } else {
        loginBtn.disable = true;
        loginBtn.style.opacity = 0.5;
        loginBtn.innerText = 'Logando...'

        const userSelected = users.find(
            user.email === email && user.password === password);

        if (userSelected) {
            localStorage.setItem('name_users', 'Butião');

            inputEmail.style.display = 'none';
            inputPassword.style.display = 'none';
            loginBtn.style.display = 'none'

            document.getElementById('login-form').innerText = 'Entrando...'


            setTimeout(() => {
                window.location.href = '../html/bookingRegistration.html'
            }, 1000)

        } else {

            loginButton.disabled = false
            loginButton.style.opacity = 1
            loginButton.innerText = "Entrar"

            alert("Usuário não foi encontrado")
        }
    }
}
