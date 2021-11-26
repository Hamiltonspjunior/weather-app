const APIKey = 'mWpL7IAhuPlEfIuU3ppe1rAfJr1tdKpC'
const baseUrl = 'http://dataservice.accuweather.com/'

const getCityUrl = cityName => `${baseUrl}locations/v1/cities/search?apikey=${APIKey}&q=${cityName}`
const getWeatherUrl = citykey => `${baseUrl}currentconditions/v1/${citykey}?apikey=${APIKey}&language=pt-br`

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

const getCityData = async cityName => {
  const [cityData] = await fetchData(getCityUrl(cityName))

  return cityData
}

const getWeatherData = async cityName => {
  const {Key} = await getCityData(cityName)
  const [weatherData] = await fetchData(getWeatherUrl(Key))
  
  return weatherData
}

getWeatherData('Guarulhos')