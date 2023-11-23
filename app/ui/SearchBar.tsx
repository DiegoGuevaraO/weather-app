"use client";

import { TextField, IconButton, InputAdornment } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function SearchBar(){
  const [city, setCity] = useState('');
  const router = useRouter();

  const handleChange = (city: string) => {
    setCity(city);
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter') {
        router.push(`/weather?city=${city}`);
    }
  }

  return(
      <div style={{
          display: "flex",
          alignSelf:"center",
          justifyContent:"center"
      }}>
          <TextField
              label='City'
              margin="normal"
              variant="outlined"
              size="small"
              InputProps={{
                  endAdornment: (
                    <Link href={{pathname: '/weather', query: {city: city}}}>
                      <InputAdornment position="end">
                        <IconButton sx={{borderRadius: 0}} edge="end">
                          <SearchIcon />
                        </IconButton>
                      </InputAdornment>
                    </Link>
                  )
              }}
              onChange={(e) => {
                handleChange(e.target.value);
              }}
              onKeyDown={(e) => {
                handleKeyDown(e);
              }}
          />
      </div>
  );
}