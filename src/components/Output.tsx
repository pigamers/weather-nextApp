import React from 'react'

export default function Output(weatherData: any) {    
    return (
        <div>
            <h1>{weatherData.coord.lon}</h1>
            <h1>{weatherData.coord.lat}</h1>
            <h3>{weatherData.weather.main}</h3>
        </div>
    )
}
