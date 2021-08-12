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
    if (cart == null) {
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
calculPrice()

const btnSendForm = document.querySelector("#send-cart");
btnSendForm.addEventListener("click", (event) => {
    event.preventDefault();

    const firstNameInput = document.querySelector("#input-name");
    const lastNameInput = document.querySelector("#input-lastname");
    const emailInput = document.querySelector("#input-email");
    const addressInput = document.querySelector("#input-address");
    const cityInput = document.querySelector("#input-city");

    // Réccupération les valeurs du formulaire et les mettre dans un objet
    const contact = {
        firstName : firstNameInput.value,
        lastName : lastNameInput.value,
        email : emailInput.value,
        address : addressInput.value,
        city : cityInput.value,
    };

    //contrôle formulaire 

    let isValid = true;
    // fristname
    if (contact.firstName == "" || !isValidName(contact.firstName)){
       isValid = false;
       firstNameInput.classList.add("is-invalid");
    }else {
        firstNameInput.classList.remove("is-invalid");
    }
    //lastname
    if (contact.lastName == "" || !isValidName(contact.lastName)){
        isValid = false;
        lastNameInput.classList.add("is-invalid");
     }else {
        lastNameInput.classList.remove("is-invalid");
     }
     // email
    if (contact.email == "" || !validateEmail(contact.email)){
        isValid = false;
        emailInput.classList.add("is-invalid");
    }else {
        emailInput.classList.remove("is-invalid");
    }
    // adress 
    if (contact.address == "" || typeof contact.city !== 'string'){
        isValid = false;
        addressInput.classList.add("is-invalid");
    }else {
        addressInput.classList.remove("is-invalid");
    }
     // city
    if (contact.city == "" || typeof contact.city !== 'string' ){
        isValid = false;
        cityInput.classList.add("is-invalid");
    }else {
        cityInput.classList.remove("is-invalid");
    }

    if (isValid) {
        // réccupérer ID des produits et les mettre dans un tableau
        let arrayId =[];
        for (let artcile of cart){
            let pickupId = article.id;
            arrayId.push(pickupId);
            
        }
        // Mettre les valeurs du formulaire et le paniers dans un objet 
        const sendObject = {
            products : arrayId,
            contact
        };

        // Envoyer les objets vers le serveur

        fetch("http://localhost:3000/api/teddies/order", {
            method: "POST",
            headers: { 
                'Accept': 'application/json', 
                'Content-Type': 'application/json' 
            },
            body: JSON.stringify(sendObject)
        })
        .then(function(res) {
            if (res.ok) {
              return res.json();
            }
          })
          .then(function(value) {
            window.location.href = "success.html";
          });
    }
    
})
// fonctions de controles
function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
function isValidName(name) {
    var validCharactersRegex =  /^[a-zA-Z ]+$/;
    return validCharactersRegex.test(name.trim().toLowerCase());

}
