import { Box, TextField, Typography } from '@mui/material'
import React, { Fragment } from 'react'

function FomLabels({ lables, handleChange, formData, formErr }) {

    const getValue = (name, data) => {
        name = name.toLowerCase()
        let names = Object.keys(data)
        return names.includes(name) ? data[name] : null
    }
    const getError = (name, data) => {
        name = name.toLowerCase()
        let names = Object.keys(data)
        return names.includes(name) ? data[name] : ""
    }

    return (
        <Box sx={{ margin: "15px 0px 15px 0px" }}>
            {lables && lables.map((item, i) => (
                <Fragment key={item.name}>
                    <Typography >{item.name}</Typography>
                    <TextField
                        variant="outlined"
                        fullWidth
                        size="small"
                        name={item.name.toLowerCase()}
                        onChange={handleChange}
                        value={getValue(item.name, formData)}
                    />
                    <p style={{ color: 'red' }}>{getError(item.name, formErr)}</p>
                </Fragment>
            ))}
        </Box>
    )
}

export default FomLabels
