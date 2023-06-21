console.log("cheguei")

function clicarBotao() {

    var email = document.getElementById("campo-email").value
    var senha = document.getElementById("campo-senha").value

    document.getElementById('campo-email').classList.remove("input-error")
    document.getElementById('campo-senha').classList.remove("input-error")


    if (email === "") {
        document.getElementById('campo-email').classList.add("input-error")
        document.getElementById('campo-email').focus()
    } else if (!senha) {
        document.getElementById('campo-senha').classList.add("input-error")
    } else {
        document.getElementById('loginButton').disabled = true
        document.getElementById('loginButton').style.opacity = .5
        document.getElementById('loginButton').innerText = "Logando ..."
    }

    console.log(email)
    console.log(senha)
}