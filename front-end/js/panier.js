// réccupérer le panier depuis le localStorage et le parser
let cart = JSON.parse(localStorage.getItem("cart"));

const messageCart = document.querySelector("#container-cart");
function updateCart() {
    document.getElementById ("container-cart--commande").innerHTML ='';
    if( cart === null || cart.length == 0 ){
        // Si le panier est vide 
        const cartEmpty =`<p class="cart-empty">Le panier est vide.</p>`
        messageCart.innerHTML = cartEmpty;
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
                    <a type="submit" class="btn-delete"><i class="far fa-trash-alt"></i></a>
                </div>
            </div>`
        }
    }
    // Gestion bouton supprimer
    let removedBtns = document.getElementsByClassName("btn-delete");
    for (let i = 0; i < removedBtns.length; i++) {
        
        removedBtns[i].addEventListener("click", (event) => {
            cart.splice(i, 1);
            localStorage.setItem("cart", JSON.stringify(cart));
            updateCart();
            calculPrice();
        })
    }
}
updateCart()

// Calcul le prix total 
function calculPrice () {
    if (cart == 0) {
        return;
    } else {
        let priceArticlesTotal = [];
        for(article of cart){
            let priceArticle = article.price * (article.quantity /100);
            priceArticlesTotal.push(priceArticle);
        }
        
        const reducer = (accumulator, currentValue) => accumulator + currentValue;
        const priceTotal = priceArticlesTotal.reduce(reducer, 0);
        document.getElementById("price").innerHTML = priceTotal + '€';
    }
}
calculPrice();