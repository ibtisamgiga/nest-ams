import * as React from "react";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
export default function EndIconButton(title,icon) {
  const style = {
    background: "#2ab38e",
    padding: "15px",
    width: "100px",
    borderRadius: "10px",
    position:'absolute',right:'0'
  };
  return (
    <Button sx={style} variant="contained" endIcon={icon}>
      {title}
    </Button>
  );
}
//<AddIcon />