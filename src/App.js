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
  const [gameState, setGameState] = useState("default");
  const [cardsArr, setCardsArr] = useState(cards);
  const [targetAnimal, setTargetAnimal] = useState("");
  const selectedCards = useRef([]);
  const [result, setResult] = useState(undefined);

  //console.log(gameState, cardsArr, targetAnimal, selectedCards, result);
  console.log(gameState, targetAnimal);
  console.log(result);

  function selectAnimal() {
    const tmpAnimal = animals[Math.floor(Math.random()*animals.length)];
    setTargetAnimal(tmpAnimal);
    //console.log(targetAnimal);
  }

  function initGame() {
    setGameState("initiated");
    selectAnimal();
    setCardsArr(cards => {
      let cardsCopy = JSON.parse(JSON.stringify(cards));
      console.log(cardsCopy);
      shuffleArray(cardsCopy);
      console.log(cardsCopy);
      return cardsCopy;
    })

    selectedCards.current = [];

    console.log(selectedCards.current);
    //console.log(gameState, targetAnimal);
  }

  function playGame() {
    setGameState("playing");
    //console.log(gameState, targetAnimal);
  }

  function finishGame() {
    setGameState("finished");

    console.log(selectedCards.current);

    //compareArrays();
    //console.log(gameState, targetAnimal);

    setResult(compareArrays());
  }

  function compareArrays() {
    let tmpResult = selectedCards.current.sort();
    let idealResult = cards;
    idealResult = idealResult.filter(card => card.text === targetAnimal).map(card => card.id);
    console.log("i", idealResult);
    console.log("r", tmpResult);
    console.log("i", JSON.stringify(idealResult));
    console.log("r", JSON.stringify(tmpResult));
    console.log(JSON.stringify(idealResult) === JSON.stringify(tmpResult));
    return (JSON.stringify(idealResult) === JSON.stringify(tmpResult));
  }


  function handleSelectedCards(cardId) {
    let targetCard = cards.find(card => card.id === cardId);
    console.log(targetCard);


    if (selectedCards.current.includes(targetCard.id)) {
      selectedCards.current = selectedCards.current.filter(id => id !== targetCard.id);
    } else {
      selectedCards.current.push(targetCard.id);
    }

    console.log(selectedCards.current);
  }

  return (
    <>
      {
        (result) ? <h1>win</h1> : <h1>lose (lox)</h1>
      }
      <div>
        {(gameState === "default") ? 
        <button onClick={initGame}>init game</button>
        : <>
                                      {
                                        (gameState === "finished") &&
                                        <button onClick={initGame}>init game</button>
                                      }
                                      {
                                        (gameState === "initiated") &&
                                        <button onClick={playGame}>play game</button>
                                      }
                                      {
                                        (gameState === "playing") &&
                                        <button onClick={finishGame}>finish game</button>
                                      }
                                      <h1>you need to find all cards with {targetAnimal}</h1>
                                      <p>click button when you are ready</p>
                                        <button >Start game</button>
                                      <div className={app.cardCont}>
                                        {
                                          cardsArr.map(card => <Card cardData={card} gameState={gameState} onCardSelect={handleSelectedCards}/>)
                                        }
                                      </div>
          </>
        }
        </div>

    </>
  );
}

export default App;
