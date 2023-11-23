"use client";

import { Typography, Card, CardContent, CardActions, Button } from "@mui/material";
import { useSearchParams } from "next/navigation";

export default function Page(){
    const searchParams = useSearchParams();
    const city = searchParams.get('city');
    
    return(
        <>
            <Card sx={{ minWidth: 275 }}>
                <CardContent>
                    <Typography variant="h5" component="div" textAlign="center">
                    {city}
                    </Typography>
                    <Typography variant="h5" component="div" textAlign="center">
                        21
                        <br />
                        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        Feels like: 19
                        </Typography>

                    </Typography>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary" textAlign="center">
                    Min: 9 Max: 21
                    </Typography>
                    <Typography variant="body1" textAlign="center">
                    {/* {data.main.temp_min - 273.15} */}
                    <br />
                    30
                    </Typography>
                </CardContent>
            </Card>
        </>
    );
}