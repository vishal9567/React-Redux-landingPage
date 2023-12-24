import {
    Box,
    Button,
    Container,
    FormControlLabel,
    IconButton,
    Radio,
    RadioGroup,
    Typography,
} from "@mui/material";
import React, { useState } from "react";
import FomLabels from "./FomLabels";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import { validation } from "../../validations/formValidation";
import axios from "axios";
import BackDropCmp from "../helpers/BackDropCmp";
import { pink } from "@mui/material/colors";

const baseUrl = import.meta.env.VITE_BASE_URL;

const lables = [{ name: "Name" }, { name: "Email" }, { name: "Gender" }];

const CreateUser = React.forwardRef(({ notify }, ref) => {
    {
        /*here using React.forwardRef because the CreateUser not indeed a react component.. i got error when use inside the Modal*/
    }
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        gender: "",
        status: "",
    });
    const [formErr, setFormErr] = useState({});
    const [serverMsg, setServerMsg] = useState();
    const [openBackDrop, setOpenBackDrop] = useState(false);

    const handleBackDrop = () => {
        setOpenBackDrop(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormErr({});
        const error = validation(formData);
        setFormErr(error);
        if (Object.keys(error).length === 0) {
            setOpenBackDrop(true);
            try {
                const response = await axios.post(`${baseUrl}/register`, formData);
                console.log(response.data);
                notify(response.data.message);
            } catch (err) {
                console.log("error", err);
                setServerMsg(err.response?.data?.message || "An error occured");
            } finally {
                setOpenBackDrop(false);
            }
        }
    };
    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };
    const clearData = () => {
        setFormData({
            name: "",
            email: "",
            gender: "",
            status: "",
        });
    };

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
                    <IconButton sx={{ opacity: ".5" }}>x</IconButton>
                </Box>
                <hr style={{ opacity: ".3" }}></hr>
                <form onSubmit={handleSubmit}>
                    <FomLabels
                        lables={lables}
                        handleChange={handleChange}
                        formData={formData}
                        formErr={formErr}
                    />{" "}
                    {/*//*============form component============ */}
                    <RadioGroup
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="status"
                        onChange={handleChange}
                        value={formData?.status}
                    >
                        <FormControlLabel
                            value="Active"
                            control={
                                <Radio
                                    sx={{
                                        color: pink[800],
                                        "&.Mui-checked": {
                                            color: pink[600],
                                        },
                                    }}
                                />
                            }
                            label="Active"
                        />
                        <FormControlLabel
                            value="Inactive"
                            control={
                                <Radio
                                    sx={{
                                        color: pink[800],
                                        "&.Mui-checked": {
                                            color: pink[600],
                                        },
                                    }}
                                />
                            }
                            label="Inactive"
                        />
                    </RadioGroup>
                    {formErr && <p style={{ color: "red" }}>{formErr.status}</p>}
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
                            Add User
                        </Button>
                        <Button onClick={clearData} sx={{ color: "rgba(0,0,0,0.5)" }}>
                            Clear
                        </Button>
                    </Box>
                    {serverMsg && (
                        <p style={{ color: "red", paddingBottom: "5px" }}>{serverMsg}</p>
                    )}
                </form>
            </Container>
            <BackDropCmp open={openBackDrop} handleClose={handleBackDrop} />
        </Box>
    );
});

export default CreateUser;
