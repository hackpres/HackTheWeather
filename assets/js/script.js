
const citySearch = document.getElementById("citySearchInput");
const cityName = document.getElementById("cityName");
const searchBtn = document.getElementById("searchBtn");
const historyModalEl = document.getElementById("cityHistory");
const historyEl = document.getElementById("searchHistoryContainer")
const closeModal = document.getElementById("closeModal");
const previousHistoryBtn = document.getElementById("previousHistoryBtn");
const tempEl = document.getElementById("currentTemp");
const windEl = document.getElementById("currentWind");
const humidityEl = document.getElementById("currentHumidity");
const uvEl = document.getElementById("currentUVIndex");
const forecast = document.getElementById("forecast");



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
    while (historyModalEl.firstChild) {
        historyModalEl.removeChild(historyModalEl.firstChild);
    }
    while (historyEl.firstChild) {
        historyEl.removeChild(historyEl.firstChild);
    }
}

function getCityCoordinates(userCity) {
    
    fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${userCity}&&appid=cccd45bf2b5eca98c58877bde4b85aed`, {
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
            getWeather(`https://api.openweathermap.org/data/2.5/onecall?lat=${cityLat}&lon=${cityLon}&units=imperial&&appid=cccd45bf2b5eca98c58877bde4b85aed`);
        })
}

function saveToLocalStorage(city, dataObject) {
    localStorage.setItem(city, JSON.stringify(dataObject));
    generateCityHistoryBtns()
}

function generateCityHistoryBtns() {
    let storedCities = Object.keys(localStorage);
    filteredCities = storedCities.filter(city => city);
    filteredCities.forEach(savedCity => {
        let cityButton = document.createElement("button");
        cityButton.type = "button";
        cityButton.classList.add("w-100", "btn", "custom-btn-history", "my-1");
        cityButton.innerText = savedCity;
        let clonedButton = cityButton.cloneNode(true);
        cityButton.addEventListener('click', (e) => {
            getWeatherFromHistory(e);
            closeModal.click();
        });
        clonedButton.addEventListener('click', (e) => {
            getWeatherFromHistory(e);
            closeModal.click();
        });
        
        historyEl.appendChild(cityButton);
        historyModalEl.appendChild(clonedButton);
    })
}

function getWeatherFromHistory(e) {
    let selectedHistoryBtn = e.target;
    let selectedCity = selectedHistoryBtn.innerText;
    let selectedCityCoordinates = localStorage.getItem(selectedCity);
    let selectedCityLat = selectedCityCoordinates.split(",")[0].substring(1);
    let selectedCityLon = selectedCityCoordinates.split(",")[1].slice(0, -1);

    clearInputContent();
    cityName.innerText = selectedCity
    uvEl.classList.remove("bg-success", "text-white", "px-2", "text-start", "mb-0", "rounded","bg-warning", "text-black", "custom-bg-high", "bg-danger", "custom-bg-extreme", "border", "border-danger", "border-2");
    getWeather(`https://api.openweathermap.org/data/2.5/onecall?lat=${selectedCityLat}&lon=${selectedCityLon}&units=imperial&&appid=cccd45bf2b5eca98c58877bde4b85aed`);
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

        cityName.innerHTML += `
        <p class="fs-5 mb-0">${weatherDate.getMonth() + 1}/${weatherDate.getDate()}/${weatherDate.getFullYear()}
            <img class="ms-2 custom-img-size custom-bg-info rounded-4" src="https://openweathermap.org/img/wn/${weatherIcon}@2x.png"></img>
        </p>
        `;

        tempEl.innerText = `${weatherTemp}℉`
        windEl.innerText = `${weatherWind} mph`
        humidityEl.innerText = `${weatherHumidity}%`
        uvEl.innerText = weatherUV
        if (weatherUV < 3.0) {
            uvEl.classList.add("bg-success", "text-white", "px-2", "text-start", "mb-0", "rounded");
        } else if (weatherUV >= 3 && weatherUV < 6) {
            uvEl.classList.add("bg-warning", "text-black", "px-2", "text-start", "mb-0", "rounded");
        } else if (weatherUV >= 6 && weatherUV < 8) {
            uvEl.classList.add("custom-bg-high", "text-black", "px-2", "text-start", "mb-0", "rounded");
        } else if (weatherUV >= 8 && weatherUV < 11) {
            uvEl.classList.add("bg-danger", "text-white", "px-2", "text-start", "mb-0", "rounded");
        } else {
            uvEl.classList.add("custom-bg-extreme", "text-white", "border", "border-danger", "border-2", "px-2", "text-start", "mb-0", "rounded");
        }

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
            container.classList.add("container", "d-md-flex", "d-xl-block", "justify-content-center", "mx-xl-2", "my-2", "pb-xl-3", "w-xs-75", "w-md-100", "custom-bg-info", "text-white", "custom-width-xl");
            date.innerText = `${dateTimestamp.getMonth() + 1}/${dateTimestamp.getDate()}/${dateTimestamp.getFullYear()}`;
            date.classList.add("mb-0", "mt-3", "fs-5")
            icon.setAttribute("src", `https://openweathermap.org/img/wn/${dayIcon}@2x.png`);
            temp.innerText = `Temperature: ${dayTemp}℉`
            temp.classList.add("my-md-auto", "me-md-1");
            wind.innerText = `Wind Speed: ${dayWind} mph`
            wind.classList.add("my-md-auto");
            humidity.innerText = `Humidity: ${dayHumidity}%`
            humidity.classList.add("my-md-auto", "ms-md-1");

            container.appendChild(date);
            container.appendChild(icon);
            container.appendChild(temp);
            container.appendChild(wind);
            container.appendChild(humidity);

            forecast.appendChild(container);
        });
        let cityNameForStorage = citySearch.value.charAt(0).toUpperCase() + citySearch.value.slice(1);
        saveToLocalStorage(cityNameForStorage, `${data.lat},${data.lon}`)
    });
}