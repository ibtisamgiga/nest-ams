import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { Key } from "@mui/icons-material";
import { Typography, TextField } from "@mui/material";
import "./form-select.css";
import { useTheme, useMediaQuery } from "@mui/material";

export default function FormSelect({
  sideLabel,
  placeHolder,
  items,
  onChange,
  keyId,
  defaultValue
}) {
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <div className="style-box-select" >
      <Box sx={{ width: "40%" }}>
        <Typography variant="p" component="h6" sx={{ fontSize: "110%" }}>
          {sideLabel}
        </Typography>
      </Box>
      <Box sx={{ width: "40%" }}>
        <TextField
          sx={{ width: "30%" }}
          id="demo-simple-select-helper"
          label={placeHolder}
          onChange={onChange}
          defaultValue={defaultValue}
          //defaultValue={''}
          select
        >
          {items.map((val) => {
            if (keyId == 1) {
              return (
                <MenuItem key={val.id} value={val.id}>
                  {val.name}
                </MenuItem>
              );
            }

            return (
              <MenuItem key={val.id} value={val.name}>
                {val.name}
              </MenuItem>
            );
          })}
        </TextField>
      </Box>
    </div>
  );
}
//className={isMatch ? "form-select-md" : "form-select"}