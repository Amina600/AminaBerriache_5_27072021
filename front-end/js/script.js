const urlBase="http://localhost:3000/api/";

//chargement de la liste de produits
function loadUrlGet(url, callback){ 
    // création de la promesse
    let myPromise = new Promise(function(myResolve, myReject) {
        let req = new XMLHttpRequest();
        // Initialise une requête
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
            //transforme le résultat en json
            callback(JSON.parse(value));
        },
        function(error) {
            alert(error);
        }
    );
}