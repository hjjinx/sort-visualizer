import { LENGTH, MAX } from "./Constants";

type ArrayListProps = {
  arr: number[];
  hslStart: number;
};

const ArrayList = (props: ArrayListProps) => {
  const { arr, hslStart } = props;
  return (
    <div className="array-container">
      {arr.map((i) => (
        <div
          style={{
            height: `${(100 * i) / MAX}%`,
            width: `${LENGTH / 100}%`,
            backgroundColor: `hsl(${hslStart + (i * 50) / MAX}, 100%, 50%)`,
          }}
          className="item"
        >
          {" "}
        </div>
      ))}
    </div>
  );
};

export default ArrayList;
