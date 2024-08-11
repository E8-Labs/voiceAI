'use client'
import { Button, IconButton, InputAdornment, TextField, Visibility, VisibilityOff } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useState } from "react";
import PhoneNumberInput from '../PhoneNumberInput';

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

    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState(0);
    const [userName, setUserName] = useState("");

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
    }, [currentIndex])

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
                                    <Button onClick={handleContinue} className='bg-purple hover:bg-purple2 text-white rounded w-full' style={{ fontSize: 15, fontWeight: "400", height: "52px" }}>
                                        Continue
                                    </Button>
                                </div>
                                <div className='mt-4'>
                                    <button style={{ fontSize: 12, fontWeight: "500", color: "#00000070" }}>
                                        or SignUp
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

                                    {/* <div className='mt-4' style={{ color: '#FF0100', fontSize: 12, fontWeight: "500" }}>
                                        This username seems to be taken already...<br />
                                        Try something similar.
                                    </div> */}

                                    <Button onClick={handleContinue}
                                        className='bg-purple hover:bg-purple2 text-white rounded w-full mt-12'
                                        style={{ fontSize: 15, fontWeight: "400", height: "52px" }}>
                                        Continue
                                    </Button>

                                    <div className='mt-6' style={{ fontSize: 12, fontWeight: "400" }}>
                                        Or Login
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
                                    </div>
                                    <div>
                                        <Button
                                            onClick={handleContinue}
                                            sx={{ textDecoration: "none" }}
                                            className='bg-purple hover:bg-purple2 w-full mt-8'
                                            style={{ fontSize: 15, fontWeight: "400", color: "white", height: "51px" }}>
                                            Continue
                                        </Button>
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
                                    <div className='flex flex-row gap-6 mt-8'>
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
                                        <PhoneNumberInput />
                                    </div>
                                    <div>
                                        <Button
                                            onClick={handleContinue}
                                            className='w-full mt-6 bg-purple hover:bg-purple2 text-white'
                                            style={{ height: 50, fontSize: 15, fontWeight: "400˝" }}>
                                            Continue
                                        </Button>
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
                                            5 digit code was sent to number ending with *9083
                                        </div>
                                        <div className='flex flex-row gap-6 mt-8'>
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
