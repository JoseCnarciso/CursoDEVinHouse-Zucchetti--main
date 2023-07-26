document.getElementById('form-salario').addEventListener('submit', inputSalario);

let salarioBruto = document.getElementById('input-salario');

function inputSalario(event) {
    event.preventDefault();

    let salarioFuncionario = salarioBruto.value;

    let url = '/exercicioCartaSalario/index.html'
    url += '?valorSalario=' + encodeURIComponent(salarioFuncionario);
    window.location.href = url;

}

console.log(inputSalario.value)


function onPageLoad() {

    let urlParams = new URLSearchParams(window.location.search);

    let salarioFuncionario = parseFloat(urlParams.get('valorSalario'));

    return salarioFuncionario.toFixed(2);
}

let salarioFuncionario = onPageLoad();


function calcularImpostoRenda(salarioFuncionario) {
    let impostoRenda = 0

    if (salarioFuncionario <= 1903.98) {
        impostoRenda = 0
    } else if (salarioFuncionario >= 1903.99 && salarioFuncionario <= 2826.65) {
        impostoRenda = (salarioFuncionario * 0.075) - 142.80
    } else if (salarioFuncionario >= 2826.66 && salarioFuncionario <= 3751.05) {
        impostoRenda = (salarioFuncionario * 0.15) - 354.80
    } else if (salarioFuncionario >= 3751.06 && salarioFuncionario <= 4664.68) {
        impostoRenda = (salarioFuncionario * 0.225) - 636.13
    } else {
        impostoRenda = (salarioFuncionario * 0.275) - 869.36
    }
    return impostoRenda.toFixed(2);
}

let impostoRenda = calcularImpostoRenda(salarioFuncionario);


function calcularInss(salarioFuncionario) {
    let inss = 0

    if (salarioFuncionario <= 1302) {
        inss = salarioFuncionario * 0.075 // 7.5%
    } else if (salarioFuncionario >= 1302.01 && salarioFuncionario <= 2571.29) {
        inss = salarioFuncionario * 0.09 // 9%
    } else if (salarioFuncionario >= 2571.30 && salarioFuncionario <= 3856.94) {
        inss = salarioFuncionario * 0.12 // 12%
    } else {
        inss = salarioFuncionario * 0.14 //14%
    }

    return inss.toFixed(2);
}
let inss = calcularInss(salarioFuncionario);



function calcularSalarioLiquido(salarioFuncionario, impostoRenda, inss) {
    let resultadoSalarioLiquido = salarioFuncionario - impostoRenda - inss
    return resultadoSalarioLiquido.toFixed(2);
}

let resultadoSalarioLiquido = calcularSalarioLiquido(salarioFuncionario, impostoRenda, inss);




document.getElementById('impostoRenda').innerHTML = (`Desconto imposto de renda R$: ${impostoRenda}`);
document.getElementById('inss').innerHTML = (`Desconto INSS R$: ${inss}`);
document.getElementById('salarioLiquido').innerHTML = (`Salário liquído R$: ${resultadoSalarioLiquido}`);


document.addEventListener('DOMContentLoaded', onPageLoad);

console.log(salarioBruto)
console.log(inss)
console.log(impostoRenda)






