const CATEGORIES_URL = "https://japdevdep.github.io/ecommerce-api/category/all.json";
const PUBLISH_PRODUCT_URL = "https://japdevdep.github.io/ecommerce-api/product/publish.json";
const CATEGORY_INFO_URL = "https://japdevdep.github.io/ecommerce-api/category/1234.json";
const PRODUCTS_URL = "https://japdevdep.github.io/ecommerce-api/product/all.json";
const PRODUCT_INFO_URL = "https://japdevdep.github.io/ecommerce-api/product/5678.json";
const PRODUCT_INFO_COMMENTS_URL = "https://japdevdep.github.io/ecommerce-api/product/5678-comments.json";
const CART_INFO_URL = "https://japdevdep.github.io/ecommerce-api/cart/987.json";
const CART_BUY_URL = "https://japdevdep.github.io/ecommerce-api/cart/buy.json";



document.addEventListener("DOMContentLoaded", function() {
    checkLog();
});
var showSpinner = function() {
    document.getElementById("spinner-wrapper").style.display = "block";
}

var hideSpinner = function() {
    document.getElementById("spinner-wrapper").style.display = "none";
}


var getJSONData = function(url) {
    var result = {};
    showSpinner();
    return fetch(url)
        .then(response => {
            if (response.ok) {
                hideSpinner();
                return response.json();
            } else {
                throw Error(response.statusText);
            }
        })
        .then(function(response) {
            result.status = 'ok';
            result.data = response;
            return result;
        })
        .catch(function(error) {
            result.status = 'error';
            result.data = error;
            return result;
        });
}

function checkLog() {
    if ((sessionStorage.getItem("usuario") === null) && (window.location.href != "http://localhost:3000/login.html") && (window.location.href != "https://gunizzlo.github.io/gonzalo_perez_obligatorio/login.html")) {
        window.location.href = "login.html"
    } else {
        document.getElementById("user").innerHTML = sessionStorage.getItem("usuario")
    }
};

function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    localStorage.clear();
    sessionStorage.clear();
    auth2.signOut().then(function() {
        console.log('User signed out.');
        location.href = "login.html";
    });
};