import { Button, Input, Space } from "antd";
import { useCallback, useState } from "react";

export interface IAdd {
  add: (text: string) => void;
}

const Add: React.FC<IAdd> = ({ add }: IAdd) => {
  const [getValue, setValue] = useState<string>("");

  const onChangeInput = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setValue(e.target.value);
  };

  const onClick = useCallback(() => {
    if (getValue) {
      add(getValue);
      setValue("");
    }
  }, [add, getValue]);

  return (
    <Space.Compact style={{ width: "100%" }}>
      <Input
        value={getValue}
        onChange={onChangeInput}
        placeholder="Enter ToDo"
      />
      <Button type="primary" onClick={onClick}>
        Add ToDo
      </Button>
    </Space.Compact>
  );
};

export default Add;
