import React from 'react'
import { Button } from 'react-bootstrap';



const WeatherButton = ({cities , setCity ,getCurrentLocation ,city}) => {
  console.log('cities = ' ,cities)
  return (
    <div>
      <Button variant={city === null ? "warning" : "outline-warning"} onClick={getCurrentLocation}>Current Location</Button>
      {cities.map((item , index)=>(
        <Button variant={city === item ? "warning" : "outline-warning"} key={index} onClick={()=>{
          setCity(item)
        }}>{item}</Button>
      ))}
    </div>
  )
}

export default WeatherButton
