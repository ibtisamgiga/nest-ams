import * as React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

export default function CircularLoader({ size, display, left }) {
  return !left ? (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <CircularProgress size={size} />
    </Box>
  ) : (
    <Box sx={{ display: "flex", justifyContent: "left" }}>
      <CircularProgress size={size} />
    </Box>
  );
}
CircularLoader.defaultPropTypes = {
  display: "center",
  size: "4rem",
};
