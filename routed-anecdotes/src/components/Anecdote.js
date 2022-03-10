import { useParams } from "react-router-dom";

// 7.2: routed anecdotes, step2
const Anecdote = ({ anecdotes }) => {
    const id = useParams().id
    const anecdote = anecdotes.find(n => n.id === Number(id))
    return (
        <div>
            <p>{anecdote.content}</p>
        </div>
    )
}

export default Anecdote