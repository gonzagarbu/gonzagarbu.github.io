//GET de un archivo .json propio
function obtenerDatosJson(){
  const URLJSON="https://my-json-server.typicode.com/gonzagarbu/apiPracticas/practicas";
  fetch(URLJSON)
      .then(res => res.json())
      .then(datosRecibidos => {
          //let listarPracticas = document.getElementById("listadoPracticas");
          const practic = datosRecibidos;
          practic.forEach(pr => {
              document.getElementById("listadoPracticas").innerHTML += `
              <tr class="table-dark table-hover mb-3">
                 <td class="table-dark table-hover mr-2">${pr.cod_nom}</td>
                 <td class="table-dark table-hover mr-2">${pr.nombreP}</td>
                 <td class="table-dark table-hover mr-2">${pr.coseguro}</td>
                 <td class="table-dark table-hover mr-2">API</td>
             </tr>
         `;
          })
          
      })
}

obtenerDatosJson();

// LISTAR PRACTICAS DEL ARRAY

let listarPractica = document.getElementById("listadoPracticas");
function renderizarPracticas() {
  for(const pract of arrayPracticasLS){
    listarPractica.innerHTML += `
    <tr id="items" class="table-dark table-dark table-hover mb-3">
      <td class="mr-2">${pract.cod_nom}</td>
      <td class=" mr-2">${pract.nombreP}</td>
      <td class=" mr-2">${pract.coseguro}</td>
      <td><button id='btn2${pract.cod_nom}' class="btn btn-danger btn-sm float-right" onclick="eliminarPractica(event)">X</button> </td>
    </tr>
    `;
}
}
renderizarPracticas();
//BOTON GRABAR

let boton = document.getElementById("boton2");
// CAMBIAR DE COLOR BOTON
boton.onmouseover = () => {
    boton.className = "btn btn-danger"
}
boton.onmouseout = () => {
    boton.className = "btn btn-primary"
}

// EVENTO DE TECLADO

const inputCodNom = document.getElementById("codNom")
const inputNombreP = document.getElementById("nombrep")
const inputCoseguro = document.getElementById("coseguro")

inputCodNom.oninput = () => {
  !isNaN(inputCodNom.value) ? inputCodNom.style.color = "black" : (inputCodNom.value = "", Swal.fire({
    icon: 'error',
    text: 'Solo numeros!',
  }))
}
inputCoseguro.oninput = () => {
  !isNaN(inputCoseguro.value) ? inputCoseguro.style.color = "black" : (inputCoseguro.value = "", Swal.fire({
    icon: 'error',
    text: 'Solo numeros!',
  }))
}
inputNombreP.oninput = () => {
  isNaN(inputNombreP.value) ? inputNombreP.style.color="black" : (inputNombreP.value="", Swal.fire({
    icon: 'error',
    text: 'no se admiten numericos',
  }))
}


//VALIDAR FORMULARIO
let ingresoP = false;
function validarFormPracticas() {
    if ((inputCodNom.value == "") || (inputCoseguro.value == "")) {
        Swal.fire({
            icon: 'error',
            text: 'Debe completar todos los datos',
          })
        inputCodNom.focus();
        ingresoP = false;
    }
    else {
        ingresoP = true;
    }
}

//POST - ENVIO DATOS A LA API
function enviarDatos(){
  const URLPOST="https://my-json-server.typicode.com/gonzagarbu/apiPracticas/practicas";
  const inputCodNom = document.getElementById("codNom")
  const inputNombreP = document.getElementById("nombrep")
  const inputCoseguro = document.getElementById("coseguro")
  const nuevaPract = {cod_nom: inputCodNom.value, 
                      nombreP: inputNombreP.value, 
                      coseguro: inputCoseguro.value
                    } 
  fetch(URLPOST,{
      method:"POST",
      body:JSON.stringify(nuevaPract),
      headers:{'Content-type': 'application/json; charset=UTF-8'}
  })
      .then(respuesta => respuesta.json())
      .then(datosRetorno => {
          console.log(datosRetorno);
      })
}

// FUNCION AGREGAR PRACTICAS
function agregarLocalStorage () {
            const inputCodNom = document.getElementById("codNom")
            const inputNombreP = document.getElementById("nombrep")
            const inputCoseguro = document.getElementById("coseguro")
            const practicaNuevo = new Practicas( inputCodNom.value, inputNombreP.value, inputCoseguro.value)
            arrayPracticasLS.push(practicaNuevo)
            console.table(arrayPracticasLS);
            guardar_localStorage();
            let listarPracticas = document.getElementById("listadoPracticas");
            listarPracticas.innerHTML += `
            <tr class="table-dark table-hover mb-3">
                <td class="table-dark table-hover mr-2">${practicaNuevo.cod_nom}</td>
                <td class="table-dark table-hover mr-2">${practicaNuevo.nombreP}</td>
                <td class="table-dark table-hover mr-2">${practicaNuevo.coseguro}</td>
                <td><button id='btn1${practicaNuevo.cod_nom}' class="btn btn-danger btn-sm float-right" onclick="eliminarPractica(event)">X</button> </td>
            </tr>
            `;
}
// FINCION AGREGAR PRACTICAS 
let form = document.getElementById("formulario1");
form.addEventListener("submit",cargaPracticas);
function cargaPracticas(ev){
    ev.preventDefault();
    validarFormPracticas();
    if (ingresoP == true) {
    Swal.fire({
        title: 'Desea ingresar al afiliado?',
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: 'Grabar',
        denyButtonText: `No grabar`,
      }).then((ingresoP) => {
        if (ingresoP.isConfirmed) {
          enviarDatos();
          agregarLocalStorage();
          Swal.fire('Ingresado con exito')
        } else if (ingresoP.isDenied) {
          Swal.fire('Se ha cancelado el ingreso')
        }
        inputCodNom.focus();
        inputCodNom.value = ""
        inputCoseguro.value = "";
        inputNombreP.value = "";
      })
    }
    }
//ELIMINAR PRACTICAS
function eliminarPractica(ev) {
  console.log(ev);
  let fila = ev.target.parentElement.parentElement;
  console.log(fila);
  let id = fila.children[0].innerText;
  console.log(id);
  let indice = arrayPracticasLS.findIndex(afi => afi.cod_nom == id);
  console.log(indice)
  //Borro de ArrayAfiliados
  arrayPracticasLS.splice(indice,1);
  console.table(arrayPracticasLS);
  //Borro del HTML
  fila.remove();
  //Guardo en LocalStorage
  guardar_localStorage();
  Swal.fire('Eliminado')
}
//LOCAL STORAGE
function guardar_localStorage() {
  localStorage.setItem("practicas", JSON.stringify(arrayPracticasLS));
}
