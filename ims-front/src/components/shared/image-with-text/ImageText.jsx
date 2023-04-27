import { Avatar, Box, Typography } from "@mui/material";
import React from "react";
import "./image-text.css";
function ImageText({ image, name, email, number }) {
  return (
    <Box className={"content-holder"}>
      <Avatar
        alt="Remy Sharp"
        src={image}
        sx={{ width: 120, height: 120, borderRadius: "15px" }}
        variant="square"
      />
      <Box className={"text-area"}>
        <Typography
          variant="h3"
          component="h3"
          sx={{ fontWeight: "bold", fontSize: "150%", marginBottom: "3%" }}
        >
          {name}
        </Typography>
        <Typography variant="p" component="p">
          {email}
        </Typography>
        <Typography variant="p" component="p">
          {number}
        </Typography>
      </Box>
    </Box>
  );
}

export default ImageText;
