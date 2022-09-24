import React from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  Slider,
} from "@mui/material";

type ControlProps = {
  speed: number;
  setSpeed: (a: number) => void;
  highlighted: number[] | null;
  setLengthOfArr: (a: number) => void;
};

const Controls = (props: ControlProps) => {
  const { speed, setSpeed, highlighted, setLengthOfArr } = props;
  return (
    <div className="controls">
      <FormControl>
        <InputLabel id="demo-simple-select-label" style={{ color: "#aaa" }}>
          Speed
        </InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={speed}
          label="Speed"
          onChange={(event) => setSpeed(Number(event.target.value))}
          style={{ width: "10vw", color: "white" }}
          disabled={!!highlighted}
        >
          <MenuItem value={1000}>Super Slow</MenuItem>
          <MenuItem value={100}>Slow</MenuItem>
          <MenuItem value={10}>Medium</MenuItem>
          <MenuItem value={1}>Fast</MenuItem>
        </Select>
      </FormControl>
      <FormControl>
        <Typography id="input-slider" gutterBottom style={{ marginBottom: 40 }}>
          Size of Array
        </Typography>
        <Slider
          defaultValue={1000}
          step={100}
          min={10}
          max={1000}
          valueLabelDisplay="on"
          onChange={(e, newValue) => setLengthOfArr(Number(newValue))}
          disabled={!!highlighted}
        />
      </FormControl>
    </div>
  );
};

export default React.memo(Controls);
