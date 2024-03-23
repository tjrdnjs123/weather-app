import logo from "./logo.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import WeatherBox from "./component/WeatherBox";
import WeatherButton from "./component/WeatherButton";

//1 앱이 실행되자마자 현재 위치기반의 날씨가 보인다
//useEffect
//2 날씨정보에는 도시,섭씨,화씨 날씨상태
//3 5개의 버튼이있다 현재위치 한개 중요도시 4개
//4 도시버튼을 누르면 도시별 날씨가 보인다
//5 현재위치 버튼을 누르면 다시 현재위치 기반의 날씨가 보인다
//6 데이터를 들고오는 동안 로딩 스피너가 돈다
function App() {
  const [Weather, SetWeather] = useState(null);
  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      let lat = position.coords.latitude;
      let lon = position.coords.longitude;
      getWeatherByCurrentLocation(lat, lon);
    });
  };
  const getWeatherByCurrentLocation = async (lat, lon) => {
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=df50cd88ef4308b7bdd39902f2157840&units=metric`;
    let response = await fetch(url);
    let data = await response.json();
    console.log("Data", data);
    SetWeather(data)
  };
  useEffect(() => {
    getCurrentLocation();
  }, []);
  return (
    <div>
      <div className="container">
        <WeatherBox Weather={Weather}/>
        <WeatherButton />
      </div>
    </div>
  );
}

export default App;

