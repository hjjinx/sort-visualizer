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
    // Math.floor(Math.random() * 360)
    238
  );
  const [highlighted, setHighlighted] = useState<number[] | null>(null);
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

  const sleep = () => new Promise((resolve) => setTimeout(resolve, speed));

  const bubbleSort = () => {
    let i = 0;
    let j = 1;
    let countOfIterations = 0;
    let numberOfSwaps = 0;
    setHighlighted([0]);

    const performBubbleSort = async () => {
      if (i >= array.length - countOfIterations - 1) {
        if (numberOfSwaps == 0) {
          setHighlighted(null);
          return;
        }
        numberOfSwaps = 0;
        countOfIterations++;
        i = 0;
        j = 1;
        setHighlighted([0]);
        await sleep();
      }
      if (array[i] > array[j]) {
        numberOfSwaps++;
        [array[i], array[j]] = [array[j], array[i]];
      }
      setHighlighted((highlighted) => [highlighted![0]! + 1]);
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
            setHighlighted([k, m + 1 + j]);
            await sleep();
          }
          i++;
        } else {
          array[k] = R[j];
          if (k !== m + 1 + j) {
            setHighlighted([k, m + 1 + j]);
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
    setHighlighted([0]);
    await performMergeSort(0, array.length - 1);
    setHighlighted(null);
  };

  const insertionSort = async () => {
    let keyIndex = 1;
    let i = 0;
    while (i <= lengthOfArr) {
      setHighlighted([keyIndex, i]);
      await sleep();
      if (array[i] > array[keyIndex]) {
        let temp = array[i];
        array[i] = array[keyIndex];
        for (let j = i + 1; j < keyIndex + 1; j++) {
          [array[j], temp] = [temp, array[j]];
        }
        keyIndex++;
        i = 0;
        continue;
      }
      if (i == keyIndex - 1) {
        keyIndex++;
        i = 0;
      }
      i++;
      if (keyIndex == array.length) {
        setHighlighted(null);
        return;
      }
    }
  };

  const heapSort = async () => {
    const heapify = async (arr: number[], n: number, i: number) => {
      let largest = i;
      const l = 2 * i + 1;
      const r = 2 * i + 2;

      if (l < n && arr[i] < arr[l]) largest = l;

      if (r < n && arr[largest] < arr[r]) largest = r;

      if (largest != i) {
        setHighlighted([i, largest]);
        await sleep();
        [arr[i], arr[largest]] = [arr[largest], arr[i]];
        await heapify(arr, n, largest);
      }
    };
    const n = array.length;

    for (let i = n / 2 - 1; i >= 0; i--) {
      await heapify(array, n, i);
    }

    for (let i = n - 1; i >= 0; i--) {
      [array[0], array[i]] = [array[i], array[0]];
      await heapify(array, i, 0);
    }
    setHighlighted(null);
  };

  const sort = () => {
    switch (algorithmSelected) {
      case "Bubble":
        bubbleSort();
        break;
      case "Merge":
        mergeSort();
        break;
      case "Insertion":
        insertionSort();
        break;
      case "Heap":
        heapSort();
        break;
    }
  };

  const reset = () => {
    genUnsortedArray();
    setHighlighted(null);
    setHslStart(Math.floor(Math.random() * 360));
  };

  return (
    <div className="App">
      <Header
        algorithmSelected={algorithmSelected}
        setAlgorithmSelected={setAlgorithmSelected}
        sort={sort}
        reset={reset}
        highlighted={highlighted}
      />
      <Typography id="Heading" style={{ marginTop: 20, marginBottom: 20 }}>
        {!!highlighted
          ? "Sorting in Progress. Refresh the page in order to start again."
          : "Select the sorting algorithm from top-left and click the Sort button on top-right to start"}
      </Typography>
      <main className="main">
        <Controls
          speed={speed}
          setSpeed={setSpeed}
          highlighted={highlighted}
          setLengthOfArr={setLengthOfArr}
        />
        <ArrayList hslStart={hslStart} arr={array} highlighted={highlighted!} />
      </main>
    </div>
  );
}

export default App;
