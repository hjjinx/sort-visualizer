import { useEffect, useState } from "react";
import { LENGTH, MAX } from "./Constants";
import "./App.css";
import ArrayList from "./ArrayList";

function App() {
  const [arr, setArr] = useState<number[]>([]);
  const [hslStart, setHslStart] = useState<number>(
    Math.floor(Math.random() * 360)
  );
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
  return (
    <div className="App">
      <main className="main">
        <ArrayList hslStart={hslStart} arr={arr} />
      </main>
    </div>
  );
}

export default App;
