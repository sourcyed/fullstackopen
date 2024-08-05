const Header = (props) => (
  <h1>{props.course}</h1>
)

const Part = (props) => {
  return (
      <li>{props.part} {props.exercises}</li>
  )
}

const Content = (props) => {
  return (
    <ol>
      <Part part={props.parts[0][0]} exercises={props.parts[0][1]}/>
      <Part part={props.parts[1][0]} exercises={props.parts[1][1]}/>
      <Part part={props.parts[2][0]} exercises={props.parts[2][1]}/>
    </ol>
  )
}

const Total = (props) => (
  <p>Number of exercises {props.total}</p>
)

const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundementals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass date'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <div>
      <Header course={course} />
      <Content parts={[[part1,exercises1], [part2,exercises2], [part3,exercises3]]}/>
      <Total total={exercises1+exercises2+exercises3}/>
    </div>
  )
}

export default App