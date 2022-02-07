const APIKey = 'rgA9mhnVwkjPpGyrOGhe39rZ3zPH9RWP'
const baseUrl = 'http://dataservice.accuweather.com/'

const getCityUrl = cityName => 
  `${baseUrl}locations/v1/cities/search?apikey=${APIKey}&q=${cityName}`
  
const getWeatherUrl = citykey => 
  `${baseUrl}currentconditions/v1/${citykey}?apikey=${APIKey}&language=pt-br`

const getDailyForecastsUrl = cityKey => 
  `${baseUrl}forecasts/v1/daily/5day/${cityKey}?apikey=${APIKey}&language=pt-br&metric=true`

const fetchData = async endpoint => {
  try {
    const response = await fetch(endpoint)
    
    if (!response.ok) {
      throw new Error('Não foi possível obter os dados')
    }
    return response.json()
  } catch ({name, message}) {
    alert(`${name}: ${message}`)
  }
}

const getCityData = cityName => fetchData(getCityUrl(cityName))
const getWeatherData = cityKey => fetchData(getWeatherUrl(cityKey))
const get5DaysOfDailyForecastsData = cityKey => fetchData(getDailyForecastsUrl(cityKey))