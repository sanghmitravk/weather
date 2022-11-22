import moment from "moment";
import { Button } from "semantic-ui-react";
import {
  faCloud,
  faBolt,
  faCloudRain,
  faCloudShowersHeavy,
  faSnowflake,
  faSun,
  faSmog,
} from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function weather({ weatherData }: any) {
  const WeatherIcon = styled.div`
    color: whitesmoke;
  `;

  const refresh = () => {
    window.location.reload();
  };

  let weatherIcon = null;

  if (weatherData.weather[0].main === "Thunderstorm") {
    weatherIcon = <FontAwesomeIcon icon={faBolt} />;
  } else if (weatherData.weather[0].main === "Drizzle") {
    weatherIcon = <FontAwesomeIcon icon={faCloudRain} />;
  } else if (weatherData.weather[0].main === "Rain") {
    weatherIcon = <FontAwesomeIcon icon={faCloudShowersHeavy} />;
  } else if (weatherData.weather[0].main === "Snow") {
    weatherIcon = <FontAwesomeIcon icon={faSnowflake} />;
  } else if (weatherData.weather[0].main === "Clear") {
    weatherIcon = <FontAwesomeIcon icon={faSun} />;
  } else if (weatherData.weather[0].main === "Clouds") {
    weatherIcon = <FontAwesomeIcon icon={faCloud} />;
  } else {
    weatherIcon = <FontAwesomeIcon icon={faSmog} />;
  }

  return (
    <div className="main">
      <div className="top">
        <p className="day">
          {moment().format("ddd")}, <span>{moment().format("LL")}</span>
        </p>
        <Button
          className="button"
          inverted
          color="blue"
          circular
          icon="refresh"
          onClick={refresh}
        />
      </div>
      <div className="flex justify-content-center is-flex-direction-column is-align-items-center">
        <WeatherIcon style={{ fontSize: 30, marginTop: 15 }}>
          {weatherIcon}
        </WeatherIcon>
        <p className="description">{weatherData.weather[0].main}</p>
        <p >{weatherData.name}</p>
        <p className="temp" >{weatherData.main.temp}&deg;</p>
      </div>

      <div className="flex flex-wrap justify-content-center">
        <p>Humidity<br />{weatherData.main.humidity} %</p>
        <p>High Temp<br />{weatherData.main.temp_max} &deg;C</p>
        <p>Low Temp<br />{weatherData.main.temp_min} &deg;C</p>
        <p>Wind speed<br />{weatherData.wind.speed}km/h</p>
        <p>Pressure<br />{weatherData.main.pressure}mbar</p>
        <p className="sunrise-sunset">Sunrise:{" "}<br />{new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString("en-IN")}</p>
        <p className="sunrise-sunset">Sunset:{" "}<br />{new Date(weatherData.sys.sunset * 1000).toLocaleTimeString("en-IN")}</p>
      </div>
    </div>
  );
}
