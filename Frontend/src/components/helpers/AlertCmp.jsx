import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'
import React from 'react'

function AlertCmp({ handleClose, handleAgree, open, id, msg }) {
    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="responsive-dialog-title"
        >
            <DialogTitle id="responsive-dialog-title">
                {"Confirmation"}
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {msg}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button autoFocus onClick={handleClose}>
                    Disagree
                </Button>
                <Button onClick={() => handleAgree(id)} autoFocus>
                    Agree
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default AlertCmp
