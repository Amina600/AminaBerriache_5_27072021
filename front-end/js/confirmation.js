// extraire des params de l'url leprix + l'idorder
let id = new URL(location.href).searchParams.get("id");
let price = new URL(location.href).searchParams.get("price");

document.getElementById("number-command").innerHTML= id;
document.getElementById("price-command").innerHTML= price;