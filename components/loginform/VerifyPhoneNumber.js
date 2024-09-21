"use client"
import Image from 'next/image'
import React, { useEffect, useRef, useState } from 'react'
import Apis from '../apis/Apis'
import axios from 'axios'
import { CircularProgress } from '@mui/material'
import { auth, RecaptchaVerifier, signInWithPhoneNumber, PhoneAuthProvider, signInWithCredential } from '../firebase.js';

const VerifyPhoneNumber = ({ handleBack, handleContinue, userLoginDetails, handleSignin, verificationId, currentIndex }) => {


    const inputFocusRef = useRef(null);
    const [P1, setP1] = useState("")
    const [P2, setP2] = useState("")
    const [P3, setP3] = useState("")
    const [P4, setP4] = useState("")
    const [P5, setP5] = useState("")
    const [P6, setP6] = useState("")
    const [verifyLoader, setVerifyLoader] = useState(false);
    const [showError, setShowError] = useState(null)
    const [isWideScreen, setIsWideScreen] = useState(false);

    const data = {
        code: P1 + P2 + P3 + P4 + P5 + P6,
        phone: userLoginDetails.phone,
    }

    useEffect(() => {
        const handleResize = () => {
            // Check if width is greater than or equal to 1024px
            setIsWideScreen(window.innerWidth >= 500);

            // Log the updated state values for debugging (Optional)
            console.log("isWideScreen: ", window.innerWidth >= 500);
        };

        handleResize(); // Set initial state
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        // inputFocusRef.current.focus();
        if (currentIndex === 2 && inputFocusRef.current) {
            // Using a small timeout to ensure rendering of the input after animation
            setTimeout(() => {
                inputFocusRef.current.focus();
            }, 300); // Adjust this delay according to the animation timing
        }
    }, []);

    useEffect(() => {
        console.log("User details are", userLoginDetails);
    }, [])


    //code for moving to next field
    const handleInputChange = (e, setFunc, nextInputId) => {
        const value = e.target.value;
        if (value.length === 1) {
            setFunc(value); // Update the current field
            if (nextInputId) {
                document.getElementById(nextInputId).focus(); // Move to the next field
            }
        }
    };

    const handleBackspace = (e, setFunc, prevInputId) => {
        if (e.key === 'Backspace') {
            setFunc(''); // Clear the current field
            if (e.target.value === '' && prevInputId) {
                document.getElementById(prevInputId).focus(); // Move to the previous field
            }
        }
    };


    const verifyOtp = async () => {
        setVerifyLoader(true);
        const mergedData = {
            ...data,
            ...userLoginDetails,
        };
        console.log("Merged data is:", mergedData);
        try {
            if (!auth) {
                console.log("Auth not initialized");
                return;
            }

            console.log("Otp sending in firebase", P1 + P2 + P3 + P4 + P5 + P6);
            let OtpCode = P1 + P2 + P3 + P4 + P5 + P6
            console.log("Otp code sending in firebase", OtpCode);
            console.log("Verification id :", verificationId)

            // const credential = auth.PhoneAuthProvider.credential(verificationId, OtpCode);
            // await auth.signInWithCredential(credential);

            const credential = PhoneAuthProvider.credential(verificationId, OtpCode);
            await signInWithCredential(auth, credential);
            console.log("Phone number verified successfully");

            // return
            try {
                const response = await axios.post(Apis.verifyCode, mergedData, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                if (response) {
                    console.log("response of check code ", response.data);
                    if (response.data.status === true) {
                        console.log("Response of signup", response.data);
                        localStorage.setItem("User", JSON.stringify(response.data));
                        // return
                        handleContinue();
                        localStorage.removeItem('formData');
                    } else {
                        setShowError(response.data.message);
                    }
                }
            } catch (error) {
                console.log("Error uccured in verification api is", error);
            } finally {
                setVerifyLoader(false);
            }

        } catch (error) {
            console.error("Error during OTP verification:", error);
        } finally {
            setVerifyLoader(false);
        }
    };

    const handleVerifyClick = async () => {
        // handleContinue();
        // console.log("Code sending is", data);
        // console.log("Login details are", userLoginDetails);

        verifyOtp();
        // return
        // try {
        //     const response = await axios.post(Apis.verifyCode, mergedData, {
        //         headers: {
        //             'Content-Type': 'application/json'
        //         }
        //     });
        //     if (response) {
        //         console.log("response of check code ", response.data);
        //         if (response.data.status === true) {
        //             console.log("Response of signup", response.data);
        //             localStorage.setItem("User", JSON.stringify(response.data));
        //             // return
        //             handleContinue();
        //             localStorage.removeItem('formData');
        //         } else {
        //             setShowError(response.data.message);
        //         }
        //     }
        // } catch (error) {
        //     console.log("Error uccured in verification api is", error);
        // } finally {
        //     setVerifyLoader(false);
        // }
    }

    const handleBackClick = () => {
        handleBack()
    }

    const boxStyle = {
        height: isWideScreen ? "40px" : "30px", width: isWideScreen ? "40px" : "30px", borderRadius: 6,
        backgroundColor: "#EDEDEDC7", textAlign: "center", outline: "none", border: "none"
    }


    return (
        <div>
            <div style={{ fontSize: 24, fontWeight: "600" }}>
                Verify Phone Number
            </div>
            <div className='text-lightWhite' style={{ fontSize: 13, fontWeight: "400" }}>
                6 digit code was sent to number ending with ***{userLoginDetails.phone.slice(-4)}
            </div>



            <div className='flex flex-row gap-2 sm:gap-4 mt-4'>
                <input
                    id="P1"
                    type='text'
                    ref={inputFocusRef}
                    inputMode="numeric"
                    pattern="[0-9]*"
                    value={P1}
                    onChange={(e) => handleInputChange(e, setP1, "P2")}
                    maxLength={1}
                    style={boxStyle}
                    onKeyDown={(e) => handleBackspace(e, setP1, null)}
                />
                <input
                    id="P2"
                    type='text'
                    value={P2}
                    inputMode="numeric"
                    pattern="[0-9]*"
                    onChange={(e) => handleInputChange(e, setP2, "P3")}
                    maxLength={1}
                    style={boxStyle}
                    onKeyDown={(e) => handleBackspace(e, setP2, "P1")}
                />
                <input
                    id="P3"
                    type='text'
                    value={P3}
                    inputMode="numeric"
                    pattern="[0-9]*"
                    onChange={(e) => handleInputChange(e, setP3, "P4")}
                    maxLength={1}
                    style={boxStyle}
                    onKeyDown={(e) => handleBackspace(e, setP3, "P2")}
                />
                <input
                    id="P4"
                    type='text'
                    value={P4}
                    inputMode="numeric"
                    pattern="[0-9]*"
                    onChange={(e) => handleInputChange(e, setP4, "P5")}
                    maxLength={1}
                    style={boxStyle}
                    onKeyDown={(e) => handleBackspace(e, setP4, "P3")}
                />
                <input
                    id="P5"
                    type='text'
                    value={P5}
                    inputMode="numeric"
                    pattern="[0-9]*"
                    onChange={(e) => handleInputChange(e, setP5, "P6")}
                    maxLength={1}
                    style={boxStyle}
                    onKeyDown={(e) => {
                        handleBackspace(e, setP5, "P4");
                        // if (e.key === 'Enter') {
                        //     handleVerifyClick();
                        // }
                    }}
                />
                <input
                    id="P6"
                    type='text'
                    value={P6}
                    inputMode="numeric"
                    pattern="[0-9]*"
                    onChange={(e) => handleInputChange(e, setP6, null)}
                    maxLength={1}
                    style={boxStyle}
                    onKeyDown={(e) => {
                        handleBackspace(e, setP6, "P5");
                        if (e.key === 'Enter') {
                            handleVerifyClick();
                        }
                    }}
                />
            </div>


            <div>
                {
                    showError &&
                    <div className='mt-4' style={{ fontWeight: "600", fontSize: 14, color: "red" }}>
                        {showError}
                    </div>
                }
            </div>



            <div className='flex flex-row justify-between items-center mt-8'>
                <div>
                    <button onClick={handleBackClick}>
                        <Image src={"/assets/backarrow.png"} alt='backArrow' height={9} width={13} />
                    </button>
                </div>
                <div>
                    <button onClick={handleVerifyClick} className='bg-purple px-8 text-white py-2' style={{ fontWeight: "400", fontSize: 15, borderRadius: "50px" }}>
                        {
                            verifyLoader ?
                                <CircularProgress size={25} /> :
                                "Continue"
                        }
                    </button>
                </div>
            </div>
            <div className='flex flex-row gap-1 mt-6'>
                <div style={{ fontSize: 13, fontWeight: "400" }}>
                    Have an account?
                </div>
                <button onClick={() => handleSignin()} className='text-purple' style={{ fontSize: 13, fontWeight: "400" }}>
                    Sign in
                </button>
            </div>
        </div>
    )
}

export default VerifyPhoneNumber