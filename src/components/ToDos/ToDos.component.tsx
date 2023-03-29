import { CloseOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Divider, Input, List, Space, Switch } from "antd";
import { useState } from "react";
import { ITodosList } from "../Main/Main.component";
import "./ToDos.scss";

export interface IToDos {
  todos: ITodosList[];
  checkedVisibleToDo: boolean;
  onChangeVisibleToDo: (checked: boolean) => void;
  deleteToDo: (todo: string) => void;
  onChangeToDo: (changeToDo: string, oldToDo: string) => void;
}

function ToDos({
  todos,
  checkedVisibleToDo,
  onChangeVisibleToDo,
  deleteToDo,
  onChangeToDo,
}: IToDos) {
  const [editToDo, setEditToDo] = useState<boolean>(false);
  const [editToDoText, setEditToDoText] = useState<string>("");
  const [editText, setEditText] = useState<string>("");

  const changeToDo = (todo: string) => {
    setEditToDo((prev) => !prev);
    setEditToDoText(todo);
    setEditText(todo);
  };

  const saveToDo = (oldToDo: string) => {
    onChangeToDo(editToDoText, oldToDo);
    setEditToDoText("");
    setEditToDo((prev) => !prev);
  };

  return (
    <>
      <Divider orientation="left">ToDos:</Divider>
      <div className="view-all">
        <Switch checked={checkedVisibleToDo} onChange={onChangeVisibleToDo} />
        <span className="view-all__text">View All ToDos</span>
      </div>
      <List
        bordered
        dataSource={todos}
        renderItem={(item) => (
          <List.Item className="todo-container">
            {editToDo && editText === item.text ? (
              <Space.Compact style={{ width: "100%" }}>
                <Input
                  value={editToDoText}
                  onChange={(e) => setEditToDoText(e.target.value)}
                  placeholder="Change ToDo"
                />
                <Button type="primary" onClick={() => saveToDo(item.text)}>
                  Save
                </Button>
              </Space.Compact>
            ) : (
              <>
                <div>{item.text}</div>
                <div>
                  <Button
                    type="link"
                    icon={<EditOutlined />}
                    onClick={() => changeToDo(item.text)}
                  />
                  <Button
                    type="link"
                    icon={<CloseOutlined />}
                    onClick={() => deleteToDo(item.text)}
                  />
                </div>
              </>
            )}
          </List.Item>
        )}
      />
    </>
  );
}

export default ToDos;
