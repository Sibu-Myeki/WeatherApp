// Function to display the current weather information
function displayWeather(response) {
  // Clear previous weather data to ensure fresh data is shown
  let temperatureElement = document.querySelector("#current-temperature");
  let cityElement = document.querySelector("#current-city");
  let descriptionElement = document.querySelector("#weather-description");
  let humidityElement = document.querySelector("#humidity");
  let windSpeedElement = document.querySelector("#wind-speed");
  let weatherIcon = document.querySelector(".current-temperature-icon");

  // Check if data exists in the response before proceeding
  if (response.data && response.data.temperature && response.data.condition) {
    let temperature = Math.round(response.data.temperature.current); // Temperature in Celsius
    let city = response.data.city;
    let description = response.data.condition.description; // Weather condition description
    let humidity = response.data.temperature.humidity + "%"; // Humidity
    let windSpeed = response.data.wind.speed + " km/h"; // Wind speed
    let weatherDescription = description.toLowerCase();

    // Update the city name
    cityElement.innerHTML = city;

    // Update weather description, humidity, and wind speed
    descriptionElement.innerHTML = description;
    humidityElement.innerHTML = humidity;
    windSpeedElement.innerHTML = windSpeed;

    // Update temperature element with rounded temperature
    temperatureElement.innerHTML = temperature;

    // Get the weather description and update the emoji accordingly
    if (weatherDescription.includes("sunny") || weatherDescription.includes("clear")) {
      weatherIcon.innerHTML = "☀️"; // Sunny emoji
    } else if (weatherDescription.includes("rain") || weatherDescription.includes("showers")) {
      weatherIcon.innerHTML = "🌧️"; // Rainy emoji
    } else if (weatherDescription.includes("cloud") || weatherDescription.includes("overcast")) {
      weatherIcon.innerHTML = "☁️"; // Cloudy emoji
    } else if (weatherDescription.includes("snow")) {
      weatherIcon.innerHTML = "❄️"; // Snowy emoji
    } else {
      weatherIcon.innerHTML = "🌤️"; // Default (partly sunny) emoji for unknown conditions
    }
  } else {
    alert("Weather data not found. Please try again later.");
  }
}

// Function to format the date (hour and minute)
function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let day = date.getDay();

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  if (hours < 10) {
    hours = `0${hours}`;
  }

  let days = [
    "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
  ];

  let formattedDay = days[day];
  return `${formattedDay} ${hours}:${minutes}`;
}

// Function to handle the search form submission
function search(event) {
  event.preventDefault();
  let searchInputElement = document.querySelector("#search-input");
  let city = searchInputElement.value.trim();

  if (!city) {
    alert("Please enter a city name.");
    return; // Avoid API call if the input is empty
  }

  let apiKey = "b2a5adcct04b33178913oc335f405433";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

  // Fetch weather data and call displayWeather to update the page
  axios.get(apiUrl)
    .then(displayWeather)
    .catch(function (error) {
      console.error("Error fetching data:", error);
      alert("Sorry, we couldn't fetch the weather data. Please try again.");
    });
}

// Event listener for the search form submission
let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);

// Update the current date on the page
let currentDateElement = document.querySelector("#current-date");
let currentDate = new Date();
currentDateElement.innerHTML = formatDate(currentDate);
