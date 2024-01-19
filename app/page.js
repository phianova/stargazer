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
            <div className="h-full lg:w-11/12">
              <p className="text-4xl pt-10 lg:pt-20 w-10/12 mx-auto text-center">Enter your location above to find out the stargazing conditions according to today's forecast.</p>
              <p className="pt-10 w-10/12 mx-auto text-center text-lg">Weather data obtained from the <a className="font-bold hover:text-violet-200" href="https://openweathermap.org/" target="_blank">OpenWeather</a> API.
              <br/>For more information on how weather conditions affect astronomy, please see <a className="font-bold hover:text-violet-200" href="https://www.skyatnightmagazine.com/advice/skills/how-predict-weather-forecast-astronomy-stargazing" target="_blank">this piece by the BBC Sky at Night team</a>.</p>
            </div>}
        </main>
        <footer className="w-full mt-10 bg-violet-600/45 text-white z-20 relative bottom-0 flex flex-col items-center">
            <div className="px-10 pt-10 flex flex-row justify-center content-center items-center">
            <a href="https://www.linkedin.com/in/sophia-warren-48207913b/" target="_blank">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 hover:text-violet-200" fill="currentColor"viewBox="0 0 24 24">
                    <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" />
                </svg>
            </a>
            <span className="px-3"></span>
            <a href="https://github.com/phianova" target="_blank">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 hover:text-violet-200" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
            </a>
            <button id="navlink6" className="pl-6 rounded-full hover:font-bold hover:text-violet-200" href="https://phianova.github.io/portfolio/" target="_blank">Portfolio</button>    
        </div>
        <p className="py-5 mb-10">© Sophia Warren 2023</p>
        </footer>
        </div>
      )
    }
}
