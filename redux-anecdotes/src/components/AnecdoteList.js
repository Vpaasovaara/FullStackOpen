import { increment } from '../reducers/anecdoteReducer'
import { notificationOn } from '../reducers/notificationReducer'
import { useSelector, useDispatch } from 'react-redux'

// 6.7: anekdootit, step5
const AnecdoteList = () => {

    const filter = useSelector(state => state.filter)
    const anecdotes = useSelector(state => state.anecdotes).filter((str) => {
      return str.content.includes(filter)
    })
    const dispatch = useDispatch()

    // 6.3: anekdootit, step1
    const vote = (anecdote) => {
        dispatch(increment(anecdote))
        dispatch(notificationOn(`You voted ${anecdote.content}`, 5))
    }

    return (
    <div>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
    )
}

export default AnecdoteList

