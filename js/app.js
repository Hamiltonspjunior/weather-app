const $cityForm = document.querySelector('[data-js="change-location"]')
const $cityCard = document.querySelector('[data-js="city-card"]')
const $timeImage = document.querySelector('[data-js="time"]')
const $timeIcon = document.querySelector('[data-js="time-icon"]')
const $cityName = document.querySelector('[data-js="city-name"]')
const $cityWeather = document.querySelector('[data-js="city-weather"]')
const $cityTemperature = document.querySelector('[data-js="city-temperature"]')

$cityForm.addEventListener('submit', async event => {
  event.preventDefault()

  const inputValue = event.target.city.value
  const [{ Key, LocalizedName }] = await getCityData(inputValue)
  const [{ IsDayTime, Temperature, WeatherIcon, WeatherText }] = await getWeatherData(Key)
  const timeIconImg = /*html*/`
    <img src="./src/icons/${WeatherIcon}.svg" alt="${WeatherText}" title="${WeatherText}" >
  `

  if ($cityCard.classList.contains('d-none')) {
    $cityCard.classList.remove('d-none')
  }

  $timeImage.src = IsDayTime ? `./src/day.svg` : `./src/night.svg`
  $timeIcon.innerHTML = timeIconImg
  $cityName.innerHTML = LocalizedName
  $cityWeather.innerHTML = WeatherText
  $cityTemperature.innerHTML = Temperature.Metric.Value
})