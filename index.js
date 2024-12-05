let id = id => document.getElementById(id);
let q = q => document.querySelector(q);
let inputField = id('location');
let container = q('.container');
let search = q('.search-box button');
let weatherBox = q('.weather-box');
let weatherDetails = q('.weather-details');

inputField.addEventListener('focus', () => {
    inputField.setAttribute('placeholder', '');
});
inputField.addEventListener('blur', () => {
    inputField.setAttribute('placeholder', 'Enter your location');
});

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
        const image = q('.weather-box .box .info-weather .weather img');
        const temperature = q('.weather-box .box .info-weather .weather .temperature');
        const description = q('.weather-box .box .info-weather .weather .description');
        const humidity = q('.weather-details .humidity .text .info-humidity span');
        const wind = q('.weather-details .wind .text .info-wind span');
        const pressure = q('.weather-details .pressure .text .info-pressure span');
        const visibility = q('.weather-details .visibility .text .info-visibility span');
        const sunrise = q('.sunrise-sunset .sunrise .text span');
        const sunset = q('.sunrise-sunset .sunset .text span');
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
            wind.innerHTML = `${parseFloat(json.wind.speed)}km/h`;
            pressure.innerHTML = `${json.main.pressure} hPa`;
            visibility.innerHTML = `${(json.visibility / 1000).toFixed(1)} km`; // Convert visibility to km
            sunrise.innerHTML = new Date(json.sys.sunrise * 1000).toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'});
            sunset.innerHTML = new Date(json.sys.sunset * 1000).toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'});
        }

        weatherBox.style.display = 'block';
        container.style.paddingTop = '60px';
    } catch (error) {
        createPopup(error.message);
    }
});
