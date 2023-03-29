import { CloseOutlined } from "@ant-design/icons";
import { Button, Checkbox, Col, Row } from "antd";
import { CheckboxValueType } from "antd/es/checkbox/Group";
import "./Tags.scss";

export interface ITags {
  tags: string[];
  checkedList: CheckboxValueType[];
  setCheckedList: React.Dispatch<React.SetStateAction<string[]>>;
  deleteTag: (tag: string) => void;
}

function Tags({ tags, checkedList, setCheckedList, deleteTag }: ITags) {
  const onChange = (list: CheckboxValueType[]) => {
    setCheckedList(list as string[]);
  };

  return (
    <>
      <Checkbox.Group
        style={{ width: "100%" }}
        value={checkedList}
        onChange={onChange}
      >
        <Row>
          {tags.map((tag) => (
            <Col key={tag} className="col">
              <Checkbox value={tag}>{tag}</Checkbox>
              <Button type="link" icon={<CloseOutlined />} onClick={() => deleteTag(tag)} />
            </Col>
          ))}
        </Row>
      </Checkbox.Group>
    </>
  );
}

export default Tags;
