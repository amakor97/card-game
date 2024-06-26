import card from "./card.module.css";

import { useState } from "react";


export default function Card({cardData, gameState, onCardSelect}) {
  const [isClicked, setIsClicked] = useState(false);

  if (gameState === "initiated" && isClicked) {
    setIsClicked(false);
  }

  return (
    <button 
      className={card.card + ((gameState === "playing") ? " "  + card.cardClosed : " ") + ((isClicked) ? " "  + card.isClicked : " ")} 
      onClick={() => {
        setIsClicked(!isClicked);
        onCardSelect(cardData.id);}
      } 
      disabled={(gameState !== "playing")}>
      {cardData.text}
    </button>
  );
}