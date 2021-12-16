import React from "react";
import { Grid } from "@mui/material";

const time = [
  {
    name: "24 giờ",
    value: 1,
  },
  {
    name: "30 ngày",
    value: 30,
  },
  {
    name: "3 tháng",
    value: 90,
  },
  {
    name: "1 năm",
    value: 365,
  },
];

const SelectButton = ({ days, onDaysChange }) => {
  return (
    <Grid container spacing={1} mt={2}>
      {time.map((item) => {
        return (
          <Grid item sm md key={item.value}>
            <button
              onClick={() => onDaysChange(item.value)}
              className={item.value === days ? "btn btn--active" : "btn"}
            >
              {item.name}
            </button>
          </Grid>
        );
      })}
    </Grid>
  );
};

export default SelectButton;
