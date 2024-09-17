'use client'
import { Button, CircularProgress, IconButton, InputAdornment, TextField, Visibility, VisibilityOff } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useRef, useState } from "react";
import PhoneNumberInput from '../PhoneNumberInput';
import Apis from '../apis/Apis';
import axios from 'axios';
import { useRouter } from 'next/navigation';


import { auth, RecaptchaVerifier, signInWithPhoneNumber, PhoneAuthProvider, signInWithCredential } from '../firebase.js';


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

export default function Animation({ onChangeIndex }) {

    const router = useRouter();
    const inputFocusRef = useRef(null);
    const aiNameRef = useRef(null);
    const aiEmailRef = useRef(null);
    const emailVerifyInput = useRef(null);
    const signUpref = useRef(null);
    // const 

    useEffect(() => {
        const LocalData = localStorage.getItem('route');
        if (LocalData) {
            setCurrentIndex(0);
            setDirection(0);
        } else {
            setCurrentIndex(2);
            setDirection(2);
        }
    }, []);

    const [currentIndex, setCurrentIndex] = useState();
    const [direction, setDirection] = useState();
    const [userName, setUserName] = useState("");
    const [checkUserNameData, setCheckUserNameData] = useState(null);
    const [checkUserEmailData, setCheckUserEmailData] = useState(null);
    const [checkUserPhoneNumberData, setCheckUserPhoneNumberData] = useState(null);
    const [userEmail, setUserEmail] = useState("");
    const [userPhoneNumber, setUserPhoneNumber] = useState("");
    const [userPassword, setUserPassword] = useState("")
    const [VerifiyNumberLoader, setVerifiyNumberLoader] = useState(false);
    const [P1, setP1] = useState("");
    const [P2, setP2] = useState("");
    const [P3, setP3] = useState("");
    const [P4, setP4] = useState("");
    const [P5, setP5] = useState("");
    const [P6, setP6] = useState("");
    const [EmailP1, setEmailP1] = useState("");
    const [EmailP2, setEmailP2] = useState("");
    const [EmailP3, setEmailP3] = useState("");
    const [EmailP4, setEmailP4] = useState("");
    const [EmailP5, setEmailP5] = useState("");
    const [signinVerificationNumber, setSigninVerificationNumber] = useState(null);

    //code for sending verification code when signIn
    const [VP1, setVP1] = useState("");
    const [VP2, setVP2] = useState("");
    const [VP3, setVP3] = useState("");
    const [VP4, setVP4] = useState("");
    const [VP5, setVP5] = useState("");
    const [VP6, setVP6] = useState("");
    const [verifyLoader, setVerifyLoader] = useState(false);
    const [verifyErr, setVerifyErr] = useState(false);
    const [creatorLoader, setCreatorLoader] = useState(false);
    const [index1Loader, setIndex1Loader] = useState(false);
    const [numberFormatErr, setNumberFormatErr] = useState(null);
    const [verifyEmailLoader, setVerifyEmailLoader] = useState(false);
    const [resendCodeLoader, setResendCodeLoader] = useState(false);
    const [emailVerificationCodeErr, setEmailVerificationCodeErr] = useState(null);

    const [verificationId, setVerificationId] = useState('');
    const [otp, setOtp] = useState("");
    const [emailVerificationCodeErr2, setEmailVerificationCodeErr2] = useState(null);
    const [isHighScreen, setIsHighScreen] = useState(false);
    const [isWideScreen, setIsWideScreen] = useState(false);
    const [isWideScreen2, setIsWideScreen2] = useState(false);
    const [verifyCodeSignUpLoader, setVerifyCodeSignUpLoader] = useState(false);

    useEffect(() => {
        if (!auth) { return }
        console.log("Init recaptcha")
        // Initialize RecaptchaVerifier when 'auth' changes
        window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
            'size': 'invisible',
            'callback': (response) => {
                // reCAPTCHA solved, allow signInWithPhoneNumber.
                // ...
            },
            'expired-callback': () => {
                // Response expired. Ask user to solve reCAPTCHA again.
                // ...
            }
        })
        // Cleanup function for RecaptchaVerifier if you want you can add 
        return () => {
            window.recaptchaVerifier.clear();
        }

    }, [auth]);


    // const setUpRecaptcha = () => {
    //     try {
    //         if (!auth) {
    //             console.error("Firebase auth is not initialized");
    //             return;
    //         }

    //         // RecaptchaVerifier should only be initialized once
    //         if (!window.recaptchaVerifier) {
    //             window.recaptchaVerifier = new RecaptchaVerifier(
    //                 'recaptcha-container',
    //                 {
    //                     size: 'invisible',
    //                     callback: (response) => {
    //                         console.log('reCAPTCHA solved');
    //                     },
    //                     'expired-callback': () => {
    //                         console.log('reCAPTCHA expired');
    //                     },
    //                 },
    //                 auth
    //             );
    //         }
    //     } catch (error) {
    //         console.error("Error initializing RecaptchaVerifier", error);
    //     }
    // };


    // Send OTP
    const sendOtp = async (e) => {
        // console.log('Event value is:', e);
        if (e === "signup") {
            console.log("Log is", e);
            try {
                setVerifiyNumberLoader(true);
                if (!userPhoneNumber) {
                    console.log("Please enter a valid phone number");
                    return;
                }

                // Send OTP
                const formattedPhoneNumber = `+${userPhoneNumber.replace(/\D/g, '')}`;
                const confirmation = await signInWithPhoneNumber(auth, formattedPhoneNumber, window.recaptchaVerifier)

                setVerificationId(confirmation.verificationId);
                console.log('OTP sent successfully');
                handleContinue();
            } catch (error) {
                console.error("Error during OTP sending:", error);
            } finally {
                setVerifiyNumberLoader(false);
                // setIndex1Loader(false);
                // setResendCodeLoader(false);
            }
        } else {
            // return
            try {
                if (!signinVerificationNumber) {
                    console.log("Please enter a valid phone number");
                    return;
                }


                const appVerifier = window.recaptchaVerifier;

                // Send OTP
                const formattedPhoneNumber = `+${signinVerificationNumber.replace(/\D/g, '')}`;
                const confirmation = await signInWithPhoneNumber(auth, formattedPhoneNumber, window.recaptchaVerifier)

                setVerificationId(confirmation.verificationId);
                console.log('OTP sent successfully');
                handleContinue();
            } catch (error) {
                console.error("Error during OTP sending:", error);
            } finally {
                setIndex1Loader(false);
                setResendCodeLoader(false);
            }
        }
    };

    // Verify OTP
    const verifyOtp = async (e) => {
        console.log("Verify code for", e);
        if (e === "Signup") {
            console.log("Verify otp for signup");
            try {
                setVerifyCodeSignUpLoader(true);
                if (!auth) {
                    console.log("Auth not initialized");
                    return;
                }

                console.log("Otp sending in firebase", P1 + P2 + P3 + P4 + P5 + P6);
                let OtpCode = P1 + P2 + P3 + P4 + P5 + P6
                console.log("Otp code sending in firebase", OtpCode);
                console.log("Verification id :", verificationId)

                // return
                // const credential = auth.PhoneAuthProvider.credential(verificationId, OtpCode);
                // await auth.signInWithCredential(credential);

                const credential = PhoneAuthProvider.credential(verificationId, OtpCode);
                await signInWithCredential(auth, credential);
                console.log("Phone number verified successfully");
                // return

                try {
                    // setVerifyLoader(true);
                    const ApiPath = Apis.verifyCode;
                    const data = {
                        // code: VP1 + VP2 + VP3 + VP4 + VP5,
                        phone: userPhoneNumber,
                        name: userName,
                        email: userEmail,
                        login: false,
                        role: "creator"
                    }
                    console.log('Code sendding', data);
                    // return
                    const response = await axios.post(ApiPath, data, {
                        headers: {
                            'Content-Type': "application/json"
                        }
                    });
                    if (response) {
                        console.log("Response of ", response.data);

                        if (response.data.status === true) {
                            localStorage.setItem('User', JSON.stringify(response.data));
                            localStorage.removeItem('signinNumber');
                            console.log("Response of login verification code", response.data.data);
                            handleContinue();
                        } else if (response.data.status === false) {
                            console.log("Error in verify code api");
                            setVerifyCodeSignUpLoader(false);
                        }
                    } else {
                        console.log("error");
                    }
                } catch (error) {
                    console.error("Error occured in loginverification code", error);
                } finally {
                    // setVerifyLoader(false);
                    // setVerifyErr(false);
                }

            } catch (error) {
                console.error("Error during OTP verification:", error);
            } finally {
                setVerifyCodeSignUpLoader(false);
            }
        } else {
            // return
            try {
                if (!auth) {
                    console.log("Auth not initialized");
                    return;
                }

                console.log("Otp sending in firebase", VP1 + VP2 + VP3 + VP4 + VP5 + VP6);
                let OtpCode = VP1 + VP2 + VP3 + VP4 + VP5 + VP6
                console.log("Otp code sending in firebase", OtpCode);
                console.log("Verification id :", verificationId)

                // const credential = auth.PhoneAuthProvider.credential(verificationId, OtpCode);
                // await auth.signInWithCredential(credential);

                const credential = PhoneAuthProvider.credential(verificationId, OtpCode);
                await signInWithCredential(auth, credential);
                console.log("Phone number verified successfully");
                setVerifyLoader(true);
                const fromBuyStatus = localStorage.getItem('fromBuyScreen');
                console.log("Data of fromBuyscreen", JSON.parse(fromBuyStatus));
                // return

                const LocalData = localStorage.getItem('route');
                try {
                    setVerifyLoader(true);
                    const ApiPath = Apis.verifyCode;
                    const data = {
                        // code: VP1 + VP2 + VP3 + VP4 + VP5,
                        phone: signinVerificationNumber,
                        login: true
                    }
                    console.log('Code sendding', data);
                    const response = await axios.post(ApiPath, data, {
                        headers: {
                            'Content-Type': "application/json"
                        }
                    });
                    if (response) {
                        console.log("Response of ", response.data);

                        if (response.data.status === true) {
                            localStorage.removeItem('signinNumber');
                            if (fromBuyStatus) {
                                const Data = JSON.parse(fromBuyStatus);
                                window.open(`/buyproduct/${Data.id}`);
                                localStorage.removeItem("fromBuyScreen");
                                localStorage.setItem('User', JSON.stringify(response.data));
                            }
                            else {
                                if (LocalData) {
                                    const D = JSON.parse(LocalData);
                                    const modalName = D.modalName;
                                    localStorage.setItem('User', JSON.stringify(response.data));
                                    router.push(`/${modalName}`);
                                }
                            }
                            console.log("Response of login verification code", response.data.data);
                            // router.push(`/${}`)
                            // return
                            localStorage.removeItem('route');
                        } else if (response.data.status === false) {
                            console.log("Error in verify code api");
                            setVerifyErr(response.data.message);
                        }
                    } else {
                        console.log("error");
                    }
                } catch (error) {
                    console.error("Error occured in loginverification code", error);
                } finally {
                    setVerifyLoader(false);
                    // setVerifyErr(false);
                }

            } catch (error) {
                console.error("Error during OTP verification:", error);
            } finally {
                setVerifyLoader(false);
            }
        }

    };




    const checkUserName = async () => {
        const ApiPath = Apis.checkUserName;
        const data = {
            username: userName
        }
        try {
            const response = await axios.post(ApiPath, data, {
                headers: {
                    "Content-Type": "application/json"
                }
            });

            if (response.data) {
                console.log("Response of check name api is", response.data);
                setCheckUserNameData(response.data);
            }
        } catch (error) {
            console.error("Error occured in checkusername api", error);

        }
    }

    useEffect(() => {
        if (currentIndex === 1 && inputFocusRef.current) {
            // Using a small timeout to ensure rendering of the input after animation
            setTimeout(() => {
                inputFocusRef.current.focus();
            }, 300); // Adjust this delay according to the animation timing
        }
        if (currentIndex === 2 && aiNameRef.current) {
            console.log("Ai name ref index", currentIndex);
            // Small timeout to ensure rendering and smooth animation
            setTimeout(() => {
                aiNameRef.current.focus();
            }, 300); // Adjust this timing according to your animation
            console.log('Ai name ref', aiNameRef);
        }

        if (currentIndex === 3 && aiEmailRef.current) {
            console.log("Ai email ref index", currentIndex);
            // Small timeout for email input focus after animation
            setTimeout(() => {
                aiEmailRef.current.focus();
            }, 300); // Adjust this timing according to your animation
        }

        if (currentIndex === 4 && emailVerifyInput.current) {
            console.log("Ai email ref index", currentIndex);
            // Small timeout for email input focus after animation
            setTimeout(() => {
                emailVerifyInput.current.focus();
            }, 300); // Adjust this timing according to your animation
        }
        if (currentIndex === 6 && signUpref.current) {
            console.log("Ai email ref index", currentIndex);
            // Small timeout for email input focus after animation
            setTimeout(() => {
                signUpref.current.focus();
            }, 300); // Adjust this timing according to your animation
        }
    }, [currentIndex]);

    // console.log("Sign in number for verification", signinVerificationNumber);


    const SignInNumber = (number) => {
        setSigninVerificationNumber(number);
        console.log("Number is", number);
    }

    //code for email verification code sending
    const handleVerifyEmail = async () => {
        // setVerifyEmailLoader(true);
        setSendEmailCodeLoader(true);
        try {
            const ApiPath = Apis.EmailVerificationCode;
            const data = {
                email: userEmail,
                // code: P1 + P2 + P3 + P4 + P5
            }
            console.log("Data sending in verify code email", data);
            const response = await axios.post(ApiPath, data, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (response) {
                console.log("Api response of verify code api", response.data);
                if (response.data.status === true) {
                    handleContinue()
                } else {
                    setEmailVerificationCodeErr(response.data.message);
                }
            } else {
                console.log("No response");
            }
        } catch (error) {
            console.error("Error occured in api", error);
        } finally {
            setSendEmailCodeLoader(false);
            // setVerifyEmailLoader(true);
        }
    }

    //code for verify email verification code
    const handleVerifyEmailCode = async () => {
        setVerifyEmailLoader(true);
        // setSendEmailCodeLoader(true);
        try {
            const ApiPath = Apis.verifyEmail;
            const data = {
                email: userEmail,
                code: EmailP1 + EmailP2 + EmailP3 + EmailP4 + EmailP5
            }
            console.log("Data sending in verify code email", data);
            const response = await axios.post(ApiPath, data, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (response) {
                console.log("Api response of verify code api", response.data);
                if (response.data.status === true) {
                    handleContinue()
                } else {
                    setEmailVerificationCodeErr2(response.data.message);
                }
            } else {
                console.log("No response");
            }
        } catch (error) {
            console.error("Error occured in api", error);
        } finally {
            // setSendEmailCodeLoader(false);
            setVerifyEmailLoader(false);
        }
    }

    //code to show number format err
    const handleErr = (err) => {
        console.log("Err", err);
        setNumberFormatErr(err);
    }

    //code for navigating to 3rd flow from congrats
    const handleCongratsClick = () => {
        router.push('/creator/buildscript')
    }

    useEffect(() => {
        if (userName) {
            // checkUserName();
            const timeout = setTimeout(() => {
                checkUserName();
            }, 300);
            return () => clearTimeout(timeout);
        }
    }, [userName]);

    //email validation

    const checkUserEmail = async (emailValue) => {
        const ApiPath = Apis.checkUserEmail;
        const data = {
            // email: userEmail
            email: emailValue
        }
        try {
            const response = await axios.post(ApiPath, data, {
                headers: {
                    "Content-Type": "application/json"
                }
            });
            if (response) {
                if (response.data) {
                    console.log("Response of checkemail", response.data);
                    setCheckUserEmailData(response.data);
                }
            }
        } catch (error) {
            console.error("Error occured in checkuseremail api", error);

        }
    }

    //code to validate email
    const validateEmail = (email) => { // Accept email directly as a string
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailPattern.test(email);
    };

    const [emailValidationError, setEmailValidationError] = useState(false);
    const [sendEmailCodeLoader, setSendEmailCodeLoader] = useState(false);


    // useEffect(() => {
    //     if (userEmail) {
    //         const timeout = setTimeout(() => {
    //             checkUserEmail();
    //         }, 300);
    //         return (() => clearTimeout(timeout));
    //     }
    // }, [userEmail]);

    const checkPhoneNumber = async () => {
        const data = {
            phone: userPhoneNumber
        }
        const ApiPath = Apis.checkPhone;
        try {
            const response = await axios.post(ApiPath, data, {
                headers: {
                    "Content-Type": "application/json"
                }
            });
            if (response) {
                if (response.data) {
                    setCheckUserPhoneNumberData(response.data)
                }
            }
        } catch (error) {
            console.error("Error occured in checknumber api", error);

        }
    }

    useEffect(() => {
        if (userPhoneNumber) {
            setTimeout(() => {
                checkPhoneNumber();
            }, 500);
        }
    }, [userPhoneNumber]);

    //code for login back
    const handleLogin = async (e) => {
        setIndex1Loader(true);
        setResendCodeLoader(true);
        if (e) {
            console.log("E value is", e);
        } else {
            console.log("No event");
        };
        // return
        let sent = await sendOtp();

        // try {
        //     setIndex1Loader(true);
        //     setResendCodeLoader(true);
        //     const ApiPath = Apis.sendVerificationCode;
        //     // const LocalData = localStorage.getItem('route');
        //     // const D = JSON.parse(LocalData);
        //     // const modalName = D.modalName;
        //     // router.push(`/${modalName}`);
        //     const data = {
        //         phone: signinVerificationNumber,
        //         // status: "true"
        //         login: "true"
        //     }
        //     localStorage.setItem('signinNumber', JSON.stringify(signinVerificationNumber));
        //     console.log("Data sending in api to send verification code:", data);
        //     const response = await axios.post(ApiPath, data, {
        //         headers: {
        //             'Content-Type': "application/json"
        //         }
        //     });
        //     if (response) {
        //         console.log("Response of login api is", response);
        //         if (response.data.status === true) {
        //             if (e) {
        //                 return
        //             } else {
        //                 handleContinue();
        //             }
        //         }
        //     }
        // } catch (error) {
        //     console.error("Error occured in login api", error);
        // } finally {
        //     setIndex1Loader(false);
        //     setResendCodeLoader(false);
        // }
    }

    //signup click
    const handleSignUpContinue = () => {
        const LocalData = localStorage.getItem('route');
        if (LocalData) {
            const Data = JSON.parse(LocalData);
            const path = Data.modalName
            console.log("Data from main screen", path);

            router.push(`/${path}?from=signin`);
            localStorage.removeItem('route');
            localStorage.removeItem('signinNumber');
        } else {
            setDirection(2);
            setCurrentIndex((prevIndex) => prevIndex + 2);
        }
    }


    const handleContinue = () => {
        // handleCurrentIndex();
        setDirection(1);
        setCurrentIndex((prevIndex) => prevIndex + 1);
    };

    const handleCaller_toCreator_Continue = () => {
        setDirection(5);
        setCurrentIndex((prevIndex) => prevIndex + 5);
    }

    //code when user want to become creator
    const handleCreatorClick = async () => {
        const LocalData = localStorage.getItem('User');
        if (LocalData) {
            setCreatorLoader(true);
            const Data = JSON.parse(LocalData);
            console.log("Local data is", Data.data.user);
            // return
            const AuthToken = Data.data.token;
            console.log("Authtoken is", AuthToken);
            const ApiPath = Apis.Caller_to_Creator;
            const data = {
                username: userName,
                role: "creator"
            }
            console.log("Data sending in api is", data);
            try {
                const response = await axios.post(ApiPath, data, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + AuthToken
                    }
                });
                if (response) {
                    console.log("Response of caller_to_creator api is", response.data.data);
                    // return
                    if (response.data.status === true) {
                        Data.data.user = response.data.data;
                        localStorage.setItem('User', JSON.stringify(Data));
                        handleCaller_toCreator_Continue();
                    }
                } else {
                    console.log("Error in caller_to_creator api");
                }
            } catch (error) {
                console.error("Error occured in api is", error);
            } finally {
                setCreatorLoader(false);
            }
        } else {
            handleContinue()
        }
    }

    const handleBack = () => {
        setDirection(-1);
        setCurrentIndex((prevIndex) => prevIndex - 1);
    };

    const handleMoveLogin = () => {
        setDirection(-2);
        setCurrentIndex((prevIndex) => prevIndex - 2);
    };

    // console.log("test index is", currentIndex);

    useEffect(() => {
        onChangeIndex(currentIndex)
    }, [currentIndex]);


    const userNumber = (phone) => {
        setUserPhoneNumber(phone)
    }

    const [formatError, setFormatError] = useState(null);
    const getNumberFormat = (status) => {
        console.log("Format error is", status);
        setFormatError(status);
        setCheckUserPhoneNumberData(null);
    }

    //code for verifyphone
    const handlePhoneVerificationClick = async () => {

        const verificationNumber = {
            phone: userPhoneNumber
        }

        // try {
        //     const ApiPath = Apis.sendVerificationCode;
        //     const response = await axios.post(ApiPath, verificationNumber, {
        //         headers: {
        //             'Content-Type': 'application/json'
        //         }
        //     });
        //     if (response.status === 200) {
        //         console.log("Response of api is", response.data);
        //         handleContinue();
        //     }
        // } catch (error) {
        //     console.error("Error occured in sendVC", error);
        // } finally {
        //     setVerifiyNumberLoader(false);
        // }
    }

    const handleInputChange = (e, setFunc, nextInputId) => {
        const value = e.target.value;
        setFunc(value);

        if (value && nextInputId) {
            document.getElementById(nextInputId).focus();
        }
    };

    const handleBackspace = (e, setFunc, prevInputId) => {
        if (e.key === "Backspace" && e.target.value === "") {
            if (prevInputId) {
                document.getElementById(prevInputId).focus();
            }
        }
    };

    //code for handleVerifyPhoneCode
    // const handleVerifyPhoneCode = async () => {
    //     const data = {
    //         code: EmailP1 + EmailP2 + EmailP3 + EmailP4 + EmailP5,
    //         phone: userPhoneNumber
    //     }
    //     const ApiPath = Apis.verifyCode;
    //     try {
    //         const response = await axios.post(ApiPath, data, {
    //             headers: {
    //                 "Content-Type": "application/json"
    //             }
    //         });
    //         if (response) {
    //             console.log("Response of verifyphone code", response.data);
    //             if (response.data.status === true) {
    //                 // handleContinue();
    //                 const data = {
    //                     email: userEmail,
    //                     username: userName,
    //                     phone: userPhoneNumber,
    //                     password: userPassword,
    //                     role: "creator"
    //                 }
    //                 console.log("Data sending in register api is", data);

    //                 const loginResponse = await axios.post(Apis.RegisterLogin, data, {
    //                     headers: {
    //                         "Content-Type": "application/json"
    //                     }
    //                 });
    //                 if (loginResponse) {
    //                     if (loginResponse.data) {
    //                         console.log("response of login api is", loginResponse.data);
    //                     }
    //                 }
    //             }
    //         }
    //     } catch (error) {
    //         console.error("Error occured in api is", error);

    //     }
    // }

    const containerStyles = {
        position: 'relative',
        // height: '40vh',
        width: '90%',
        overflow: 'hidden',
        // backgroundColor: "blue"
    };

    const styles = {
        // position: 'absolute', // Ensures the boxes are stacked on top of each other
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        // backgroundColor: "red",
        // height: "20vh",
        // marginLeft: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginInline: 10
    };

    //code for wide screen
    useEffect(() => {
        const handleResize = () => {
            // Check if width is greater than or equal to 1024px
            setIsWideScreen(window.innerWidth >= 950);

            setIsWideScreen2(window.innerWidth >= 500);
            // Check if height is greater than or equal to 1024px
            setIsHighScreen(window.innerHeight >= 640);

            // Log the updated state values for debugging (Optional)
            console.log("isWideScreen: ", window.innerWidth >= 640);
            console.log("isWideScreen2: ", window.innerWidth >= 500);
            console.log("isHighScreen: ", window.innerHeight >= 1024);
        };

        handleResize(); // Set initial state
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);


    //code for verification code whe user sign in
    //code for moving to next field
    const handleInputChange2 = (e, setFunc, nextInputId) => {
        const value = e.target.value;
        if (value.length === 1) {
            setFunc(value); // Update the current field
            if (nextInputId) {
                document.getElementById(nextInputId).focus(); // Move to the next field
            }
        }
    };

    const handleBackspace2 = (e, setFunc, prevInputId) => {
        if (e.key === 'Backspace') {
            setFunc(''); // Clear the current field
            if (e.target.value === '' && prevInputId) {
                document.getElementById(prevInputId).focus(); // Move to the previous field
            }
        }
    };

    const handleVerifyLoginCode = async () => {

        setVerifyLoader(true);
        verifyOtp()
    }

    //code for hiding the bordercolor
    const MuiFieldStyle = {
        '& label.Mui-focused': {
            color: 'black',
        },
        '& .MuiFilledInput-root': {
            fontSize: 13,
            fontWeight: '400',
        },
        '& .MuiOutlinedInput-root': {
            borderRadius: 2,
            height: "48px",
            backgroundColor: "#EDEDEDC7",
            color: "black",
            '& fieldset': {
                borderColor: 'transparent',
            },
            '&:hover fieldset': {
                borderColor: 'transparent',
            },
            '&.Mui-focused fieldset': {
                borderColor: '#00000000',
                // backgroundColor: "#EDEDEDC7",
                color: "#000000",
            },
            '& .MuiOutlinedInput-input': {
                color: 'black !important',
            },
            '&.Mui-focused .MuiOutlinedInput-input': {
                color: 'black !important',
            },
        },
    };

    const margin = {
        marginTop: '25%'
    }

    return (
        <div style={containerStyles}>
            <div id="recaptcha-container" />
            <AnimatePresence initial={false} custom={direction}>
                {currentIndex === 0 && (
                    <div className='flex flex-col h-screen sm:justify-center justify-start' style={margin}>
                        <motion.div
                            key="box1"
                            custom={direction}
                            variants={boxVariants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{ duration: 0 }}
                            style={styles}
                        >
                            <div className='w-full'>
                                <div style={{ fontSize: 24, fontWeight: "600", }}>
                                    Sign in
                                </div>
                                <div className='text-lightWhite' style={{ fontSize: 13, fontWeight: "400" }}>
                                    Good to have you back!
                                </div>
                                <div className='w-full lg:w-8/12 flex flex-row gap-6 mt-8'>
                                    {/* <TextField className=' w-5/12'
                                        autofill='off'
                                        id="filled-basic"
                                        label="Email address" variant="filled"
                                        placeholder='Enter your email address.'
                                        sx={{
                                            '& label.Mui-focused': {
                                                color: '#050A0890',
                                            },
                                            '& .MuiFilledInput-root': {
                                                // color: '#050A0860',
                                                fontSize: 13,
                                                fontWeight: '400'
                                            },
                                            '& .MuiFilledInput-underline:before': {
                                                borderBottomColor: '#050A0860',
                                            },
                                            '& .MuiFilledInput-underline:after': {
                                                borderBottomColor: '#050A0890',
                                            },
                                        }} />
                                    <TextField className=' w-5/12'
                                        autofill='off'
                                        id="password"
                                        type='password'
                                        label="Password" variant="filled"
                                        placeholder='Enter your email address.'
                                        sx={{
                                            '& label.Mui-focused': {
                                                color: '#050A0890',
                                            },
                                            '& .MuiFilledInput-root': {
                                                // color: '#050A0860',
                                                fontSize: 13,
                                                fontWeight: '400'
                                            },
                                            '& .MuiFilledInput-underline:before': {
                                                borderBottomColor: '#050A0860',
                                            },
                                            '& .MuiFilledInput-underline:after': {
                                                borderBottomColor: '#050A0890',
                                            },
                                        }} /> */}

                                    <PhoneNumberInput fromSignIn={true} formatErr={handleErr} phonenumber={SignInNumber} />

                                </div>

                                {
                                    numberFormatErr ?
                                        <div className='mt-2' style={{ fontWeight: "400", fontSize: 12, fontFamily: "inter", color: "#FF0100", height: 13 }}>
                                            {numberFormatErr}
                                        </div> : ""
                                }

                                {/* <div className='mt-2'>
                                    <button style={{ color: "#552AFF", fontSize: 13, fontWeight: "400" }}>
                                        <u>
                                            Reset Password
                                        </u>
                                    </button>
                                </div> */}
                                <div className='mt-8 w-full lg:w-8/12' style={{ color: "white" }}>
                                    {
                                        index1Loader ?
                                            <div className='w-full flex flex-row justify-center'>
                                                <CircularProgress size={25} />
                                            </div> :
                                            <div>
                                                {
                                                    numberFormatErr || signinVerificationNumber === null ?
                                                        <button className='bg-purple2 text-white w-full' //onClick={handleLogin}
                                                            style={{ fontSize: 15, fontWeight: "400", height: "52px", borderRadius: "50px" }}>
                                                            Continue
                                                        </button> :
                                                        <button className='bg-purple text-white w-full' onClick={() => handleLogin(null)}
                                                            style={{ fontSize: 15, fontWeight: "400", height: "52px", borderRadius: "50px" }}>
                                                            Continue
                                                        </button>
                                                }
                                            </div>
                                    }
                                </div>
                                <div className='mt-6 flex flex-row items-center gap-1'>
                                    <div style={{ fontSize: 12, fontWeight: "400" }}>
                                        Or
                                    </div>
                                    <button onClick={handleSignUpContinue} style={{ fontSize: 15, fontWeight: "500" }}>
                                        Signup
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
                {currentIndex === 1 && (
                    <div className='flex flex-col h-screen sm:justify-center justify-start' style={margin}>
                        <motion.div
                            key="box2"
                            custom={direction}
                            variants={boxVariants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{ duration: 0 }}
                            style={styles}
                        >
                            <div className='w-full'>
                                <div>
                                    <button onClick={handleBack}>
                                        <Image src={'/assets/backarrow.png'} alt='back' height={14} width={16} />
                                    </button>
                                </div>
                                <div className='text-lightWhite mt-4' style={{ fontWeight: "500", fontSize: 15, fontFamily: "inter" }}>
                                    Enter verification code sent to ****{Number(signinVerificationNumber.slice(-4))}
                                </div>
                                <div className='flex flex-row gap-4 mt-4'>
                                    <input
                                        id="P1"
                                        ref={inputFocusRef}
                                        inputMode="numeric"
                                        pattern="[0-9]*"
                                        type='text'
                                        value={VP1}
                                        onChange={(e) => {
                                            handleInputChange2(e, setVP1, "P2");
                                            setVerifyErr(false);
                                        }}
                                        maxLength={1}
                                        style={{ height: "40px", width: "40px", borderRadius: 6, backgroundColor: "#EDEDEDC7", textAlign: "center", outline: "none", border: "none" }}
                                        onKeyDown={(e) => handleBackspace2(e, setVP1, null)}
                                    />
                                    <input
                                        id="P2"
                                        type='text'
                                        value={VP2}
                                        inputMode="numeric"
                                        pattern="[0-9]*"
                                        onChange={(e) => {
                                            handleInputChange2(e, setVP2, "P3");
                                            setVerifyErr(false);
                                        }}
                                        maxLength={1}
                                        style={{ height: "40px", width: "40px", borderRadius: 6, backgroundColor: "#EDEDEDC7", textAlign: "center", outline: "none", border: "none" }}
                                        onKeyDown={(e) => handleBackspace2(e, setVP2, "P1")}
                                    />
                                    <input
                                        id="P3"
                                        type='text'
                                        inputMode="numeric"
                                        pattern="[0-9]*"
                                        value={VP3}
                                        onChange={(e) => {
                                            handleInputChange2(e, setVP3, "P4");
                                            setVerifyErr(false);
                                        }}
                                        maxLength={1}
                                        style={{ height: "40px", width: "40px", borderRadius: 6, backgroundColor: "#EDEDEDC7", textAlign: "center", outline: "none", border: "none" }}
                                        onKeyDown={(e) => handleBackspace2(e, setVP3, "P2")}
                                    />
                                    <input
                                        id="P4"
                                        type='text'
                                        inputMode="numeric"
                                        pattern="[0-9]*"
                                        value={VP4}
                                        onChange={(e) => {
                                            handleInputChange2(e, setVP4, "P5");
                                            setVerifyErr(false);
                                        }}
                                        maxLength={1}
                                        style={{ height: "40px", width: "40px", borderRadius: 6, backgroundColor: "#EDEDEDC7", textAlign: "center", outline: "none", border: "none" }}
                                        onKeyDown={(e) => handleBackspace2(e, setVP4, "P3")}
                                    />
                                    <input
                                        id="P5"
                                        type='text'
                                        inputMode="numeric"
                                        pattern="[0-9]*"
                                        value={VP5}
                                        onChange={(e) => {
                                            handleInputChange2(e, setVP5, "P6");
                                            setVerifyErr(false);
                                        }}
                                        maxLength={1}
                                        style={{ height: "40px", width: "40px", borderRadius: 6, backgroundColor: "#EDEDEDC7", textAlign: "center", outline: "none", border: "none" }}
                                        onKeyDown={(e) => {
                                            handleBackspace2(e, setVP5, "P4");
                                            // if (e.key === 'Enter') {
                                            //     handleVerifyLoginCode();
                                            // }
                                        }}
                                    />
                                    <input
                                        id="P6"
                                        type='text'
                                        inputMode="numeric"
                                        pattern="[0-9]*"
                                        value={VP6}
                                        onChange={(e) => {
                                            handleInputChange2(e, setVP6, null);
                                            setVerifyErr(false);
                                        }}
                                        maxLength={1}
                                        style={{ height: "40px", width: "40px", borderRadius: 6, backgroundColor: "#EDEDEDC7", textAlign: "center", outline: "none", border: "none" }}
                                        onKeyDown={(e) => {
                                            handleBackspace2(e, setVP6, "P5");
                                            if (e.key === 'Enter') {
                                                handleVerifyLoginCode();
                                            }
                                        }}
                                    />
                                </div>

                                <div>
                                    {
                                        verifyErr && (
                                            <div className='mt-2' style={{ fontWeight: "400", fontFamily: "inter", color: "#FF0100" }}>
                                                {verifyErr}
                                            </div>
                                        )
                                    }
                                </div>

                                <div className='mt-8 w-full md:w-8/12' style={{ color: "white" }}>
                                    {
                                        verifyLoader ?
                                            <div className='w-full mt-4 flex flex-row justify-center'>
                                                <CircularProgress size={30} />
                                            </div> :
                                            <div>
                                                {/* {VP} */}
                                                {
                                                    VP1 && VP2 && VP3 && VP4 && VP5 && VP6 ?
                                                        <button onClick={handleVerifyLoginCode} className='bg-purple hover:bg-purple text-white rounded w-full'
                                                            style={{ fontSize: 15, fontWeight: "400", height: "52px", borderRadius: "50px" }}>
                                                            Continue
                                                        </button> :
                                                        <button
                                                            disabled
                                                            // onClick={handleVerifyLoginCode}
                                                            className='bg-purple2 hover:bg-purple2 text-white rounded w-full'
                                                            style={{ fontSize: 15, fontWeight: "400", height: "52px", borderRadius: "50px", color: 'white' }}>
                                                            Continue
                                                        </button>
                                                }
                                            </div>
                                    }
                                </div>
                                {
                                    resendCodeLoader ?
                                        <CircularProgress className='mt-4 ms-6' size={20} /> :
                                        <button onClick={(e) => handleLogin(e)} className='text-purple underline mt-2' style={{ fontSize: 15, fontWeight: "500", fontFamily: 'inter' }}>
                                            Resend Code
                                        </button>
                                }
                                <div className='mt-4 flex flex-row items-center gap-1'>
                                    <div style={{ fontSize: 12, fontWeight: "400" }}>
                                        Or
                                    </div>
                                    <button onClick={handleSignUpContinue} style={{ fontSize: 15, fontWeight: "500", fontFamily: 'inter' }}>
                                        Signup
                                    </button>
                                </div>
                                {/* Err msg when not verified */}
                            </div>
                        </motion.div>
                    </div>
                )}
                {currentIndex === 2 && (
                    <div className='flex flex-col h-screen sm:justify-center justify-start' style={margin}>
                        <motion.div
                            key="box3"
                            custom={direction}
                            variants={boxVariants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{ duration: 0 }}
                            style={styles}
                        >
                            <div className='w-full flex justify-center'>
                                <div className='w-full sm:w-10/12'>
                                    <div>
                                        <button onClick={handleBack}>
                                            <Image src={'/assets/backarrow.png'} alt='back' height={14} width={16} />
                                        </button>
                                    </div>
                                    <div className='mt-6' style={{ fontSize: 24, fontWeight: "600" }} onClick={handleContinue}>
                                        First, claim your unique url
                                    </div>
                                    <div className='text-lightWhite mt-2' style={{ fontSize: 13, fontWeight: "400", marginBottom: 50 }}>
                                        The good ones are still available
                                    </div>

                                    <TextField
                                        className='w-full md:w-9/12'
                                        autofill='off'
                                        id="filled-basic"
                                        value={userName}
                                        // ref={aiNameRef}
                                        inputRef={aiNameRef}
                                        onChange={(e) => {
                                            setUserName(e.target.value);
                                            setCheckUserNameData(null);
                                        }}
                                        // onKeyDown={(e) => {
                                        //     setTimeout(() => {
                                        //         if (e.key === 'Enter') {
                                        //             handleCreatorClick();
                                        //         }
                                        //         console.log('Hamza is here');
                                        //     }, 1000);
                                        //     // return (() => clearTimeout(timer));
                                        // }}
                                        // label="Name"
                                        variant="outlined"
                                        placeholder='name'
                                        sx={MuiFieldStyle}
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start" style={{ color: 'blue', fontSize: '14px', fontWeight: 'bold' }}>
                                                    mycreatorx.com /
                                                </InputAdornment>
                                            ),
                                            style: {
                                                color: 'black',  // Apply color to the input text
                                                fontSize: '16px', // Apply font size to the input text
                                                fontWeight: '400', // Apply font weight to the input text
                                            },
                                        }}
                                    />

                                    <div className='mt-2' style={{ height: 15 }}>
                                        {
                                            checkUserNameData && checkUserNameData.status === true ?
                                                <div className='mt-2' style={{ fontWeight: "400", fontSize: 14, color: "green" }}>
                                                    {checkUserNameData.message}
                                                </div> :
                                                <div>
                                                    {
                                                        checkUserNameData && checkUserNameData.status === false &&
                                                        <div className='text-red mt-2' style={{ fontWeight: "400", fontSize: 14 }}>
                                                            This username seems to be taken already... <br />Try something similar.
                                                        </div>
                                                    }
                                                </div>
                                        }
                                    </div>

                                    {/* <div className='mt-2' style={{ height: 15 }}>
                                        {
                                            checkUserNameData && checkUserNameData.status === false &&
                                            <div className='text-red mt-2' style={{ fontWeight: "400", fontSize: 14 }}>
                                                This username seems to be taken already... <br />Try something similar.
                                            </div>
                                        }
                                    </div> */}

                                    {/* <div className='mt-4' style={{ color: '#FF0100', fontSize: 12, fontWeight: "500" }}>
                                        This username seems to be taken already...<br />
                                        Try something similar.
                                    </div> */}

                                    <div className='w-full sm:w-10/12' style={{ height: "55px" }}
                                    >
                                        <div>
                                            {
                                                userName ?
                                                    <div>
                                                        {
                                                            checkUserNameData && checkUserNameData.status === true ?
                                                                <div style={{ fontWeight: "400", fontSize: 14, color: "green" }}>
                                                                    {
                                                                        creatorLoader ?
                                                                            <div className='w-full mt-12 flex flex-row justify-center'>
                                                                                <CircularProgress size={25} />
                                                                            </div> :
                                                                            <button onClick={handleCreatorClick}
                                                                                className='bg-purple hover:bg-purple text-white w-full mt-12'
                                                                                style={{ fontSize: 15, fontWeight: "400", height: "52px", borderRadius: "50px" }}>
                                                                                Continue
                                                                            </button>
                                                                    }
                                                                </div>
                                                                :
                                                                <div style={{ fontWeight: "400", fontSize: 14, color: "green" }}>
                                                                    <button
                                                                        // disabled
                                                                        className='bg-placeholderColor text-white rounded w-full mt-12'
                                                                        style={{ fontSize: 15, fontWeight: "400", height: "52px", color: "white", borderRadius: "50px" }}>
                                                                        Continue
                                                                    </button>
                                                                </div>
                                                        }
                                                    </div> : ''
                                            }
                                        </div>
                                    </div>

                                    <div className='mt-12 flex flex-row items-center gap-1' style={{ height: "30px" }}>
                                        <div style={{ fontSize: 12, fontWeight: "400" }}>
                                            Or
                                        </div>
                                        <button onClick={handleMoveLogin} style={{ fontSize: 15, fontWeight: "500" }}>
                                            Login
                                        </button>
                                    </div>

                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
                {currentIndex === 3 && (
                    <div className='flex flex-col h-screen sm:justify-center justify-start' style={margin}>
                        <motion.div
                            key="box4"
                            custom={direction}
                            variants={boxVariants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{ duration: 0 }}
                            style={styles}>
                            <div className='w-full flex justify-center'>
                                <div className='w-full sm:w-10/12'>
                                    <div>
                                        <button onClick={handleBack}>
                                            <Image src={'/assets/backarrow.png'} alt='back' height={14} width={16} />
                                        </button>
                                    </div>
                                    <div className='mt-6 text-lightWhite' style={{ fontWeight: "400", fontSize: 13 }}>
                                        app.mycreatorx.com/{userName} is all yours!
                                    </div>
                                    <div className='mt-6' style={{ fontSize: 24, fontWeight: "600" }} onClick={handleContinue}>
                                        Now, create your account
                                    </div>
                                    <div className='w-full flex flex-row gap-6 mt-8'>

                                        <TextField className=' w-full mt-6'
                                            autofill='off'
                                            id="filled-basic"
                                            value={userEmail}
                                            inputRef={aiEmailRef}
                                            onChange={(e) => {
                                                setUserEmail(e.target.value);
                                                setCheckUserEmailData(null);
                                                setEmailVerificationCodeErr(null);
                                                setEmailValidationError(false);
                                                const value = e.target.value;
                                                if (value) {
                                                    const timer = setTimeout(() => {
                                                        if (!validateEmail(value)) {
                                                            setEmailValidationError(true);
                                                        } else {
                                                            setEmailValidationError(false);
                                                            if (userEmail) {
                                                                const timeout = setTimeout(() => {
                                                                    checkUserEmail(value);
                                                                }, 300);
                                                                return (() => clearTimeout(timeout));
                                                            }
                                                        }
                                                    }, 1000);
                                                    return (() => clearTimeout(timer))
                                                }

                                            }}
                                            onKeyDown={(e) => {
                                                if (e.key === 'Enter') {
                                                    handleVerifyEmail();
                                                }
                                            }}
                                            label="Email" variant="outlined"
                                            placeholder='Email Address'
                                            sx={MuiFieldStyle}
                                        />

                                    </div>
                                    <div style={{ height: 14 }}>
                                        {
                                            emailValidationError ?
                                                <div className='mt-2' style={{ fontWeight: "400", fontSize: 12, fontFamily: "inter", color: "#FF0100", height: 13 }}>
                                                    Enter valid email
                                                </div> :
                                                <div>
                                                    {
                                                        emailVerificationCodeErr ?
                                                            <div style={{ fontWeight: "400", fontSize: 14, color: "red", height: 14 }}>
                                                                {emailVerificationCodeErr}
                                                            </div> :
                                                            <div>
                                                                {
                                                                    checkUserEmailData && checkUserEmailData.status === true &&
                                                                    <div style={{ fontWeight: "400", fontSize: 14, color: "green", height: 14 }}>
                                                                        Email Available
                                                                    </div>
                                                                }
                                                                {
                                                                    checkUserEmailData && checkUserEmailData.status === false &&
                                                                    <div style={{ fontWeight: "400", fontSize: 14, color: "red", height: 14 }}>
                                                                        {checkUserEmailData.message}
                                                                    </div>
                                                                }
                                                            </div>
                                                    }
                                                </div>
                                        }
                                    </div>
                                    <div style={{ height: '51px' }}>
                                        {
                                            userEmail ?
                                                <div>
                                                    {
                                                        sendEmailCodeLoader ?
                                                            <div className='w-full flex flex-row justify-center mt-8'>
                                                                <CircularProgress size={25} />
                                                            </div> :
                                                            <div>
                                                                {
                                                                    checkUserEmailData && checkUserEmailData.status === true ?
                                                                        <div style={{ fontWeight: "400", fontSize: 14, color: "green" }}>
                                                                            <button
                                                                                onClick={handleVerifyEmail}
                                                                                sx={{ textDecoration: "none" }}
                                                                                className='bg-purple hover:bg-purple2 w-full mt-8'
                                                                                style={{ fontSize: 15, fontWeight: "400", color: "white", height: "51px", borderRadius: "50px" }}>
                                                                                Continue
                                                                            </button>
                                                                        </div> :
                                                                        <div style={{ fontWeight: "400", fontSize: 14, color: "green" }}>
                                                                            <button
                                                                                // disabled
                                                                                // onClick={handleContinue}
                                                                                sx={{ textDecoration: "none" }}
                                                                                className='bg-placeholderColor w-full mt-8'
                                                                                style={{ fontSize: 15, fontWeight: "400", color: "white", height: "51px", borderRadius: "50px" }}>
                                                                                Continue
                                                                            </button>
                                                                        </div>
                                                                }
                                                            </div>
                                                    }
                                                </div> : ''
                                        }
                                    </div>
                                    {/*<div className='text-lightWhite mt-6' style={{ fontSize: 12, fontWeight: '400', textAlign: "center" }}>
                                        OR
                                    </div>
                                    <div>
                                        <Button
                                            // onClick={handleContinue}
                                            sx={{ textDecoration: "none" }}
                                            className='bg-light-blue hover:bg-light-blue w-full mt-8'
                                            style={{ fontSize: 15, fontWeight: "400", color: "white", borderRadius: "50px" }}>
                                            Sign up with Google
                                        </Button>
                                    </div>*/}
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
                {currentIndex === 4 && (
                    <div className='flex flex-col h-screen sm:justify-center justify-start' style={margin}>
                        <motion.div
                            key="box5"
                            custom={direction}
                            variants={boxVariants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{ duration: 0 }}
                            style={styles}>
                            <div className='w-full flex justify-center'>
                                <div className='w-full sm:w-10/12'>
                                    <div>
                                        {/* <button onClick={handleBack}>
                                            <Image src={'/assets/backarrow.png'} alt='back' height={14} width={16} />
                                        </button> */}
                                    </div>
                                    <div className='mt-6' style={{ fontSizeL: 24, fontWeight: "600" }} onClick={handleContinue}>
                                        Verify email address.
                                    </div>
                                    <div className='text-lightWhite mt-1' style={{ fontSize: 13, fontWeight: "400" }}>
                                        code was sent to {userEmail.slice(0, 4)}*********@gmail.com
                                    </div>

                                    <div className='flex flex-row gap-4 mt-4'>
                                        <input
                                            id="P1"
                                            ref={emailVerifyInput}
                                            type='text'
                                            value={EmailP1}
                                            onChange={(e) => {
                                                handleInputChange2(e, setEmailP1, "P2");
                                                setVerifyErr(false);
                                            }}
                                            maxLength={1}
                                            style={{ height: "40px", width: "40px", borderRadius: 6, backgroundColor: "#EDEDEDC7", textAlign: "center", outline: "none", border: "none" }}
                                            onKeyDown={(e) => handleBackspace2(e, setEmailP1, null)}
                                        />
                                        <input
                                            id="P2"
                                            type='text'
                                            value={EmailP2}
                                            onChange={(e) => {
                                                handleInputChange2(e, setEmailP2, "P3");
                                                setVerifyErr(false);
                                            }}
                                            maxLength={1}
                                            style={{ height: "40px", width: "40px", borderRadius: 6, backgroundColor: "#EDEDEDC7", textAlign: "center", outline: "none", border: "none" }}
                                            onKeyDown={(e) => handleBackspace2(e, setEmailP2, "P1")}
                                        />
                                        <input
                                            id="P3"
                                            type='text'
                                            value={EmailP3}
                                            onChange={(e) => {
                                                handleInputChange2(e, setEmailP3, "P4");
                                                setVerifyErr(false);
                                            }}
                                            maxLength={1}
                                            style={{ height: "40px", width: "40px", borderRadius: 6, backgroundColor: "#EDEDEDC7", textAlign: "center", outline: "none", border: "none" }}
                                            onKeyDown={(e) => handleBackspace2(e, setEmailP3, "P2")}
                                        />
                                        <input
                                            id="P4"
                                            type='text'
                                            value={EmailP4}
                                            onChange={(e) => {
                                                handleInputChange2(e, setEmailP4, "P5");
                                                setVerifyErr(false);
                                            }}
                                            maxLength={1}
                                            style={{ height: "40px", width: "40px", borderRadius: 6, backgroundColor: "#EDEDEDC7", textAlign: "center", outline: "none", border: "none" }}
                                            onKeyDown={(e) => handleBackspace2(e, setEmailP4, "P3")}
                                        />
                                        <input
                                            id="P5"
                                            type='text'
                                            value={EmailP5}
                                            onChange={(e) => {
                                                handleInputChange2(e, setEmailP5, null);
                                                setVerifyErr(false);
                                            }}
                                            maxLength={1}
                                            style={{ height: "40px", width: "40px", borderRadius: 6, backgroundColor: "#EDEDEDC7", textAlign: "center", outline: "none", border: "none" }}
                                            onKeyDown={(e) => {
                                                handleBackspace2(e, setEmailP5, "P4");
                                                if (e.key === 'Enter') {
                                                    handleVerifyEmailCode();
                                                }
                                            }}
                                        />
                                    </div>

                                    <div style={{ height: 15 }}>
                                        {
                                            emailVerificationCodeErr2 &&
                                            <div style={{ fontSize: 14, fontWeight: "500", color: 'red' }}>
                                                Invalid code
                                            </div>
                                        }
                                    </div>

                                    <div className='flex flex-row gap-1 mt-6'>
                                        <div className='text-lightWhite' style={{ fontSize: 13, fontWeight: "400" }}>
                                            Didn't receive code?
                                        </div>
                                        <button className='text-purple' style={{ fontSize: 13, fontWeight: "400" }}>
                                            Resend
                                        </button>
                                    </div>
                                    <div style={{ height: 50 }}>
                                        {
                                            EmailP1 && EmailP2 && EmailP3 && EmailP4 && EmailP5 &&
                                            <div>
                                                {
                                                    verifyEmailLoader ?
                                                        <div className='w-full flex flex-row justify-center mt-8'>
                                                            <CircularProgress size={25} />
                                                        </div> :
                                                        <button onClick={handleVerifyEmailCode}
                                                            className='w-full bg-purple hover:bg-purple text-white mt-8'
                                                            style={{ fontWeight: "400", fontSize: 15, height: 50, borderRadius: '50px' }}>
                                                            Verify
                                                        </button>
                                                }
                                            </div>

                                        }
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
                {currentIndex === 5 && (
                    <div className='flex flex-col h-screen sm:justify-center justify-start' style={margin}>
                        <motion.div
                            key="box6"
                            custom={direction}
                            variants={boxVariants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{ duration: 0 }}
                            style={styles}>
                            <div className='w-full flex justify-center'>
                                <div className='w-full sm:w-10/12'>
                                    <div>
                                        <button onClick={handleBack}>
                                            <Image src={'/assets/backarrow.png'} alt='back' height={14} width={16} />
                                        </button>
                                    </div>
                                    <div className='mt-6' style={{ fontSizeL: 24, fontWeight: "600" }} onClick={handleContinue}>
                                        Add your phone number
                                    </div>
                                    <div className='text-lightWhite mt-2'>
                                        We can use this to share important updates to you
                                    </div>
                                    <div className='mt-6'>
                                        <PhoneNumberInput phonenumber={userNumber} formatErr={getNumberFormat} />
                                    </div>
                                    <div style={{ height: 15 }}>
                                        {
                                            formatError ?
                                                <div style={{ fontWeight: "400", fontSize: 14, color: "red" }}>
                                                    {formatError}
                                                </div> :
                                                <div>
                                                    {
                                                        checkUserPhoneNumberData && checkUserPhoneNumberData.status === true &&
                                                        <div style={{ fontWeight: "400", fontSize: 14, color: "green" }}>
                                                            {checkUserPhoneNumberData.message}
                                                        </div>
                                                    }
                                                    {
                                                        checkUserPhoneNumberData && checkUserPhoneNumberData.status === false &&
                                                        <div style={{ fontWeight: "400", fontSize: 14, color: "red" }}>
                                                            {checkUserPhoneNumberData.message}
                                                        </div>
                                                    }
                                                </div>
                                        }
                                    </div>
                                    <div>
                                        {
                                            checkUserPhoneNumberData && checkUserPhoneNumberData.status === true ?
                                                <div style={{ fontWeight: "400", fontSize: 14, color: "green" }}>
                                                    {
                                                        VerifiyNumberLoader ?
                                                            <div className='w-full flex flex-row justify-center mt-8'>
                                                                <CircularProgress size={20} />
                                                            </div> :
                                                            <button
                                                                onClick={(e) => sendOtp("signup")}
                                                                className='w-full mt-6 bg-purple hover:bg-purple2 text-white'
                                                                style={{ height: 50, fontSize: 15, fontWeight: "400", color: "white", borderRadius: '50px' }}>
                                                                Continue
                                                            </button>
                                                    }
                                                </div> :
                                                <div style={{ fontWeight: "400", fontSize: 14, color: "green" }}>
                                                    <button
                                                        disabled
                                                        className='w-full mt-6 bg-placeholderColor text-white'
                                                        style={{ height: 50, fontSize: 15, fontWeight: "400", color: "white", borderRadius: '50px' }}>
                                                        Continue
                                                    </button>
                                                </div>
                                        }
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
                {
                    currentIndex === 6 && (
                        <div className='flex h-screen flex-col sm:justify-center justify-start' style={margin}>
                            <motion.div
                                key="box7"
                                custom={direction}
                                variants={boxVariants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                transition={{ duration: 0 }}
                                style={styles}>
                                <div className='w-full flex justify-center'>
                                    <div className='w-full sm:w-10/12'>
                                        <div>
                                            {/* <button onClick={handleBack}>
                                                <Image src={'/assets/backarrow.png'} alt='back' height={14} width={16} />
                                            </button> */}
                                        </div>
                                        <div className='mt-6' style={{ fontSizeL: 24, fontWeight: "600" }} onClick={handleContinue}>
                                            Verify phone number.
                                        </div>
                                        <div className='text-lightWhite mt-1' style={{ fontSize: 13, fontWeight: "400" }}>
                                            4 digit code was sent to number ending with *9083
                                        </div>
                                        {/* <div className='flex flex-row gap-6 mt-8'>
                                            <input
                                                maxLength={1}
                                                type='password'
                                                style={{
                                                    height: 50, width: 50, borderRadius: 10, border: "none",
                                                    outline: "none", textAlign: "center", backgroundColor: "#EDEDEDC7",
                                                }}
                                            />
                                            <input
                                                maxLength={1}
                                                type='password'
                                                style={{
                                                    height: 50, width: 50, borderRadius: 10, border: "none",
                                                    outline: "none", textAlign: "center", backgroundColor: "#EDEDEDC7",
                                                }}
                                            />
                                            <input
                                                maxLength={1}
                                                type='password'
                                                style={{
                                                    height: 50, width: 50, borderRadius: 10, border: "none",
                                                    outline: "none", textAlign: "center", backgroundColor: "#EDEDEDC7",
                                                }}
                                            />
                                            <input
                                                maxLength={1}
                                                type='password'
                                                style={{
                                                    height: 50, width: 50, borderRadius: 10, border: "none",
                                                    outline: "none", textAlign: "center", backgroundColor: "#EDEDEDC7",
                                                }}
                                            />
                                            <input
                                                maxLength={1}
                                                type='password'
                                                style={{
                                                    height: 50, width: 50, borderRadius: 10, border: "none",
                                                    outline: "none", textAlign: "center", backgroundColor: "#EDEDEDC7",
                                                }}
                                            />
                                        </div> */}



                                        <div className='flex flex-row gap-4 mt-4'>
                                            <input
                                                id="P1"
                                                type='text'
                                                value={P1}
                                                ref={signUpref}
                                                onChange={(e) => handleInputChange(e, setP1, "P2")}
                                                maxLength={1}
                                                style={{ height: "40px", width: "40px", borderRadius: 6, backgroundColor: "#EDEDEDC7", textAlign: "center", outline: "none", border: "none" }}
                                                onKeyDown={(e) => handleBackspace(e, setP1, null)}
                                            />
                                            <input
                                                id="P2"
                                                type='text'
                                                value={P2}
                                                onChange={(e) => handleInputChange(e, setP2, "P3")}
                                                maxLength={1}
                                                style={{ height: "40px", width: "40px", borderRadius: 6, backgroundColor: "#EDEDEDC7", textAlign: "center", outline: "none", border: "none" }}
                                                onKeyDown={(e) => handleBackspace(e, setP2, "P1")}
                                            />
                                            <input
                                                id="P3"
                                                type='text'
                                                value={P3}
                                                onChange={(e) => handleInputChange(e, setP3, "P4")}
                                                maxLength={1}
                                                style={{ height: "40px", width: "40px", borderRadius: 6, backgroundColor: "#EDEDEDC7", textAlign: "center", outline: "none", border: "none" }}
                                                onKeyDown={(e) => handleBackspace(e, setP3, "P2")}
                                            />
                                            <input
                                                id="P4"
                                                type='text'
                                                value={P4}
                                                onChange={(e) => handleInputChange(e, setP4, "P5")}
                                                maxLength={1}
                                                style={{ height: "40px", width: "40px", borderRadius: 6, backgroundColor: "#EDEDEDC7", textAlign: "center", outline: "none", border: "none" }}
                                                onKeyDown={(e) => handleBackspace(e, setP4, "P3")}
                                            />
                                            <input
                                                id="P5"
                                                type='text'
                                                value={P5}
                                                onChange={(e) => handleInputChange(e, setP5, "P6")}
                                                maxLength={1}
                                                style={{ height: "40px", width: "40px", borderRadius: 6, backgroundColor: "#EDEDEDC7", textAlign: "center", outline: "none", border: "none" }}
                                                onKeyDown={(e) => handleBackspace(e, setP5, "P4")}
                                            />
                                            <input
                                                id="P6"
                                                type='text'
                                                value={P6}
                                                onChange={(e) => handleInputChange(e, setP6, null)}
                                                maxLength={1}
                                                style={{ height: "40px", width: "40px", borderRadius: 6, backgroundColor: "#EDEDEDC7", textAlign: "center", outline: "none", border: "none" }}
                                                onKeyDown={(e) => handleBackspace(e, setP6, "P5")}
                                            />
                                        </div>




                                        <div className='flex flex-row gap-1 mt-6'>
                                            <div className='text-lightWhite' style={{ fontSize: 13, fontWeight: "400" }}>
                                                Didn't receive code?
                                            </div>
                                            <button style={{ fontSize: 13, fontWeight: "400" }}>
                                                Resend
                                            </button>
                                        </div>
                                        <div style={{ height: 50 }}>
                                            {
                                                verifyCodeSignUpLoader ?
                                                    <div className='w-full flex flex-row justify-center mt-8'>
                                                        <CircularProgress size={25} />
                                                    </div> :
                                                    <button onClick={() => verifyOtp("Signup")}
                                                        className='w-full bg-purple hover:bg-purple text-white mt-8'
                                                        style={{ fontWeight: "400", fontSize: 15, height: 50, borderRadius: '50px' }}>
                                                        Verify
                                                    </button>
                                            }
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    )
                }
                {currentIndex === 7 && (
                    <div className='flex flex-col justify-center h-screen' style={{ height: "", }}>
                        <motion.div
                            key="box8"
                            custom={direction}
                            variants={boxVariants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{ duration: 0 }}
                            style={styles}>
                            <div style={{ height: "auto" }}>
                                <div style={{ height: 14 }}>
                                    {/* <button onClick={handleBack}>
                                        <Image src={'/assets/backarrow.png'} alt='back' height={14} width={16} />
                                    </button> */}
                                </div>
                                {/* <Image src={'/assets/congratulations.png'} alt='congrats' height={445} width={445} /> */}
                                <div style={{ fontSize: 24, fontWeight: "600", textAlign: ' center' }}>
                                    Congratulations
                                </div>
                                <Image
                                    src={'/congrats.png'}
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

                                <div className='w-full flex flex-col text-center justify-center mt-4' style={{ color: '#050A0885', fontWeight: '400', fontSize: 13 }}>
                                    Welcome to Voice.ai {userName}, where creators like you build a more engaging and personalized <span
                                        style={{
                                            color: '#050A0830',
                                            fontWeight: '400', fontSize: 13,
                                        }}>
                                        experience for their community. With Voice, you're able to build an AI version of yourself so people can come talk directly with your AI twin. In the next steps, we'll be creating your AI based on what makes you- you.
                                    </span>
                                </div>

                                <div className='w-full flex justify-center mt-4'>
                                    <button onClick={handleCongratsClick} className='bg-purple text-white px-6 py-2' style={{ borderRadius: "50px" }}>
                                        Continue
                                    </button>
                                </div>

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
