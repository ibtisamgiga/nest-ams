import { Box } from "@mui/material";
import React from "react";
import DownloadIcon from "@mui/icons-material/Download";
import jsPDF from "jspdf";

function DownloadHeading({ complainAction, categoryAction }) {
  return (
    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          width: "50%",
          margin: "10px",
        }}
      >
        <h4>Invenotry Items</h4>
        <p>
          download report
          <span>
            <DownloadIcon fontSize="12px" onClick={categoryAction} />
          </span>
        </p>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          width: "50%",
          margin: "10px",
        }}
      >
        <h4>Complaints</h4>
        <p>
          download report
          <span>
            <DownloadIcon fontSize="12px" onClick={complainAction} />
          </span>
        </p>
      </Box>
    </Box>
  );
}

export default DownloadHeading;
