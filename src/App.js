import app from "./app.module.css";
import { useState, useRef } from 'react';

import Button from "./Button.js";
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
  for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      let tmp = array[i];
      array[i] = array[j];
      array[j] = tmp;
  }
}


function App() {
  const [gameState, setGameState] = useState("default");
  const [cardsArr, setCardsArr] = useState(cards);
  const [targetAnimal, setTargetAnimal] = useState("");
  const selectedCards = useRef([]);
  const [result, setResult] = useState(undefined);


  function selectAnimal() {
    const tmpAnimal = animals[Math.floor(Math.random()*animals.length)];
    setTargetAnimal(tmpAnimal);
  }

  function initGame() {
    setGameState("initiated");
    selectAnimal();
    setCardsArr(cards => {
      let cardsCopy = JSON.parse(JSON.stringify(cards));
      shuffleArray(cardsCopy);
      return cardsCopy;
    })

    selectedCards.current = [];
  }

  function playGame() {
    setGameState("playing");
  }

  function finishGame() {
    setGameState("finished");
    setResult(compareArrays());
  }

  function compareArrays() {
    let tmpResult = selectedCards.current.sort();
    let idealResult = cards;
    idealResult = idealResult.filter(card => card.text === targetAnimal).map(card => card.id);
    return (JSON.stringify(idealResult) === JSON.stringify(tmpResult));
  }


  function handleSelectedCards(cardId) {
    let targetCard = cards.find(card => card.id === cardId);

    if (selectedCards.current.includes(targetCard.id)) {
      selectedCards.current = selectedCards.current.filter(id => id !== targetCard.id);
    } else {
      selectedCards.current.push(targetCard.id);
    }
  }

  return (
    <div className={app.wrapper}>
      {
        (gameState === "finished") ? 
        <>
          {
            (result) ? <h1>You won</h1> : <h1>You lost</h1>
          }
        </> : 
        <h1>&nbsp;</h1>
      }
      
      <div className={app.gameCont}>
        {(gameState === "default") ? <Button text={"Init game"} onChangeState={initGame}/>
        : <>
            <h1>You need to find all cards with {targetAnimal}</h1>
            {
              (gameState === "finished") && <Button text={"Init game"} onChangeState={initGame}/>
            }
            {
              (gameState === "initiated") && <Button text={"Play game"} onChangeState={playGame}/>
            }
            {
              (gameState === "playing") && <Button text={"Finish game"} onChangeState={finishGame}/>
            }
            
            <div className={app.cardCont}>
              {
                cardsArr.map(card => 
                <Card 
                  key={card.id}
                  cardData={card} 
                  gameState={gameState} 
                  onCardSelect={handleSelectedCards}/>
                )
              }
            </div>
          </>
        }
        </div>
    </div>
  );
}

export default App;
