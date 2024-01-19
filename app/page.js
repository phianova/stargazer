"use client"

import Image from 'next/image'
import Head from "next/head"
import {useState, useEffect} from "react"
import {BsSearch} from "react-icons/bs"
import Weather from '../components/Weather'
import Spinner from "../components/Spinner"
import { ApiClient } from '../utils/ApiClient';

export default function Home() {
  const apiClient = new ApiClient();
  const [city,setCity] = useState("")
  const [weather, setWeather] = useState({})
  const [loading, setLoading] = useState(false)

  const fetchWeather = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const weatherData = await apiClient.getWeather(city);
      setWeather(weatherData.data);

    } catch (error) {
      console.log("Error fetching weather:", error);
    }

    setCity('');
    setLoading(false);
  };

  if(loading) {
    return <Spinner></Spinner>
  } else {
    return (
      <div className="relative h-full w-full">
        <Head>
          <title>Weather App</title>
          <link rel="icon" href="/favicon.ico"/>
        </Head>
        <div className="absolute top-0 left-0 right-0 bottom-0 bg-black/50 z-[1]"/>
        <Image 
          src="https://images.ctfassets.net/hrltx12pl8hq/opwLDSZEpXJmgraogSUbz/4b6ef29df7ad8b9379b560e3c660a06b/shutterstock_731369419-min.jpg?fit=fill&w=1200&h=630" 
          layout="fill"          
          className="object-cover fixed"
          alt="/"
        />
        <main className="relative flex flex-col justify-between items-center max-w-screen w-full m-auto pt-4 text-white z-10">
          <form onSubmit={fetchWeather} className="flex justify-between items-center w-11/12 md:w-8/12 mx-auto p-3 bg-transparent border-2 rounded-xl border-white">
            <div>
              <input onChange={(e)=>setCity(e.target.value)} className="bg-transparent border-none text-white focus:outline-none text-xl lg:text-2xl placeholder:text-white" type="text" placeholder="Search location"></input>
            </div>
              <button onClick={fetchWeather}><BsSearch/></button>
          </form>
          {weather.main ? 
            <Weather data={weather}/> : 
            <div className="min-h-screen">
              <p className="text-4xl pt-20 w-10/12 mx-auto text-center">Enter your location above to find out the stargazing conditions according to today's forecast.</p>
              <p className="pt-10 w-10/12 mx-auto text-center text-lg">Weather data obtained from the <a className="hover:font-bold" href="https://openweathermap.org/" target="_blank">OpenWeather</a> API.
              <br/>For more information on how weather conditions affect astronomy, please see <a className="hover:font-bold" href="https://www.skyatnightmagazine.com/advice/skills/how-predict-weather-forecast-astronomy-stargazing" target="_blank">this piece by the BBC Sky at Night team</a>.</p>
            </div>}
        </main>
        </div>
      )
    }
}
