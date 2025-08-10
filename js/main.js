const cartTurnos = []
const turnosContainer = document.getElementById("turnos-container")

function renderTurnos(turnosArray) {   
    turnosArray.forEach(turno => {
        const card = document.createElement("div")
        card.className = "card"
        card.innerHTML =   `<h3>${turno.especialidad}</h3>
                            <p>Fecha: ${turno.fecha}</p>
                            <p>Hora: ${turno.hora}</p>
                            <button class="BotonAgendar" id="${turno.id}">Agendar turno</button>`
        turnosContainer.appendChild(card)
    })

    activarBotones(turnosArray)
}

function activarBotones(turnosArray) {
    const addButton = document.querySelectorAll(".BotonAgendar") 
    addButton.forEach(button => {
        button.onclick = (e) => {
            const turnoId = parseInt(e.currentTarget.id)
            const turnoSeleccionado = turnosArray.find(turno => turno.id === turnoId)
            const turnoAgendado = cartTurnos.find(turno => turno.id === turnoId)

            if (turnoSeleccionado && !turnoAgendado) {
                cartTurnos.push(turnoSeleccionado)
                agendarTurno(turnoSeleccionado)
                Swal.fire({
                    title: "Turno agendado con exito",
                    text: "Podes verlo en la siguiente pagina",
                    icon: "success"
                })
            } else if (turnoAgendado) {
                Swal.fire({
                    title: "Turno ya agendado",
                    text: "Este turno ya está en tu agenda",
                    icon: "warning"
                })
            } else {
                Swal.fire({
                    title: "Error",
                    text: "No se pudo encontrar el turno",
                    icon: "error"
                })
            }
        }
    })
}


function agendarTurno(turno) {
    let agenda = JSON.parse(localStorage.getItem("agenda")) || []
    let turnoExistente = agenda.find(turnoAgendado => turnoAgendado.id === turno.id)

    if (!turnoExistente) {
        agenda.push(turno)
        localStorage.setItem("agenda", JSON.stringify(agenda))
    }
}


function obtenerTurnos() {
    fetch("./db/data.json")
        .then((response) => response.json())
        .then((data) => {
            renderTurnos(data)
        })
        
}

obtenerTurnos()