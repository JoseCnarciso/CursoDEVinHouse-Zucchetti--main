document.addEventListener("DOMContentLoaded", function () {
    apartaments();
    loadReservedApartmentsFromLocalStorage();
});

function apartaments() {
    updateApartmentSelect();
}

document.getElementById('registration-form').addEventListener('submit', registerReservation);

let reservedApartments = [];

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
        alert("Selecione um apartamento disponível.");
        return;
    }

    const apartmentIndex = allApartaments.indexOf(selectedApartament);
    if (apartmentIndex !== -1) {
        allApartaments.splice(apartmentIndex, 1);
    }

    reservedApartments.push({
        apartmentNumber: selectedApartament,
        guestName: newFullName,
        guestCPF: newCpf,
        checkInDate: newStartBooking,
        checkOutDate: newEndBooking,
    });

    fullName.value = "";
    cpf.value = "";
    startBooking.value = "";
    endBooking.value = "";

    saveReservedApartmentsToLocalStorage();
    updateApartmentsTable();

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

    if (reservationIndex !== -1) {
        const reservationId = reservedApartments[reservationIndex].id; // Supondo que o servidor fornece um id para cada reserva

        try {
            const response = await fetch(`http://localhost:3000/reservas/${reservationId}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Erro ao excluir a reserva do servidor.');
            }

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
        button.addEventListener('click', () => {
            const apartmentNumber = parseInt(button.dataset.apartment, 10);
            cancelarReserva(apartmentNumber);
        });
    });
}
