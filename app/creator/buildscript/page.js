'use client'
import Animation from '@/components/animation/Animation';
import ScriptAnimation from '@/components/creatorOnboarding/ScriptAnimation';
import ScriptAiAnimation from '@/components/creatorOnboarding/ScriptAnimation';
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
        // <div className='w-full' style={{ height: "100vh", display: 'flex', alignItems: "center", width: "", overflow: "hidden" }}>
        //     <div className='flex flex-row items-center justify-center w-full'>
        //         <div
        //             // className='flex flex-row justify-center md:w-5/12 w-full items-center'
        //             className={`flex flex-row justify-center items-center ${currentIndex === 6 ? 'w-full' : 'md:w-5/12 w-full'}`}
        //         >
        //             <div className='w-11/12'>
        //                 <div className='mt-24 sm:flex hidden'>
        //                     <Image src={'/assets/applogo.png'}
        //                         alt='logo'
        //                         height={40}
        //                         width={37}
        //                     />
        //                     {/* <div>Onboarding 2</div> */}
        //                 </div>
        //                 {/* <ScriptAiAnimation /> */}
        //                 <div style={{ border: "2px solid red" }}>
        //                     <ScriptAnimation onChangeIndex={handleCurrentIndex} />
        //                 </div>
        //             </div>
        //         </div>
        //         {
        //             currentIndex === 0 &&
        //             <div className='w-7/12 flex md:flex hidden justify-center' style={{ height: "100%" }}>
        //                 <img src="/assets/groupImages.png" alt='app' style={{ height: "850px", width: "100%", resize: "cover", objectFit: "contain" }} />
        //                 {/* <ImagesFile /> */}
        //             </div>
        //         }
        //         {
        //             currentIndex < 6 && currentIndex > 0 &&
        //             <div className='w-7/12 flex md:flex hidden  justify-center'>
        //                 <img src='/assets/mainLogo.png' alt='app' style={{ height: "637px", width: "637px", resize: "cover", objectFit: "contain" }} />
        //             </div>
        //         }
        //     </div>
        //     {/* <div>hello</div> */}
        // </div>
        <div className='w-full' style={{ height: "100vh", display: 'flex', alignItems: "center", width: "", overflow: "hidden", }}>
            <div className='flex flex-row items-center justify-center w-full' style={{ height: '100%' }}>
                <div
                    // className='flex flex-row justify-center md:w-5/12 w-full items-center'
                    className={`flex flex-row h-screen ${currentIndex === 6 ? 'w-full' : 'md:w-5/12 w-full'}`} style={{}}
                >
                    <div className='sm:w-11/12 w-full h-screen flex flex-col justify-between'>
                        <div className='sm:flex hidden sm:mt-24 ms-4'>
                            <Image src={'/assets/applogo.png'}
                                alt='logo'
                                height={40}
                                width={37}
                            />
                            {/* <div>Onboarding 2</div> */}
                        </div>
                        <div className='w-full flex justify-center items-center sm:-mt-24'>
                            <ScriptAnimation onChangeIndex={handleCurrentIndex} />
                        </div>
                        <div />

                    </div>
                </div>
                <div className='w-7/12 flex md:flex hidden justify-center items-center' style={{ height: "100%" }}>
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
            </div>
            {/* <div>hello</div> */}
        </div>
    );
}