import * as React from "react";
import Divider from "@mui/material/Divider";
import { useState } from "react";
import "./form-image.css";
import ReactFileReader from "react-file-reader";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { Button, Typography } from "@mui/material";
import { AvatarInput } from "../../../constants/organizationConst";
import { useTheme, useMediaQuery } from "@mui/material";
import { formStyle, formStyleMd } from "../../../constants/formImageConst";

function FormImageHolder({ handleFiles, image, label ,subLabel}) {
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <div>
      <div className="imageHolder">
        <AvatarInput>
          <img src={image} alt="Avatar Placeholder" />
        </AvatarInput>

        <ReactFileReader
          fileTypes={[".png", ".jpg"]}
          base64={true}
          handleFiles={handleFiles}
        >
          <Button
            variant="contained"
            startIcon={<AddPhotoAlternateIcon />}
            sx={isMatch ? formStyleMd : formStyle}
          >
            Upload
          </Button>
        </ReactFileReader>
        <div className="textContent">
          <Typography variant="h6" component="h6" sx={{ fontWeight: "bold" }}>
            {label}
            <span style={{ color: "red" }}>*</span>
          </Typography>
          <Typography
            variant="p"
            component="p"
            sx={{ fontWeight: "bold", color: "#a2a2a2" }}
          >
            {isMatch
              ? ""
              : subLabel}
          </Typography>
        </div>
      </div>
      <Divider sx={{ borderBottomWidth: 4, marginTop: "10px" }} />
    </div>
  );
}

export default FormImageHolder;
