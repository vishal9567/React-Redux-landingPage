import React from "react";
import GridComponent from "./Statics";
import { Box, Grid } from "@mui/material";
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import TableComponent from '../Table/TableComponent'
import { useSelector } from "react-redux";
import { dashBoardData } from "../../features/userSlice";


function DashBoardContainer() {
  const getIcon = (type) => {
    switch (type) {
      case "Total Users":
        return GroupOutlinedIcon;
      case "Total Males":
      case "Total Females":
        return PersonOutlineOutlinedIcon;
      case "Total Active":
        return CheckCircleOutlineOutlinedIcon;
      default:
        return null;
    }
  };

  const backendData = useSelector(dashBoardData)

  return (
    <Box
      sx={{
        width: "80vw",
        backgroundColor: "rgba(255,255,255,0.5)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "30px",
        borderRadius: "10px",
      }}
    >
      <Grid container spacing={2}>

        <Grid item container spacing={2} xs={12}>
          {backendData && backendData.map((item, i) => (
            <GridComponent
              Icon={getIcon(item.type)}
              title={item.type}
              values={item.value}
              key={i}
            />
          ))}
        </Grid>
        <Grid item container xs={12}>
          <TableComponent />
        </Grid>
      </Grid>
    </Box>
  );
}

export default DashBoardContainer;
