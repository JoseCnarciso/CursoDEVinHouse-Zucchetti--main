// Defina a função para adicionar os apartamentos após o carregamento do DOM
document.addEventListener("DOMContentLoaded", function () {
    apartaments();
});

document.getElementById('registration-form').addEventListener('submit', registerReservation);

const guests = [];
const reservedApartments = [];
const allApartaments = [101, 102, 103, 201, 202, 203, 301, 302, 303, 401, 402, 403];

const fullName = document.getElementById('fullName');
const cpf = document.getElementById('cpf');
const startBooking = document.getElementById('startBooking');
const endBooking = document.getElementById('endBooking');

function registerReservation(event) {
    event.preventDefault();

    const newFullName = fullName.value;
    const newCpf = cpf.value;
    const newStartBooking = startBooking.value;
    const newEndBooking = endBooking.value;

    const selectElement = document.getElementById('form-select-apartment');
    const selectedApartament = parseInt(selectElement.value, 10);

    if (!selectedApartament || reservedApartments.some(reservation => reservation.apartmentNumber === selectedApartament)) {
        alert("Selecione um apartamento válido e disponível.");
        return;
    }

    // Remover o apartamento selecionado do array allApartaments
    const apartmentIndex = allApartaments.indexOf(selectedApartament);
    if (apartmentIndex !== -1) {
        allApartaments.splice(apartmentIndex, 1);
    }

    // Adicionar o apartamento selecionado ao array reservedApartments com as informações do hóspede
    reservedApartments.push({
        apartmentNumber: selectedApartament,
        guestName: newFullName,
        guestCPF: newCpf,
        checkInDate: newStartBooking,
        checkOutDate: newEndBooking
    });

    // Limpar campos de reserva após a reserva ser feita
    fullName.value = "";
    cpf.value = "";
    startBooking.value = "";
    endBooking.value = "";

    // Atualizar o <select> após a reserva
    updateApartmentSelect();

    // Atualizar a tabela com os apartamentos alugados
    updateApartmentsTable();

    
    
}

function updateApartmentSelect() {
    const selectElement = document.getElementById("form-select-apartment");
    selectElement.innerHTML = '<option selected>Selecione o seu apartamento aqui</option>';

    allApartaments.forEach(apartament => {
        const newOption = document.createElement("option");
        newOption.value = apartament;
        newOption.textContent = apartament;
        selectElement.appendChild(newOption);
    });
}

function formatarDataParaBR(data) {
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    return new Date(data).toLocaleDateString('pt-BR', options);
}

function cancelarReserva(apartmentNumber) {
    const reservationIndex = reservedApartments.findIndex(reservation => reservation.apartmentNumber === apartmentNumber);

    if (reservationIndex !== -1) {
        // Adicionar o apartamento novamente ao array allApartaments
        allApartaments.push(apartmentNumber);

        // Remover a reserva do array reservedApartments
        reservedApartments.splice(reservationIndex, 1);

        // Atualizar o <select> após o cancelamento da reserva
        updateApartmentSelect();

        // Atualizar a tabela com os apartamentos alugados
        updateApartmentsTable();
    }
}

function updateApartmentsTable() {
    const tableBody = document.querySelector("#apartmentsTable tbody");
    tableBody.innerHTML = "";

    reservedApartments.forEach(reservation => {
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

    // Adicionar o evento de clique ao botão "Cancelar Reserva"
    const cancelButtons = document.querySelectorAll('.cancel-button');
    cancelButtons.forEach(button => {
        button.addEventListener('click', () => {
            const apartmentNumber = parseInt(button.dataset.apartment, 10);
            cancelarReserva(apartmentNumber);
        });
    });
}

// Inicializar o <select> com os apartamentos disponíveis
updateApartmentSelect();