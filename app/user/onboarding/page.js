"use client"
import { motion } from 'framer-motion';
import React, { useState } from 'react';
import Image from 'next/image';

const backgroundImage = {
    backgroundImage: 'url("/backgroundImage.png")', // Ensure the correct path
    backgroundSize: "cover",
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    width: '100%',
    height: '100vh',
}

const Page = () => {

    const [isVisible, setIsVisible] = useState(false);

    // Animation variants for entering and exiting
    const variants = {
        hidden: { opacity: 0, y: -100 },
        visible: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: 100 },
    };


    return (
        <div style={backgroundImage} className='flex flex-col justify-between h-full'>
            <div className='pt-12 ps-8'>
                <div className='md:flex hidden w-2/12 px-6 py-2 flex gap-4 flex-row items-center' style={{ border: "2px solid #ffffff", borderRadius: 70 }}>
                    <div style={{ border: "2px solid black", borderRadius: "50%", padding: 4 }}>
                        <Image src={"/assets/profile.png"} height={40} width={40} style={{ resize: "cover" }} />
                    </div>
                    <div className='flex flex-row gap-6'>
                        <div style={{ fontSize: 15, fontWeight: "400" }}>
                            Tate.hello
                        </div>
                        <button>
                            <Image src={"/assets/twitter.png"} height={20} width={20} style={{ resize: "cover" }} />
                        </button>
                        <button>
                            <Image src={"/assets/instagram.png"} height={20} width={20} style={{ resize: "cover" }} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Centered "test" <Image src={"/assets/applogo.png"} height={400} width={400} /> */}
            <div className='flex items-center justify-center flex-1'>
                {/* <motion.img
                    src="/assets/applogo.png"
                    alt="Animating Image"
                    animate={{
                        width: [],  // Keyframes for width
                        height: ["500px", "350px", "500px"], // Keyframes for height
                    }}
                    transition={{
                        duration: 80,
                        repeat: Infinity,
                        repeatType: "loop",
                        ease: "easeInOut",
                    }}
                    style={{
                        margin: "auto",
                        display: "block",
                    }}
                /> */}
                <motion.img
                    src="/assets/applogo.png" // Ensure this path is correct
                    alt="Animating Image"
                    animate={{
                        width: ["500px", "350px", "500px"],  // Keyframes for width
                        height: ["500px", "350px", "500px"], // Keyframes for height
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
                        width: "500px", // Initial width
                        height: "500px", // Initial height
                    }}
                />
            </div>

            {/* Positioned "end" at the bottom */}
            <div className='flex items-end ms-8 mb-12 p-4 rounded' style={{ backgroundColor: "#620FEB66", width: "fit-content" }}>
                <button className='flex flex-row items-center gap-6'>
                    <div className='text-white' style={{ fontSize: 17, fontWeight: "600" }}>
                        Build CreatorX
                    </div>
                    <Image src={"/assets/phone.png"} height={20} width={20} />
                </button>
            </div>
        </div>
    )
}

export default Page;
