import React from 'react'
import { useState } from 'react';

function App() {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  function incrementGood() {
    setGood(good + 1);
  }
  function incrementBad() {
    setBad(bad + 1);
  }
  function incrementNeutral() {
    setNeutral(neutral + 1);
  }
  return (
    <div className="App">
      <div class="container my-4">
        <h1>Give Feedback</h1>
        <Button name='good' className='btn me-md-2 btn-outline-success' action={incrementGood}/>
        <Button name='neutral' className='btn me-md-2 btn-outline-warning' action={incrementNeutral}/>
        <Button name='bad' className='btn me-md-2 btn-outline-danger' action={incrementBad}/>
      </div>
      <div class="container my-4"> 
        <table class="table table-striped table-responsive">
        <thead>
          <tr>
            <th scope="col">Statistics</th>
            <th scope="col">count</th>
          </tr>
        </thead>
        <Statistics good={good} neutral={neutral} bad={bad} />
        </table>
      </div>
    </div>
  );
}

const Button = (props) => (
  <button className={props.className} onClick={() => props.action()}>{props.name}</button>
)

const Statistics = ({ good, neutral, bad }) => (
  <tbody>
    <StatisticLine name='good' stat={good} />
    <StatisticLine name='neutral' stat={neutral} />
    <StatisticLine name='bad' stat={bad} />
    <StatisticLine name='all' stat={good+neutral+bad} />
    <StatisticLine name='average' stat={((good-bad) / (good+neutral+bad)) ? ((good-bad) / (good+neutral+bad)) : 0} />
    <StatisticLine name='positive' stat={(good / (good+neutral+bad)) * 100 ? (good / (good+neutral+bad)) * 100 + '%' : 0 + '%'} />
  </tbody>
)

const StatisticLine = ({ name, stat }) => (
  <tr>
    <th scope="row">{name}</th>
    <td>{stat}</td>
  </tr>
)


export default App;
