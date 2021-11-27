const $cityForm = document.querySelector('[data-js="change-location"]')
const $cityCard = document.querySelector('[data-js="city-card"]')
const $timeImage = document.querySelector('[data-js="time"]')
const $timeIcon = document.querySelector('[data-js="time-icon"]')
const $cityName = document.querySelector('[data-js="city-name"]')
const $cityWeather = document.querySelector('[data-js="city-weather"]')
const $cityTemperature = document.querySelector('[data-js="city-temperature"]')

const showCityCard = () => {
  if ($cityCard.classList.contains('d-none')) {
    $cityCard.classList.remove('d-none')
  }
}

const generateTimeIconImg = (WeatherIcon, WeatherText) => /*html*/`
  <img src="./src/icons/${WeatherIcon}.svg" alt="${WeatherText}" title="${WeatherText}" >
`
const getCityCardData = async inputValue => {
  const [{ Key, LocalizedName }] = await getCityData(inputValue)
  const [{ IsDayTime, Temperature, WeatherIcon, WeatherText }] = await getWeatherData(Key)

  const timeImageSrc = IsDayTime ? `./src/day.svg` : `./src/night.svg`
  const timeIconImg = generateTimeIconImg(WeatherIcon, WeatherText)

  return { LocalizedName, timeImageSrc, timeIconImg, Temperature, WeatherText }
}

const insertDataIntoCityCard = (cityCardData) => {
  const {LocalizedName, timeImageSrc, timeIconImg, Temperature, WeatherText} = cityCardData

  $timeImage.src = timeImageSrc
  $timeIcon.innerHTML = timeIconImg
  $cityName.innerHTML = LocalizedName
  $cityWeather.innerHTML = WeatherText
  $cityTemperature.innerHTML = Temperature.Metric.Value
}

const handleSubmit = async event => {
  event.preventDefault()

  const inputValue = event.target.city.value
  const cityCardData = await getCityCardData(inputValue)

  insertDataIntoCityCard(cityCardData)
  showCityCard()

  $cityForm.reset()
}

$cityForm.addEventListener('submit', handleSubmit)