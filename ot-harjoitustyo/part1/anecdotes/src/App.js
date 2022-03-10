import React, { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.'
  ]
  const [points, setPoints] = useState(new Array(anecdotes.length).fill(0));
   
  const [selected, setSelected] = useState(0)

  function getRandomQuote() {
    let rand = Math.floor(
      Math.random() * (anecdotes.length)
    );
    setSelected(rand);
  }

  function nextAnecdote() {
    if (selected === anecdotes.length - 1) {
      setSelected(0);
    } else if (selected < anecdotes.length - 1) {
      setSelected(selected + 1);
    }
  }

  function voteAnecdote() {
    let copyOfPoints = [...points];
    copyOfPoints[selected]++;
    setPoints(copyOfPoints);
  }

  function largest() {
    let winner = 0;
    for (let i = 0; i < points.length; i++) {
      winner = winner > points[i] ? winner : points[i];
    }
    return points.indexOf(winner);
  }

  return (
    <div className='container'>
      <div className='row my-4'>
        <Anecdote anecdote={anecdotes} pointer={selected}/>
        <Vote list={points} index={selected}/>
      </div>
      <div className='row'>
        <Button text='Get new anecdote' 
        action={getRandomQuote} />
        <Button text='Vote for this anecdote' 
        action={voteAnecdote} />
        <Button text='Next anecdote' 
        action={nextAnecdote} />
      </div>
      <div className='row my-5'>
        <Anecdote anecdote={anecdotes} pointer={largest()}/>
        <Vote list={points} index={largest()}/>
      </div>
    </div>
  )
}

const Anecdote = ({ anecdote, pointer }) => (
  <div className='col'>
    <h1>{anecdote[pointer]}</h1>
  </div>
)

const Vote = ({ list, index }) => (
  <div className='col'>
    <h1>{list[index]}</h1>
  </div>
)

const Button = ({ text, action }) => (
  <div className='col'>
    <button 
    className='btn btn-primary'
    onClick={() => action()}>
    {text}
    </button>
  </div>
)

export default App
