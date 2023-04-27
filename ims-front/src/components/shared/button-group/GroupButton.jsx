import React from "react";
import './group-button.css'
import { IconButton } from "@mui/material";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Add } from "@mui/icons-material";
function GroupButton() {
  return (
    <div className="rowgrp">
      <IconButton  aria-label="delete" size="small"sx={{ color: "#2ab38e"  }}>
        <Add  fontSize="small"  />
      </IconButton>
      <IconButton aria-label="delete" size="small">
        <EditOutlinedIcon fontSize="small" />
      </IconButton>
      <IconButton aria-label="delete" size="small"sx={{ color: "red" }}>
        <DeleteOutlineOutlinedIcon fontSize="small"  />
      </IconButton>
    </div>
  );
}

export default GroupButton;
