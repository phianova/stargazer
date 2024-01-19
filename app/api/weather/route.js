import { NextResponse } from "next/server";
import axios from "axios";

export async function GET(request) {
    const url = new URL(request.url);
    const city = url.searchParams.get('city');
  
    try {
        console.log("city at route/try:",city)
        const weather = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${process.env.WEATHER_KEY}`)
        console.log( NextResponse.json({status:200, data: weather.data}))
        return NextResponse.json({status:200, data: weather.data})
    } catch (error) {
        console.error(error)
        return NextResponse.error()
    }
}
