import { usuarios } from '../constantes/usuarios.js'

const clicarNoBotao = document.getElementById('login-button');

clicarNoBotao.addEventListener('click', clicarBottao);


function clicarBottao() {
    const email = document.getElementById("campo-email").value;
    const senha = document.getElementById("campo-senha").value;

    if (email === "") {
        document.getElementById('campo-email').classList.add('input-error');
        document.getElementById("campo-email").focus();
    } else if (senha === "") {
        document.getElementById('campo-senha').classList.add('input-error');
        document.getElementById("campo-senha").focus();
    } else {
        document.getElementById("login-button").disabled = true;
        document.getElementById("login-button").style.opacity = 0.5;
        document.getElementById("login-button").innerText = "Logando";

        const usuarioEncontrado = usuarios.find((usuario) => {
            return usuario.email === email
                && usuario.senha === senha;
        });

        if (usuarioEncontrado) {
            window.location.href = "./home.html"
        } else {

            document.getElementById("login-button").disabled = false;
            document.getElementById("login-button").style.opacity = 1
            document.getElementById("login-button").innerText = "Entrar"

            alert("Usuário não encontrado");
        }
    }
};


