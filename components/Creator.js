"use client"
import { useState, useCallback, useEffect, useRef } from 'react'; // useRef added
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { Box, Drawer, Modal, Snackbar, Alert, Slide, Fade } from '@mui/material';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
// import ProfileAnimation from '@/components/animation/ProfileAnimation';
import ProfileAnimation from './animation/ProfileAnimation';
// import LoginModal from '@/components/loginform/LoginModal';
import LoginModal from './loginform/LoginModal';
import axios from 'axios';
// import Apis from '@/components/apis/Apis';
import Apis from './apis/Apis';
// import CycleArray from '@/components/animation/CycleArray';
import CycleArray from './animation/CycleArray';
// import AnimatedButton from '@/components/testcomponents/Dropdown';
import AnimatedButton from './testcomponents/Dropdown';
// import MetaTags from '@/components/Metatags/MetaTags';
import MetaTags from './Metatags/MetaTags';

const backgroundImage = {
    backgroundImage: 'url("/backgroundImage.png")', // Ensure the correct path
    backgroundSize: "cover",
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    width: '100%',
    height: '100vh',
    overflow: 'hidden'
}

// const gifBackgroundImage = {
//     backgroundImage: 'url("/assets/applogo2.png")', // Ensure the correct path
//     backgroundSize: "cover",
//     backgroundRepeat: 'no-repeat',
//     backgroundPosition: 'center',
//     width: isHighScreen ? '500px' : '800px',
//     height: isHighScreen ? '500px' : '800px',
//     borderRadius: "50%",
//     resize: "cover",
// }

const Creator = () => {
    const router = useRouter();
    const buttonRef = useRef(null);
    const buttonRef2 = useRef(null);
    const buttonRef3 = useRef(null);
    const buttonRef4 = useRef(null);
    const buttonRef5 = useRef(null);
    const buttonRef6 = useRef(null);

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
    const [showCreatorBtn, setShowCreatorBtn] = useState(true);
    const [showProfileIcon, setShowProfileIcon] = useState(false);

    const [boxVisible, setBoxVisible] = useState(false); // Animation state
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 }); // Mouse position state
    const { creator } = useParams();
    const searchParams = useSearchParams();
    const from = searchParams.get('from');
    const [getRecentCallData, setGetRecentCallsData] = useState([]);
    const [getAssistantData, setGetAssistantData] = useState(null);
    const [showLogoutBtn, setShowLogoutBtn] = useState(false);
    const [showPopup, setshowPopup] = useState(true);
    const [isWideScreen, setIsWideScreen] = useState(false);
    const [isWideScreen2, setIsWideScreen2] = useState(false);
    const [isHighScreen, setIsHighScreen] = useState(false);
    const [openClaimPopup, setOpenClaimPopup] = useState(false);
    const [showBorderProfile, setShowBorderedProfile] = useState(false);
    // for side animation
    const [isVisible, setisVisible] = useState(true);
    const [callErr, setCallErr] = useState(false);
    const [callErrMsg, setCallErrMsg] = useState(null);
    const [profileData, setProfileData] = useState(null);
    const [assistantDataErr, setAssistantDataErr] = useState(null);
    const [creatorErr, setCreatorErr] = useState(true);
    // useEffect(() => {
    //     const localData = localStorage.getItem('User');
    //     if (localData) {
    //         const Data = JSON.parse(localData);
    //         setProfileData(Data.data.user);
    //     }
    // }, []);
    useEffect(() => {
        if (from) {
            console.log("From akdsjfhiuwqfh", from);
            if (window.matchMedia('(min-width: 768px)').matches) {
                // Large screen (1024px and above)
                setOpenLoginModal(true);
            } else {
                // Small screen (below 1024px)
                setOpenLoginModalDrawer(true);
            }
            router.replace(window.location.pathname);
        }
        const needsReload = localStorage.getItem('needsReload');
        const localData = localStorage.getItem('User');
        if (localData) {
            const Data = JSON.parse(localData);
            setProfileData(Data.data.user);
        }
        if (needsReload === 'true') {
            // Clear the flag so the page doesn't keep reloading
            localStorage.removeItem('needsReload');

            // Reload the page
            window.location.reload();
        }
    }, []);

    const handleInstaClick = () => {
        console.log("insta link recieved is", getAssistantData.ai.instaUrl);
        window.open(getAssistantData.ai.instaUrl, '_blank')
    }

    const handleTwitterClick = () => {
        console.log("insta link recieved is", getAssistantData.ai.twitterUrl);
        window.open(getAssistantData.ai.twitterUrl, '_blank');
    }


    useEffect(() => {
        const handleResize = () => {
            // Check if width is greater than or equal to 1024px
            setIsWideScreen(window.innerWidth >= 950);

            setIsWideScreen2(window.innerWidth >= 500);
            // Check if height is greater than or equal to 1024px
            setIsHighScreen(window.innerHeight >= 950);

            // Log the updated state values for debugging (Optional)
            console.log("isWideScreen: ", window.innerWidth >= 950);
            console.log("isWideScreen2: ", window.innerWidth >= 500);
            console.log("isHighScreen: ", window.innerHeight >= 1024);
        };

        handleResize(); // Set initial state
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);


    const handleCreatorXClick = () => {
        router.push('/creator/onboarding2')
    }

    const handleProfileClick = () => {
        const localData = localStorage.getItem('User');
        if (localData) {
            const Data = JSON.parse(localData);
            console.log("Data recieved is", Data);
            if (Data.data.user.role === "caller") {
                // router.push('/callerProfile')
                window.open('/callerProfile', '_blank');
            } else {
                // router.push('/profile');
                window.open('/profile', '_blank');
            }
        }
        // return
    }

    const handleopenClaimpopup = (status) => {
        setOpenClaimPopup(status);
    }

    const handleShowBorderProfile = (status) => {
        setShowBorderedProfile(status);
    }


    const getUserData = async () => {
        // console.log("Username for testing", creator);
        const ApiPath = `${Apis.GetAssistantData}?username=${creator}`;
        console.log("Api path is", ApiPath);
        try {
            const getResponse = await axios.get(ApiPath, {
                headers: {
                    "Content-Type": "application/json"
                }
            });
            if (getResponse) {
                if (getResponse.data.status === true) {
                    const AssistanName = creator;
                    localStorage.setItem('assistantName', JSON.stringify(AssistanName));
                    console.log("Response of getassistant data", getResponse.data.data);
                    const AssistantData = getResponse.data.data;
                    localStorage.setItem('assistantData', JSON.stringify(AssistantData));
                    setGetAssistantData(getResponse.data.data);
                } else {
                    setAssistantDataErr(true);
                }
            } else {
                console.log("Error occured");
            }
        } catch (error) {
            console.error("Error occured in getassistant api is", error);
        }
    }

    useEffect(() => {
        getUserData();
    }, []);
    useEffect(() => {
        console.log("Get assistant data chagned ", getAssistantData)
    }, [getAssistantData])

    //code to remove the route data
    useEffect(() => {
        setTimeout(() => {
            localStorage.removeItem('route')
        }, 1000);
    }, []);

    //getting user data when logged in

    useEffect(() => {
        const LocalData = localStorage.getItem('User');
        const D = JSON.parse(LocalData);
        console.log("Login details from localstorage", D);
        if (LocalData) {
            setShowProfileIcon(true);
            if (D.data.user.role === "creator") {
                setShowCreatorBtn(false);
            } else {
                setShowCreatorBtn(true);
            }
        } else {
            // setShowProfileIcon(false);
            // setShowCreatorBtn(false);
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
            //console.log("Data test", D.data);
            handleTalktoBlandy();
        } else {
            setOpenLoginModalDrawer(true);
        }
        //console.log('do not touch me');
    }, []);

    // Call function on larger screens
    const handleLargeScreenClick = useCallback(() => {
        const LocalData = localStorage.getItem('User');
        if (LocalData) {
            handleTalktoBlandy();
        } else {
            setOpenLoginModal(true);
        }
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
        //console.log("Local data for auto cll", D.data.user);

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
        // p: 2,
        mx: 'auto',
        my: '50vh',
        transform: 'translateY(-55%)',
        borderRadius: 2,
        border: "none",
        outline: "none",
        // border: "2px solid green"
    };




    const handleMouseMove = (event) => {
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        const x = event.clientX;
        const y = event.clientY;

        setMousePosition({ x, y });

        // Check if the mouse is within 150px of the center
        if (Math.abs(x - centerX) <= 150 && Math.abs(y - centerY) <= 150) {
            setBoxVisible(false); // Hide the box
            return;
        }

        // Check if the mouse is over buttonRef
        if (buttonRef.current) {
            const rect = buttonRef.current.getBoundingClientRect();
            if (x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom) {
                setBoxVisible(false); // Hide the animation when hovering over buttonRef
                return;
            }
        }

        // Check if the mouse is over buttonRef2
        if (buttonRef2.current) {
            const rect = buttonRef2.current.getBoundingClientRect();
            if (x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom) {
                setBoxVisible(false); // Hide the animation when hovering over buttonRef2
                return;
            }
        }

        if (buttonRef3.current) {
            const rect = buttonRef3.current.getBoundingClientRect();
            if (x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom) {
                setBoxVisible(false); // Hide the animation when hovering over buttonRef3
                return;
            }
        }

        if (buttonRef4) {
            const rect = buttonRef4.current.getBoundingClientRect();
            if (x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom) {
                setBoxVisible(false);
                return;
            }
        }

        if (buttonRef5 && buttonRef5.current) {
            const rect = buttonRef5.current.getBoundingClientRect();
            if (x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom) {
                setBoxVisible(false);
                return;
            }
        }


        // if (buttonRef5) {
        //     const rect = buttonRef5.current.getBoundingClientRect();
        //     if (x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom) {
        //         setBoxVisible(false);
        //         return;
        //     }
        // }

        if (buttonRef6 && buttonRef6.current) {
            const rect = buttonRef6.current.getBoundingClientRect();
            if (x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom) {
                setBoxVisible(false);
                return;
            }
        }

        // If none of the conditions are met, show the box
        setBoxVisible(true);
    };


    //code for apicall
    const handleTalktoBlandy = async () => {
        setLoading(true);
        setSnackMessage(true);
        // return
        const LocalData = localStorage.getItem('User');
        let D = null;
        if (LocalData) {
            D = JSON.parse(LocalData);
        } else {
            return;
        }
        console.log("Trying to call", D.data.user.phone);
        // console.log("Id to send is", getAssistantData);
        const localAssistanData = localStorage.getItem('assistantData');
        let modelId = null;
        if (localAssistanData) {
            const asistantLocalData = JSON.parse(localAssistanData);
            console.log("Assistant data retrived", asistantLocalData);
            modelId = (asistantLocalData.id);
        }
        console.log("id to send", modelId);

        // setSnackMessage(true);

        // return
        try {
            const axios = require('axios');
            let data = JSON.stringify({
                "name": D.data.user.name,
                "phone": D.data.user.phone,
                "email": D.data.user.email,
                modelId: modelId
            });

            let config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: Apis.MakeCall,
                headers: {
                    'Content-Type': 'application/json',
                    // 'Authorization': 'Bearer 1716566901317x213622515056508930'
                },
                data: data
            };

            axios.request(config)
                .then((response) => {
                    console.log("Response of caller api");
                    console.log(JSON.stringify(response.data));
                    localStorage.removeItem('callStatus');
                    console.log("Data of call removed");
                    if (response.data.status === false) {
                        setCallErr(true);
                        setCallErrMsg(response.data.message);
                    }
                })
                .catch((error) => {
                    console.log(error);
                    setCallErr(true);
                    setCallErrMsg("Some error occured!!")
                });
        } catch (error) {
            console.error('Error occurred:', error);
        } finally {
            setLoading(false);
            setOpen(false);
            console.log('Response is true');
        }
    }

    useEffect(() => {
        if (snackMessage === true) {
            setTimeout(() => {
                setSnackMessage(false);
            }, 6000);
        }
    }, [snackMessage]);


    const handleAni = () => {
        // setShowProfileIcon(false)
        setisVisible(true);
    }

    useEffect(() => {
        if (isVisible) {
            const timeout = setTimeout(() => {
                // setisVisible(false);
                // setShowProfileIcon(true)
            }, 2000);
            return () => clearTimeout(timeout);
        }
    }, [isVisible])

    // useEffect(() => {
    // setTimeout(() => {
    // setSnackMessage(true);
    // }, 1000);
    // },[])

    //code to make triangle
    const triangle = {
        width: 5,
        height: 5,
        // border: "2px solid red",
        borderTop: "4px solid transparent",
        borderBottom: "4px solid transparent",
        borderLeft: "6px solid #000000"
    }


    //code for autto call when we add card

    useEffect(() => {
        const callStatusData = localStorage.getItem('callStatus');
        if (callStatusData) {
            const callStatus = JSON.parse(callStatusData);
            console.log("Status of call is", callStatus);

            // return
            if (callStatus.callStatus === true) {
                handleTalktoBlandy();
            }
        }
    }, [])

    const gifBackgroundImageSmallScreen = {
        backgroundImage: 'url("/assets/applogo2.png")', // Ensure the correct path
        backgroundSize: "cover",
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        width: isWideScreen2 ? '550px' : '330px',
        height: isWideScreen2 ? '550px' : '330px',
        borderRadius: "50%",
        resize: "cover",
    }


    const gifBackgroundImage = {
        backgroundImage: 'url("/assets/applogo2.png")', // Ensure the correct path
        backgroundSize: "cover",
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        width: isHighScreen ? '950px' : '630px',
        height: isHighScreen ? '950px' : '630px',
        borderRadius: "50%",
        resize: "cover",
    }


    return (
        <>
            {
                getAssistantData && (
                    <MetaTags
                        title={`Creator: ${getAssistantData ? getAssistantData.assitant.name : ""}`}
                        description={`Explore amazing content from ${getAssistantData ? getAssistantData.assitant.name : ""} on CreatorX!`}
                        image={getAssistantData ? getAssistantData.full_profile_image : ""} // URL fetched from your API
                    />
                )
            }
            <div className='h-screen overflow-none'>
                {
                    assistantDataErr ?
                        <div style={backgroundImage} className='h-screen overflow-none'>
                            <div style={{
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)',
                            }} className='flex w-9/12 justify-center items-center md:flex hidden'>
                                <button className='flex items-center justify-center flex-1'
                                    style={{
                                        cursor: "pointer",
                                        outline: "none",
                                        border: "none",
                                        backgroundColor: "transparent",
                                    }}>
                                    {/* <div className='flex flex-row items-center justify-center' style={gifBackgroundImage}>
                                    <Image onClick={handleContinue} src="/mainAppGif.gif" alt='gif' style={{ backgroundColor: "red", borderRadius: "50%" }} height={600} width={600} />
                                </div> */}

                                    <motion.div
                                        // src="/assets/applogo2.png"
                                        // alt="Animating Image"
                                        className='flex flex-row items-center justify-center'
                                        animate={{
                                            width: isWideScreen && isHighScreen ? ["830px", "650px", "830px"] : ["500px", "350px", "500px"], // Keyframes for width
                                            height: isWideScreen && isHighScreen ? ["830px", "650px", "830px"] : ["500px", "350px", "500px"], // Keyframes for height
                                        }}
                                        transition={{
                                            duration: 4.5,
                                            repeat: Infinity,
                                            repeatType: "loop",
                                            ease: "easeInOut",
                                        }}
                                        style={
                                            gifBackgroundImage
                                            // {
                                            //     // margin: "auto",
                                            //     display: "block",
                                            //     width: isWideScreen ? "830px" : "600px", // Initial width
                                            //     height: isWideScreen ? "830px" : "600px", // Initial height
                                            // }
                                        }
                                    >
                                        <Image src="/mainAppGif.gif" alt='gif' style={{ backgroundColor: "", borderRadius: "50%" }} height={600} width={600} />
                                    </motion.div>
                                </button>
                            </div>

                            {/* Visible on small screens only */}
                            <div style={{
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)',
                            }} className='w-full flex justify-center items-center md:hidden'>
                                <button className='flex items-center justify-center flex-1'
                                    style={{
                                        cursor: "pointer",
                                        outline: "none",
                                        border: "none",
                                    }}>
                                    {/* <div className='flex flex-row items-center justify-center' style={gifBackgroundImage}>
                                    <Image src="/mainAppGif.gif" onClick={handleContinue} alt='gif' style={{ backgroundColor: "red", borderRadius: "50%", zIndex: 0 }} height={600} width={600} />
                                </div> */}
                                    <motion.div
                                        // src="/borderedAppLogo.png"
                                        // alt="Animating Image"
                                        animate={{
                                            width: ["380px", "200px", "380px"], // Keyframes for width
                                            height: ["380px", "200px", "380px"], // Keyframes for height
                                        }}
                                        transition={{
                                            duration: 7,
                                            repeat: Infinity,
                                            repeatType: "loop",
                                            ease: "easeInOut",
                                        }}
                                        style={
                                            gifBackgroundImage
                                            // {
                                            //     // margin: "auto",
                                            //     display: "block",
                                            //     width: "380px", // Initial width
                                            //     height: "380px", // Initial height
                                            // }
                                        }
                                    >
                                        <Image src="/mainAppGif.gif" onClick={handleContinue} alt='gif' style={{ backgroundColor: "", borderRadius: "50%", zIndex: 0 }} height={900} width={900} />
                                    </motion.div>
                                </button>
                            </div>

                            <Snackbar
                                open={creatorErr}
                                autoHideDuration={5000}
                                // onClose={() => setCreatorErr(false)}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'center',
                                }}
                                TransitionComponent={Fade}
                                TransitionProps={{
                                    timeout: {
                                        enter: 1000,
                                        exit: 1000,
                                    }
                                }}
                                sx={{
                                    position: 'fixed', // Ensures it stays in place
                                    top: 20, // Adjust as needed for spacing from the top
                                    left: '50%', // Center horizontally
                                    transform: 'translateX(-50%)', // Center horizontally
                                    // width: '400px', // Set width to 309px
                                    // border: "2px solid red",
                                }}
                            >
                                <Alert
                                    severity="error"
                                    sx={{
                                        width: '100%', // Ensures the Alert takes up the full width of the Snackbar
                                        backgroundColor: 'white',
                                        color: 'black',
                                        borderRadius: "20px",
                                    }}
                                >
                                    <div>
                                        <div style={{ color: "#FF543E", fontWeight: "bold", fontSize: 11 }}>
                                            Error
                                        </div>
                                        <div>
                                            The creator is no longer active
                                        </div>
                                    </div>
                                </Alert>
                            </Snackbar>

                        </div> :
                        <>
                            <div style={backgroundImage} className='h-screen' onMouseMove={handleMouseMove}>

                                <div className='pt-8 ms-8'>
                                    <div className='sm:flex hidden w-full flex flex-row justify-between items-start' style={{}}>
                                        <div className='flex flex-col items-start'>
                                            <div className='px-2 py-2 flex gap-4 flex-row items-center' ref={buttonRef4}
                                                style={{
                                                    border: "2px solid #ffffff",
                                                    // borderTopLeftRadius: 50, borderTopRightRadius: 50,
                                                    // borderBottomRightRadius: 50,
                                                    // borderRadiusTopright: 50,
                                                    // borderRadiusTopright : 50,
                                                    borderTopLeftRadius: 50,
                                                    borderBottomRightRadius: 50,
                                                    borderTopRightRadius: 50,
                                                    backgroundColor: "#ffffff20",
                                                    zIndex: 1
                                                }}>
                                                <div className='flex flex-col items-center'>
                                                    <div className='relative'>
                                                        <div className='flex flex-row items-center'>
                                                            <button
                                                                onClick={() => {
                                                                    // console.log("Sary gama pada na ri sa");
                                                                    setOpenClaimPopup(true);
                                                                }}
                                                                style={{ position: 'relative' }}>
                                                                <div style={{ border: "2px solid black", borderRadius: "50%" }}>
                                                                    {
                                                                        getAssistantData && getAssistantData.profile_image ?
                                                                            <Image src={getAssistantData.profile_image} alt='profilephoto' //height={50} width={50}
                                                                                height={50}
                                                                                width={50}
                                                                                style={{
                                                                                    width: '50px',
                                                                                    height: '50px',
                                                                                    backgroundColor: "",
                                                                                    borderRadius: "50%",
                                                                                    border: "3px solid white",
                                                                                    objectFit: 'cover',
                                                                                    objectPosition: 'center',
                                                                                    // backgroundColor: 'red'
                                                                                }}
                                                                            //style={{ padding: 4, borderRadius: "50%" }} 
                                                                            /> :
                                                                            <Image src={"/assets/placeholderImg.jpg"} alt='profilephoto' height={50} width={50}
                                                                                style={{ padding: 4, borderRadius: "50%" }} />
                                                                    }
                                                                </div>
                                                                <div className='absolute top-0 -left-2' style={{ backgroundColor: "transparent" }}>
                                                                    <div style={{ height: "30px", width: "30px", backgroundColor: "transparent" }}>
                                                                        <Image onClick={() => {
                                                                            // console.log("Sary gama pada na ri sa");
                                                                            setOpenClaimPopup(true);
                                                                        }} src="/assets/claimLogo.png" alt='claimbtn' height={40} width={40}
                                                                            style={{ cursor: "pointer", backgroundColor: "transparent" }} />
                                                                    </div>
                                                                </div>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>


                                                <div>
                                                    {/* code for assistant name and calls */}
                                                    <div className='flex flex-row items-center gap-8'>
                                                        <div style={{ fontSize: 16, fontWeight: "400", fontFamily: "inter" }}>
                                                            {
                                                                getAssistantData &&
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
                                                    </div>
                                                    <div className='flex flex-row pe-4'>
                                                        <div style={{ fontSize: 12, color: "#000000", fontWeight: "400", fontFamily: "inter" }}>
                                                            Calls:
                                                        </div>
                                                        <div className='' style={{ fontWeight: "300", fontFamily: "inter", fontSize: 12 }}>
                                                            {
                                                                getAssistantData &&
                                                                <div>
                                                                    {getAssistantData.calls ?
                                                                        <div className='ms-1' style={{ fontWeight: "600", fontFamily: "inter", fontSize: 12 }}>
                                                                            {getAssistantData.calls}
                                                                        </div> :
                                                                        <div className='ms-1' style={{ fontWeight: "600", fontFamily: "inter", fontSize: 12 }}>
                                                                            0
                                                                        </div>
                                                                    }
                                                                </div>
                                                            }
                                                        </div>
                                                        <div className='ms-2' style={{ fontSize: 12, color: "#000000", fontWeight: "400", fontFamily: "inter" }}>
                                                            Earned:
                                                        </div>
                                                        <div className='' style={{ fontWeight: "300", fontFamily: "inter", fontSize: 13 }}>
                                                            {
                                                                getAssistantData &&
                                                                <div>
                                                                    {getAssistantData.earned ?
                                                                        <div className='ms-1' style={{ fontWeight: "600", fontFamily: "inter", fontSize: 12 }}>
                                                                            ${Number(getAssistantData.earned).toFixed(2)}
                                                                        </div> :
                                                                        <div className='ms-1' style={{ fontWeight: "600", fontFamily: "inter", fontSize: 12 }}>
                                                                            $ 0
                                                                        </div>
                                                                    }
                                                                </div>
                                                            }
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            {/* code for socials */}
                                            <div className='flex flex-row items-center justify-center pb-6 px-6' ref={buttonRef3}
                                                style={{
                                                    border: "2px solid #ffffff", borderTop: "8px solid #e7f3fe",
                                                    borderBottomLeftRadius: 50,
                                                    borderBottomRightRadius: 50, marginTop: "-4px",
                                                    zIndex: 2, backgroundColor: "#ffffff20",
                                                }}>
                                                <div className='flex flex-col gap-4' style={{ marginTop: 10 }}>
                                                    <button onClick={handleInstaClick}>
                                                        <Image
                                                            // layout='responsive'
                                                            objectFit='contain' src={"/assets/instagram.png"} alt='social' height={25} width={25} style={{ resize: "cover" }} />
                                                    </button>
                                                    <button onClick={handleTwitterClick}>
                                                        <Image
                                                            // layout='responsive'
                                                            objectFit='contain' src={"/assets/twitter.png"} alt='social' height={25} width={25} style={{ resize: "cover" }} />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>

                                        {
                                            showProfileIcon &&
                                            <div ref={buttonRef2} style={{}}>

                                                <AnimatedButton snackMessage={snackMessage} profileData={profileData} />

                                                <div className='flex flex-row gap-4 items-center'>
                                                </div>
                                            </div>
                                        }

                                    </div>

                                    {/* Assistant Profile icon for small screens */}
                                    <div className='sm:hidden flex items-start justify-between'>
                                        <div style={{ zIndex: 2 }}>
                                            {
                                                showBorderProfile ?
                                                    <div className='flex flex-col items-start'>
                                                        <div className='px-2 py-2 flex gap-4 flex-row items-center' ref={buttonRef4}
                                                            style={{
                                                                border: "2px solid #ffffff",
                                                                // borderTopLeftRadius: 50, borderTopRightRadius: 50,
                                                                // borderBottomRightRadius: 50,
                                                                // borderRadiusTopright: 50,
                                                                // borderRadiusTopright : 50,
                                                                borderTopLeftRadius: 50,
                                                                borderBottomRightRadius: 50,
                                                                borderTopRightRadius: 50,
                                                                backgroundColor: "#ffffff20",
                                                                zIndex: 1
                                                            }}>
                                                            <div className='flex flex-col items-center'>
                                                                <div className='relative'>
                                                                    <div className='flex flex-row items-center'>
                                                                        <button
                                                                            onClick={() => {
                                                                                // console.log("Sary gama pada na ri sa");
                                                                                setOpenClaimPopup(true);
                                                                            }}
                                                                            style={{ position: 'relative' }}>
                                                                            <div style={{ border: "2px solid black", borderRadius: "50%" }}>
                                                                                {
                                                                                    getAssistantData && getAssistantData.profile_image ?
                                                                                        <Image src={getAssistantData.profile_image} alt='profilephoto' //height={50} width={50}
                                                                                            height={50}
                                                                                            width={50}
                                                                                            style={{
                                                                                                width: '50px',
                                                                                                height: '50px',
                                                                                                backgroundColor: "",
                                                                                                borderRadius: "50%",
                                                                                                border: "3px solid white",
                                                                                                objectFit: 'cover',
                                                                                                objectPosition: 'center',
                                                                                                // backgroundColor: 'red'
                                                                                            }}
                                                                                        //style={{ padding: 4, borderRadius: "50%" }} 
                                                                                        /> :
                                                                                        <Image src={"/assets/placeholderImg.jpg"} alt='profilephoto' height={50} width={50}
                                                                                            style={{ padding: 4, borderRadius: "50%" }} />
                                                                                }
                                                                            </div>
                                                                            <div className='absolute top-0 -left-2' style={{ backgroundColor: "transparent" }}>
                                                                                <div style={{ height: "30px", width: "30px", backgroundColor: "transparent" }}>
                                                                                    <Image onClick={() => {
                                                                                        // console.log("Sary gama pada na ri sa");
                                                                                        setOpenClaimPopup(true);
                                                                                    }} src="/assets/claimLogo.png" alt='claimbtn' height={40} width={40}
                                                                                        style={{ cursor: "pointer", backgroundColor: "transparent" }} />
                                                                                </div>
                                                                            </div>
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            </div>


                                                            <div>
                                                                {/* code for assistant name and calls */}
                                                                <div className='flex flex-row items-center gap-8'>
                                                                    <div style={{ fontSize: 16, fontWeight: "400", fontFamily: "inter" }}>
                                                                        {
                                                                            getAssistantData &&
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
                                                                </div>
                                                                <div className='flex flex-row pe-4'>
                                                                    <div style={{ fontSize: 12, color: "#000000", fontWeight: "400", fontFamily: "inter" }}>
                                                                        Calls:
                                                                    </div>
                                                                    <div className='' style={{ fontWeight: "300", fontFamily: "inter", fontSize: 12 }}>
                                                                        {
                                                                            getAssistantData &&
                                                                            <div>
                                                                                {getAssistantData.calls ?
                                                                                    <div className='ms-1' style={{ fontWeight: "600", fontFamily: "inter", fontSize: 12 }}>
                                                                                        {getAssistantData.calls}
                                                                                    </div> :
                                                                                    <div className='ms-1' style={{ fontWeight: "600", fontFamily: "inter", fontSize: 12 }}>
                                                                                        0
                                                                                    </div>
                                                                                }
                                                                            </div>
                                                                        }
                                                                    </div>
                                                                    <div className='ms-2' style={{ fontSize: 12, color: "#000000", fontWeight: "400", fontFamily: "inter" }}>
                                                                        Earned:
                                                                    </div>
                                                                    <div className='' style={{ fontWeight: "300", fontFamily: "inter", fontSize: 13 }}>
                                                                        {
                                                                            getAssistantData &&
                                                                            <div>
                                                                                {getAssistantData.earned ?
                                                                                    <div className='ms-1' style={{ fontWeight: "600", fontFamily: "inter", fontSize: 12 }}>
                                                                                        ${Number(getAssistantData.earned).toFixed(2)}
                                                                                    </div> :
                                                                                    <div className='ms-1' style={{ fontWeight: "600", fontFamily: "inter", fontSize: 12 }}>
                                                                                        $ 0
                                                                                    </div>
                                                                                }
                                                                            </div>
                                                                        }
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        {/* code for socials */}
                                                        <div className='flex flex-row items-center justify-center pb-6 px-6' ref={buttonRef3}
                                                            style={{
                                                                border: "2px solid #ffffff", borderTop: "8px solid #e7f3fe",
                                                                borderBottomLeftRadius: 50,
                                                                borderBottomRightRadius: 50, marginTop: "-4px",
                                                                zIndex: 2, backgroundColor: "#ffffff20",
                                                            }}>
                                                            <div className='flex flex-col gap-4' style={{ marginTop: 10 }}>
                                                                <button onClick={handleInstaClick}>
                                                                    <Image
                                                                        // layout='responsive'
                                                                        objectFit='contain' src={"/assets/instagram.png"} alt='social' height={25} width={25} style={{ resize: "cover" }} />
                                                                </button>
                                                                <button onClick={handleTwitterClick}>
                                                                    <Image
                                                                        // layout='responsive'
                                                                        objectFit='contain' src={"/assets/twitter.png"} alt='social' height={25} width={25} style={{ resize: "cover" }} />
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div> :
                                                    <ProfileAnimation creator={creator} openClaimPopup={handleopenClaimpopup} showBorderedProfile={handleShowBorderProfile} />
                                            }



                                        </div>
                                        {
                                            showProfileIcon &&
                                            <div className='flex flex-row gap-4 items-center'>
                                                <div className='me-8' style={{ zIndex: 2 }}>
                                                    {/* {
                                                profileData && profileData.profile_image ?
                                                    <div className='flex flex-row justify-center items-center p-2' style={{ borderRadius: "50%", backgroundColor: "" }}>
                                                        <img
                                                            onClick={handleProfileClick}
                                                            src={profileData.profile_image} alt='profile'
                                                            // height={40} width={40} 
                                                            // style={{ borderRadius: "50%", height: 50, width: 50, border: "3px solid white" }}
                                                            style={{
                                                                width: '50px',
                                                                height: '50px',
                                                                backgroundColor: "",
                                                                borderRadius: "50%",
                                                                border: "3px solid white",
                                                                objectFit: 'cover',
                                                                objectPosition: 'center',
                                                                // backgroundColor: 'red'
                                                            }}
                                                        />
                                                    </div> :
                                                    <Image onClick={handleProfileClick} src="/assets/placeholderImg.jpg" alt='profile' height={50} width={50} style={{ borderRadius: "50%" }} />
                                            } */}
                                                </div>
                                            </div>
                                        }
                                    </div>
                                </div>

                                {/* Animating Image */}
                                <div style={{
                                    position: 'absolute',
                                    top: '50%',
                                    left: '50%',
                                    transform: 'translate(-50%, -50%)',
                                }} className='flex w-9/12 justify-center items-center md:flex hidden'>
                                    <button className='flex items-center justify-center flex-1'
                                        style={{
                                            cursor: "pointer",
                                            outline: "none",
                                            border: "none",
                                            backgroundColor: "transparent",
                                        }}>
                                        {/* <div className='flex flex-row items-center justify-center' style={gifBackgroundImage}>
                                    <Image onClick={handleContinue} src="/mainAppGif.gif" alt='gif' style={{ backgroundColor: "red", borderRadius: "50%" }} height={600} width={600} />
                                </div> */}

                                        <div style={gifBackgroundImage} className='flex flex-row justify-center items-center'>
                                            <Image ref={buttonRef6} onClick={handleContinue} src="/maingif.gif" alt='gif' style={{
                                                backgroundColor: "",
                                                borderRadius: "50%", height: isHighScreen ? '680px' : '350px', width: isHighScreen ? '680px' : '350px'
                                            }} height={600} width={600} />
                                        </div>


                                        {/* <motion.div
                                    onClick={handleContinue}
                                    // src="/assets/applogo2.png"
                                    // alt="Animating Image"
                                    className='flex flex-row items-center justify-center'
                                    animate={{
                                        width: isWideScreen && isHighScreen ? ["830px", "650px", "830px"] : ["500px", "350px", "500px"], // Keyframes for width
                                        height: isWideScreen && isHighScreen ? ["830px", "650px", "830px"] : ["500px", "350px", "500px"], // Keyframes for height
                                    }}
                                    transition={{
                                        duration: 5,
                                        repeat: Infinity,
                                        repeatType: "loop",
                                        ease: "easeInOut",
                                    }}
                                    style={
                                        gifBackgroundImage
                                        // {
                                        //     // margin: "auto",
                                        //     display: "block",
                                        //     width: isWideScreen ? "830px" : "600px", // Initial width
                                        //     height: isWideScreen ? "830px" : "600px", // Initial height
                                        // }
                                    }
                                >
                                </motion.div> */}
                                    </button>
                                </div>

                                {/* visible on small screens only */}
                                <div style={{
                                    position: 'absolute',
                                    top: '55%',
                                    left: '50%',
                                    transform: 'translate(-50%, -50%)',
                                }} className='w-full flex justify-center items-center md:hidden'>
                                    <button className='flex flex-col items-center justify-center flex-1'
                                        style={{
                                            cursor: "pointer",
                                            outline: "none",
                                            border: "none",
                                        }}>
                                        {/* <div className='px-4 py-2 rounded-lg -mb-8' style={{ fontSize: 14, fontWeight: '500', fontFamily: 'inter', backgroundColor: '#ffffff50' }}>
                                    Tap to call
                                </div> */}
                                        <motion.div
                                            animate={{
                                                y: [0, -30, 0],
                                            }}
                                            transition={{
                                                duration: 3.5,
                                                repeat: Infinity,
                                                repeatType: "loop",
                                                ease: "easeInOut",
                                            }}
                                            className="-mb-16 rounded-lg flex flex-col justify-center"
                                            style={{
                                                fontSize: 14,
                                                fontWeight: '500',
                                                fontFamily: 'inter',
                                                backgroundColor: '#ffffff80',
                                                padding: '10px 20px', // Add padding to the content inside the box
                                                position: 'relative',  // Required for positioning the triangle
                                            }}
                                        >
                                            Tap to call

                                            {/* Triangle at the bottom center */}
                                            <div
                                                style={{
                                                    position: 'absolute',
                                                    bottom: '-10px',
                                                    left: '50%',
                                                    transform: 'translateX(-50%)',
                                                    width: 0,
                                                    height: 0,
                                                    borderLeft: '15px solid transparent',
                                                    borderRight: '15px solid transparent',
                                                    borderTop: '15px solid #ffffff80',
                                                }}
                                            />
                                        </motion.div>


                                        <div
                                            style={gifBackgroundImageSmallScreen}
                                            // style={{
                                            //     ...gifBackgroundImage,
                                            //     // width: isWideScreen && 1000,
                                            //     // height: isWideScreen && 1000
                                            // }}
                                            className='flex flex-row justify-center items-center'>
                                            <Image onClick={handleContinue} src="/maingif.gif" alt='gif'
                                                style={{
                                                    backgroundColor: "",
                                                    borderRadius: "50%",
                                                    height: isWideScreen2 ? '350px' : '180px',
                                                    width: isWideScreen2 ? '350px' : '180px'
                                                }}
                                                height={300} width={300} />
                                        </div>

                                        {/* <motion.div
                                    // src="/borderedAppLogo.png"
                                    // alt="Animating Image"
                                    animate={{
                                        width: ["380px", "200px", "380px"], // Keyframes for width
                                        height: ["380px", "200px", "380px"], // Keyframes for height
                                    }}
                                    transition={{
                                        duration: 7,
                                        repeat: Infinity,
                                        repeatType: "loop",
                                        ease: "easeInOut",
                                    }}
                                    style={
                                        gifBackgroundImage
                                        // {
                                        //     // margin: "auto",
                                        //     display: "block",
                                        //     width: "380px", // Initial width
                                        //     height: "380px", // Initial height
                                        // }
                                    }
                                >
                                    <Image src="/mainAppGif.gif" onClick={handleContinue} alt='gif' style={{ backgroundColor: "", borderRadius: "50%", zIndex: 0 }} height={600} width={600} />
                                </motion.div> */}
                                    </button>
                                </div>

                                {/* Mouse Following Box Animation */}
                                <div className='lg:flex hidden'>
                                    <AnimatePresence>
                                        {boxVisible && (
                                            // <motion.div
                                            //     style={{
                                            //         position: 'absolute',
                                            //         top: mousePosition.y - 25,
                                            //         left: mousePosition.x - 25,
                                            //         width: 100,
                                            //         height: 100,
                                            //         backgroundColor: '#ffffff60',
                                            //         borderRadius: "50%",
                                            //         cursor: 'pointer',
                                            //         display: 'flex',
                                            //         alignItems: 'center',
                                            //         justifyContent: 'center',
                                            //     }}
                                            //     initial={{ opacity: 0, scale: 0.5 }}
                                            //     animate={{ opacity: 1, scale: 1.2 }}
                                            //     exit={{ opacity: 0, scale: 0.5 }}
                                            //     transition={{ duration: 0.3 }}
                                            // >
                                            //     <div style={{ color: 'black' }}>
                                            //         Tap to call
                                            //     </div>
                                            // </motion.div>
                                            <motion.div
                                                style={{
                                                    position: 'absolute',
                                                    top: Math.min(Math.max(mousePosition.y - 50, 0), window.innerHeight - 120), // Ensures the box stays within the viewport height
                                                    left: Math.min(Math.max(mousePosition.x - 50, 0), window.innerWidth - 120), // Ensures the box stays within the viewport width
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
                                                <div style={{ color: 'black', fontWeight: "500", fontFamily: 'inter', fontSize: 14 }}>
                                                    Tap to call
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>


                                {/* CreatorX Button and Calls array */}
                                <div style={{ position: "absolute", bottom: 10, border: '' }} className='w-full flex items-end justify-between mb-10 rounded md:flex hidden'>
                                    <div>
                                        {
                                            showCreatorBtn ?
                                                <div ref={buttonRef} className='flex items-end ms-8 px-4' style={{ backgroundColor: "#620FEB66", width: "fit-content", borderRadius: "70px" }}>
                                                    <button className='flex flex-row p-4 items-center gap-4'>
                                                        <Image src={"/assets/stars.png"} alt='phone' height={20} width={20} />
                                                        <div onClick={
                                                            // handleCreatorXClick
                                                            () => {
                                                                window.open('https://www.jotform.com/form/242259184814461', "_blank")
                                                            }
                                                        } className='text-white' style={{ fontSize: 17, fontWeight: "600" }}>
                                                            Build Your CreatorX
                                                        </div>
                                                    </button>
                                                </div> :
                                                ""
                                        }
                                    </div>

                                    <div ref={buttonRef5} className='me-12 md:flex hidden'>
                                        <CycleArray onLargeScreen={true} data={getRecentCallData} assistantData={getAssistantData} />
                                    </div>
                                </div>

                                {/* for small screen creatorX button */}
                                <div style={{ position: "absolute", bottom: 0 }} className='w-full flex items-end justify-center mb-8 rounded md:hidden'>
                                    <div className='flex flex-col gap-8 justify-between w-full px-10 items-start'>

                                        <div className='w-full flex flex-row justify-center'>
                                            <CycleArray data={getRecentCallData} assistantData={getAssistantData} />
                                        </div>


                                        <div className='flex items-center justify-between w-full'>
                                            <div style={{ backgroundColor: "transparent", width: "fit-content", borderRadius: "70px" }}>
                                                <button
                                                    onClick={
                                                        // handleCreatorXClick
                                                        () => {
                                                            window.open('https://www.jotform.com/form/242259184814461', "_blank")
                                                        }
                                                    }
                                                    className='flex flex-row items-center gap-1'>
                                                    <Image src={"/assets/CreatorXIcon.png"} alt='phone' height={41} width={93} />
                                                    {/* <Image src={"/assets/Union.png"} alt='phone' height={20} width={20} />
                                        <Image src={"/assets/stars.png"} alt='phone' height={15} width={15} /> */}
                                                </button>
                                            </div>
                                            {
                                                showProfileIcon &&
                                                <div>
                                                    <AnimatedButton snackMessage={snackMessage} wideScreen={isWideScreen} profileData={profileData} />
                                                </div>
                                            }
                                        </div>


                                    </div>
                                </div>

                                {/* Code to hide box on sides */}
                                {/* <div className='h-screen' ref={buttonRef5} style={{ border: "2px solid red", width: "2px", position: "absolute", right: 0, top: 0 }} />
                        <div className='w-screen' ref={buttonRef6} style={{ border: "2px solid red", height: "2px", position: "absolute", right: 0, bottom: 0 }} /> */}

                                {/* Snack messages */}


                                <Modal
                                    open={openLoginModal}
                                    // onClose={(() => setOpenLoginModal(false))}
                                    closeAfterTransition
                                    BackdropProps={{
                                        timeout: 1000,
                                        sx: {
                                            backgroundColor: 'transparent',
                                            backdropFilter: 'blur(40px)',
                                        },
                                    }}
                                >
                                    <Box className="lg:w-5/12 sm:w-7/12"
                                        sx={styleLoginModal}
                                    >
                                        <LoginModal creator={creator} assistantData={getAssistantData} closeForm={setOpenLoginModal} />
                                    </Box>
                                </Modal>

                                <Modal
                                    open={openClaimPopup}
                                    onClose={(() => setOpenClaimPopup(false))}
                                    closeAfterTransition
                                    BackdropProps={{
                                        timeout: 1000,
                                        sx: {
                                            backgroundColor: 'transparent',
                                            backdropFilter: 'blur(40px)',
                                        },
                                    }}
                                >
                                    <Box className="lg:w-5/12 sm:w-7/12 w-full"
                                        sx={styleLoginModal}
                                    >
                                        {/* <LoginModal creator={creator} assistantData={getAssistantData} closeForm={setOpenLoginModal} /> */}
                                        <div className='flex flex-row justify-center w-full'>
                                            <div className='sm:w-7/12 w-full' style={{ backgroundColor: "#ffffff23", padding: 20, borderRadius: 10 }}>
                                                {/* <AddCard handleBack={handleBack} closeForm={closeForm} /> */}
                                                <div style={{ backgroundColor: 'white', padding: 18, borderRadius: 10 }}>
                                                    <div className='mt-2 flex flex-row justify-between items-center'>
                                                        <Image src="/assets/claimIcon.png" alt='claimimg' height={32} width={32} />
                                                        <button onClick={(() => setOpenClaimPopup(false))}>
                                                            <Image src="/assets/crossBtn.png" alt='cross' height={14} width={14} />
                                                        </button>
                                                    </div>
                                                    <div className='mt-8' style={{ fontWeight: '600', fontSize: 24, fontFamily: 'inter' }}>
                                                        Claim Account
                                                    </div>
                                                    <div className='text-black' style={{ fontWeight: "400", fontSize: 15, fontFamily: "inter", marginTop: 10 }}>
                                                        This account hasn't been claimed by its creator. In order to claim this creator, you must be the real creator and verify your identity.
                                                    </div>
                                                    <div className='flex flex-row justify-start mt-4 w-full' style={{ marginTop: 30 }}>
                                                        <div>
                                                            <button
                                                                onClick={() => {
                                                                    window.open("https://www.youtube.com", '_blank')
                                                                }} className='bg-purple px-6 py-2 text-white'
                                                                style={{ fontWeight: "400", fontFamily: "inter", fontSize: 15, borderRadius: "50px" }}>
                                                                Verify Identity
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Box>
                                </Modal>

                                <Modal
                                    open={openBottomForm}
                                    // onClose={(() => setOpenLoginModal(false))}
                                    closeAfterTransition
                                    BackdropProps={{
                                        timeout: 1000,
                                        sx: {
                                            backgroundColor: 'transparent',
                                            backdropFilter: 'blur(40px)',
                                            height: "100%"
                                        },
                                    }}
                                    className='h-screen'
                                >
                                    <Box className="lg:w-5/12 sm:w-7/12 w-11/12"
                                        sx={styleLoginModal}
                                    >
                                        {/* <LoginModal creator={creator} assistantData={getAssistantData} closeForm={setOpenLoginModal} /> */}
                                        <div className='rounded' style={{ padding: 20, backgroundColor: '#ffffff60' }}>
                                            <div className='w-full' style={{}}>
                                                <LoginModal creator={creator} assistantData={getAssistantData} closeForm={hideBottom} />
                                            </div>
                                        </div>
                                    </Box>
                                </Modal>

                                {/* <Drawer
                            open={openBottomForm}
                            // onClose={() => setOpenLoginModalDrawer(false)}
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
                                <div className='w-full'>
                                    <LoginModal creator={creator} assistantData={getAssistantData} closeForm={hideBottom} />
                                </div>
                            </div>
                        </Drawer> */}

                                {/* <div className=''>
                    <Snackbar
                        open={callErr}
                        autoHideDuration={5000}
                        onClose={() => setCallErr(false)}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'center',
                        }}
                        TransitionComponent={Fade}
                        TransitionProps={{
                            timeout: {
                                enter: 1000,
                                exit: 1000,
                            }
                        }}
                        sx={{
                            position: 'fixed', // Ensures it stays in place
                            top: 20, // Adjust as needed for spacing from the top
                            left: '50%', // Center horizontally
                            transform: 'translateX(-50%)', // Center horizontally
                            border: "2px solid red",
                            width: "500px"
                        }}
                    >
                        <Alert
                            // onClose={() => setCallErr(false)}
                            severity="error"
                            sx={{
                                width: '309px',
                                backgroundColor: 'white', // Set background color to white
                                color: 'black',
                                width: "300px",
                                borderRadius: "20px"
                                // border: "2px solid grey"
                            }}
                        >
                            <div>
                                Unfortunately, we were unable to process your payment method on file, please update your payment method to start a call.
                            </div>
                        </Alert>
                    </Snackbar>
                </div> */}

                                <Snackbar
                                    open={callErr}
                                    autoHideDuration={5000}
                                    onClose={() => setCallErr(false)}
                                    anchorOrigin={{
                                        vertical: 'top',
                                        horizontal: 'center',
                                    }}
                                    TransitionComponent={Fade}
                                    TransitionProps={{
                                        timeout: {
                                            enter: 1000,
                                            exit: 1000,
                                        }
                                    }}
                                    sx={{
                                        position: 'fixed', // Ensures it stays in place
                                        top: 20, // Adjust as needed for spacing from the top
                                        left: '50%', // Center horizontally
                                        transform: 'translateX(-50%)', // Center horizontally
                                        width: '400px', // Set width to 309px
                                        // border: "2px solid red",
                                    }}
                                >
                                    <Alert
                                        severity="error"
                                        sx={{
                                            width: '100%', // Ensures the Alert takes up the full width of the Snackbar
                                            backgroundColor: 'white',
                                            color: 'black',
                                            borderRadius: "20px",
                                        }}
                                    >
                                        <div>
                                            <div style={{ color: "#FF543E", fontWeight: "bold", fontSize: 11 }}>
                                                Error
                                            </div>
                                            <div>
                                                {/* {callErrMsg} */}
                                                We were unable to process your payment method, please update to start a call.
                                            </div>
                                        </div>
                                    </Alert>
                                </Snackbar>

                            </div>
                        </>
                }
            </div>
        </>

    );
}

export default Creator;