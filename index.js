// Helper functions to select elements
let id = id => document.getElementById(id);
let q = q => document.querySelector(q);

// Selecting DOM elements
let inputField = id('location');
let container = q('.container');
let search = q('.search-box button');
let weatherBox = q('.weather-box');
let weatherDetails = q('.weather-details');

// Event listeners for input field focus and blur to handle placeholder
inputField.addEventListener('focus', () => {
    inputField.setAttribute('placeholder', '');
});
inputField.addEventListener('blur', () => {
    inputField.setAttribute('placeholder', 'Enter your location');
});

// Function to create and display a custom popup
function createPopup(message) {
    let popup = document.createElement('div');
    popup.classList.add('custom-popup');
    popup.innerHTML = `
        <div class="popup-content">
            <p>${message}</p>
            <button class="close-popup">OK</button>
        </div>
    `;
    document.body.appendChild(popup);

    let closeButton = popup.querySelector('.close-popup');
    closeButton.addEventListener('click', () => {
        document.body.removeChild(popup);
    });
}

// Function to convert Unix timestamp to HH:MM AM/PM format
function convertUnixToTime(unix_timestamp) {
    const date = new Date(unix_timestamp * 1000);
    let hours = date.getHours();
    const minutes = "0" + date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    return hours + ':' + minutes.substr(-2) + ' ' + ampm;
}

// Event listener for search button click
search.addEventListener('click', async () => {
    const APIKey = '2675a0482e5c8100dce84fc9f2ecfe88';
    const city = inputField.value.trim();

    if (!city) {
        createPopup('Please enter a valid city name.');
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

        let json = await response.json();

        // Selecting DOM elements to update
        const image = q('.weather-box .box .info-weather .weather img');
        const temperature = q('.weather-box .box .info-weather .weather .temperature');
        const description = q('.weather-box .box .info-weather .weather .description');
        const humidity = q('.weather-details .humidity .text .info-humidity span');
        const wind = q('.weather-details .wind .text .info-wind span');
        const pressure = q('.weather-details .pressure .text .info-pressure span');
        const visibility = q('.weather-details .visibility .text .info-visibility span');
        const sunrise = q('.weather-details .sunrise .text .info-sunrise span');
        const sunset = q('.weather-details .sunset .text .info-sunset span');

        // Mapping weather conditions to images
        const weatherImages = {
            Clear: 'images/clear.png',
            Rain: 'images/rain.png',
            Clouds: 'images/cloud.png',
            Snow: 'images/snow.png',
            Mist: 'images/mist.png',
            Haze: 'images/mist.png',
            Drizzle: 'images/rain.png',
            Thunderstorm: 'images/thunderstorm.png'
        };

        if (json.weather && json.weather[0]) {
            const weatherMain = json.weather[0].main;
            image.src = weatherImages[weatherMain] || 'images/cloud.png'; // Fallback image
            temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
            description.innerHTML = `${json.weather[0].description}`;
            humidity.innerHTML = `${json.main.humidity}%`;
            wind.innerHTML = `${parseFloat(json.wind.speed)} km/h`;

            // Update additional details
            pressure.innerHTML = `${json.main.pressure} hPa`;
            visibility.innerHTML = `${(json.visibility / 1000).toFixed(1)} km`;
            sunrise.innerHTML = convertUnixToTime(json.sys.sunrise);
            sunset.innerHTML = convertUnixToTime(json.sys.sunset);

            // Show weather box
            weatherBox.style.display = "block";
        }
    } catch (error) {
        createPopup(error.message);
    }
});
