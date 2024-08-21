'use client'
import { Button, CircularProgress, IconButton, InputAdornment, TextField, Visibility, VisibilityOff } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useState } from "react";
import PhoneNumberInput from '../PhoneNumberInput';
import Apis from '../apis/Apis';
import axios from 'axios';

const boxVariants = {
    enter: (direction) => ({
        x: direction > 0 ? '100%' : '-100%',
        opacity: 0.4,
    }),
    center: {
        x: 0,
        opacity: 1,
    },
    exit: (direction) => ({
        x: direction < 0 ? '100%' : '-100%',
        opacity: 0.4,
    }),
};

export default function Animation({ onChangeIndex }) {

    const [currentIndex, setCurrentIndex] = useState(1);
    const [direction, setDirection] = useState(1);
    const [userName, setUserName] = useState("");
    const [checkUserNameData, set1checkUserNameData] = useState(null);
    const [checkUserEmailData, setCheckUserEmailData] = useState(null);
    const [checkUserPhoneNumberData, setCheckUserPhoneNumberData] = useState(null);
    const [userEmail, setUserEmail] = useState("");
    const [userPhoneNumber, setUserPhoneNumber] = useState("");
    const [userPassword, setUserPassword] = useState("")
    const [VerifiyNumberLoader, setVerifiyNumberLoader] = useState(false);
    const [P1, setP1] = useState("");
    const [P2, setP2] = useState("");
    const [P3, setP3] = useState("");
    const [P4, setP4] = useState("");
    const [EmailP1, setEmailP1] = useState("");
    const [EmailP2, setEmailP2] = useState("");
    const [EmailP3, setEmailP3] = useState("");
    const [EmailP4, setEmailP4] = useState("");

    const checkUserName = async () => {
        const ApiPath = Apis.checkUserName;
        const data = {
            username: userName
        }
        try {
            const response = await axios.post(ApiPath, data, {
                headers: {
                    "Content-Type": "application/json"
                }
            });

            if (response.data) {
                console.log("Response of check name api is", response.data);
                set1checkUserNameData(response.data);
            }
        } catch (error) {
            console.error("Error occured in checkusername api", error);

        }
    }

    useEffect(() => {
        if (userName) {
            setTimeout(() => {
                checkUserName();
            }, 2000);
        }
    }, [userName]);

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

    useEffect(() => {
        if (userEmail) {
            setTimeout(() => {
                checkUserEmail();
            }, 2000);
        }
    }, [userEmail]);

    const checkPhoneNumber = async () => {
        const data = {
            phone: userPhoneNumber
        }
        const ApiPath = Apis.checkPhone;
        try {
            const response = await axios.post(ApiPath, data, {
                headers: {
                    "Content-Type": "application/json"
                }
            });
            if (response) {
                if (response.data) {
                    setCheckUserPhoneNumberData(response.data)
                }
            }
        } catch (error) {
            console.error("Error occured in checknumber api", error);

        }
    }

    useEffect(() => {
        if (userPhoneNumber) {
            setTimeout(() => {
                checkPhoneNumber();
            }, 2000);
        }
    }, [userPhoneNumber]);

    const handleContinue = () => {
        // handleCurrentIndex();
        setDirection(1);
        setCurrentIndex((prevIndex) => prevIndex + 1);
    };

    const handleBack = () => {
        setDirection(-1);
        setCurrentIndex((prevIndex) => prevIndex - 1);
    };

    // console.log("test index is", currentIndex);

    useEffect(() => {
        onChangeIndex(currentIndex)
    }, [currentIndex]);


    const userNumber = (phone) => {
        setUserPhoneNumber(phone)
    }

    //code for verifyphone
    const handlePhoneVerificationClick = async () => {

        setVerifiyNumberLoader(true)

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
                handleContinue();
            }
        } catch (error) {
            console.error("Error occured in sendVC", error);
        } finally {
            setVerifiyNumberLoader(false)
        }
    }

    const handleInputChange = (e, setFunc, nextInputId) => {
        const value = e.target.value;
        setFunc(value);

        if (value && nextInputId) {
            document.getElementById(nextInputId).focus();
        }
    };

    const handleBackspace = (e, setFunc, prevInputId) => {
        if (e.key === "Backspace" && e.target.value === "") {
            if (prevInputId) {
                document.getElementById(prevInputId).focus();
            }
        }
    };

    //code for handleVerifyPhoneCode
    const handleVerifyPhoneCode = async () => {
        const data = {
            code: P1 + P2 + P3 + P4,
            phone: userPhoneNumber
        }
        const ApiPath = Apis.verifyCode;
        try {
            const response = await axios.post(ApiPath, data, {
                headers: {
                    "Content-Type": "application/json"
                }
            });
            if (response) {
                console.log("Response of verifyphone code", response.data);
                if (response.data.status === true) {
                    // handleContinue();
                    const data = {
                        email: userEmail,
                        username: userName,
                        phone: userPhoneNumber,
                        password: userPassword,
                        role: "creator"
                    }
                    console.log("Data sending in register api is", data);

                    const loginResponse = await axios.post(Apis.RegisterLogin, data, {
                        headers: {
                            "Content-Type": "application/json"
                        }
                    });
                    if(loginResponse){
                        if(loginResponse.data){
                            console.log("response of login api is", loginResponse.data);
                        }
                    }
                }
            }
        } catch (error) {
            console.error("Error occured in api is", error);

        }
    }

    const containerStyles = {
        position: 'relative',
        // height: '40vh',
        // width: '50vw',
        overflow: 'hidden',
    };

    const styles = {
        // position: 'absolute', // Ensures the boxes are stacked on top of each other
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        // backgroundColor: "red",
        height: "20vh",
        // marginLeft: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginInline: 10
    };

    return (
        <div style={containerStyles}>
            <AnimatePresence initial={false} custom={direction}>
                {currentIndex === 0 && (
                    <div className='flex flex-col h-screen justify-center' style={{ height: "", }}>
                        <motion.div
                            key="box1"
                            custom={direction}
                            variants={boxVariants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{ duration: 1 }}
                            style={styles}
                        >
                            <div className='w-full'>
                                <div style={{ fontSize: 24, fontWeight: "600", }}>
                                    Log in
                                </div>
                                <div className='text-lightWhite' style={{ fontSize: 13, fontWeight: "400" }}>
                                    Good to have you back!
                                </div>
                                <div className='w-full flex flex-row gap-6 mt-8'>
                                    <TextField className=' w-5/12'
                                        autofill='off'
                                        id="filled-basic"
                                        label="Email address" variant="filled"
                                        placeholder='Enter your email address.'
                                        sx={{
                                            '& label.Mui-focused': {
                                                color: '#050A0890',
                                            },
                                            '& .MuiFilledInput-root': {
                                                // color: '#050A0860',
                                                fontSize: 13,
                                                fontWeight: '400'
                                            },
                                            '& .MuiFilledInput-underline:before': {
                                                borderBottomColor: '#050A0860',
                                            },
                                            '& .MuiFilledInput-underline:after': {
                                                borderBottomColor: '#050A0890',
                                            },
                                        }} />
                                    <TextField className=' w-5/12'
                                        autofill='off'
                                        id="password"
                                        type='password'
                                        label="Password" variant="filled"
                                        placeholder='Enter your email address.'
                                        sx={{
                                            '& label.Mui-focused': {
                                                color: '#050A0890',
                                            },
                                            '& .MuiFilledInput-root': {
                                                // color: '#050A0860',
                                                fontSize: 13,
                                                fontWeight: '400'
                                            },
                                            '& .MuiFilledInput-underline:before': {
                                                borderBottomColor: '#050A0860',
                                            },
                                            '& .MuiFilledInput-underline:after': {
                                                borderBottomColor: '#050A0890',
                                            },
                                        }} />
                                    {/* <TextField
                                        className='w-5/12'
                                        id="password"
                                        label="Password"
                                        variant="filled"
                                        placeholder='Enter your password'
                                        type={showPassword ? 'text' : 'password'}
                                        InputProps={{
                                            endAdornment:
                                                (
                                                    <InputAdornment position="end">
                                                        <IconButton
                                                            aria-label="toggle password visibility"
                                                            onClick={handleClickShowPassword}
                                                            onMouseDown={handleMouseDownPassword}
                                                            edge="end"
                                                        >
                                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                                        </IconButton>
                                                    </InputAdornment>
                                                )
                                        }}
                                        sx={{
                                            '& label.Mui-focused': {
                                                color: '#050A0890',
                                            },
                                            '& .MuiFilledInput-root': {
                                                fontSize: 13,
                                                fontWeight: '400',
                                            },
                                            '& .MuiFilledInput-underline:before': {
                                                borderBottomColor: '#050A0860',
                                            },
                                            '& .MuiFilledInput-underline:after': {
                                                borderBottomColor: '#050A0890',
                                            },
                                        }}
                                    /> */}
                                </div>
                                <div className='mt-2'>
                                    <button style={{ color: "#552AFF", fontSize: 13, fontWeight: "400" }}>
                                        <u>
                                            Reset Password
                                        </u>
                                    </button>
                                </div>
                                <div className='mt-8' style={{ color: "white" }}>
                                    <Button className='bg-purple hover:bg-purple2 text-white rounded w-full' style={{ fontSize: 15, fontWeight: "400", height: "52px" }}>
                                        Continue
                                    </Button>
                                </div>
                                <div className='mt-6 flex flex-row items-center gap-1'>
                                    <div style={{ fontSize: 12, fontWeight: "400" }}>
                                        Or
                                    </div>
                                    <button onClick={handleContinue} style={{ fontSize: 15, fontWeight: "500" }}>
                                        Signup
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
                {currentIndex === 1 && (
                    <div className='flex flex-col h-screen justify-center' style={{ height: "", }}>
                        <motion.div
                            key="box2"
                            custom={direction}
                            variants={boxVariants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{ duration: 1 }}
                            style={styles}
                        >
                            <div className='w-full flex justify-center'>
                                <div className='w-10/12'>
                                    <div>
                                        <button onClick={handleBack}>
                                            <Image src={'/assets/backarrow.png'} alt='back' height={14} width={16} />
                                        </button>
                                    </div>
                                    <div className='mt-6' style={{ fontSize: 24, fontWeight: "600" }}>
                                        First, claim your unique name
                                    </div>
                                    <div className='text-lightWhite mt-2' style={{ fontSize: 13, fontWeight: "400" }}>
                                        The good ones are still available
                                    </div>
                                    <TextField className=' w-8/12 mt-8'
                                        autofill='off'
                                        id="filled-basic"
                                        label="Name" variant="filled"
                                        value={userName}
                                        onChange={(e) => setUserName(e.target.value)}
                                        placeholder='Voice.ai/ name'
                                        sx={{
                                            '& label.Mui-focused': {
                                                color: '#050A0890',
                                            },
                                            '& .MuiFilledInput-root': {
                                                // color: '#050A0860',
                                                fontSize: 13,
                                                fontWeight: '400'
                                            },
                                            '& .MuiFilledInput-underline:before': {
                                                borderBottomColor: '#050A0860',
                                            },
                                            '& .MuiFilledInput-underline:after': {
                                                borderBottomColor: '#050A0890',
                                            },
                                        }} />

                                    <div>
                                        {
                                            checkUserNameData && checkUserNameData.status === true &&
                                            <div style={{ fontWeight: "400", fontSize: 14, color: "green" }}>
                                                {checkUserNameData.message}
                                            </div>
                                        }
                                    </div>

                                    <div>
                                        {
                                            checkUserNameData && checkUserNameData.status === false &&
                                            <div style={{ fontWeight: "400", fontSize: 14, color: "red" }}>
                                                {checkUserNameData.message}
                                            </div>
                                        }
                                    </div>

                                    {/* <div className='mt-4' style={{ color: '#FF0100', fontSize: 12, fontWeight: "500" }}>
                                        This username seems to be taken already...<br />
                                        Try something similar.
                                    </div> */}

                                    <div>
                                        {
                                            checkUserNameData && checkUserNameData.status === true ?
                                                <div style={{ fontWeight: "400", fontSize: 14, color: "green" }}>
                                                    <Button onClick={handleContinue}
                                                        className='bg-purple hover:bg-purple2 text-white rounded w-full mt-12'
                                                        style={{ fontSize: 15, fontWeight: "400", height: "52px" }}>
                                                        Continue
                                                    </Button>
                                                </div> :
                                                <div style={{ fontWeight: "400", fontSize: 14, color: "green" }}>
                                                    <Button
                                                        disabled
                                                        className='bg-placeholderColor text-white rounded w-full mt-12'
                                                        style={{ fontSize: 15, fontWeight: "400", height: "52px", color: "white" }}>
                                                        Continue
                                                    </Button>
                                                </div>
                                        }
                                    </div>

                                    <div className='mt-6 flex flex-row items-center gap-1'>
                                        <div style={{ fontSize: 12, fontWeight: "400" }}>
                                            Or
                                        </div>
                                        <button onClick={handleBack} style={{ fontSize: 15, fontWeight: "500" }}>
                                            Login
                                        </button>
                                    </div>

                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
                {currentIndex === 2 && (
                    <div className='flex flex-col h-screen justify-center' style={{ height: "", }}>
                        <motion.div
                            key="box3"
                            custom={direction}
                            variants={boxVariants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{ duration: 1 }}
                            style={styles}>
                            <div className='w-full flex justify-center'>
                                <div className='w-10/12'>
                                    <div>
                                        <button onClick={handleBack}>
                                            <Image src={'/assets/backarrow.png'} alt='back' height={14} width={16} />
                                        </button>
                                    </div>
                                    <div className='mt-6 text-lightWhite' style={{ fontWeight: "400", fontSize: 13 }}>
                                        voice.ai/tate is all yours!
                                    </div>
                                    <div className='mt-6' style={{ fontSize: 24, fontWeight: "600" }}>
                                        Now, create your account.
                                    </div>
                                    <div className='w-full flex flex-row gap-6 mt-8'>
                                        <TextField
                                            className='w-5/12'
                                            autoComplete='off'
                                            id="filled-basic"
                                            label="Email address"
                                            variant="filled"
                                            placeholder='Enter your email address.'
                                            value={userEmail}
                                            onChange={(e) => setUserEmail(e.target.value)}
                                            InputProps={{
                                                autoComplete: 'off',
                                            }}
                                            sx={{
                                                '& label.Mui-focused': {
                                                    color: '#050A0890',
                                                },
                                                '& .MuiFilledInput-root': {
                                                    fontSize: 13,
                                                    fontWeight: '400',
                                                },
                                                '& .MuiFilledInput-underline:before': {
                                                    borderBottomColor: '#050A0860',
                                                },
                                                '& .MuiFilledInput-underline:after': {
                                                    borderBottomColor: '#050A0890',
                                                },
                                            }}
                                        />

                                        <TextField className=' w-5/12'
                                            autofill='off'
                                            id="password"
                                            type='password'
                                            label="Password" variant="filled"
                                            placeholder='Enter your email address.'
                                            value={userPassword}
                                            onChange={(e) => setUserPassword(e.target.value)}
                                            sx={{
                                                '& label.Mui-focused': {
                                                    color: '#050A0890',
                                                },
                                                '& .MuiFilledInput-root': {
                                                    // color: '#050A0860',
                                                    fontSize: 13,
                                                    fontWeight: '400'
                                                },
                                                '& .MuiFilledInput-underline:before': {
                                                    borderBottomColor: '#050A0860',
                                                },
                                                '& .MuiFilledInput-underline:after': {
                                                    borderBottomColor: '#050A0890',
                                                },
                                            }} />
                                    </div>
                                    <div>
                                        {
                                            checkUserEmailData && checkUserEmailData.status === true &&
                                            <div style={{ fontWeight: "400", fontSize: 14, color: "green" }}>
                                                {checkUserEmailData.message}
                                            </div>
                                        }
                                        {
                                            checkUserEmailData && checkUserEmailData.status === false &&
                                            <div style={{ fontWeight: "400", fontSize: 14, color: "red" }}>
                                                {checkUserEmailData.message}
                                            </div>
                                        }
                                    </div>
                                    <div>
                                        {
                                            checkUserEmailData && checkUserEmailData.status === true ?
                                                <div style={{ fontWeight: "400", fontSize: 14, color: "green" }}>
                                                    <Button
                                                        onClick={handleContinue}
                                                        sx={{ textDecoration: "none" }}
                                                        className='bg-purple hover:bg-purple2 w-full mt-8'
                                                        style={{ fontSize: 15, fontWeight: "400", color: "white", height: "51px" }}>
                                                        Continue
                                                    </Button>
                                                </div> :
                                                <div style={{ fontWeight: "400", fontSize: 14, color: "green" }}>
                                                    <Button
                                                        disabled
                                                        // onClick={handleContinue}
                                                        sx={{ textDecoration: "none" }}
                                                        className='bg-placeholderColor w-full mt-8'
                                                        style={{ fontSize: 15, fontWeight: "400", color: "white", height: "51px" }}>
                                                        Continue
                                                    </Button>
                                                </div>
                                        }
                                    </div>
                                    <div className='text-lightWhite mt-6' style={{ fontSize: 12, fontWeight: '400', textAlign: "center" }}>
                                        OR
                                    </div>
                                    <div>
                                        <Button
                                            // onClick={handleContinue}
                                            sx={{ textDecoration: "none" }}
                                            className='bg-light-blue hover:bg-light-blue w-full mt-8'
                                            style={{ fontSize: 15, fontWeight: "400", color: "white", height: "51px" }}>
                                            Sign up with Google
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
                {currentIndex === 3 && (
                    <div className='flex flex-col h-screen justify-center' style={{ height: "", }}>
                        <motion.div
                            key="box4"
                            custom={direction}
                            variants={boxVariants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{ duration: 1 }}
                            style={styles}>
                            <div className='w-full flex justify-center'>
                                <div className='w-10/12'>
                                    <div>
                                        <button onClick={handleBack}>
                                            <Image src={'/assets/backarrow.png'} alt='back' height={14} width={16} />
                                        </button>
                                    </div>
                                    <div className='mt-6' style={{ fontSizeL: 24, fontWeight: "600" }}>
                                        Verify email address.
                                    </div>
                                    <div className='text-lightWhite mt-1' style={{ fontSize: 13, fontWeight: "400" }}>
                                        code was sent to tat*********@gmail.com
                                    </div>
                                    {/* <div className='flex flex-row gap-6 mt-8'>
                                        <input
                                            maxLength={1}
                                            type='password'
                                            style={{
                                                height: 50, width: 50, borderRadius: 10, border: "none",
                                                outline: "none", textAlign: "center", backgroundColor: "#EDEDEDC7",
                                            }}
                                        />
                                        <input
                                            maxLength={1}
                                            type='password'
                                            style={{
                                                height: 50, width: 50, borderRadius: 10, border: "none",
                                                outline: "none", textAlign: "center", backgroundColor: "#EDEDEDC7",
                                            }}
                                        />
                                        <input
                                            maxLength={1}
                                            type='password'
                                            style={{
                                                height: 50, width: 50, borderRadius: 10, border: "none",
                                                outline: "none", textAlign: "center", backgroundColor: "#EDEDEDC7",
                                            }}
                                        />
                                        <input
                                            maxLength={1}
                                            type='password'
                                            style={{
                                                height: 50, width: 50, borderRadius: 10, border: "none",
                                                outline: "none", textAlign: "center", backgroundColor: "#EDEDEDC7",
                                            }}
                                        />
                                        <input
                                            maxLength={1}
                                            type='password'
                                            style={{
                                                height: 50, width: 50, borderRadius: 10, border: "none",
                                                outline: "none", textAlign: "center", backgroundColor: "#EDEDEDC7",
                                            }}
                                        />
                                    </div> */}

                                    <div className='flex flex-row gap-4 mt-8'>
                                        <input
                                            id="P1"
                                            type='text'
                                            value={EmailP1}
                                            onChange={(e) => handleInputChange(e, setEmailP1, "P2")}
                                            maxLength={1}
                                            style={{ height: "40px", width: "40px", borderRadius: 6, backgroundColor: "#EDEDEDC7", textAlign: "center", outline: "none", border: "none" }}
                                            onKeyDown={(e) => handleBackspace(e, setEmailP1, null)}
                                        />
                                        <input
                                            id="P2"
                                            type='text'
                                            value={EmailP2}
                                            onChange={(e) => handleInputChange(e, setEmailP2, "P3")}
                                            maxLength={1}
                                            style={{ height: "40px", width: "40px", borderRadius: 6, backgroundColor: "#EDEDEDC7", textAlign: "center", outline: "none", border: "none" }}
                                            onKeyDown={(e) => handleBackspace(e, setEmailP2, "P1")}
                                        />
                                        <input
                                            id="P3"
                                            type='text'
                                            value={EmailP3}
                                            onChange={(e) => handleInputChange(e, setEmailP3, "P4")}
                                            maxLength={1}
                                            style={{ height: "40px", width: "40px", borderRadius: 6, backgroundColor: "#EDEDEDC7", textAlign: "center", outline: "none", border: "none" }}
                                            onKeyDown={(e) => handleBackspace(e, setEmailP3, "P2")}
                                        />
                                        <input
                                            id="P4"
                                            type='text'
                                            value={EmailP4}
                                            onChange={(e) => handleInputChange(e, setEmailP4, null)}
                                            maxLength={1}
                                            style={{ height: "40px", width: "40px", borderRadius: 6, backgroundColor: "#EDEDEDC7", textAlign: "center", outline: "none", border: "none" }}
                                            onKeyDown={(e) => handleBackspace(e, setEmailP4, "P3")}
                                        />
                                    </div>

                                    <div className='flex flex-row gap-1 mt-6'>
                                        <div className='text-lightWhite' style={{ fontSize: 13, fontWeight: "400" }}>
                                            Didn't receive code?
                                        </div>
                                        <button style={{ fontSize: 13, fontWeight: "400" }}>
                                            Resend
                                        </button>
                                    </div>
                                    <Button onClick={handleContinue}
                                        className='w-full bg-purple hover:bg-purple2 text-white mt-8'
                                        style={{ fontWeight: "400", fontSize: 15, height: 50 }}>
                                        Verify
                                    </Button>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
                {currentIndex === 4 && (
                    <div className='flex flex-col h-screen justify-center' style={{ height: "", }}>
                        <motion.div
                            key="box5"
                            custom={direction}
                            variants={boxVariants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{ duration: 1 }}
                            style={styles}>
                            <div className='w-full flex justify-center'>
                                <div className='w-10/12'>
                                    <div>
                                        <button onClick={handleBack}>
                                            <Image src={'/assets/backarrow.png'} alt='back' height={14} width={16} />
                                        </button>
                                    </div>
                                    <div className='mt-6' style={{ fontSizeL: 24, fontWeight: "600" }}>
                                        Add your phone number
                                    </div>
                                    <div className='text-lightWhite mt-2'>
                                        We can use this to share important updates to you
                                    </div>
                                    <div className='mt-6'>
                                        <PhoneNumberInput phonenumber={userNumber} />
                                    </div>
                                    <div>
                                        {
                                            checkUserPhoneNumberData && checkUserPhoneNumberData.status === true &&
                                            <div style={{ fontWeight: "400", fontSize: 14, color: "green" }}>
                                                {checkUserPhoneNumberData.message}
                                            </div>
                                        }
                                        {
                                            checkUserPhoneNumberData && checkUserPhoneNumberData.status === false &&
                                            <div style={{ fontWeight: "400", fontSize: 14, color: "red" }}>
                                                {checkUserPhoneNumberData.message}
                                            </div>
                                        }
                                    </div>
                                    <div>
                                        {
                                            checkUserPhoneNumberData && checkUserPhoneNumberData.status === true ?
                                                <div style={{ fontWeight: "400", fontSize: 14, color: "green" }}>
                                                    <Button
                                                        onClick={handlePhoneVerificationClick}
                                                        className='w-full mt-6 bg-purple hover:bg-purple2 text-white'
                                                        style={{ height: 50, fontSize: 15, fontWeight: "400", color: "white" }}>
                                                        {VerifiyNumberLoader ?
                                                            <CircularProgress size={20} /> :
                                                            "Continue"}
                                                    </Button>
                                                </div> :
                                                <div style={{ fontWeight: "400", fontSize: 14, color: "green" }}>
                                                    <Button
                                                        disabled
                                                        className='w-full mt-6 bg-placeholderColor text-white'
                                                        style={{ height: 50, fontSize: 15, fontWeight: "400", color: "white" }}>
                                                        {VerifiyNumberLoader ?
                                                            <CircularProgress size={20} /> :
                                                            "Continue"}
                                                    </Button>
                                                </div>
                                        }
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
                {
                    currentIndex === 5 && (
                        <div className='flex h-screen flex-col justify-center' style={{ height: "", }}>
                            <motion.div
                                key="box6"
                                custom={direction}
                                variants={boxVariants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                transition={{ duration: 1 }}
                                style={styles}>
                                <div className='w-full flex justify-center'>
                                    <div className='w-10/12'>
                                        <div>
                                            <button onClick={handleBack}>
                                                <Image src={'/assets/backarrow.png'} alt='back' height={14} width={16} />
                                            </button>
                                        </div>
                                        <div className='mt-6' style={{ fontSizeL: 24, fontWeight: "600" }}>
                                            Verify phone number.
                                        </div>
                                        <div className='text-lightWhite mt-1' style={{ fontSize: 13, fontWeight: "400" }}>
                                            4 digit code was sent to number ending with *9083
                                        </div>
                                        {/* <div className='flex flex-row gap-6 mt-8'>
                                            <input
                                                maxLength={1}
                                                type='password'
                                                style={{
                                                    height: 50, width: 50, borderRadius: 10, border: "none",
                                                    outline: "none", textAlign: "center", backgroundColor: "#EDEDEDC7",
                                                }}
                                            />
                                            <input
                                                maxLength={1}
                                                type='password'
                                                style={{
                                                    height: 50, width: 50, borderRadius: 10, border: "none",
                                                    outline: "none", textAlign: "center", backgroundColor: "#EDEDEDC7",
                                                }}
                                            />
                                            <input
                                                maxLength={1}
                                                type='password'
                                                style={{
                                                    height: 50, width: 50, borderRadius: 10, border: "none",
                                                    outline: "none", textAlign: "center", backgroundColor: "#EDEDEDC7",
                                                }}
                                            />
                                            <input
                                                maxLength={1}
                                                type='password'
                                                style={{
                                                    height: 50, width: 50, borderRadius: 10, border: "none",
                                                    outline: "none", textAlign: "center", backgroundColor: "#EDEDEDC7",
                                                }}
                                            />
                                            <input
                                                maxLength={1}
                                                type='password'
                                                style={{
                                                    height: 50, width: 50, borderRadius: 10, border: "none",
                                                    outline: "none", textAlign: "center", backgroundColor: "#EDEDEDC7",
                                                }}
                                            />
                                        </div> */}



                                        <div className='flex flex-row gap-4 mt-4'>
                                            <input
                                                id="P1"
                                                type='text'
                                                value={P1}
                                                onChange={(e) => handleInputChange(e, setP1, "P2")}
                                                maxLength={1}
                                                style={{ height: "40px", width: "40px", borderRadius: 6, backgroundColor: "#EDEDEDC7", textAlign: "center", outline: "none", border: "none" }}
                                                onKeyDown={(e) => handleBackspace(e, setP1, null)}
                                            />
                                            <input
                                                id="P2"
                                                type='text'
                                                value={P2}
                                                onChange={(e) => handleInputChange(e, setP2, "P3")}
                                                maxLength={1}
                                                style={{ height: "40px", width: "40px", borderRadius: 6, backgroundColor: "#EDEDEDC7", textAlign: "center", outline: "none", border: "none" }}
                                                onKeyDown={(e) => handleBackspace(e, setP2, "P1")}
                                            />
                                            <input
                                                id="P3"
                                                type='text'
                                                value={P3}
                                                onChange={(e) => handleInputChange(e, setP3, "P4")}
                                                maxLength={1}
                                                style={{ height: "40px", width: "40px", borderRadius: 6, backgroundColor: "#EDEDEDC7", textAlign: "center", outline: "none", border: "none" }}
                                                onKeyDown={(e) => handleBackspace(e, setP3, "P2")}
                                            />
                                            <input
                                                id="P4"
                                                type='text'
                                                value={P4}
                                                onChange={(e) => handleInputChange(e, setP4, null)}
                                                maxLength={1}
                                                style={{ height: "40px", width: "40px", borderRadius: 6, backgroundColor: "#EDEDEDC7", textAlign: "center", outline: "none", border: "none" }}
                                                onKeyDown={(e) => handleBackspace(e, setP4, "P3")}
                                            />
                                        </div>




                                        <div className='flex flex-row gap-1 mt-6'>
                                            <div className='text-lightWhite' style={{ fontSize: 13, fontWeight: "400" }}>
                                                Didn't receive code?
                                            </div>
                                            <button style={{ fontSize: 13, fontWeight: "400" }}>
                                                Resend
                                            </button>
                                        </div>
                                        <Button onClick={handleVerifyPhoneCode}
                                            className='w-full bg-purple hover:bg-purple2 text-white mt-8'
                                            style={{ fontWeight: "400", fontSize: 15, height: 50 }}>
                                            Verify
                                        </Button>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    )
                }
                {currentIndex === 6 && (
                    <div className='flex flex-col justify-center h-screen' style={{ height: "", }}>
                        <motion.div
                            key="box7"
                            custom={direction}
                            variants={boxVariants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{ duration: 1 }}
                            style={styles}>
                            <div style={{ height: "auto", border: "2px solid green" }}>
                                <div style={{ height: 14 }}>
                                    <button onClick={handleBack}>
                                        <Image src={'/assets/backarrow.png'} alt='back' height={14} width={16} />
                                    </button>
                                </div>
                                {/* <Image src={'/assets/congratulations.png'} alt='congrats' height={445} width={445} /> */}
                                <div style={{ fontSize: 24, fontWeight: "600", textAlign: ' center' }}>
                                    Congratulations
                                </div>
                                <Image
                                    src={'/assets/applogo.png'}
                                    alt='congrats'
                                    height={550}
                                    width={445}
                                    layout="responsive"
                                    objectFit="contain"
                                // style={{
                                //     aspectRatio: '3 / 2',
                                //     maxWidth: '100%',
                                //     height: 'auto'
                                // }}
                                />
                                <div className='flex flex-row mt-6 justify-center w-full gap-1'>
                                    <button style={{ fontSize: 11, fontWeight: "400" }}>
                                        Privacy policy -
                                    </button>
                                    <button style={{ fontSize: 11, fontWeight: "400" }}>
                                        Terms & Condition -
                                    </button>
                                    <button style={{ fontSize: 11, fontWeight: "400" }}>
                                        Cookie Policy
                                    </button>
                                </div>

                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
