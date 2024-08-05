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

const Total = (props) => (
  <p>Number of exercises {props.total}</p>
)

const App = () => {
  const course = 'Half Stack application development'
  const part1 = {name: 'Fundementals of React', exercises: 10}
  const part2 = {name: 'Using props to pass date', exercises: 7}
  const part3 = {name: 'State of a component', exercises: 14}

  return (
    <div>
      <Header course={course} />
      <Content parts={[part1, part2, part3]}/>
      <Total total={part1.exercises + part2.exercises + part3.exercises}/>
    </div>
  )
}

export default App