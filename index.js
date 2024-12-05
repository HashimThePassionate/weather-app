document.getElementById('search-btn').addEventListener('click', async () => {
    const API_KEY = '2675a0482e5c8100dce84fc9f2ecfe88';
    const city = document.getElementById('search-input').value.trim();

    if (!city) {
        alert('Please enter a city name!');
        return;
    }

    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`);
        if (!response.ok) throw new Error('City not found!');

        const data = await response.json();
        updateWeather(data);
    } catch (error) {
        alert(error.message);
    }
});

function updateWeather(data) {
    document.getElementById('weather-icon').src = getWeatherIcon(data.weather[0].main);
    document.getElementById('city-name').innerText = data.name;
    document.getElementById('temperature').innerHTML = `${Math.round(data.main.temp)}°C`;
    document.getElementById('weather-description').innerText = data.weather[0].description;
    document.getElementById('humidity').innerText = `${data.main.humidity}%`;
    document.getElementById('wind-speed').innerText = `${data.wind.speed} km/h`;

    const sunrise = new Date(data.sys.sunrise * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const sunset = new Date(data.sys.sunset * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    document.getElementById('sunrise').innerText = sunrise;
    document.getElementById('sunset').innerText = sunset;
}

function getWeatherIcon(weather) {
    const icons = {
        Clear: 'images/clear.png',
        Rain: 'images/rain.png',
        Clouds: 'images/cloud.png',
        Snow: 'images/snow.png',
        Mist: 'images/mist.png',
    };
    return icons[weather] || 'images/cloud.png';
}
