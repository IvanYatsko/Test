import { useCallback, useState } from "react";
import UButton from "../UI/UButton/UButton.component";
import UInput from "../UI/UInput/UInput.component";
import "./Add.scss";

export interface IAdd {
  add: (text: string) => void;
}

function Add({ add }: IAdd) {
  const [getValue, setValue] = useState<string>("");

  const onClick = useCallback(() => {
    if (getValue) {
      add(getValue);
      setValue("");
    }
  }, [add, getValue]);

  return (
    <div className="add">
      <UInput getValue={getValue} setValue={setValue} />
      <UButton text="Add ToDo" onClick={onClick} />
    </div>
  );
}

export default Add;
