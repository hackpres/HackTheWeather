
const citySearch = document.getElementById("citySearchInput");
const searchBtn = document.getElementById("searchBtn");
const previousHistoryBtn = document.getElementById("previousHistoryBtn");

// previousHistoryBtn.addEventListener('click', searchHistory());
citySearch.addEventListener('change', () => {
    getWeather(citySearch.innerText);
    console.log(citySearch.value);
})
searchBtn.addEventListener('click', () => {
    var userCity = citySearch.value
    console.log(userCity);
    getWeather(userCity);
})


function getWeather(userCityInput) {
    var city = userCityInput;
    console.log('city' + city);
    var requestCity = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&&appid=cccd45bf2b5eca98c58877bde4b85aed`;
    console.log(requestCity);
    fetch(requestCity, {
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
            var cityLon = data[0].lon;
            var cityLat = data[0].lat;
            console.log(cityLat, cityLon);
        });

}

// console.log(`getWeather ${getWeather()}`);

// function searchHistory() {

// }