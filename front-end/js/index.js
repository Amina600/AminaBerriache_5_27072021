
//chargement de la liste de produits
const url="http://localhost:3000/api/";
let category= "teddies";
loadUrl();

function loadUrl(){
    fetch(url+category)
        //transforme le résultat en json
        .then(function(res) {
            if (res.ok) {
                return res.json();
            }
        })
        .then(function(products) {
            displayProducts(products);
        })
        .catch(function(err) {
            alert("Impossible de charger les produits");
        }); 
}

//Affichage produits sur la page
function displayProducts(products) {
    //vider le conteneur
    document.getElementById("product-container").innerHTML = '';
    //Ajouter les produits
    for(product of products){
        document.getElementById("product-container").innerHTML += `
        <div class="col-4">
            <div class="card">
                <a href="detail-produit.html?category=${category}&id=${product._id}">
                    <img src="${product.imageUrl}" class="card--photo" alt="photo de l'article"/>
                    <p class="card--info">
                        <span class="card--name"><strong>${product.name}</strong></span>
                        <span class="card--price"><strong>${product.price / 100}€</strong></span>
                    </p>
                </a>
            </div>
        </div>`    
    } 
}

//changement de catégorie
function changeCategory() {
    var selectCategory = document.getElementById("category");
    category = selectCategory.value;
    loadUrl();  
}