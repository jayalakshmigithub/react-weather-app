
import './App.css';
import Search from './components/search/Search';
import CurrentWeather from './components/current-weather/Current-weather';
import { WEATHER_API_URL, WEATHER_API_KEY } from './components/api';
import { useState } from 'react';
import Forecast from './components/forecast/Forecast';


function App() {
  
  const [currentWeather,setCurrentWeather] = useState(null);
  const [forecast,setForecast] = useState(null)


  const handleOnchange = (searchData) => {
    console.log(searchData)
    const [lat, lon] = searchData.value.split(',');

    const currentWeatherFetch = fetch(`${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`)
    const forecastFetch = fetch(`${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`)

    Promise.all([currentWeatherFetch,forecastFetch])
    .then(async(response)=>{
     
      const weatherResponse= await response[0].json()
      const forecastResponse = await response[1].json()
      console.log('weatherrrr',weatherResponse)
      console.log('forecastt',forecastResponse)

      setCurrentWeather({ city:searchData.label , ...weatherResponse})
      setForecast({ city:searchData.label ,...forecastResponse})
    })
    .catch((err)=>{
      console.log(err)
    })
console.log('current weather on the city',currentWeather)
console.log('current forecast on the city',forecast)


  }
  return (
    <div className="container">
      <Search onSearchChange={handleOnchange} />
    {currentWeather && <CurrentWeather data={currentWeather} />}
    {forecast && <Forecast data={forecast}/>}
    </div>
  );
}

export default App;
