import { Box, Button, Checkbox, IconButton, InputAdornment, TextField, Typography } from '@mui/material';
import toast, { Toaster } from 'react-hot-toast';
import React, { useState } from 'react';
import localFont from "next/font/local";
import Link from 'next/link';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useRouter } from 'next/router';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const Reikna = localFont({
    src: "../fonts/Reikna.ttf",
    weight: "100 900",
});

interface FormValues {
    email: string;
    password: string;
    status: boolean;
}

const Index = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = React.useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
      };
    
      const handleMouseUpPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
      };
    
    const validationSchema = Yup.object({
        email: Yup.string().email('Invalid email address').required('Required'),
        password: Yup.string().required('Required'),
    });

    const formik = useFormik<FormValues>({
        initialValues: {
            email: '',
            password: '',
            status: false,
        },
        validationSchema,
        onSubmit: async (values, { resetForm }) => {
            const toastId = toast.loading('Loading...');
            setLoading(true);
            try {
                const res = await axios.post('http://localhost:8080/users/login', values);

                setTimeout(() => {
                    values.status ? localStorage.setItem('apiToken', res.data.token) : sessionStorage.setItem('apiToken', res.data.token)
                    resetForm();
                    toast.success(res.data.message, { id: toastId }); // Update toast
                    router.push('/admin/dashboard');
                }, 1000);
            } catch (error: any) {
                setTimeout(() => {
                    toast.error(error.response?.data.message || 'Login failed.', { id: toastId }); // Update toast
                }, 1000);
            } finally {
                setLoading(false);
            }
        },
    });

    React.useEffect(() => {
        let apiToken = localStorage.getItem('apiToken') || sessionStorage.getItem('apiToken')

        if (apiToken) {
            router.push('/admin/dashboard')
        }
    }, [])

    return (
        <Box sx={{ backgroundColor: '#EEE6FB', width: '100%', height: '100vh', display: 'flex', justifyContent: "center", alignItems: 'center', flexDirection: 'column', padding: "15px" }}>
            <Box sx={{ backgroundColor: "#fff", borderRadius: "20px", padding: '20px', width: { xs: '100%', md: "600px" }, boxShadow: "0px 0px 5px #eaecee", borderTop: '3px solid #904dff', borderBottom: '3px solid #904dff' }}>
                <Typography variant='h5' sx={{ fontWeight: "bold", textAlign: 'center', fontSize: { sx: "24px", md: '30px' } }}>
                    Welcome to the <Typography style={{ color: '#904dff', fontSize: "48px" }} className={Reikna.className}>Admin Portal</Typography>
                </Typography>
                <Typography align='center' sx={{ marginBottom: '10px' }}>
                    Please enter your credentials to access the administrative features.
                </Typography>

                <Toaster />

                <form onSubmit={formik.handleSubmit}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        <TextField
                            error={formik.touched.email && Boolean(formik.errors.email)}
                            helperText={formik.touched.email && formik.errors.email}
                            label="Email"
                            variant="outlined"
                            onChange={formik.handleChange}
                            value={formik.values.email}
                            name='email'
                            sx={{
                                width: "100%",
                                "& .MuiOutlinedInput-root": {
                                    "& .MuiOutlinedInput-notchedOutline": {},
                                    "&.Mui-focused": {
                                        "& .MuiOutlinedInput-notchedOutline": {
                                            borderColor: "#904dff",
                                        },
                                    },
                                },
                                "& .MuiInputLabel-outlined": {
                                    color: "#2e2e2e",
                                    "&.Mui-focused": {
                                        color: "#904dff",
                                    },
                                },
                            }}
                        />
                        <TextField
                            error={formik.touched.password && Boolean(formik.errors.password)}
                            helperText={formik.touched.password && formik.errors.password}
                            label="Password"
                            variant="outlined"
                            onChange={formik.handleChange}
                            value={formik.values.password}
                            name='password'
                            type={showPassword ? 'text' : 'password'}
                            slotProps={{
                                input: {
                                    endAdornment: <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            onMouseUp={handleMouseUpPassword}
                                            edge="end"
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>,
                                },
                            }}

                            sx={{
                                width: "100%",
                                "& .MuiOutlinedInput-root": {
                                    "& .MuiOutlinedInput-notchedOutline": {},
                                    "&.Mui-focused": {
                                        "& .MuiOutlinedInput-notchedOutline": {
                                            borderColor: "#904dff",
                                        },
                                    },
                                },
                                "& .MuiInputLabel-outlined": {
                                    color: "#2e2e2e",
                                    "&.Mui-focused": {
                                        color: "#904dff",
                                    },
                                },
                            }}
                        />
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Typography>
                                <Checkbox
                                    id='status'
                                    checked={formik.values.status}
                                    onChange={formik.handleChange}
                                    name='status'
                                />
                                <label htmlFor="status">Remember Me</label>
                            </Typography>
                            {/* <Typography>
                                <Link href='/admin/forgot_password' style={{ color: 'black' }}>Forgot Password?</Link>
                            </Typography> */}
                        </Box>
                        <Button type="submit" variant="contained" sx={{ backgroundColor: "#904dff" }} disabled={loading}>
                            {loading ? 'Loading...' : 'Login'}
                        </Button>
                    </Box>
                </form>
            </Box>
        </Box>
    );
}

export default Index;
