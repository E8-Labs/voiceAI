"use client"
import { useState, useCallback, useEffect, useRef } from 'react';  // useRef added
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { Box, Drawer, Modal, Snackbar, Alert, Slide } from '@mui/material';
import { useParams, useRouter } from 'next/navigation';
import ProfileAnimation from '@/components/animation/ProfileAnimation';
import LoginModal from '@/components/loginform/LoginModal';
import axios from 'axios';
import Apis from '@/components/apis/Apis';
import CycleArray from '@/components/animation/TestAnimation';

const backgroundImage = {
    backgroundImage: 'url("/backgroundImage.png")', // Ensure the correct path
    backgroundSize: "cover",
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    width: '100%',
    height: '100vh',
}

const Page = () => {
    const router = useRouter();
    const buttonRef = useRef(null);
    const buttonRef2 = useRef(null);

    const [isSmallScreen, setIsSmallScreen] = useState(false);
    const [open, setOpen] = useState(false);
    const [userName, setUserName] = useState("");
    const [userLastName, setUserLastName] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState(null);
    const [loading, setLoading] = useState(false);
    const [snackMessage, setSnackMessage] = useState(false);
    const [openBottomForm, setOpenLoginModalDrawer] = useState(false);
    const [openLoginModal, setOpenLoginModal] = useState(false);
    const [showCreatorBtn, setShowCreatorBtn] = useState(false);
    const [showProfileIcon, setShowProfileIcon] = useState(false);

    const [boxVisible, setBoxVisible] = useState(true);  // Animation state
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });  // Mouse position state

    const [getRecentCallData, setGetRecentCallsData] = useState([]);
    const [getAssistantData, setGetAssistantData] = useState(null);
    const [showLogoutBtn, setShowLogoutBtn] = useState(false);

    const { creator } = useParams();

    //move to become creator
    const handleCreatorXClick = () => {
        router.push('/creator/onboarding2')
    }

    //code for logoutbtn

    const handleshowLogoutBtn = () => {
        setShowLogoutBtn(!showLogoutBtn);
    }

    const handleLogout = () => {
        localStorage.removeItem('User');
        window.location.reload();
    }

    const getUserData = async () => {
        console.log("Username for testing", creator);
        const ApiPath = `${Apis.GetAssistantData}?username=${creator}`;
        console.log("Api path is", ApiPath);
        try {
            const getResponse = await axios.get(ApiPath, {
                headers: {
                    "Content-Type": "application/json"
                }
            });
            if (getResponse) {
                console.log("Response of getassistant data", getResponse.data);
                setGetAssistantData(getResponse.data.data);
            } else {
                console.log("Error occured");
            }
        } catch (error) {
            console.error("Error occured in getassistant api is", error);
        }
    }

    useEffect(() => {
        getUserData()
    }, []);

    //code to remove the route data
    useEffect(() => {
        setTimeout(() => {
            localStorage.removeItem('route')
        }, 1000);
    }, [])



    // const CycleArray = ({ data }) => {
    //     const [currentIndex, setCurrentIndex] = useState(0);

    //     useEffect(() => {
    //         if (data.length === 0) return;

    //         const intervalDuration = 15000;
    //         const interval = setInterval(() => {
    //             setCurrentIndex(prevIndex => (prevIndex + 1) % data.length);
    //         }, intervalDuration);

    //         return () => clearInterval(interval);
    //     }, [data]);

    //     const variants = {
    //         hidden: { opacity: 0, y: 50 },
    //         visible: { opacity: 1, y: 0 },
    //         exit: { opacity: 0, y: -50 },
    //     };

    //     return (
    //         <motion.div
    //             key={currentIndex}
    //             initial="hidden"
    //             animate="visible"
    //             exit="exit"
    //             variants={variants}
    //             transition={{ duration: 0.5, }}
    //         >
    //             <div className='flex flex-row gap-2'
    //                 style={{
    //                     backgroundColor: "white",
    //                     padding: 15,
    //                     borderRadius: 20,
    //                     paddingTop: 20,
    //                     width: "250px"
    //                 }}>
    //                 <div>
    //                     {
    //                         data[currentIndex] && data[currentIndex].caller.profile_image ?
    //                             <Image src={data[currentIndex].caller.profile_image} alt='profile' height={31} width={31} style={{ borderRadius: "50%" }} /> :
    //                             // <Image src="/assets/profile1.png" alt='profile' height={31} width={31} />
    //                             <div className='text-white flex items-center justify-center' style={{ height: 30, width: 30, backgroundColor: "red", borderRadius: "50%" }}>
    //                                 H
    //                             </div>
    //                     }
    //                 </div>
    //                 <div>
    //                     <div className='flex flex-row gap-1'>
    //                         <Image src="/assets/callLogo.png" alt='logo' height={10} width={13} />
    //                         <div style={{ fontSize: 13, fontWeight: "400", color: "#00000047" }}>
    //                             Live Call
    //                         </div>
    //                     </div>
    //                     <div className='flex flex-row items-center gap-1' style={{ fontWeight: "400", fontSize: 15 }}>
    //                         On Call with <span style={{ fontWeight: "500", fontSize: 18 }}>
    //                             {
    //                                 data[currentIndex] &&
    //                                 data[currentIndex].model.name
    //                             }
    //                         </span>
    //                     </div>
    //                 </div>
    //             </div>
    //         </motion.div>
    //     );
    // };

    //getting user data when logged in

    useEffect(() => {
        const LocalData = localStorage.getItem('User');
        const D = JSON.parse(LocalData);
        console.log("Login details from localstorage", D);
        if (LocalData) {
            setShowProfileIcon(true);
            if (D.data.user.role === "caller") {
                setShowCreatorBtn(true);
            } else {
                setShowCreatorBtn(false);
            }
        } else {
            setShowProfileIcon(false);
            setShowCreatorBtn(false);
        }
    }, [])




    const hideBottom = () => {
        setOpenLoginModalDrawer(false);
    }

    //code for recent calls api

    const getRecentCalls = async () => {
        try {
            const response = await axios.get(Apis.GetRecentCalls, {
                headers: {
                    "Content-Type": "application/json"
                }
            });
            if (response) {
                console.log("respose of get recentcalls api", response.data);
                setGetRecentCallsData(response.data.data);
            }
        } catch (error) {
            console.error("Error occured in getrecent calls api", error);
        }
    }

    useEffect(() => {
        getRecentCalls()
    }, []);

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

    const styleLoginModal = {
        height: 'auto',
        bgcolor: 'transparent',
        p: 2,
        mx: 'auto',
        my: '50vh',
        transform: 'translateY(-50%)',
        borderRadius: 2
    };

    // Animation handler
    const handleMouseMove = (event) => {
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        const x = event.clientX;
        const y = event.clientY;

        setMousePosition({ x, y });

        // Check if the mouse is within 100px of the center
        if (Math.abs(x - centerX) <= 150 && Math.abs(y - centerY) <= 150) {
            setBoxVisible(false); // Hide the box
        } else {
            // Check if the mouse is over the button
            if (buttonRef.current) {
                const rect = buttonRef.current.getBoundingClientRect();
                if (x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom) {
                    setBoxVisible(false);  // Hide the animation when hovering over the button
                } else {
                    setBoxVisible(true);   // Show the animation otherwise
                }
            } else {
                setBoxVisible(true);  // Show the box if the button ref is not available
            }
            if (buttonRef2.current) {
                const rect = buttonRef2.current.getBoundingClientRect();
                if (x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom) {
                    setBoxVisible(false);  // Hide the animation when hovering over the button
                } else {
                    setBoxVisible(true);   // Show the animation otherwise
                }
            } else {
                setBoxVisible(true);  // Show the box if the button ref is not available
            }
        }
    };

    //code for apicall
    const handleTalktoBlandy = async () => {
        setLoading(true);
        const LocalData = localStorage.getItem('User');
        let D = null;
        if (LocalData) {
            D = JSON.parse(LocalData);
        } else {
            return;
        }
        console.log("Trying to call", D.data.user.phone);
        try {
            const axios = require('axios');
            let data = JSON.stringify({
                "name": D.data.user.name,
                "phone": D.data.user.phone,
                "email": D.data.user.email
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
            console.error('Error occurred:', error);
        } finally {
            setLoading(false);
            setSnackMessage(true);
            setOpen(false);
            console.log('Response is true');
        }
    }

    return (
        <div style={backgroundImage} className='flex flex-col justify-between h-full' onMouseMove={handleMouseMove}>
            <div className='pt-8 ps-8'>
                <div className='2xl:flex hidden w-full flex flex-row justify-between'>
                    <div className='px-6 py-2 flex gap-4 flex-row items-center'
                        style={{ border: "2px solid #ffffff", borderRadius: 50, width: "13%" }}>
                        <div className='flex flex-row items-center'>
                            <div style={{ border: "2px solid black", borderRadius: "50%" }}>
                                <Image src={"/assets/profile.png"} alt='profilephoto' height={40} width={40} style={{ resize: "cover" }} />
                            </div>
                            <div style={{ height: "5px", width: "5px", backgroundColor: "black", borderTopRightRadius: "10px", borderBottomRightRadius: "10px" }} />
                        </div>
                        <div>
                            <div className='flex flex-row items-center gap-8'>
                                <div style={{ fontSize: 16, fontWeight: "400", fontFamily: "inter" }}>
                                    {getAssistantData &&
                                        <div style={{ fontSize: 16, fontWeight: "400", fontFamily: "inter" }}>
                                            {
                                                getAssistantData.name ?
                                                    <div style={{ fontSize: 16, fontWeight: "400", fontFamily: "inter" }}>
                                                        {getAssistantData.name}
                                                    </div> :
                                                    <div style={{ fontSize: 16, fontWeight: "400", fontFamily: "inter" }}>
                                                        {getAssistantData.assitant.name}
                                                    </div>
                                            }
                                        </div>
                                    }
                                </div>
                                <div className='flex flex-row gap-4'>
                                    <button>
                                        <Image
                                            layout='responsive'
                                            objectFit='contain' src={"/assets/twitter.png"} alt='social' height={11} width={11} style={{ resize: "cover" }} />
                                    </button>
                                    <button>
                                        <Image
                                            layout='responsive'
                                            objectFit='contain' src={"/assets/instagram.png"} alt='social' height={11} width={11} style={{ resize: "cover" }} />
                                    </button>
                                </div>
                            </div>
                            <div className='flex flex-row'>
                                <div style={{ fontSize: 12, color: "grey", fontWeight: "400", fontFamily: "inter" }}>
                                    Calls:
                                </div>
                                <div className='' style={{ fontWeight: "300", fontFamily: "inter", fontSize: 13 }}>
                                    {
                                        getAssistantData &&
                                        <div>
                                            {getAssistantData.calls ?
                                                <div className='ms-1' style={{ fontWeight: "300", fontFamily: "inter", fontSize: 13 }}>
                                                    {getAssistantData.calls}
                                                </div> :
                                                <div className='ms-1' style={{ fontWeight: "300", fontFamily: "inter", fontSize: 13 }}>
                                                    0
                                                </div>
                                            }
                                        </div>
                                    }
                                </div>
                                <div className='ms-2' style={{ fontSize: 12, color: "grey", fontWeight: "400", fontFamily: "inter" }}>
                                    Earned:
                                </div>
                                <div className='' style={{ fontWeight: "300", fontFamily: "inter", fontSize: 13 }}>
                                    {
                                        getAssistantData &&
                                        <div>
                                            {getAssistantData.earned ?
                                                <div className='ms-1' style={{ fontWeight: "300", fontFamily: "inter", fontSize: 13 }}>
                                                    {getAssistantData.earned} $
                                                </div> :
                                                <div className='ms-1' style={{ fontWeight: "300", fontFamily: "inter", fontSize: 13 }}>
                                                    0$
                                                </div>
                                            }
                                        </div>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>

                    {
                        showProfileIcon &&
                        <div ref={buttonRef2} style={{ width: "8%" }}>
                            <div className='flex flex-row gap-4 items-center'>
                                {
                                    showLogoutBtn &&
                                    <div>
                                        <button onClick={handleLogout} style={{ color: "red" }}>
                                            Logout
                                        </button>
                                    </div>
                                }
                                <button onClick={handleshowLogoutBtn} className='me-8'>
                                    <Image src="/assets/profile1.png" alt='profile' height={40} width={40} />
                                </button>
                            </div>
                        </div>
                    }

                </div>
                <div className='2xl:hidden flex items-center justify-between'>
                    <ProfileAnimation />
                    {
                        showProfileIcon &&
                        <div className='flex flex-row gap-4 items-center'>
                            {
                                showLogoutBtn &&
                                <div>
                                    <button onClick={handleLogout} style={{ color: "red" }}>
                                        Logout
                                    </button>
                                </div>
                            }
                            <button onClick={handleshowLogoutBtn} className='me-8'>
                                <Image src="/assets/profile1.png" alt='profile' height={40} width={40} />
                            </button>
                        </div>
                    }
                </div>
            </div>

            {/* Animating Image */}
            <div className='w-full flex justify-center items-center'>
                <button className='flex items-center justify-center flex-1' onClick={handleContinue}
                    style={{
                        cursor: "pointer",
                        outline: "none",
                        border: "none",
                    }}>
                    <motion.img
                        src="/assets/applogo.png"
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
                </button>
            </div>

            {/* Mouse Following Box Animation */}
            <div className='lg:flex hidden'>
                <AnimatePresence>
                    {boxVisible && (
                        <motion.div
                            style={{
                                position: 'absolute',
                                top: mousePosition.y - 25,
                                left: mousePosition.x - 25,
                                width: 100,
                                height: 100,
                                backgroundColor: '#ffffff60',
                                borderRadius: "50%",
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1.2 }}
                            exit={{ opacity: 0, scale: 0.5 }}
                            transition={{ duration: 0.3 }}
                        >
                            <div style={{ color: 'black' }}>
                                Tap to call
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>


            {/* Button and Snackbar */}
            <div className='w-full flex items-end justify-between mb-12 rounded'>
                <div ref={buttonRef} className='flex items-end ms-8 px-4' style={{ backgroundColor: "#620FEB66", width: "fit-content", borderRadius: "70px" }}>
                    {
                        showCreatorBtn &&
                        <button className='flex flex-row p-4 items-center gap-4'>
                            <Image src={"/assets/stars.png"} alt='phone' height={20} width={20} />
                            <div onClick={handleCreatorXClick} className='text-white' style={{ fontSize: 17, fontWeight: "600" }}>
                                Build Your CreatorX
                            </div>
                        </button>
                    }
                </div>
                <div className='me-8 md:flex hidden'>
                    {/* <div className='flex flex-row gap-2'
                        style={{
                            backgroundColor: "white",
                            padding: 15,
                            borderRadius: 8,
                            width: "250px",
                            paddingTop: 20
                        }}>
                        <div>
                            <Image src="/assets/profile1.png" alt='profile' height={31} width={31} layout='' />
                        </div>
                        <div>
                            <div className='flex flex-row gap-1'>
                                <Image src="/assets/callLogo.png" alt='logo' height={10} width={13} />
                                <div style={{ fontSize: 13, fontWeight: "400", color: "#00000047" }}>
                                    Live Call
                                </div>
                            </div>
                            <div className='flex flex-row items-center gap-1' style={{ fontWeight: "400", fontSize: 15 }}>
                                On Call with <span style={{ fontWeight: "500", fontSize: 18 }}>
                                    <CycleArray data={getRecentCallData} />
                                </span>
                            </div>
                        </div>
                    </div> */}
                    <CycleArray data={getRecentCallData} />
                </div>
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
                    <LoginModal creator={creator} assistantData={getAssistantData} closeForm={setOpenLoginModal} />
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
                    }
                }}>
                <div>
                    <div className=''>
                        <LoginModal creator={creator} assistantData={getAssistantData} closeForm={hideBottom} />
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
                    You will receive a call soon.
                </Alert>
            </Snackbar>
        </div>
    );
}

export default Page;
