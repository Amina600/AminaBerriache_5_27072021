const url="http://localhost:3000/api/";
// récupérration des params de l'url de la page
let category= new URL(location.href).searchParams.get("category");
let id = new URL(location.href).searchParams.get("id");
getProduct();

function getProduct(){
    fetch(url+category+"/"+id)
        //transforme le résultat en json
        .then(function(res) {
            if (res.ok) {
                return res.json();
            }
        })
        .catch(function(err) {
            alert("Impossible de charger les produits");
        })
        
        .then(function(product) {
            displayDetailProduct(product);
            console.log(product);
        })
}

function displayDetailProduct(product){
    document.getElementById ("detail-info--name").innerHTML = product.name;
    document.getElementById ("detail-info--price").innerHTML = product.price / 100 + "€";
    document.getElementById ("detail-info--type").innerHTML = changeType(category, product);
    document.getElementById ("detail-info--description").innerHTML = product.description;
    document.getElementById ("image-product").src = product.imageUrl;
}

function changeType (category, product){
    if (category == "teddies") {
        return "Couleur :" + product.colors;
    } else if(category == "cameras") {
        return "Lenses :" + product.lenses;

    } else if( category == "furniture") {
       
        return "Varnish :" + product.varnish;
    } else {
        return "";
    }
}


