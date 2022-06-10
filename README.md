# Hack the weather

## Description

This challenge involved the use of the OpenWeather API. It was the first project I've done that involved getting data from a server and then manipulating that data to add function and usability to my applications. This was very rewarding to me. I enjoyed using console.log to see the data before and after I "captured" my required content from the data object.

The Acceptance Criteria for this challenge was as follows:

```
GIVEN a weather dashboard with form inputs
WHEN I search for a city
THEN I am presented with current and future conditions for that city and that city is added to the search history
WHEN I view current weather conditions for that city
THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index
WHEN I view the UV index
THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe
WHEN I view future weather conditions for that city
THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity
WHEN I click on a city in the search history
THEN I am again presented with current and future conditions for that city
```

## Github Links

Github Repo: https://github.com/hackpres/HackTheWeather
Github Pages: https://hackpres.github.io/HackTheWeather/


## Screenshots of Deployed App

The following images show the web application's appearance and functionality:
![mobile view](./assets/images/mobileTop.png?raw=true "Mobile view of header, citySearch, and Current conditions.")
![mobile Forecast](./assets/images/mobileForecast.png?raw=true "Mobile view of the first 3 days in the 5 Day Forecast.")
![Medium to Large screen sizes](./assets/images/mdAndLgTop.png?raw=true "Application viewed from Medium to Large screens.")
![Desktop Views](./assets/images/xlTop.png?raw=true "Desktop view of weather dashboard app.")


## Usage and Features

I designed my application to initiate with data for Atlanta. That way a user can see the entirety of the content fields even before searching for their desired cities weather conditions.
![initialize Atlanta](./assets/images/codeInitialize.png?raw=true "API call to get weather info for Atlanta.")

When a user inputs a city name and clicks the search button, the page gets updated with that cities current and forecasted weather data, then that city name and coordinates get saved to local storage. I chose to only save the coordinates as thats the only param I need in order to fetch a new API data object when the user selects a city they've previously searched. I used the UV Index chart from the EPA to decide the colors and values to change the background color of the UV index value. (https://www.epa.gov/sunsafety/uv-index-scale-0).
![Current weather conditions](./assets/images/codeCurrentConditions.png?raw=true "Code to print current weather conditions from API data.")
![Forecasted weather conditions](./assets/images/code5DayForecast.png?raw=true "Code to print forecasted data from API call.")
![City save to storage](./assets/images/codeStorageSave.png?raw=true "Code to save city name and coordinates to local storage.")
![local storage](./assets/images/localStorage.png?raw=true "Image of my local storage showing how I'm storing city name and coordinates.")

I used a modal on mobile to display the history, that way the user experience isnt diminished by multiple "history buttons." However on larger screens I displayed the history buttons under the city search input.
![mobile modal for history](./assets/images/mobileModal.png?raw=true "Modal activated by previous cities searched button.")
![search history buttons](./assets/images/codeHistory.png?raw=true "Code to create and append history buttons.")
