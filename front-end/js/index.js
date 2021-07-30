
//chargement de la liste de produits
fetch("http://localhost:3000/api/teddies")
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

//Affichage produits sur la page
function afficherProduits(produits) {
    let data = [];
    for (let produit of produits) {
        data.push([produit._id, produit.name, produit.imageUrl, produit.price, produit.description, produit.colors]);
    }
    $('#example').DataTable( {
        data: data,
        columns: [
            { title: "id" },
            { title: "name" },
            { title: "image" },
            { title: "price" },
            { title: "description" },
            { title: "colors" }
        ]
    } );
}
