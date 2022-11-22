import "./App.css";
import { useEffect, useState } from "react";
import { Dimmer, Loader } from "semantic-ui-react";
import Weather from "./components/weather";
import { LineChart } from "./components/showchart";
import moment from "moment";

import { weather } from "./data/weather";
import { forecast as forecastData } from "./data/forceast";
export default function App() {
  const [lat, setLat] = useState([]);
  const [long, setLong] = useState([]);
  const [weatherData, setWeatherData] = useState([]);
  const [forecast, setForecast] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (position) {
      setLat(position.coords.latitude);
      setLong(position.coords.longitude);
    });

    const data = getWeather(lat, long);
    // .then((weather) => {
    setWeatherData(weather);
    //   setError(null);
    // })
    // .catch((err) => {
    //   setError(err.message);
    // });

    const data1 = getForecast(lat, long);

    console.log("data1", data1);
    // .then((data) => {
    setForecast(data1);
    // setError(null);
    // })
    // .catch((err) => {
    //   setError(err.message);
    // });
  }, [lat, long, error]);

  // function handleResponse(response) {
  //   if (response.ok) {
  //     return response.json();
  //   } else {
  //     throw new Error("Please Enable your Location in your browser!");
  //   }
  // }

  function getWeather(lat, long) {
    if (Object.entries(weather).length) {
      const mappedData = weather;
      return mappedData;
    }

    // return fetch(
    //   `${process.env.REACT_APP_API_URL}/weather/?lat=${lat}&lon=${long}&units=metric&APPID=${process.env.REACT_APP_API_KEY}`
    // )
    //   .then((res) => handleResponse(res))
    //   .then((weather) => {
    //     if (Object.entries(weather).length) {
    //       // const mappedData = mapDataToWeatherInterface(weather);

    //       const mappedData = weather;
    //       return mappedData;
    //     }
    //   });
  }

  function getForecast(lat, long) {
    if (Object.entries(forecastData).length) {
      return forecastData.list
        .filter((forecast) => forecast.dt_txt.match(/09:00:00/))
        .map(mapDataToWeatherInterface);
    }
    // return fetch(
    //   `${process.env.REACT_APP_API_URL}/forecast/?lat=${lat}&lon=${long}&units=metric&APPID=${process.env.REACT_APP_API_KEY}`
    // )
    //   .then((res) => handleResponse(res))
    //   .then((forecastData) => {
    //     if (Object.entries(forecastData).length) {
    //       return forecastData.list
    //         .filter((forecast) => forecast.dt_txt.match(/09:00:00/))
    //         .map(mapDataToWeatherInterface);
    //     }
    //   });
  }

  function mapDataToWeatherInterface(data) {
    const mapped = {
      day: moment(data.dt_txt).day(), // convert from seconds to milliseconds
      description: data.weather[0].main,
      temperature: Math.round(data.main.temp),
      temp_max: data.main.temp_max,
      temp_min: data.main.temp_min,
    };

    // Add extra properties for the five day forecast: dt_txt, icon, min, max
    if (data.dt_txt) {
      mapped.dt_txt = data.dt_txt;
    }
    console.log("mapped", mapped);

    return mapped;
  }

  return (
    <div className="App">
      {typeof weatherData.main != "undefined" ? (
        <div>
          <Weather weatherData={weatherData} />
          <LineChart chartData={forecast} />
        </div>
      ) : (
        <div>
          <Dimmer active>
            <Loader>Loading..</Loader>
          </Dimmer>
        </div>
      )}
    </div>
  );
}
