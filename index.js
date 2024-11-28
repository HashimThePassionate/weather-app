let id = id => document.getElementById(id);
let query = q => document.querySelector(q);
let inputfield = id('location');
const container = query('.container');
const search = query('.search-box button');
const weatherBox = query('.weather-box');
const weatherDetails = query('.weather-details');

// Hide placeholder on focus
inputfield.addEventListener('focus', () => {
    inputfield.setAttribute('placeholder', '');
});

// Show placeholder back on blur
inputfield.addEventListener('blur', () => {
    inputfield.setAttribute('placeholder', 'Enter your location');
});

// Fetch weather data on search click
search.addEventListener('click', async () => {
    const APIKey = '2675a0482e5c8100dce84fc9f2ecfe88';
    const city = inputfield.value.trim();

    if (!city) {
        alert('Please enter a valid city name.');
        return;
    }

    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`);
        if (!response.ok) {
            if (response.status === 404) {
                throw new Error('City not found. Please try again.');
            } else {
                throw new Error('Failed to fetch weather data. Try again later.');
            }
        }

        const json = await response.json();

        const image = query('.weather-box img');
        const temperature = query('.weather-box .temperature');
        const description = query('.weather-box .description');
        const humidity = query('.weather-details .humidity span');
        const wind = query('.weather-details .wind span');

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
            image.src = weatherImages[weatherMain] || 'images/cloud.png'; // Fallback image
            temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
            description.innerHTML = `${json.weather[0].description}`;
            humidity.innerHTML = `${json.main.humidity}%`;
            wind.innerHTML = `${parseInt(json.wind.speed)}km/h`;
        } else {
            // Clear data if no weather information is available
            image.src = 'images/404.png';
            temperature.innerHTML = '';
            description.innerHTML = 'Weather data not available';
            humidity.innerHTML = '';
            wind.innerHTML = '';
        }
    } catch (error) {
        console.error('Error fetching weather data:', error.message);
        alert(error.message); // Display error to the user
    }
});
