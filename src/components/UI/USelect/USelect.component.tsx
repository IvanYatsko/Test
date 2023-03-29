import "./USelect.scss";

export interface IUSelect {
  isMultiple?: boolean;
  tags: string[];
}

function USelect({ isMultiple = false, tags }: IUSelect) {
    console.log(tags)
  return (
    <select name="select" multiple={isMultiple}>
      {tags.map((value) => (
        <option key={value} value={value}>
          {value}
        </option>
      ))}
    </select>
  );
}

export default USelect;
