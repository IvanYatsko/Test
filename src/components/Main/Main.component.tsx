import { useCallback, useMemo, useState } from "react";
import Add from "../Add/Add.component";
import Tags from "../Tags/Tags.component";
import ToDos from "../ToDos/ToDos.component";
import "./Main.scss";

export interface ITodosList {
  text: string;
  tag: string | null;
}

function Main() {
  const [todos, setTodos] = useState<ITodosList[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [checkedList, setCheckedList] = useState<string[]>(tags);
  const [checkedVisibleToDo, setCheckedVisibleToDo] = useState<boolean>(true);

  const parseTags = (text: string) => {
    const hash = text.indexOf("#");
    const cutText = text.slice(hash + 1);
    const tag = cutText.split(/[.,;# ]/g)[0];
    if (tag && hash !== -1) {
      setTags((prev) => [...prev, tag]);
      setCheckedList((prev) => [...prev, tag]);
    }
    return tag;
  };

  const addToDo = useCallback((text: string) => {
    const tag = parseTags(text);
    setTodos((prev) => [
      ...prev,
      { text: text.replace("#", ""), tag: tag || null },
    ]);
  }, []);

  const filterTodos = useMemo(
    () =>
      checkedVisibleToDo
        ? todos
        : todos.filter((todo) =>
            checkedList.some(
              (tag) => todo.text.includes(tag) && tag === todo.tag
            )
          ),
    [checkedList, checkedVisibleToDo, todos]
  );

  const deleteTag = (tag: string) => {
    setTags((prev) => prev.filter((value) => value !== tag));
    setCheckedList((prev) => prev.filter((value) => value !== tag));
  };

  const deleteToDo = (todo: string) => {
    setTodos((prev) => prev.filter((item) => item.text !== todo));
  };

  const onChangeToDo = (changeToDo: string, oldToDo: string) => {
    setTodos((prev) =>
      prev.map((item) =>
        item.text === oldToDo
          ? { text: changeToDo.replace("#", ""), tag: parseTags(changeToDo) }
          : item
      )
    );
  };

  const onChangeVisibleToDo = (checked: boolean) => {
    setCheckedVisibleToDo(checked);
  };

  return (
    <div className="wrapper">
      <div className="wrapper-app">
        <Add add={addToDo} />
      </div>
      <Tags
        tags={tags}
        checkedList={checkedList}
        setCheckedList={setCheckedList}
        deleteTag={deleteTag}
      />
      <ToDos
        todos={filterTodos}
        checkedVisibleToDo={checkedVisibleToDo}
        onChangeVisibleToDo={onChangeVisibleToDo}
        deleteToDo={deleteToDo}
        onChangeToDo={onChangeToDo}
      />
    </div>
  );
}

export default Main;
