document.addEventListener("DOMContentLoaded", function () {
    apartaments(); // Chama a função para inicializar a seleção de apartamentos
    loadReservedApartmentsFromLocalStorage(); // Carrega as reservas do armazenamento local ao carregar a página
    // localStorage.clear(); limpa os dados do local storage
});

function apartaments() {
    updateApartmentSelect(); // Chama a função para atualizar a seleção de apartamentos disponíveis
}

document.getElementById('registration-form').addEventListener('submit', registerReservation);

let reservedApartments = []; // Array para armazenar as reservas feitas

const allApartaments = [101, 102, 103, 201, 202, 203, 301, 302, 303, 401, 402, 403]; // Lista de todos os apartamentos disponíveis

const fullName = document.getElementById('fullName'); // Elemento do formulário para o nome do hóspede
const cpf = document.getElementById('cpf'); // Elemento do formulário para o CPF do hóspede
const startBooking = document.getElementById('startBooking'); // Elemento do formulário para a data de check-in
const endBooking = document.getElementById('endBooking'); // Elemento do formulário para a data de check-out

function registerReservation(event) {
    event.preventDefault(); // Impede o envio padrão do formulário

    // Captura os valores inseridos pelo usuário no formulário
    const newFullName = fullName.value;
    const newCpf = cpf.value;
    const newStartBooking = startBooking.value;
    const newEndBooking = endBooking.value;

    const selectElement = document.getElementById('form-select-apartment');
    const selectedApartament = parseInt(selectElement.value, 10);

    // Verifica se o apartamento foi selecionado ou se já está reservado
    if (!selectedApartament || reservedApartments.some(reservation => reservation.apartmentNumber === selectedApartament)) {
        alert("Selecione um apartamento disponível.");
        return;
    }

    // Remove o apartamento da lista de todos os apartamentos, pois agora está reservado
    const apartmentIndex = allApartaments.indexOf(selectedApartament);
    if (apartmentIndex !== -1) {
        allApartaments.splice(apartmentIndex, 1);
    }

    // Adiciona a nova reserva ao array de reservas
    reservedApartments.push({
        apartmentNumber: selectedApartament,
        guestName: newFullName,
        guestCPF: newCpf,
        checkInDate: newStartBooking,
        checkOutDate: newEndBooking,
    });

    // Limpa os campos do formulário após a reserva
    fullName.value = "";
    cpf.value = "";
    startBooking.value = "";
    endBooking.value = "";

    // Salva as reservas no armazenamento local e atualiza a tabela de visualização
    saveReservedApartmentsToLocalStorage();
    updateApartmentsTable();

    // Envia a reserva para o servidor através de uma requisição POST usando o método fetch
    fetch('http://localhost:3000/reservas', {
        method: 'POST',
        body: JSON.stringify(reservedApartments[reservedApartments.length - 1]),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro ao salvar a reserva no servidor.');
        }
        return response.json(); // Recebe a resposta do servidor (que inclui o ID da reserva)
    })
    .then(reservationWithId => {
        // Assume que o servidor respondeu com o objeto completo da reserva (incluindo o ID)
        reservedApartments[reservedApartments.length - 1] = reservationWithId;
        saveReservedApartmentsToLocalStorage();
        updateApartmentSelect();
        updateApartmentsTable();
        console.log('Cadastrado com sucesso');
    })
    .catch(error => {
        alert("Desculpe. Houve um erro ao cadastrar a reserva: " + error.message);
    });
}
function updateApartmentSelect() {
    const selectElement = document.getElementById("form-select-apartment");
    selectElement.innerHTML = '<option selected>Selecione o seu apartamento aqui</option>';

    // Atualiza a lista de opções de apartamentos disponíveis no formulário de registro
    allApartaments.forEach(apartment => {
        if (!reservedApartments.some(reservation => reservation.apartmentNumber === apartment)) {
            const newOption = document.createElement("option");
            newOption.value = apartment;
            newOption.textContent = apartment;
            selectElement.appendChild(newOption);
        }
    });
}

function saveReservedApartmentsToLocalStorage() {
    localStorage.setItem("reservedApartments", JSON.stringify(reservedApartments));
}

function loadReservedApartmentsFromLocalStorage() {
    const reservedApartmentsFromStorage = JSON.parse(localStorage.getItem("reservedApartments"));
    if (reservedApartmentsFromStorage) {
        reservedApartments = reservedApartmentsFromStorage;
        updateApartmentSelect();
        updateApartmentsTable();
    }
}

function formatarDataParaBR(data) {
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    return new Date(data).toLocaleDateString('pt-BR', options);
}

async function cancelarReserva(apartmentNumber) {
    const reservationIndex = reservedApartments.findIndex(reservation => reservation.apartmentNumber === apartmentNumber);

    // Verifica se a reserva foi encontrada e, se sim, realiza a exclusão através de uma requisição DELETE ao servidor
    if (reservationIndex !== -1) {
        const reservationId = reservedApartments[reservationIndex].id; // Supondo que o servidor fornece um ID para cada reserva

        try {
            const response = await fetch(`http://localhost:3000/reservas/${reservationId}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Erro ao excluir a reserva do servidor.');
            }

            // Remove a reserva do array de reservas e adiciona novamente o apartamento à lista de apartamentos disponíveis
            reservedApartments.splice(reservationIndex, 1);
            allApartaments.push(apartmentNumber);
            allApartaments.sort((a, b) => a - b);
            updateApartmentSelect();
            updateApartmentsTable();
            saveReservedApartmentsToLocalStorage();

            console.log('Reserva cancelada com sucesso');
        } catch (error) {
            alert("Desculpe. Houve um erro ao cancelar a reserva: " + error.message);
        }
    }    
}
function updateApartmentsTable() {
    const tableBody = document.querySelector("#apartmentsTable tbody");
    tableBody.innerHTML = "";

    // Atualiza a tabela de visualização de reservas
    reservedApartments.forEach((reservation) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${reservation.apartmentNumber}</td>
            <td>${reservation.guestName}</td>
            <td>${reservation.guestCPF}</td>
            <td>${formatarDataParaBR(reservation.checkInDate)}</td>
            <td>${formatarDataParaBR(reservation.checkOutDate)}</td>
            <td><button class="cancel-button" data-apartment="${reservation.apartmentNumber}">Cancelar Reserva</button></td>
        `;
        tableBody.appendChild(row);
    });

    const cancelButtons = document.querySelectorAll('.cancel-button');
    cancelButtons.forEach(button => {
        // Adiciona um ouvinte de eventos para cada botão "Cancelar Reserva"
        button.addEventListener('click', () => {
            const apartmentNumber = parseInt(button.dataset.apartment, 10);
            cancelarReserva(apartmentNumber); // Chama a função para cancelar a reserva do apartamento associado ao botão
        });
    });
}




