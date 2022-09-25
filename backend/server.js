import express from 'express'

const app = express()
app.use(express.json())

const jokes = [
  {
    id: 1,
    text: "What's the best thing about Switzerland? I don't know, but the flag is a big plus.",
  },
  {
    id: 2,
    text: "Did you hear about the mathematician who's afraid of negative numbers? He will stop at nothing to avoid them.",
  },
  {
    id: 3,
    text: "Hear about the new restaurant called Karma? There's no menu: You get what you deserve.",
  },
]

app.get('/api/jokes', (req, res) => {
  if (req.query.search) {
    const filteredJokes = jokes.filter((joke) =>
      joke.text.toLowerCase().includes(req.query.search.toLowerCase())
    )
    res.send(filteredJokes)
    return
  }

  setTimeout(() => {
    res.send([...jokes].reverse())
  }, 5000)
    
})

app.get('/api/jokes/:id', (req, res) => {
  const joke = jokes.find(j => j.id === Number(req.params.id))
  if (joke) {
    res.send(joke)
  } else {
    res.status(404).end()
  }
})

app.post('/api/jokes', (req, res) => {
  const joke = req.body
  joke.id = jokes.length + 1
  jokes.push(joke)
  setTimeout(() => {
    res.send(joke)
  }, 5000)
    
})

app.listen(8080, () => {
  console.log('Listening on port 8080')
})