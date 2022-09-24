import { Tabs, Tab, Button } from "@mui/material";
import React from "react";

type HeaderProps = {
  algorithmSelected: string;
  setAlgorithmSelected: (a: string) => void;
  highlighted: number[] | null;
  sort: () => void;
  reset: () => void;
};

const Header = (props: HeaderProps) => {
  const { algorithmSelected, setAlgorithmSelected, highlighted, sort, reset } =
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
          <Tab label="Merge Sort" value="Merge" disabled={!!highlighted} />
          <Tab label="Bubble Sort" value="Bubble" disabled={!!highlighted} />
          <Tab
            label="Insertion Sort"
            value="Insertion"
            disabled={!!highlighted}
          />
          <Tab label="Heap Sort" value="Heap" disabled={!!highlighted} />
        </Tabs>
      </div>
      <div>
        <Button
          variant="contained"
          onClick={sort}
          color="success"
          disabled={!!highlighted}
        >
          Sort
        </Button>
        <Button
          variant="contained"
          onClick={reset}
          color="error"
          disabled={!!highlighted}
        >
          Restart
        </Button>
      </div>
    </div>
  );
};

export default React.memo(Header);
