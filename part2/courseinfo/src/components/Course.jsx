const Header = ({ course }) => {
    return  <h1>{course}</h1>
  }
  
const Part = ({ part, exercises }) => {
    return (
        <li>{part} {exercises}</li>
    )
}

const Content = ({ parts }) => {
    return (
        <ol>
            {parts.map(part => <Part key={part.id} part={part.name} exercises={part.exercises}/>)}
        </ol>
    )
}

  const Total = ({ parts }) => {
    const total = parts.map(part => part.exercises).reduce((acc, x) => acc+x, 0)
    return <p>Number of exercises {total}</p>
  }

const Course = ({ course }) => {
    return (
        <div>
        <Header course={course.name} />
        <Content parts={course.parts}/>
        <Total parts={course.parts}/>
      </div>
    )
}

export default Course