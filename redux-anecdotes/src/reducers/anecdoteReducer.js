import anecdoteService from '../services/anecdotes'


// 6.6: anekdootit, step4
export const increment = (content) => {
  return async dispatch => {
    const updatedAnecdote = await anecdoteService.update(content)
    dispatch({
      type: 'INCREMENT',
      content: updatedAnecdote
    })
  }
}

export const newAnecdote = (content) => {
  return { type: 'NEW_ANECDOTE', content: content }
}

// 6.16 anekdootit ja backend, step4
export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      content: anecdotes
    })
  }
}

const anecdoteReducer = (state = [], action) => {
  //console.log('state now: ', state)
  //console.log('action', action)

  let copy = [...state]

  switch (action.type) {
    // 6.3: anekdootit, step1
    case 'INCREMENT':
      let obj = copy.find(X => X.id == action.content.id)
      if (obj) obj = obj.votes++
        return sorter(copy)
    // 6.4: anekdootit, step2
    case 'NEW_ANECDOTE':
      return state.concat(action.content)
    case 'INIT_ANECDOTES':
      return sorter(action.content)
    default:
      return state
  }
}

const sorter = (obj) => {
  return obj.sort((a, b) => {
    return b.votes - a.votes
  })
}

export default anecdoteReducer