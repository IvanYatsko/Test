import { useCallback, useEffect, useMemo, useState } from "react";
import Add from "../Add/Add.component";
import Tags from "../Tags/Tags.component";
import ToDos from "../ToDos/ToDos.component";
import "./Main.scss";

export interface IData {
  todos: ITodosList[];
  tags: string[];
  checkedList: string[];
  checkedVisibleToDo: boolean;
}

export interface ITodosList {
  text: string;
  tags: string[];
}

interface IStyledTags {
  [key: string]: string;
}

export interface IParseTags {
  styledTags: IStyledTags;
  tags: string[];
}

const Main: React.FC = () => {
  const [todos, setTodos] = useState<ITodosList[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [checkedList, setCheckedList] = useState<string[]>(tags);
  const [checkedVisibleToDo, setCheckedVisibleToDo] = useState<boolean>(true);

  useEffect(() => {
    const data: IData = JSON.parse(localStorage.getItem("app_tags") || '{}');
    if (Object.keys(data).length) {
      const { todos, tags, checkedList, checkedVisibleToDo } = data;
      setTodos(todos);
      setTags(tags);
      setCheckedList(checkedList);
      setCheckedVisibleToDo(checkedVisibleToDo);
    }

    return () => localStorage.removeItem("app_tags");
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "app_tags",
      JSON.stringify({ todos, tags, checkedList, checkedVisibleToDo })
    );
  }, [todos, tags, checkedList, checkedVisibleToDo]);

  const parseTags = (text: string) => {
    const hashArr = text.split("#").splice(1);
    const tags = hashArr.map((item) => item.split(/[.,;# ]/g)[0]);
    if (tags) {
      setTags((prev) => Array.from(new Set([...prev, ...tags])));
      setCheckedList((prev) => [...prev, ...tags]);
    }
    const styledTags = tags.reduce((res, tag) => {
      return { ...res, [tag]: `<span class="styled-tag">${tag}</span>` };
    }, {});
    return {styledTags, tags};
  };

  const addToDo = useCallback((text: string) => {
    const {styledTags, tags}: IParseTags = parseTags(text);
    let resultText = Object.keys(styledTags).reduce(
      (res, key) => res.replace(`#${key}`, styledTags[key]),
      text
    );
    setTodos((prev) => [...prev, { text: resultText, tags }]);
  }, []);

  const filterTodos = useMemo(
    () =>
      checkedVisibleToDo
        ? todos
        : todos.filter((todo) =>
            checkedList.some(
              (tag) => todo.text.includes(tag) && todo.tags.includes(tag)
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
    const {styledTags, tags}: IParseTags = parseTags(changeToDo);
    let resultText = Object.keys(styledTags).reduce(
      (res, key) => res.replace(`#${key}`, styledTags[key]),
      changeToDo
    );
    setTodos((prev) =>
      prev.map((item) =>
        item.text === oldToDo ? { text: resultText, tags } : item
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
};

export default Main;
