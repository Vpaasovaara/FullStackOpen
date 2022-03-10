import { useState } from "react";
import { newAnecdote } from '../reducers/anecdoteReducer'
import { notificationOn } from "../reducers/notificationReducer";
import { connect } from "react-redux";
import anecdoteService from '../services/anecdotes'


// 6.7: anekdootit, step5
const AnecdoteForm = (props) => {

    const [input, setInput] = useState('')
    
    // 6.4: anekdootit, step2
    const createAnecdote = async (e) => {
        e.preventDefault()
        let response = await anecdoteService.createNew(input)
        props.newAnecdote(response)
        props.notificationOn(`You created ${input}`, 5)
    }

    return (
    <div>
      <h2>create new</h2>
      <form onSubmit={createAnecdote}>
        <div>
          <input type="text" value={input} onChange={(e) => {setInput(e.target.value)}}/>
        </div>
        <input type="submit" value="create" />
      </form>
    </div>
    )
}

const mapDispatchToProps = {
  newAnecdote: newAnecdote,
  notificationOn: notificationOn
}

const mapped = connect(null, mapDispatchToProps)(AnecdoteForm)
export default mapped