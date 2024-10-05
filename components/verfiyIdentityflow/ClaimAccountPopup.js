import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import React from 'react';
import { useState, useEffect } from 'react';
import LicenseFrontSide from './LicenseFrontSide';
import LicenseBackSide from './LicenseBackSide';

const ClaimAccountPopup = ({ getAssistantData, handleClosePopup }) => {


    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState(0);

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

    const styles = {
        // position: 'absolute', // Ensures the boxes are stacked on top of each other
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "white",
        // height: "20vh",
        // marginLeft: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5
        // marginInline: 10,
        // border: "2px solid red",
    };

    const handleContinue = (details) => {
        // handleCurrentIndex();
        setDirection(1);
        setCurrentIndex((prevIndex) => prevIndex + 1);
        // setUserLoginDetails(details);
    };

    const handleBack = (details) => {
        // handleCurrentIndex();
        setDirection(1);
        setCurrentIndex((prevIndex) => prevIndex - 1);
        // setUserLoginDetails(details);
    };


    //styles for input fields
    const InputContiner = {
        borderRadius: 7,
        backgroundColor: '#EDEDED78',
        padding: 13,
        fontSize: 14,
        fontWeight: '400',
        fontFamily: 'inter',
        marginTop: 25
    }


    return (
        <div>


            <AnimatePresence initial={false} custom={direction}>

                {currentIndex === 0 && (
                    <div className='flex flex-col w-full h- justify-center' //style={shdowBorder}
                    >
                        <motion.div
                            key="box1"
                            custom={direction}
                            variants={boxVariants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{ duration: 0 }}
                            style={styles} className='px-3 py-5'
                        >
                            <div className='w-full'>
                                <div className='mt-2 flex flex-row justify-between items-center'>
                                    <Image src="/assets/claimIcon.png" alt='claimimg' height={38} width={38} />
                                    <button onClick={(() => handleClosePopup(false))}
                                    >
                                        <Image src="/assets/crossBtn.png" alt='cross' height={14} width={14} />
                                    </button>
                                </div>
                                <div className='mt-8' style={{ fontWeight: '600', fontSize: 24, fontFamily: 'inter' }}>
                                    Claim Account
                                </div>
                                <div className='text-black' style={{ fontWeight: "400", fontSize: 15, fontFamily: "inter", marginTop: 10 }}>
                                    This account hasn't been claimed by its creator. In order to claim this creator, you must be the real creator and verify your identity.
                                </div>
                                <div className='flex flex-row mt-4'>
                                    <div style={{ fontSize: 12, color: "#000000", fontWeight: "400", fontFamily: "inter" }}>
                                        Calls:
                                    </div>
                                    <div className='' style={{ fontWeight: "300", fontFamily: "inter", fontSize: 12 }}>
                                        {
                                            getAssistantData &&
                                            <div>
                                                {getAssistantData.calls ?
                                                    <div className='ms-1' style={{ fontWeight: "600", fontFamily: "inter", fontSize: 12 }}>
                                                        {getAssistantData.calls}
                                                    </div> :
                                                    <div className='ms-1' style={{ fontWeight: "600", fontFamily: "inter", fontSize: 12 }}>
                                                        0
                                                    </div>
                                                }
                                            </div>
                                        }
                                    </div>
                                    <div className='ms-2' style={{ fontSize: 12, color: "#000000", fontWeight: "400", fontFamily: "inter" }}>
                                        Earned:
                                    </div>
                                    <div className='' style={{ fontWeight: "300", fontFamily: "inter", fontSize: 13 }}>
                                        {
                                            getAssistantData &&
                                            <div>
                                                {getAssistantData.earned ?
                                                    <div className='ms-1' style={{ fontWeight: "600", fontFamily: "inter", fontSize: 12 }}>
                                                        ${Number(getAssistantData.earned).toFixed(2)}
                                                    </div> :
                                                    <div className='ms-1' style={{ fontWeight: "600", fontFamily: "inter", fontSize: 12 }}>
                                                        $ 0
                                                    </div>
                                                }
                                            </div>
                                        }
                                    </div>
                                </div>
                                <div className='flex flex-row justify-start mt-4 w-full' style={{ marginTop: 30 }}>
                                    <div>
                                        <button
                                            onClick={handleContinue}
                                            // onClick={() => {
                                            //     window.open("https://www.youtube.com", '_blank')
                                            // }} 
                                            className='bg-purple px-6 py-2 text-white'
                                            style={{ fontWeight: "400", fontFamily: "inter", fontSize: 15, borderRadius: "50px" }}>
                                            Verify Identity
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
                {currentIndex === 1 && (
                    <div className='flex flex-col w-full  justify-center'  //xl:w-9/12 2xl:w-8/12 md:w-9/12
                    >
                        <motion.div
                            key="box2"
                            custom={direction}
                            variants={boxVariants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{ duration: 0 }}
                            style={styles}
                            className='p-6'
                        >
                            <div className='w-full'>
                                <div style={{ fontWeight: '700', fontSize: 24, fontFamily: 'inter' }}>
                                    Verify Identity
                                </div>
                                <div style={{ ...InputContiner, marginTop: 40 }}>
                                    <input className='bg-transparent w-full outline-none border-none' placeholder='Full Name' />
                                </div>
                                <div style={InputContiner}>
                                    <input className='bg-transparent w-full outline-none border-none' placeholder='Email Address' />
                                </div>
                                <div style={InputContiner}>
                                    <input className='bg-transparent w-full outline-none border-none' placeholder='Phone Number' />
                                </div>
                                <div className='w-full mt-8'>
                                    <button className='w-full bg-purple'
                                        onClick={handleContinue}
                                        style={{
                                            borderRadius: '50px',
                                            height: '45px', fontSize: 15, fontWeight: '500', fontFamily: 'inter', color: 'white'
                                        }}>
                                        Continue
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}

                {currentIndex === 2 && (
                    <div className='flex flex-col w-full justify-center'>
                        <motion.div
                            className='px-3 py-5'
                            key="box3"
                            custom={direction}
                            variants={boxVariants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{ duration: 0 }}
                            style={styles}
                        >
                            <div className='w-full'>
                                <LicenseFrontSide handleContinue={handleContinue} handleBack={handleBack} />
                            </div>
                        </motion.div>
                    </div>
                )}

                {currentIndex === 3 && (
                    <div className='flex flex-col w-full justify-center'>
                        <motion.div
                            className='px-3 py-5'
                            key="box4"
                            custom={direction}
                            variants={boxVariants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{ duration: 0 }}
                            style={styles}
                        >
                            <div className='w-full'>
                                <LicenseBackSide handleContinue={handleContinue} handleBack={handleBack} />
                            </div>
                        </motion.div>
                    </div>
                )}

            </AnimatePresence>


        </div>
    )
}

export default ClaimAccountPopup