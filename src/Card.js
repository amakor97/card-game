import card from "./card.module.css";

export default function Card({cardData, state}) {
  console.log(state);
  return (
    <div className={card.card + ((state === "opened") ? " " : " " + card.cardClose)}>
      {cardData.text}
    </div>
  );
}