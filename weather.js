const cityInput = document.querySelector('.search-input');
const searchbtn = document.querySelector('.search-button');

const weatherInfoSection = document.querySelector('.weather-info');
const searchCitySection = document.querySelector('.search-city ');
const notFoundSection = document.querySelector('.not-found');

const countryTxt = document.querySelector('.country-txt');
const tempTxt = document.querySelector('.temp-text');
const conditionTxt = document.querySelector('.condition-txt');
const humidityValueText = document.querySelector('.Humidity-value-text');
const WindValueText = document.querySelector('.Wind-value-text');
const weatherImage = document.querySelector('.weather-image');
const curruntDataText = document.querySelector('.currunt-data-text');


const apiKey = '5817b68aaf1c51b75d91bf30cd8f99cd' ;

searchbtn.addEventListener('click',() => {
  if (cityInput.value.trim() != '') {
    updateWeatherInfo(cityInput.value)
    cityInput.value = '';
    cityInput.blur()
  }
})
cityInput.addEventListener('keydown',(event) => {
  if (event.key === 'Enter' && cityInput.value.trim() != '') {
    updateWeatherInfo(cityInput.value)
    cityInput.value = '';
    cityInput.blur()
  }
})
async function getFetchData(endPoint ,city) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/${endPoint}?q=${city}&appid=${apiKey}&units=metric`;
  const response = await fetch(apiUrl) 
  return response.json()

}
function getWeatherIcon(id) {
  if (id <= 232) return 'thunderstorm.svg';
  if (id <= 321) return 'drizzle.svg';
  if (id <= 531) return 'rain.svg';
  if (id <= 622) return 'snow.svg';
  if (id <= 781) return 'atmosphere.svg';
  if (id <= 800) return 'clear.svg';
  return 'clouds.svg';
}
function getCurrentDate() {
  const currentDate = new Date();
  const options = {
    weekday: 'short',
    day: '2-digit',
    month: 'short'
  };

  return currentDate.toLocaleDateString('en-GB', options);
}
async function updateWeatherInfo(city) {
  const weatherData = await getFetchData('weather', city);

  if (weatherData.cod != 200) {
    showDisplaySection(notFoundSection)
    return
  }
  console.log(weatherData);

  const {
    name: country,
    main: { temp, humidity },
    weather: [{ id, main }], 
    wind: { speed }
  } = weatherData;

  countryTxt.textContent = country
  tempTxt.textContent = Math.round(temp) + '℃'
  conditionTxt.textContent = main
  humidityValueText.textContent = humidity + '%'
  WindValueText.textContent = speed + 'M/s'

  curruntDataText.textContent = getCurrentDate()
  weatherImage.src = `img/SVG/weather/${getWeatherIcon(id)}`


  
  showDisplaySection(weatherInfoSection); 
}

function showDisplaySection(section) {
  [weatherInfoSection, searchCitySection, notFoundSection]
    .forEach(section => section.style.display = 'none');

  section.style.display = 'flex';
}
