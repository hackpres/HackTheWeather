
const citySearch = document.getElementById("citySearchInput");
const cityName = document.getElementById("cityName");
const searchBtn = document.getElementById("searchBtn");
const historyEl = document.getElementById("cityHistory");
const previousHistoryBtn = document.getElementById("previousHistoryBtn");
const tempEl = document.getElementById("currentTemp");
const windEl = document.getElementById("currentWind");
const humidityEl = document.getElementById("currentHumidity");
const uvEl = document.getElementById("currentUVIndex");
const forecast = document.getElementById("forecast");

// previousHistoryBtn.addEventListener('click', searchHistory());

searchBtn.addEventListener('click', () => {
    var userCity = citySearch.value
    console.log(userCity);
    
    getCityCoordinates(userCity)
})

initialize();

function initialize() {
    getWeather(`https://api.openweathermap.org/data/2.5/onecall?lat=33.748997&lon=-84.387985&units=imperial&&appid=cccd45bf2b5eca98c58877bde4b85aed`)
}

function clearInputContent() {
    cityName.innerText = ""
    while (forecast.firstChild) {
        forecast.removeChild(forecast.firstChild);
    }
}

function getCityCoordinates(userCity) {
    
    fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${userCity}&&appid=cccd45bf2b5eca98c58877bde4b85aed`, {
        method: "GET"
    }) 
        .then(function (response) {
            console.log(response.status);
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            var cityLon = data[0].lon;
            var cityLat = data[0].lat;
            console.log(cityLat, cityLon);

            clearInputContent();
            cityName.innerText = citySearch.value.charAt(0).toUpperCase() + citySearch.value.slice(1);
            getWeather(`https://api.openweathermap.org/data/2.5/onecall?lat=${cityLat}&lon=${cityLon}&units=imperial&&appid=cccd45bf2b5eca98c58877bde4b85aed`)
        })
}

function saveToLocalStorage(city, dataObject) {
    localStorage.setItem(city, JSON.stringify(dataObject));
    retrieveCityStorage()
}

function retrieveCityStorage() {
    let storedCities = Object.keys(localStorage);
    filteredCities = storedCities.filter(city => city);
    filteredCities.forEach(savedCity => {
        // console.log(savedCity)
        historyEl.innerHTML +=`
        <button class="btn custom-history-btn m-2">
            ${savedCity}
        </button>
        `
    })
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
        let weatherWind = data.current.wind_speed;
        let weatherHumidity = data.current.humidity;
        let weatherUV = data.current.uvi
        console.log(weatherDate.toLocaleDateString())
        console.log(weatherIcon)
        // console.log(weatherTempF)
        // console.log(weatherWind)
        // console.log(weatherHumidity)
        // console.log(weatherUV)

        cityName.innerHTML += `
        <p class="fs-5 mb-0">${weatherDate.getMonth() + 1}/${weatherDate.getDate()}/${weatherDate.getFullYear()}
            <img class="ms-2 custom-img-size custom-bg-info rounded-4" src="https://openweathermap.org/img/wn/${weatherIcon}@2x.png"></img>
        </p>
        `;

        tempEl.innerText = `${weatherTemp}℉`
        windEl.innerText = `${weatherWind} mph`
        humidityEl.innerText = `${weatherHumidity}%`
        uvEl.innerText = weatherUV

        let fiveDayData = data.daily.splice(1,5);
        fiveDayData.forEach((day) => {
            let dateUnix = day.dt;
            let timestamp = dateUnix * 1000;
            let dateTimestamp = new Date(timestamp);
            let dayIcon = day.weather[0].icon;
            let dayTemp = day.temp.day;
            let dayWind = day.wind_speed;
            let dayHumidity = day.humidity;

            let container = document.createElement("div");
            let date = document.createElement("p");
            let icon = document.createElement("img");
            let temp = document.createElement("p");
            let wind = document.createElement("p");
            let humidity = document.createElement("p");
            container.classList.add("container", "justify-content-center", "my-2", "w-75", "custom-bg-info", "text-white");
            date.innerText = `${dateTimestamp.getMonth() + 1}/${dateTimestamp.getDate()}/${dateTimestamp.getFullYear()}`;
            date.classList.add("mb-0", "mt-3", "fs-5")
            icon.setAttribute("src", `https://openweathermap.org/img/wn/${dayIcon}@2x.png`);
            temp.innerText = `Temperature: ${dayTemp}℉`
            wind.innerText = `Wind Speed: ${dayWind} mph`
            humidity.innerText = `Humidity: ${dayHumidity}%`

            container.appendChild(date);
            container.appendChild(icon);
            container.appendChild(temp);
            container.appendChild(wind);
            container.appendChild(humidity);

            forecast.appendChild(container);
            ;
        })
        let cityNameForStorage = citySearch.value.charAt(0).toUpperCase() + citySearch.value.slice(1);
        saveToLocalStorage(cityNameForStorage, data)
    });
}


// function searchHistory() {

// }