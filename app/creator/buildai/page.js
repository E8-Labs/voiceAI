'use client'
import Animation from '@/components/animation/Animation';
import ScriptAiAnimation from '@/components/scriptai_animation/ScriptAiAnimation';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useState } from "react";

export default function Home() {

    const [currentIndex, setCurrentIndex] = useState(null);

    const handleCurrentIndex = (id) => {
        setCurrentIndex(id);
    }

    return (
        <div className='w-full' style={{ height: "100vh", display: 'flex', alignItems: "center", width: "", overflow: "hidden" }}>
            <div className='flex flex-row items-center justify-center w-full'>
                <div
                    // className='flex flex-row justify-center md:w-5/12 w-full items-center'
                    className={`flex flex-row justify-center items-center ${currentIndex === 6 ? 'w-full' : 'md:w-5/12 w-full'}`}
                >
                    <div className='w-11/12'>
                        <div className='mt-24 sm:flex hidden'>
                            <Image src={'/assets/applogo.png'}
                                alt='logo'
                                height={40}
                                width={37}
                            />
                            {/* <div>Onboarding 2</div> */}
                        </div>
                        <ScriptAiAnimation />
                    </div>
                </div>
                {
                    currentIndex === 0 &&
                    <div className='w-7/12 flex md:flex hidden  justify-center'>
                        <img src='/assets/applogo.png' alt='app' style={{ height: "537px", width: "537px", resize: "cover", objectFit: "contain" }} />
                    </div>
                }
                {
                    currentIndex < 6 && currentIndex > 0 &&
                    <div className='w-7/12 flex md:flex hidden  justify-center'>
                        <img src='/assets/mainLogo.png' alt='app' style={{ height: "637px", width: "637px", resize: "cover", objectFit: "contain" }} />
                    </div>
                }
            </div>
            {/* <div>hello</div> */}
        </div>
    );
}
