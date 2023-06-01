import { Alert, AlertTitle } from "@mui/material";
import React from "react";

function Notifier({ error, success }) {
  return (
    <div>
      {!success ? (
        <div>
          {" "}
          <Alert severity="error">
            <AlertTitle>Error</AlertTitle>
            This is an error alert — <strong>{error}</strong>
          </Alert>{" "}
        </div>
      ) : (
        <div>
          {" "}
          <Alert severity="success">
            <AlertTitle>Success</AlertTitle>
            This is a success alert — <strong>OK!</strong>
          </Alert>
        </div>
      )}
    </div>
  );
}

export default Notifier;
