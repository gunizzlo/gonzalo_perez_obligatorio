const ORDER_ASC_BY_COST = "MEN-MAY";
const ORDER_DESC_BY_COST = "MAY-MEN";
const ORDER_BY_PROD_SOLD_COUNT = "Cant.";
var currentProductsInfoArray = [];
var currentSortCriteria = undefined;
var minCount = undefined;
var maxCount = undefined;


function sortProducts(criteria, array) {
    let result = [];
    if (criteria === ORDER_ASC_BY_COST) {
        result = array.sort(function(a, b) {
            if (a.cost < b.cost) { return -1; }
            if (a.cost > b.cost) { return 1; }
            return 0;
        });
    } else if (criteria === ORDER_DESC_BY_COST) {
        result = array.sort(function(a, b) {
            if (a.cost > b.cost) { return -1; }
            if (a.cost < b.cost) { return 1; }
            return 0;
        });
    } else if (criteria === ORDER_BY_PROD_SOLD_COUNT) {
        result = array.sort(function(a, b) {
            let aCount = parseInt(a.soldCount);
            let bCount = parseInt(b.soldCount);

            if (aCount > bCount) { return -1; }
            if (aCount < bCount) { return 1; }
            return 0;
        });
    }

    return result;
}


function showProductsInfo() {
    let htmlContentToAppend = "";
    for (let i = 0; i < currentProductsInfoArray.length; i++) {
        let product = currentProductsInfoArray[i];

        if (((minCount == undefined) || (minCount != undefined && parseInt(product.cost) >= minCount)) &&
            ((maxCount == undefined) || (maxCount != undefined && parseInt(product.cost) <= maxCount))) {



            htmlContentToAppend += `
            <div class="col-md-6 cards">
            <a href="product-info.html" class="card md-6 shadow-sm custom-card">
            <img src="` + product.imgSrc + `" alt="` + product.description + `" class="bd-placeholder-img card-img-top">
            <div class="col producto">
                    <div class="d-flex w-100 justify-content-between">
                        <h3 class="mb-6">` + product.name + `</h3>
                        <small class="col-3 text-muted">(` + product.soldCount + ` artículos)</small>
                        <p class="col-3">` + product.cost + ` ` + product.currency + `</p>
                    </div>
                    <p class="mb-6">` + product.description + `</p>
                </div>
            </a>
        </div>
            `
        }
        document.getElementById("despliegueLista").innerHTML = htmlContentToAppend;
    }

}

function sortAndShowProducts(sortCriteria, productsInfoArray) {
    currentSortCriteria = sortCriteria;

    if (productsInfoArray != undefined) {
        currentProductsInfoArray = productsInfoArray;
    }

    currentProductsInfoArray = sortProducts(currentSortCriteria, currentProductsInfoArray);

    //Muestro los productos ordenados
    showProductsInfo();
}

/*/function buscador() {

    var input = document.getElementById("buscador")
    var filtro = input.value
    var listadoProductos = document.getElementById("despliegueLista")
    var info = listadoProductos.getElementsByTagName("a")
    for (i = 0; i < info.length; i++) {
        producto = info[i].getElementsByClassName("mb-6");
        nombre = producto[0].innerHTML;
        desc = producto[1].innerHTML;
        console.log(info[i])
        if ((nombre.toUpperCase().indexOf(filtro.toUpperCase()) > -1) || (desc.toUpperCase().indexOf(filtro.toUpperCase()) > -1)) {
            info[i].style.display = "";
        } else {
            info[i].style.display = "none";
        }
    }
};/*/

function buscador() {
    var aux = [];
    var input = document.getElementById("buscador")
    var filtro = input.value
    var listadoProductos = currentProductsInfoArray;
    for (i = 0; i < listadoProductos.length; i++) {
        nombre = listadoProductos[i].name;
        descr = listadoProductos[i].description;

        if ((nombre.toUpperCase().indexOf(filtro.toUpperCase()) > -1) || (descr.toUpperCase().indexOf(filtro.toUpperCase()) > -1)) {

            aux.push(listadoProductos[i]);
        } else {
            document.getElementById("despliegueLista").innerHTML = `<p>Ningun elemento coincide con el criterio de busqueda, intente nuevamente.</p>`;
        }
        let htmlContentToAppend = "";
        for (let i = 0; i < aux.length; i++) {
            let product = aux[i];

            if (((minCount == undefined) || (minCount != undefined && parseInt(product.cost) >= minCount)) &&
                ((maxCount == undefined) || (maxCount != undefined && parseInt(product.cost) <= maxCount))) {



                htmlContentToAppend += `
            <div class="col-md-6 cards">
            <a href="product-info.html" class="card md-6 shadow-sm custom-card">
            <img src="` + product.imgSrc + `" alt="` + product.description + `" class="bd-placeholder-img card-img-top">
            <div class="col producto">
                    <div class="d-flex w-100 justify-content-between">
                        <h3 class="mb-6">` + product.name + `</h3>
                        <small class="col-3 text-muted">(` + product.soldCount + ` artículos)</small>
                        <p class="col-3">` + product.cost + ` ` + product.currency + `</p>
                    </div>
                    <p class="mb-6">` + product.description + `</p>
                </div>
            </a>
        </div>
            `
            }
            document.getElementById("despliegueLista").innerHTML = htmlContentToAppend;
        }

    }
};

document.addEventListener("DOMContentLoaded", function() {
    getJSONData(PRODUCTS_URL).then(function(resultObj) {
        if (resultObj.status === "ok") {
            sortAndShowProducts(ORDER_ASC_BY_COST, resultObj.data);
        }
    });

    document.getElementById("sortAsc").addEventListener("click", function() {
        sortAndShowProducts(ORDER_ASC_BY_COST);
    });

    document.getElementById("sortDesc").addEventListener("click", function() {
        sortAndShowProducts(ORDER_DESC_BY_COST);
    });

    document.getElementById("sortByCount").addEventListener("click", function() {
        sortAndShowProducts(ORDER_BY_PROD_SOLD_COUNT);
    });

    document.getElementById("clearRangeFilter").addEventListener("click", function() {
        document.getElementById("rangeFilterCountMin").value = "";
        document.getElementById("rangeFilterCountMax").value = "";

        minCount = undefined;
        maxCount = undefined;

        showProductsInfo();
    });

    document.getElementById("rangeFilterCount").addEventListener("click", function() {
        //Obtengo el mínimo y máximo de los intervalos para filtrar por cantidad
        //de productos por categoría.
        minCount = document.getElementById("rangeFilterCountMin").value;
        maxCount = document.getElementById("rangeFilterCountMax").value;

        if ((minCount != undefined) && (minCount != "") && (parseInt(minCount)) >= 0) {
            minCount = parseInt(minCount);
        } else {
            minCount = undefined;
        }

        if ((maxCount != undefined) && (maxCount != "") && (parseInt(maxCount)) >= 0) {
            maxCount = parseInt(maxCount);
        } else {
            maxCount = undefined;
        }

        showProductsInfo();
    });
});