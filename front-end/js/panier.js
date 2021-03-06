// réccupérer le panier depuis le localStorage et le parser
let cart = JSON.parse(localStorage.getItem("cart"));

// fonction qui mets à jour le panier
function updateCart() {
    document.getElementById ("container-cart--commande").innerHTML ='';
    if( cart === null || cart.length == 0 ){
        // Si le panier est vide 
        const cartEmpty =`<p class="cart-empty">Le panier est vide.</p>`
        document.querySelector("#container-cart").innerHTML = cartEmpty;
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
    if (!cart || !cart.length) {
         // la fonction s'arrête !
        return;
    } else {
        let priceArticlesTotal = 0;
        for(article of cart){
            priceArticlesTotal += article.price * article.quantity /100;
        }
        document.getElementById("price").innerHTML = priceArticlesTotal + '€';
    }
}
calculPrice()

// Formulaire
const btnSendForm = document.querySelector("#send-cart");

btnSendForm.addEventListener("click", (event) => {
    // Empêche l'envoie du formulaire par défault
    event.preventDefault();

    const firstNameInput = document.querySelector("#input-name");
    const lastNameInput = document.querySelector("#input-lastname");
    const emailInput = document.querySelector("#input-email");
    const addressInput = document.querySelector("#input-address");
    const cityInput = document.querySelector("#input-city");

    // Réccupération les valeurs du formulaire et les mettre dans l'objet contact
    const contact = {
        firstName : firstNameInput.value,
        lastName : lastNameInput.value,
        email : emailInput.value,
        address : addressInput.value,
        city : cityInput.value,
    };

    //contrôle formulaire 
    let isValid = true;
    // Fristname
    if (contact.firstName == "" || !isValidName(contact.firstName)){
       isValid = false;
       // S'il y a une erreur, on ajoute une classe is-invalid
       firstNameInput.classList.add("is-invalid");
       
    }else {
        // Sinon on supprime la classe
        firstNameInput.classList.remove("is-invalid");
    }
    if (contact.firstName == "" || !isValidName(contact.firstName)){
       isValid = false;
       // S'il y a une erreur, on ajoute une classe is-invalid
       firstNameInput.classList.add("is-invalid");
       if(contact.firstName == ""){
           document.getElementById('error-name').innerHTML = "Champ obligatoire";
       }else{
            document.getElementById('error-name').innerHTML = "Prénom invalide";
       }
    }else {
        // Sinon on supprime la classe
        firstNameInput.classList.remove("is-invalid");
        document.getElementById('error-name').innerHTML = "";
    }
    // Lastname
    if (contact.lastName == "" || !isValidName(contact.lastName)){
        isValid = false;
        lastNameInput.classList.add("is-invalid");
        if(contact.lastName == ""){
            document.getElementById('error-lastname').innerHTML = "Champ obligatoire";
        }else{
             document.getElementById('error-lastname').innerHTML = "Nom invalide";
        }
     }else {
        lastNameInput.classList.remove("is-invalid");
        document.getElementById('error-lastname').innerHTML = "";
     }
     // Email
    if (contact.email == "" || !validateEmail(contact.email)){
        isValid = false;
        emailInput.classList.add("is-invalid");
        if(contact.email == ""){
            document.getElementById('error-email').innerHTML = "Champ obligatoire";
        }else{
             document.getElementById('error-email').innerHTML = "Email invalide";
        }
    }else {
        emailInput.classList.remove("is-invalid");
        document.getElementById('error-email').innerHTML = "";
    }
    // Address 
    if (contact.address == "" || typeof contact.address !== 'string'){
        isValid = false;
        addressInput.classList.add("is-invalid");
        if(contact.address == ""){
            document.getElementById('error-address').innerHTML = "Champ obligatoire";
        }
    }else {
        addressInput.classList.remove("is-invalid");
        document.getElementById('error-address').innerHTML = "";
    }
     // City
    if (contact.city == "" || typeof contact.city !== 'string' ){
        isValid = false;
        cityInput.classList.add("is-invalid");
        if(contact.city == ""){
            document.getElementById('error-city').innerHTML = "Champ obligatoire";
        }
    }else {
        cityInput.classList.remove("is-invalid");
        document.getElementById('error-city').innerHTML = "";
    }
    // panier vide ou mélange de catégories
    let category;
    if(!cart || cart.length == 0){
        isValid = false;
        $('#emptyModal').modal();
    } else{
        category = cart[0].category;
        for(let article of cart){
            if(article.category !== category){
                isValid = false;
                $('#checkModal').modal();
            }
        }
    }
    // Si le formulaire est valide, réccupération de l'ID des produits et les mettre dans un tableau
    if(isValid) { 
        // réccupérer ID des produits et les mettre dans un tableau
        let arrayId =[];
        for (let article of cart){
            let pickupId = article.id;
            for(let i = 0; i < article.quantity ; i++) {
                arrayId.push(pickupId);
            }
        }
        // Mettre les valeurs du formulaire et le paniers dans l'objet sendObject
        const sendObject = {
            products : arrayId,
            contact
        };
        // Envoyer les objets vers le serveur avec post 
        fetch(urlBase + category + "/order", {
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
            // calculer la somme des produits de la commandes avant la redirection vers la page confirmation 
            let sum = 0;
            for(let product of value.products){
                sum += product.price /100;
            }

            // Redirection vers la page confirmation en passant les paramètres identifiant 
            //et la somme des produits dans l'url
            window.location.href = "confirmation.html?id="+value.orderId+"&price="+ sum + "€";

            // Vider le panier dans localstorage 
            localStorage.clear("cart");
        });
    }
})
// fonctions de controles formulaire
function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
function isValidName(name) {
    var validCharactersRegex =  /^[a-zéèàùûêâôë][a-zéèàùûêâôë \'-]+[a-zéèàùûêâôë]$/;
    return validCharactersRegex.test(name.trim().toLowerCase());
}