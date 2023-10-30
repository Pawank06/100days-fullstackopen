import { useState } from "react";

const Button = ({ handleClick, content }) => {
  return <button onClick={handleClick}>{content}</button>;
};

const Anecdote = ({ anecdotes, vote }) => {
  return (
    <>
      <p>{anecdotes}</p>
      <p>has {vote} vote</p>
    </>
  );
};

const Votes = ({anecdotes, max}) => {

  if(max === 0){
    return(
      <p>not yet voted</p>
    )
  }
  return (
    <>
      <p>
        {anecdotes} has {max} votes
      </p>
    </>
  );
};

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];

  const [selected, setSelected] = useState(0);
  const [vote, setVote] = useState(Array(anecdotes.length).fill(0));

  const generateNumber = () => {
    setSelected(Math.floor(Math.random() * anecdotes.length));

    console.log(selected + 1);
  };

  const addVote = () => {
    const newVote = [...vote];
    newVote[selected] += 1;
    setVote(newVote);
    console.log(newVote);
  };

  const max = Math.max(...vote);
  console.log("het", ...vote);
  const index = vote.indexOf(max);

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <Anecdote anecdotes={anecdotes[selected]} vote={vote[selected]} />

      <Button handleClick={generateNumber} content="next anecdotes" />
      <Button handleClick={addVote} content="vote" />

      <h1>Anecdote with most votes</h1>
      <Votes anecdotes={anecdotes[index]} max = {max}/>
    </div>
  );
};

export default App;
