import { useCallback } from "react";
import UButton from "../UI/UButton/UButton.component";
import USelect from "../UI/USelect/USelect.component";
import "./Filter.scss";

export interface IFilter {
  tags: string[];
}

function Filter({ tags }: IFilter) {
  const onClickFilter = useCallback(() => {
    
  }, []);
  const onClickClear = useCallback(() => {}, []);

  return (
    <div className="container">
      <USelect tags={tags} isMultiple={true} />
      <UButton text="Filter" onClick={onClickFilter} />
      <UButton text="Clear" onClick={onClickClear} />
    </div>
  );
}

export default Filter;
