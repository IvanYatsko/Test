import "./UButton.scss";

export interface IUButton {
  text: string;
  onClick: () => void;
}

function UButton({ text, onClick }: IUButton) {
  return <button className="button" onClick={onClick}>{text}</button>;
}

export default UButton;
