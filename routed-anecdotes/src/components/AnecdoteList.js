import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Anecdote from "./Anecdote";

const AnecdoteList = ({ anecdotes }) => {
    return (
            <ul>
                {anecdotes.map(anecdote => 
                    <li key={anecdote.id}>
                        <Link to={`anecdotes/${anecdote.id}`}>{anecdote.content}</Link>
                    </li>
                    )}
            </ul>
    )
}

export default AnecdoteList

