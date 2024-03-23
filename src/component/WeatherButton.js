import React from 'react'
import { Button } from 'react-bootstrap';



const WeatherButton = () => {
  return (
    <div>
      <Button variant="warning">Current Location</Button>
      <Button variant="warning">Seoul</Button>
      <Button variant="warning">Paris</Button>
    </div>
  )
}

export default WeatherButton
