import { Box, Button, Typography } from "@mui/material";
import PersonAddAlt1OutlinedIcon from "@mui/icons-material/PersonAddAlt1Outlined";
import React, { useState } from "react";
import TableSection from "./TableSection";
import PaginationComponent from "../pagination/PaginationComponent";
import ModalCreateUser from "../Modal/ModalCreateUser";
import { setCurrentBool, setCurrentPage, totalCount } from "../../features/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { currentBool } from "../../features/userSlice";

function TableComponent() {
  const [open, setOpen] = useState(false)

  const dispatch = useDispatch()
  const TotalCount = useSelector(totalCount)
  const bool = useSelector(currentBool)

  const openModal = () => {
    setOpen(true)
  }
  const closeModal = () => {
    dispatch(setCurrentBool(!bool))
    setOpen(false)
  }


  const onPagination = (e, newPage) => {
    dispatch(setCurrentPage(newPage))
  }

  return (
    <Box sx={{ backgroundColor: "white", borderRadius: "10px", width: '100%' }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", padding: '20px' }}>
        <Typography>Users</Typography>
        <Box sx={{ padding: 0.3 }}>
          <Button
            variant="outlined"
            color="error"
            startIcon={<PersonAddAlt1OutlinedIcon />}
            onClick={openModal}
            sx={{
              boxShadow: 5,
              ":hover": {
                backgroundColor: "rgb(242,78,112)",
                color: "white",
                boxShadow: "20px 20px 50px 0.2rem rgba(255,0,0,.5)",
              },
            }}
          >
            Add user
          </Button>
        </Box>
      </Box>
      <TableSection />
      <PaginationComponent onPagination={onPagination} totalCount={TotalCount} />
      <ModalCreateUser handleClose={closeModal} open={open} />
    </Box>
  );
}

export default TableComponent;
