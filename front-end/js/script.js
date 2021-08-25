const urlBase="http://localhost:3000/api/";

//chargement de la liste de produits
function loadUrlGet(url, callback){ 
    // création de la promesse
    let myPromise = new Promise(function(myResolve, myReject) {
      // Initialise une requête
        let req = new XMLHttpRequest();
        // ouvrir une connexion à l'url
        req.open('GET', url);
        req.onload = function() {
          if (req.status == 200) {
            // Résolution de la promesse avec la réponse
            myResolve(req.response);
          } else {
            // En cas d'erreur : rejet de la promesse
            myReject("Erreur serveur");
          }
        };
        //lancement de la requete
        req.send();
    });
 
    myPromise.then(
        function(value) {
            // Elle transfomre le résultat en objet javascript et appelle la callback
            callback(JSON.parse(value));
        },
        function(error) {
            alert(error);
        }
    );
}