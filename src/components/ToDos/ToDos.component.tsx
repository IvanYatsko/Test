import ToDo from "../ToDo/ToDo.component";
import "./ToDos.scss";

export interface IToDos {
  todos: string[];
}

function ToDos({ todos }: IToDos) {
  return (
    <>
      <div>ToDos:</div>
      {todos.map((value) => (
        <ToDo value={value} />
      ))}
    </>
  );
}

export default ToDos;
