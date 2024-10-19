import { Box, Button, Checkbox, TextField, Typography } from '@mui/material'
import React from 'react'
import localFont from "next/font/local";

const Reikna = localFont({
    src: "../fonts/Reikna.ttf",

    weight: "100 900",
});
const forgot_password = () => {
    return (
        <Box sx={{ backgroundColor: '#EEE6FB', width: '100%', height: '100vh', display: 'flex', justifyContent: "center", alignItems: 'center', flexDirection: 'column',padding : '15px' }}>
            <Box sx={{ backgroundColor: "#fff", borderRadius: "20px", padding: '20px', width: {xs: '100%', md : "600px"}, boxShadow: "0px 0px 5px #eaecee",borderTop : '3px solid #904dff',borderBottom : '3px solid #904dff' }}>

                <Typography variant='h5' sx={{ fontWeight: "bold", textAlign: 'center' }}  >
                    Forgot Password?
                </Typography>
                <Typography align='center' sx={{ marginBottom: '10px' }}>
                    Please enter your new Password to access the administrative features.
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <TextField
                        label="Email"
                        variant="outlined"
                        sx={{
                            width: "100%",
                            "& .MuiOutlinedInput-root": {

                                "& .MuiOutlinedInput-notchedOutline": {
                                },
                                "&.Mui-focused": {
                                    "& .MuiOutlinedInput-notchedOutline": {
                                        borderColor: "#904dff",
                                    },
                                }
                            },
                            "& .MuiInputLabel-outlined": {
                                color: "#2e2e2e",

                                "&.Mui-focused": {
                                    color: "#904dff",

                                },
                            }
                        }}
                    />
                    <TextField
                        label="Confirm Password"
                        variant="outlined"
                        sx={{
                            width: "100%",
                            "& .MuiOutlinedInput-root": {

                                "& .MuiOutlinedInput-notchedOutline": {
                                },
                                "&.Mui-focused": {
                                    "& .MuiOutlinedInput-notchedOutline": {
                                        borderColor: "#904dff",
                                    },
                                }
                            },
                            "& .MuiInputLabel-outlined": {
                                color: "#2e2e2e",

                                "&.Mui-focused": {
                                    color: "#904dff",

                                },
                            }
                        }}
                    />
                    <Button variant="contained" sx={{backgroundColor : "#904dff"}}>Update Password</Button>
                </Box>
            </Box>
        </Box>
    )
}

export default forgot_password
