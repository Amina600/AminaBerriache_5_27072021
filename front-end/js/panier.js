// réccupérer le panier depuis le localStorage et le parser
let cart = JSON.parse(localStorage.getItem("cart"));

const conditionCart = document.querySelector("#container-cart");

if( cart === null ){
    // Si le panier est vide 
    const cartEmpty =`<p class="cart-empty">Le panier est vide.</p>`
    conditionCart.innerHTML = cartEmpty;
}else {
    // Si le panier est remplie, on fait une boucle sur cart pour afficher le produit dans le panier
    for( article of cart) {
        document.getElementById ("container-cart--commande").innerHTML += `
        <div class="info">
            <div class="groupes">
                <img src="${article.image}" id="image-product" alt="photo de l'article" />
                <div class="info-details">
                    <span id="info-details--name">${article.name}</span>
                    <span id="info-details--option">${article.option}</span>
                    <span id="info-details--quantité">${article.quantity}</span>
                </div>
            </div>
            <div id="info-price">
                <span><strong>${article.price / 100}€</strong></span>
                <a type="submit" id="btn-delete"><i class="far fa-trash-alt"></i></a>
            </div>
        </div>`
    }
}
// Gestion bouton supprimer




//function displayCart() {
    // Boucle sur cart pour afficher le produit dans le panier
    //for( article of cart) {
        //document.getElementById ("container-cart--commande").innerHTML += `
        //<div class="info">
          //  <div class="groupes">
               // <img src="${article.image}" id="image-product" alt="photo de l'article" />
              //  <div class="info-details">
                //    <span id="info-details--name">${article.name}</span>
                 //   <span id="info-details--option">${article.option}</span>
                  //  <span id="info-details--quantité">${article.quantity}</span>
               // </div>
            //</div>
           // <div id="info-price">
           //     <span>${article.price / 100}€</span>
          //  </div>
        //</div>`
   // }
//}
//displayCart();
