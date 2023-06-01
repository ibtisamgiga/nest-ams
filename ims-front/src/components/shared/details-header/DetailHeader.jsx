import * as React from "react";
import Divider from "@mui/material/Divider";
import "./detail-header.css";
import { Button, Typography } from "@mui/material";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { useNavigate } from "react-router-dom";
import { useTheme, useMediaQuery } from "@mui/material";
import MenueButton from "../menue-button/MenueButton";
import AlertDialog from "../dialouge/Dialouge";
function DetailHeader({ heading,editAction,deleteAction,open,closeAction,openAction }) {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <div>
      <div className={isMatch ? "upper-detail-md" : "upper-detail"}>
        {isMatch ? null : (
          <Button
            onClick={() => navigate(-1)}
            sx={{ color: "gray" }}
            startIcon={
              <KeyboardBackspaceIcon fontSize="small" sx={{ color: "gray" }} />
            }
          >
            Back
          </Button>
        )}
        <Typography
          variant="h3"
          component="h3"
          sx={{ fontWeight: "bold", fontSize: "150%", marginLeft: "10px" }}
        >
          {heading}
        </Typography>
        <div className="buttongroup">
          <MenueButton editAction={editAction} deleteAction={openAction} />
        </div>
        <>
        <AlertDialog open={open} closeAction={closeAction} deleteAction={deleteAction}/>
        </>
      </div>
      <Divider sx={{ borderBottomWidth: 4, marginTop: "20px" }} />
    </div>
  );
}

export default DetailHeader;
