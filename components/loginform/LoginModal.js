'use client'
import { AnimatePresence, motion } from 'framer-motion';
import React, { useState, useEffect } from 'react'
import CreateAccount from './CreateAccount';
import VerifyPhoneNumber from './VerifyPhoneNumber';
import AddCard from './Addcard/AddCard';
import Signin from './Signin';
import Image from 'next/image';
import { CircularProgress } from '@mui/material';
import axios from 'axios';
import Apis from '../apis/Apis';

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

const LoginModal = ({ closeForm, creator, assistantData }) => {

    const [currentIndex, setCurrentIndex] = useState(1);
    const [direction, setDirection] = useState(1);
    const [userLoginDetails, setUserLoginDetails] = useState(null);
    const [isWideScreen, setIsWideScreen] = useState(false);
    const [verificationId, setVerificationId] = useState('');
    //code for getting location
    const [location, setLocation] = useState({ lat: null, lng: null });
    const [error, setError] = useState(null);
    const [locationLoader, setLocationLoader] = useState(false);
    const [city, setCity] = useState('');
    const [state, setState] = useState('');

    useEffect(() => {
        const handleResize = () => {
            setIsWideScreen(window.innerWidth >= 768);
        };

        handleResize(); // Set initial state
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
    const handleContinue = (details) => {
        // handleCurrentIndex();
        setDirection(1);
        setCurrentIndex((prevIndex) => prevIndex + 1);
        setUserLoginDetails(details);
    };
    const getVerificationId = (id) => {
        setVerificationId(id)
    }

    // const handleContinueT = (details) => {
    //     // handleCurrentIndex();
    //     setDirection(1);
    //     setCurrentIndex((prevIndex) => prevIndex + 1);
    //     setUserLoginDetails(details);
    // };

    const handleBack = () => {
        setDirection(-1);
        setCurrentIndex((prevIndex) => prevIndex - 1);
    };

    const handleSignin = () => {
        setDirection(-2);
        setCurrentIndex((prevIndex) => prevIndex - 2);
    };

    const containerStyles = {
        position: 'relative',
        // height: '40vh',
        // width: '50vw',
        overflow: 'hidden',
        // border: "2px solid red",
    };

    const styles = {
        // position: 'absolute', // Ensures the boxes are stacked on top of each other
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "white",
        // height: "20vh",
        // marginLeft: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5
        // marginInline: 10,
        // border: "2px solid red",
    };

    const shdowBorder = {
        backgroundColor: "#ffffff23", padding: 30, borderRadius: 8
    }

    const getUserLocation = async () => {
        setLocationLoader(true);
        try {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    async (position) => {
                        const { latitude, longitude } = position.coords;
                        setLocation({ lat: latitude, lng: longitude });
                        // const latitude = 34.0549
                        // const longitude = -118.2426
                        setError(null);

                        // Call Nominatim API to get city and state
                        const response = await fetch(
                            `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`
                        );
                        const data = await response.json();
                        console.log("Data of get location api", data)
                        if (data.address) {
                            setCity(data.address.city || 'City not found');
                            setState(data.address.state || 'State not found');
                            const localData = localStorage.getItem('User');
                            if (localData) {
                                try {
                                    const Data = JSON.parse(localData);
                                    console.log("Loasdfoiefh0", Data.data.user);
                                    // return
                                    const AuthToken = Data.data.token;
                                    const formData = new FormData();
                                    console.log("City sending in api", data.address.city);
                                    console.log("State sending in api", data.address.state);
                                    if (data.address.city) {
                                        formData.append('city', data.address.city);
                                    }
                                    formData.append('state', data.address.state);

                                    // Log all the form data key-value pairs
                                    for (const [key, value] of formData.entries()) {
                                        console.log(`${key}: ${value}`);
                                    }

                                    const response = await axios.post(Apis.updateProfile, formData, {
                                        headers: {
                                            "Authorization": "Bearer " + AuthToken
                                        }
                                    });
                                    if (response) {
                                        console.log("response of api is", response.data);

                                        if (response.data.status === true) {
                                            handleContinue();
                                        } else {
                                            console.log("status is false due to", response.data.message);
                                        }
                                    }
                                } catch (error) {
                                    console.error("Error occured in update api", error);
                                } finally {
                                    setLocationLoader(false);
                                }
                            } else {
                                console.error("No data stored on localstorage");
                            }
                        } else {
                            setError('City and state not found.');
                        }
                    },
                    (err) => {
                        setError('Error getting location: ' + err.message);
                    }
                );
            } else {
                setError('Geolocation is not supported by this browser.');
            }
        } catch (error) {
            console.error("ERR occured in getlocation api");
        } finally {
            // setLocationLoader(false);
        }
    };

    return (
        <div className='flex flex-row justify-center' style={containerStyles}>
            <AnimatePresence initial={false} custom={direction}>
                {currentIndex === 0 && (
                    <div className='flex flex-col w-full h- justify-center' style={shdowBorder}>
                        <motion.div
                            key="box1"
                            custom={direction}
                            variants={boxVariants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{ duration: 0 }}
                            style={styles} className='px-3 py-5'
                        >
                            <div className='w-full'>
                                <Signin handleContinue={handleContinue} closeForm={closeForm} />
                            </div>
                        </motion.div>
                    </div>
                )}
                {currentIndex === 1 && (
                    <div className='flex flex-col w-full xl:w-9/12 2xl:w-8/12 md:w-9/12  justify-center' style={isWideScreen ? shdowBorder : {}}>
                        <motion.div
                            key="box2"
                            custom={direction}
                            variants={boxVariants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{ duration: 0 }}
                            style={styles}
                            className='p-6'
                        >
                            <div className='w-full'>
                                <CreateAccount
                                    creator={creator} modalData={assistantData}
                                    handleContinue={handleContinue} handleBack={handleBack} getVerificationId={getVerificationId} closeForm={closeForm} />
                            </div>
                        </motion.div>
                    </div>
                )}

                {currentIndex === 2 && (
                    <div className='flex flex-col w-full lg:w-10/12 xl:w-8/12 h- justify-center' style={isWideScreen ? shdowBorder : {}}>
                        <motion.div
                            className='px-3 py-5'
                            key="box3"
                            custom={direction}
                            variants={boxVariants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{ duration: 0 }}
                            style={styles}
                        >
                            <div className='w-full lg:w-full '>
                                <VerifyPhoneNumber handleContinue={handleContinue} verificationId={verificationId} userLoginDetails={userLoginDetails} handleBack={handleBack} handleSignin={handleSignin} />
                            </div>
                        </motion.div>
                    </div>
                )}

                {currentIndex === 3 && (
                    <div className='flex flex-col w-full xl:w-10/12 h- justify-center' style={isWideScreen ? shdowBorder : {}}>
                        <motion.div
                            className='px-3 py-5'
                            key="box4"
                            custom={direction}
                            variants={boxVariants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{ duration: 0 }}
                            style={styles}
                        >
                            <div className='w-full'>
                                {/* <AddCard handleBack={handleBack} closeForm={closeForm} /> */}
                                <div style={{ backgroundColor: 'white', padding: 18, borderRadius: 15 }}>
                                    <div style={{ fontWeight: '700', fontSize: 24, fontFamily: 'inter' }}>
                                        First 5 minutes are on us!
                                    </div>
                                    <div className='text-lightWhite'
                                        style={{ fontWeight: "bold", fontSize: 13, fontFamily: "inter", marginTop: 10, color: "#050A0895" }}>
                                        We have got your first 5 minutes covered! Anything more is just $1 per minute to get some of the best advice of your life.
                                        <br /> <br />You are only charged for minutes talked. We add 10 minutes to your account when it drops below 2 minutes.
                                        <br /><br />Enjoy!
                                    </div>
                                    <div className='flex flex-row justify-between w-full' style={{ marginTop: 30 }}>
                                        <div>
                                            {/* <button onClick={handleBack}>
                                                <Image src="/assets/backArrow.png" height={9} width={13} alt='back' />
                                            </button> */}
                                        </div>
                                        <div>
                                            <button onClick={handleContinue} className='bg-purple px-6 py-2 text-white' style={{ fontWeight: "400", fontFamily: "inter", fontSize: 15, borderRadius: "50px" }}>
                                                Continue
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}

                {currentIndex === 4 && (
                    <div className='flex flex-col w-full lg:w-10/12 xl:w-8/12 h- justify-center' style={isWideScreen ? shdowBorder : {}}>
                        <motion.div
                            className='px-3 py-5'
                            key="box5"
                            custom={direction}
                            variants={boxVariants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{ duration: 0 }}
                            style={styles}
                        >
                            <div className='w-full px-6 py-4'>
                                {/* <button onClick={handleBack}>h</button> */}
                                {/* <AddCard handleBack={handleBack} closeForm={closeForm} /> */}

                                <div style={{ fontWeight: '600', fontSize: 24, fontFamily: 'inter' }}>
                                    Location Permission
                                </div>

                                <div className='mt-2' style={{ fontWeight: '400', fontSize: 14, fontFamily: 'inter' }}>
                                    Allow mycreatorx to access your location while using the app
                                </div>

                                {/* Display location or error */}
                                <div className='mt-4' style={{ height: 15 }}>
                                    {/* <p>City: {city}</p> */}
                                    {/* {city != '' && state != '' && (
                                        <div>
                                            <p>City: {city}</p>
                                            <p>State: {state}</p>
                                            {error && <p>Error: {error}</p>}
                                        </div>
                                    )} */}
                                </div>

                                <div className='mt-8 w-full flex flex-row justify-end'>
                                    {
                                        locationLoader ?
                                            <CircularProgress size={25} /> :
                                            <button
                                                className='bg-purple'
                                                onClick={getUserLocation}
                                                style={{
                                                    padding: '10px 20px',
                                                    fontSize: '16px', fontFamily: 'inter',
                                                    color: 'white',
                                                    borderRadius: '50px'
                                                }}
                                            >
                                                Allow location
                                            </button>
                                    }
                                </div>

                            </div>
                        </motion.div>
                    </div>
                )}
                {currentIndex === 5 && (
                    <div className='flex flex-col w-full lg:w-10/12 xl:w-8/12 h- justify-center' style={isWideScreen ? shdowBorder : {}}>
                        <motion.div
                            className='px-3 py-5'
                            key="box6"
                            custom={direction}
                            variants={boxVariants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{ duration: 0 }}
                            style={styles}
                        >
                            <div className='w-full px-6 py-4'>
                                {/* <button onClick={handleBack}>h</button> */}
                                <AddCard handleBack={handleBack} closeForm={closeForm} />
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    )
}

export default LoginModal