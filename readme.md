# Weather App

This Weather App fetches and displays weather information based on the city name entered by the user. It uses the OpenWeatherMap API to get the weather data.
**try weather app** [Weather app](https://hashimthepassionate.github.io/weather-app/)

## Table of Contents
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [Code Explanation](#code-explanation)
  - [HTML Elements](#html-elements)
  - [Event Listener](#event-listener)
  - [Fetch Weather Data](#fetch-weather-data)
  - [Update UI](#update-ui)
  - [Error Handling](#error-handling)

## Prerequisites

- Basic knowledge of HTML, CSS, and JavaScript
- An API key from OpenWeatherMap

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/HashimThePassionate/weather-app.git
    ```
2. Navigate to the project directory:
    ```bash
    cd weather-app
    ```
3. Open `index.html` in your favorite web browser.

## Usage

1. Enter the name of the city in the search box.
2. Click the search button to fetch and display the weather information.

## Code Explanation

### HTML Elements

The script selects various elements from the HTML document to interact with:
```javascript
const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
```
- `container`: The main container for the weather app.
- `search`: The search button inside the search box.
- `weatherBox`: The box where the weather image, temperature, and description will be displayed.
- `weatherDetails`: The section where additional weather details like humidity and wind speed will be shown.

### Event Listener

An event listener is added to the search button to trigger the weather data fetch when clicked:
```javascript
search.addEventListener('click', async () => {
```

### Fetch Weather Data

When the search button is clicked, the script fetches weather data for the specified city:
```javascript
const APIKey = 'your_api_key_here';
const city = document.querySelector('.search-box input').value;

if (city === '') return;

try {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    const json = await response.json();
```
- `APIKey`: Your OpenWeatherMap API key.
- `city`: The city name entered by the user.
- The `fetch` function is used to get weather data from the OpenWeatherMap API.

### Update UI

If the weather data is successfully fetched, the UI is updated accordingly:
```javascript
const image = document.querySelector('.weather-box img');
const temperature = document.querySelector('.weather-box .temperature');
const description = document.querySelector('.weather-box .description');
const humidity = document.querySelector('.weather-details .humidity span');
const wind = document.querySelector('.weather-details .wind span');

const weatherImages = {
    Clear: 'images/clear.png',
    Rain: 'images/rain.png',
    Clouds: 'images/cloud.png',
    Snow: 'images/snow.png',
    Mist: 'images/mist.png',
    Haze: 'images/mist.png'
};

if (json.weather && json.weather[0]) {
    const weatherMain = json.weather[0].main;
    image.src = weatherImages[weatherMain] || 'images/cloud.png'; // Fallback image if condition not matched

    temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
    description.innerHTML = `${json.weather[0].description}`;
    humidity.innerHTML = `${json.main.humidity}%`;
    wind.innerHTML = `${parseInt(json.wind.speed)}km/h`;
} else {
    // Handle cases where weather information is not available
    temperature.innerHTML = '';
    description.innerHTML = 'No weather information available';
    humidity.innerHTML = '';
    wind.innerHTML = '';
    image.src = 'images/404.png';
}
```
- `weatherImages`: An object mapping weather conditions to corresponding image paths.
- The UI elements (image, temperature, description, humidity, and wind) are updated based on the fetched weather data.

### Error Handling

The script includes error handling to manage cases where the fetch operation fails:
```javascript
} catch (error) {
    console.error('There has been a problem with your fetch operation:', error);
    // Handle errors gracefully here, maybe show an error message to the user
}
```
- Any errors during the fetch operation are caught and logged to the console.
- Additional error handling can be implemented to display user-friendly messages.

---

Replace `your_api_key_here` with your actual OpenWeatherMap API key in the code. This README provides a comprehensive guide to understanding and using the weather app.