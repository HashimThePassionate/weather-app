let id = id => document.getElementById(id);
let q = q => document.querySelector(q);

let inputField = id('location');
let search = q('.search-box button');

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
    popup.querySelector('.close-popup').addEventListener('click', () => {
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
            throw new Error(response.status === 404 ? 'City not found.' : 'Failed to fetch data.');
        }

        let json = await response.json();
        q('.weather-box img').src = `images/${json.weather[0].main.toLowerCase()}.png`;
        q('.temperature').innerHTML = `${Math.round(json.main.temp)}<span>°C</span>`;
        q('.description').textContent = json.weather[0].description;
        q('.info-humidity span').textContent = `${json.main.humidity}%`;
        q('.info-wind span').textContent = `${Math.round(json.wind.speed)}km/h`;
        q('.info-visibility span').textContent = `${json.visibility}m`;
        q('.info-feels-like span').textContent = `${Math.round(json.main.feels_like)}°C`;
    } catch (error) {
        createPopup(error.message);
    }
});
