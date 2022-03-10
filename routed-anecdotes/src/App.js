import { useState } from 'react'
import CreateNew from './components/CreateNew'
import Menu from './components/Menu'
import AnecdoteList from './components/AnecdoteList'
import About from './components/About'
import Footer from './components/Footer'
import Content from './components/Content'



const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: 1
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: 2
    }
  ])

  const [page, setPage] = useState('anecdotes')
  const [notification, setNotification] = useState('')

  const addNew = (anecdote) => {
    anecdote.id = (Math.random() * 10000).toFixed(0)
    setAnecdotes(anecdotes.concat(anecdote))
  }

  const anecdoteById = (id) =>
    anecdotes.find(a => a.id === id)

  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  }

  // 7.3: routed anecdotes, step3
  var wee_timer
  const showNotification = (content, time) => {
    setNotification(`a new anecdote: ${content}`)
    clearTimeout(wee_timer)
    wee_timer = setTimeout(() => {
      setNotification('')
    }, time * 1000)
  }

  return (
    <div>
      <h1>Software anecdotes</h1>
      <div>{notification}</div>
      <Content anecdotes={anecdotes} addNew={addNew} page={page} setPage={setPage} showNotification={showNotification}/>
      <Footer />
    </div>
  )
}

export default App
