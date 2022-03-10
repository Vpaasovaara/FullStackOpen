import React from 'react'

const Course = ({course}) => (
  <div>
    <Header course={course.name} />
    <Content parts={course.parts} />
    <Total total={course.parts} />
  </div>
  
)

const Header = (props) => (
    <h1>{props.course}</h1>
)
  

const Content = (props) => (
  <div>
    {props.parts.map(function(part) {
      return <Part part={part.name} exercises={part.exercises} key={part.id}/>
    })}
  </div>
)

const Total = (props) => (
  <div>
    <p><b>Total of {props.total.reduce((acc, cur) => acc + cur.exercises, 0)} exercises</b></p>
  </div>
)


const Part = (props) => (
  <p>
      {props.part} {props.exercises}
  </p>
)

export default Course