import * as React from "react";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import { useTheme, useMediaQuery } from "@mui/material";
import { Typography } from "@mui/material";
import "./multi-select.css";
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

//const names = ["mouse", "keyboard", "charger", "power-Bank"];

export default function MultiSelect({ names, onChange, subCategories,defaultValue }) {
  //const [subCategories, setsubCategories] = React.useState([]);

  //   const handleChange = (event) => {
  //     const {
  //       target: { value }
  //     } = event;
  //     setsubCategories(
  //       // On autofill we get a stringified value.
  //       typeof value === "string" ? value.split(",") : value
  //     );
  //   };
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("md"));
  return (
    // <div className={isMatch ? "form-multi-md" : "form-multi"}>
    <div className="style-multibox-select">
      <Box sx={{ width: "40%" }}>
        <Typography variant="p" component="h6" sx={{ fontSize: "110%" }}>
          {"Sub-Categories"}
        </Typography>
      </Box>
      {/* <div > */}
      <Box sx={{ width: "40%" }}>
        <FormControl sx={{  width: 300 }}>
          <InputLabel id="demo-multiple-chip-label">Sub-categories</InputLabel>
          <Select
            sx={{ width: isMatch ? "60%" : "120%" }}
            labelId="demo-multiple-chip-label"
            id="demo-multiple-chip"
            defaultValue={defaultValue}
            multiple
            value={subCategories}
            onChange={onChange}
            input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
            renderValue={(selected) => (
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                {selected.map((value) => (
                  <Chip key={value} label={value} />
                ))}
              </Box>
            )}
            MenuProps={MenuProps}
          >
            {names.map((name) => (
              <MenuItem key={name.id} value={name.id}>
                {name.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      {/* </div> */}
    </div>
  );
}
