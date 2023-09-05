document.getElementById("getWeatherButton").addEventListener("click", function () {
    var city = document.getElementById("cityInput").value;
    var api_key = "40c71cb0abe562ccd5f21ad173b722a8";
    var weatherInfoElement = document.getElementById("weatherInfo");

    // Resetăm textul și opacitatea la fiecare cerere nouă
    weatherInfoElement.textContent = "";
    weatherInfoElement.style.opacity = 0;

    fetch("https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + api_key + "&units=metric")
        .then(response => response.json())
        .then(data => {
            var temperature = data.main.temp;
            var humidity = data.main.humidity;
            var feelsLike = data.main.feels_like;
            var weatherDescription = data.weather[0].description;
            var windSpeed = data.wind.speed;

            // Extragem informațiile adiționale
            var minTemperature = data.main.temp_min;
            var maxTemperature = data.main.temp_max;
            var pressure = data.main.pressure;
            var visibility = data.visibility;
            var windGust = data.wind.gust;
            var clouds = data.clouds.all;
            var sunrise = new Date(data.sys.sunrise * 1000).toLocaleTimeString();
            var sunset = new Date(data.sys.sunset * 1000).toLocaleTimeString();
            var moonrise = new Date(data.sys.moonrise * 1000).toLocaleTimeString();
            var moonset = new Date(data.sys.moonset * 1000).toLocaleTimeString();
            var rainProbability = data.pop; // Șanse de ploaie

            // Creăm textul cu datele
            var weatherText =
                "Weather description: " + weatherDescription + "\n" +
                "Temperature: " + temperature + "°C\n" +
                "Humidity: " + humidity + "%\n" +
                "Feels like: " + feelsLike + "°C\n" +
                "Wind speed: " + windSpeed + " m/s\n" +
                "Pressure: " + pressure + " hPa\n" +
                "Visibility: " + visibility + " meters\n" +
                "Cloudiness: " + clouds + "%\n" +
                "Sunrise: " + sunrise + "\n" +
                "Sunset: " + sunset + "\n" +
                "Rain Probability: " + (rainProbability * 100) + "%";

            // Facem textul să apară treptat și forțăm culoarea textului la alb
            var index = 0;
            var interval = setInterval(function () {
                weatherInfoElement.innerHTML += weatherText[index];
                weatherInfoElement.style.color = "white";
                index++;
                if (index === weatherText.length) {
                    clearInterval(interval); // Oprim intervalul când textul este complet afișat
                    weatherInfoElement.style.opacity = 1; // Setăm opacitatea la 1 pentru a face textul vizibil complet
                }
            }, 25); // Intervalul între afișarea fiecărui caracter (redus de la 50ms la 25ms pentru o tranziție mai rapidă)
        })
        .catch(error => {
            weatherInfoElement.textContent = "Could not obtain weather information. Please check the city or try again later.";
        });
});
