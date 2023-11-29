"use client";

import { Typography, Card, CardContent, ButtonGroup, Button } from "@mui/material";
import { useSearchParams } from "next/navigation";
import type { Weather } from "../lib/types";
import React, { useState, useEffect } from "react";
import { toCelsius, toFarenheit } from "../lib/degrees";

export default function Page(){
    const searchParams = useSearchParams();
    const cityFetch = searchParams.get('city');
    const [isLoading, setIsLoading] = useState(true);
    const [system, setSystem] = useState('celsius');
    const [currentWeather, setCurrentWeather] = useState<Weather>({
        city: '',
        current: 0,
        feelsLike: 0,
        min: 0,
        max: 0,
        description: '',
    });

    useEffect(() => {
        fetch(`/current?city=${cityFetch}`, {
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
        if (system === 'celsius') {
            console.log('Cambio a celsius');
            setCurrentWeather((prev) => ({
                city: prev.city,
                current: toCelsius(prev.current),
                feelsLike: toCelsius(prev.feelsLike),
                min: toCelsius(prev.min),
                max: toCelsius(prev.max),
                description: prev.description,
            }))
        } else if (system === 'farenheit') {
            console.log('Cambio a farenheit');
            setCurrentWeather((prev) => ({
                city: prev.city,
                current: toFarenheit(prev.current),
                feelsLike: toFarenheit(prev.feelsLike),
                min: toFarenheit(prev.min),
                max: toFarenheit(prev.max),
                description: prev.description,
            }))
        }
    }

    function handleScaleChange(e: React.MouseEvent<HTMLButtonElement>) {
        let scale = e.currentTarget.value;
        setSystem(scale);
        
        if (scale !== system) {
            validateSystem();
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
                    <Typography sx={{ paddingBottom: 2}} variant="body1" textAlign="center">
                    {currentWeather.description}
                    </Typography>
                    <ButtonGroup
                        disableElevation
                        variant="outlined"
                        aria-label="Scale button"
                        fullWidth
                        color="info"
                        >
                        <Button value="celsius" onClick={(e) => handleScaleChange(e)}>°C</Button>
                        <Button value="farenheit" onClick={(e) => handleScaleChange(e)}>°F</Button>
                    </ButtonGroup>
                </CardContent>
            </Card>
        </>
    );
}