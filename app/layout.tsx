import type { Metadata } from 'next';
import { Typography, Grid } from '@mui/material';
import { Inter } from 'next/font/google';
import './globals.css';
import SearchBar from './ui/SearchBar';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Weather App',
  description: 'Simple weather app using Open Weather API.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <Grid container spacing={0} direction="column" alignItems="center" justifyContent="center" sx={{minHeight: '100vh'}}>
          <Grid item sx={{bgcolor: 'white', borderRadius: '15px', padding: 5}}>
            <Typography
                variant="h2"
                align="center"
            >
              Weather App
            </Typography>

            <SearchBar />
            
            {children}
          </Grid>
        </Grid>
        </body>
    </html>
  )
}
