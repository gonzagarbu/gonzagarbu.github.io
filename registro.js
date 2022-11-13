// BUSCO EN LOCAL STORAGE SI HAY REGISTROS NUEVOS
const registroUsuarios = JSON.parse(localStorage.getItem("usuarios"));
if(registroUsuarios !== null) {
    for (const objeto of registroUsuarios) {
     arrayUsuariosLS.push(new Usuarios(objeto.usuario, objeto.nombre, objeto.email, objeto.contrasenia));
}
}
console.table(arrayUsuariosLS);
// DATOS DE IMPUTS
const inputUsuario = document.getElementById("dniu")
const inputNomApeU = document.getElementById("apenomu")
const inputEmail = document.getElementById("correou")
const inputContrasenia = document.getElementById("password")
//BOTON GRABAR
let miFormularioUsuarios = document.getElementById("botonusuario");
miFormularioUsuarios.onclick = () => {
    cargaUsuarios();
}
//EVENTOS PARA VALIDAR IMPUTS
inputNomApeU.oninput = () => {
  isNaN(inputNomApeU.value) ? inputNomApeU.style.color="white" : (inputNomApeU.style.color="red", Swal.fire({
    icon: 'error',
    text: 'No se admiten numericos!',
  }), inputNomApeU.value ="");
}
inputUsuario.oninput = () => {
  !isNaN(inputUsuario.value) ? inputUsuario.style.color="white" : (Swal.fire({
    icon: 'error',
    text: 'Solo numeros!',
  }), inputUsuario.value ="")
}
// FUNCION CARGA USUARIOS
function cargaUsuarios(){
    validarForm();
    if (ingreso == true) {
    Swal.fire({
      title: 'Desea registrar el usuario?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Grabar',
      denyButtonText: `No grabar`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        const usuarioNuevo = new Usuarios( inputUsuario.value, inputNomApeU.value, inputEmail.value, inputContrasenia.value)
        arrayUsuariosLS.push(usuarioNuevo);
        guardar_localStorage();
        console.table(arrayUsuarios);
        Swal.fire('Usuario Registrado!')
        borrarDatosFormulario();
      } else if (result.isDenied) {
        borrarDatosFormulario();
        Swal.fire('Los Cambios no han sido grabados', '', 'info')
      }
    })
    console.table(arrayUsuariosLS);
}
}
function guardar_localStorage() {
    localStorage.setItem("usuarios", JSON.stringify(arrayUsuariosLS));

}
// FUNCION PARA BORRAR DATOS DE FORMULARIOS
function borrarDatosFormulario() {
  inputUsuario.value = "";
  inputNomApeU.value = "";
  inputEmail.value = "";
  inputContrasenia.value = "";
}

//VALIDAR SI INGRESA DATOS VACIOS
let ingreso = false;
function validarForm() {
  if (inputUsuario.value == "" || inputNomApeU.value == "" || inputEmail.value == "" || inputEmail.value == "" || inputContrasenia.value == "") {
    inputUsuario.focus();
    Swal.fire({
      icon: 'error',
      text: 'Debe completar todos los datos',
    })
    ingreso = false;
  } 
  else {
    ingreso = true
  }
}

