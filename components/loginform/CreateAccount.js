'use client'
import { CircularProgress, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import PhoneNumberInput from '../PhoneNumberInput'
import axios from 'axios'
import Apis from '../apis/Apis'

const CreateAccount = ({ handleContinue, handleBack }) => {

    const [userPhoneNumber, setUserPhoneNumber] = useState(null);
    const [userName, setUserName] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [userPassword, setUserPassword] = useState("");
    const [loginLoader, setLoginLoader] = useState(false);
    const [phoneNumberErr, setPhoneNumberErr] = useState(null);
    const [numberFormatError, setNumberFormatError] = useState(false);

    const handlePhoneNumber = (number) => {
        console.log("Number is", number);
        setUserPhoneNumber(number);
    }


    const checkPhoneNumber = async () => {
        const verificationNumber = {
            phone: userPhoneNumber
        }
        setPhoneNumberErr(null);
        try {
            const ApiPath = Apis.checkPhone;
            const response = await axios.post(ApiPath, verificationNumber, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (response.data.message === "Phone available") {
                console.log("Response of api is", response.data);
                setPhoneNumberErr(response.data.message);
                // const phoneNumberPattern = /^\+[1-9]\d{1,14}$/;
                // if (!phoneNumberPattern.test(`+${phone}`)) {
                //     setNumberFormatError(true);
                // } else {
                //     setNumberFormatError(false);
                // }
            } else {
                setPhoneNumberErr(response.data.message);
            }
        } catch (error) {
            console.error("Error occured in checknum api");
        }
    }

    useEffect(() => {
        const Timer = setTimeout(() => {
            checkPhoneNumber()
        }, 2000);
        return () => clearTimeout(Timer)
    }, [userPhoneNumber])

    const handleLogin = async () => {

        const userData = {
            name: userName,
            email: userEmail,
            phone: userPhoneNumber,
            password: userPassword
        }

        setLoginLoader(true);

        const verificationNumber = {
            phone: userPhoneNumber
        }

        try {
            const ApiPath = Apis.sendVerificationCode;
            const response = await axios.post(ApiPath, verificationNumber, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (response.status === 200) {
                console.log("Response of api is", response.data);
                handleContinue(userData);
            }
        } catch (error) {
            console.error("Error occured in sendVC", error);
        } finally {
            setLoginLoader(false)
        }

        // return
        // try {


        //     const response = await axios.post(ApiPath, data, {
        //         headers: {
        //             'Content-Type': 'application/json'
        //         }
        //     });
        //     if (response.status === 200) {
        //         console.log("response of login is", response.data.data);
        //         handleContinue()
        //     }
        // } catch (error) {
        //     console.log("Error occured in apis is", error);
        // }
        // finally {
        //     setLoginLoader(false);
        // }
    }


    return (
        <div>
            <div style={{ fontWeight: "600", fontSize: 24 }}>
                Create Account
            </div>
            <TextField className=' w-full mt-4'
                autofill='off'
                id="filled-basic"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                label="Full Name" variant="outlined"
                placeholder='Enter full name.'
                sx={{
                    '& label.Mui-focused': {
                        color: '#050A08',
                        // borderColor: "red"
                    },
                    '& .MuiFilledInput-root': {
                        // color: '#050A0860',
                        fontSize: 13,
                        fontWeight: '400',
                    },
                    '& .MuiOutlinedInput-root': {
                        '&.Mui-focused fieldset': {
                            borderColor: '#00000080',
                            // backgroundColor: "#EDEDEDC7",
                            color: "#050A08"
                        },
                    },
                }} />
            <TextField className=' w-full mt-4'
                autofill='off'
                id="filled-basic"
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
                label="EmailAddress" variant="outlined"
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
            <div className='mt-4'>
                <PhoneNumberInput phonenumber={handlePhoneNumber} />
            </div>
            {
                phoneNumberErr && phoneNumberErr === "Phone available" &&
                <div style={{ fontWeight: "600", fontSize: 14, color: "green" }}>
                    {phoneNumberErr}
                </div>
            }
            {
                phoneNumberErr && phoneNumberErr === "Phone already taken" &&
                <div style={{ fontWeight: "600", fontSize: 14, color: "red" }}>
                    {phoneNumberErr}
                </div>
            }
            <TextField className=' w-full mt-4'
                autofill='off'
                type='password'
                id="filled-basic"
                value={userPassword}
                onChange={(e) => setUserPassword(e.target.value)}
                label="Password" variant="outlined"
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
                <button onClick={handleLogin} className='bg-purple rounded px-8 text-white py-3' style={{ fontWeight: "400", fontSize: 15 }}>
                    {
                        loginLoader ?
                            <CircularProgress size={20} /> :
                            "Continue"
                    }
                </button>
            </div>
            <div className='flex flex-row gap-1 mt-6'>
                <button onClick={handleContinue} style={{ fontSize: 13, fontWeight: "400" }}>
                    Have an account?
                </button>
                <button onClick={handleBack} className='text-purple' style={{ fontSize: 13, fontWeight: "400" }}>
                    Sign in
                </button>
            </div>
        </div>
    )
}

export default CreateAccount