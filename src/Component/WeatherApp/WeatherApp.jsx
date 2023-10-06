import React, { useState } from 'react';
import  "./WeatherApp.css"
import axios from 'axios';
import search_icon from "../Assets/search.png" 
import clear_icon from "../Assets/clear.png" 
import cloud_icon from "../Assets/cloud.png" 
import drizzle_icon from "../Assets/drizzle.png"  
import rain_icon from "../Assets/rain.png" 
import snow_icon from "../Assets/snow.png" 
import wind_icon from "../Assets/wind.png" 
import humidity_icon from "../Assets/humidity.png"
const WeatherApp = () => {  
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const API_KEY='acaffeaecaf82092a7539c1f3f171391'; 
  const fetchWeatherData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      // const data = await response.json(); 
      setWeatherData(response.data);
      console.log(weatherData);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching weather data:', error);
      setLoading(false);
    }
  };
  return (
    <div className='container'> 
    <div className='top-bar'>  
    <input type='text' value={city}   onChange={(e) => setCity(e.target.value)} classname="cityInput" placeholder='Enter City' /> 
     <div className='search-icon' onClick={fetchWeatherData}>  
       <img src={search_icon} alt="" classname="icon"/>
     </div>   
    </div>  
    {/* {loading && <p>Loading...</p>}  */}
    {weatherData  && weatherData.main ? ( 
      <div>
    <div className='weather-image'>  
    <img src={cloud_icon} alt="" classname="icon"/>
    </div> 
    <div className='weather-temp'>{weatherData?.main?.temp}°c</div> 
    <div className='weather-location'>{weatherData?.name},{weatherData?.sys?.country}</div> 
    <div className='data-container'>  
    <div className='element'>  
    <img src={humidity_icon} alt="" classname="icon"/>  
    <div className='data'>
    <div className="humidity-percent">{weatherData?.main?.humidity}%</div> 
    <div className="text">Humidity</div> 
    </div>
    </div> 
    <div className='element'>  
    <img src={wind_icon} alt="" classname="icon"/>  
    <div className='data'>
    <div className="wind-percent">{weatherData?.wind?.speed}m/s</div> 
    <div className="text">Wind</div> 
    </div>
    </div>
    </div>
    </div>  
     ): null}
    </div> 
   
  );
}

export default WeatherApp

