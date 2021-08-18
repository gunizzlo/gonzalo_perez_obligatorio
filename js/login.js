function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
    var id_token = googleUser.getAuthResponse().id_token;
    console.log(id_token);
};

function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function() {
        console.log('User signed out.');
        window.location.href = "login.html";
    });
};

function invitado() {
    var hoy = new Date();
    let datos = document.getElementById("email").value;
    let datospass = document.getElementById("palabraSecreta").value;
    emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
    if (emailRegex.test(datos) && datospass != "") {
        console.log('Email: ' + datos);
        console.log(hoy.getFullYear() + '-' + hoy.getMonth() + '-' + hoy.getDay());
        console.log(hoy.getHours() + ':' + hoy.getMinutes() + ':' + hoy.getSeconds());
        window.location.href = "index.html";
    } else {
        document.getElementById("email").style.border = "red 5px solid";
        document.getElementById('emailOK').innerText = "Mail y/o contraseña incorrectos"
    }

};