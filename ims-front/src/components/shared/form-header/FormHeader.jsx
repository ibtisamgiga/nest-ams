import * as React from "react";
import Divider from "@mui/material/Divider";
import "./form-header.css";
import { Button, Typography } from "@mui/material";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { useNavigate } from "react-router-dom";
import { useTheme, useMediaQuery } from "@mui/material";
function FormHeader({ heading,form }) {
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
          {heading}
        </Typography>
        <div className={isMatch ? "buttongroup-md" : "buttongroup"}>
          <Button
            sx={{
              height: "50px",
              width: "100px",
              backgroundColor: "#f3f3f3",
              color: "#a4a4a4",
              "&:hover": { backgroundColor: "#f3f3f3" },
              borderRadius: "15px",
            }}
          >
            Cancel
          </Button>
          <Button
          form={form}
          type="submit"
            sx={{
              height: "50px",
              width: "100px",
              backgroundColor: "#2ab38e",
              color: "white",
              borderRadius: "15px",
              marginLeft: "10px",
              "&:hover": { backgroundColor: "#2ab38e" },
            }}
            
          >
            Save
          </Button>
        </div>
      </div>
      <Divider sx={{ borderBottomWidth: 4, marginTop: "20px" }} />
    </div>
  );
}

export default FormHeader;
