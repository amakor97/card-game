import btn from "./button.module.css";

export default function Button({text, onChangeState}) {
  return (
    <button className={btn.btn} onClick={onChangeState}>{text}</button>
  );
}