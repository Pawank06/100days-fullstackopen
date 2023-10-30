import { useState } from "react";

// a proper place to define a component

const Button = (props) => {
  return <button onClick={props.handleClick}>{props.content}</button>;
};

const StatisticLine = ({ content, data }) => {
  return (
    <tr>
      <td>
        {content}
      </td>
      <td>
      {data}
      </td>
    </tr>
  );
};

const Statistics = (props) => {
  if (props.all === 0) {
    return <p>No feedback given</p>;
  } else {
    return (
      <table>
        <tbody>
          <StatisticLine content="good" data={props.good} />
          <StatisticLine content="neutral" data={props.neutral} />
          <StatisticLine content="bad" data={props.bad} />
          <StatisticLine content="all" data={props.all} />
          <StatisticLine content="average" data={props.average} />
          <StatisticLine content="positive" data={props.positive} />
        </tbody>
      </table>
    );
  }
};

const App = () => {
  // save clicks of each button to its own state

  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const all = good + neutral + bad;
  const average = (good * 1 + bad * -1) / all;
  const positive = parseFloat(good / all) * 100;

  // handle functions of each states

  const handleGood = () => {
    setGood(good + 1);
  };

  const handleBad = () => {
    setBad(bad + 1);
  };

  const handleNuetral = () => {
    setNeutral(neutral + 1);
  };

  return (
    <>
      <h1>Give feedback</h1>

      <Button handleClick={handleGood} content="good" />
      <Button handleClick={handleNuetral} content="neutral" />
      <Button handleClick={handleBad} content="bad" />

      <h1>Statistic</h1>
      <Statistics
        good={good}
        neutral={neutral}
        bad={bad}
        average={average}
        positive={positive}
        all={all}
      />
    </>
  );
};

export default App;
