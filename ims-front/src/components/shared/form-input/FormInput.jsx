import React from "react";
import "./form-input.css";
import { Typography, TextField, Box } from "@mui/material";
import { useTheme, useMediaQuery } from "@mui/material";

function FormInput({ sideLabel, placeHolder, multiLine, onChange, value, id,defaultValue }) {
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <div className="style-box" >
       <Box sx={{ width: "40%" }}>
      <Typography variant="p" component="h6" sx={{ fontSize: "110%" }}>
        {sideLabel}
      </Typography>
      </Box>

      <Box sx={{ width: "60%" }}>
      {multiLine ? (
        <textarea
       defaultValue={defaultValue}
          placeholder={placeHolder}
          //value={defaultValue}
          onChange={onChange}
          required
         
        ></textarea>
      ) : (
        <input
        defaultValue={defaultValue}
          id={id}
          placeholder={placeHolder}
          //value={value}
          onChange={onChange}
          required
        />
      )}
      </Box>
      </div>
  
  );
}
///className={isMatch ? "form-input-md" : "form-input"}
FormInput.defaultProps = {
  multiLine: false,
  defaultValue:null
};

export default FormInput;
