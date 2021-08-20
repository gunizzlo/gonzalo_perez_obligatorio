var productsInfoArray = [];


function showProductsInfo(productsInfoArray) {
    let htmlContentToAppend = "";
    for (let i = 0; i < productsInfoArray.length; i++) {
        let product = productsInfoArray[i];


        htmlContentToAppend += `
            <a href="category-info.html" class="list-group-item list-group-item-action">
                <div class="row">
                    <div class="col-3">
                        <img src="` + product.imgSrc + `" alt="` + product.description + `" class="img-thumbnail">
                    </div>
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <h4 class="mb-1">` + product.name + `</h4>
                            <small class="text-muted">` + product.soldCount + ` artículos</small>
                        </div>
                        <p class="mb-1">` + product.description + `</p>
                    </div>
                </div>
            </a>
            `
        document.getElementById("despliegueLista").innerHTML = htmlContentToAppend;
    }

}

document.addEventListener("DOMContentLoaded", function() {
    getJSONData(PRODUCTS_URL).then(function(resultObj) {
        if (resultObj.status === "ok") {
            productsInfoArray = resultObj.data;
            console.log(productsInfoArray);
            showProductsInfo(productsInfoArray);
        }
    });
});