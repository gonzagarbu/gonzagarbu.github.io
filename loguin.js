//BORRAR LS DE AFILIADOS QUE SE LOGUEAN
//BOTON INGRESO AL SISTEMA
let loguin = document.getElementById("botonloguin");
loguin.onclick = () => {
    ingresoSistema();
}
// TRAIGO DATOS
const usuario = document.getElementById("usuarioi");
const contrasenia = document.getElementById("contraseñai");
// EVENTO PARA VALIDAR INGRESOS
usuario.oninput = () => {
    // Remplazo IF AND ELSE POR OPERADOR TERNARIO
    !isNaN(usuario.value) ? usuario.style.color="white" : (usuario.style.color="red", alert("Solo se admiten numeros"), usuario.value ="")
  }
// BUSCO EN LOCAL STORAGE SI HAY REGISTROS NUEVOS
const registroUsuarios = JSON.parse(localStorage.getItem("usuarios"));
if(registroUsuarios !== null) {
    for (const objeto of registroUsuarios) {
     arrayUsuarios.push(new Usuarios(objeto.usuario, objeto.nombre, objeto.email, objeto.contrasenia));
}
}
console.table(arrayUsuarios);
// INGRESO AL SISTEMA
function ingresoSistema() {
        const encontrado = arrayUsuarios.find((usu) => usu.usuario == usuario.value);
        const encontrado2 = arrayUsuarios.find((usu) => usu.contrasenia == contrasenia.value);
        let indice = arrayUsuarios.findIndex(usu => usu.usuario == usuario.value);
        const afilogueado = arrayUsuarios[indice].nombre
        localStorage.setItem("afilogueado",JSON.stringify(afilogueado));
        if ((encontrado != undefined) && (encontrado2 != undefined)) {  
          window.location.href = '../sistema/sistema.html'
        }
        else {
            Swal.fire({
                icon: 'error',
                title: 'Usuario y/contraseña incorrecta',
              })
            
        }
}

