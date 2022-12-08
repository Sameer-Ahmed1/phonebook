import { useState } from "react";
const Button = ({ text, handleClick }) => (
  <button onClick={handleClick}>{text}</button>
);
const Header = ({ text }) => <h1>{text}</h1>;
const Display = ({ text }) => <p>{text}</p>;

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
  ];

  const getRandomAnecdote = () => Math.floor(Math.random() * anecdotes.length);
  const [selected, setSelected] = useState(0);
  const [points, setPoints] = useState(Array(anecdotes.length).fill(0));
  const setSelectedValue = () => setSelected(getRandomAnecdote());
  const setPointsValue = () => {
    const copy = [...points];
    copy[selected] += 1;
    setPoints(copy);
  };
  const getAnecdoteWithMostVotes = () =>
    points.reduce(
      (highest, currentVotes, currentAnecdote) => {
        if (highest.votes < currentVotes) {
          highest.anecdote = currentAnecdote;
          highest.votes = currentVotes;
        }
        return highest;
      },
      { anecdote: 0, votes: 0 }
    );
  return (
    <div>
      <Header text="Anectode of the day" />
      <Display text={anecdotes[selected]} />
      <Display text={points[selected]} />
      <Button text="Vote" handleClick={setPointsValue} />
      <Button text="next anectode" handleClick={setSelectedValue} />
      <Header text="Anectodes with most votes" />
      <Display
        text={
          anecdotes[getAnecdoteWithMostVotes().anecdote] +
          " has " +
          getAnecdoteWithMostVotes().votes +
          " votes "
        }
      />
    </div>
  );
};
export default App;
