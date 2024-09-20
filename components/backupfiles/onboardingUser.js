"use client"
import { motion } from 'framer-motion';
import React, { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import { Alert, Box, Button, CircularProgress, Drawer, Fade, Modal, Slide, Snackbar, TextField } from '@mui/material';
import PhoneNumberInput from '@/components/PhoneNumberInput';
import MakeCallForm from '@/components/MakeCallForm';
import ProfileAnimation from '@/components/animation/ProfileAnimation';
import { useRouter } from 'next/navigation';
import LoginModal from '@/components/loginform/LoginModal';

const backgroundImage = {
    backgroundImage: 'url("/backgroundImage.png")', // Ensure the correct path
    backgroundSize: "cover",
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    width: '100%',
    height: '100vh',
}

const Page = () => {

    const router = useRouter()

    const [isSmallScreen, setIsSmallScreen] = useState(false);
    const [open, setOpen] = useState(false);
    const [userName, setUserName] = useState("");
    const [userLastName, setUserLastName] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState(null);
    const [loading, setLoading] = useState(false);
    const [snackMessage, setSnackMessage] = useState(false);
    const [openBottomForm, setOpenLoginModalDrawer] = useState(false);
    const [openLoginModal, setOpenLoginModal] = useState(false)

    const hideBottom = () => {
        setOpenLoginModalDrawer(false);
    }

    // Call function on small screens
    const smallScreenClick = useCallback(() => {
        const LocalData = localStorage.getItem('User');
        if (LocalData) {
            const D = JSON.parse(LocalData);
            console.log("Data test", D.data);
            handleTalktoBlandy();
        } else {
            setOpenLoginModalDrawer(true);
        }
        console.log('do not touch me');
    }, []);

    // Call function on larger screens
    const handleLargeScreenClick = useCallback(() => {
        const LocalData = localStorage.getItem('User');
        if (LocalData) {
            handleTalktoBlandy();
        } else {
            setOpenLoginModal(true);
        }
        console.log('Phone number is', phoneNumber);
        console.log('User name is', userName);
    }, []);

    // Effect to update screen size status
    useEffect(() => {
        const mediaQuery = window.matchMedia('(max-width: 768px)'); // Adjust the max-width according to your medium screen size breakpoint
        const handleResize = () => setIsSmallScreen(mediaQuery.matches);

        handleResize(); // Check the screen size on component mount
        mediaQuery.addEventListener('change', handleResize); // Add listener for screen resize

        return () => mediaQuery.removeEventListener('change', handleResize); // Cleanup listener on component unmount
    }, []);

    //code for creating account
    const handleClick = async () => {
        const LocalData = localStorage.getItem('User');
        const D = await JSON.parse(LocalData);
        console.log("Local data for auto cll", D.data.user);

        setOpenLoginModal(true);
    }

    // Handle button click
    const handleContinue = () => {
        if (isSmallScreen) {
            smallScreenClick();
        } else {
            handleLargeScreenClick();
        }
    };

    const style = {
        width: 300,
        height: 'auto',
        bgcolor: 'background.paper',
        // border: '2px solid #000',
        boxShadow: 24,
        p: 2,
        mx: 'auto',
        my: '50vh',
        transform: 'translateY(-50%)',
        borderRadius: 2
    };

    const styleLoginModal = {
        // width: 200,
        height: 'auto',
        bgcolor: 'transparent',
        // border: '2px solid #000',
        // boxShadow: 24,
        p: 2,
        mx: 'auto',
        my: '50vh',
        transform: 'translateY(-50%)',
        borderRadius: 2
    };

    const testStyle = {
        bgcolor: "#ffffff"
    }

    //code for apicall
    const handleTalktoBlandy = async () => {
        setLoading(true);
        const LocalData = localStorage.getItem('User');
        let D = null
        if (LocalData) {
            D = JSON.parse(LocalData)

        } else {
            return
        }
        console.log("Tryign to calll ", D.data.user.phone)
        try {
            const axios = require('axios');
            let data = JSON.stringify({
                "name": D.data.user.name,
                "phone": D.data.user.phone,
                "email": D.data.user.email
                // "model": "1712788242190x897503015435501600"
            });

            let config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: 'https://www.blindcircle.com:444/voice/api/calls/make_a_call',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer 1716566901317x213622515056508930'
                },
                data: data
            };

            axios.request(config)
                .then((response) => {
                    console.log(JSON.stringify(response.data));
                })
                .catch((error) => {
                    console.log(error);
                });
        } catch (error) {
            console.error('Error occured is :', error);
        } finally {
            setLoading(false);
            setSnackMessage(true);
            setOpen(false);
            console.log('Response is true');
        }
    }


    return (
        <div style={backgroundImage} className='flex flex-col justify-between h-full'>
            <div className='pt-8 ps-8'>
                <div className='2xl:flex hidden px-6 py-2 flex gap-4 flex-row items-center'
                    style={{ border: "2px solid #ffffff", borderRadius: 50, width: "13%" }}>
                    <div style={{ border: "2px solid black", borderRadius: "50%",  }}>
                        <Image src={"/assets/profile.png"} alt='profilephoto' height={40} width={40} style={{ resize: "cover" }} />
                    </div>
                    <div>
                        <div style={{ fontSize: 15, fontWeight: "400" }}>
                            Tate.AI
                        </div>
                        <div className='flex flex-row gap-4'>
                            <button>
                                <Image
                                    layout='responsive'
                                    objectFit='contain' src={"/assets/twitter.png"} alt='social' height={15} width={15} style={{ resize: "cover" }} />
                            </button>
                            <button>
                                <Image
                                    layout='responsive'
                                    objectFit='contain' src={"/assets/instagram.png"} alt='social' height={15} width={15} style={{ resize: "cover" }} />
                            </button>
                        </div>
                    </div>
                </div>
                <div className='2xl:hidden flex items-center'>
                    <ProfileAnimation />
                </div>
            </div>

            {/*<Image src={"/assets/applogo.png"} height={400} width={400} /> Show when screen is larger than medium */}
            <div className='flex items-center justify-center flex-1 md:flex hidden'>
                <motion.img
                    src="/assets/applogo.png" // Ensure this path is correct
                    alt="Animating Image"
                    animate={{
                        width: ["400px", "300px", "400px"],  // Keyframes for width
                        height: ["400px", "300px", "400px"], // Keyframes for height
                    }}
                    transition={{
                        duration: 10,
                        repeat: Infinity,
                        repeatType: "loop",
                        ease: "easeInOut",
                    }}
                    style={{
                        margin: "auto",
                        display: "block",
                        width: "400px", // Initial width
                        height: "400px", // Initial height
                    }}
                />
            </div>

            {/* show when screen is medium size */}
            <div className='flex items-center justify-center flex-1 md:hidden'>
                <motion.img
                    src="/assets/applogo.png" // Ensure this path is correct
                    alt="Animating Image"
                    animate={{
                        width: ["80vw", "60vw", "80vw"],  // Keyframes for width
                        height: ["80vw", "60vw", "80vw"], // Keyframes for height
                    }}
                    transition={{
                        duration: 10,
                        repeat: Infinity,
                        repeatType: "loop",
                        ease: "easeInOut",
                    }}
                    style={{
                        margin: "auto",
                        display: "block",
                        width: "50vw", // Initial width in viewport width units
                        height: "50vw", // Initial height in viewport width units
                        // maxWidth: "100%", // Ensures image doesn't exceed the container's width
                        // maxHeight: "100%", // Ensures image doesn't exceed the container's height
                    }}
                />
            </div>

            <div className='flex items-end ms-8 mb-12 rounded' style={{ backgroundColor: "#620FEB66", width: "fit-content" }}>
                <button className='flex flex-row p-4 items-center gap-6' onClick={handleContinue}>
                    <div className='text-white' style={{ fontSize: 17, fontWeight: "600" }}>
                        Start calling
                    </div>
                    <Image src={"/assets/phone.png"} alt='phone' height={20} width={20} />
                </button>
            </div>

            <Modal
                open={openLoginModal}
                onClose={(() => setOpenLoginModal(false))}
                closeAfterTransition
                BackdropProps={{
                    timeout: 1000,
                    sx: {
                        backgroundColor: 'transparent',
                        backdropFilter: 'blur(40px)',
                    },
                }}
            >
                <Box className="lg:w-4/12 sm:w-7/12"
                    sx={styleLoginModal}
                >
                    <LoginModal closeForm={setOpenLoginModal} />
                </Box>
            </Modal>

            <Drawer
                open={openBottomForm}
                onClose={() => setOpenLoginModalDrawer(false)}
                anchor='bottom'
                BackdropProps={{
                    timeout: 1000,
                    sx: {
                        backgroundColor: 'transparent',
                        backdropFilter: 'blur(40px)',
                    },
                }}
                sx={{
                    '& .MuiDrawer-paper': {
                        height: 'auto',
                        padding: 2,
                        // backgroundColor: '#ffffff90'
                    }
                }}>
                <div>
                    <div className=''>
                        <LoginModal closeForm={hideBottom} />
                    </div>
                </div>
            </Drawer>
            <Snackbar
                open={snackMessage}
                autoHideDuration={5000}
                onClose={() => setSnackMessage(false)}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right'
                }}
                TransitionComponent={Slide}
                TransitionProps={{
                    direction: 'left'
                }}
            >
                <Alert
                    onClose={() => setSnackMessage(false)}
                    severity="success"
                    sx={{ width: '100%' }}>
                    You will recieve call soon.
                </Alert>
            </Snackbar>

        </div>
    )
}

export default Page;
