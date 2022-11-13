// BUSCO EN LOCAL STORAGE SI HAY REGISTROS NUEVOS
const registroCarrito = JSON.parse(localStorage.getItem("carrito"));
if(registroCarrito !== null) {
  
    for (const objeto of registroCarrito) {
     carrito.push(new Practicas(objeto.cod_nom, objeto.nombreP, objeto.coseguro));
     document.getElementById("tablabody").innerHTML += `
     <tr class="table-dark table-hover mb-3">
         <td class="table-dark table-hover mr-2">${objeto.nombreP}</td>
         <td class="table-dark table-hover mr-2">${objeto.cod_nom}</td>
         <td class="table-dark table-hover mr-2">$ ${objeto.coseguro}</td>
         <td><button id="'btn1${objeto.cod_nom}'" class="btn btn-danger btn-sm float-right" onclick="eliminarCarrito(event)">X</button> </td>
     </tr>
 `;
let totalCarrito = carrito.reduce((acumulador,prod)=>acumulador+prod.coseguro,0);
document.getElementById("total").innerText = "Total a pagar $: "+totalCarrito;
}
}
// AGREGO PRODUCTOS QUE ESTAN EN EL ARRAY
let contenedorarray = document.getElementById("misprodsarray");
function renderizarProductos(){
    for(const productos of arrayPracticasLS){
        contenedorarray.innerHTML += `
       
        <div class="card col-sm-2">
            <img src="../imagenes/img2.png" class="card-img-top" alt="...">
            <div class="card-body">
              <h5 class="card-title">${productos.nombreP}</h5>
              <p class="card-text">Codigo: ${productos.cod_nom}</p>
              <p class="card-text">Coseguro: $ ${productos.coseguro}</p>
              <button id='btn2${productos.nombreP}' class="btn btn-primary mx-auto">Agregar</button>
            </div>
          </div>
        </div>
      
        `;
    }
    arrayPracticasLS.forEach((prod)=>{
    let pract = document.getElementById(`btn2${prod.nombreP}`);
          pract.onclick = () => {
            agregarAlCarrito(prod);
      }
    })
    
}
// LLAMO A LA FUNCION RENDERIZAR
renderizarProductos();
// AGREGO PRODUCTOS  DE LA API
function obtenerDatosJson(){
  const URLJSON="https://my-json-server.typicode.com/gonzagarbu/apiPracticas/practicas";
  fetch(URLJSON)
      .then(res => res.json())
      .then(datosRecibidos => {
          //let listarPracticas = document.getElementById("listadoPracticas");
          let contenedor = document.getElementById("misprods");
          const practic = datosRecibidos;
          for(const producto of practic){
            contenedor.innerHTML += `
            <div class="card col-sm-2">
                <img src="../imagenes/img2.png" class="card-img-top" alt="...">
                <div class="card-body">
                  <h5 class="card-title">${producto.nombreP}</h5>
                  <p class="card-text">Codigo: ${producto.cod_nom}</p>
                  <p class="card-text">Coseguro: $ ${producto.coseguro}</p>
                  <button id='btn${producto.nombreP}' class="btn btn-primary mx-auto">Agregar</button>
                </div>
              </div>
            </div>
            `;
        }
        // AGREGAR AL CARRO
        practic.forEach((producto)=>{
          //evento para cada boton
          document.getElementById(`btn${producto.nombreP}`).addEventListener("click",function(){
              agregarAlCarrito(producto);
              
          });
      });
          
      })
}
obtenerDatosJson();
// AGREGO CARRITO
function agregarAlCarrito(productoAComprar){
    carrito.push(productoAComprar);
    guardar_localStorage();
    Swal.fire({
      icon: 'success',
      title: productoAComprar.nombreP,
      text: 'Se agregó al carrito',
    });
    document.getElementById("tablabody").innerHTML += `
        <tr class="table-dark">
            <td class="table-dark ">${productoAComprar.nombreP}</td>
            <td class="table-dark ">${productoAComprar.cod_nom}</td>
            <td class="table-dark ">$ ${productoAComprar.coseguro}</td>
            <td><button id="'btn1${productoAComprar.cod_nom}'" class="btn btn-danger btn-sm" onclick="eliminarCarrito(event)">X</button> </td>
        </tr>
    `;
    let totalCarrito = carrito.reduce((acumulador,prod)=>acumulador+prod.coseguro,0);
    document.getElementById("total").innerText = "Total a pagar $: "+totalCarrito;
  

}
console.table(carrito)
// ELIMINAR ELEMENTOS DEL CARRITO
function eliminarCarrito(ev) {
  console.log(ev);
  let fila = ev.target.parentElement.parentElement;
  console.log(fila);
  let id = fila.children[1].innerText;
  console.log(id);
  let indice = carrito.findIndex(carr => carr.cod_nom == id);
  console.log(indice)
  //Borro del Carrito
  carrito.splice(indice,1);
  console.table(carrito);
  let totalCarrito = carrito.reduce((acumulador,ev)=>acumulador+ev.coseguro,0);
  document.getElementById("total").innerText = "Total a pagar $: "+totalCarrito;
  localStorage.setItem("carrito",JSON.stringify(carrito));
  //Borro del HTML
  fila.remove();
  Swal.fire('Eliminado')
}
//GUARDAR LOCAL STORAGE 
function guardar_localStorage() {
    localStorage.setItem("carrito", JSON.stringify(carrito));
  }
// BOTON AFILIADOS y CORREO
let listaafi = document.getElementById("listaafiopciones");  
let correo = document.getElementById("emailafi");  
for(const afili of arrayAfiliadosLS){
   listaafi.innerHTML += `
      <option value="${afili.nombreApellido}">${afili.nombreApellido}</option>
    `;
}
const selectElement = document.querySelector("#listaafiopciones")
selectElement.addEventListener("change", (event) => {
  let afielegido = event.target.value;
  localStorage.setItem("afiliadoelegido", JSON.stringify(afielegido));
});
// BOTON PAGAR
const pagar = document.getElementById("botonpagar");
pagar.addEventListener("click", (e)=> {
  if(carrito.length !== 0) {
  window.open("./impresion.html", "./impresion.html", "width=800,height=800")
}
else {
  Swal.fire({
    icon: 'error',
    text: 'No se puede pagar sin seleccionar practicas!',
  });
}

})
const vaciar = document.getElementById("botonvaciar");
vaciar.addEventListener("click", (e)=> {
  vaciarcarrito();
})
//FUNCION VACIAR CARRITO

function vaciarcarrito() {
  const vaciarcarrito = carrito.splice(0,carrito.length);
  let totalCarrito = carrito.reduce((acumulador,e)=>acumulador+e.coseguro,0)
  document.getElementById("tablabody").innerHTML = `
`;
  document.getElementById("total").innerHTML = `
`;
document.getElementById("seleccionafi").selectedIndex = 0 ;
afielegido = ""
location.reload()
localStorage.setItem("afiliadoelegido", JSON.stringify(afielegido));
guardar_localStorage();
}