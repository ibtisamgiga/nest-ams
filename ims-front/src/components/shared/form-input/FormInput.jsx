import React from "react";
import "./form-input.css";
import { Typography, TextField, Box } from "@mui/material";
import { useTheme, useMediaQuery } from "@mui/material";
import { type } from "../../../utils/enums/statusEnum";

function FormInput({
  sideLabel,
  placeHolder,
  multiLine,
  onChange,
  value,
  id,
  defaultValue,
  type,
  minLength,
  maxLength,
  pattren,
  title,
}) {
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <div className="style-box">
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
            title={title}
            type={type}
            pattern={pattren}
            minLength={minLength}
            maxLength={maxLength}
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
  defaultValue: null,
  type: "text",
  minLength: null,
  maxLength: null,
};

export default FormInput;
