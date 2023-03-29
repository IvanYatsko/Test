import "./ToDo.scss";

export interface IToDo {
  value: string;
}

function ToDo({ value }: IToDo) {
  return <div>{value}</div>;
}

export default ToDo;
