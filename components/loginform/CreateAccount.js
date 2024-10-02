'use client'
import { Alert, Box, CircularProgress, Fade, Link, Modal, Snackbar, TextField } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import PhoneNumberInput from '../PhoneNumberInput'
import axios from 'axios'
import Apis from '../apis/Apis'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { auth, RecaptchaVerifier, signInWithPhoneNumber, PhoneAuthProvider, signInWithCredential } from '../firebase.js';
// import { auth, RecaptchaVerifier, signInWithPhoneNumber, PhoneAuthProvider, signInWithCredential } from 'firebase/auth'

const CreateAccount = ({ handleContinue, handleBack, creator, modalData, closeForm, getVerificationId }) => {

    const router = useRouter();

    const nameRef = useRef(null);
    const [userPhoneNumber, setUserPhoneNumber] = useState(null);
    const [userName, setUserName] = useState("");
    const [userLastName, setUserLastName] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [userPassword, setUserPassword] = useState("");
    const [loginLoader, setLoginLoader] = useState(false);
    const [phoneNumberErr, setPhoneNumberErr] = useState(null);
    const [numberFormatError, setNumberFormatError] = useState(null);
    const [termsCheck, setTermsCheck] = useState(false);
    const [checkUserEmailData, setCheckUserEmailData] = useState(null);
    const [emailValidationError, setEmailValidationError] = useState(false);
    const [verificationId, setVerificationId] = useState('');
    const [isWideScreen, setIsWideScreen] = useState(false);
    const [userLocation, setUserLocation] = useState(null);
    const [errSnack, setErrSnack] = useState(null);
    const [openWrongNumberPopup, setOpenWrongNumberPopup] = useState(false);

    const handlePhoneNumber = (number) => {
        console.log("Number is", number);
        setUserPhoneNumber(number);
    }

    const getUserLocation = (location) => {
        console.log("User location recieved is", location.city);
        setUserLocation(location);
    }

    const handleNumberFormatErr = (status) => {
        setNumberFormatError(status);
    }

    useEffect(() => {
        nameRef.current.focus()
    }, []);

    //code for phone verification throught firebase
    useEffect(() => {
        console.log("In check Captcha")
        if (!auth) {
            console.log('No Auth Object')
            return
        }
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

    // Send OTP
    const sendOtp = async () => {
        setLoginLoader(true);
        //code to save userFormdata
        // const localAssistantData = localStorage.getItem('assistantData');
        // const AssistantData = JSON.parse(localAssistantData);
        // // console.log('AssistantData Recieved from localstorage is', AssistantData);
        // //code if assistant trial mode is true
        // let modelId = null;
        // let modelData = null
        // if (AssistantData) {
        //     console.log("Assistant trial satus is", AssistantData.assitant.allowTrial);
        //     // localStorage.setItem('LoginData', JSON.stringify(loginResponse.data));
        //     modelId = AssistantData.id;
        //     modelData = AssistantData;
        // }
        const data = {
            firstName: userName,
            lastName: userLastName,
            email: userEmail,
            phonenumber: userPhoneNumber
        }
        localStorage.setItem('formData', JSON.stringify(data));

        const userData = {
            name: userName + " " + userLastName,
            email: userEmail,
            phone: userPhoneNumber,
            password: userPassword,
            ...(userLocation && {
                city: userLocation.city,
                state: userLocation.state
            }),
            // modelId: modelId
        }
        console.log("Data for create account", userData);

        try {
            if (!userPhoneNumber) {
                console.log("Please enter a valid phone number");
                return;
            }


            const appVerifier = window.recaptchaVerifier;

            // Send OTP
            const formattedPhoneNumber = `+${userPhoneNumber.replace(/\D/g, '')}`;
            const confirmation = await signInWithPhoneNumber(auth, formattedPhoneNumber, window.recaptchaVerifier)

            setVerificationId(confirmation.verificationId);
            getVerificationId(confirmation.verificationId);
            console.log('OTP sent successfully');
            handleContinue(userData);
        }
        catch (error) {
            setErrSnack(error);
            console.error("Error during OTP sending:", error);
        } finally {
            setLoginLoader(false);
            // setIndex1Loader(false);
            // setResendCodeLoader(false);
        }
    };

    // Verify OTP
    const verifyOtp = async () => {
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
            // try {
            //     setVerifyLoader(true);
            //     const ApiPath = Apis.verifyCode;
            //     const data = {
            //         // code: VP1 + VP2 + VP3 + VP4 + VP5,
            //         phone: signinVerificationNumber,
            //         login: true
            //     }
            //     console.log('Code sendding', data);
            //     const response = await axios.post(ApiPath, data, {
            //         headers: {
            //             'Content-Type': "application/json"
            //         }
            //     });
            //     if (response) {
            //         console.log("Response of ", response.data);

            //         if (response.data.status === true) {
            //             localStorage.removeItem('signinNumber');
            //             if (fromBuyStatus) {
            //                 const Data = JSON.parse(fromBuyStatus);
            //                 window.open(`/buyproduct/${Data.id}`);
            //                 localStorage.removeItem("fromBuyScreen");
            //                 localStorage.setItem('User', JSON.stringify(response.data));
            //             }
            //             else {
            //                 if (LocalData) {
            //                     const D = JSON.parse(LocalData);
            //                     const modalName = D.modalName;
            //                     localStorage.setItem('User', JSON.stringify(response.data));
            //                     router.push(`/${modalName}`);
            //                 }
            //             }
            //             console.log("Response of login verification code", response.data.data);
            //             // router.push(`/${}`)
            //             // return
            //             localStorage.removeItem('route');
            //         } else if (response.data.status === false) {
            //             console.log("Error in verify code api");
            //             setVerifyErr(response.data.message);
            //         }
            //     } else {
            //         console.log("error");
            //     }
            // } catch (error) {
            //     console.error("Error occured in loginverification code", error);
            // } finally {
            //     setVerifyLoader(false);
            //     // setVerifyErr(false);
            // }

        } catch (error) {
            console.error("Error during OTP verification:", error);
        } finally {
            setVerifyLoader(false);
        }
    };

    //call emailValidation api
    useEffect(() => {
        if (userEmail) {
            const timeOut = setTimeout(() => {
                checkUserEmail();
            }, 500);
            return () => clearTimeout(timeOut);
        }
    }, [userEmail]);

    //code for termscheck button

    const handleTermsCheckBtn = () => {
        setTermsCheck(!termsCheck);
    }

    const handleSignInClick = () => {
        router.push("/creator/onboarding2");
        // router.push("/admin/login");
        const routePath = {
            routePath: "fromCreatorScreen",
            modalName: creator
        }
        localStorage.setItem('route', JSON.stringify(routePath));
    }


    const checkPhoneNumber = async () => {
        const verificationNumber = {
            phone: userPhoneNumber
        }
        setPhoneNumberErr(null);
        try {
            const ApiPath = Apis.checkPhone;
            const response = await axios.post(ApiPath, verificationNumber, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (response.data) {
                console.log("Response of apis is", response);
                setPhoneNumberErr(response.data)
            }
        } catch (error) {
            setPhoneNumberErr('Some error occured');
            console.error("Error occured in checknum api", error);
        }
    }

    useEffect(() => {
        if (userPhoneNumber) {
            const timeOut = setTimeout(() => {
                checkPhoneNumber();
            }, 500);
            return () => clearTimeout(timeOut)
        }
    }, [userPhoneNumber]);

    const handleLogin = async () => {
        // return
        // sendOtp();

        try {
            setLoginLoader(true);
            const localAssistantData = localStorage.getItem('assistantData');
            const AssistantData = JSON.parse(localAssistantData);
            // console.log('AssistantData Recieved from localstorage is', AssistantData);
            //code if assistant trial mode is true
            let modelId = null;
            if (AssistantData) {
                console.log("Assistant trial satus is", AssistantData.assitant.allowTrial);
                modelId = AssistantData.id;
            }
            const userData = {
                name: userName + " " + userLastName,
                email: userEmail,
                phone: userPhoneNumber,
                password: userPassword,
                ...(userLocation && {
                    city: userLocation.city,
                    state: userLocation.state
                }),
                modelId: modelId
                // phoneVerifed: 'false'
            }

            console.log("Data sending in register api is", userData)
            const loginResponse = await axios.post(Apis.verifyCode, userData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (loginResponse) {
                console.log("Response of api is", loginResponse.data);
                // return
                localStorage.setItem('LoginData', JSON.stringify(loginResponse.data));
                // sendOtp();
                if (loginResponse.data.status === true) {
                    let phoneNumber = userPhoneNumber;
                    const localAssistantData = localStorage.getItem('assistantData');
                    const AssistantData = JSON.parse(localAssistantData);
                    console.log('AssistantData Recieved from localstorage is', AssistantData);
                    //code if assistant trial mode is true
                    if (AssistantData.assitant.allowTrial === true) {
                        console.log("Assistant trial satus is", AssistantData.assitant.allowTrial);
                        localStorage.setItem('LoginData', JSON.stringify(loginResponse.data));
                        sendOtp();
                    } else {
                        //code if assistant trial mode is false also validate if the PHONE NUMBER is from US or not
                        console.log("Assistant trial status is", AssistantData.assitant.allowTrial);
                        if (phoneNumber.startsWith("1")) {
                            console.log("It is US number");
                            localStorage.setItem('LoginData', JSON.stringify(loginResponse.data));
                            sendOtp();
                        } else {
                            console.log("It is other country number");
                            setOpenWrongNumberPopup(true);
                        }
                    }
                } else {
                    console.log("Error occured is", loginResponse.data)
                    setErrSnack(loginResponse.data.message);
                }
            }
        } catch (error) {
            setLoginLoader(false);
            setErrSnack(error);
            console.error("Error occured in registerApi api is", error);
        } finally {
            // setLoginLoader(false);
        }


        // const verificationNumber = {
        //     phone: userPhoneNumber
        // }

        // try {
        //     const ApiPath = Apis.sendVerificationCode;
        //     const response = await axios.post(ApiPath, verificationNumber, {
        //         headers: {
        //             'Content-Type': 'application/json'
        //         }
        //     });
        //     if (response.status === 200) {
        //         console.log("Response of api is", response.data);
        //         handleContinue(userData);
        //     }
        // } catch (error) {
        //     console.error("Error occured in sendVC", error);
        // } finally {
        //     setLoginLoader(false)
        // }
    }


    const wrongNumberModalStyle = {
        height: 'auto',
        bgcolor: 'transparent',
        // p: 2,
        mx: 'auto',
        my: '50vh',
        transform: 'translateY(-55%)',
        borderRadius: 2,
        border: "none",
        outline: "none",
        // border: "2px solid green"
    };

    //code for email validation


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





    const checkUserEmail = async () => {
        const ApiPath = Apis.checkUserEmail;
        const data = {
            email: userEmail
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

    //code to retrive the formData data

    useEffect(() => {
        const localData = localStorage.getItem("formData");
        if (localData) {
            const Data = JSON.parse(localData);
            console.log("Form data retrived", Data);

            setUserName(Data.firstName);
            setUserLastName(Data.lastName);
            setUserEmail(Data.email);
            // setUserPhoneNumber(Data.phonenumber);
        }
        const localAssistantData = localStorage.getItem('assistantData');
        const AssistantData = JSON.parse(localAssistantData);
        console.log('AssistantData Recieved from localstorage is', AssistantData);
    }, []);

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

    //code to close form
    const handleCloseForm = () => {
        console.log("test working");
        closeForm();
    }

    //code to validate email
    const validateEmail = (email) => { // Accept email directly as a string
        // const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        // return emailPattern.test(email); // Test the email string directly
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        // Check if email contains consecutive dots, which are invalid
        if (/\.\./.test(email)) {
            return false;
        }

        // Check the general pattern for a valid email
        return emailPattern.test(email);
    };



    return (
        <div>
            <div id="recaptcha-container" />
            <div className='flex flex-row w-full justify-end'>
                <button onClick={handleCloseForm}>
                    <Image src="/assets/croseBtn.png" alt='cross' height={25} width={25} />
                </button>
            </div>
            <div className='w-full flex flex-row justify-center' style={{ marginTop: 8 }}>

                <div style={{ fontWeight: "600", fontSize: 28, textAlign: "center" }}>
                    <div style={{ fontWeight: "600", fontSize: 24, textAlign: "center" }}>
                        {modalData &&
                            <div>
                                {modalData.name ?
                                    <div>
                                        Talk to {modalData.name}
                                    </div> :
                                    <div style={{ fontWeight: "600", fontSize: 28, textAlign: "center" }}>
                                        Talk to {modalData.assitant.name}
                                    </div>}
                            </div>
                        }
                    </div>
                    {/* {
                        loginLoader ?
                            <CircularProgress size={20} /> :
                            <div style={{ fontWeight: "600", fontSize: 24, textAlign: "center" }}>
                                {modalData &&
                                    <div>
                                        {modalData.name ?
                                            <div>
                                                {modalData.name}
                                            </div> :
                                            <div style={{ fontWeight: "600", fontSize: 28, textAlign: "center" }}>
                                                {modalData.assitant.name}
                                            </div>}
                                    </div>
                                }
                            </div>
                    } */}
                </div>

            </div>
            <TextField className=' w-full'
                autofill='off'
                id="filled-basic"
                autoFocus={true}
                value={userName}
                inputRef={nameRef}
                onChange={(e) => setUserName(e.target.value)}
                // label="First Name" 
                variant="outlined"
                placeholder='First Name'
                sx={MuiFieldStyle}
                inputProps={{
                    style: {
                        color: 'black !important',  // Apply black color directly
                    },
                }}
                style={{ color: "black", marginTop: isWideScreen ? 40 : 10 }}
            />

            <TextField className=' w-full mt-6'
                autofill='off'
                id="filled-basic"
                value={userLastName}
                onChange={(e) => setUserLastName(e.target.value)}
                // label="Last Name" 
                variant="outlined"
                placeholder='Last Name'
                sx={MuiFieldStyle}
                style={{ marginTop: isWideScreen ? 30 : 15 }}
            />
            <TextField className=' w-full mt-6'
                autofill='off'
                id="filled-basic"
                value={userEmail}
                onChange={(e) => {
                    setUserEmail(e.target.value);
                    setCheckUserEmailData(null);
                    const value = e.target.value;
                    if (!validateEmail(value)) {
                        setEmailValidationError(true);
                    } else {
                        setEmailValidationError(false);
                    }
                }}
                // label="Email" 
                variant="outlined"
                placeholder='Email Address'
                sx={MuiFieldStyle}
                style={{ marginTop: isWideScreen ? 30 : 15 }}
            />
            {
                emailValidationError ?
                    <div className='mb-2' style={{ fontWeight: "400", fontSize: 12, fontFamily: "inter", color: "#FF0100", height: 15 }}>
                        Enter valid email
                    </div> :
                    <div>
                        {
                            checkUserEmailData && checkUserEmailData.status === true ?
                                <div className='mb-2' style={{ fontWeight: "400", fontSize: 12, fontFamily: "inter", color: "green", height: 15, }}>
                                    Email available
                                </div> :
                                <div className='mb-2' style={{ fontWeight: "400", fontSize: 12, fontFamily: "inter", color: "#FF0100", height: 15 }}>
                                    {checkUserEmailData && checkUserEmailData.status === false && "Email already taken, try signing in below"}
                                </div>
                        }
                    </div>
            }
            {/* <TextField className='mt-4' id="outlined-basic" label="Outlined" variant="outlined" sx={MuiFieldStyle} /> */}
            <div style={{ marginTop: isWideScreen ? 5 : 5 }}>
                <PhoneNumberInput phonenumber={handlePhoneNumber} userLocation={getUserLocation} fromCreateAccount={true} formatErr={handleNumberFormatErr} />
            </div>
            {
                numberFormatError ?
                    <div className='' style={{ fontWeight: "400", fontSize: 12, fontFamily: "inter", color: "#FF0100", height: 18 }}>
                        Enter valid number
                    </div> :
                    <div>
                        {
                            phoneNumberErr && phoneNumberErr.status === true ?
                                <div className='' style={{ fontWeight: "400", fontSize: 12, fontFamily: "inter", color: "green", height: 18 }}>
                                    {phoneNumberErr.message}
                                </div> :
                                <div className='' style={{ fontWeight: "400", fontSize: 12, fontFamily: "inter", color: "#FF0100", height: 18 }}>
                                    {phoneNumberErr && phoneNumberErr.message}{phoneNumberErr && ", try signing in below"}
                                </div>
                        }
                    </div>
            }
            {/* <TextField className=' w-full mt-4'
                autofill='off'
                type='password'
                id="filled-basic"
                value={userPassword}
                onChange={(e) => setUserPassword(e.target.value)}
                label="Password" variant="outlined"
                placeholder='Enter password.'
                sx={{
                    '& label.Mui-focused': {
                        color: '#050A08',
                        // borderColor: "red"
                    },
                    '& .MuiFilledInput-root': {
                        // color: '#050A0860',
                        fontSize: 13,
                        fontWeight: '400'
                    },
                    '& .MuiOutlinedInput-root': {
                        borderRadius: 5,
                        height: 48,
                        '&.Mui-focused fieldset': {
                            borderColor: '#00000080',
                            // backgroundColor: "#EDEDEDC7"
                        },
                    },
                }} /> */}
            <div className='flex flex-row gap-2 items-center mt-1'>
                {
                    termsCheck ?
                        <button onClick={handleTermsCheckBtn}>
                            <Image src="/assets/selected.png" height={17} width={17} />
                        </button> :
                        <button onClick={handleTermsCheckBtn}>
                            <Image src="/assets/unselected.png" height={17} width={17} />
                        </button>
                }
                <div style={{ fontSize: 13, fontWeight: "500", fontFamily: "inter" }}>
                    I agree to the
                    <button onClick={() => {
                        // window.open('https://docs.google.com/document/d/1TdicVwsq3TTUp9tKyIONcPXBcGgKxFgkFPyE9hBapBg/edit#heading=h.wcbyg6d9eki4', '_blank');
                        window.open('/buyproduct/terms', '_blank');
                    }} className='text-purple ms-1'>
                        Terms & Conditions
                    </button>
                    {/* <button onClick={() => {
                        window.open('https://tailwindcss.com/docs/height', '_blank');
                        // window.open('/buyproduct/terms', '_blank');
                    }} className='text-purple ms-1'>
                        <span className='text-black'>&</span> Privacy Policy
                    </button> */}
                </div>
            </div>
            <div className='w-full flex justify-center mt-8'>
                {
                    userEmail && userName && userPhoneNumber && termsCheck && checkUserEmailData && checkUserEmailData.status === true && phoneNumberErr && phoneNumberErr.status === true ?
                        <div className='w-full'>
                            {
                                loginLoader ?
                                    <div className='bg-none w-full flex flex-row justify-center px-8 text-white py-3' style={{ fontWeight: "400", fontSize: 15, borderRadius: "50px" }}>
                                        <CircularProgress size={20} />
                                    </div> :
                                    <button onClick={handleLogin} className='bg-purple w-full px-8 text-white py-3' style={{ fontWeight: "400", fontSize: 15, borderRadius: "50px" }}>

                                        <div>
                                            Call
                                        </div>
                                    </button>
                            }
                        </div> :
                        <button className='bg-purple2 w-full px-8 text-white py-3' style={{ fontWeight: "400", fontSize: 15, borderRadius: "50px" }}>
                            {
                                loginLoader ?
                                    <CircularProgress size={20} /> :
                                    <div>
                                        Call
                                        {/* {modalData &&
                                                        <div>
                                                            {modalData.name ?
                                                                <div>
                                                                    Call {modalData.name}
                                                                </div> :
                                                                <div>
                                                                    Call {modalData.assitant.name}
                                                                </div>}
                                                        </div>
                                                    } */}
                                    </div>
                            }
                        </button>
                }
            </div>
            <div className='flex flex-row gap-1 mt-6'>
                <div style={{ fontSize: 13, fontWeight: "400" }}>
                    Have an account?
                </div>
                <button
                    onClick={handleSignInClick}
                    className='text-purple' style={{ fontSize: 13, fontWeight: "400" }}>
                    Sign in
                </button>
            </div>
            <div>
                <Snackbar
                    open={errSnack}
                    // autoHideDuration={3000}
                    onClose={() => {
                        setErrSnack(null)
                    }}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'center'
                    }}
                    TransitionComponent={Fade}
                    TransitionProps={{
                        direction: 'center'
                    }}
                >
                    <Alert
                        onClose={() => {
                            setErrSnack(null)
                        }} severity="error"
                        sx={{ width: 'auto', fontWeight: '700', fontFamily: 'inter', fontSize: '22' }}>
                        {errSnack}
                    </Alert>
                </Snackbar>
            </div>

            <Modal
                open={openWrongNumberPopup}
                onClose={(() => setOpenWrongNumberPopup(false))}
                closeAfterTransition
                BackdropProps={{
                    timeout: 1000,
                    sx: {
                        backgroundColor: 'transparent',
                        backdropFilter: 'blur(40px)',
                    },
                }}
            >
                <Box className="lg:w-8/12 sm:w-9/12 w-full"
                    sx={wrongNumberModalStyle}
                >
                    {/* <LoginModal creator={creator} assistantData={getAssistantData} closeForm={setOpenLoginModal} /> */}
                    <div className='flex flex-row justify-center w-full'>
                        <div className='sm:w-7/12 w-full' style={{ backgroundColor: "#ffffff23", padding: 20, borderRadius: 10 }}>
                            {/* <AddCard handleBack={handleBack} closeForm={closeForm} /> */}
                            <div style={{ backgroundColor: 'white', padding: 18, borderRadius: 10 }}>
                                {/* <div className='mt-2 flex flex-row justify-between items-center'>
                                    <Image src="/assets/claimIcon.png" alt='claimimg' height={38} width={38} />
                                    <button onClick={(() => setOpenWrongNumberPopup(false))}>
                                        <Image src="/assets/crossBtn.png" alt='cross' height={14} width={14} />
                                    </button>
                                </div> */}
                                <div className='' style={{ fontWeight: '600', fontSize: 24, fontFamily: 'inter' }}>
                                    Only in the US & Canada!
                                </div>
                                <div className='text-black' style={{ fontWeight: "400", fontSize: 15, fontFamily: "inter", marginTop: 10 }}>
                                    We're not available in your country yet, but we're expanding soon! We'll keep you updated so you'll be the first to know when CreatorX launches in your region. You've been added to the waitlist!
                                </div>
                                <div className='flex flex-row justify-center mt-4 w-full' style={{ marginTop: 30 }}>
                                    <div>
                                        <button
                                            onClick={() => {
                                                // window.open("https://www.youtube.com", '_blank')
                                                closeForm();
                                                setOpenWrongNumberPopup(false);
                                            }} className='bg-purple px-6 py-2 text-white'
                                            style={{ fontWeight: "400", fontFamily: "inter", fontSize: 15, borderRadius: "50px" }}>
                                            Close
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Box>
            </Modal>

        </div>
    )
}

export default CreateAccount