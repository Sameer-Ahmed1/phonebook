import { useState } from "react";

const Header1 = ({ text }) => <h1>{text}</h1>;
const Header2 = ({ text }) => <h2>{text}</h2>;
const Button = (props) => (
  <button onClick={props.handleClick}>{props.text}</button>
);
const Display = ({ text }) => <p>{text}</p>;
const StatisticLine = (props) => (
  <p>
    {props.text} {props.value}
    {props.symbol}
  </p>
);
const Statistics = (props) => {
  if (!props.good && !props.bad && !props.neutral)
    return <Display text="No feedback given" />;
  return (
    <table>
      <tbody>
        <tr>
          <td>
            <StatisticLine text="Good " />
          </td>
          <td>
            <StatisticLine value={props.good} />
          </td>
        </tr>
        <tr>
          <td>
            <StatisticLine text="Neutral " />
          </td>
          <td>
            <StatisticLine value={props.neutral} />
          </td>
        </tr>
        <tr>
          <td>
            <StatisticLine text="Bad " />
          </td>
          <td>
            <StatisticLine value={props.bad} />
          </td>
        </tr>
        <tr>
          <td>
            <StatisticLine text="All " />
          </td>
          <td>
            <StatisticLine value={props.totalFeedback} />
          </td>
        </tr>
        <tr>
          <td>
            <StatisticLine text="Average " />
          </td>
          <td>
            <StatisticLine value={props.averageScore} />
          </td>
        </tr>
        <tr>
          <td>
            <StatisticLine text="Positive " />
          </td>
          <td>
            <StatisticLine value={props.positivePercentage} symbol="%" />
          </td>
        </tr>
      </tbody>
    </table>
  );
};

function App() {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const setGoodValue = () => {
    setGood(good + 1);
  };
  const setNeutralValue = () => {
    setNeutral(neutral + 1);
  };
  const setBadValue = () => {
    setBad(bad + 1);
  };
  const getTotalFeedback = () => good + neutral + bad;
  const getAverageScore = () => (good - bad) / getTotalFeedback() || 0;
  const getPositivePercentage = () => (good / getTotalFeedback()) * 100 || 0;

  return (
    <div>
      <Header1 text="Give Feedback" />
      <Button text="Good" handleClick={setGoodValue} />{" "}
      <Button text="Neutral" handleClick={setNeutralValue} />{" "}
      <Button text="Bad" handleClick={setBadValue} />
      <Header2 text="Statistics" />
      <Statistics
        good={good}
        neutral={neutral}
        bad={bad}
        totalFeedback={getTotalFeedback()}
        averageScore={getAverageScore()}
        positivePercentage={getPositivePercentage()}
      />
    </div>
  );
}

export default App;
