import { useState } from "react";
import "./UInput.scss";

export interface IUInput {
  type?: string;
  getValue: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
}

function UInput({ type = "text", getValue, setValue }: IUInput) {
  return (
    <input
      value={getValue}
      onChange={(e) => setValue(e.target.value)}
      type={type}
    />
  );
}

export default UInput;
