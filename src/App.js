import app from "./app.module.css";
import { useState, useRef } from 'react';

import Card from './Card.js';

const animals = ["dog", "cat", "horse", "rat"];

const cards = [
  {id: 1, text: "dog"},
  {id: 2, text: "dog"},
  {id: 3, text: "cat"},
  {id: 4, text: "cat"},
  {id: 5, text: "horse"},
  {id: 6, text: "horse"},
  {id: 7, text: "rat"},
  {id: 8, text: "rat"},
]

function shuffleArray(array) {
  for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
  }
}


function App() {
  const [gameState, setGameState] = useState("initiated");
  const [cardsArr, setCardsArr] = useState(cards);
  const [targetAnimal, setTargetAnimal] = useState("");
  const selectedCards = useRef([]);
  const [result, setResult] = useState(undefined);


  console.log(gameState, cardsArr, targetAnimal, selectedCards, result);


  //const cardsArr = useRef(cards);
  //const [gameState, setGameState] = useState("default");
  console.log(cardsArr);

  function selectAnimal() {
    const tmpAnimal = animals[Math.floor(Math.random()*animals.length)];
    setTargetAnimal(tmpAnimal);
    console.log(targetAnimal);
  }

  function initGame() {
    selectAnimal();
    let tmpCards = cards;
    shuffleArray(tmpCards);
    //cardsArr.current = tmpCards;
  }


  return (
    <>
      <button onClick={initGame}>init game</button>
      <h1>you need to find all cards with {targetAnimal}</h1>
      <p>click button when you are ready</p>
      <button >Start game</button>
      <div className={app.cardCont}>
        {
          cardsArr.map(card => <Card cardData={card}/>)
        }
      </div>
    </>
  );
}

export default App;
