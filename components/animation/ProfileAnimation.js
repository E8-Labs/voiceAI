'use client'
import React, { useState } from 'react'
import { Box } from '@mui/material';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';

const ProfileAnimation = () => {

    const [isOpen, setIsOpen] = useState(false);

    const handleClick = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div>
            <Box position="relative" display="inline-block">
                <button onClick={handleClick}>
                    <div style={{ border: "2px solid black", borderRadius: "50%", padding: 4 }}>
                        <Image src={"/assets/profile.png"} alt='profilephoto' height={40} width={40}
                            style={{ resize: "cover" }} />
                    </div>
                </button>

                <AnimatePresence>
                    {isOpen && (
                        <div>
                            {/* Username animation */}
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 10 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.3 }}
                                style={{
                                    position: 'absolute',
                                    top: '25%',
                                    left: '100%',
                                    // transform: 'translateY(-50%)',
                                    // marginLeft: '0px',
                                    whiteSpace: 'nowrap'
                                }}
                            >
                                <div style={{ fontSize: 15, fontWeight: "400" }}>
                                    Tate.AI
                                </div>
                            </motion.div>

                            {/* Social buttons animation */}
                            <motion.div
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 10 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.3 }}
                                style={{
                                    position: 'absolute',
                                    top: '100%',
                                    left: '25%',
                                    // transform: 'translateX(-50%)',
                                    // marginTop: '0px'
                                }}
                            >
                                <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
                                    <button>
                                        <Image src={"/assets/twitter.png"} alt='social' height={20} width={20} style={{ resize: "cover" }} />
                                    </button>
                                    <button>
                                        <Image src={"/assets/instagram.png"} alt='social' height={20} width={20} style={{ resize: "cover" }} />
                                    </button>
                                </Box>
                            </motion.div>
                        </div>
                    )}
                </AnimatePresence>
            </Box>
        </div>
    )
}

export default ProfileAnimation
