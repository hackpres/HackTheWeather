
const citySearch = document.getElementById("citySearchInput");
const searchBtn = document.getElementById("searchBtn");
const previousHistoryBtn = document.getElementById("previousHistoryBtn");
const tempEl = document.getElementById("currentTemp");
const windEl = document.getElementById("currentWind");
const humidityEl = document.getElementById("currentHumidity");
const uvEl = document.getElementById("currentUVIndex");
const forecast = document.getElementById("forecast");

// previousHistoryBtn.addEventListener('click', searchHistory());
// citySearch.addEventListener('change', () => {
//     getWeather(citySearch.innerText);
//     console.log(citySearch.value);
// })
// searchBtn.addEventListener('click', () => {
//     var userCity = citySearch.value
//     console.log(userCity);
//     getWeather(userCity);
// })

initialize();

function initialize() {
    getWeather(`https://api.openweathermap.org/data/2.5/onecall?lat=33.748997&lon=-84.387985&&appid=cccd45bf2b5eca98c58877bde4b85aed`)
}

console.log(Date.now());

function kelvinToF(kelvin) {
    let subtract = kelvin - 273.15;
    let multiply = subtract * 9;
    let divide = multiply / 5;
    let add = divide + 32;
    let fahrenheit = add.toFixed(2);
    return fahrenheit
}

function getWeather(apiURL) {
    fetch(apiURL, {
        method: "GET"
    })
        .then(function (response) {
        console.log(response.status)
        return response.json();
        })
        .then(function (data) {
        console.log(data)

        let weatherDate = new Date;
        let weatherIcon = data.current.weather[0].icon;
        let weatherTemp = data.current.temp;
        let weatherTempF = kelvinToF(weatherTemp);
        let weatherWind = data.current.wind_speed;
        let weatherHumidity = data.current.humidity;
        let weatherUV = data.current.uvi
        console.log(weatherDate.toLocaleDateString())
        // console.log(weatherIcon)
        // console.log(weatherTempF)
        // console.log(weatherWind)
        // console.log(weatherHumidity)
        // console.log(weatherUV)

        tempEl.innerText = `${weatherTempF}℉`
        windEl.innerText = `${weatherWind} mph`
        humidityEl.innerText = `${weatherHumidity}%`
        uvEl.innerText = weatherUV

        let fiveDayData = data.daily.splice(0,5);
        console.log(fiveDayData)
        fiveDayData.forEach((day) => {
            let dayMonthYear = day.dt;
            let dayIcon = day.weather[0].icon;
            console.log(dayIcon)
            let dayTemp = day.temp.day;
            let dayTempF = kelvinToF(dayTemp);
            let dayWind = day.wind_speed;
            let dayHumidity = day.humidity;

            let container = document.createElement("div");
            let date = document.createElement("p");
            let icon = document.createElement("img");
            let temp = document.createElement("p");
            let wind = document.createElement("p");
            let humidity = document.createElement("p");
            container.classList.add("container", "bg-info", "w-50", "rounded-4");
            date.innerText = dayMonthYear;
            icon.innerText = dayIcon;
            temp.innerText = `${dayTempF}℉`
            wind.innerText = `${dayWind} mph`
            humidity.innerText = `${dayHumidity}%`

            container.appendChild(date);
            container.appendChild(icon);
            container.appendChild(temp);
            container.appendChild(wind);
            container.appendChild(humidity);

            forecast.appendChild(container);
        })
    });
}
// function getWeather(userCityInput) {
//     var city = userCityInput;
//     console.log('city' + city);
//     var requestCity = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&&appid=cccd45bf2b5eca98c58877bde4b85aed`;
//     console.log(requestCity);
//     fetch(requestCity, {
//         method: "GET",
//         credentials: 'same-origin'
//     })
//         .then(function (response) {
//             console.log(response.status)
//             return response.json();
//         })
//         .then(function (data) {
//             console.log('data received')
//             console.log(data);
//             var cityLon = data[0].lon;
//             var cityLat = data[0].lat;
//             console.log(cityLat, cityLon);
//         });

// }

// console.log(`getWeather ${getWeather()}`);

// function searchHistory() {

// }