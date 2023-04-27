import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { Key } from "@mui/icons-material";

export default function SelectField({ fieldName, items, handleSelect }) {
  const [value, setValue] = React.useState("");

  const handleChange = (event) => {
    setValue(event.target.value);
    handleSelect();
  };

  return (
    <Box
      sx={{
        marginLeft: "15px",
        marginTop: "10px",
        minWidth: "250px",
        marginBottom: "10px",
      }}
    >
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-helper-label">
          {fieldName}
        </InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={value}
          label={fieldName}
          onChange={(e) => {
            handleSelect(e);
            setValue(e.target.value);
          }}
        >
          {items.map((val) => {
            return (
              <MenuItem key={val} value={val}>
                {val}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </Box>
  );
}
