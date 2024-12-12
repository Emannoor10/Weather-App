var apiKey = "5636459adaf74823a9f211318241112";
var forecastWeather = document.getElementById("forecastWeather");
async function fetchWeather(text) {
    if (!text) 
		return;

    var forecastUrl = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${text}&days=3`;
    var forecastResponse = await fetch(forecastUrl);
    if (forecastResponse.ok) {
        var forecastData = await forecastResponse.json();
        displayForecast(forecastData);
    } else {
		alert("Unable to fetch weather data. Please try again.")
    
    }
}

document.getElementById("searchInput").addEventListener("input", function () {
    var text = this.value.trim();
    if (!text) {
        forecastWeather.innerHTML = ""; 
        return;
    }
    if (text.length < 3) {
        forecastWeather.innerHTML = "";
        return;
    }
    fetchWeather(text);
});

function displayForecast(data) {
    var forecastday = data.forecast.forecastday;
    forecastWeather.innerHTML = ''; 
    for (var i = 0; i < forecastday.length; i++) {
        var date = forecastday[i].date;
        var dayName = new Date(date).toLocaleDateString('en-US', { weekday: 'long' });
		var dayAndMonth = new Date(date).toLocaleDateString('en-US', {  month: 'long',day: 'numeric' });
        if (i === 0) {
            forecastWeather.innerHTML += `
			 <div class="card p-3 forecast-day first ">
                <div class=" header d-flex justify-content-between ">
                    <p class="">${dayName}</p>
                    <p class="">${dayAndMonth}</p>
					
                </div>
                <h6 class="city fs-6 py-3">${data.location.name}</h6>
                <p class="tem">${forecastday[i].day.avgtemp_c}°C</p>
                <img src="${forecastday[i].day.condition.icon}" alt="Weather Icon">
                <p class="para">${forecastday[i].day.condition.text}</p>
				 <div class="icons2 d-flex justify-content-start ">
    <div class="icon1 ">
        <i class="fa-solid fa-umbrella"></i>
        <span class="">20%</span>
    </div>
    <div class="icon1 ">
        <i class="fa-solid fa-wind"></i>
        <span class="">18km/h</span>
    </div>
    <div class="icon1">
  <i class="fa-regular fa-compass"></i>
        <span class="">East</span>
    </div>
  </div>
            </div>
           
            `;
        } else {
          
            forecastWeather.innerHTML += `
			  <div class="card forecast-day first">
                <div class="card-header ">
                    <p class="text-center">${dayName}</p>
                </div>
             <img  class="two-three mt-5 mb-2 " src="${forecastday[i].day.condition.icon}" alt="Weather Icon">
                <p class="text-center fs-2 text-white fw-bold">${forecastday[i].day.avgtemp_c}°C</p>
                   <p class="text-center fs-5">${forecastday[i].day.avgtemp_f}°f</p>
                <p class="text-center para pb-5">${forecastday[i].day.condition.text}</p>
            </div>
            `;
        }
    }
}

async function fetchWeatherForUserLocation() {
	if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
        return;
    }
    navigator.geolocation.getCurrentPosition(
        position => fetchWeather(`${position.coords.latitude},${position.coords.longitude}`),
        () => {
			alert("Error: Unable to get your location. Please allow location access ")
          
        }
    );
}

fetchWeatherForUserLocation();

