
const searchBtn = document.getElementById("searchBtn");


function getWeather() {
    var requestUrl = 'https://api.openweathermap.org/data/2.5/onecall?q=atlanta&appid=cccd45bf2b5eca98c58877bde4b85aed';
    console.log(requestUrl);
    fetch(requestUrl, {
        method: "GET",
        credentials: 'same-origin'
    })
        .then(function (response) {
            console.log(response.status)
            return response.json();
        })
        .then(function (data) {
            console.log('data received')
            console.log(data);
        });
}

