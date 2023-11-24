"use client";

import { Typography, Card, CardContent } from "@mui/material";
import { useSearchParams } from "next/navigation";
import type { Weather } from "../lib/types";
import { useState, useEffect } from "react";

export default function Page(){
    const searchParams = useSearchParams();
    const cityFetch = searchParams.get('city');
    const [isLoading, setIsLoading] = useState(true);
    const [system, setSystem] = useState('metric');
    const [currentWeather, setCurrentWeather] = useState<Weather>({
        city: '',
        current: 0,
        feelsLike: 0,
        min: 0,
        max: 0,
        description: '',
    });

    useEffect(() => {
        fetch(`http://localhost:3000/current?city=${cityFetch}`, {
            method: "GET"},)
            .then((response) => response.json())
            .then((current) => {
                setCurrentWeather({
                    city: current.city,
                    current: current.current,
                    feelsLike: current.feelsLike,
                    min: current.min,
                    max: current.max,
                    description: current.description,
                })
                validateSystem();
            });
    }, [])


    function validateSystem() {
        if (system === 'metric') {
            setCurrentWeather((prev) => ({
                city: prev.city,
                current: prev.current - 273.15,
                feelsLike: prev.feelsLike - 273.15,
                min: prev.min - 273.15,
                max: prev.max - 273.15,
                description: prev.description,
            }))
        }
    }
    
    return(
        <>
            <Card sx={{ minWidth: 275 }}>
                <CardContent>
                    {/* City Name */}
                    <Typography variant="h5" component="div" textAlign="center">
                    {currentWeather.city}
                    </Typography>
                    {/* Current degrees */}
                    <Typography sx={{padding: 2}} variant="h5" component="div" textAlign="center">
                        {currentWeather.current}°
                        <br />
                    </Typography>
                    {/* Feels like */}
                    <Typography sx={{ fontSize: 14, padding: 1}} color="text.secondary" textAlign="center">
                    Feels like: {currentWeather.feelsLike}°
                    </Typography>
                    {/* Min Max */}
                    <Typography sx={{ mb: 1.5 }} color="text.secondary" textAlign="center">
                    Min: {currentWeather.min}° Max: {currentWeather.max}°
                    </Typography>
                    {/* Weather description */}
                    <Typography variant="body1" textAlign="center">
                    {currentWeather.description}
                    </Typography>
                </CardContent>
            </Card>
        </>
    );
}