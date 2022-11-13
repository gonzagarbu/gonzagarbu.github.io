const afilogin = JSON.parse(localStorage.getItem("afilogueado"));
console.log(afilogin);

document.getElementById("bienvenidaafi").innerText = "Bienvenido: " +afilogin;