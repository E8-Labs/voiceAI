"use client"
import { useState, useCallback, useEffect, useRef } from 'react';  // useRef added
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';


const CycleArray = ({ data, assistantData, onLargeScreen }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [shuffled, setShuffled] = useState([])

    useEffect(() => {
        if (data.length === 0) { return };
        let shuffled = shuffleArray(data);
        setShuffled(shuffled)
        console.log("Setting shuffled array")

    }, [data]);


    useEffect(() => {
        if (shuffled.length == 0) { return }
        const intervalDuration = 10000;
        const interval = setInterval(() => {
            // let index = Math.floor(Math.random() * shuffled.length);
            // console.log("Random Index is ", index)


            setCurrentIndex(prevIndex => (prevIndex + 1) % shuffled.length);


        }, intervalDuration);
        console.log("Set Shuffled array", shuffled.length)
        return () => clearInterval(interval);
    }, [shuffled])

    useEffect(() => {
        // console.log('CurrentIndex', currentIndex)
        if (currentIndex >= shuffled.length - 1) {
            console.log("Reshuffling ", currentIndex)
            let sh = shuffleArray(shuffled)
            setShuffled(sh)
            setCurrentIndex(0)
        }
    }, [currentIndex])

    const variants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -50 },
    };

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            // Generate a random index between 0 and i
            const j = Math.floor(Math.random() * (i + 1));
            // Swap elements at index i and j
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    return (
        <div>
            {
                shuffled[currentIndex] &&
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
                            padding: 4,
                            borderRadius: 10,
                            paddingTop: 10,
                            width: "auto",
                            border: "2px solid #ffffff40"
                        }}>
                        <div>
                            {
                                shuffled[currentIndex] && shuffled[currentIndex].caller && shuffled[currentIndex].caller.profile_image ?
                                    <Image src={shuffled[currentIndex].caller.profile_image} alt='live' height={31} width={31} style={{ borderRadius: "50%" }} /> :
                                    <Image src="/assets/placeholderImg.jpg" alt='12' height={40} width={40} style={{ borderRadius: "50%" }} />
                            }
                            {/* {
                        assistantData && assistantData.profile_image ?
                            <Image src={assistantData.profile_image} alt='live' height={31} width={31} style={{ borderRadius: "50%" }} /> :
                            <Image src="/assets/placeholderImg.jpg" alt='12' height={40} width={40} style={{ borderRadius: "50%" }} />
                    } */}
                        </div>
                        {
                            onLargeScreen ?
                                <div className='w-full'>
                                    <div className='flex flex-row w-full gap-1'>
                                        <div className='flex flex-row'>
                                            {/* <Image src="/assets/callLogo.png" alt='logo' height={10} width={13} /> */}
                                            <div style={{ fontSize: 13, fontWeight: "600", color: "#00000090" }}>
                                                Live Call with
                                            </div>
                                        </div>
                                        <div style={{ fontWeight: "600", fontSize: 13, color: "#00000090" }}>
                                            {/*
                                                data[currentIndex] &&
                                                data[currentIndex].message.charAt(0).toUpperCase() + data[currentIndex].message.slice(1)
                                            */}
                                            {/*
                                                data[currentIndex] &&
                                                (data[currentIndex].caller.name.length > 10
                                                    ? data[currentIndex].caller.name.charAt(0).toUpperCase() + data[currentIndex].caller.name.slice(1, 10) + '...'
                                                    : data[currentIndex].caller.name.charAt(0).toUpperCase() + data[currentIndex].caller.name.slice(1)
                                                )
                                            */}
                                            {
                                                shuffled[currentIndex] &&
                                                (() => {
                                                    const name = shuffled[currentIndex].caller.name.split(' ')[0]; // Get the first part before the space
                                                    return name.length > 10
                                                        ? name.charAt(0).toUpperCase() + name.slice(1, 10) + '...'
                                                        : name.charAt(0).toUpperCase() + name.slice(1);
                                                })()
                                            }
                                        </div>
                                    </div>
                                    <div className='flex flex-row items-center gap-1' style={{ fontWeight: "400", fontSize: 15, color: "" }}>
                                        <div>
                                            {
                                                shuffled[currentIndex] && shuffled[currentIndex].caller.city && (
                                                    <div style={{ fontSize: 13, fontWeight: "400", color: "grey" }}>
                                                        {
                                                            shuffled[currentIndex] &&
                                                            shuffled[currentIndex].caller.city
                                                        }, {
                                                            shuffled[currentIndex] &&
                                                            shuffled[currentIndex].caller.state
                                                        }
                                                    </div>
                                                )
                                            }

                                        </div>
                                    </div>
                                </div> :
                                <div className='w-full'>
                                    <div className='flex flex-row w-full gap-1'>
                                        <div className='flex flex-row'>
                                            {/* <Image src="/assets/callLogo.png" alt='logo' height={10} width={13} /> */}
                                            <div style={{ fontSize: 13, fontWeight: "600", color: "#00000090" }}>
                                                Live Call with
                                            </div>
                                        </div>
                                        <div style={{ fontWeight: "600", fontSize: 13, color: "#00000090" }}>
                                            {
                                                shuffled[currentIndex] &&
                                                (() => {
                                                    const name = shuffled[currentIndex].caller.name.split(' ')[0]; // Get the first part before the space
                                                    return name.length > 10
                                                        ? name.charAt(0).toUpperCase() + name.slice(1, 10) + '...'
                                                        : name.charAt(0).toUpperCase() + name.slice(1);
                                                })()
                                            }
                                        </div>
                                    </div>
                                    <div className='flex flex-row items-center gap-1' style={{ fontWeight: "400", fontSize: 15, color: "" }}>
                                        <div>
                                            {
                                                shuffled[currentIndex] && shuffled[currentIndex].caller.city && (
                                                    <div style={{ fontSize: 13, fontWeight: "400", color: "grey" }}>
                                                        {
                                                            shuffled[currentIndex] &&
                                                            shuffled[currentIndex].caller.city
                                                        }, {
                                                            shuffled[currentIndex] &&
                                                            shuffled[currentIndex].caller.state
                                                        }
                                                    </div>
                                                )
                                            }

                                        </div>
                                    </div>
                                </div>
                        }
                    </div>
                </motion.div>
            }
        </div>
    );
};

export default CycleArray;