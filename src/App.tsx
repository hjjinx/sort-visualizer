import { useEffect, useState } from "react";
import "./App.css";

const LENGTH = 100;

function App() {
  const [arr, setArr] = useState<number[]>();
  const genUnsortedArray = () => {
    setArr(
      Array.from(
        {
          length: LENGTH,
        },
        () => Math.floor(Math.random() * 1000)
      )
    );
  };
  console.log({ arr });
  useEffect(genUnsortedArray, []);
  return (
    <div className="App">
      <main className="main"></main>
    </div>
  );
}

export default App;
