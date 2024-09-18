'use client'
import Animation from '@/components/animation/Animation';
import GroupImages from '@/components/creatorOnboarding/GroupImages';
import ImagesFile from '@/components/imagesfile/ImagesFile';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from "react";

const backgroundImage = {
    backgroundImage: 'url("/backgroundImage.png")', // Ensure the correct path
    backgroundSize: "cover",
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    width: '100%',
    height: '100vh',
}

export default function Home() {

    const router = useRouter();
    const [currentIndex, setCurrentIndex] = useState(null);
    const [isHighScreen, setIsHighScreen] = useState(false);
    const [isWideScreen, setIsWideScreen] = useState(false);
    const [isWideScreen2, setIsWideScreen2] = useState(false);

    const handleCurrentIndex = (id) => {
        setCurrentIndex(id);
    }

    // const searchParams = useSearchParams();
    // const name = searchParams.get('name');
    // console.log("Name passed", name);

    useEffect(() => {
        const Data = localStorage.getItem('route');
        if (Data) {
            const LocalData = JSON.parse(Data);
            console.log("Route path recieved is", LocalData);
        }
    }, []);

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
        <div className='w-full' style={{ height: "100vh", display: 'flex', alignItems: "center", width: "", overflow: "hidden" }}>
            <div className='flex flex-row items-center justify-center w-full'>
                <div
                    // className='flex flex-row justify-center md:w-5/12 w-full items-center'
                    // className={`flex flex-row justify-center items-center ${currentIndex === 6 ? 'w-6/12' : 'md:w-6/12 w-full'}`}
                    className='flex flex-row justify-center items-center md:w-6/12 w-full' //{`flex flex-row justify-center items-center md:w-6/12 w-full ${currentIndex === 6 ? 'w-6/12' : 'md:w-6/12 w-full'}`}
                >
                    <div className='w-full flex flex-col justify-between sm:w-9/12 justify-start items-center h-screen' //style={{backgroundColor: 'green'}}
                    >
                        <div className='sm:flex hidden justify-between sm:pt-10 md:pt-14 w-full' style={{ backgroundColor: '' }}
                        >
                            {
                                currentIndex < 7 &&
                                <Image src={'/assets/applogo.png'}
                                    alt='logo'
                                    height={40}
                                    width={37}
                                />
                            }
                            {/* <div>Onboarding 2</div> */}
                        </div>
                        <div className='w-full flex justify-center items-center -mt-12' style={{ backgroundColor: '' }}
                        >
                            <Animation onChangeIndex={handleCurrentIndex} />
                        </div>
                        {/* <div className={currentIndex === 7 ? 'pt-28 sm:pt-0 sm:w-full w-10/12' : 'pt-28 sm:pt-28 sm:w-full w-10/12'}  //'pt-28 sm:w-full w-10/12' //{currentIndex === 7 ? 'pt-28 sm:pt-28 sm:w-full w-10/12' : 'sm:w-full w-10/12'} 
                            style={{ backgroundColor: '', height: currentIndex === 7 ? '100%' : '75%', }}>
                            <div className='w-full flex justify-center items-center' style={{ backgroundColor: '' }}
                            >
                                <Animation onChangeIndex={handleCurrentIndex} />
                            </div>
                        </div> */}
                        <div style={{ height: 0 }} />

                    </div>
                </div>
                {
                    currentIndex === 0 &&
                    <div className='w-6/12 flex lg:flex hidden justify-center h-screen'>
                        {/* <img src="/assets/groupImages.png" alt='app' style={{ height: "850px", width: "100%", resize: "cover", objectFit: "contain" }} /> */}
                        {/* <ImagesFile /> */}
                        <GroupImages />
                    </div>
                }
                {
                    currentIndex === 1 &&
                    <div className='w-6/12 flex lg:flex hidden justify-center h-screen' style={{}}>
                        {/* <img src="/assets/groupImages.png" alt='app' style={{ height: "850px", width: "100%", resize: "cover", objectFit: "contain" }} /> */}
                        {/* <ImagesFile /> */}
                        <GroupImages />
                    </div>
                }
                {
                    currentIndex <= 6 && currentIndex > 1 &&
                    <div className='w-6/12 flex lg:flex hidden  justify-center'>
                        {/* <img src='/assets/mainLogo.png' alt='app' style={{ height: "637px", width: "637px", resize: "cover", objectFit: "contain" }} /> */}

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
            </div>
            {/* <div>hello</div> */}
        </div>
    );
}
