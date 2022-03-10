import { useEffect, useState } from "react";
import { LENGTH, MAX } from "./Constants";
import "./App.css";
import ArrayList from "./ArrayList";
import Header from "./Header";
import Controls from "./Controls";
import { Typography } from "@mui/material";

function App() {
  const [array, setArray] = useState<number[]>([]);
  const [algorithmSelected, setAlgorithmSelected] = useState("Merge");
  const [hslStart, setHslStart] = useState<number>(
    Math.floor(Math.random() * 360)
  );
  const [current, setCurrent] = useState<number[] | null>(null);
  const [speed, setSpeed] = useState(1);
  const [lengthOfArr, setLengthOfArr] = useState(LENGTH);
  const genUnsortedArray = () => {
    setArray(
      Array.from(
        {
          length: lengthOfArr,
        },
        () => Math.floor(Math.random() * MAX)
      )
    );
  };

  useEffect(genUnsortedArray, [lengthOfArr]);
  useEffect(genUnsortedArray, []);

  const sleep = () => new Promise((resolve) => setTimeout(resolve, speed));

  const bubbleSort = () => {
    let i = 0;
    let j = 1;
    let countOfIterations = 0;
    let numberOfSwaps = 0;
    setCurrent([0]);

    const performBubbleSort = async () => {
      if (i >= array.length - countOfIterations - 1) {
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
        await sleep();
      }
      if (array[i] > array[j]) {
        numberOfSwaps++;
        [array[i], array[j]] = [array[j], array[i]];
      }
      setArray(array);
      setCurrent((current) => [current![0]! + 1]);
      await sleep();
      i++;
      j++;
      performBubbleSort();
    };

    performBubbleSort();
  };

  const mergeSort = async () => {
    const merge = async (l: number, m: number, r: number) => {
      let n1 = m - l + 1;
      let n2 = r - m;
      // Create temp arrays
      let L = array.slice(l, l + n1);
      let R = array.slice(m + 1, m + 1 + n2);

      let i = 0;
      let j = 0;
      let k = l;

      while (i < n1 && j < n2) {
        if (L[i] <= R[j]) {
          array[k] = L[i];
          if (k !== i + l) {
            setCurrent([k, m + 1 + j]);
            await sleep();
          }
          i++;
        } else {
          array[k] = R[j];
          if (k !== m + 1 + j) {
            setCurrent([k, m + 1 + j]);
            await sleep();
          }
          j++;
        }
        k++;
      }

      while (i < n1) {
        array[k] = L[i];
        i++;
        k++;
      }

      while (j < n2) {
        array[k] = R[j];
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
    };
    setCurrent([0]);
    await performMergeSort(0, array.length - 1);
    setCurrent(null);
  };

  const sort = () => {
    switch (algorithmSelected) {
      case "Bubble":
        bubbleSort();
        break;
      case "Merge":
        mergeSort();
        break;
    }
  };

  const reset = () => {
    genUnsortedArray();
    setCurrent(null);
    setHslStart(Math.floor(Math.random() * 360));
  };

  return (
    <div className="App">
      <Header
        algorithmSelected={algorithmSelected}
        setAlgorithmSelected={setAlgorithmSelected}
        sort={sort}
        reset={reset}
        current={current}
      />
      <Typography
        id="Heading"
        gutterBottom
        style={{ marginTop: 20, marginBottom: 20 }}
      >
        {!!current
          ? "Sorting in Progress. Refresh the page in order to start again."
          : "Select the sorting algorithm from top-left and click the Sort button on top-right to start"}
      </Typography>
      <main className="main">
        <Controls
          speed={speed}
          setSpeed={setSpeed}
          current={current}
          setLengthOfArr={setLengthOfArr}
        />
        <ArrayList hslStart={hslStart} arr={array} current={current!} />
      </main>
    </div>
  );
}

export default App;
