import React from "react";
import { MAX } from "./Constants";

type ArrayListProps = {
  arr: number[];
  hslStart: number;
  highlighted: number[];
};

const ArrayList = (props: ArrayListProps) => {
  const { arr, hslStart, highlighted } = props;
  return (
    <div className="array-container">
      {arr.map((i, index) => {
        const heightBy2 = (50 * i) / MAX;
        return (
          <div
            style={{
              height: `${heightBy2 * 2}%`,
              backgroundColor: highlighted?.includes(index)
                ? "var(--selected-item)"
                : `hsl(${hslStart + heightBy2}, 100%, 50%)`,
            }}
            className="item"
            key={`item-` + index}
          >
            {" "}
          </div>
        );
      })}
    </div>
  );
};

export default React.memo(ArrayList);
