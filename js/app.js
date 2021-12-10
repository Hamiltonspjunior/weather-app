const $cityForm = document.querySelector('[data-js="change-location"]')
const $cityCard = document.querySelector('[data-js="city-card"]')
const $timeImage = document.querySelector('[data-js="time"]')
const $timeIcon = document.querySelector('[data-js="time-icon"]')
const $cityName = document.querySelector('[data-js="city-name"]')
const $cityWeather = document.querySelector('[data-js="city-weather"]')
const $cityTemperature = document.querySelector('[data-js="city-temperature"]')
const $dailyForecastsList = document.querySelector('[data-js="daily-forecasts-list"]')
const lastCityFetched = localStorage.getItem('lastCityFetched')

const showCityCard = () => {
  const isCityCardHidden = $cityCard.classList.contains('d-none')

  if (isCityCardHidden) {
    $cityCard.classList.remove('d-none')
  }
}

const getTimeIconImg = (WeatherIcon, WeatherText) => /*html*/`
<img src="./src/icons/${WeatherIcon}.svg" alt="${WeatherText}" title="${WeatherText}" >
`

const getWeekDayAbbreviation = date => 
  new Date(date).toLocaleString('pt-br', { weekday: 'short'}).slice(0, 3)

getDailyForecastsHTML = (DailyForecasts, IsDayTime) =>
  DailyForecasts.reduce((acc, {Date, Day, Night, Temperature}) => {
    const weekDayAbbreviation = getWeekDayAbbreviation(Date)
    const timeIcon = IsDayTime ? Day.Icon : Night.Icon
    const timeIconPhrase = IsDayTime ? Day.IconIconPhrase : Night.IconPhrase
    const maxTemperature = Math.trunc(Temperature.Maximum.Value)
    const minTemperature = Math.trunc(Temperature.Minimum.Value)
    
    acc += /*html*/`
      <li class="daily-forecasts-day col-3">
        <span class="text-capitalize">${weekDayAbbreviation}</span>
        <img src="./src/icons/${timeIcon}.svg" alt="${timeIconPhrase}" title="${timeIconPhrase}" class="daily-forecasts-image">
        <span>${maxTemperature}&deg; / ${minTemperature}</span>&deg;
      </li>
    `
    return acc
  }, '')

const getCityCardData = async cityName => {
  const [{ Key, LocalizedName }] = await getCityData(cityName)
  const [{ IsDayTime, Temperature, WeatherIcon, WeatherText }] = await getWeatherData(Key)
  const {DailyForecasts} = await get5DaysOfDailyForecastsData(Key)
  
  DailyForecasts.shift()

  return { LocalizedName, IsDayTime, Temperature, WeatherIcon, WeatherText, DailyForecasts }
}

const insertDataIntoCityCard = cityCardData => {
  const { LocalizedName, IsDayTime, Temperature, WeatherIcon, WeatherText, DailyForecasts } = cityCardData

  $timeImage.src = IsDayTime ? './src/day.svg' : './src/night.svg'
  $timeIcon.innerHTML = getTimeIconImg(WeatherIcon, WeatherText)
  $cityName.innerHTML = LocalizedName
  $cityWeather.innerHTML = WeatherText
  $cityTemperature.innerHTML = Temperature.Metric.Value
  $dailyForecastsList.innerHTML = getDailyForecastsHTML(DailyForecasts, IsDayTime)

  showCityCard()
}

const saveCityNameInLocalStorage = cityName => {
  localStorage.setItem('lastCityFetched', cityName)
}

const showCityWeather = async event => {
  event.preventDefault()

  const cityName = event.target.city.value
  const cityCardData = await getCityCardData(cityName)

  saveCityNameInLocalStorage(cityName)
  insertDataIntoCityCard(cityCardData)
  $cityForm.reset()
}

const showLastCityWatherFetched = async () => {
  if (lastCityFetched) {
    const cityCardData = await getCityCardData(lastCityFetched)
    
    insertDataIntoCityCard(cityCardData)
  }
}

$cityForm.addEventListener('submit', showCityWeather)
showLastCityWatherFetched()