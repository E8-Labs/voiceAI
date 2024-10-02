'use client'
import ScriptAnimation2 from '@/components/creatorOnboarding/ScriptAnimation2';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useState, useEffect } from "react";

export default function Home() {

    const [currentIndex, setCurrentIndex] = useState(0);
    const [isHighScreen, setIsHighScreen] = useState(false);
    const [isWideScreen, setIsWideScreen] = useState(false);
    const [isWideScreen2, setIsWideScreen2] = useState(false);

    const handleCurrentIndex = (id) => {
        setCurrentIndex(id);
        console.log("Current index is", id);
    }

    //resize gif
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

    //code for gif image
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
        <div className='w-full' style={{ height: "100svh", display: 'flex', alignItems: "center", width: "", overflow: "hidden" }}>
            <div className='flex flex-row items-center justify-center w-full'>
                <div
                    // className='flex flex-row justify-center md:w-5/12 w-full items-center'
                    className={`flex flex-row justify-center items-center ${currentIndex === 6 ? 'w-full' : 'lg:w-6/12 w-full'}`} //style={{ backgroundColor: 'green' }}
                >
                    <div //style={{ backgroundColor: 'red' }}
                        className='sm:w-9/12 w-full h-screen flex flex-col justify-between'
                    >
                        <div
                            className='justify-between pt-8 sm:pt-8 md:pt-10 md:w-full w-10/12'
                        // className='mt-12 sm:mt-24'
                        >
                            <Image src={'/creatorXlogo.png'}
                                alt='logo'
                                height={410}
                                width={116}
                            />
                            {/* <div>Onboarding 2</div> */}
                        </div>
                        <div
                            className=' sm:w-full w-full' //className={currentIndex === 7 ? 'pt-28 sm:pt-0 sm:w-full w-10/12' : 'pt-28 sm:pt-28 sm:w-full w-10/12'}  //'pt-28 sm:w-full w-10/12' //{currentIndex === 7 ? 'pt-28 sm:pt-28 sm:w-full w-10/12' : 'sm:w-full w-10/12'} 
                            style={{ backgroundColor: '', height: '65.5%', }}>
                            <div className='w-full flex justify-center items-center sm:mt-0 '>
                                <ScriptAnimation2 onChangeIndex={handleCurrentIndex} />
                            </div>
                        </div>
                        <div />

                    </div>
                </div>
                {
                    currentIndex === 6 ?
                        "" :
                        <div className='w-6/12 flex lg:flex hidden justify-center' style={{ height: "100%" }}>
                            {/* <img src="/assets/mainLogo.png" alt='app' style={{ height: "850px", width: "100%", resize: "cover", objectFit: "contain" }} /> */}
                            <div style={gifBackgroundImage} className='flex flex-row justify-center items-center'>
                                <Image
                                    // onClick={handleContinue}
                                    src="/mainAppGif3.gif" alt='gif' style={{
                                        backgroundColor: "",
                                        borderRadius: "50%", height: isHighScreen ? '780px' : '450px', width: isHighScreen ? '780px' : '450px'
                                    }} height={600} width={600} />
                            </div>
                        </div>
                }
                {/* {
                    currentIndex === 1 &&
                    <div className='w-7/12 flex md:flex hidden justify-center' style={{ height: "100%" }}>
                        <img src="/assets/groupImages.png" alt='app' style={{ height: "850px", width: "100%", resize: "cover", objectFit: "contain" }} />
                    </div>
                } */}
            </div>
            {/* <div>hello</div> */}
        </div>
    );
}