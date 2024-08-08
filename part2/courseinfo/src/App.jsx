import Course from './components/Course'

const Total = (props) => {
  const total = props.parts.map(part => part.exercises).reduce((acc, x) => acc+x, 0)
  return <p>Number of exercises {total}</p>
}

const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts:  [
      {name: 'Fundementals of React', exercises: 10, id: 1},
      {name: 'Using props to pass date', exercises: 7, id: 2},
      {name: 'State of a component', exercises: 14, id: 3},
      {name: 'Forms', exercises: 12, id: 4},
      {name: 'Getting data from server', exercises: 7, id: 5}
    ]
  }

  return (
    <Course course={course} />
  )
}

export default App