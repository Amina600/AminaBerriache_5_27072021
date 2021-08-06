const url="http://localhost:3000/api/";
// récupérration des params de l'url de la page catégorie + l'id
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
        .then(function(product) {
            displayDetailProduct(product);
            console.log(product);
        })
        .catch(function(err) {
            alert("Impossible de charger les produits");
        })
}
// Affichage les propriétes de produits
function displayDetailProduct(product){
    document.getElementById ("detail-info--name").innerHTML = product.name;
    document.getElementById ("detail-info--price").innerHTML = product.price / 100 + "€";

    // boucle qui permet de lister les caractéristiques de chaque proprièté dans des options d'un select
   for(let element  of changeType(category, product)) {
        document.getElementById("detail-info--type").innerHTML +=`<option selected value="${element}" >${element}</option>`;
   }

    document.getElementById ("detail-info--description").innerHTML = product.description;
    document.getElementById ("image-product").src = product.imageUrl;
}
// fonction qui permet de changer chaque propriété de produit en fonction de sa catégorie 
function changeType (category, product){
    if (category == "teddies") {
        return product.colors;

    } else if(category == "cameras") {
        return product.lenses;

    } else if( category == "furniture") {
        return product.varnish;

    } else {
        return "";
    }
}


