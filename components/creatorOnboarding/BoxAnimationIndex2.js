'use client'
import React, { useState } from 'react';
import { Box } from "@mui/material";
import { motion } from "framer-motion";
import Image from 'next/image';

const BoxAnimationIndex2 = () => {
    const [currentAnimation, setCurrentAnimation] = useState(1);

    // Function to handle animation completion and transition to the next one
    const handleAnimationComplete = () => {
        setCurrentAnimation(prev => (prev % 4) + 1); // Cycles between 1 and 4
    };

    return (
        <div className='w-full'>
            <Box
                sx={{
                    position: "relative",
                    height: { xs: "500px", sm: "640px", md: "780px" }, // responsive height
                    width: { xs: "100%", sm: "640px", md: "780px" }, // responsive width
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    overflow: "hidden",
                    backgroundColor: "",
                    margin: "auto" // center box on smaller screens
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
                    <motion.div
                        style={{
                            position: "absolute",
                            top: "10%",
                            right: "15%",
                            zIndex: 2,
                            border: "2px solid white",
                            paddingInline: 10,
                            backgroundColor: "#FFFFFF80",
                            width: "33%"
                        }}
                        animate={{
                            opacity: [0, 1, 0], // Fade in, stay, and fade out
                            height: ["30px", "180px", "30px"],
                        }}
                        transition={{
                            duration: 3,
                            ease: "easeInOut",
                        }}
                        onAnimationComplete={handleAnimationComplete}
                    >
                        <Image
                            src="/assets/jay.png"
                            alt="Jay Shetty"
                            style={{
                                borderRadius: "50%",
                            }}
                            height={50}
                            width={50}
                        />
                        <div>Jay Shetty empowers his community by sharing profound wisdom and practical advice on building meaningful relationships</div>
                    </motion.div>
                )}

                {/* Second Animated Image MKBHD */}
                {currentAnimation === 2 && (
                    <motion.div
                        style={{
                            position: "absolute",
                            top: "20%",
                            right: "20%",
                            zIndex: 2,
                            border: "2px solid white",
                            paddingInline: 10,
                            backgroundColor: "#FFFFFF80",
                            width: "33%"
                        }}
                        animate={{
                            opacity: [0, 1, 0], // Fade in, stay, and fade out
                            height: ["30px", "170px", "30px"],
                        }}
                        transition={{
                            duration: 3,
                            ease: "easeInOut",
                        }}
                        onAnimationComplete={handleAnimationComplete}
                    >
                        <Image
                            src="/mkbhd.png"
                            alt="MKBHD"
                            style={{
                                borderRadius: "50%",
                            }}
                            height={30}
                            width={30}
                        />
                        <div>
                            MKBHD, also known as Marques Brownlee, revolutionizes the tech community with his in-depth reviews
                        </div>
                    </motion.div>
                )}

                {/* Third Animated Image Alex Hormozi */}
                {currentAnimation === 3 && (
                    <motion.div
                        style={{
                            position: "absolute",
                            bottom: "20%",
                            right: "20%",
                            zIndex: 2,
                            border: "2px solid white",
                            paddingInline: 10,
                            backgroundColor: "#FFFFFF80",
                            width: "33%"
                        }}
                        animate={{
                            opacity: [0, 1, 0], // Fade in, stay, and fade out
                            height: ["30px", "180px", "30px"],
                        }}
                        transition={{
                            duration: 3,
                            ease: "easeInOut",
                        }}
                        onAnimationComplete={handleAnimationComplete}
                    >
                        <Image
                            src="/alex.png"
                            alt="Alex Hormozi"
                            style={{
                                borderRadius: "50%",
                            }}
                            height={30}
                            width={30}
                        />
                        <div>tortor, in convallis felis. Cras auctor turpis non metus facilisis, ut aliquam quam tristique. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</div>
                    </motion.div>
                )}

                {/* Fourth Animated Image */}
                {currentAnimation === 4 && (
                    <motion.div
                        style={{
                            position: "absolute",
                            bottom: "30%",
                            left: "10%",
                            zIndex: 2,
                            border: "2px solid white",
                            paddingInline: 10,
                            backgroundColor: "#FFFFFF80",
                            width: "33%"
                        }}
                        animate={{
                            opacity: [0, 1, 0], // Fade in, stay, and fade out
                            height: ["30px", "140px", "30px"],
                        }}
                        transition={{
                            duration: 3,
                            ease: "easeInOut",
                        }}
                        onAnimationComplete={handleAnimationComplete}
                    >
                        <Image
                            src="/andrew.png"
                            alt="Andrew"
                            style={{
                                borderRadius: "50%",
                            }}
                            height={30}
                            width={30}
                        />
                        <div>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse a nibh ut purus feugiat euismod. Duis ac pellent</div>
                    </motion.div>
                )}
            </Box>
        </div>
    );
};

export default BoxAnimationIndex2;
