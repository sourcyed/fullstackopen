import { useState, useEffect } from 'react'
import axios from 'axios'
import { fetchWeatherApi } from 'openmeteo'

function Weather({country}) {
    const [weatherDataResponse, setWeatherDataResponse] = useState(null)

    useEffect(() => {
            const params = {
                "latitude": country.capitalInfo.latlng[0],
                "longitude": country.capitalInfo.latlng[1],
                "current": ["temperature_2m", "is_day", "wind_speed_10m"],
                "forecast_days": 1
            };
            const url = "https://api.open-meteo.com/v1/forecast"
            fetchWeatherApi(url, params).then(r => setWeatherDataResponse(r[0]))
    }, [])
    
    if (!weatherDataResponse) return


    // Helper function to form time ranges
    const range = (start, stop, step) =>
        Array.from({ length: (stop - start) / step }, (_, i) => start + i * step);

    // Process first location. Add a for-loop for multiple locations or weather models
    const response = weatherDataResponse;

    // Attributes for timezone and location
    const utcOffsetSeconds = response.utcOffsetSeconds();

    const current = response.current();

    // Note: The order of weather variables in the URL query and the indices below need to match!
    const weatherData = {
        time: new Date((Number(current.time()) + utcOffsetSeconds) * 1000),
        temperature: current.variables(0).value(),
        isDay: current.variables(1).value(),
        windSpeed: current.variables(2).value(),
    };

    // `weatherData` now contains a simple structure with arrays for datetime and weather data

    return (
        <div style={{color: 'white', width: 300, padding: 10, backgroundColor: weatherData.isDay ? '#FFDEAD' :  '#2e4482'}}>
            <h3>Weather in {country.capital[0]}</h3>
            <p>temperature {weatherData.temperature.toFixed(2)} Celcius</p>
            <p>wind {weatherData.windSpeed.toFixed(2)} m/s</p>
        </div>
    )

}

function Country({country}) {
    if (country === null) return

    
    return (
        <div>
            <h1>{country.name.common}</h1>
            <p>capital {country.capital[0]}</p>
            <p>area {country.area}</p>

            <br />

            languages:
            <ul>
                {Object.values(country.languages).map(l => <li key={l}>{l}</li>)}
            </ul>

            <img style={{border: 'solid black 2px'}} src={country.flags.png} alt={country.flags.alt} />

            <Weather country={country} />
        </div>
    )
}

function CountryList( {countries, showCountry  }) {
    if (countries.length > 10) {
        return (
            <div>
                Too many matches, specify another filter
            </div>
        )
    }

    if (countries.length === 1) {
        return <Country country={countries[0]} />
    }

    return (
        <ul>
            {countries.map(c => 
                <li key={c.name.common}>{c.name.common}
                    <button onClick={() => showCountry(c.name.common)}>show</button>
                </li>
            )}
        </ul>
    )
}

function App() {
    const [countries, updateCountries] = useState([])
    const [searchQuery, updateSearchQuery] = useState('')

    useEffect(() => {
        axios.get('https://studies.cs.helsinki.fi/restcountries/api/all').then(r => {
            updateCountries(r.data) 
        })
    }, [])

    const handleSearch = e => {
        updateSearchQuery(e.target.value)
    }

    console.log(searchQuery);
    
    const filteredCountries =  countries.filter(c => c.name.common.toLowerCase().includes(searchQuery.toLowerCase()))
    console.log(filteredCountries);
    

    return (
        <div>
            find countries: <input type="text" value={searchQuery} onChange={handleSearch} />
            <CountryList countries={filteredCountries} showCountry={updateSearchQuery} />
        </div>
    )
}

export default App