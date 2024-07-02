'use client';
import React, { useState } from 'react';

interface Values {
    lat: number,
    lon: number,
}

interface WeatherData {
    coord: {
        lon: number;
        lat: number;
    };
    main: {
        description: string;
    };
    weather: [];
}

export default function Input() {
    const [city, setCity] = useState('');
    const [weatherData, setWeatherData] = useState<WeatherData | null>(null);

    const getLatAndLong = async (e: any) => {
        e.preventDefault();
        const geoResponse = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city},India&appid=bdcda755124eb4d26338637452ab93f3`);
        const [geoData] = await geoResponse.json();
        const { lat, lon }: Values = geoData;

        const weatherResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=bdcda755124eb4d26338637452ab93f3`);
        const weatherData: WeatherData = await weatherResponse.json();
        setWeatherData(weatherData);
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

            {weatherData && (
                <div>
                    <h1>{weatherData.coord.lon}</h1>
                    <h1>{weatherData.coord.lat}</h1>
                    {/* <h3>{weatherData.weather.main}</h3> */}
                </div>
            )}
        </div>
    );
}
