var user = JSON.parse(localStorage.getItem("userData"));

document.addEventListener("DOMContentLoaded", function(e) {
    cargarDatos()
});


function modificar() {
    document.getElementById("btnModificar").disabled = "true";
    document.getElementById("nombreInput").style.display = "block"
    document.getElementById("apellidoInput").style.display = "block"
    document.getElementById("edadInput").style.display = "block"
    document.getElementById("mailInput").style.display = "block"
    document.getElementById("telefonoInput").style.display = "block"
    document.getElementById("btnGuardar").style.display = "block"
    document.getElementById("imgPerfilInput").style.display = "block"
    document.getElementById("nombre").style.display = "none"
    document.getElementById("edad").style.display = "none"
    document.getElementById("mail").style.display = "none"
    document.getElementById("telefono").style.display = "none"
    document.getElementById("imgPerfil").style.display = "none"

}

function cargarDatos() {
    document.getElementById("imgPerfil").src = localStorage.getItem("foto")

    document.getElementById("mailInput").placeholder = localStorage.getItem("usuario");
    userData = JSON.stringify(user);
    localStorage.setItem("userData", userData)
    document.getElementById("nombre").innerText = JSON.parse(localStorage.getItem("userData")).nombre + " " + JSON.parse(localStorage.getItem("userData")).apellido;
    document.getElementById("edad").innerText = JSON.parse(localStorage.getItem("userData")).edad;
    document.getElementById("mail").innerText = localStorage.getItem("usuario");
    document.getElementById("telefono").innerText = JSON.parse(localStorage.getItem("userData")).telefono;
}

function checkForm() {
    let nombre = document.getElementById("nombreInput");
    let apellido = document.getElementById("apellidoInput");
    let edad = document.getElementById("edadInput");
    let telefono = document.getElementById("telefonoInput");


    if (nombre.value !== "" && apellido.value !== "" && edad.value !== "" && telefono.value !== "") {
        saveChanges()
    } else {
        nombre.style.border = "red 5px solid";
        edad.style.border = "red 5px solid";
        apellido.style.border = "red 5px solid";
        telefono.style.border = "red 5px solid";
        nombre.placeholder = "Debe ingresar un nombre";
        edad.placeholder = "Debe ingresar una edad";
        apellido.placeholder = "Debe ingresar un apellido";
        telefono.placeholder = "Debe ingresar un telefono";
    }
}

function saveChanges() {

    newNAme = document.getElementById("nombreInput").value
    newSurname = document.getElementById("apellidoInput").value
    newAge = document.getElementById("edadInput").value
    newPhone = document.getElementById("telefonoInput").value
    newImg = document.getElementById("imgPerfilInput").value

    user = {
        "img": newImg,
        "nombre": newNAme,
        "apellido": newSurname,
        "edad": newAge,
        "telefono": newPhone
    }
    cargarDatos()
    document.getElementById("btnModificar").disabled = "false";
    document.getElementById("nombreInput").style.display = "none"
    document.getElementById("apellidoInput").style.display = "none"
    document.getElementById("edadInput").style.display = "none"
    document.getElementById("mailInput").style.display = "none"
    document.getElementById("telefonoInput").style.display = "none"
    document.getElementById("btnGuardar").style.display = "none"
    document.getElementById("imgPerfilInput").style.display = "none"
    document.getElementById("nombre").style.display = "block"
    document.getElementById("edad").style.display = "block"
    document.getElementById("mail").style.display = "block"
    document.getElementById("telefono").style.display = "block"
    document.getElementById("imgPerfil").style.display = "block"
};