'use client'
import { CircularProgress, Link, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import PhoneNumberInput from '../PhoneNumberInput'
import axios from 'axios'
import Apis from '../apis/Apis'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

const CreateAccount = ({ handleContinue, handleBack, creator, modalData, closeForm }) => {

    const router = useRouter();

    const [userPhoneNumber, setUserPhoneNumber] = useState(null);
    const [userName, setUserName] = useState("");
    const [userLastName, setUserLastName] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [userPassword, setUserPassword] = useState("");
    const [loginLoader, setLoginLoader] = useState(false);
    const [phoneNumberErr, setPhoneNumberErr] = useState(null);
    const [numberFormatError, setNumberFormatError] = useState(false);
    const [termsCheck, setTermsCheck] = useState(false);
    const [checkUserEmailData, setCheckUserEmailData] = useState(null);

    const handlePhoneNumber = (number) => {
        // console.log("Number is", number);
        setUserPhoneNumber(number);
    }

    //call emailValidation api
    useEffect(() => {
        if (userEmail) {
            const timeOut = setTimeout(() => {
                checkUserEmail();
            }, 2000);
            return () => clearTimeout(timeOut);
        }
    }, [userEmail]);

    //code for termscheck button

    const handleTermsCheckBtn = () => {
        setTermsCheck(!termsCheck);
    }

    const handleSignInClick = () => {
        router.push("/creator/onboarding2");
        const routePath = {
            routePath: "fromCreatorScreen",
            modalName: creator
        }
        localStorage.setItem('route', JSON.stringify(routePath));
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
            if (response.data) {
                setPhoneNumberErr(response.data)
            }
        } catch (error) {
            console.error("Error occured in checknum api");
        }
    }

    useEffect(() => {
        if (userPhoneNumber) {
            const timeOut = setTimeout(() => {
                checkPhoneNumber();
            }, 2000);
            return () => clearTimeout(timeOut)
        }
    }, [userPhoneNumber]);

    const handleLogin = async () => {

        //code to save userFormdata
        const data = {
            firstName: userName,
            lastName: userLastName,
            email: userEmail,
            phonenumber: userPhoneNumber
        }
        localStorage.setItem('formData', JSON.stringify(data));

        const userData = {
            name: userName + " " + userLastName,
            email: userEmail,
            phone: userPhoneNumber,
            password: userPassword
        }
        console.log("Data for create account", userData);

        // return

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
    }

    // const MuiFieldStyle = {
    //     '& label.Mui-focused': {
    //         color: '#050A08',
    //         // paddingBottom: "10px",
    //     },
    //     '& .MuiFilledInput-root': {
    //         fontSize: 13,
    //         fontWeight: '400',
    //     },
    //     '& .MuiOutlinedInput-root': {
    //         borderRadius: 2,
    //         height: "48px",
    //         backgroundColor: "#EDEDEDC7",
    //         color: "black",
    //         '& fieldset': {
    //             borderColor: 'transparent',  // Border none when not focused
    //         },
    //         '&:hover fieldset': {
    //             borderColor: 'transparent',  // Border none on hover
    //         },
    //         '&.Mui-focused fieldset': {
    //             borderColor: '#00000000',  // Your existing focus styles
    //             backgroundColor: "#EDEDEDC7",
    //             color: "#000000",
    //         },
    //     },
    // }

    //code for email validation


    const MuiFieldStyle = {
        '& label.Mui-focused': {
            color: 'black',
        },
        '& .MuiFilledInput-root': {
            fontSize: 13,
            fontWeight: '400',
        },
        '& .MuiOutlinedInput-root': {
            borderRadius: 2,
            height: "48px",
            backgroundColor: "#EDEDEDC7",
            color: "black",
            '& fieldset': {
                borderColor: 'transparent',
            },
            '&:hover fieldset': {
                borderColor: 'transparent',
            },
            '&.Mui-focused fieldset': {
                borderColor: '#00000000',
                // backgroundColor: "#EDEDEDC7",
                color: "#000000",
            },
            '& .MuiOutlinedInput-input': {
                color: 'black !important',
            },
            '&.Mui-focused .MuiOutlinedInput-input': {
                color: 'black !important',
            },
        },
    };





    const checkUserEmail = async () => {
        const ApiPath = Apis.checkUserEmail;
        const data = {
            email: userEmail
        }
        try {
            const response = await axios.post(ApiPath, data, {
                headers: {
                    "Content-Type": "application/json"
                }
            });
            if (response) {
                if (response.data) {
                    console.log("Response of checkemail", response.data);
                    setCheckUserEmailData(response.data);
                }
            }
        } catch (error) {
            console.error("Error occured in checkuseremail api", error);

        }
    }

    //code to retrive the formData data

    useEffect(() => {
        const localData = localStorage.getItem("formData");
        if (localData) {
            const Data = JSON.parse(localData);
            console.log("Form data retrived", Data);

            setUserName(Data.firstName);
            setUserLastName(Data.lastName);
            setUserEmail(Data.email);
            // setUserPhoneNumber(Data.phonenumber);
        }
    }, [])

    //code to close form
    const handleCloseForm = () => {
        console.log("test working");
        closeForm();
    }



    return (
        <div>
            <div className='flex flex-row w-full justify-end'>
                <button onClick={handleCloseForm}>
                    <Image src="/assets/croseBtn.png" alt='cross' height={25} width={25} />
                </button>
            </div>
            <div className='w-full flex flex-row justify-center' style={{ marginTop: 10 }}>

                <div style={{ fontWeight: "600", fontSize: 28, textAlign: "center" }}>
                    <div style={{ fontWeight: "600", fontSize: 24, textAlign: "center" }}>
                        {modalData &&
                            <div>
                                {modalData.name ?
                                    <div>
                                        {modalData.name}
                                    </div> :
                                    <div style={{ fontWeight: "600", fontSize: 28, textAlign: "center" }}>
                                        {modalData.assitant.name}
                                    </div>}
                            </div>
                        }
                    </div>
                    {/* {
                        loginLoader ?
                            <CircularProgress size={20} /> :
                            <div style={{ fontWeight: "600", fontSize: 24, textAlign: "center" }}>
                                {modalData &&
                                    <div>
                                        {modalData.name ?
                                            <div>
                                                {modalData.name}
                                            </div> :
                                            <div style={{ fontWeight: "600", fontSize: 28, textAlign: "center" }}>
                                                {modalData.assitant.name}
                                            </div>}
                                    </div>
                                }
                            </div>
                    } */}
                </div>

            </div>
            <TextField className=' w-full mt-10'
                autofill='off'
                id="filled-basic"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                label="First Name" variant="outlined"
                placeholder='First name'
                sx={MuiFieldStyle}
                inputProps={{
                    style: {
                        color: 'black !important',  // Apply black color directly
                    },
                }}
                style={{ color: "black" }}
            />

            <TextField className=' w-full mt-8'
                autofill='off'
                id="filled-basic"
                value={userLastName}
                onChange={(e) => setUserLastName(e.target.value)}
                label="Last Name" variant="outlined"
                placeholder='Last name'
                sx={MuiFieldStyle}
            />
            <TextField className=' w-full mt-8'
                autofill='off'
                id="filled-basic"
                value={userEmail}
                onChange={(e) => {
                    setUserEmail(e.target.value);
                    setCheckUserEmailData(null);
                }}
                label="Email" variant="outlined"
                placeholder='Email Address'
                sx={MuiFieldStyle}
            />
            {
                checkUserEmailData && checkUserEmailData.status === true ?
                    <div className='mt-2 ms-3' style={{ fontWeight: "400", fontSize: 12, fontFamily: "inter", color: "green" }}>
                        Email available
                    </div> :
                    <div className='mt-2 ms-3' style={{ fontWeight: "400", fontSize: 12, fontFamily: "inter", color: "#FF0100" }}>
                        {checkUserEmailData && checkUserEmailData.status === false && "Email already taken"}
                    </div>
            }
            {/* <TextField className='mt-4' id="outlined-basic" label="Outlined" variant="outlined" sx={MuiFieldStyle} /> */}
            <div className='mt-8'>
                <PhoneNumberInput phonenumber={handlePhoneNumber} />
            </div>
            {
                phoneNumberErr && phoneNumberErr.status === true ?
                    <div className='mt-2 ms-3' style={{ fontWeight: "400", fontSize: 12, fontFamily: "inter", color: "green" }}>
                        {phoneNumberErr.message}
                    </div> :
                    <div className='mt-2 ms-3' style={{ fontWeight: "400", fontSize: 12, fontFamily: "inter", color: "#FF0100" }}>
                        {phoneNumberErr && phoneNumberErr.message}
                    </div>
            }
            {/* <TextField className=' w-full mt-4'
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
                        borderRadius: 5,
                        height: 48,
                        '&.Mui-focused fieldset': {
                            borderColor: '#00000080',
                            // backgroundColor: "#EDEDEDC7"
                        },
                    },
                }} /> */}
            <div className='flex flex-row gap-2 items-center mt-10'>
                {
                    termsCheck ?
                        <button onClick={handleTermsCheckBtn}>
                            <Image src="/assets/selected.png" height={17} width={17} />
                        </button> :
                        <button onClick={handleTermsCheckBtn}>
                            <Image src="/assets/unselected.png" height={17} width={17} />
                        </button>
                }
                <div style={{ fontSize: 13, fontWeight: "500", fontFamily: "inter" }}>
                    I agree to the
                    <button onClick={() => {
                        window.open('https://docs.google.com/document/d/1TdicVwsq3TTUp9tKyIONcPXBcGgKxFgkFPyE9hBapBg/edit#heading=h.wcbyg6d9eki4', '_blank');
                    }} className='text-purple ms-1'>
                        Terms & Conditions
                    </button>
                </div>
            </div>
            <div className='w-full flex justify-center mt-8'>
                {
                    userEmail && userName && userPhoneNumber && termsCheck && checkUserEmailData && checkUserEmailData.status === true && phoneNumberErr && phoneNumberErr.status === true ?
                        <button onClick={handleLogin} className='bg-purple w-full px-8 text-white py-3' style={{ fontWeight: "400", fontSize: 15, borderRadius: "50px" }}>
                            {
                                loginLoader ?
                                    <CircularProgress size={20} /> :
                                    <div>
                                        {modalData &&
                                            <div>
                                                {modalData.name ?
                                                    <div>
                                                        Call {modalData.name}
                                                    </div> :
                                                    <div>
                                                        Call {modalData.assitant.name}
                                                    </div>}
                                            </div>
                                        }
                                    </div>
                            }
                        </button> :
                        <button className='bg-purple2 w-full px-8 text-white py-3' style={{ fontWeight: "400", fontSize: 15, borderRadius: "50px" }}>
                            {
                                loginLoader ?
                                    <CircularProgress size={20} /> :
                                    <div>
                                        {
                                            loginLoader ?
                                                <CircularProgress size={20} /> :
                                                <div>
                                                    {modalData &&
                                                        <div>
                                                            {modalData.name ?
                                                                <div>
                                                                    Call {modalData.name}
                                                                </div> :
                                                                <div>
                                                                    Call {modalData.assitant.name}
                                                                </div>}
                                                        </div>
                                                    }
                                                </div>
                                        }
                                    </div>
                            }
                        </button>
                }
            </div>
            <div className='flex flex-row gap-1 mt-6'>
                <button onClick={handleContinue} style={{ fontSize: 13, fontWeight: "400" }}>
                    Have an account?
                </button>
                <button
                    onClick={handleSignInClick}
                    className='text-purple' style={{ fontSize: 13, fontWeight: "400" }}>
                    Sign in
                </button>
            </div>
        </div>
    )
}

export default CreateAccount