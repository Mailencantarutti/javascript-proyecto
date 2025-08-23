const cartTurnos = JSON.parse(localStorage.getItem("agenda")) || []
const turnosContainer = document.getElementById("turnos-container")

function renderTurnos(turnosArray) {   
    turnosArray.forEach(turno => {
        const card = document.createElement("div")
        card.className = "card"
        card.innerHTML =   `<h3>${turno.especialidad}</h3>   
                            <label>Fecha: 
                                <input type="date" id="fecha-${turno.id}">
                            </label>       
                            <label>Hora:
                                <select id="hora-${turno.id}">
                                    <option value="10:00">10:00</option>
                                    <option value="12:00">12:00</option>
                                    <option value="14:00">14:00</option>
                                    <option value="16:00">16:00</option>
                                </select>
                            </label>
            
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

            const fecha = document.getElementById(`fecha-${turnoId}`).value
            const hora = document.getElementById(`hora-${turnoId}`).value

            const paciente = {
                nombre: document.getElementById("nombre").value,
                dni: document.getElementById("dni").value,
                contacto: document.getElementById("contacto").value,
                obraSocial: document.getElementById("obraSocial").value
            }

            if (!isNaN(paciente.nombre)) {
                Swal.fire({
                    title: "Error", 
                    text: "El nombre solo puede contener letras", 
                    icon: "error"
                })
                return
            }

            if (isNaN(paciente.dni)) {
                Swal.fire({
                    title: "Error", 
                    text: "El DNI solo puede contener números", 
                    icon: "error"
                })
                return
            }

            if (isNaN(paciente.contacto)) {
                Swal.fire({
                    title: "Error", 
                    text: "El Contacto solo puede contener números", 
                    icon: "error"
                })
                return
            }

            if (!isNaN(paciente.obraSocial)) {
                Swal.fire({
                    title: "Error", 
                    text: "La Obra Social solo puede contener letras", 
                    icon: "error"
                })
                return
            }

            if (!fecha) {
                Swal.fire({
                    title: "Error",
                    text: "Debes seleccionar una fecha",
                    icon: "error"
                })
                return
            }

            let agenda = JSON.parse(localStorage.getItem("agenda")) || []
            const turnoOcupado = agenda.find(t => t.especialidad === turnoSeleccionado.especialidad && t.fecha === fecha && t.hora === hora)

            if (turnoOcupado) {
                Swal.fire({
                    title: "Turno ocupado",
                    text: "Ese turno ya fue reservado por otro paciente",
                    icon: "error"
                })
                return
            }

            if (turnoSeleccionado && !turnoAgendado) {
                const turnoFinal = {
                    id:`${turnoSeleccionado.id}-${fecha}-${hora}`,
                    especialidad: turnoSeleccionado.especialidad,
                    fecha,
                    hora,
                    paciente
                }
                cartTurnos.push(turnoFinal)
                agendarTurno(turnoFinal)
                Swal.fire({
                    title: "Turno agendado con éxito",
                    text: "Podés verlo en la siguiente página",
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
    agenda.push(turno)
    localStorage.setItem("agenda", JSON.stringify(agenda))
}


function obtenerTurnos() {
    fetch("./db/data.json")
        .then(response => response.json())
        .then(data => {
            renderTurnos(data)
        })
}


obtenerTurnos()