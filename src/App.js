import { useState, useEffect } from "react";
import "./App.css";
import SingleCard from "./components/singleCard";
const cardImage = [
  { src: "/img/helmet-1.png", matched: false },
  { src: "/img/potion-1.png", matched: false },
  { src: "/img/ring-1.png", matched: false },
  { src: "/img/scroll-1.png", matched: false },
  { src: "/img/shield-1.png", matched: false },
  { src: "/img/sword-1.png", matched: false }
];
function App() {
  const [cards, setCards] = useState([]);
  const [turn, setTurn] = useState(0);
  const [disabled, setDisabled] = useState(false);
  const [choiceone, setChoiceOne] = useState(null);
  const [choicetwo, setChoicetwo] = useState(null);

  // ** handelchoice
  const handelChoice = (card) => {
    choiceone ? setChoicetwo(card) : setChoiceOne(card);
  };

  useEffect(() => {
    if (choiceone && choicetwo) {
      setDisabled(true);
      if (choiceone.src === choicetwo.src) {
        setCards((prevcards) => {
          return prevcards.map((card) => {
            if (card.src === choiceone.src) {
              return { ...card, matched: true };
            } else {
              return { ...card };
            }
          });
        });
        resetTurn();
      } else {
        setTimeout(() => resetTurn(), 1000);
      }
    }
  }, [choiceone, choicetwo]);

  useEffect(() => {
    shuffleCards();
  }, []);
  console.log(cards);
  const resetTurn = () => {
    setChoiceOne(null);
    setChoicetwo(null);
    setTurn((prevturn) => prevturn + 1);
    setDisabled(false);
  };
  // ** shuffle cards
  const shuffleCards = () => {
    const shuffledCards = [...cardImage, ...cardImage]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));
    setChoiceOne(null);
    setChoicetwo(null);
    setCards(shuffledCards);
    setTurn(0);
  };

  return (
    <div className="App">
      <h1>Magic Match</h1>
      <button onClick={shuffleCards}>New Game</button>
      <div className="card-grid">
        {cards &&
          cards.map((card) => (
            <SingleCard
              card={card}
              handelChoice={handelChoice}
              flipped={card === choiceone || card === choicetwo || card.matched}
              disabled={disabled}
            />
          ))}
      </div>
      <p>The Number of Turns is : {turn}</p>
    </div>
  );
}

export default App;
