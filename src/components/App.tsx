import { useEffect, useState } from "react";
import { Dimmer, Loader } from "semantic-ui-react";
import Weather from "./Weather";
import { LineChart } from "./ShowChart";
import moment from "moment";
export const App = () => {
  const [weatherData, setWeatherData] = useState<any>([]);
  const [forecast, setForecast] = useState<any>([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    getWeather()
      .then((weather) => {
        setWeatherData(weather);
        setError(null);
      })
      .catch((err: any) => {
        setError(err.message);
      });

    getForecast()
      .then((data) => {
        setForecast(data);
        setError(null);
      })
      .catch((err) => {
        setError(err.message);
      });
  }, [error]);


  const handleResponse = (response: any) => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error("Please Enable your Location in your browser!");
    }
  }


  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getWeather = () => {
    return fetch(`${process.env.REACT_APP_API_URL}/weather/?lat=12.9716&lon=77.5946&units=metric&APPID=${process.env.REACT_APP_API_KEY}`)
      .then((res) => handleResponse(res))
      .then((weather) => {
        if (Object.entries(weather).length) {
          const mappedData = weather;
          return mappedData;
        }
      });
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getForecast = () => {
    return fetch(
      `${process.env.REACT_APP_API_URL}/forecast/?lat=12.9716&lon=77.5946&units=metric&APPID=${process.env.REACT_APP_API_KEY}`
    )
      .then((res) => handleResponse(res))
      .then((forecastData) => {
        if (Object.entries(forecastData).length) {
          return forecastData.list
            .filter((forecast: any) => forecast.dt_txt.match(/09:00:00/))
            .map(mapDataToWeatherInterface);
        }
      });
  }

  function mapDataToWeatherInterface(data: any) {
    const mapped = {
      day: moment(data.dt_txt).day(), // convert from seconds to milliseconds
      description: data.weather[0].main,
      temperature: Math.round(data.main.temp),
      temp_max: data.main.temp_max,
      temp_min: data.main.temp_min,
    };
    return mapped;
  }

  return (
    <div className="App">
      {weatherData && typeof weatherData.main != "undefined" ? (
        <>
          <Weather weatherData={weatherData} />
          <LineChart chartData={forecast} />
        </>
      ) : (
        <>
          <Dimmer active>
            <Loader>Loading..</Loader>
          </Dimmer>
        </>
      )}
    </div>
  );
}
