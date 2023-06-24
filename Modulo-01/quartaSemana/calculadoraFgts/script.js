function calcularValorMensal() {
    var salarioBruto = document.getElementById('input-valor-salario').value;
    var fgts = salarioBruto * 0.08;
    return fgts;
}

function calcularQuantidadeMeses() {
    var valorMensal = calcularValorMensal();
    var valorTotalDeMeses = document.getElementById('input-qtd-meses').value;
    return valorMensal * valorTotalDeMeses;
}

function valorTotal() {
    var totalArrecadado = calcularQuantidadeMeses();
    var valorMensal = calcularValorMensal().toFixed(2);
    var valorAcumulado = totalArrecadado.toFixed(2);

    document.getElementById('valorMensal').textContent = 'R$ ' + valorMensal;
    document.getElementById('valorAcumulado').textContent = 'R$ ' + valorAcumulado;
}