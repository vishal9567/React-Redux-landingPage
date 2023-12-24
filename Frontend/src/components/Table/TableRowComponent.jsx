import { IconButton, TableCell, TableRow } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import React, { useEffect, useState } from "react";
import ModalEditUser from "../Modal/ModalEditUser";
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
    setPaginationCount,
    setDashBoardData,
    setUserData,
} from "../../features/userSlice";
import { currentPage, currentBool } from "../../features/userSlice";
import AlertCmp from "../helpers/AlertCmp";

const baseUrl = import.meta.env.VITE_BASE_URL;

function TableRowComponent() {
    const [control, setControl] = useState(false)
    const [tableData, setTableData] = useState();
    const [open, setOpen] = useState(false);
    const [alert, setAlert] = useState({
        id: '',
        open: false,
        msg: ''
    })

    const CurrentPage = useSelector(currentPage);
    const bool = useSelector(currentBool)



    const perPage = 4;
    const skip = CurrentPage * perPage - perPage;

    const dispatch = useDispatch();

    useEffect(() => {
        axios
            .get(`${baseUrl}/users?skip=${skip}&limit=${perPage}`)
            .then((response) => {
                setTableData(response.data.user);
                dispatch(setPaginationCount(Math.ceil(response.data.count / perPage)));
                dispatch(setDashBoardData(response.data.dashBoardData));
            });
    }, [CurrentPage, control, bool]);

    const deletUser = (id) => {
        const user = tableData.filter(user => user._id === id)
        setAlert((current) => ({
            ...current,
            id: id,
            open: true,
            msg: `Are you want to delete '${user[0].name}'`
        }))
    };
    const openModal = (id) => {
        const user = tableData.filter((item) => item._id === id);
        if (user) dispatch(setUserData(user));
        setOpen(true);
    };
    const closeAlert = () => {
        setAlert({ id: '', open: false, msg: '' })
    }
    const handleDeleteAgree = async (id) => {
        await axios.delete(`${baseUrl}/deleteUser?id=${id}`)
        setControl(!control)
        closeAlert()
    }
    const closeModal = () => {
        setOpen(false);
    };
    return (
        <React.Fragment>
            {tableData &&
                tableData.map((user, i) => {
                    return (
                        <TableRow key={user._id}>
                            <TableCell>{perPage * (CurrentPage - 1) + (i + 1)}</TableCell>
                            <TableCell>{user.name}</TableCell>
                            <TableCell>{user.email}</TableCell>
                            <TableCell>{user.gender}</TableCell>
                            <TableCell sx={{ fontSize: "small" }}>
                                <IconButton
                                    sx={{ fontSize: "small" }}
                                    onClick={() => openModal(user._id)}
                                >
                                    <EditIcon />
                                    Edit
                                </IconButton>
                                <IconButton
                                    sx={{ color: "red", fontSize: "small" }}
                                    onClick={() => deletUser(user._id)}
                                >
                                    <DeleteForeverIcon />
                                    Delete
                                </IconButton>
                            </TableCell>
                            <TableCell>{user.status === 'Active' ? <FiberManualRecordIcon sx={{ color: 'green', fontSize: 'small' }} /> : <FiberManualRecordIcon sx={{ color: 'red', fontSize: 'small' }} />}{" " + user.status}</TableCell>

                        </TableRow>
                    );
                })}
            <ModalEditUser open={open} handleClose={closeModal} />
            <AlertCmp handleClose={closeAlert} open={alert.open} handleAgree={handleDeleteAgree} id={alert.id} msg={alert.msg} />
        </React.Fragment>
    );
}

export default TableRowComponent;
