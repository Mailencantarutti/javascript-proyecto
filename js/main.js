let continuar = true


while (continuar) {
    let menu = parseInt(prompt("MENU PRINCIPAL PARA ATENDERSE CON LA NUTRICIONISTA \n\n 1- Datos del profesional \n 2- Registrate en el sistema \n 3- Horarios de atencion \n 4- Sacar nuevo turno \n 5- Mis turnos anteriores \n 6- calcular IMC \n 7- calcular consumo de agua por dia \n 8- Otras Especialidades" ))
   
    switch (menu) {
        case 1:
            function presentacion (nombre, profesion, matricula) {
                alert("\nNombre: " + nombre + "\nprofesion: " + profesion + "\nMatricula: "+ matricula)
            }
            presentacion ("Mailen","Nutricionista",67934)
            break
        case 2:
            let paciente = prompt("Indicar Nombre del Paciente")
            let edad = parseInt (prompt ("Indicar edad"))
            let prepaga = prompt("Indicar prepaga")
            const nacimiento = prompt("indicar año de nacimiento")
            alert("Datos paciente:\nNombre: " + paciente + "\nEdad: " + edad + "\nPrepaga: " + prepaga + "\nNacimiento: " + nacimiento)
            break
        case 3:
            alert("Atendemos de: Lunes a Viernes de 9:00 a 17:00")
            break
        case 4:
            alert("Para sacar un turno: comunicarse al 4429-0012")
            break
        case 5:
            alert("Mis turnos agendados: \n- 12/07/2025 - 10:00\n- 19/08/2025 - 11:30")
            break
        case 6: 
            let peso = prompt ("indica tu peso en kg") 
            let altura = prompt ("indica tu altura en metros")
            let resultado = peso / (altura * altura)
            if (resultado < 18.5) {
            alert("bajo peso")
            } else if (resultado >= 18.5 && resultado <= 24.9) {
            alert("peso normal")
            } else {
            alert("sobrepeso")
            }
            break
        case 7:
            function multiplicar () {
                let numeroA = parseInt (prompt("ingrese su peso en kg"))
                let numeroB = 35
                let resultado = numeroA * numeroB
                alert ("consumir " +resultado + " ml de agua por dia")
            }
            multiplicar ()
            break
        case 8:
            const especialidades = ["clinica medica", "traumatologia", "kinesiologia", "dermatologia", "ginecologia"]
            let consulta = prompt("Que especialidad estas buscando?").toLowerCase()
            if (especialidades.includes(consulta)) {
            alert("Si, tenemos " + consulta)
            } else {
            alert("Lo sentimos, no contamos con esa especialidad")
            }
            break
        default:
            alert("Opción incorrecta")
            break
        }
   
    let confirmacion = prompt("¿Desea continuar? (si/no)").toLowerCase()
    if (confirmacion === "no") {
        continuar = false
        alert("Gracias por contactarnos")
    }
}
