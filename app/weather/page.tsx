"use client";

import { Typography, Card, CardContent, ToggleButtonGroup, ToggleButton } from "@mui/material";
import { useSearchParams } from "next/navigation";
import type { Weather } from "../lib/types";
import React, { useState, useEffect } from "react";

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
            setCurrentWeather((prev) => ({
                city: prev.city,
                current: Math.round(prev.current - 273.15),
                feelsLike: Math.round(prev.feelsLike - 273.15),
                min: Math.round(prev.min - 273.15),
                max: Math.round(prev.max - 273.15),
                description: prev.description,
            }))
        } else if (system === 'farenheit') {
            setCurrentWeather((prev) => ({
                city: prev.city,
                current: Math.round(((prev.current) * 1.8) + 32),
                feelsLike: Math.round(((prev.feelsLike) * 1.8) + 32),
                min: Math.round(((prev.min) * 1.8) + 32),
                max: Math.round(((prev.max) * 1.8) + 32),
                description: prev.description,
            }))
        }
    }

    function handleScaleChange(e: React.MouseEvent<HTMLElement>, scale: string) {
        setSystem(scale);
        validateSystem();
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
                    <ToggleButtonGroup
                        color="primary"
                        exclusive
                        aria-label="Scale"
                        fullWidth
                        value={system}
                        onChange={handleScaleChange}
                        >
                        <ToggleButton value="celsius">°C</ToggleButton>
                        <ToggleButton value="farenheit">°F</ToggleButton>
                    </ToggleButtonGroup>
                </CardContent>
            </Card>
        </>
    );
}