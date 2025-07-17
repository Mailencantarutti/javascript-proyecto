let menu = document.getElementById('menu')
let contenido = document.getElementById('contenido')


let pacientes = JSON.parse(localStorage.getItem('pacientes')) || []


let turnosAnteriores = [
    { fecha: '12/06/2025', hora: '10:00' },
    { fecha: '19/06/2025', hora: '11:30' }
]


let especialidades = [
    { nombre: 'Nutrición Deportiva' },
    { nombre: 'Nutrición Infantil' },
    { nombre: 'Nutrición Clínica' }
]


menu.addEventListener('change', (e) => {
    let opcion = e.target.value
    contenido.innerHTML = ''
    switch (opcion) {
        case "0":
            mostrarFormularioRegistro()
            break
        case "1":
            mostrarTurnosDisponibles()
            break
        case "2":
            sacarTurno()
            break
        case "3":
            mostrarTurnosAnteriores()
            break
        case "4":
            mostrarCalculadoraIMC()
            break
        case "5":
            mostrarCalculadoraAgua()
            break
         case "6":
            mostrarEspecialidades()
            break
        case "7":
            buscarPacientesPorPrepaga()
            break
}
   
})


function mostrarFormularioRegistro() {
    contenido.innerHTML = `
        <h3>Registro de Paciente</h3>
        <input type="text" id="nombre" placeholder="Nombre completo">
        <input type="number" id="edad" placeholder="Edad">
        <input type="text" id="prepaga" placeholder="Prepaga">
        <button onclick="registrarPaciente()">Registrar</button>
    `
}


function registrarPaciente() {
    let nombre = document.getElementById('nombre').value
    let edad = parseInt(document.getElementById('edad').value)
    let prepaga = document.getElementById('prepaga').value


    if (nombre && edad && prepaga) {
        let nuevoPaciente = { nombre, edad, prepaga }
        pacientes.push(nuevoPaciente)
        localStorage.setItem('pacientes', JSON.stringify(pacientes))
        console.log(`Paciente registrado:\nNombre: ${nombre}\nEdad: ${edad}\nPrepaga: ${prepaga}`)
    } 
}


function mostrarTurnosDisponibles() {
    contenido.innerHTML = `
        <h3>Turnos disponibles</h3>
        <p>Lunes a Viernes de 9:00 a 17:00</p>
    `
}


function sacarTurno() {
    contenido.innerHTML = `
        <h3>Sacar Turno</h3>
        <p>Por favor acérquese a la recepción.</p>
    `
}


function mostrarTurnosAnteriores() {
    contenido.innerHTML = `<h3>Mis turnos anteriores</h3>`
    let lista = document.createElement('ul')
    turnosAnteriores.forEach(turno => {
        let li = document.createElement('li')
        li.textContent = `${turno.fecha} - ${turno.hora}`
        lista.appendChild(li)
    })
    contenido.appendChild(lista)
}


function mostrarCalculadoraIMC() {
    let ultimoIMC = localStorage.getItem('ultimoIMC')


    contenido.innerHTML = `
        <h3>Calcular IMC</h3>
        <input type="number" id="peso" placeholder="Peso en kg">
        <input type="number" id="altura" step="0.01" placeholder="Altura en metros">
        <button onclick="calcularIMC()">Calcular</button>
    `
}


function calcularIMC() {
    let peso = parseFloat(document.getElementById('peso').value)
    let altura = parseFloat(document.getElementById('altura').value)


    if (peso > 0 && altura > 0) {
        let imc = peso / (altura * altura)
        let clasificacion = ''


        if (imc < 18.5) {
            clasificacion = 'Bajo peso'
        } else if (imc >= 18.5 && imc <= 24.9) {
            clasificacion = 'Peso normal'
        } else {
            clasificacion = 'Sobrepeso'
        }


        let resultadoIMC = `IMC: ${imc} - ${clasificacion}`
        localStorage.setItem('ultimoIMC', resultadoIMC)
        console.log(resultadoIMC)
    } 
}


function mostrarCalculadoraAgua() {
    contenido.innerHTML = `
        <h3>Calcular Consumo Diario de Agua</h3>
        <input type="number" id="pesoAgua" placeholder="Peso en kg">
        <button onclick="calcularAgua()">Calcular</button>
    `
}


function calcularAgua() {
    let peso = parseInt(document.getElementById('pesoAgua').value)
    if (peso > 0) {
        let resultado = peso * 35
        console.log(`Debes consumir ${resultado} ml de agua por día.`)
    } else {
        console.log("Ingresa un peso valido")
    }
}


function mostrarEspecialidades() {
    contenido.innerHTML = `<h3>Especialidades</h3>`
    let lista = document.createElement('ul')
   
    especialidades.forEach(especialidad => {
        let item = document.createElement('li')
        item.innerHTML = `${especialidad.nombre}`
        lista.appendChild(item)
    })

    contenido.appendChild(lista)
}


function buscarPacientesPorPrepaga() {
    contenido.innerHTML = `
        <h3>Buscar pacientes por prepaga</h3>
        <input type="text" id="busquedaPrepaga" placeholder="Nombre de la prepaga">
        <button onclick="filtrarPorPrepaga()">Buscar</button>
    `
}


function filtrarPorPrepaga() {
    let prepagaBuscada = document.getElementById('busquedaPrepaga').value.toLowerCase()


    let resultados = pacientes.filter(paciente =>
        paciente.prepaga.toLowerCase().includes(prepagaBuscada)
    )


    if (resultados.length > 0) {
        console.log(`Pacientes con prepaga que contiene "${prepagaBuscada}":`)
        resultados.forEach(p => {
            console.log(`Nombre: ${p.nombre}, Edad: ${p.edad}, Prepaga: ${p.prepaga}`)
        })
    } else {
        console.log("No se encontraron pacientes con esa prepaga")
    }
}
