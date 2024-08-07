import { useState } from 'react'

const Button = ({onClick, label}) => {
  return (
    <button onClick={onClick}>{label}</button>
  )
}

const Statistics = ({stats}) => {
  const totalFeedback = (stats.good + stats.bad + stats.neutral)
  const averageFeedback = (stats.good - stats.bad) / totalFeedback
  const positiveFeedbackPercent = (stats.good / totalFeedback) * 100

  return (
    <div>
        <h1>statistics</h1>
        <p>good {stats.good}</p>
        <p>neutral {stats.neutral}</p>
        <p>bad {stats.bad}</p>
        <p>all {totalFeedback}</p>
        <p>average {averageFeedback}</p>
        <p>positive {positiveFeedbackPercent} %</p>
    </div>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGood = () => setGood(good + 1)
  const handleNeutral = () => setNeutral(neutral + 1)
  const handleBad = () => setBad(bad + 1)

  const stats = { good: good, neutral: neutral, bad: bad }

  return (
    <>
      <div>
        <h1>give feedback</h1>
        <p>
          <Button onClick={handleGood} label='good'/>
          <Button onClick={handleNeutral} label='neutral'/>
          <Button onClick={handleBad} label='bad'/>
        </p>
      </div>

      <Statistics stats={stats}/>
    </>
  )
}

export default App