import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import { Margin } from "@mui/icons-material";

export default function DataCard({
  border,
  name,
  totalCount,
  monthDifference,
  arrowColor
}) {
  return (
    <div>
      <Card
        sx={{
          alignContent: "center",
          borderRight: border,
          boxShadow: "none",
          borderRadius: "0px",
        }}
      >
        <CardContent sx={{ marginRight: "100px" }}>
          <Typography sx={{ fontWeight: "400" }}>{name}</Typography>
          <Typography
            variant="h1"
            component="h1"
            sx={{ fontWeight: "bold", fontSize: "50px" }}
          >
            <span>
              {totalCount}
              <ArrowDropUpIcon
                sx={{ fontWeight: "bold", fontSize: 50, color: arrowColor }}
              />{" "}
            </span>
          </Typography>
          <Typography component="p" sx={{ color: "#9e9e9e" }}>
            {`${monthDifference} ${name} this month`}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}

DataCard.defaultProps={
  arrowColor:"#2ab38e"
}