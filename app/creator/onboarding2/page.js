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
    }, [])




    return (
        <div className='w-full' style={{ height: "100vh", display: 'flex', alignItems: "center", width: "", overflow: "hidden" }}>
            <div className='flex flex-row items-center justify-center w-full'>
                <div
                    // className='flex flex-row justify-center md:w-5/12 w-full items-center'
                    className={`flex flex-row justify-center items-center ${currentIndex === 6 ? 'w-full' : 'md:w-5/12 w-full'}`}
                >
                    <div className='w-11/12'>
                        <div className='mt-24 sm:flex hidden'>
                            {
                                currentIndex < 6 &&
                                <Image src={'/assets/applogo.png'}
                                    alt='logo'
                                    height={40}
                                    width={37}
                                />
                            }
                            {/* <div>Onboarding 2</div> */}
                        </div>
                        <div className='w-full flex justify-center items-center' >
                            <Animation onChangeIndex={handleCurrentIndex} />
                        </div>

                    </div>
                </div>
                {
                    currentIndex === 0 &&
                    <div className='w-7/12 flex md:flex hidden justify-center h-screen'>
                        {/* <img src="/assets/groupImages.png" alt='app' style={{ height: "850px", width: "100%", resize: "cover", objectFit: "contain" }} /> */}
                        {/* <ImagesFile /> */}
                        <GroupImages />
                    </div>
                }
                {
                    currentIndex === 1 &&
                    <div className='w-7/12 flex md:flex hidden justify-center h-screen' style={{  }}>
                        {/* <img src="/assets/groupImages.png" alt='app' style={{ height: "850px", width: "100%", resize: "cover", objectFit: "contain" }} /> */}
                        {/* <ImagesFile /> */}
                        <GroupImages />
                    </div>
                }
                {
                    currentIndex < 6 && currentIndex > 1 &&
                    <div className='w-7/12 flex md:flex hidden  justify-center'>
                        <img src='/assets/mainLogo.png' alt='app' style={{ height: "637px", width: "637px", resize: "cover", objectFit: "contain" }} />
                    </div>
                }
            </div>
            {/* <div>hello</div> */}
        </div>
    );
}
