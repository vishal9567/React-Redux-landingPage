import React, { Fragment } from 'react'
import EditUser from '../Form/EditUser'
import { Modal } from '@mui/material'



function ModalEditUser({ open, handleClose }) {

  return (
    <Fragment>
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
        <EditUser />
      </Modal>
    </Fragment>
  )
}

export default ModalEditUser
