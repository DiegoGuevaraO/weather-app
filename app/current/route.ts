import axios from "axios";
import { NextResponse } from "next/server";
import type { Weather } from "../lib/types";


export async function GET(req: Request, res: NextResponse<{current: Weather}>){
    console.log('FETCHING...');
    const { searchParams } = new URL(req.url);
    const city = searchParams.get('city');

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.CURRENT_KEY}`;
    
    const { data } = await axios.get(url);

    const current = {
        city: data.name,
        current: data.main.temp,
        feelsLike: data.main.feels_like,
        min: data.main.temp_min,
        max: data.main.temp_max,
        description: data.weather[0].main,
    };

    return NextResponse.json(current);
}