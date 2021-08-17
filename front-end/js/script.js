const urlBase="http://localhost:3000/api/";
//chargement de la liste de produits
function loadUrlGet(url){ 
    let myPromise = new Promise(function(myResolve, myReject) {
        let req = new XMLHttpRequest();
        req.open('GET', url);
        req.onload = function() {
          if (req.status == 200) {
            myResolve(req.response);
          } else {
            myReject("Erreur serveur");
          }
        };
        req.send();
      });
      
      myPromise.then(
        function(value) {displayResult(JSON.parse(value));},
        function(error) {alert(error);}
      );

    }