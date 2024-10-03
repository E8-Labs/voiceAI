'use client'
import { Box } from '@mui/material';
import Image from 'next/image';
import React from 'react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from "framer-motion";

const AnimationBox2 = () => {


    const [isHighScreen, setIsHighScreen] = useState(false);
    const [isWideScreen, setIsWideScreen] = useState(false);
    const [isWideScreen2, setIsWideScreen2] = useState(false);
    const [currentAnimation, setCurrentAnimation] = useState(1);


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
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    //code for animation one after the other
    const handleAnimationComplete = (nextAnimation) => {
        setTimeout(() => setCurrentAnimation(nextAnimation), 500); // Delay before starting the next animation
    };

    //code for gif image
    const gifBackgroundImage = {
        backgroundImage: 'url("/assets/applogo2.png")', // Ensure the correct path
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        width: isHighScreen ? "870px" : "500px",
        height: isHighScreen ? "870px" : "500px",
        // borderRadius: "50%",
        resize: "cover",
    };


    return (
        <div>
            <div
                style={gifBackgroundImage}
                className="flex flex-row justify-center items-center"
            >
                <Image
                    // onClick={handleContinue}
                    src="/mainAppGif3.gif"
                    alt="gif"
                    className={`rounded-full ${isHighScreen ? 'h-[780px] w-[780px]' : 'h-[450px] w-[450px]'}`}
                    height={600}
                    width={600}
                />
            </div>
            {/* First Animated Image Jay Shetty */}
            {currentAnimation === 1 && (
                <Box sx={{ position: "absolute", top: 90, right: 140, zIndex: 2 }}>
                    <motion.div
                        style={{
                            transformOrigin: "center center",
                            border: "2px solid white",
                            paddingInline: 10,
                            paddingTop: 10,
                            backgroundColor: "#FFFFFF80",
                            width: '350px'
                        }}
                        animate={{ opacity: [0, 1, 0], height: ["30px", "160px", "30px"] }}
                        transition={{ duration: 10, ease: "easeInOut" }}
                        onAnimationComplete={() => handleAnimationComplete(2)} // Start next animation after this one ends
                    >
                        <div className="flex flex-col items-start gap-2">
                            <Image
                                src="/assets/jay.png"
                                alt="123"
                                style={{
                                    // borderRadius: "50%",
                                    height: "50px",
                                    width: "50px",
                                }}
                                height={50}
                                width={50}
                            />
                            {/*<div style={{ color: "#00000060" }}>Jay Shetty</div>*/}
                            <div className="ml-2 line-clamp-3">
                                Jay Shetty empowers his community by sharing profound wisdom and practical advice on building meaningful relationships. He uses his background
                            </div>
                        </div>
                    </motion.div>
                </Box>
            )}

            {/* Second Animated Image MKBHD */}
            {currentAnimation === 2 && (
                <Box sx={{ position: "absolute", top: 180, right: '30%', zIndex: 2 }}>
                    <motion.div
                        style={{
                            transformOrigin: "center center",
                            border: "2px solid white",
                            paddingInline: 10,
                            borderRadius: 15,
                            backgroundColor: "#FFFFFF80",
                            width: '350px'
                        }}
                        animate={{ opacity: [0, 1, 0], height: ["30px", "160px", "30px"] }}
                        transition={{ duration: 10, ease: "easeInOut" }}
                        onAnimationComplete={() => handleAnimationComplete(3)} // Start next animation after this one ends
                    >
                        <div className="flex flex-col items-start justify-start gap-2">
                            <Image
                                src="/mkbhd.png"
                                alt="123"
                                style={{
                                    width: "50px",
                                    height: "50px",
                                    borderRadius: "50%",
                                    border: "3px solid white",
                                    objectFit: "cover",
                                }}
                                height={50}
                                width={50}
                            />
                            {/*<div style={{ color: "#00000060" }}>MKBHD</div>*/}
                            <div className="ml-1 line-clamp-3" style={{ width: '' }}>
                                MKBHD, also known as Marques Brownlee, revolutionizes the tech community with his in-depth reviews and analysis of the latest gadgets and
                            </div>
                        </div>
                    </motion.div>
                </Box>
            )}

            {/* Third Animated Image Alex Hormozi */}
            {currentAnimation === 3 && (
                <Box sx={{ position: "absolute", bottom: 250, right: 180, zIndex: 2 }}>
                    <motion.div
                        style={{
                            transformOrigin: "center center",
                            border: "2px solid white",
                            paddingInline: 10,
                            borderRadius: 15,
                            backgroundColor: "#FFFFFF80",
                            width: '350px'
                            // paddingTop: 20
                        }}
                        animate={{ opacity: [0, 1, 0], height: ["30px", "160px", "30px"] }}
                        transition={{ duration: 10, ease: "easeInOut" }}
                        onAnimationComplete={() => handleAnimationComplete(4)} // Start next animation after this one ends
                    >
                        <div className="flex flex-col items-start gap-2 pt-2">
                            <Image
                                src="/alex.png"
                                alt="123"
                                style={{
                                    width: "50px",
                                    height: "50px",
                                    borderRadius: "50%",
                                    border: "3px solid white",
                                    objectFit: "cover",
                                }}
                                height={50}
                                width={50}
                            />
                            {/*<div style={{ color: "#00000060", width: "130px" }}>Alex Hormozi</div>*/}
                            <div className='line-clamp-3' style={{ width: "100%" }}>
                                tortor, in convallis felis. Cras auctor turpis non metus facilisis, ut aliquam quam tristique. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse a nibh ut purus feugiat euismod. Duis ac pellentesque leo.
                            </div>
                        </div>
                    </motion.div>
                </Box>
            )}

            {/* Fourth Animated Image Andrew Tate */}
            {currentAnimation === 4 && (
                <Box sx={{ position: "absolute", bottom: 330, right: 210, zIndex: 2 }}>
                    <motion.div
                        style={{
                            transformOrigin: "center center",
                            border: "2px solid white",
                            paddingInline: 10,
                            borderRadius: 15,
                            backgroundColor: "#FFFFFF80",
                            width: '350px'
                        }}
                        animate={{ opacity: [0, 1, 0], height: ["30px", "160px", "30px"] }}
                        transition={{ duration: 10, ease: "easeInOut" }}
                        onAnimationComplete={() => handleAnimationComplete(1)} // Loop back to the first animation
                    >
                        <div className="flex flex-col items-start gap-2">
                            <Image
                                src="/andrew.png"
                                alt="123"
                                style={{
                                    width: "50px",
                                    height: "50px",
                                    borderRadius: "50%",
                                    border: "3px solid white",
                                    objectFit: "cover",
                                }}
                                height={50}
                                width={50}
                            />
                            {/*<div style={{ color: "#00000060", width: "120px" }}>Andrew Tate</div>*/}
                            <div style={{ width: "150px" }} className='line-clamp-3'>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse a nibh ut purus feugiat euismod. Duis ac pellentesque leo.
                            </div>
                        </div>
                    </motion.div>
                </Box>
            )}
        </div>
    )
}

export default AnimationBox2
