//Criar função para validar a entrada de dados
function validacaoNumerica(){
    if(numero(valor) || valor ===''){
        return false;
    }
    return true;
}

//Calculo do valor mensal
function calcularValorMensal(){
    var salarioBruto = document.getElementById('input-valor-salario').value

    if(!validacaoNumerica(salarioBruto)){
        alert('Digite somente números.');
        return window.Location.href = 'index.html';
    }
}