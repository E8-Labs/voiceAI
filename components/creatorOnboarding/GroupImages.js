"use client"
import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion';

const GroupImages = () => {

    const [screenWidth, setScreenWidth] = useState(window.innerWidth);
    const [showImg, setShowImg] = useState(false);
    const [showImg2, setShowImg2] = useState(false);
    const [showImg3, setShowImg3] = useState(false);
    const rightPosition = screenWidth >= 768 && screenWidth <= 1024 ? 400 : 450;

    useEffect(() => {
        const handleResize = () => {
            setScreenWidth(window.innerWidth);
            const height = window.innerHeight;
            // setShowImg(height < 960);
            if (height < 960) {
                setShowImg(height < 960);
            } else {
                setShowImg(false);
            }
            if (height < 910) {
                setShowImg2(height < 910);
            } else {
                setShowImg2(false);
            }
            if (height < 800) {
                setShowImg3(height < 800);
            } else {
                setShowImg3(false);
            }
        };

        handleResize();

        // Add the event listener for window resizing
        window.addEventListener('resize', handleResize);

        // Cleanup the event listener on unmount
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    // width: ["80px", "50px", "80px"], height: ["80px", "50px", "80px"]


    return (
        <div className='flex flex-col h-screen justify-center items-center'>
            <div style={{ position: 'absolute', top: 70, right: 100 }}>
                <motion.img
                    src="/assets/user11.png"
                    // alt="Animating Image"
                    className='flex flex-row items-center justify-center'
                    animate={{
                        width: ["50px", "80px"],
                        height: ["50px", "80px"]
                    }}
                    transition={{
                        duration: 4,
                        // repeat: Infinity,
                        // repeatType: "loop",
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
                        width: ["50px", "80px"],
                        height: ["50px", "80px"]
                    }}
                    transition={{
                        duration: 4,
                        // repeat: Infinity,
                        // repeatType: "loop",
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
                        width: ["50px", "80px"],
                        height: ["50px", "80px"]
                    }}
                    transition={{
                        duration: 4,
                        // repeat: Infinity,
                        // repeatType: "loop",
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
                        width: ["50px", "80px"],
                        height: ["50px", "80px"]
                    }}
                    transition={{
                        duration: 4,
                        // repeat: Infinity,
                        // repeatType: "loop",
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
                        width: ["50px", "80px"],
                        height: ["50px", "80px"]
                    }}
                    transition={{
                        duration: 4,
                        // repeat: Infinity,
                        // repeatType: "loop",
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
                        width: ["50px", "80px"],
                        height: ["50px", "80px"]
                    }}
                    transition={{
                        duration: 4,
                        // repeat: Infinity,
                        // repeatType: "loop",
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
                        width: ["50px", "80px"],
                        height: ["50px", "80px"]
                    }}
                    transition={{
                        duration: 4,
                        // repeat: Infinity,
                        // repeatType: "loop",
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
                        width: ["50px", "80px"],
                        height: ["50px", "80px"]
                    }}
                    transition={{
                        duration: 4,
                        // repeat: Infinity,
                        // repeatType: "loop",
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
                        width: ["50px", "80px"],
                        height: ["50px", "80px"]
                    }}
                    transition={{
                        duration: 4,
                        // repeat: Infinity,
                        // repeatType: "loop",
                        ease: "easeInOut",
                    }}
                >
                </motion.img>
            </div>

            {showImg2 ?
                "" :
                <div style={{ position: 'absolute', top: 830, right: 380 }}>
                    <motion.img
                        src="/assets/user5.png"
                        // alt="Animating Image"
                        className='flex flex-row items-center justify-center'
                        animate={{
                            width: ["50px", "80px"],
                            height: ["50px", "80px"]
                        }}
                        transition={{
                            duration: 4,
                            // repeat: Infinity,
                            // repeatType: "loop",
                            ease: "easeInOut",
                        }}
                    >
                    </motion.img>
                </div>}

            {showImg3 ?
                "" : <div style={{ position: 'absolute', top: 730, right: 200 }}>
                    <motion.img
                        src="/assets/user6.png"
                        // alt="Animating Image"
                        className='flex flex-row items-center justify-center'
                        animate={{
                            width: ["50px", "80px"],
                            height: ["50px", "80px"]
                        }}
                        transition={{
                            duration: 4,
                            // repeat: Infinity,
                            // repeatType: "loop",
                            ease: "easeInOut",
                        }}
                    >
                    </motion.img>
                </div>}

            {
                showImg ?
                    "" :
                    <div className='xl:flex hidden' style={{ position: 'absolute', top: 860, right: 780 }}>
                        <motion.img
                            src="/assets/profile.png"
                            // alt="Animating Image"
                            className='flex flex-row items-center justify-center'
                            animate={{
                                width: ["50px", "80px"],
                                height: ["50px", "80px"]
                            }}
                            transition={{
                                duration: 4,
                                // repeat: Infinity,
                                // repeatType: "loop",
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
            }


            <div className='xl:flex hidden' style={{ position: 'absolute', top: 480, right: 800 }}>
                <motion.img
                    src="/tristan.png"
                    // alt="Animating Image"
                    className='flex flex-row items-center justify-center'
                    animate={{
                        width: ["50px", "80px"],
                        height: ["50px", "80px"]
                    }}
                    transition={{
                        duration: 4,
                        // repeat: Infinity,
                        // repeatType: "loop",
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
                        width: ["50px", "80px"],
                        height: ["50px", "80px"]
                    }}
                    transition={{
                        duration: 4,
                        // repeat: Infinity,
                        // repeatType: "loop",
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