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
        div.innerHTML =    `<h3>${turno.especialidad}</h3>
                            <p>${turno.fecha}</p>
                            <p>${turno.hora}</p>
                            <button class="BotonEliminar" id="${turno.id}">Eliminar</button>`
        contenedorAgenda.appendChild(div)
    })

    const addButton = document.querySelectorAll(".BotonEliminar")
    addButton.forEach(button => {
      button.addEventListener("click", eliminarTurno)
    })
  }

function eliminarTurno(e) {
    const id = parseInt(e.currentTarget.id)
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