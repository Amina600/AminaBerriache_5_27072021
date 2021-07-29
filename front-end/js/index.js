
//chargement de la liste de produits
fetch("http://localhost:3000/api/teddies")
    //transforme le résultat en json
    .then(function(res) {
        if (res.ok) {
            afficherProduits(res.json());
            return res.json();
        }
    })
    .catch(function(err) {
        // TODO afficher une erreur
    });

//Affichage produits sur la page
function afficherProduits(produits) {
    //TODO afficher les produits
    $('#example').DataTable( {
        data: produits.products,
        columns: [
            { title: "name" },
            { title: "price" }
        
        ]
    } );
}
