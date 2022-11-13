class Usuarios{
    constructor(usuario,nombre,email,contrasenia,alta){
        this.usuario = parseInt(usuario);
        this.nombre = nombre.toUpperCase();
        this.email = email.toLowerCase();
        this.contrasenia = contrasenia;
        this.alta = true;
    }
//método para dar de baja 
    darBaja(){
        this.dealta = false;
        alert(`El Usuario ${this.usuario} se ha dado de baja`);
    }
}
//CREO ARRAY
const arrayUsuarios = [{ usuario: 35072151,  
                         nombre: "GONZALO GARBUIO", 
                         email: "garbuiogonzalo@gmail.com",
                         contrasenia: 123456,
                         alta: true}];

const arrayUsuariosLS = [];                 
         