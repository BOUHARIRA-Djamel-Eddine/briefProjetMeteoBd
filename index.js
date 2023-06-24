
/*Je récupère le nom de la ville configurée dans mon fichier conf.json en format json*/
import data from "./conf.json" assert { type: "json" };
//console.log(data.ville);

/*Avec ma fonction requestApi grace à la méthode fech qui me renvoi une promesse et je récupère les données météo dans l'objet json*/
async function requestApi() {
    const meteo = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${data.ville}&appid=fe0c8d22d3e193bf7f8859bc70e6522a&lang=fr&units=metric`)
        .then(resultat => resultat.json())
        .then(json => json)
    afficheInfosMeteo(meteo);
}

/*Avec ma fonction afficheInfosMeteo je recupère dans l'objet json les données que j'ai besoins et je les affiche dans mon HTML*/
function afficheInfosMeteo(data) {
    //console.log(data);
    const nomVille = data.name;
    const temperature = Math.round(data.main.temp);
    const humidite = data.main.humidity;
    const description = data.weather[0].description;

    document.querySelector('#ville').textContent = nomVille;
    document.querySelector('#temp').textContent = "Température : " + temperature + "°C";
    document.querySelector('#hum').textContent = "Humidité : " + humidite + "%";
    document.querySelector('#desc').textContent = description;
}

/*Avec ma fonction miseAjour je programme un rafraichissement de la page toute les heures*/
function miseAjour() {
    setTimeout(function () {
        location.reload();
    }, 3600000);
    requestApi();
}
miseAjour();