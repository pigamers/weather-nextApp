'use client';
import React, { useState } from 'react';

export default function Input() {
    const [city, setCity] = useState('Kolkata');
    const [data, setData] = useState(null);
    
    var lat,lon;

    const getData = async () => {
        const response = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city},India&appid=bdcda755124eb4d26338637452ab93f3`);
        const jsonData = await response.json();
        console.log(jsonData);
        setData(jsonData);
        lat = jsonData[0].lat;
        lon = jsonData[0].lon;
        console.log(lat);
        console.log(lon);
    };

    // https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}

    return (
        <div>
            <div className="flex max-w-5xl m-auto justify-center items-center gap-5 p-10 my-5">
                <input
                    className="flex h-10 w-full rounded-md border border-black px-3 py-2 text-lg placeholder:text-gray-600 disabled:cursor-not-allowed disabled:opacity-50"
                    type="text"
                    placeholder="Enter City Name"
                    onChange={(e) => setCity(e.target.value)}
                />
                <button
                    type="button"
                    className="rounded-md w-1/5 bg-black px-3 py-2 text-lg font-semibold text-white shadow-sm hover:bg-black/80"
                    onClick={getData}
                >
                    Get Data
                </button>
            </div>
            {data && <div>{JSON.stringify(data)}</div>}
        </div>
    );
}
