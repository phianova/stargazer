import React from 'react'
import Image from "next/image"

const Weather = ({data}) => {
    const cloudColour = data.clouds.all < 20 ? "text-green-300" : "text-orange-300"
    const visColour = data.visibility > 6000 ? "text-green-300" : "text-orange-300"
    const humidityColour = data.main.humidity < 50 ? "text-green-300" : "text-orange-300"
    const pressureColour = data.main.pressure > 1013 ? "text-green-300" : "text-orange-300"
    const windColour = data.wind.speed < 12 ? "text-green-300" : "text-orange-300"
    const sunUp = (data.dt > data.sys.sunrise && data.dt < data.sys.sunset) ? true : false;
    const sunsetDate = new Date((data.sys.sunset + data.timezone) * 1000);
    const sunsetTime = sunsetDate.toLocaleTimeString('en-GB', {hour: '2-digit', minute: '2-digit'});
    const sunriseDate = new Date((data.sys.sunrise + data.timezone) * 1000);
    const sunriseTime = sunriseDate.toLocaleTimeString('en-GB', {hour: '2-digit', minute: '2-digit'});

    return (
    <div className="relative flex flex-col justify-between max-w-screen w-full m-auto px-4 text-gray-300 z-10">
        <p className="text-2xl text-center pt-8 pb-2">Stargazing in</p>
        <h1 className="text-6xl text-center">{data.name}</h1>
        <div className="flex items-center justify-center mt-0">
            <div className="flex flex-col items-center justify-around pb-6 w-6/12 lg:w-4/12">
                <Image src={`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`} alt="weather description"
                width="100" height="100"/>
                <p className="text-5xl px-4">{data.weather[0].main}</p>
            </div>
            <div className="flex flex-col items-center justify-center pb-6 w-6/12 lg:w-4/12">
                <p className={`text-6xl px-8 pt-8 ${cloudColour}`}>{data.clouds.all.toFixed(0)}%</p>
                <p className="text-2xl italic text-center">cloud cover</p>
            </div>
        </div>
        {sunUp && <p className="text-xl text-center pb-6 text-blue-100">The sun will set at {sunsetTime} PM. Skies are darkest between midnight and {sunriseTime} AM. Check back after sunset for up-to-date weather conditions.</p>}
        {!sunUp &&
            <p className="text-xl text-center pb-6 text-red-100">The sun set at {sunsetTime} PM today. Skies are darkest between midnight and {sunriseTime} AM.</p>
        }
    <div className="bg-black/60 relative p-8 rounded-lg mb-10">
        <p className="text-2xl text-center pb-2">{data.name} currently has <span className="text-3xl">{data.weather[0].description}</span></p>
        <div className="border-t-2 border-white w-full mt-1"></div>
        <div className="flex flex-col justify-between text-center">
            <div className="py-4">
                <div className="flex flex-row justify-evenly text-center text-xl pb-2 font-bold">
                    <p className={`text-center ${visColour}`}>{data.visibility.toFixed(0)} metres</p>
                    <p>Visibility</p>
                </div>
                <p className="text-center text-md italic">High visibility means less fog at ground level. 10000 metres is the maximum visibility rating.</p>
            </div>
            <div className="border-t border-gray-100 w-full mt-1"></div>
            <div className="py-4">
                <div className="flex flex-row justify-evenly text-center text-xl pb-2 font-bold">
                    <p className={`text-center ${humidityColour}`}>{data.main.humidity}%</p>
                    <p>Humidity</p>
                </div>
                <p className="text-center text-md italic">Lower humidity means a higher likelihood of high "transparency" in the sky.</p>
            </div>
            <div className="border-t border-gray-100 w-full mt-1"></div>
            <div className="py-4">
                <div className="flex flex-row justify-evenly text-center text-xl pb-2 font-bold">
                    <p className={`text-center ${pressureColour}`}>{data.main.pressure} hPa</p>
                    <p>Pressure</p>
                </div>
                <p className="text-center text-md italic">Higher pressure (over 1013 hPa) signifies clearer conditions for stargazing.</p>
            </div>
            <div className="border-t border-gray-100 w-full mt-1"></div>
            <div className="py-4">
                <div className="flex flex-row justify-evenly text-center text-xl pb-2 font-bold">
                <p className={`text-center ${windColour}`}>{data.wind.speed.toFixed(0)} m/s</p>
                <p>Wind</p>
                </div>
                <p className="text-center text-md italic">Lower wind speeds are associated with clearer conditions. A strong breeze is about 12 m/s.</p>
            </div>
        </div>
    </div>
    </div>
  )
}

export default Weather