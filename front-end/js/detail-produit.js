const url="http://localhost:3000/api/";

// récupérration des params de l'url de la page catégorie + l'id
let category= new URL(location.href).searchParams.get("category");
let id = new URL(location.href).searchParams.get("id");
let productInfo;
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
        })
        .catch(function(err) {
            alert("Impossible de charger le détail du produit");
        })
}
// Affichage les propriètes de produits
function displayDetailProduct(product){
    productInfo = product;
    document.getElementById ("detail-info--name").innerHTML = product.name;
    document.getElementById ("detail-info--price").innerHTML = product.price / 100 + "€";
    document.getElementById ("name-of-type").innerHTML = nameOfType (category);

    // boucle qui permet de lister les caractéristiques de chaque proprièté dans des options d'un select
   for(let element  of changeType(category, product)) {
        document.getElementById("detail-info--type").innerHTML +=`<option selected value="${element}" >${element}</option>`;
   };
    document.getElementById ("detail-info--description").innerHTML = product.description;
    document.getElementById ("image-product").src = product.imageUrl;
}

// fonction qui permet de changer chaque propriété(contient le choix de plusieurs options) de produit en fonction de sa catégorie 
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

// fonction permet de changer le nom de la proprièté en fonction de sa catégorie
function nameOfType (category) {
    if (category == "teddies") {
        return "Couleur :";

    } else if(category == "cameras") {
        return "Objectif :";

    } else if( category == "furniture") {
        return "Vernis :";

    } else {
        return "";
    }
}

// Ajout du produit au panier 
const btn_send_cart = document.querySelector("#send-cart");
const quantity_input = document.querySelector("#detail-info--quantity");
const option_select = document.querySelector("#detail-info--type");

btn_send_cart.addEventListener('click', (event) => {

    let article = {
        name : productInfo.name,
        id : productInfo._id,
        image : productInfo.imageUrl,
        option : option_select.value,
        quantity : quantity_input.value,
        price : productInfo.price
    };

    // réccupérer panier et le parser
    let cart = JSON.parse(localStorage.getItem("cart"));

    // si le panier existe => ajouter le produit
    if (cart) {
        cart.push(article);
    } 
    // sinon créer un array avec le produit
    else {
        cart = [article];
    }

    // sauvgrader le panier dans le localStrorage 
    localStorage.setItem("cart", JSON.stringify(cart));
})