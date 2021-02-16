import React, { useState } from 'react'
import logo from './logo.svg';
import './App.css';


const ALLLJOKESBYKEYWORD = 'https://api.chucknorris.io/jokes/search?query=' // remember to fill this
const launchErrorAlert = () => setTimeout(() => window.alert('errore!'), 500) 

// classe 'App-logo-spinning' durante il caricamento, altrimenti classe 'App-logo'
const Logo = ({ loading }) => {
  return (
    <img
      src={logo}
      alt='interactive-logo'
      className={loading ? 'App-logo-spinning' : 'App-logo'}
    />
  )
}

const Joke = ({ value, categories }) => {
  return (
    <div className="Joke">
      <code className="Joke-Value">{value}</code>
      {categories.map((category, index) => (
        <span className="Selected-Cat" key={index} >
          <code>{category}</code>
        </span>
      ))}
    </div>
  )  
}

// class App extends React.Component {
function App() {
  // qui tutto ciò che serve al componente per essere inizializzato
  const [inputText, setInputText] = useState('')
  const [loading, setLoading] = useState(false)
  const [fetchedJoke, setFetchedJoke] = useState({})

  // getJokeByKeyword
  // funzione che recupera le barzellette contenenti la parola chiave
  // digitata nel campo di testo
  const getJokeByKeyword = async () => {
    let singleJoke = {}
    try {
      setLoading(true)
      let response = await fetch(`${ALLLJOKESBYKEYWORD}${inputText}`)
      let data = await response.json()
      singleJoke= { ...data.result[0] }
    } catch (error) {
    } finally {
      setFetchedJoke(singleJoke)
      setLoading(false)
    }
  }

  // onInputTextChange
  // handler per l'input di testo
const onInputTextChange = (event) => setInputText(event.target.value)

  // qui i lifecycle methods

  // render () {
    return (
      <div className="App">
        <div className="App-header">
          <Logo
            loading={loading}
          />
          <input
            type="search"
            id="search" name="search"
            placeholder="Enter keyword here"
            value={inputText}
            onChange={onInputTextChange}
          />
          <button
            className="Search-Button"
            onClick={getJokeByKeyword}
          >
            <code>CLICK TO SEARCH!</code>
          </button>
        </div>
        <div className="Content">
          <img
            src="https://api.chucknorris.io/img/chucknorris_logo_coloured_small@2x.png" 
            className="Chuck-Logo"
            alt="chuck-logo"
          />
          {Object.keys(fetchedJoke).length > 0 && <Joke
            value={fetchedJoke.value}
            categories={fetchedJoke.categories}
          />}
        </div>
        <div className="footer">
        <code>Esame di React per cfp-futura. Grazie ad <a href="https://api.chucknorris.io">api.chucknorris.io</a> per l'immagine e le api. Docente: Vito Vitale. Studente: Barbara Palazzo</code>
        </div>
      </div>
    );
  // }
};

export default App;
