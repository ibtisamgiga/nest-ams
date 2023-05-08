import * as React from "react";
import Divider from "@mui/material/Divider";
import "./status-header.css";
import { Button, Typography } from "@mui/material";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { useNavigate } from "react-router-dom";
import { useTheme, useMediaQuery } from "@mui/material";

function StatusHeader({ label, heading, status, date,reject ,nobutton,markResolveAction,rejectAction,markText}) {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <div>
      <div className={isMatch ? "upper-form-md" : "upper-form"}>
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
          {label + heading}
        </Typography>

        <Button
          sx={{
            width: "90px",
            backgroundColor: "#5184ec",
            color: "white",
            borderRadius: "5px",
            marginLeft: "20px",
            "&:hover": { backgroundColor: "#5184ec" },
          }}
        >
          {status}
        </Button>
        {date && (
          <Typography
            variant="p"
            component="p"
            sx={{ fontSize: "120%", marginLeft: "10px" }}
          >
            {"Submission Date:" + date}
          </Typography>
        )}
        <div className={isMatch ? "buttongroup-md" : "buttongroup"}>
          {nobutton?null:<Button
          onClick={markResolveAction}
            sx={{
              height: "50px",
              width: "165px",
              backgroundColor: "#2ab38e",
              color: "white",
              borderRadius: "15px",
              marginLeft: "10px",
              "&:hover": { backgroundColor: "#2ab38e" },
            }}
          >
           {markText}
          </Button>}
          {reject && (
            <Button
              sx={{
                height: "50px",
                width: "165px",
                backgroundColor: "red",
                color: "white",
                borderRadius: "15px",
                marginLeft: "10px",
                "&:hover": { backgroundColor: "red" },
              
              }}
              onClick={rejectAction}
            >
              {reject}
            </Button>
          )}
        </div>
      </div>
      <Divider sx={{ borderBottomWidth: 4, marginTop: "20px" }} />
    </div>
  );
}

export default StatusHeader;

StatusHeader.defaultProps={
 markText: "Mark as Resolved"
}
