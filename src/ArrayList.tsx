import { LENGTH, MAX } from "./Constants";

type ArrayListProps = {
  arr: number[];
  hslStart: number;
  current: number;
};

const ArrayList = (props: ArrayListProps) => {
  const { arr, hslStart, current } = props;
  return (
    <div className="array-container">
      {arr.map((i, index) => (
        <div
          style={{
            height: `${(100 * i) / MAX}%`,
            backgroundColor:
              index == current
                ? "var(--selected-item)"
                : `hsl(${hslStart + (i * 50) / MAX}, 100%, 50%)`,
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
