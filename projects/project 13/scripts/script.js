const requestOptions = {
    method: "GET",
    redirect: "follow"
};

let searchBtn = document.getElementById('search-btn');
let cityInput = document.getElementById('city-input');
let clearBtn = document.getElementById('clear-btn');

searchBtn.addEventListener('click', () => {
    let cityName = cityInput.value.trim();

    if (cityName) {
        fetch(`https://api.weatherapi.com/v1/current.json?key=d0b4c860a6de4234bca104631242507&q=${cityName}&aqi=no`, requestOptions)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('City not found');
                }
                return response.json();
            })
            .then((result) => {
                console.log(result);

                document.querySelector('.weather-info').style.display = 'block';
                document.getElementById('country-name').innerText = result.location.country;
                document.getElementById('city-name').innerText = result.location.name;
                document.getElementById('weather-description').innerText = result.current.condition.text;
                document.getElementById('temp-value').innerText = result.current.temp_c;
                document.getElementById('humidity-value').innerText = result.current.humidity;
                document.getElementById('wind-speed-value').innerText = result.current.wind_kph;
                document.getElementById('local-time').innerText = result.location.localtime;
            })
            .catch((error) => {
                console.error('Error:', error);
                alert('City not found. Please enter a valid city name.');
            });
    } else {
        alert("Please enter a city name");
    }
});

clearBtn.addEventListener('click', ()=> {
    cityInput.value = '';

    document.querySelector('.weather-info').style.display = 'none';
    document.getElementById('city-name').innerText = '';
    document.getElementById('weather-description').innerText = '';
    document.getElementById('temp-value').innerText = '';
    document.getElementById('humidity-value').innerText = '';
    document.getElementById('wind-speed-value').innerText = '';
})


const backBtn = document.getElementById('backBtn');
backBtn.addEventListener('click',()=>{
  window.history.back();
});