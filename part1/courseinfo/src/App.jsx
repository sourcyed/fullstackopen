const Header = (props) => {
  console.log(props)
  return  <h1>{props.course}</h1>
}

const Part = (props) => {
  return (
      <li>{props.part} {props.exercises}</li>
  )
}

const Content = (props) => {
  return (
    <ol>
      <Part part={props.parts[0].name} exercises={props.parts[0].exercises}/>
      <Part part={props.parts[1].name} exercises={props.parts[1].exercises}/>
      <Part part={props.parts[2].name} exercises={props.parts[2].exercises}/>
    </ol>
  )
}

const Total = (props) => {
  const total = props.parts.map(part => part.exercises).reduce((acc, x) => acc+x, 0)
  return <p>Number of exercises {total}</p>
}

const App = () => {
  const course = 'Half Stack application development'
  const parts = [
    {name: 'Fundementals of React', exercises: 10},
    {name: 'Using props to pass date', exercises: 7},
    {name: 'State of a component', exercises: 14}
  ]

  return (
    <div>
      <Header course={course} />
      <Content parts={parts}/>
      <Total parts={parts}/>
    </div>
  )
}

export default App