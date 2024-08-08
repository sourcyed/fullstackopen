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

const Course = ({ course }) => {
    return (
        <div>
        <Header course={course.name} />
        <Content parts={course.parts}/>
        {/* <Total parts={course.parts}/> */}
      </div>
    )
}

export default Course