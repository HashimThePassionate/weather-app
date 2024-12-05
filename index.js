document.addEventListener("DOMContentLoaded", () => {
    const searchButton = document.querySelector('.search-btn');
    const locationInput = document.querySelector('#location');
    
    // Function to fetch weather data from API
    async function fetchWeatherData(city) {
        const APIKey = '2675a0482e5c8100dce84fc9f2ecfe88';
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`;
        
        try {
            const response = await fetch(url);
            const data = await response.json();
            
            if (data.cod === "404") {
                alert("City not found!");
                return;
            }
            
            updateWeatherUI(data);
        } catch (error) {
            alert("Error fetching weather data. Please try again later.");
        }
    }

    // Function to update the UI with fetched data
    function updateWeatherUI(data) {
        // Update weather information
        document.querySelector("#weather-icon").src = `images/${data.weather[0].main.toLowerCase()}.png`; 
        document.querySelector(".temperature").innerHTML = `${Math.round(data.main.temp)}°C`;
        document.querySelector(".description").innerHTML = data.weather[0].description;
        
        // Update weather details
        document.querySelector("#humidity").innerHTML = `${data.main.humidity}%`;
        document.querySelector("#wind-speed").innerHTML = `${Math.round(data.wind.speed)} km/h`;
        document.querySelector("#feels-like").innerHTML = `${Math.round(data.main.feels_like)}°C`;
        document.querySelector("#pressure").innerHTML = `${data.main.pressure} hPa`;
        
        const sunriseTime = new Date(data.sys.sunrise * 1000).toLocaleTimeString();
        document.querySelector("#sunrise").innerHTML = sunriseTime;
        
        const sunsetTime = new Date(data.sys.sunset * 1000).toLocaleTimeString();
        document.querySelector("#sunset").innerHTML = sunsetTime;
    }

    // Search button click event
    searchButton.addEventListener("click", () => {
        const city = locationInput.value.trim();
        if (city !== "") {
            fetchWeatherData(city);
        } else {
            alert("Please enter a valid city name!");
        }
    });

    // Allow enter key to trigger search
    locationInput.addEventListener("keypress", (e) => {
        if (e.key === 'Enter') {
            const city = locationInput.value.trim();
            if (city !== "") {
                fetchWeatherData(city);
            } else {
                alert("Please enter a valid city name!");
            }
        }
    });
});
