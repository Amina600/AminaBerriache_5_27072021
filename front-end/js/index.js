
//chargement de la liste de produits
let url="http://localhost:3000/api/";
let article= "furniture";
loadUrl();

function loadUrl(){
fetch(url+article)
    //transforme le résultat en json
    .then(function(res) {
        if (res.ok) {
            return res.json();
        }
    })
    .then(function(produits) {
        
        afficherProduits(produits);
    })
    .catch(function(err) {
        alert("Impossible de charger les produits");
    });
}
//Affichage produits sur la page
//$('#example').clear();
function afficherProduits(produits) {
    
    let data = [];
    for (let produit of produits) {
        data.push([produit._id, produit.name, produit.imageUrl, produit.price, produit.description]);
    }
    
    $('#example').DataTable( {
        data: data,
        "columnDefs": [
            {
                "targets": [ 0 ],
                "visible": false,
            }
        ],
        columns: [
            { title: "id" },
            { title: "name" },
            { title: "image" },
            { title: "price" },
            { title: "description" },
           
        ]
    } );
}
function modifierArticle() {
    var select_article = document.getElementById("article");
    console.log(select_article.value);
    
    article = select_article.value;
  
   var table = $('#example').DataTable();
 
table.clear();
    
}
loadUrl();

