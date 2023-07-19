const funcionarios = [
    {nome: 'jose', salari:1302.30},
    {nome: 'francisco', salari:1302.30},
    {nome: 'carlos', salari:1302.30},
    {nome: 'ione', salari:1302.30},
];

// retorna um novo array
const novosFuncionariosSalarioFormatado = funcionarios.map(funcionario =>{
    return {
        ...funcionario,
        salarioFormatado: 'R$: '
    }
});





