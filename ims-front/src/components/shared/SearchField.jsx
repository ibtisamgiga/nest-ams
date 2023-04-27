import React from "react";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import { TextField } from "@mui/material";
// render

function SearchField({ setSearchData }) {
  return (
    <TextField
      sx={{ marginLeft: "15px", marginTop: "10px" }}
      label="Search"
      size="normal"
      onChange={setSearchData}
      InputProps={{
        endAdornment: (
          <InputAdornment>
            <SearchIcon color="blue" />
          </InputAdornment>
        ),
      }}
    />
  );
}

export default SearchField;
