const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');

search.addEventListener('click', async () => {
    const APIKey = '2675a0482e5c8100dce84fc9f2ecfe88';
    const city = document.querySelector('.search-box input').value;

    if (city === '') return;

    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const json = await response.json();

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
    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
        // Handle errors gracefully here, maybe show an error message to the user
    }
});
