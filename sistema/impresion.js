const registroCarrito1 = JSON.parse(localStorage.getItem("carrito"));
const afiliadoelegido = JSON.parse(localStorage.getItem("afiliadoelegido"))
console.log(afiliadoelegido);
if(registroCarrito1 !== null) {
  
    for (const objeto of registroCarrito1) {
     carrito.push(new Practicas(objeto.cod_nom, objeto.nombreP, objeto.coseguro));
let totalCarrito = carrito.reduce((acumulador,prod)=>acumulador+prod.coseguro,0);

}
}


for(const pago of carrito) {
    document.getElementById("impresion").innerHTML +=` 
      <tr class="table-danger table-hover mb-3">
        <td class="table-danger table-hover mr-2">${pago.nombreP}</td>
        <td class="table-danger table-hover mr-2">${pago.cod_nom}</td>
        <td class="table-danger table-hover mr-2">$ ${pago.coseguro}</td>
      </tr>       
          
    `
    
     } 
  //CARRITO TOTAL   
  let totalCarrito = carrito.reduce((acumulador,prod)=>acumulador+prod.coseguro,0);
  document.getElementById("totalimpresion").innerText = "Total a pagar $: "+totalCarrito;
  
  //AGREGAR AFILIADO A LA IMPRESION

  document.getElementById("nombreafi").innerText = "Afiliado: " +afiliadoelegido;
  