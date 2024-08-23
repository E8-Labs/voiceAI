'use client'
import { Button, CircularProgress, IconButton, InputAdornment, TextField, Visibility, VisibilityOff } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useState } from "react";
import PhoneNumberInput from '../PhoneNumberInput';
import Apis from '../apis/Apis';
import axios from 'axios';

const boxVariants = {
    enter: (direction) => ({
        x: direction > 0 ? '100%' : '-100%',
        opacity: 0.4,
    }),
    center: {
        x: 0,
        opacity: 1,
    },
    exit: (direction) => ({
        x: direction < 0 ? '100%' : '-100%',
        opacity: 0.4,
    }),
};

export default function ScriptAiAnimation({ onChangeIndex }) {

    const [currentIndex, setCurrentIndex] = useState(1);
    const [direction, setDirection] = useState(1);


    const containerStyles = {
        position: 'relative',
        // height: '40vh',
        // width: '50vw',
        overflow: 'hidden',
    };

    const styles = {
        // position: 'absolute', // Ensures the boxes are stacked on top of each other
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        // backgroundColor: "red",
        height: "20vh",
        // marginLeft: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginInline: 10
    };

    return (
        <div style={containerStyles}>
            <AnimatePresence initial={false} custom={direction}>
                {currentIndex === 0 && (
                    <div className='flex flex-col h-screen justify-center' style={{ height: "", }}>
                        <motion.div
                            key="box1"
                            custom={direction}
                            variants={boxVariants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{ duration: 1 }}
                            style={styles}
                        >
                            <div className='w-full'>
                            </div>
                        </motion.div>
                    </div>
                )}
                {currentIndex === 1 && (
                    <div className='flex flex-col h-screen justify-center' style={{ height: "", }}>
                        <motion.div
                            key="box2"
                            custom={direction}
                            variants={boxVariants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{ duration: 1 }}
                            style={styles}
                        >
                            <div className='w-full'>
                            </div>
                        </motion.div>
                    </div>
                )}
                {currentIndex === 2 && (
                    <div className='flex flex-col h-screen justify-center' style={{ height: "", }}>
                        <motion.div
                            key="box3"
                            custom={direction}
                            variants={boxVariants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{ duration: 1 }}
                            style={styles}>
                            <div className='w-full'>
                            </div>
                        </motion.div>
                    </div>
                )}
                {currentIndex === 3 && (
                    <div className='flex flex-col h-screen justify-center' style={{ height: "", }}>
                        <motion.div
                            key="box4"
                            custom={direction}
                            variants={boxVariants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{ duration: 1 }}
                            style={styles}>
                            <div className='w-full'>
                            </div>
                        </motion.div>
                    </div>
                )}
                {currentIndex === 4 && (
                    <div className='flex flex-col h-screen justify-center' style={{ height: "", }}>
                        <motion.div
                            key="box5"
                            custom={direction}
                            variants={boxVariants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{ duration: 1 }}
                            style={styles}>
                            <div className='w-full'>
                            </div>
                        </motion.div>
                    </div>
                )}
                {
                    currentIndex === 5 && (
                        <div className='flex h-screen flex-col justify-center' style={{ height: "", }}>
                            <motion.div
                                key="box6"
                                custom={direction}
                                variants={boxVariants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                transition={{ duration: 1 }}
                                style={styles}>
                                <div className='w-full'>
                                </div>
                            </motion.div>
                        </div>
                    )
                }
                {currentIndex === 6 && (
                    <div className='flex flex-col justify-center h-screen' style={{ height: "", }}>
                        <motion.div
                            key="box7"
                            custom={direction}
                            variants={boxVariants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{ duration: 1 }}
                            style={styles}>
                            <div style={{ height: "auto", border: "2px solid green" }}>
                                <div style={{ height: 14 }}>
                                    <button onClick={handleBack}>
                                        <Image src={'/assets/backarrow.png'} alt='back' height={14} width={16} />
                                    </button>
                                </div>
                                {/* <Image src={'/assets/congratulations.png'} alt='congrats' height={445} width={445} /> */}
                                <div style={{ fontSize: 24, fontWeight: "600", textAlign: ' center' }}>
                                    Congratulations
                                </div>
                                <Image
                                    src={'/assets/applogo.png'}
                                    alt='congrats'
                                    height={550}
                                    width={445}
                                    layout="responsive"
                                    objectFit="contain"
                                // style={{
                                //     aspectRatio: '3 / 2',
                                //     maxWidth: '100%',
                                //     height: 'auto'
                                // }}
                                />
                                <div className='flex flex-row mt-6 justify-center w-full gap-1'>
                                    <button style={{ fontSize: 11, fontWeight: "400" }}>
                                        Privacy policy -
                                    </button>
                                    <button style={{ fontSize: 11, fontWeight: "400" }}>
                                        Terms & Condition -
                                    </button>
                                    <button style={{ fontSize: 11, fontWeight: "400" }}>
                                        Cookie Policy
                                    </button>
                                </div>

                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
