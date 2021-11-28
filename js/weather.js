const APIKey = 'ppFJjAOPJ1zO61uzAXUgTIOqUB3WM0T2'
const baseUrl = 'http://dataservice.accuweather.com/'

const getCityUrl = cityName => 
  `${baseUrl}locations/v1/cities/search?apikey=${APIKey}&q=${cityName}`
  
const getWeatherUrl = citykey => 
  `${baseUrl}currentconditions/v1/${citykey}?apikey=${APIKey}&language=pt-br`

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

const getWeatherData = key => fetchData(getWeatherUrl(key))