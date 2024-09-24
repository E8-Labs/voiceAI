import { Alert, Fade, Snackbar } from '@mui/material';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';

export default function AnimatedButton({ snackMessage, error = false, profileData, wideScreen }) {

    const router = useRouter();

    // const [isExpanded, setIsExpanded] = useState(false);

    // useEffect(() => {
    //     if (isExpanded) {
    //         const timer = setTimeout(() => {
    //             setIsExpanded(false);
    //         }, 3000); // Collapse after 3 seconds

    //         return () => clearTimeout(timer);
    //     }
    // }, [isExpanded]);

    // useEffect(() => {
    //     const localData = localStorage.getItem('User');
    //     const Data = JSON.parse(localData);
    // }, [])


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

    return (
        <div className="flex items-center justify-start pe-6 bg-none" style={{ backgroundColor: 'transparent' }}>
            <button
                // onClick={() => setIsExpanded(!isExpanded)}
                className="relative bg-none flex flex-col items-center pe-1 md:pe-4 rounded-full focus:outline-none"
            >
                <div className="flex items-center justify-start">
                    <span className="material-icons">
                        {
                            profileData && profileData.profile_image ?
                                <div className='flex flex-row justify-center items-center pe-2' style={{ borderRadius: "50%", backgroundColor: "" }}>
                                    <img
                                        onClick={handleProfileClick}
                                        src={profileData.profile_image} alt='profile'
                                        // height={40} width={40} 
                                        // style={{ borderRadius: "50%", height: 50, width: 50, border: "3px solid white" }}
                                        style={{
                                            width: '55px',
                                            height: '55px',
                                            backgroundColor: "",
                                            borderRadius: "50%",
                                            border: "3px solid white",
                                            objectFit: 'cover',
                                            objectPosition: 'center',
                                            // backgroundColor: 'red'
                                        }}
                                    />
                                </div> :
                                <Image onClick={handleProfileClick} src="/assets/placeholderImg.jpg"
                                    alt='profile' height={55} width={55} style={{ borderRadius: "50%" }} />
                        }
                    </span>
                    {/* Replace with your icon */}
                </div>
                {/* {
                    snackMessage && <div>helo</div>
                } */}

                <div
                    className={`absolute flex flex-col md:flex hidden items-center right-3 top-1/2 transform -translate-y-1/2 rounded-full transition-all duration-500 ease-in-out overflow-hidden ${snackMessage ? 'w-[350px] border-2 border-white h-16 px-2 pr-10 opacity-100' : 'w-0 h-0 px-0 py-0 opacity-0'
                        }`}
                    style={{ marginLeft: -40, backgroundColor: '#FFFFFF40', width: wideScreen ? "385px" : "" }}
                >
                    {snackMessage && (
                        <div className="flex flex-col mt-2 justify-start items-center" style={{ textAlign: "start" }}>
                            <div className='flex flex-row gap-4 items-start'>
                                <div>
                                    <div>
                                        <div style={{ fontSize: 15, fontWeight: '500', fontFamily: 'inter' }}>
                                            🎉 Congratulations
                                        </div>
                                        <div>
                                        </div>
                                    </div>
                                    <div style={{ fontSize: 13, fontWeight: '400', fontFamily: 'inter' }}>
                                        Your call has been initiated successfully
                                    </div>
                                </div>
                                <div>
                                    {/* <Image src="/assets/placeholderImg.jpg" alt='profile' height={35} width={35} style={{ borderRadius: "50%" }} /> */}
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                <div className='md:hidden'>
                    <Snackbar
                        open={snackMessage}
                        autoHideDuration={5000}
                        // onClose={() => setCallErr(false)}
                        anchorOrigin={{
                            vertical: 'bottom',
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
                            position: 'fixed',
                            // top: '2%',
                            bottom: 100,
                            left: '50%',
                            transform: 'translateX(-50%)',
                            // border: "2px solid red",
                            width: "500px"
                        }}
                    >
                        <Alert
                            // onClose={() => setCallErr(false)}
                            // severity="error"
                            sx={{
                                width: '309px',
                                backgroundColor: 'white',
                                color: 'black',
                                width: "330px",
                                borderRadius: "20px"
                                // border: "2px solid grey"
                            }}
                        >
                            <div className='w-full text-start'>
                                <div>
                                    <div style={{ fontSize: 15, fontWeight: '500', fontFamily: 'inter' }}>
                                        🎉 Congratulations
                                    </div>
                                    <div>
                                    </div>
                                </div>
                                <div style={{ fontSize: 13, fontWeight: '400', fontFamily: 'inter' }}>
                                    Your call has been initiated successfully
                                </div>
                            </div>
                        </Alert>
                    </Snackbar>
                </div>

            </button>
        </div>
    );
}
