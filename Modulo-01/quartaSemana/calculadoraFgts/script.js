// Função para calcular o valor mensal do FGTS
function validarEntradaNumerica(valor) {
    if (isNaN(valor) || valor === '') {
      return false;
    }
    return true;
  }
  
  function calcularValorMensal() {
    var salarioBruto = document.getElementById('input-valor-salario').value;
    
    if (!validarEntradaNumerica(salarioBruto)) {
      alert('Digite um valor numérico para o salário.');
      return 0;
    }
    
    var fgts = salarioBruto * 0.08;
    // Retorna o valor do FGTS
    return fgts;
  }
  
  function calcularQuantidadeMeses() {
    var valorMensal = calcularValorMensal();
    var valorTotalDeMeses = document.getElementById('input-qtd-meses').value;
    
    if (!validarEntradaNumerica(valorTotalDeMeses)) {
      alert('Digite um valor numérico para a quantidade de meses.');
      return 0;
    }
    
    // Retorna o valor total
    return valorMensal * valorTotalDeMeses;
  }
  
function exibirResultado() {
    var totalArrecadado = calcularQuantidadeMeses();
    var valorMensal = calcularValorMensal().toFixed(2);
    var valorAcumulado = totalArrecadado.toFixed(2);
  
    // Armazena os resultados em localStorage para acessar na nova página
    localStorage.setItem('valorMensal', valorMensal);
    localStorage.setItem('valorAcumulado', valorAcumulado);
  
    // Redireciona para a página de resultado
    window.location.href = 'resultadoCalculo.html';
  }  

function novoCalculo() {
    // Limpa os campos e esconde a seção de resultado
    document.getElementById('input-valor-salario').value = '';
    document.getElementById('input-qtd-meses').value = '';
    document.getElementById('output-dados').style.display = 'none';
}

document.getElementById('calcular').addEventListener('click', exibirResultado);
document.getElementById('novo-calculo').addEventListener('click', novoCalculo);
