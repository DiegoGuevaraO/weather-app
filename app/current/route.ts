import axios from "axios";
import { NextResponse } from "next/server";


export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const city = searchParams.get('city');

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.CURRENT_KEY}`;
    
    const { data } = await axios.get(url);

    return NextResponse.json(data);
}