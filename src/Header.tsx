import { Tabs, Tab, Button } from "@mui/material";
import React from "react";

type HeaderProps = {
  algorithmSelected: string;
  setAlgorithmSelected: (a: string) => void;
  current: number[] | null;
  sort: () => void;
  reset: () => void;
};

const Header = (props: HeaderProps) => {
  const { algorithmSelected, setAlgorithmSelected, current, sort, reset } =
    props;
  return (
    <div className="header">
      <div style={{ flex: 1 }}>
        <Tabs
          value={algorithmSelected}
          onChange={(e, newValue) => setAlgorithmSelected(newValue)}
          aria-label="basic tabs example"
          style={{ marginTop: 10 }}
        >
          <Tab label="Merge Sort" value="Merge" disabled={!!current} />
          <Tab label="Bubble Sort" value="Bubble" disabled={!!current} />
          <Tab label="Insertion Sort" value="Insertion" disabled={!!current} />
          <Tab label="Heap Sort" value="Heap" disabled={!!current} />
        </Tabs>
      </div>
      <div>
        <Button
          variant="contained"
          onClick={sort}
          color="success"
          disabled={!!current}
        >
          Sort
        </Button>
        <Button
          variant="contained"
          onClick={reset}
          color="error"
          disabled={!!current}
        >
          Restart
        </Button>
      </div>
    </div>
  );
};

export default React.memo(Header);
