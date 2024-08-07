import { useState } from 'react'

const Button = ({onClick, label}) => {
  return (
    <button onClick={onClick}>{label}</button>
  )
}

const StatisticLine = ({label, value}) => {
  return (
    <tr>
      <td>{label}</td>
      <td>{value}</td>
    </tr>
  )
}

const Statistics = ({stats}) => {
  const totalFeedback = (stats.good + stats.bad + stats.neutral)
  const averageFeedback = (stats.good - stats.bad) / totalFeedback
  const positiveFeedbackPercent = (stats.good / totalFeedback) * 100

  if (totalFeedback === 0) {
    return (
      <div>
        <h1>statistics</h1>
        <p>No feedback given</p>
      </div>
    )
  }

  return (
    <div>
        <h1>statistics</h1>
        <table>
          <tbody>
            <StatisticLine label='good' value={stats.good}/>
            <StatisticLine label='neutral' value={stats.neutral}/>
            <StatisticLine label='bad' value={stats.bad}/>
            <StatisticLine label='all' value={totalFeedback}/>
            <StatisticLine label='average' value={averageFeedback}/>
            <StatisticLine label='positive' value={positiveFeedbackPercent + " %"}/>
          </tbody>
        </table>
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