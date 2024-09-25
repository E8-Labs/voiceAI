"use client"
import Image from 'next/image'
import React, { useEffect, useRef, useState } from 'react'
import Apis from '../apis/Apis'
import axios from 'axios'
import { CircularProgress } from '@mui/material'
import { auth, RecaptchaVerifier, signInWithPhoneNumber, PhoneAuthProvider, signInWithCredential } from '../firebase.js';
import { useRouter } from 'next/navigation'

const VerifyPhoneNumber = ({ handleBack, handleContinue, userLoginDetails, handleSignin,
    resendVerification, verificationId, currentIndex,
    signinVerificationNumber, fromSignInPage, }) => {

    const inputRefs = useRef([]);
    const router = useRouter();
    const [otp, setOtp] = useState(new Array(6).fill(""));
    const [verifyLoader, setVerifyLoader] = useState(false);
    const [showError, setShowError] = useState(null);
    const [isWideScreen, setIsWideScreen] = useState(false);
    const [verificationIdConfirm, setVerificationIdConfirm] = useState(verificationId);
    const [resendLoader, setResendLoader] = useState(false);

    const colors = ["red", "green", "blue", "yellow", "orange", "pink"]
    const data = {
        code: otp.join(""),
        phone: userLoginDetails?.phone,
    };

    useEffect(() => {
        const handleResize = () => {
            setIsWideScreen(window.innerWidth >= 500);
        };

        handleResize(); // Set initial state
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    // useEffect(() => {
    //     if (!auth) {
    //         return;
    //     }
    //     window.recaptchaVerifier = new RecaptchaVerifier(
    //         auth,
    //         "recaptcha-container",
    //         {
    //             size: "invisible",
    //             callback: (response) => { },
    //             "expired-callback": () => { },
    //         }
    //     );
    //     return () => {
    //         window.recaptchaVerifier.clear();
    //     };
    // }, [auth]);

    useEffect(() => {
        if (currentIndex === 2 && inputRefs.current[0]) {
            // const timer = setTimeout(() => {
            //     inputRefs.current[0].focus();
            // }, 2000);

            // return () => clearTimeout(timer);
            inputRefs.current[0].focus();
        } else if (currentIndex === 1 && inputRefs.current[0]) {
            console.log("Trying to focus Phone Veri")
            const timer = setTimeout(() => {
                console.log("Input ref Login ", inputRefs.current[0])
                inputRefs.current[0].focus();
            }, 300);
            // inputRefs.current[0].focus();

            // return () => clearTimeout(timer);
        }
    }, [currentIndex]);

    useEffect(() => {
        console.log("User details are", userLoginDetails);
    }, [userLoginDetails]);

    const handleInputChange = (e, index) => {
        const value = e.target.value;
        console.log("On handle input ", e.target.value)
        // if (value.length >= 6) {
        //     return;
        // }

        if (value.length == 6) {
            // Handle multi-character input (i.e., paste or autofill)
            const otpArray = value.split("").slice(0, 6);
            setOtp(otpArray);
            otpArray.forEach((digit, idx) => {
                inputRefs.current[idx].value = digit;
            });
            if (otpArray.length < 6) {
                inputRefs.current[otpArray.length].focus();
            }
        }
        else if (value.length > 1) {
            const otpArray = value.split("").slice(0, value.length);
            inputRefs.current[index].value = otpArray[0]
        }
        else {
            const newOtp = [...otp];
            newOtp[index] = value;
            setOtp(newOtp);
            if (value !== "" && index < 5) {
                inputRefs.current[index + 1].focus();
            }
        }
    };

    const handleBackspace = (e, index) => {
        if (e.key === 'Backspace') {
            if (otp[index] === "" && index > 0) {
                inputRefs.current[index - 1].focus();
            }
            const newOtp = [...otp];
            newOtp[index] = "";
            setOtp(newOtp);
        }
    };

    const sendOtp = async () => {
        try {
            setResendLoader(true);
            if (!userLoginDetails.phone) {
                console.log("Please enter a valid phone number");
                return;
            }

            const formattedPhoneNumber = `+${userLoginDetails.phone.replace(/\D/g, "")}`;
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
        const mergedData = {
            ...data,
            ...userLoginDetails,
        };
        if (fromSignInPage !== true) {
            console.log("From signup screen");
            try {
                if (!auth) {
                    console.log("Auth not initialized");
                    return;
                }

                console.log("It is signup flow");

                const OtpCode = otp.join("");
                const credential = PhoneAuthProvider.credential(verificationIdConfirm, OtpCode);
                await signInWithCredential(auth, credential);
                console.log("Phone number verified successfully");

                try {
                    const LocalData = localStorage.getItem('LoginData');
                    const userDetails = JSON.parse(LocalData);
                    const AuthToken = userDetails.data.token;
                    const ApiData = {
                        code: otp.join(""),
                        phoneVerified: true,
                        // phone: userLoginDetails?.phone,
                    }
                    const response = await axios.post(Apis.updateProfile, ApiData, {
                        headers: {
                            'Authorization': 'Bearer ' + AuthToken,
                            'Content-Type': 'application/json'
                        }
                    });
                    if (response) {
                        console.log("Response of update profile api is", response.data);
                        if (response.data.status === true) {
                            console.log("Response of update profile", response.data);
                            localStorage.setItem("User", JSON.stringify(userDetails));
                            handleContinue();
                            localStorage.removeItem('formData');
                            // localStorage.removeItem('LoginData');
                        } else {
                            setShowError(response.data.message);
                        }
                    }
                    // const response = await axios.post(Apis.verifyCode, mergedData, {
                    //     headers: {
                    //         'Content-Type': 'application/json'
                    //     }
                    // });
                    // if (response) {
                    //     console.log("response of check code ", response.data);
                    //     if (response.data.status === true) {
                    //         console.log("Response of signup", response.data);
                    //         localStorage.setItem("User", JSON.stringify(response.data));
                    //         handleContinue();
                    //         localStorage.removeItem('formData');
                    //     } else {
                    //         setShowError(response.data.message);
                    //     }
                    // }
                } catch (error) {
                    setVerifyLoader(false);
                    console.log("Error occurred in verification API:", error);
                } finally {
                    setVerifyLoader(false);
                }

            } catch (error) {
                setVerifyLoader(false);
                console.error("Error during OTP verification:", error);
            } finally {
                setVerifyLoader(false);
            }
        } else {
            console.log("From sign in screen");
            try {
                if (!auth) {
                    console.log("Auth not initialized");
                    return;
                }

                const OtpCode = otp.join("");
                console.log("Otp code sending in firebase", OtpCode);
                console.log("Verification id :", verificationId);

                // const credential = auth.PhoneAuthProvider.credential(verificationId, OtpCode);
                // await auth.signInWithCredential(credential);

                const credential = PhoneAuthProvider.credential(
                    verificationId,
                    OtpCode
                );
                await signInWithCredential(auth, credential);
                console.log("Phone number verified successfully");
                setVerifyLoader(true);
                const fromBuyStatus = localStorage.getItem("fromBuyScreen");
                console.log("Data of fromBuyscreen", JSON.parse(fromBuyStatus));
                // return

                const LocalData = localStorage.getItem("route");
                try {
                    setVerifyLoader(true);
                    const ApiPath = Apis.verifyCode;
                    const data = {
                        // code: VP1 + VP2 + VP3 + VP4 + VP5,
                        phone: signinVerificationNumber,
                        login: true,
                    };
                    console.log("Code sendding", data);
                    const response = await axios.post(ApiPath, data, {
                        headers: {
                            "Content-Type": "application/json",
                        },
                    });
                    if (response) {
                        console.log("Response of ", response.data);

                        if (response.data.status === true) {
                            localStorage.removeItem("signinNumber");
                            if (fromBuyStatus) {
                                const Data = JSON.parse(fromBuyStatus);
                                window.open(`/buyproduct/${Data.id}`);
                                localStorage.removeItem("fromBuyScreen");
                                localStorage.setItem("User", JSON.stringify(response.data));
                            } else {
                                if (LocalData) {
                                    const D = JSON.parse(LocalData);
                                    const modalName = D.modalName;
                                    localStorage.setItem("User", JSON.stringify(response.data));
                                    router.push(`/${modalName}`);
                                }
                            }
                            console.log(
                                "Response of login verification code",
                                response.data.data
                            );
                            // router.push(`/${}`)
                            // return
                            localStorage.removeItem("route");
                        } else if (response.data.status === false) {
                            console.log("Error in verify code api");
                            // setVerifyErr(response.data.message);
                        }
                    } else {
                        console.log("error");
                    }
                } catch (error) {
                    setVerifyLoader(false);
                    console.error("Error occured in loginverification code", error);
                } finally {
                    setVerifyLoader(false);
                    // setVerifyErr(false);
                }
            } catch (error) {
                setVerifyLoader(false);
                console.error("Error during OTP verification:", error);
            } finally {
                setVerifyLoader(false);
            }
        }

    };

    const handleVerifyClick = async () => {
        verifyOtp();
    };

    const handleBackClick = () => {
        handleBack();
    };

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
                        autoFocus={index == 0 ? true : false}
                        type='text'
                        inputMode="numeric"
                        pattern="[0-9]*"
                        ref={el => inputRefs.current[index] = el}
                        value={digit}
                        onChange={(e) => handleInputChange(e, index)}
                        onKeyDown={(e) => {
                            handleBackspace(e, index);
                            if (otp.length === 6) {
                                if (e.key === 'Enter') {
                                    handleVerifyClick();
                                }
                            }
                        }}
                        style={boxStyle}
                        // style={{
                        //     backgroundColor: colors[index], height: isWideScreen ? "40px" : "30px",
                        //     width: isWideScreen ? "40px" : "30px",
                        //     borderRadius: 6,
                        //     // backgroundColor: "#EDEDEDC7",
                        //     textAlign: "center",
                        //     outline: "none",
                        //     border: "none"
                        // }}
                        autoComplete="one-time-code"
                    // maxLength={6}
                    />
                ))}
            </div>

            <div>
                {showError && (
                    <div className='mt-4' style={{ fontWeight: "600", fontSize: 14, color: "red" }}>
                        {showError}
                    </div>
                )}
            </div>

            {
                !fromSignInPage && <div className='flex flex-row justify-between items-center mt-8'>
                    <div>
                        <button onClick={handleBackClick}>
                            <Image src={"/assets/backarrow.png"} alt='backArrow' height={9} width={13} />
                        </button>
                    </div>
                    <div>
                        {
                            verifyLoader ?
                                <CircularProgress size={25} /> :
                                <button onClick={handleVerifyClick} className='bg-purple px-8 text-white py-2' style={{ fontWeight: "400", fontSize: 15, borderRadius: "50px" }}>
                                    Continue
                                </button>
                        }
                    </div>
                </div>}
            {
                fromSignInPage && (
                    <div className='flex flex-row w-full justify-between items-center mt-8'>
                        <div className='w-full'>
                            {
                                verifyLoader ?
                                    <CircularProgress size={25} /> :
                                    <button onClick={handleVerifyClick} className='bg-purple px-8 text-white py-2 w-full'
                                        style={{ fontWeight: "400", fontSize: 15, borderRadius: "50px" }}>
                                        Continue
                                    </button>
                            }
                        </div>
                    </div>
                )}
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