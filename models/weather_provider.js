const { weatherKey } = require("../assets/keys");

const getWeather = async (lat,lon) =>{
    return fetch(`https://api.openweathermap.org/data/2.5/weather?lon=${lon}&lat=${lat}&APPID=${weatherKey}`)
    .then(response => response.json())
    .then(data =>{
        return {
            name:data.name,
            lat:data.coord.lat,
            lon:data.coord.lon,
            temperature:toCelsius(data.main.temp),
            min_temp:toCelsius(data.main.temp_min),
            max_temp:toCelsius(data.main.temp_max),
            clima: data.weather[0].main
        }
    })
    .catch(err => err)
}



const toCelsius = (kelvin) => {
    const celsius = Number(kelvin) - 273.15;
    return Math.round(celsius * 100)/100;
}

module.exports = {
    getWeather
}