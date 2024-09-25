"use client"
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
import Apis from '../apis/Apis';
import axios from 'axios';
import { CircularProgress } from '@mui/material';
import { auth, RecaptchaVerifier, signInWithPhoneNumber, PhoneAuthProvider, signInWithCredential } from '../firebase.js';
import { useRouter } from 'next/navigation';

const VerifyPhoneNumber = ({
    handleBack, handleContinue, userLoginDetails, handleSignin,
    resendVerification, verificationId, currentIndex,
    signinVerificationNumber, fromSignInPage
}) => {
    const inputRefs = useRef([]);
    const router = useRouter();
    const [otp, setOtp] = useState(new Array(6).fill(""));
    const [verifyLoader, setVerifyLoader] = useState(false);
    const [showError, setShowError] = useState(null);
    const [isWideScreen, setIsWideScreen] = useState(false);
    const [verificationIdConfirm, setVerificationIdConfirm] = useState(verificationId);
    const [resendLoader, setResendLoader] = useState(false);

    useEffect(() => {
        // Check if screen width is wide enough
        const handleResize = () => setIsWideScreen(window.innerWidth >= 500);
        handleResize(); // Set initial state
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        // Set focus on the first input when the component mounts or `currentIndex` changes
        if (currentIndex === 2 || currentIndex === 1) {
            const timer = setTimeout(() => {
                inputRefs.current[0]?.focus();
            }, 300);
            return () => clearTimeout(timer);
        }
    }, [currentIndex]);

    useEffect(() => {
        console.log("User details are", userLoginDetails);
    }, [userLoginDetails]);

    const handleInputChange = (e, index) => {
        const value = e.target.value;
        // Handle multi-character input (pasting or auto-fill)
        if (value.length === 6) {
            const otpArray = value.split("").slice(0, 6);
            setOtp(otpArray);
            otpArray.forEach((digit, idx) => inputRefs.current[idx].value = digit);
        } else {
            const newOtp = [...otp];
            newOtp[index] = value.slice(-1); // Ensure only the last character is set
            setOtp(newOtp);
            if (value !== "" && index < 5) {
                inputRefs.current[index + 1].focus();
            }
        }
    };

    const handleBackspace = (e, index) => {
        if (e.key === 'Backspace') {
            const newOtp = [...otp];
            if (newOtp[index] === "") {
                if (index > 0) inputRefs.current[index - 1].focus();
            } else {
                newOtp[index] = "";
                setOtp(newOtp);
            }
        }
    };

    const sendOtp = async () => {
        setResendLoader(true);
        try {
            let phoneNumber = userLoginDetails?.phone || signinVerificationNumber;
            if (!phoneNumber) {
                console.log("Please enter a valid phone number");
                return;
            }
            const formattedPhoneNumber = `+${phoneNumber.replace(/\D/g, "")}`;
            const confirmation = await signInWithPhoneNumber(auth, formattedPhoneNumber, window.recaptchaVerifier);
            setVerificationIdConfirm(confirmation.verificationId);
            console.log("OTP sent successfully");
        } catch (error) {
            console.error("Error during OTP sending:", error);
        } finally {
            setResendLoader(false);
        }
    };

    const verifyOtp = async () => {
        setVerifyLoader(true);
        try {
            const OtpCode = otp.join("");
            if (!OtpCode || OtpCode.length !== 6) {
                setShowError("Please enter the 6-digit code");
                return;
            }

            const credential = PhoneAuthProvider.credential(verificationIdConfirm, OtpCode);
            await signInWithCredential(auth, credential);
            console.log("Phone number verified successfully");

            // Additional logic after OTP verification
            // Example: Updating user profile or continuing the flow

        } catch (error) {
            setShowError("Invalid OTP or verification failed");
            console.error("Error during OTP verification:", error);
        } finally {
            setVerifyLoader(false);
        }
    };

    const handleVerifyClick = () => verifyOtp();

    const handleBackClick = () => handleBack();

    const boxStyle = {
        height: isWideScreen ? "40px" : "30px",
        width: isWideScreen ? "40px" : "30px",
        borderRadius: 6,
        backgroundColor: "#EDEDEDC7",
        textAlign: "center",
        outline: "none",
        border: "none"
    };

    return (
        <div>
            <div id="recaptcha-container" />
            <div style={{ fontSize: 24, fontWeight: "600" }}>
                Verify Phone Number
            </div>
            <div className='text-lightWhite' style={{ fontSize: 13, fontWeight: "400" }}>
                6 digit code was sent to number ending with **** {signinVerificationNumber?.slice(-4)} {userLoginDetails?.phone.slice(-4)}
            </div>
            <div className='flex flex-row gap-2 sm:gap-4 mt-4'>
                {otp.map((digit, index) => (
                    <input
                        key={index}
                        id={`P${index + 1}`}
                        type='text'
                        inputMode="numeric"
                        pattern="[0-9]*"
                        ref={el => inputRefs.current[index] = el}
                        value={digit}
                        onChange={(e) => handleInputChange(e, index)}
                        onKeyDown={(e) => handleBackspace(e, index)}
                        style={boxStyle}
                        autoComplete="one-time-code"
                    />
                ))}
            </div>

            {showError && (
                <div className='mt-4' style={{ fontWeight: "600", fontSize: 14, color: "red" }}>
                    {showError}
                </div>
            )}

            <div className='flex flex-row justify-between items-center mt-8'>
                {!fromSignInPage && (
                    <button onClick={handleBackClick}>
                        <Image src={"/assets/backarrow.png"} alt='backArrow' height={9} width={13} />
                    </button>
                )}
                <div>
                    {verifyLoader ? (
                        <CircularProgress size={25} />
                    ) : (
                        <button onClick={handleVerifyClick} className='bg-purple px-8 text-white py-2' style={{ fontWeight: "400", fontSize: 15, borderRadius: "50px" }}>
                            Continue
                        </button>
                    )}
                </div>
            </div>

            <div className='flex flex-row gap-1 mt-6 items-center'>
                <div style={{ fontSize: 13, fontWeight: "400" }}>
                    Didn't receive a code?
                </div>
                {resendLoader ? (
                    <CircularProgress size={20} />
                ) : (
                    <button onClick={sendOtp} className='text-purple' style={{ fontSize: 13, fontWeight: "400" }}>
                        Resend
                    </button>
                )}
            </div>
        </div>
    );
};

export default VerifyPhoneNumber;
