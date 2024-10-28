'use client'
import Animation from '@/components/animation/Animation';
import Apis from '@/components/apis/Apis';
import GroupImages from '@/components/creatorOnboarding/GroupImages';
import ImagesFile from '@/components/imagesfile/ImagesFile';
import loginFunction from '@/components/loginFunction';
import { Box } from '@mui/material';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useLayoutEffect, useState } from "react";

const backgroundImage = {
    backgroundImage: 'url("/backgroundImage.png")', // Ensure the correct path
    backgroundSize: "cover",
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    width: '100%',
    height: '100vh',
}

export default function Home() {

    // loginFunction();
    const router = useRouter();
    const [currentIndex, setCurrentIndex] = useState(null);
    const [isHighScreen, setIsHighScreen] = useState(false);
    const [isWideScreen, setIsWideScreen] = useState(false);
    const [isWideScreen2, setIsWideScreen2] = useState(false);
    const [isMounted, setIsMounted] = useState(false); // To track initial mount

    const handleCurrentIndex = (id) => {
        setCurrentIndex(id);
    }

    const getAiData = async () => {
        console.log("Trying ...")
        const localData = localStorage.getItem('User');
        if (localData) {
            const Data = JSON.parse(localData);
            // setAiLoader(true);
            // console.log("Data from local for nowledge", Data);
            const AuthToken = Data.data.token;
            console.log("Auth token is", AuthToken);
            try {
                const response = await axios.get(Apis.MyAiapi, {
                    headers: {
                        'Authorization': 'Bearer ' + AuthToken,
                        'Content-Type': 'application/json'
                    }
                });

                if (response) {
                    console.log("Response of my ai api is", response.data.data);
                    if (response.data.data.ai) {
                        if (response?.data?.data?.questions.length > 0) {
                            router.push("/creator/profile");
                        } else {
                            console.log("Kycs are not added");
                        }
                    } else {
                        router.push("/creator/buildscript");
                    }

                }
            } catch (error) {
                console.error("Error occured in ai api  is :", error);
            } finally {
                // setAiLoader(false);
            }
        } else {
            console.log("User not logged in")
        }

    }

    useEffect(() => {
        const localData = localStorage.getItem('User');
        if (localData) {
            const Data = JSON.parse(localData);
            console.log("Data recieved from localstorage in global component :", Data);
            console.log("User loged in")
            getAiData();
        } else {
            console.log("Not loged in")
        }
    }, [])

    useLayoutEffect(() => {
        // Setting initial values before the component renders
        const handleResize = () => {
            setIsWideScreen(window.innerWidth >= 950);
            setIsWideScreen2(window.innerWidth >= 500);
            setIsHighScreen(window.innerHeight >= 950);
        };

        handleResize(); // Set initial state
        window.addEventListener('resize', handleResize);

        // Set isMounted to true after the initial layout effects are applied
        setIsMounted(true);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    // Prevent rendering until layout is correct
    if (!isMounted) return null;

    const gifBackgroundImage = {
        backgroundImage: 'url("/assets/applogo2.png")', // Ensure the correct path
        backgroundSize: "cover",
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        width: isHighScreen ? '870px' : '500px',
        height: isHighScreen ? '870px' : '500px',
        borderRadius: "50%",
        resize: "cover",
    }

    return (
        <div className='w-full' style={{ height: "100svh", display: 'flex', alignItems: "start", width: "", overflow: "hidden", backgroundColor: '' }}>
            <div className='flex flex-row items-center justify-center w-full' style={{ backgroundColor: '' }}>
                <div
                    style={{ backgroundColor: '' }}
                    className='flex flex-row justify-center items-start md:w-6/12 w-full'
                >
                    <div className='w-full flex flex-col justify-between sm:w-10/12 justify-start items-center' style={{ backgroundColor: '', height: '100vh' }}
                    >
                        <div className='justify-between pt-8 sm:pt-8 md:pt-10 sm:w-full w-10/12' style={{ backgroundColor: '' }}
                        >
                            {
                                currentIndex < 7 &&
                                <Image src={'/creatorXlogo.png'}
                                    alt='logo'
                                    height={410}
                                    width={116}
                                />
                            }
                        </div>
                        <div className={currentIndex === 7 ? 'pt-4 sm:pt-0 sm:w-full w-10/12' : 'pt-0 sm:pt-28 sm:w-full w-10/12'}
                            style={{ backgroundColor: '', height: currentIndex === 7 ? '100%' : '88%', }}>
                            <div className='w-full flex justify-center items-center' style={{ backgroundColor: '' }}
                            >
                                <Animation onChangeIndex={handleCurrentIndex} />
                            </div>
                        </div>
                        <div style={{ height: 0 }} />

                    </div>
                </div>
                {
                    currentIndex === 0 &&
                    <div className='w-6/12 flex lg:flex hidden justify-center h-screen'>
                        <GroupImages />
                    </div>
                }
                {
                    currentIndex === 1 &&
                    <div className='w-6/12 flex lg:flex hidden justify-center h-screen' style={{}}>
                        <GroupImages />
                    </div>
                }
                {
                    currentIndex <= 6 && currentIndex > 1 &&
                    <div className='w-6/12 flex lg:flex hidden  justify-center items-center' style={{ backgroundColor: '' }}>
                        <div style={gifBackgroundImage} className='flex flex-row justify-center items-center'>
                            <Image
                                src="/mainAppGif3.gif" alt='gif' style={{
                                    backgroundColor: "",
                                    borderRadius: "50%", height: isHighScreen ? '780px' : '450px', width: isHighScreen ? '780px' : '450px'
                                }} height={600} width={600} />
                        </div>
                    </div>
                }
            </div>
        </div>
    );
}
