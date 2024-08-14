'use client'
import { AnimatePresence, motion } from 'framer-motion';
import React, { useState } from 'react'
import CreateAccount from './CreateAccount';
import VerifyPhoneNumber from './VerifyPhoneNumber';
import AddCard from './Addcard/AddCard';

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

const LoginModal = () => {

    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState(0);
    const [userLoginDetails, setUserLoginDetails] = useState(null);

    const handleContinue = (details) => {
        // handleCurrentIndex();
        setDirection(1);
        setCurrentIndex((prevIndex) => prevIndex + 1);
        setUserLoginDetails(details);
    };

    // const handleContinueT = (details) => {
    //     // handleCurrentIndex();
    //     setDirection(1);
    //     setCurrentIndex((prevIndex) => prevIndex + 1);
    //     setUserLoginDetails(details);
    // };

    const handleBack = () => {
        setDirection(-1);
        setCurrentIndex((prevIndex) => prevIndex - 1);
    };

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
        backgroundColor: "white",
        // height: "20vh",
        // marginLeft: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginInline: 10,
        border: "2px solid red",
    };

    return (
        // <div>
        //     <div className='' style={{ fontWeight: "600", fontSize: 24 }} >
        //         Create Account
        //     </div>
        //     <div></div>
        // </div>
        <div style={containerStyles}>
            <AnimatePresence initial={false} custom={direction}>
                {currentIndex === 0 && (
                    <div className='flex flex-col h- justify-center' style={{ height: "", }}>
                        <motion.div
                            key="box1"
                            custom={direction}
                            variants={boxVariants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{ duration: 1 }}
                            style={styles} className='px-3 py-5'
                        >
                            <div className='w-full'>
                                <CreateAccount handleContinue={handleContinue} />
                            </div>
                        </motion.div>
                    </div>
                )}

                {currentIndex === 1 && (
                    <div className='flex flex-col h- justify-center' style={{ height: "", }}>
                        <motion.div
                            className='px-3 py-5'
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
                                <VerifyPhoneNumber handleContinue={handleContinue} userLoginDetails={userLoginDetails} handleBack={handleBack} />
                            </div>
                        </motion.div>
                    </div>
                )}

                {currentIndex === 2 && (
                    <div className='flex flex-col h- justify-center' style={{ height: "", }}>
                        <motion.div
                            className='px-3 py-5'
                            key="box3"
                            custom={direction}
                            variants={boxVariants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{ duration: 1 }}
                            style={styles}
                        >
                            <div className='w-full'>
                                <AddCard handleBack={handleBack} />
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    )
}

export default LoginModal