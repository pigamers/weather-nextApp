'use client';
import React, { useState } from 'react';
import Output from './Output';

interface Values {
    lat: number,
    lon: number,
}

interface WeatherData {
    /*
    name: string
    coord: {
        lon: number,
        lat: number
    },
    weather: [
        {
            description: string
        }
    ],
    main: {
        temp: number,
        feels_like: number,
        temp_min: number,
        temp_max: number,
        pressure: number,
        humidity: number,
        sea_level: number,
        grnd_level: number,
    },
    visibility: number,
    wind: {
        speed: number,
        deg: number
    },
    sys: {
        country: string,
        sunrise: number,
        sunset: number,
    },
    timezone: number,
    cod: number
    */
}

export default function Input() {
    const [city, setCity] = useState('');
    const [weatherData, setWeatherData] = useState<WeatherData | null>(null);

    const getLatAndLong = async () => {
        const geoResponse = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city},India&appid=bdcda755124eb4d26338637452ab93f3`);
        const [geoData] = await geoResponse.json();
        const { lat, lon }: Values = geoData;

        const weatherResponse = await fetch(`http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=bdcda755124eb4d26338637452ab93f3&units=metric`);
        const weatherData: WeatherData = await weatherResponse.json();
        setWeatherData(weatherData);

        // console.log(weatherData.weather.description);

        // https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=bdcda755124eb4d26338637452ab93f3&units=metric - current weather

        // http://api.openweathermap.org/data/2.5/forecast?lat=22.5744&lon=88.3629&appid=bdcda755124eb4d26338637452ab93f3 - 5 day forecast
    };

    const formatTime = (timestamp: number) => {
        const date = new Date(timestamp * 1000);
        return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true });
    };


    return (
        <div className="flex flex-col max-w-5xl m-auto justify-center items-center gap-5 p-10 my-5">
            <input
                className="flex h-10 w-full rounded-md border border-black px-3 py-2 text-lg placeholder:text-gray-600 disabled:cursor-not-allowed disabled:opacity-50"
                type="text"
                placeholder="Enter City Name"
                onChange={(e) => setCity(e.target.value)}
            />
            <button
                type="button"
                className="rounded-md w-1/5 bg-black px-3 py-2 text-lg font-semibold text-white shadow-sm hover:bg-black/80"
                onClick={getLatAndLong}
            >
                Get Data
            </button>

            {/* {weatherData && (
                <Output {...weatherData} />
            )} */}

            {
                weatherData && (
                    <div>
                        {JSON.stringify(weatherData)}
                    </div>
                )
            }
        </div>
    );
}
