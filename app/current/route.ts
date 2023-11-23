import axios from "axios";


export async function GET(req: Request) {
    // return NextResponse.json({message: 'Prueba de API'}, {status: 200});
    const { searchParams } = new URL(req.url);
    const city = searchParams.get('city');

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.CURRENT_KEY}`;
    
    const { data } = await axios.get(url);

    return Response.json(data);
}