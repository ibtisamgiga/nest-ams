import { Typography, Divider, Box } from "@mui/material";
import React from "react";
import "./label-text.css";
import { labelTextStyle } from "./style";
function LabelText({ label, content, divider }) {
  return (
    <div>
      <Box sx={labelTextStyle}>
        <Box sx={{ width: "40%" }}>
          <Typography variant="p" component="h6" sx={{ fontSize: "110%" }}>
            {label}
          </Typography>
        </Box>
        <Box sx={{ width: "60%" }}>
          <Typography variant="content">{content}</Typography>
        </Box>
      </Box>
      {divider ? (
        <Divider sx={{ borderBottomWidth: 2, marginTop: "20px" }} />
      ) : null}
    </div>
  );
}

export default LabelText;
