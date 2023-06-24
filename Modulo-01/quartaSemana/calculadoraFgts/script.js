// Esta função pega os dados do iinput do salário pelo id
function calcularValorMensal() {
    var salarioBruto = document.getElementById('input-valor-salario').value;
    var fgts = salarioBruto * 0.08;
    // retorna o valor do fgts 
    return fgts;
}
// pega o input da quantidade de meses contribuidos
function calcularQuantidadeMeses() {
    var valorMensal = calcularValorMensal();
    var valorTotalDeMeses = document.getElementById('input-qtd-meses').value;
    // retorna o valor total
    return valorMensal * valorTotalDeMeses;
}

function valorTotal() {
    var totalArrecadado = calcularQuantidadeMeses();
    var valorMensal = calcularValorMensal().toFixed(2);
    var valorAcumulado = totalArrecadado.toFixed(2);
    // Pega o id da tabela e insere os dados em tela 
    document.getElementById('valorMensal').textContent = 'R$ ' + valorMensal;
    document.getElementById('valorAcumulado').textContent = 'R$ ' + valorAcumulado;
    document.getElementById('text-valor-final').textContent = 'Montante acumulado R$: ' + valorAcumulado
}

