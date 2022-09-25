import axios from 'axios'
import { useState } from 'react'


export default function NewJokeForm({ onNewJoke }) {

  const [text, setText] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const result = await axios.post("/api/jokes", { text })
      console.log(result.data)
      onNewJoke(result.data)
    } catch (error) {
      setError(true)
    }
    setLoading(false)
  }

  return (
    <>
      {
        loading ? <p>Loading...</p>
          :
          <form onSubmit={handleSubmit}>
            <label htmlFor="text">Joke Text</label>
            <input type="text" id="text" value={text} onChange={e => setText(e.target.value)} />
            <button type="submit">Add Joke</button>
          </form>
      }
      {error && <p>Something went wrong</p>}
    </>
  )
}