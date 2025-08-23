const contenedorAgenda = document.getElementById("agenda-container")
const BotonEliminar = document.getElementById("limpiar-turnos")

function renderAgenda() {
    const agenda = JSON.parse(localStorage.getItem("agenda")) || []

    contenedorAgenda.innerHTML = ""
    if (agenda.length === 0) {
        contenedorAgenda.innerHTML = "<p>No tenes turnos agendados</p>"
        return
    }

    agenda.forEach(turno => {
        const div = document.createElement("div")
        div.className = "card"
        div.innerHTML = ` <h3>${turno.especialidad}</h3>
                          <p>Fecha: ${turno.fecha}</p>
                          <p>Hora: ${turno.hora}</p>
                          <h4>Paciente:</h4>
                          <p>Nombre: ${turno.paciente.nombre}</p>
                          <p>DNI: ${turno.paciente.dni}</p>
                          <p>Contacto: ${turno.paciente.contacto}</p>
                          <p>Obra Social: ${turno.paciente.obraSocial}</p>
                          <button class="BotonEliminar" id="${turno.id}">Eliminar</button>`
        contenedorAgenda.appendChild(div)
    })

    const addButton = document.querySelectorAll(".BotonEliminar")
    addButton.forEach(button => {
      button.addEventListener("click", eliminarTurno)
    })
  }

function eliminarTurno(e) {
    const id = e.currentTarget.id
    let agenda = JSON.parse(localStorage.getItem("agenda")) || []
    agenda = agenda.filter(turno => turno.id !== id)
    localStorage.setItem("agenda", JSON.stringify(agenda))
    renderAgenda()
}

BotonEliminar.addEventListener("click", () => {
    localStorage.removeItem("agenda")
    renderAgenda()
    Swal.fire({
      title: "Agenda vaciada",
      text: "Todos los turnos fueron eliminados",
      icon: "success"
    })
})

renderAgenda()