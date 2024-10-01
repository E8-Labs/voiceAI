'use client'
import React, { useEffect, useState } from 'react';
import { Box } from "@mui/material";
import { motion } from "framer-motion";
import Image from 'next/image';

const BoxAnimationIndex1 = ({ currentIndex }) => {
    const [isHighScreen, setIsHighScreen] = useState(false);
    const [currentAnimation, setCurrentAnimation] = useState(1); // Track which animation is currently running
    const [isWideScreen2, setIsWideScreen2] = useState(false);

    //resize gif
    useEffect(() => {
        const handleResize = () => {
            setIsWideScreen2(window.innerWidth >= 500);
            setIsHighScreen(window.innerHeight >= 950);
        };

        handleResize(); // Set initial state
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    const handleAnimationComplete = (nextAnimation) => {
        setTimeout(() => setCurrentAnimation(nextAnimation), 500); // Delay before starting the next animation
    };

    return (
        <div>
            <Box
                sx={{
                    position: "relative",
                    height: isHighScreen ? "780px" : "450px",
                    width: isHighScreen ? "780px" : "450px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    // borderRadius: "50%",
                    overflow: "hidden", // Ensures images don't overflow out of the circular container
                }}
            >
                {/* Main GIF */}
                <Image
                    src="/mainAppGif3.gif"
                    alt="gif"
                    layout="fill"
                    objectFit="cover"
                />

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
                            }}
                            animate={{ opacity: [0, 1, 0], height: ["30px", "70px", "30px"] }}
                            transition={{ duration: 5, ease: "easeInOut" }}
                            onAnimationComplete={() => handleAnimationComplete(2)} // Start next animation after this one ends
                        >
                            <div className="flex flex-row justify-center">
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
                                <div style={{ color: "#00000060" }}>Jay Shetty</div>
                                <div className="ml-2">Relationship Coach</div>
                            </div>
                        </motion.div>
                    </Box>
                )}

                {/* Second Animated Image MKBHD */}
                {currentAnimation === 2 && (
                    <Box sx={{ position: "absolute", top: 180, right: 280, zIndex: 2 }}>
                        <motion.div
                            style={{
                                transformOrigin: "center center",
                                border: "2px solid white",
                                paddingInline: 10,
                                borderRadius: 15,
                                backgroundColor: "#FFFFFF80",
                            }}
                            animate={{ opacity: [0, 1, 0], height: ["30px", "70px", "30px"] }}
                            transition={{ duration: 5, ease: "easeInOut" }}
                            onAnimationComplete={() => handleAnimationComplete(3)} // Start next animation after this one ends
                        >
                            <div className="flex flex-row items-center">
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
                                <div style={{ color: "#00000060" }}>MKBHD</div>
                                <div className="ml-1">Content Creator</div>
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
                            }}
                            animate={{ opacity: [0, 1, 0], height: ["30px", "70px", "30px"] }}
                            transition={{ duration: 5, ease: "easeInOut" }}
                            onAnimationComplete={() => handleAnimationComplete(4)} // Start next animation after this one ends
                        >
                            <div className="flex flex-row items-center">
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
                                <div style={{ color: "#00000060", width: "130px" }}>Alex Hormozi</div>
                                <div style={{ width: "150px" }}>Business Coach</div>
                            </div>
                        </motion.div>
                    </Box>
                )}

                {/* Fourth Animated Image Andrew Tate */}
                {currentAnimation === 4 && (
                    <Box sx={{ position: "absolute", bottom: 330, left: 110, zIndex: 2 }}>
                        <motion.div
                            style={{
                                transformOrigin: "center center",
                                border: "2px solid white",
                                paddingInline: 10,
                                borderRadius: 15,
                                backgroundColor: "#FFFFFF80",
                            }}
                            animate={{ opacity: [0, 1, 0], height: ["30px", "70px", "30px"] }}
                            transition={{ duration: 5, ease: "easeInOut" }}
                            onAnimationComplete={() => handleAnimationComplete(1)} // Loop back to the first animation
                        >
                            <div className="flex flex-row items-center">
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
                                <div style={{ color: "#00000060", width: "120px" }}>Andrew Tate</div>
                                <div style={{ width: "150px" }}>Influencer</div>
                            </div>
                        </motion.div>
                    </Box>
                )}
            </Box>
        </div>
    );
};

export default BoxAnimationIndex1;
