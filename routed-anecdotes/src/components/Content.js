import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import AnecdoteList from "./AnecdoteList";
import CreateNew from "./CreateNew";
import About from "./About";
import Anecdote from "./Anecdote";

// 7.1: routed anecdotes, step1
const Content = (props) => {
    return (
        <Router>
            <div>
                <Link to="/" style={{margin: "4px"}}>anecdotes</Link>
                <Link to="/create" style={{margin: "4px"}}>create new</Link>
                <Link to="/about" style={{margin: "4px"}}>about</Link>
            </div>
            <Routes>
                <Route path="/anecdotes/:id" element={<Anecdote anecdotes={props.anecdotes} />}/> 
                <Route path="/create" element={<CreateNew addNew={props.addNew} showNotification={props.showNotification}/>}/>
                <Route path="/about" element={<About />}/>
                <Route path="/" element={<AnecdoteList anecdotes={props.anecdotes} />}/>
            </Routes>
        </Router>
    )
}

export default Content

