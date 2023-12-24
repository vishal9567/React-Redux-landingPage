import React from "react";
import { Box, Grid } from "@mui/material";
import DashBoardContainer from "../components/dashBoard/DashBoardContainer";

function DashBoard() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "100px 0px 100px 0px",
      }}
    >
      <DashBoardContainer />
    </Box>
  );
}

export default DashBoard;
