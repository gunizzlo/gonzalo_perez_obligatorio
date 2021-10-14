CART2_URL = "https://japdevdep.github.io/ecommerce-api/cart/654.json";
COUNTRIES_URL = "https://gist.githubusercontent.com/Yizack/bbfce31e0217a3689c8d961a356cb10d/raw/107e0bdf27918adea625410af0d340e8fc1cd5bf/countries.json"
var productosCart = {};
var countries = [];


function showProductsCart(array) {
    let productsToAppend = "";
    let subtotalToAppend = 0;
    for (let i = 0; i < array.data.articles.length; i++) {
        let productCart = array.data.articles[i];
        let total = productCart.unitCost * productCart.count;

        if (productCart.currency == "USD") {
            total = productCart.unitCost * productCart.count * 40
        }

        productsToAppend += `
            <a class="list-group-item list-group-item-action">
                <div class="row">
                    <div class="col">
                        <img src="` + productCart.src + `" alt="` + i + `" class="img-thumbnail" width="150" height="100">
                    </div>
                    <div class="col">
                            <h4 class="md-4">` + productCart.name + `</h4>
                            <div class="row">
                            <button type="button" class="btn btn-outline-danger" style=" margin: 20px" onclick="sacarArticulos(` + i + `)">-</button>
                            <h5 id="Cantidad` + i + `" style=" margin: 20px">` + productCart.count + ` </h5>
                            <button type="button" class="btn btn-outline-success" style=" margin: 20px"  onclick="agregarArticulos(` + i + `)">+</button>   
                         </div>
                         </div>
                         
                    <div class="col">
                            <small class=""col-sm-4" style="float: right">Precio Unitario: ` + productCart.unitCost + ` ` + productCart.currency + `</small><br>
                            <small class=""col-sm-4" style="float: right" id="Total` + i + `">Total: UYU ` + total + `</small>
                     </div>   
                        </div>            
                    </div>
                </div>
            </a>
            `


        subtotalToAppend += total;


    }
    document.getElementById("productosCart").innerHTML = productsToAppend;
    document.getElementById("subTotalCart").innerHTML = subtotalToAppend;
}

function agregarArticulos(producto) {
    var cambio = document.getElementById("Cantidad" + producto);
    cambio.innerHTML = parseInt(cambio.innerText) + 1
    productosCart.data.articles[producto].count += 1
    showProductsCart(productosCart)
}

function sacarArticulos(producto) {
    var cambio = document.getElementById("Cantidad" + producto);
    if (cambio.innerHTML > 0) {
        cambio.innerHTML = parseInt(cambio.innerText) - 1
        productosCart.data.articles[producto].count -= 1
        showProductsCart(productosCart)
    } else {
        alert("No hay articulos que quitar")
    }
}

document.addEventListener("DOMContentLoaded", function() {
    getJSONData(CART2_URL).then(function(resultObj) {
        if (resultObj.status === "ok") {
            productosCart = resultObj;
        }
        showProductsCart(productosCart)
    })
});

function mostrarFormulario() {
    document.getElementById("finalizarCompra").style.display = "block"
}

function paises(array) {
    let countriesToAppend = "";

    for (let i = 0; i < array.data.countries.length; i++) {
        let paises = array.data.countries[i].name_es;
        console.log(paises)

        countriesToAppend += `<option>` + paises + `</option>`
    }
    document.getElementById("inputPais").innerHTML += countriesToAppend;
}

function checkForm() {
    let calle = document.getElementById("inputCalle");
    let numero = document.getElementById("inputNumero");
    let esquina = document.getElementById("inputEsquina");


    if (calle.value !== "" && numero.value !== "" && esquina.value !== "") {
        simularCompra()
    } else {
        calle.style.border = "red 5px solid";
        numero.style.border = "red 5px solid";
        esquina.style.border = "red 5px solid";
    }
}

function envio() {
    let envio = document.getElementById("metodoEnvio");
    let subTotal = document.getElementById("subTotalCart").innerHTML;
    let totalCompra = document.getElementById("totalCart");

    if (envio.value === "Premium") {
        totalCompra.innerHTML = "Total UYU: " + (subTotal * 1.15)
    } else {
        if (envio.value === "Express") {
            totalCompra.innerHTML = "Total UYU: " + (subTotal * 1.07)
        } else {
            totalCompra.innerHTML = "Total UYU: " + (subTotal * 1.05)
        }
    }
};

function simularCompra() {
    alert("Gracias por su preferencia!!")
}

document.addEventListener("DOMContentLoaded", function() {
    getJSONData(COUNTRIES_URL).then(function(resultObj) {
        if (resultObj.status === "ok") {
            countries = resultObj;
        }
        paises(countries)
    })
});