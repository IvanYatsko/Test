import "./Tags.scss";

export interface ITags {
  tags: string[];
}

function Tags({ tags }: ITags) {
  return (
    <div>
      {tags.map((value) => (
        <div>{value}</div>
      ))}
    </div>
  );
}

export default Tags;
