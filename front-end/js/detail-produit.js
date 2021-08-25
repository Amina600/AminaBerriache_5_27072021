// récupération des params de l'url catégorie + l'id
let category= new URL(location.href).searchParams.get("category");
let id = new URL(location.href).searchParams.get("id");
let productInfo;

loadUrlGet(urlBase+category+"/"+id, displayDetailProduct); 

// Affichage les propriètés du produit selectionnés
function displayDetailProduct(product){
    productInfo = product;
    document.getElementById("detail-info--name").innerHTML = product.name;
    document.getElementById("detail-info--price").innerHTML = product.price / 100 + "€";
    document.getElementById("name-of-type").innerHTML = nameOfOption(category);

    // boucle qui permet de lister les caractéristiques de chaque proprièté dans des options d'un select
   for(let element of getOption(category, product)) {
        document.getElementById("detail-info--type").innerHTML +=`<option selected value="${element}" >${element}</option>`;
   };
    document.getElementById("detail-info--description").innerHTML = product.description;
    document.getElementById("image-product").innerHTML= `<img src="${product.imageUrl}" class="detail-photo" alt="photo de l'article" />`;
}

// fonction qui permet de réccupérer les options du produit en fonction de sa catégorie 
function getOption(category, product){
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

// fonction permet de réccupérer le nom de la proprièté d'option en fonction de la catégorie
function nameOfOption(category) {
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

    // réccupérer panier qui est dans le localSorage et le parser
    let cart = JSON.parse(localStorage.getItem("cart"));

    // si le panier existe => ajouter le produit
    if (cart) {
        cart.push(article);
    } 
    // sinon créer un array avec le produit
    else {
        cart = [article];
    }
    // sauvgrader le panier dans le localStrorage en  transformant le panier en JSON 
    localStorage.setItem("cart", JSON.stringify(cart));
})