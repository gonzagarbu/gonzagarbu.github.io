//CLASE AFILIADOS
class Afiliados{
    constructor(id, nombreApellido, nacionalidad, email, direccion, dealta){
        this.id = parseInt(id);
        this.nombreApellido = nombreApellido.toUpperCase();
        this.nacionalidad = nacionalidad.toUpperCase();
        this.email = email.toLowerCase();
        this.direccion = direccion.toUpperCase();
        this.dealta = true;
    }
//método para dar de baja 
    darBaja(){
        this.dealta = false;
        console.log(`El afiliado ${this.nombre} se ha dado de baja`)
    }
}
//CREO AFILIADO
//const afiliado0 = new Afiliados(35072151,"GONZALO GARBUIO","ARGENTINO","GARBUIOGONZALO@GMAIL.COM","ALBERTI 646",true);
//CREO ARRAY
const arrayAfiliadosLS = [];
//CLASE PRACTICAS
class Practicas{
    constructor(cod_nom,nombreP,coseguro){
        this.cod_nom = parseInt(cod_nom);
        this.nombreP = nombreP.toUpperCase();
        this.coseguro = parseFloat(coseguro);
    }
}
//CREO PRACTICAS
//const practica0 = new Practicas(420101,"CONSULTA MEDICA",500);
//const practica1 = new Practicas(180101,"ECOGRAFIA",1000);
//const practica2 = new Practicas(120101,"RESONANCIA MAGNETICA",1300);
//const practica3 = new Practicas(170101,"RADIOGRAFIA",750);
//const practica4 = new Practicas(660101,"ANALISIS CLINICOS",2200);
//CREO ARRAY
//const arrayPracticas = [practica0, practica1, practica2, practica3, practica4];
const arrayPracticasLS = [];
// BUSCO EN LOCAL STORAGE SI HAY REGISTOS DE PRACTICAS ALMACENADOS 
const registroNomencladorNuevo = JSON.parse(localStorage.getItem("practicas"));
if(registroNomencladorNuevo !== null) {
for (const pract of registroNomencladorNuevo) {
     arrayPracticasLS.push(new Practicas(pract.cod_nom, pract.nombreP,pract.coseguro));
     
}
}
// BUSCO EN LOCAL STORAGE SI HAY REGISTOS DE AFILIADOS ALMACENADOS
const registroAfiliadosNuevos1 = JSON.parse(localStorage.getItem("afiliados"));
if(registroAfiliadosNuevos1 !== null) {
for (const afis of registroAfiliadosNuevos1) {
     arrayAfiliadosLS.push(new Afiliados(afis.id, afis.nombreApellido, afis.nacionalidad, afis.email, afis.direccion)); 
}
}

// CARRITO

const carrito = [];


