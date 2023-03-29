import { useCallback, useState } from "react";
import Add from "../Add/Add.component";
import Filter from "../Filter/Filter.component";
import Tags from "../Tags/Tags.component";
import ToDos from "../ToDos/ToDos.component";
import "./Main.scss";

function Main() {
  const [todos, setTodos] = useState<string[]>([]);
  const [tags, setTags] = useState<string[]>(["bug", "feature"]);

  const addToDo = useCallback((text: string) => {
    const hash = text.indexOf("#");
    if (hash !== -1) {
      const cutText = text.slice(hash + 1);
      const tag = cutText.split(/[.,;# ]/g)[0];
      setTags((prev) => [...prev, tag]);
    }

    setTodos((prev) => [...prev, text.replace("#", "")]);
  }, []);

  return (
    <div className="wrapper">
      <div>
        <Add add={addToDo} />
      </div>
      <Filter tags={tags} />
      <Tags tags={tags} />
      <ToDos todos={todos} />
    </div>
  );
}

export default Main;
