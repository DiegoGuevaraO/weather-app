"use client";

import { Typography } from "@mui/material";

export default function Home() {
  return (
         <Typography
          variant="body1"
          sx={{
            margin: 'auto',
            maxWidth: '70%'
          }}
         >
          Welcome! You can search the current weather of any city in the world! Just write the name of the city in the search bar.
         </Typography>
  )
}