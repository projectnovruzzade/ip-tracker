let url = 'https://geo.ipify.org/api/v2/country,city?';
let key = 'at_2wXpHOACYfJct46eNyzvzbtefA0Fe';
// let IP = "x.xxx.xxx";
let ipAddressInput = document.querySelector(".ipAddress");
let ipLocationInput = document.querySelector(".location");
let ipTimezoneInput = document.querySelector(".timezone");
let ipIspInput = document.querySelector(".isp");
let sentBtn = document.querySelector(".sentBtn");
let searchBar = document.querySelector(".searchBar");


(async function () {
    let response = await fetch('https://api.ipify.org?format=json');
    let data = await response.json();
    let userIP = data.ip;
     getData(userIP);
})();


sentBtn.addEventListener("click", function () {
    if (searchBar.value.trim() != "" || null) {
        getData(searchBar.value);
    }
    else {
        alert("this is message null");
        return;
    }
});


function getData(ip) {
    let fullURL = `${url}apiKey=${key}&ipAddress=${ip}`;
    fetch(fullURL)
        .then(response => {
            return response.json();
        })
        .then(data => {
            console.log(data);
            setData(data);
        });
}


function setData(data) {
    let dataIP = data.ip;
    let locationCity = data.location.city;
    let locationCountry = data.location.country;
    let locationTimeZone = data.location.timezone;
    let dataISP = data.isp;

    // important Data
    let lat = data.location.lat;
    let lng = data.location.lng;


    try {
        setDataToMap(lat, lng);

    } catch (error) {
        console.log(error);
    }
    ipAddressInput.innerHTML = `${dataIP}`;
    ipLocationInput.innerHTML = `${locationCountry}, ${locationCity}`;
    ipTimezoneInput.innerHTML = `UTC ${locationTimeZone}`;
    ipIspInput.innerHTML = `${dataISP}`
}


var map = L.map('map').setView([12.76395, 5.05953], 14);

let osm = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});

var customIcon = L.icon({
    iconUrl: 'images/icon-location.png', // Özel ikonun URL'si (dosya yolu)
    iconSize: [30, 32], // İkonun genişlik ve yükseklik değerleri
  });

let marker;

function setDataToMap(lat, lng) {

    map.setView([lat, lng], 14);
    if (marker) {
        map.removeLayer(marker);
    }
    // marker = L.marker([lat, lng]).addTo(map);

    marker = L.marker([lat, lng], { icon: customIcon }).addTo(map);
}


osm.addTo(map);