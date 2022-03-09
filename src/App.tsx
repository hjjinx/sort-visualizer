import { useEffect, useState } from "react";
import { LENGTH, MAX } from "./Constants";
import "./App.css";
import ArrayList from "./ArrayList";

function App() {
  const [arr, setArr] = useState<number[]>([]);
  const [hslStart, setHslStart] = useState<number>(
    Math.floor(Math.random() * 360)
  );
  const [current, setCurrent] = useState<number | null>(null);
  const genUnsortedArray = () => {
    setArr(
      Array.from(
        {
          length: LENGTH,
        },
        () => Math.floor(Math.random() * MAX)
      )
    );
  };

  useEffect(genUnsortedArray, []);

  const bubbleSort = () => {
    if (current) return;
    let i = 0;
    let j = 1;
    let countOfIterations = 0;
    let numberOfSwaps = 0;
    setCurrent(0);

    const performBubbleSort = () => {
      if (i == arr.length - countOfIterations) {
        console.log({ numberOfSwaps });
        if (numberOfSwaps == 0) {
          setCurrent(null);
          return;
        }
        numberOfSwaps = 0;
        countOfIterations++;
        i = 0;
        j = 1;
        setCurrent(0);
      }
      if (arr[i] > arr[j]) {
        numberOfSwaps++;
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
      setArr(arr);
      setCurrent((current) => current! + 1);
      i++;
      j++;
      setTimeout(performBubbleSort, 1);
    };

    performBubbleSort();
  };

  return (
    <div className="App">
      <button onClick={bubbleSort}>Bubble Sort</button>
      <main className="main">
        <ArrayList hslStart={hslStart} arr={arr} current={current!} />
      </main>
    </div>
  );
}

export default App;
