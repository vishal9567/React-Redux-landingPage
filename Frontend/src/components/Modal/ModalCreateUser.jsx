import React from 'react'
import CreateUser from '../Form/CreateUser'
import { Modal } from '@mui/material'
import { toast, ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";

function ModalCreateUser({ open, handleClose }) {
  const notify = (msg) => toast.success(msg, { autoClose: 1200, onClose: handleClose })

  return (
    <React.Fragment>
      <Modal
        open={open}
        onClose={handleClose}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          backgroundColor: "white",
        }}
      >
        <CreateUser notify={notify} />
      </Modal>
      <ToastContainer />

    </React.Fragment>
  )
}

export default ModalCreateUser
