import { Box, Button, Container, FormControlLabel, IconButton, Radio, RadioGroup, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import FomLabels from './FomLabels'
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import { validation } from '../../validations/formValidation';
import { useSelector, useDispatch } from 'react-redux';
import { selectUserData, currentBool } from '../../features/userSlice';
import { setCurrentBool } from '../../features/userSlice';
import BackDropCmp from '../helpers/BackDropCmp';
import axios from 'axios';
const bseUrl = import.meta.env.VITE_BASE_URL

const lables = [
    { name: 'Name', },
    { name: 'Email', },
    { name: 'Gender', },

]

const EditUser = React.forwardRef(() => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        gender: '',
        status: ''

    })
    const [formErr, setFormErr] = useState({})
    const [serverMsg, setServerMsg] = useState()
    const [successMsg, setSuccessMsg] = useState()

    const [openBackDrop, setOpenBackDrop] = useState(false)

    const user = useSelector(selectUserData)
    const bool = useSelector(currentBool)
    const dispatch = useDispatch()

    useEffect(() => {
        setFormData(...user)
    }, [user])


    const handleBackDrop = () => {
        setOpenBackDrop(false)
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        setFormErr({})
        const data = {
            name: formData.name,
            email: formData.email,
            gender: formData.gender,
            status: formData.status
        }
        const error = validation(data)
        setFormErr(error)
        if (Object.keys(error).length === 0) {
            setOpenBackDrop(true)
            try {
                const response = await axios.put(`${bseUrl}/update?id=${formData._id}`, data)
                dispatch(setCurrentBool(!bool))
                setSuccessMsg(response.data.message)
                setServerMsg()
            }
            catch (err) {
                console.log(err);
                setServerMsg(err.response?.data?.message || "An error occured")
                setSuccessMsg()
            }
            finally {
                setOpenBackDrop(false)
            }
        }

    }
    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }
    const clearData = () => {
        setFormData(({
            name: '',
            email: '',
            gender: '',
            status: ''
        }))
    }

    return (
        <Box
            sx={{
                width: "400px",
                backgroundColor: "rgba(255,255,255,0.3 )",
                borderRadius: "10px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <Container
                sx={{
                    backgroundColor: "white",
                    margin: "20px",
                    borderRadius: "10px",
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginTop: "15px",
                    }}
                >
                    <Typography
                        sx={{
                            textTransform: "uppercase",
                            fontWeight: "bold",
                            paddingTop: "10px",
                        }}
                    >
                        Users
                    </Typography>
                    <IconButton sx={{ opacity: ".5" }}>
                        x
                    </IconButton>
                </Box>
                <hr style={{ opacity: ".3" }}></hr>
                <form onSubmit={handleSubmit}>
                    <FomLabels lables={lables} handleChange={handleChange} formData={formData} formErr={formErr} />                                   {/* //*===========form component============ */}
                    <RadioGroup
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="status"
                        onChange={handleChange}
                        value={formData.status}
                    >
                        <FormControlLabel
                            value="Active"
                            control={<Radio />}
                            label="Active"
                        />
                        <FormControlLabel
                            value="Inactive"
                            control={<Radio />}
                            label="Inactive"
                        />
                    </RadioGroup>
                    {formErr && <p style={{ color: 'red' }}>{formErr.status}</p>}
                    <Box sx={{ display: "flex", margin: "15px 0 15px 0" }}>
                        <Button
                            type="submit"
                            variant="contained"
                            startIcon={<PersonAddAltIcon />}
                            sx={{
                                backgroundColor: "rgb(242,78,112)",
                                ":hover": { backgroundColor: "rgb(242,78,112)" },
                            }}
                        >
                            Submit
                        </Button>
                        <Button onClick={clearData} sx={{ color: "rgba(0,0,0,0.5)" }} >
                            Clear
                        </Button>
                    </Box>
                    {serverMsg && <p style={{ color: 'red', paddingBottom: '5px' }}>{serverMsg}</p>}
                    {successMsg && <p style={{ color: 'green', paddingBottom: '5px' }}>{successMsg}</p>}

                </form>
            </Container>
            <BackDropCmp open={openBackDrop} handleClose={handleBackDrop} />
        </Box>
    )
});

export default EditUser
