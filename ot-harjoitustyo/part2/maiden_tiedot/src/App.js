import React, { useEffect, useState } from 'react'

function App() {

  const url = 'https://restcountries.eu/rest/v2/all'
  const weatherKey = "81bfb44295ceda25341848e8092e21ca"

  const [ country, setCountry ] = useState('')
  const [ countries, setCountries ] = useState('')
  const [ weather, setWeather ] = useState('')

  

  const handleCountryChange = (e) => {
    e.preventDefault()
    setCountry(e.target.value)
    getCountry(e.target.value)
  }

  const getCountry = (cur) => {
    let finder = new RegExp(cur, 'i')
    fetch(url)
      .then(response => response.json())
      .then(data => {
        setCountries(data.filter(x => x = x.name.match(finder)))
      })
  }

  const getOneCountry = (acc) => {
    let newUrl = `https://restcountries.eu/rest/v2/name/${acc}`
    fetch(newUrl)
      .then(response => response.json())
      .then(data => {
        setCountries(data)
      })
  }


  return (
    <div className="App container">
      <form> 
        <div className='container my-3'>
          <label htmlFor='country' className='sr-only'>
          </label>
          <input 
            type='text'
            name='country'
            placeholder='find countries'
            onChange={handleCountryChange}
            value={country}>
          </input>
        </div>
        {country}
      </form>
      <ul>
        {typeof countries === 'string' 
          ? 'List of countries here' 
          : countries.length > 10 
          ? 'List is too long, specify search result' 
          : countries.length === 1
          ? <OneCountry 
              country={countries[0]} 
              />
          : countries.map(x => 
            <li className='m-3' key={x.name}>
              {x.name}
              <button 
                className='mx-3 btn btn-outline-primary'
                id={x.name}
                onClick={() => getOneCountry(x.name)}>
                show
              </button>
            </li>
          )}
      </ul>
    </div>
  );
}

const OneCountry = ({ country }) => (
  <div>
    <h1>
      {country.name}
    </h1>
    <p id="capital">
      capital: {country.capital}
    </p>
    <p>
      population: {country.population}
    </p>
    <h3>
      Spoken languages
    </h3>
    <ul>
      {country.languages.map(x =>
        <li key={x.name}>
          {x.name}
        </li>  
      )}
    </ul>
    <br />
    <img src={country.flag} alt='flag' width="500" height="300">
    </img>
    <br />
    <h3>
      Weather in {country.capital}
    </h3>
    <div id='weather'>

    </div>
  </div>
)

export default App;
