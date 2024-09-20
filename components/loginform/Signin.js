'use client'
import { CircularProgress, TextField } from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react'
import Apis from '../apis/Apis';

const Signin = ({ handleContinue, closeForm }) => {

    const [userPassword, setUserPassword] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [signInloader, setSignInloader] = useState(false);

    const handleSubmit = async () => {
        setSignInloader(true);
        const ApiPath = Apis.SignUp;
        const data = {
            "email": userEmail,
            "password": userPassword,
            "status": true
        }
        setTimeout( async () => {
            try {
                const Response = await axios.post(ApiPath, data, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                if (Response.data.status === true) {
                    console.log("Response of login api", Response.data);
                    localStorage.setItem('User', JSON.stringify(Response.data));
                    closeForm();
                } else {
                    console.log("Couldn't login");
                }
            } catch (error) {
                console.error("Error occured in sign in api", error);
            } finally {
                setSignInloader(false);
            }
        }, 2000);
    }

    return (
        <div>
            <div style={{ fontWeight: "600", fontSize: 24 }}>
                Sign In
            </div>
            <TextField className=' w-full mt-4'
                autofill='off'
                id="filled-basic"
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
                // label="EmailAddress" 
                variant="outlined"
                placeholder='Enter email address.'
                sx={{
                    '& label.Mui-focused': {
                        color: '#050A0890',
                        // borderColor: "red"
                    },
                    '& .MuiFilledInput-root': {
                        // color: '#050A0860',
                        fontSize: 13,
                        fontWeight: '400'
                    },
                    '& .MuiOutlinedInput-root': {
                        '&.Mui-focused fieldset': {
                            borderColor: '#00000080',
                            // backgroundColor: "#EDEDEDC7"
                        },
                    },
                }} />
            <TextField className=' w-full mt-4'
                autofill='off'
                type='password'
                id="filled-basic"
                value={userPassword}
                onChange={(e) => setUserPassword(e.target.value)}
                // label="Password" 
                variant="outlined"
                placeholder='Enter password.'
                sx={{
                    '& label.Mui-focused': {
                        color: '#050A08',
                        // borderColor: "red"
                    },
                    '& .MuiFilledInput-root': {
                        // color: '#050A0860',
                        fontSize: 13,
                        fontWeight: '400'
                    },
                    '& .MuiOutlinedInput-root': {
                        '&.Mui-focused fieldset': {
                            borderColor: '#00000080',
                            // backgroundColor: "#EDEDEDC7"
                        },
                    },
                }} />

            <div className='w-ful flex justify-end mt-4'>
                <button onClick={handleSubmit} className='bg-purple rounded px-8 text-white py-3' style={{ fontWeight: "400", fontSize: 15 }}>
                    {
                        signInloader ?
                            <CircularProgress size={20} /> :
                            "Continue"
                    }
                </button>
            </div>

            <div className='flex flex-row gap-1 mt-6'>
                <div style={{ fontSize: 13, fontWeight: "400" }}>
                    Want to create new account?
                </div>
                <button onClick={handleContinue} className='text-purple' style={{ fontSize: 13, fontWeight: "400" }}>
                    Sign up
                </button>
            </div>

        </div>
    )
}

export default Signin