import React from "react";
import { Avatar, Typography } from "@mui/material";

function UserDetailText({ heading1, heading2, content1, content2 }) {
  return (
    <div className="ud-text-col">
      <Typography variant="p" component="p" sx={{ fontSize: "100%" }}>
        {heading1}
      </Typography>

      <Typography
        fontWeight={"bold"}
        variant="p"
        component="p"
        sx={{ fontSize: "100%", marginBottom: "3%" }}
      >
        {content1}
      </Typography>

      <Typography variant="p" component="p" sx={{ fontSize: "100%" }}>
        {heading2}
      </Typography>

      <Typography
        fontWeight={"bold"}
        variant="p"
        component="p"
        sx={{ fontSize: "100%", marginBottom: "3%" }}
      >
        {content2}
      </Typography>
    </div>
  );
}

export default UserDetailText;
