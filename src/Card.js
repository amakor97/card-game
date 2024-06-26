import card from "./card.module.css";

export default function Card({cardData, gameState, onCardSelect}) {
  return (
    <div className={card.card + ((gameState === "playing") ? " "  + card.cardClosed : " ")} onClick={() => onCardSelect(cardData.id)}>
      {cardData.text}
    </div>
  );
}