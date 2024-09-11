"use client"
import { useState, useCallback, useEffect, useRef } from 'react';  // useRef added
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';


const CycleArray = ({ data, assistantData }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        if (data.length === 0) return;

        const intervalDuration = 15000;
        const interval = setInterval(() => {
            setCurrentIndex(prevIndex => (prevIndex + 1) % data.length);
        }, intervalDuration);

        return () => clearInterval(interval);
    }, [data]);

    const variants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -50 },
    };

    return (
        <motion.div
            key={currentIndex}
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={variants}
            transition={{ duration: 0.5, }}
        >
            <div className='flex flex-row gap-2'
                style={{
                    backgroundColor: "#ffffff40",
                    padding: 10,
                    borderRadius: 20,
                    // paddingTop: 20,
                    width: "250px",
                    border: "2px solid white"
                }}>
                <div>
                    {/* {
                        data[currentIndex] && data[currentIndex].caller && data[currentIndex].caller.profile_image ?
                            <Image src={data[currentIndex].caller.profile_image} alt='live' height={31} width={31} style={{ borderRadius: "50%" }} /> :
                            <Image src="/assets/placeholderImg.jpg" alt='12' height={40} width={40} style={{ borderRadius: "50%" }} />
                    } */}
                    {
                        assistantData && assistantData.profile_image ?
                            <Image src={assistantData.profile_image} alt='live' height={31} width={31} style={{ borderRadius: "50%" }} /> :
                            <Image src="/assets/placeholderImg.jpg" alt='12' height={40} width={40} style={{ borderRadius: "50%" }} />
                    }
                </div>
                <div>
                    <div className='flex flex-row gap-1'>
                        <Image src="/assets/callLogo.png" alt='logo' height={10} width={13} />
                        <div style={{ fontSize: 13, fontWeight: "400", color: "#00000047" }}>
                            Live Call
                        </div>
                    </div>
                    <div className='flex flex-row items-center gap-1' style={{ fontWeight: "400", fontSize: 15, color: "#00000050" }}>
                        <div style={{ fontWeight: "300", fontSize: 15 }}>
                            {
                                data[currentIndex] &&
                                data[currentIndex].message.charAt(0).toUpperCase() + data[currentIndex].message.slice(1)
                            }
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default CycleArray;