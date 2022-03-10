import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useField } from '../hooks/index'

const CreateNew = (props) => {
    const navigate = useNavigate()
    const {reset: resetContent, ...content} = useField('text')
    const {reset: resetAuthor, ...author} = useField('text')
    const {reset: resetInfo, ...info} = useField('text')


    const handleSubmit = (e) => {
      e.preventDefault()
      props.addNew({
        content: content.value,
        author: author.value,
        info: info.value,
        votes: 0
      })

      // 7.3: routed anecdotes, step3
      navigate('/')
      props.showNotification(content.value, 5)
    }
  
    // 7.5: anekdoottisovellus ja hookit step2
    const resetAll = () => {
      resetContent()
      resetAuthor()
      resetInfo()
    }

    return (
      <div>
        <h2>create a new anecdote</h2>
        <form onSubmit={handleSubmit}>
          <div>
            content
            <input name='content' {...content} />
          </div>
          <div>
            author
            <input name='author' {...author} />
          </div>
          <div>
            url for more info
            <input name='info' {...info} />
          </div>
          <button type="submit">create</button>
          <button type="reset" onClick={() => resetAll()}>reset</button>
        </form>
        
      </div>
    )
  }

export default CreateNew