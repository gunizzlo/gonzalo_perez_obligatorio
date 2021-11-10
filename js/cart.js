BUY = "https://japdevdep.github.io/ecommerce-api/cart/buy.json";
CART2_URL = "https://japdevdep.github.io/ecommerce-api/cart/654.json";
COUNTRIES_URL = "https://gist.githubusercontent.com/Yizack/bbfce31e0217a3689c8d961a356cb10d/raw/107e0bdf27918adea625410af0d340e8fc1cd5bf/countries.json";
var productosCart = [];
var countries = [];
var buyArray = [];



function showProductsCart(array) {
    let productsToAppend = "";
    let subtotalToAppend = 0;
    for (let i = 0; i < array.data.articles.length; i++) {
        let productCart = array.data.articles[i];
        let total = productCart.unitCost * productCart.count;

        if (productCart.currency == "USD") {
            total = productCart.unitCost * productCart.count * 40
        }

        if (productCart.count < 1) {
            productsToAppend += `
            <a class="list-group-item list-group-item-action" id="Articulo` + i + `" style="display:none">
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
        } else {
            productsToAppend += `
            <a class="list-group-item list-group-item-action" id="Articulo` + i + `">
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

    }
    document.getElementById("productosCart").innerHTML = productsToAppend;
    document.getElementById("subTotalCart").innerHTML = subtotalToAppend;
}

function agregarArticulos(producto) {
    var cambio = document.getElementById("Cantidad" + producto);
    cambio.innerHTML = parseInt(cambio.innerText) + 1
    productosCart.data.articles[producto].count += 1
    showProductsCart(productosCart)
    envio()
}

function sacarArticulos(producto) {
    var cambio = document.getElementById("Cantidad" + producto);
    if (cambio.innerHTML > 1) {
        cambio.innerHTML = parseInt(cambio.innerText) - 1;
        productosCart.data.articles[producto].count -= 1;
        showProductsCart(productosCart);
        envio()
    } else {
        document.getElementById("Articulo" + producto).style.display = "none";
        alert("Se ha eliminado el articulo del carrito");
        productosCart.data.articles[producto].count -= 1;
        showProductsCart(productosCart)
        envio()
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

        countriesToAppend += `<option>` + paises + `</option>`
    }
    document.getElementById("inputPais").innerHTML += countriesToAppend;
}

function checkForm() {
    let calle = document.getElementById("inputCalle");
    let numero = document.getElementById("inputNumero");
    let esquina = document.getElementById("inputEsquina");
    let credito = document.getElementById("creditoRadio");
    let transferencia = document.getElementById("transferenciaRadio");
    let medioPago = document.getElementById("medioPago");
    let subtotal = document.getElementById("subTotalCart").innerHTML;


    if (calle.value !== "" && numero.value !== "" && esquina.value !== "" && subtotal !== "0" && (credito.checked !== false || transferencia.checked !== false)) {
        simularCompra()
    } else {
        if (subtotal == "0") { alert("Debe ingresar al menos 1 articulo a su carrito.") } else {
            calle.style.border = "red 5px solid";
            numero.style.border = "red 5px solid";
            esquina.style.border = "red 5px solid";
            calle.placeholder = "Ingrese una calle";
            numero.placeholder = "Ingrese un numero";
            esquina.placeholder = "Ingrese una esquina";
            medioPago.style.border = "red 5px solid";
        }
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
    var value = document.getElementById("transferenciaRadio").checked;

    if (value) {
        alert(buyArray.msg + "  El articulo será enviado cuando se confirme el pago asociado a la CI: " + buyArray.CI + " ")
    } else {
        alert(buyArray.msg + "  El articulo será enviado cuando se confirme el pago asociado a la Tarjeta: " + buyArray.CC + " ")
    }
}

document.addEventListener("DOMContentLoaded", function() {
    getJSONData(COUNTRIES_URL).then(function(resultObj) {
        if (resultObj.status === "ok") {
            countries = resultObj;
        }
        paises(countries)
    })
});

function modalPago() {
    var value = document.getElementById("transferenciaRadio").checked;
    if (value) {
        $('#modalTransferencia').modal('show')
    } else {
        $('#modalCredito').modal('show')
    }
}

function transferencia() {
    var cedula = document.getElementById("inputCedula")

    if (cedula.value !== "") {
        buyArray = JSON.parse(`{"msg":"¡Has comprado con éxito!", "CI": ` + cedula.value + `}`)
        $('#modalTransferencia').modal('hide')
    } else {
        cedula.style.border = "red 5px solid";
        cedula.placeholder = "Debe ingresar una CI valida"
    }
}

document.addEventListener("DOMContentLoaded", function() {
    getJSONData(BUY).then(function(resultObj) {
        if (resultObj.status === "ok") {
            buyArray = resultObj.data;
        }
    })
});

function credito() {
    var tarjeta = document.getElementById("inputTarjeta")
    var anio = document.getElementById("añoInput")
    var mes = document.getElementById("mesInput")
    var codigo = document.getElementById("pinInput")
    if (tarjeta.value !== "" && anio.value !== "" && mes.value !== "" && codigo.value !== "") {
        buyArray = JSON.parse(`{"msg":"¡Has comprado con éxito!", "CC": ` + tarjeta.value + `}`)
        $('#modalCredito').modal('hide')
    } else {
        tarjeta.style.border = "red 5px solid";
        tarjeta.placeholder = "Debe ingresar una tarjeta valida";
        anio.style.border = "red 5px solid";
        anio.placeholder = "Debe ingresar un año";
        mes.style.border = "red 5px solid";
        mes.placeholder = "Debe ingresar un mes";
        codigo.style.border = "red 5px solid";
        codigo.placeholder = "Debe ingresar un codigo correcto"
    }
}