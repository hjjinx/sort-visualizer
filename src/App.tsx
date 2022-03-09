import { useEffect, useState } from "react";
import { LENGTH, MAX } from "./Constants";
import "./App.css";
import ArrayList from "./ArrayList";

function App() {
  const [initialArray, setInitialArray] = useState<number[]>([]);
  const [hslStart, setHslStart] = useState<number>(
    Math.floor(Math.random() * 360)
  );
  const [current, setCurrent] = useState<number[] | null>(null);
  const [speed, setSpeed] = useState(1);
  const genUnsortedArray = () => {
    setInitialArray(
      Array.from(
        {
          length: LENGTH,
        },
        () => Math.floor(Math.random() * MAX)
      )
    );
  };

  const sleep = () => new Promise((resolve) => setTimeout(resolve, speed));

  useEffect(genUnsortedArray, []);

  const bubbleSort = () => {
    if (current) return;
    let i = 0;
    let j = 1;
    let countOfIterations = 0;
    let numberOfSwaps = 0;
    setCurrent([0]);

    const performBubbleSort = () => {
      if (i == initialArray.length - countOfIterations) {
        console.log({ numberOfSwaps });
        if (numberOfSwaps == 0) {
          setCurrent(null);
          return;
        }
        numberOfSwaps = 0;
        countOfIterations++;
        i = 0;
        j = 1;
        setCurrent([0]);
      }
      if (initialArray[i] > initialArray[j]) {
        numberOfSwaps++;
        [initialArray[i], initialArray[j]] = [initialArray[j], initialArray[i]];
      }
      setInitialArray(initialArray);
      setCurrent((current) => [current![0]! + 1]);
      i++;
      j++;
      setTimeout(performBubbleSort, 1);
    };

    performBubbleSort();
  };

  const mergeSort = async () => {
    const merge = async (l: number, m: number, r: number) => {
      let n1 = m - l + 1;
      let n2 = r - m;
      // Create temp arrays
      let L = initialArray.slice(l, l + n1);
      let R = initialArray.slice(m + 1, m + 1 + n2);

      let i = 0;
      let j = 0;
      let k = l;

      while (i < n1 && j < n2) {
        if (L[i] <= R[j]) {
          console.log({ i, j, k });
          initialArray[k] = L[i];
          if (k !== i + l) {
            setCurrent([k, m + 1 + j]);
            await sleep();
          }
          i++;
        } else {
          console.log({ i, j, k });
          initialArray[k] = R[j];
          if (k !== m + 1 + j) {
            setCurrent([k, m + 1 + j]);
            await sleep();
          }
          j++;
        }
        k++;
      }

      while (i < n1) {
        initialArray[k] = L[i];
        i++;
        k++;
      }

      while (j < n2) {
        initialArray[k] = R[j];
        j++;
        k++;
      }
    };
    const performMergeSort = async (l: number, r: number) => {
      if (l >= r) return;
      const m = Math.floor(l + (r - l) / 2);
      await performMergeSort(l, m);
      await performMergeSort(m + 1, r);
      await merge(l, m, r);
      console.log({ initialArray });
    };
    await performMergeSort(0, initialArray.length - 1);
    setCurrent(null);
  };

  return (
    <div className="App">
      <button onClick={bubbleSort}>Bubble Sort</button>
      <button onClick={mergeSort}>Merge Sort</button>
      <main className="main">
        <ArrayList hslStart={hslStart} arr={initialArray} current={current!} />
      </main>
    </div>
  );
}

export default App;
