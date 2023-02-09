import React from "react";
import { Card } from 'semantic-ui-react'

const WeatherCard = ({ weatherData }) => (
    <Card header={weatherData.name} />
)

export default WeatherCard;