import React from "react";
import "./expand-tables.css";
import { Link, useNavigate } from "react-router-dom";
import { Typography } from "@mui/material";
function ExpandTables({ heading, to }) {
  const navigate = useNavigate();
  return (
    <div className="expand">
      <Typography
        fontWeight={"bold"}
        variant="p"
        component="p"
        sx={{ fontSize: "100%", marginBottom: "3%" }}
      >
        {heading}
      </Typography>
      <Link to={to} style={{ textDecoration: 'none' }}underline="none">
        <Typography
          fontWeight={"bold"}
          variant="p"
          component="p"
          sx={{ fontSize: "100%", marginBottom: "3%", color: "#b7b7b7" }}
          
        >
          {"See all"}
        </Typography>
        {/* <button data-value={to} onClick={handleChange}>
      See all
      </button> */}
      </Link>
    </div>
  );
}

export default ExpandTables;
