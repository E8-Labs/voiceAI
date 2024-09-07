"use client"
import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion';

const GroupImages = () => {

    const [screenWidth, setScreenWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => {
            setScreenWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const rightPosition = screenWidth >= 768 && screenWidth <= 1024 ? 400 : 450;

    return (
        <div>
            <div style={{ position: 'absolute', top: 70, right: 100 }}>
                <motion.img
                    src="/assets/user11.png"
                    // alt="Animating Image"
                    className='flex flex-row items-center justify-center'
                    animate={{
                        width: ["80px", "50px", "80px"],
                        height: ["80px", "50px", "80px"]
                    }}
                    transition={{
                        duration: 4,
                        repeat: Infinity,
                        repeatType: "loop",
                        ease: "easeInOut",
                    }}
                >
                </motion.img>
            </div>

            <div style={{ position: 'absolute', top: 180, right: 280 }}>
                <motion.img
                    src="/assets/user10.png"
                    // alt="Animating Image"
                    className='flex flex-row items-center justify-center'
                    animate={{
                        width: ["80px", "50px", "80px"],
                        height: ["80px", "50px", "80px"]
                    }}
                    transition={{
                        duration: 4,
                        repeat: Infinity,
                        repeatType: "loop",
                        ease: "easeInOut",
                    }}
                >
                </motion.img>
            </div>

            <div className='lg:flex hidden' style={{ position: 'absolute', top: 130, right: 550 }}>
                <motion.img
                    src="/assets/user1.png"
                    // alt="Animating Image"
                    className='flex flex-row items-center justify-center'
                    animate={{
                        width: ["80px", "50px", "80px"],
                        height: ["80px", "50px", "80px"]
                    }}
                    transition={{
                        duration: 4,
                        repeat: Infinity,
                        repeatType: "loop",
                        ease: "easeInOut",
                    }}
                >
                </motion.img>
            </div>

            <div style={{ position: 'absolute', top: 350, right: 50 }}>
                <motion.img
                    src="/assets/user8.png"
                    // alt="Animating Image"
                    className='flex flex-row items-center justify-center'
                    animate={{
                        width: ["80px", "50px", "80px"],
                        height: ["80px", "50px", "80px"]
                    }}
                    transition={{
                        duration: 4,
                        repeat: Infinity,
                        repeatType: "loop",
                        ease: "easeInOut",
                    }}
                >
                </motion.img>
            </div>

            <div style={{ position: 'absolute', top: 310, right: 380 }}>
                <motion.img
                    src="/assets/user9.png"
                    // alt="Animating Image"
                    className='flex flex-row items-center justify-center'
                    animate={{
                        width: ["80px", "50px", "80px"],
                        height: ["80px", "50px", "80px"]
                    }}
                    transition={{
                        duration: 4,
                        repeat: Infinity,
                        repeatType: "loop",
                        ease: "easeInOut",
                    }}
                >
                </motion.img>
            </div>

            <div className='lg:flex hidden' style={{ position: 'absolute', top: 350, right: 600 }}>
                <motion.img
                    src="/assets/user2.png"
                    // alt="Animating Image"
                    className='flex flex-row items-center justify-center'
                    animate={{
                        width: ["80px", "50px", "80px"],
                        height: ["80px", "50px", "80px"]
                    }}
                    transition={{
                        duration: 4,
                        repeat: Infinity,
                        repeatType: "loop",
                        ease: "easeInOut",
                    }}
                >
                </motion.img>
            </div>

            <div style={{ position: 'absolute', top: 500, right: 150 }}>
                <motion.img
                    src="/assets/user7.png"
                    // alt="Animating Image"
                    className='flex flex-row items-center justify-center'
                    animate={{
                        width: ["80px", "50px", "80px"],
                        height: ["80px", "50px", "80px"]
                    }}
                    transition={{
                        duration: 4,
                        repeat: Infinity,
                        repeatType: "loop",
                        ease: "easeInOut",
                    }}
                >
                </motion.img>
            </div>

            <div style={{ position: 'absolute', top: 560, right: rightPosition }}>
                <motion.img
                    src="/assets/user3.png"
                    // alt="Animating Image"
                    className='flex flex-row items-center justify-center'
                    animate={{
                        width: ["80px", "50px", "80px"],
                        height: ["80px", "50px", "80px"]
                    }}
                    transition={{
                        duration: 4,
                        repeat: Infinity,
                        repeatType: "loop",
                        ease: "easeInOut",
                    }}
                >
                </motion.img>
            </div>

            <div className='lg:flex hidden' style={{ position: 'absolute', top: 650, right: 650 }}>
                <motion.img
                    src="/assets/user4.png"
                    // alt="Animating Image"
                    className='flex flex-row items-center justify-center'
                    animate={{
                        width: ["80px", "50px", "80px"],
                        height: ["80px", "50px", "80px"]
                    }}
                    transition={{
                        duration: 4,
                        repeat: Infinity,
                        repeatType: "loop",
                        ease: "easeInOut",
                    }}
                >
                </motion.img>
            </div>

            <div style={{ position: 'absolute', top: 830, right: 380 }}>
                <motion.img
                    src="/assets/user5.png"
                    // alt="Animating Image"
                    className='flex flex-row items-center justify-center'
                    animate={{
                        width: ["80px", "50px", "80px"],
                        height: ["80px", "50px", "80px"]
                    }}
                    transition={{
                        duration: 4,
                        repeat: Infinity,
                        repeatType: "loop",
                        ease: "easeInOut",
                    }}
                >
                </motion.img>
            </div>

            <div style={{ position: 'absolute', top: 730, right: 200 }}>
                <motion.img
                    src="/assets/user6.png"
                    // alt="Animating Image"
                    className='flex flex-row items-center justify-center'
                    animate={{
                        width: ["80px", "50px", "80px"],
                        height: ["80px", "50px", "80px"]
                    }}
                    transition={{
                        duration: 4,
                        repeat: Infinity,
                        repeatType: "loop",
                        ease: "easeInOut",
                    }}
                >
                </motion.img>
            </div>

            <div className='xl:flex hidden' style={{ position: 'absolute', top: 860, right: 780 }}>
                <motion.img
                    src="/assets/profile.png"
                    // alt="Animating Image"
                    className='flex flex-row items-center justify-center'
                    animate={{
                        width: ["80px", "50px", "80px"],
                        height: ["80px", "50px", "80px"]
                    }}
                    transition={{
                        duration: 4,
                        repeat: Infinity,
                        repeatType: "loop",
                        ease: "easeInOut",
                    }}
                    style={{
                        borderRadius: "50%",
                        border: "1px solid #552AFF",
                        padding: 4
                    }}
                >
                </motion.img>
            </div>

            <div className='xl:flex hidden' style={{ position: 'absolute', top: 480, right: 800 }}>
                <motion.img
                    src="/tristan.png"
                    // alt="Animating Image"
                    className='flex flex-row items-center justify-center'
                    animate={{
                        width: ["80px", "50px", "80px"],
                        height: ["80px", "50px", "80px"]
                    }}
                    transition={{
                        duration: 4,
                        repeat: Infinity,
                        repeatType: "loop",
                        ease: "easeInOut",
                    }}
                    style={{
                        borderRadius: "50%",
                        border: "1px solid #552AFF",
                        padding: 4
                    }}
                >
                </motion.img>
            </div>

            <div className='xl:flex hidden' style={{ position: 'absolute', top: 200, right: 800 }}>
                <motion.img
                    src="/tristan.jpg"
                    // alt="Animating Image"
                    className='flex flex-row items-center justify-center'
                    animate={{
                        width: ["80px", "50px", "80px"],
                        height: ["80px", "50px", "80px"]
                    }}
                    transition={{
                        duration: 4,
                        repeat: Infinity,
                        repeatType: "loop",
                        ease: "easeInOut",
                    }}
                    style={{
                        borderRadius: "50%",
                        border: "1px solid #552AFF",
                        padding: 4
                    }}
                >
                </motion.img>
            </div>

        </div>
    )
}

export default GroupImages