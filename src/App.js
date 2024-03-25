import logo from "./logo.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState, CSSProperties } from "react";
import WeatherBox from "./component/WeatherBox";
import WeatherButton from "./component/WeatherButton";
import ClipLoader from "react-spinners/ClipLoader";

//1 앱이 실행되자마자 현재 위치기반의 날씨가 보인다
//useEffect
//2 날씨정보에는 도시,섭씨,화씨 날씨상태
//3 5개의 버튼이있다 현재위치 한개 중요도시 4개
//4 도시버튼을 누르면 도시별 날씨가 보인다
//5 현재위치 버튼을 누르면 다시 현재위치 기반의 날씨가 보인다
//6 데이터를 들고오는 동안 로딩 스피너가 돈다
function App() {
  const [Weather, SetWeather] = useState(null);
  const cities = ["Paris", "New York", "Tokyo", "Seoul"];
  const [city, setCity] = useState(null);
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState(null);
  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      let lat = position.coords.latitude;
      let lon = position.coords.longitude;
      setCity(null);
      getWeatherByCurrentLocation(lat, lon);
    });
  };
  const getWeatherByCurrentLocation = async (lat, lon) => {
    try {
      let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=df50cd88ef4308b7bdd39902f2157840&units=metric`;
      setLoading(true);
      let response = await fetch(url);
      let data = await response.json();
      console.log("Data", data);
      console.log("city", city);
      if (data.cod === 200) {
        SetWeather(data);
        setLoading(false);
      } else {
        setLoading(false);
        throw new Error(data.message);
      }
    } catch (error) {
      setApiError(error.message);
      setLoading(false);
      console.log("apiError", apiError);
    }
  };
  const getWeatherByCity = async (city) => {
    if (!city) return;
    try {
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=df50cd88ef4308b7bdd39902f2157840&units=metric`;
      setLoading(true);
      let response = await fetch(url);
      let data = await response.json();
      console.log("data", data);
      if (data.cod === 200) {
        SetWeather(data);
        setLoading(false);
      } else {
        setLoading(false);
        throw new Error(data.message);
      }
    } catch (error) {
      setApiError(error.message);
      setLoading(false);
      console.log("apiError", apiError);
    }
  };

  useEffect(() => {
    getCurrentLocation();
  }, []);
  useEffect(() => {
    getWeatherByCity(city);
    console.log(city);
  }, [city]);
  return (
    <div>
      {loading ? (
        <div className="container">
          <ClipLoader color="#f88c6b" loading={loading} size={150} />
        </div>
      ) : !apiError ? (
        <div className="container">
          <WeatherBox Weather={Weather} />
          <WeatherButton
            cities={cities}
            setCity={setCity}
            city={city}
            getCurrentLocation={getCurrentLocation}
          />
        </div>
      ) : (
        apiError
      )}
    </div>
  );
}

export default App;
