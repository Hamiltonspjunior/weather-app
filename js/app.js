const $cityForm = document.querySelector('[data-js="change-location"]')
const $cityCard = document.querySelector('[data-js="city-card"]')
const $timeImage = document.querySelector('[data-js="time"]')
const $timeIcon = document.querySelector('[data-js="time-icon"]')
const $cityName = document.querySelector('[data-js="city-name"]')
const $cityWeather = document.querySelector('[data-js="city-weather"]')
const $cityTemperature = document.querySelector('[data-js="city-temperature"]')

const showCityCard = () => {
  const isCityCardHidden = $cityCard.classList.contains('d-none')

  if (isCityCardHidden) {
    $cityCard.classList.remove('d-none')
  }
}

const getTimeIconImg = (WeatherIcon, WeatherText) => /*html*/`
  <img src="./src/icons/${WeatherIcon}.svg" alt="${WeatherText}" title="${WeatherText}" >
`
const getCityCardData = async cityName => {
  const [{ Key, LocalizedName }] = await getCityData(cityName)
  const [{ IsDayTime, Temperature, WeatherIcon, WeatherText }] = await getWeatherData(Key)

  return { LocalizedName, IsDayTime, Temperature, WeatherIcon, WeatherText }
}

const showCityWeather = async event => {
  event.preventDefault()

  const cityName = event.target.city.value
  const { LocalizedName, IsDayTime, Temperature, WeatherIcon, WeatherText } = await getCityCardData(cityName)

  $timeImage.src = IsDayTime ? './src/day.svg' : './src/night.svg'
  $timeIcon.innerHTML = getTimeIconImg(WeatherIcon, WeatherText)
  $cityName.innerHTML = LocalizedName
  $cityWeather.innerHTML = WeatherText
  $cityTemperature.innerHTML = Temperature.Metric.Value
  showCityCard()
  $cityForm.reset()
}

$cityForm.addEventListener('submit', showCityWeather)