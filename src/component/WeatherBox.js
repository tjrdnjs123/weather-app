import React from 'react'

const WeatherBox = ({Weather}) => {
  return (
    <div className='weather-box'>
      <div>{Weather?.name}</div>
      <h2>{Weather?.weather[0].description}</h2>
      <h3>{Weather?.main.temp}'C/{Weather?.main.temp*9/5+32}'F</h3>
    </div>
  )
}

export default WeatherBox
