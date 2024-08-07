import { useState } from 'react'

const Button = ({onClick, label}) => {
  return (
    <button onClick={onClick}>{label}</button>
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

  const totalFeedback = (good + bad + neutral)
  const averageFeedback = (good - bad) / totalFeedback
  const positiveFeedbackPercent = (good / totalFeedback) * 100

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

      <div>
        <h1>statistics</h1>
        <p>good {good}</p>
        <p>neutral {neutral}</p>
        <p>bad {bad}</p>
        <p>all {totalFeedback}</p>
        <p>average {averageFeedback}</p>
        <p>positive {positiveFeedbackPercent} %</p>
      </div>
    </>
  )
}

export default App