const usuarios = [
    { email: 'josecdia@hotmail.com', senha: '87120518' },
    { email: 'ionecdia@hotmail.com', senha: '87120519' },
    { email: 'francisco@hotmail.com', senha: '87120520' }
];

const clicarNoBotao = document.getElementById('login-button');
clicarNoBotao.addEventListener('click', () => {
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
            document.getElementById("logint-button").style.opacity = 1;
            document.getElementById("login-button").innerText = "Entrar";
            alert("Usuário não encontrado");
        }
    }
});

