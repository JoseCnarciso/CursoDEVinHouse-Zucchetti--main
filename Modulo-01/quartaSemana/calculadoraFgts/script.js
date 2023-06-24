function calcularValorMensal() {
    var salarioBruto = document.getElementById('input-valor-salario').value   

    const valorSercobradoImposto = salarioBruto - 1903.98
    var impostoRenda = 0

    if (salarioBruto >= 1903.98) {
        alert('isento')
    } else if (salarioBruto <= 2826.65) {
        impostoRenda = valorSercobradoImposto * 0.075

    } else if (salarioBruto <= 3751.05) {
        impostoRenda = valorSercobradoImposto * 0.15

    } else if (salarioBruto < 4664.68) {
        impostoRenda = valorSercobradoImposto * 0.225

    } else  {
        impostoRenda = valorSercobradoImposto * 0.275
        
    }
}

function calcularQuantidadeMeses(){    
    calcularValorMensal()
    var valorTotalDeMeses = document.getElementById('input-qtd-meses').value
    valorTotalDeMeses = (valorTotalDeMeses * calcularValorMensal)

}
