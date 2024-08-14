import { useState, useEffect } from 'react'
import axios from 'axios'

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

            <img src={country.flags.png} alt={country.flags.alt} />
        </div>
    )
}

function App() {
    const [countries, updateCountries] = useState([])
    const [searchQuery, updateSearchQuery] = useState('')
    const [selectedCountry, selectCountry] = useState(null)

    useEffect(() => {
        axios.get('https://studies.cs.helsinki.fi/restcountries/api/all').then(r => {
            updateCountries(r.data) 
        })
    }, [])

    const handleSearch = e => {
        selectCountry(null)
        updateSearchQuery(e.target.value)
    }

    const filteredCountries = searchQuery == '' ? countries : countries.filter(c => c.name.common.toLowerCase().includes(searchQuery.toLowerCase()))

    return (
        <div>
            find countries: <input type="text" value={searchQuery} onChange={handleSearch} />
            {selectedCountry !== null ? (
                <div><button onClick={() => selectCountry(null)}>return</button><br /><Country country={selectedCountry} /></div>
            ) 
            :
            (searchQuery == '' ?'': filteredCountries.length > 10
                ? <p>Too many matches, specify another filter</p>
                : (filteredCountries.length === 1 ? selectCountry(filteredCountries[0]) : <ul>{filteredCountries.map(c => <li key={c.name.common}>{c.name.common} <button onClick={() => selectCountry(c)}>show</button></li>)}</ul>
            )
            )}
        </div>
    )
}

export default App