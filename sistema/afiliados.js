
// LISTAR AFILIADOS DEL ARRAY
let listarAfiliado = document.getElementById("listado");
function renderizarAfiliados() {
  for(const afis of arrayAfiliadosLS){
    listarAfiliado.innerHTML += `
    <tr id="items" class="table-dark table-dark table-hover mb-3">
      <td class="mr-2">${afis.id}</td>
      <td class=" mr-2">${afis.nombreApellido}</td>
      <td class=" mr-2">${afis.nacionalidad}</td>
      <td class=" mr-2">${afis.email}</td>
      <td class=" mr-2">${afis.direccion}</td>
      <td class=" mr-2">${afis.dealta}</td>
      <td><button id='btn1${afis.id}' class="btn btn-danger btn-sm float-right" onclick="eliminar(event)">X</button> </td>
    </tr>
    `;
}
}
renderizarAfiliados();
//BOTON GRABAR
let miFormulario = document.querySelector("#formulario");
miFormulario.addEventListener("submit", cargaAfiliados);
let boton1 = document.getElementById("boton1");

boton1.onmouseover = () => {
  boton1.className = "btn btn-danger";
};

boton1.onmouseout = () => {
  boton1.className = "btn btn-primary";
};
// TRAER DATOS
const inputDni = document.getElementById("dni");
const inputNomApe = document.getElementById("apeNom");
const inputNacionalidad = document.getElementById("nacionalidad");
const inputEmail = document.getElementById("email");
const inputDireccion = document.getElementById("direccion");
// VALIDAR DATOS
inputDni.oninput = () => {
  !isNaN(inputDni.value) ? inputDni.style.color = "black" : (inputDni.value = "", console.log(inputDni.value.lenght), Swal.fire({
    icon: 'error',
    text: 'Solo numeros!',
  }) )
}

inputDni.onchange = () => {
  /^\d{8}$/.test(inputDni.value) ? inputDni.style.color = "black" : (Swal.fire({
    icon: 'error',
    text: 'Debe ingresar 8 numeros!',
  }),inputDni.value = "" )
}


inputNomApe.oninput = () => {
  isNaN(inputNomApe.value) ? inputNomApe.style.color = "black" : (inputNomApe.value = "", Swal.fire({
    icon: 'error',
    text: 'Solo caracteres!',
  }))
 
};
inputNacionalidad.oninput = () => {
  isNaN(inputNacionalidad.value) ? inputNacionalidad.style.color = "black" : (inputNacionalidad.value = "", Swal.fire({
    icon: 'error',
    text: 'No se admiten numeros!',
  }) )
};
//VALIDAR FORMULARIO
let ingreso = false;
function validarForm() {
  console.log(inputDni.value);
  console.log(inputNomApe.value);
  if (inputDni.value == "" || inputNomApe.value == "" || inputDireccion.value == "" || inputEmail.value == "" || inputNacionalidad.value == "") {
    inputDni.focus();
    Swal.fire({
      icon: 'error',
      text: 'Debe completar todos los datos',
    })
    ingreso = false;
    
  } else {
    ingreso = true;
  }
}

// FUNCION CARGA AFILIADOS
function cargaAfiliados(e) {
  e.preventDefault();
  validarForm();
  if (ingreso == true) {
  Swal.fire({
    title: 'Desea ingresar al afiliado?',
    showDenyButton: true,
    showCancelButton: true,
    confirmButtonText: 'Grabar',
    denyButtonText: `No grabar`,
  }).then((ingreso) => {
    if (ingreso.isConfirmed) {
      const afiliadoNuevo = new Afiliados(
        inputDni.value,
        inputNomApe.value,
        inputNacionalidad.value,
        inputEmail.value,
        inputDireccion.value
      );
      arrayAfiliadosLS.push(afiliadoNuevo);
      guardar_localStorage();
      // Inserto en HTML
      let listarAfiliado = document.getElementById("listado");
      listarAfiliado.innerHTML += `
                <tr id="items" class="table-dark table-hover mb-3">
                    <td class="table-dark table-hover mr-2">${afiliadoNuevo.id}</td>
                    <td class="ttable-dark table-hover mr-2">${afiliadoNuevo.nombreApellido}</td>
                    <td class="table-dark table-hover mr-2">${afiliadoNuevo.nacionalidad}</td>
                    <td class="table-dark table-hover mr-2">${afiliadoNuevo.email}</td>
                    <td class="table-dark table-hover mr-2">${afiliadoNuevo.direccion}</td>
                    <td class="table-dark table-hover mr-2">${afiliadoNuevo.dealta}</td>
                    <td><button id='btn1${afiliadoNuevo.id}' class="btn btn-danger btn-sm float-right" onclick="eliminar(event)">X</button> </td>
                </tr>
                 `;
      vaciarImputs();
      Swal.fire('Ingresado con exito')
    } else if (ingreso.isDenied) {
      inputDni.focus();
      vaciarImputs();
      Swal.fire('Se ha cancelado el ingreso')
    }
    
  })
}
}
// VACIAR IMPUTS
function vaciarImputs() {
  inputDni.value = "";
  inputDireccion.value = "";
  inputNacionalidad.value = "";
  inputEmail.value = "";
  inputNomApe.value = "";
}
//BORRAR AFILIADOS
function eliminar(ev) {
  console.log(ev);
  let fila = ev.target.parentElement.parentElement;
  console.log(fila);
  let id = fila.children[0].innerText;
  console.log(id);
  let indice = arrayAfiliadosLS.findIndex(afi => afi.id == id);
  console.log(indice)
  //Borro de ArrayAfiliados
  arrayAfiliadosLS.splice(indice,1);
  console.table(arrayAfiliadosLS);
  //Borro del HTML
  fila.remove();
  //Guardo en LocalStorage
  guardar_localStorage();
}
// LOCAL STORAGE
function guardar_localStorage() {
  localStorage.setItem("afiliados", JSON.stringify(arrayAfiliadosLS));
}
