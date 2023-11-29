//Gets degrees from kelvin or farenheit to celsius
export function toCelsius(deg: number) {
    // console.log('DE FARENHEIT y KELVIN A CELSIUS');
    return deg > 200 ? Math.round(deg - 273.15) : Math.round((deg - 32) * 5/9);
}

//Gets degrees from kelvin or celsius to farenheit
export function toFarenheit(deg: number) {
    // console.log('DE CELSIUS A FARENHEIT');
    return deg > 200 ? Math.round((deg - 273.15) * 9/5 + 32) : Math.round((deg * 9/5) + 32);
}