var productInfo = {};
var comentInfo = {};
var myCarousel = document.getElementById('carouselProductos')
var carousel = new bootstrap.Carousel(myCarousel, {
    interval: 2500,
    wrap: true
});

function showImagesGallery(array) {

    let htmlContentToAppend = "";

    for (let i = 0; i < array.length; i++) {
        let imageSrc = array[i];
        if (i === 0) {
            htmlContentToAppend +=
                `<div class="carousel-item active">
                    <img src="` + imageSrc + `" class="d-block w-100" alt="` + [i] + `">
                </div>`
        } else {
            htmlContentToAppend +=
                `<div class="carousel-item">
                            <img src="` + imageSrc + `" class="d-block w-100" alt="` + [i] + `">
                        </div>`
        };

        document.getElementById("productImagesGallery").innerHTML = htmlContentToAppend;
    }
};

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e) {
    getJSONData(PRODUCT_INFO_URL).then(function(resultObj) {
        if (resultObj.status === "ok") {
            product = resultObj.data;

            let productNameHTML = document.getElementById("productName");
            let productDescriptionHTML = document.getElementById("productDescription");
            let productCostHTML = document.getElementById("productCost");
            let productSoldCountHTML = document.getElementById("productSoldCount");
            let productCategoryHTML = document.getElementById("productCategory");

            productNameHTML.innerHTML = product.name;
            productDescriptionHTML.innerHTML = product.description;
            productSoldCountHTML.innerHTML = product.soldCount;
            productCostHTML.innerHTML = product.currency + " " + product.cost;
            productCategoryHTML.innerHTML = `<a href="category-info.html">` + product.category + `</a>`;

            //Muestro las imagenes en forma de galería
            showImagesGallery(product.images);
        }
    });
});


document.addEventListener("DOMContentLoaded", function(e) {
    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function(resultObj) {
        if (resultObj.status === "ok") {
            comentInfo = resultObj.data;
            showComents();
        }
    });
    usuario = sessionStorage.getItem("usuario")
    document.getElementById("userInput").placeholder = usuario
});

function showComents() {
    let htmlContentToAppend = "";
    for (let i = 0; i < comentInfo.length; i++) {
        let coment = comentInfo[i];
        let estrellas = `<span class="fa fa-star checked"></span>`
        let estrellasnegras = `<span class="fa fa-star"></span>`
        let puntaje = estrellas.repeat(comentInfo[i].score);
        let puntajenega = estrellasnegras.repeat(5 - comentInfo[i].score);


        htmlContentToAppend += `
        <a class="list-group-item list-group-item-action">
            <div class="row">
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <dt>` + coment.user + `</dt>
                    <p class="mb-1">` + coment.description + `</p>
                    <p>` + puntaje + `` + puntajenega + `</p>
                </div>
                <small class="mb-6 text-muted">` + coment.dateTime + `</small>
            </div>
            </div>
        </a>`
    }
    document.getElementById("comentInfo").innerHTML = htmlContentToAppend;
}

function subirComentario() {
    let htmlContentToAppend1 = "";
    var user = document.getElementById("userInput").value;
    var comentario = document.getElementById("inputComentario").value;
    var userScore = document.getElementsByClassName("activo").length;
    let estrellas = `<span class="fa fa-star checked"></span>`
    let estrellasnegras = `<span class="fa fa-star"></span>`
    let puntaje = estrellas.repeat(userScore);
    let puntajenega = estrellasnegras.repeat(5 - userScore);
    var answer = document.getElementById("checkAnswer").checked
    var hoy = new Date();
    var dateTime = hoy.getFullYear() + '-' + hoy.getMonth() + '-' + hoy.getDay() + hoy.getHours() + ':' + hoy.getMinutes() + ':' + hoy.getSeconds();

    if (user !== "" && comentario !== "" && userScore !== 0) {
        htmlContentToAppend1 += `
        <a class="list-group-item list-group-item-action">
            <div class="row">
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <dt>` + user + `</dt>
                    <p class="mb-1">` + comentario + `</p>
                    <p>` + puntaje + `` + puntajenega + `</p>
                </div>
                <small class="mb-6 text-muted">` + dateTime + `</small>
            </div>
            </div>
        </a>`
        document.getElementById("comentInfo").innerHTML += htmlContentToAppend1;
        if (answer) {
            alert("Gracias " + user + " un representante se pondra en contacto a la brevedad!")
        }
        document.getElementById("userInput").style.border = "";
        document.getElementById("inputComentario").placeholder = "Ingrese aqui su comentario.";
        document.getElementById("inputComentario").style.border = "";
    } else {
        document.getElementById("userInput").style.border = "red 5px solid";
        document.getElementById("inputComentario").placeholder = "Debe ingresar Usuario, comentario y valoracion";
        document.getElementById("inputComentario").style.border = "red 5px solid";
    }
};

$(".clasificacion").find("input").change(function() {
    var valor = $(this).val()
    $(".clasificacion").find("input").removeClass("activo")
    $(".clasificacion").find("input").each(function(index) {
        if (index + 1 <= valor) {
            $(this).addClass("activo")
        }
    })
})

$(".clasificacion").find("label").mouseover(function() {
    var valor = $(this).prev("input").val()
    $(".clasificacion").find("input").removeClass("activo")
    $(".clasificacion").find("input").each(function(index) {
        if (index + 1 <= valor) {
            $(this).addClass("activo")
        }
    })
})