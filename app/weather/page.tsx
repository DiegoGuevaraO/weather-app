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
                    {/* City Name */}
                    <Typography variant="h5" component="div" textAlign="center">
                    {city}
                    </Typography>
                    {/* Current degrees */}
                    <Typography sx={{padding: 2}} variant="h5" component="div" textAlign="center">
                        21°
                        <br />
                    </Typography>
                    {/* Feels like */}
                    <Typography sx={{ fontSize: 14, padding: 1}} color="text.secondary" textAlign="center">
                    Feels like: 19°
                    </Typography>
                    {/* Min Max */}
                    <Typography sx={{ mb: 1.5 }} color="text.secondary" textAlign="center">
                    Min: 9° Max: 21°
                    </Typography>
                    {/* Weather description */}
                    <Typography variant="body1" textAlign="center">
                    Cloudy
                    </Typography>
                </CardContent>
            </Card>
        </>
    );
}