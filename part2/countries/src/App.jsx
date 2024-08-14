import { useState, useEffect } from 'react'
import axios from 'axios'

function Country({country}) {
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
    useEffect(() => {
        axios.get('https://studies.cs.helsinki.fi/restcountries/api/all').then(r => {
            updateCountries(r.data) 
        })
    }, [])

    const handleSearch = e => {
        updateSearchQuery(e.target.value)
    }

    const filteredCountries = searchQuery == '' ? countries : countries.filter(c => c.name.common.toLowerCase().includes(searchQuery.toLowerCase()))

    return (
        <div>
            find countries: <input type="text" value={searchQuery} onChange={handleSearch} />
            {searchQuery == '' ?'': filteredCountries.length > 10
                ? <p>Too many matches, specify another filter</p>
                : (filteredCountries.length == 1
                    ? <Country country={filteredCountries[0]} />
                    : <ul>{filteredCountries.map(c => <li key={c.name.common}>{c.name.common}</li>)}</ul>
                )
            }
        </div>
    )
}

export default App