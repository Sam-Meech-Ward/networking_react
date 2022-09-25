import './App.css'
import axios from 'axios'
import { useEffect, useState } from 'react'

import NewJokeForm from './NewJokeForm'

function App() {

  const [jokes, setJokes] = useState([])
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)
  const [search, setSearch] = useState('')

  useEffect(() => {
    const controller = new AbortController()
      ; (async () => {
        setError(false)
        setLoading(true)
        try {
          const result = await axios.get('/api/jokes?search=' + search, {
            signal: controller.signal
          })
          setJokes(result.data)
        } catch (error) {
          if (axios.isCancel(error)) {
            console.log('Request canceled', error.message)
            return
          }
          setError(true)
        }
        setLoading(false)
      })()

    return () => {
      // cleanup
      controller.abort()
    }
  }, [search])

  const handleNewJoke = (joke) => {
    setJokes([joke, ...jokes])
  }

  return (
    <div className="App">

      <h1>Jokes App</h1>

      <input type="text" value={search} onChange={e => setSearch(e.target.value)} />

      {loading && <p>Loading...</p>}

      {error ?
        <p>Something went wrong</p>
        :

        jokes.map((joke) => (
          <div className="joke" key={joke.id}>
            <h3>{joke.text}</h3>
          </div>
        ))
      }

      <NewJokeForm onNewJoke={handleNewJoke} />


    </div>
  )
}

export default App
