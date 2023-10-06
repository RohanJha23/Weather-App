const apiKey = "0cf7efa94ddd26183681e6928f78bd6e";
const apiURL = "https://api.openweathermap.org/data/2.5/weather?units=metric"

async function checkWeather(PlaceName) {
    const response = await fetch(apiURL + `&q=${PlaceName}` + `&appid=${apiKey}`);
    const data = await response.json();
    return data; // Return the data from the function
}

const button = document.getElementById("search-bar");

document.getElementById("information").style.display="none";
button.onclick = async function () { // Make the click handler asynchronous
    const cityName = document.getElementById("City-Input").value;
    console.log(cityName);
    
    try {
        const weatherData = await checkWeather(cityName);
        console.log(weatherData);
        if(`${weatherData.cod}`!="404"){
        // Update the HTML with the temperature
        document.getElementById("temperature").innerHTML = `${weatherData.main.temp}°C`;
        document.getElementById("City-Name").innerHTML = `${weatherData.name}`;
        document.getElementById("humidity").innerHTML = `${weatherData.main.humidity}%`;
        document.getElementById("wind-speed").innerHTML = `${weatherData.wind.speed} km/hr`;
        document.getElementById("information").style.display="flex";
        document.getElementById("Invalid").style.display = "none";
        }
        else
        {
            document.getElementById("Invalid").style.display = "block";
            document.getElementById("information").style.display="none";
            console.log("Wrong City!");
        }
    } catch (error) {
        console.error("Error fetching weather data:", error);
    }

    document.getElementById("City-Input").value = null;
}
