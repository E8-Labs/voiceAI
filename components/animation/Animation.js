"use client";
import {
  Button,
  CircularProgress,
  IconButton,
  InputAdornment,
  Modal,
  TextField,
  Visibility,
  VisibilityOff,
} from "@mui/material";
import Box from "@mui/material/Box";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import PhoneNumberInput from "../PhoneNumberInput";
import Apis from "../apis/Apis";
import axios from "axios";
import { useRouter } from "next/navigation";
// import animationData from "../../public/congratsanimation.json";
import Lottie from "lottie-react";
// const animationData = require('../../public/congratsanimation.json');

import {
  auth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  PhoneAuthProvider,
  signInWithCredential,
} from "../firebase.js";
import zIndex from "@mui/material/styles/zIndex";
import VerifyPhoneNumber from "../loginform/VerifyPhoneNumber";
import SigninNumberInput from "../signin/SigninNumberInput";
import Congrats from "./Congrats";

const boxVariants = {
  enter: (direction) => ({
    x: direction > 0 ? "100%" : "-100%",
    opacity: 0.4,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction) => ({
    x: direction < 0 ? "100%" : "-100%",
    opacity: 0.4,
  }),
};

export default function Animation({ onChangeIndex }) {
  const router = useRouter();
  const lottieRef = useRef();
  const inputFocusRef = useRef(null);
  const aiNameRef = useRef(null);
  const aiEmailRef = useRef(null);
  const emailVerifyInput = useRef(null);
  const signUpref = useRef(null);
  const inputRefs = useRef(null);
  // const

  useEffect(() => {
    const LocalData = localStorage.getItem("route");
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
  const [checkUserPhoneNumberData, setCheckUserPhoneNumberData] =
    useState(null);
  const [formatError, setFormatError] = useState(null);
  const [userEmail, setUserEmail] = useState("");
  const [userPhoneNumber, setUserPhoneNumber] = useState("");
  const [debounceValue, setDebounceValue] = useState("");
  const [userPassword, setUserPassword] = useState("");
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
  const [signinVerificationNumber, setSigninVerificationNumber] =
    useState(null);
  const [openWrongNumberPopup, setOpenWrongNumberPopup] = useState(false);
  const [emailValidationError, setEmailValidationError] = useState(false);
  const [sendEmailCodeLoader, setSendEmailCodeLoader] = useState(false);

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
  const [emailVerificationCodeErr, setEmailVerificationCodeErr] =
    useState(null);

  const [verificationId, setVerificationId] = useState("");
  const [otp, setOtp] = useState([]);
  const [emailVerificationCodeErr2, setEmailVerificationCodeErr2] =
    useState(null);
  const [isHighScreen, setIsHighScreen] = useState(false);
  const [isWideScreen, setIsWideScreen] = useState(false);
  const [isWideScreen2, setIsWideScreen2] = useState(false);
  const [verifyCodeSignUpLoader, setVerifyCodeSignUpLoader] = useState(false);
  const [verifyPhoeCodeErr, setverifyPhoeCodeErr] = useState(null);

  const gifBackgroundImage = {
    backgroundImage: 'url("/assets/applogo2.png")', // Ensure the correct path
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    width: isHighScreen ? "570px" : "350px",
    height: isHighScreen ? "570px" : "350px",
    borderRadius: "50%",
    resize: "cover",
    // border: '2px solid green'
  };

  const emailInputRefs = useRef([]);

  // Auto-focus the first input field on component mount
  useEffect(() => {
    if (currentIndex === 4) {
      console.log("It is index", currentIndex);
      if (emailInputRefs.current[0]) {
        console.log("Trying to focus");
        emailInputRefs.current[0].focus();
      }
    }
  }, [currentIndex]);

  useEffect(() => {
    if (!auth) {
      return;
    }
    console.log("Init recaptcha");
    // Initialize RecaptchaVerifier when 'auth' changes
    window.recaptchaVerifier = new RecaptchaVerifier(
      auth,
      "recaptcha-container",
      {
        size: "invisible",
        callback: (response) => {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
          // ...
        },
        "expired-callback": () => {
          // Response expired. Ask user to solve reCAPTCHA again.
          // ...
        },
      }
    );
    // Cleanup function for RecaptchaVerifier if you want you can add
    return () => {
      window.recaptchaVerifier.clear();
    };
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
          console.log("Please enter a valid phone number", userPhoneNumber);
          return;
        }

        // Send OTP
        const formattedPhoneNumber = `+${userPhoneNumber.replace(/\D/g, "")}`;
        const confirmation = await signInWithPhoneNumber(
          auth,
          formattedPhoneNumber,
          window.recaptchaVerifier
        );

        setVerificationId(confirmation.verificationId);
        console.log("OTP sent successfully");
        console.log("Event valus is", e);

        if (e === "Resend") {
          return;
        } else {
          handleContinue();
        }
      } catch (error) {
        console.error("Error during OTP sending:", error);
        setverifyPhoeCodeErr(error);
      } finally {
        setVerifiyNumberLoader(false);
        // setIndex1Loader(false);
        // setResendCodeLoader(false);
      }
    } else if (e === "Resend") {
      // return
      try {
        setResendCodeLoader(true);
        if (!userPhoneNumber) {
          console.log("Please enter a valid phone number", userPhoneNumber);
          return;
        }

        const appVerifier = window.recaptchaVerifier;

        // Send OTP
        const formattedPhoneNumber = `+${userPhoneNumber.replace(/\D/g, "")}`;
        const confirmation = await signInWithPhoneNumber(
          auth,
          formattedPhoneNumber,
          window.recaptchaVerifier
        );

        setVerificationId(confirmation.verificationId);
        console.log("OTP sent successfully");
        if (e === "Resend") {
          return;
        } else {
          handleContinue();
        }
      } catch (error) {
        console.error("Error during OTP sending:", error);
      } finally {
        setIndex1Loader(false);
        setResendCodeLoader(false);
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
        const formattedPhoneNumber = `+${signinVerificationNumber.replace(
          /\D/g,
          ""
        )}`;
        const confirmation = await signInWithPhoneNumber(
          auth,
          formattedPhoneNumber,
          window.recaptchaVerifier
        );

        setVerificationId(confirmation.verificationId);
        console.log("OTP sent successfully");
        if (e === "Resend") {
          return;
        } else {
          console.log("Number setting is", signinVerificationNumber);
          localStorage.setItem('SigninNumber', JSON.stringify(signinVerificationNumber));
          handleContinue();
        }
      } catch (error) {
        console.error("Error during OTP sending:", error);
      } finally {
        setIndex1Loader(false);
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
        let OtpCode = P1 + P2 + P3 + P4 + P5 + P6;
        console.log("Otp code sending in firebase", OtpCode);
        console.log("Verification id :", verificationId);

        // return
        // const credential = auth.PhoneAuthProvider.credential(verificationId, OtpCode);
        // await auth.signInWithCredential(credential);

        const credential = PhoneAuthProvider.credential(
          verificationId,
          OtpCode
        );
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
            username: userName,
            email: userEmail,
            login: false,
            role: "creator",
          };
          console.log("Code sendding", data);
          // return
          const response = await axios.post(ApiPath, data, {
            headers: {
              "Content-Type": "application/json",
            },
          });
          if (response) {
            console.log("Response of ", response.data);

            if (response.data.status === true) {
              localStorage.setItem("User", JSON.stringify(response.data));
              localStorage.removeItem("signinNumber");
              console.log(
                "Response of login verification code",
                response.data.data
              );
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

        console.log(
          "Otp sending in firebase",
          VP1 + VP2 + VP3 + VP4 + VP5 + VP6
        );
        let OtpCode = VP1 + VP2 + VP3 + VP4 + VP5 + VP6;
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
              localStorage.setItem("User", JSON.stringify(response.data));
              localStorage.removeItem("signinNumber");
              if (response.data.data.user.role == "admin") {
                router.push(`/admin/admin`);
              } else if (fromBuyStatus) {
                const Data = JSON.parse(fromBuyStatus);
                window.open(`/buyproduct/${Data.id}`);
                localStorage.removeItem("fromBuyScreen");
              } else {
                if (LocalData) {
                  const D = JSON.parse(LocalData);
                  const modalName = D.modalName;
                  // localStorage.setItem("User", JSON.stringify(response.data));
                  router.push(`/${modalName}`);
                } else {
                  console.log("I am from onboarding flow");
                  console.log(
                    "Response of api for login is",
                    response.data.data
                  );
                  // router.push('')
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
      username: userName,
    };
    try {
      const response = await axios.post(ApiPath, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.data) {
        console.log("Response of check name api is", response.data);
        setCheckUserNameData(response.data);
      }
    } catch (error) {
      console.error("Error occured in checkusername api", error);
    }
  };

  useEffect(() => {
    if (currentIndex === 1 && inputFocusRef.current) {
      // Using a small timeout to ensure rendering of the input after animation
      console.log("Focusing on verify code");
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
      console.log("Ai name ref", aiNameRef);
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
  };

  //code for email verification code sending
  const handleVerifyEmail = async (e) => {
    // setVerifyEmailLoader(true);
    try {
      setSendEmailCodeLoader(true);
      const ApiPath = Apis.EmailVerificationCode;
      const data = {
        email: userEmail,
        // code: P1 + P2 + P3 + P4 + P5
      };
      console.log("Data sending in verify code email", data);
      const response = await axios.post(ApiPath, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response) {
        console.log("Api response of verify code api", response.data);
        if (response.data.status === true) {
          // handleContinue()
          if (e === "resendcode") {
            console.log("Conde resent sucessfull");
          } else {
            handleContinue();
            setSendEmailCodeLoader(false);
          }
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
  };

  //code for verify email verification code
  const handleVerifyEmailCode = async () => {
    setVerifyEmailLoader(true);
    // setSendEmailCodeLoader(true);
    try {
      const ApiPath = Apis.verifyEmail;
      const data = {
        email: userEmail,
        code: EmailP1 + EmailP2 + EmailP3 + EmailP4 + EmailP5,
      };
      console.log("Data sending in verify code email", data);
      const response = await axios.post(ApiPath, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response) {
        console.log("Api response of verify code api", response.data);
        if (response.data.status === true) {
          handleContinue();
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
  };

  //code to show number format err
  const handleErr = (err) => {
    console.log("Err", err);
    setNumberFormatErr(err);
  };

  //code for navigating to 3rd flow from congrats
  const handleCongratsClick = () => {
    console.log("Trying to move");
    router.push("/creator/buildscript");
  };

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
      email: emailValue,
    };
    try {
      const response = await axios.post(ApiPath, data, {
        headers: {
          "Content-Type": "application/json",
        },
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
  };

  //code to validate email
  const validateEmail = (email) => {
    // Accept email directly as a string
    // const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    // return emailPattern.test(email);
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    // Check if email contains consecutive dots, which are invalid
    if (/\.\./.test(email)) {
      return false;
    }

    // Check the general pattern for a valid email
    return emailPattern.test(email);
  };

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
      phone: userPhoneNumber,
    };
    const ApiPath = Apis.checkPhone;
    console.log("Data sending in api", data);
    try {
      const response = await axios.post(ApiPath, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response) {
        if (response.data) {
          console.log("Response of check number is", response);
          setCheckUserPhoneNumberData(response.data);
        }
      } else {
        console.log("No response");
      }
    } catch (error) {
      console.error("Error occured in checknumber api", error);
    }
  };

  // useEffect(() => {
  //     console.log('Check log 1')
  //     if (userPhoneNumber) {
  //         const timer = setTimeout(() => {
  //             checkPhoneNumber();
  //             console.log('Check log 2')
  //         }, 300);
  //         return () => clearTimeout(timer);
  //     }
  // }, [userPhoneNumber]);
  useEffect(() => {
    console.log("Check log 1");
    if (userPhoneNumber) {
      const timer = setTimeout(() => {
        checkPhoneNumber();
        console.log("Check log 2");
      }, 300); // Debounce the API call by 300ms
      return () => clearTimeout(timer); // Clean up the timeout
    }
  }, [debounceValue]);

  //code for login back
  const handleLogin = async (e) => {
    setResendCodeLoader(true);
    if (e) {
      console.log("E value is", e);
    } else {
      console.log("No event");
    }
    // return
    // let sent = await sendOtp();

    let phoneNumber = signinVerificationNumber;
    const localAssistantData = localStorage.getItem("assistantData");
    const AssistantData = JSON.parse(localAssistantData);
    console.log("AssistantData Recieved from localstorage is", AssistantData);
    //code if assistant trial mode is true
    if (AssistantData?.assitant.allowTrial === true) {
      setIndex1Loader(true);
      // return
      let sent = await sendOtp();
    } else {
      if (phoneNumber.startsWith("1")) {
        console.log("It is US number");
        // localStorage.setItem('LoginData', JSON.stringify(loginResponse.data));
        setIndex1Loader(true);
        // return
        let sent = await sendOtp();
      } else {
        console.log("It is other country number");
        setOpenWrongNumberPopup(true);
        // setVerifiyNumberLoader(false);
      }
    }
  };

  //signup click
  const handleSignUpContinue = () => {
    const LocalData = localStorage.getItem("route");
    if (LocalData) {
      const Data = JSON.parse(LocalData);
      const path = Data.modalName;
      console.log("Data from main screen", path);

      router.push(`/${path}?from=signin`);
      localStorage.removeItem("route");
      localStorage.removeItem("signinNumber");
    } else {
      setDirection(2);
      setCurrentIndex((prevIndex) => prevIndex + 2);
    }
  };

  const handleContinue = () => {
    // handleCurrentIndex();
    setDirection(1);
    setCurrentIndex((prevIndex) => prevIndex + 1);
  };

  const handleCaller_toCreator_Continue = () => {
    setDirection(4);
    setCurrentIndex((prevIndex) => prevIndex + 4);
  };

  //code when user want to become creator
  const handleCreatorClick = async () => {
    const LocalData = localStorage.getItem("User");
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
        role: "creator",
      };
      console.log("Data sending in api is", data);
      try {
        const response = await axios.post(ApiPath, data, {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + AuthToken,
          },
        });
        if (response) {
          console.log(
            "Response of caller_to_creator api is",
            response.data.data
          );
          // return
          if (response.data.status === true) {
            Data.data.user = response.data.data;
            localStorage.setItem("User", JSON.stringify(Data));
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
      handleContinue();
    }
  };

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
    onChangeIndex(currentIndex);
  }, [currentIndex]);

  const userNumber = (phone) => {
    console.log("check log 3", phone);
    setUserPhoneNumber(phone);
    setDebounceValue(phone + Date.now());
  };

  const getNumberFormat = (status) => {
    console.log("Format error is", status);
    setFormatError(status);
    setCheckUserPhoneNumberData(null);
  };

  //code for verifyphone
  const handlePhoneVerificationClick = async () => {
    const verificationNumber = {
      phone: userPhoneNumber,
    };

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
  };

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
    // position: 'relative',
    // height: '40vh',
    width: "100%",
    overflow: "hidden",
    // backgroundColor: "blue"
  };

  const styles = {
    // position: 'absolute', // Ensures the boxes are stacked on top of each other
    // top: '0',
    // left: 0,
    // right: 0,
    // bottom: 0,
    backgroundColor: "",
    // height: "20vh",
    // marginLeft: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    // marginInline: 10,
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
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  //code for verification code whe user sign in
  //code for moving to next field
  // const handleInputChange2 = (e, setFunc, nextInputId) => {
  //   const value = e.target.value;
  //   if (value.length === 1) {
  //     setFunc(value); // Update the current field
  //     if (nextInputId) {
  //       document.getElementById(nextInputId).focus(); // Move to the next field
  //     }
  //   }
  // };

  // const handleBackspace2 = (e, setFunc, prevInputId) => {
  //   if (e.key === "Backspace") {
  //     setFunc(""); // Clear the current field
  //     if (e.target.value === "" && prevInputId) {
  //       document.getElementById(prevInputId).focus(); // Move to the previous field
  //     }
  //   }
  // };

  const handleInputChange3 = (e, index) => {
    const value = e.target.value;
    if (value.length > 1) {
      // Handle multi-character input (i.e., paste or autofill)
      const otpArray = value.split("").slice(0, 6);
      setOtp(otpArray);
      otpArray.forEach((digit, idx) => {
        inputRefs.current[idx].value = digit;
      });
      if (otpArray.length < 6) {
        inputRefs.current[otpArray.length].focus();
      }
    } else {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      if (value !== "" && index < 5) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  const handleBackspace3 = (e, index) => {
    if (e.key === "Backspace") {
      if (otp[index] === "" && index > 0) {
        inputRefs.current[index - 1].focus();
      }
      const newOtp = [...otp];
      newOtp[index] = "";
      setOtp(newOtp);
    }
  };

  // const handlePaste = (e) => {
  //   e.preventDefault();
  //   const paste = e.clipboardData.getData("text").split("");
  //   paste.forEach((char, index) => {
  //     if (index < 6) {
  //       const inputId = `P${index + 1}`;
  //       const input = document.getElementById(inputId);
  //       if (input) {
  //         input.value = char;
  //         input.dispatchEvent(new Event("input", { bubbles: true })); // Trigger input change event
  //       }
  //     }
  //   });
  // };

  // const handlePaste = (e) => {
  //   // Prevent the default paste action
  //   e.preventDefault();

  //   // Get the pasted data as text
  //   const pastedData = e.clipboardData.getData("text");

  //   // If pasted data is not empty
  //   if (pastedData) {
  //     // Iterate over the pasted data and set the values
  //     pastedData.split("").forEach((char, index) => {
  //       // Check the id of each input element and set the corresponding state
  //       if (index === 0) setP1(char);
  //       if (index === 1) setP2(char);
  //       if (index === 2) setP3(char);
  //       if (index === 3) setP4(char);
  //       if (index === 4) setP5(char);
  //       if (index === 5) setP6(char);
  //     });
  //   }
  // };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData("text").slice(0, 6); // Ensure we only take 6 digits
    const values = pasteData.split("");

    // Distribute values across input fields
    values.forEach((value, index) => {
      const inputId = `P${index + 1}`;
      const input = document.getElementById(inputId);
      if (input) {
        input.value = value;
        handleInputChange(
          { target: { value } },
          eval(`setP${index + 1}`),
          `P${index + 2}`
        );
      }
    });
  };

  const handlePhoneOtpInputChange = (e, setValue, nextId) => {
    const value = e.target.value;
    if (value.length <= 1 && /^[0-9]*$/.test(value)) {
      setValue(value);
      if (nextId && value) {
        const nextInput = document.getElementById(nextId);
        if (nextInput) {
          nextInput.focus();
        }
      }
    }
  };

  const loginBoxesstyle = {
    height: "40px",
    width: "40px", //isWideScreen2 ? "40px" : "30px", width: isWideScreen2 ? "40px" : "30px",
    borderRadius: 6,
    backgroundColor: "red",
    textAlign: "center",
    outline: "2px solid red",
    border: "2px solid red",
  };

  const boxStyle = {
    height: isWideScreen ? "40px" : "30px",
    width: isWideScreen ? "40px" : "30px",
    borderRadius: 6,
    backgroundColor: "#EDEDEDC7",
    textAlign: "center",
    outline: "none",
    border: "none",
  };

  const handleVerifyLoginCode = async () => {
    setVerifyLoader(true);
    verifyOtp();
  };

  //code for hiding the bordercolor
  const MuiFieldStyle = {
    "& label.Mui-focused": {
      color: "black",
    },
    "& .MuiFilledInput-root": {
      fontSize: 13,
      fontWeight: "400",
    },
    "& .MuiOutlinedInput-root": {
      borderRadius: 2,
      height: "48px",
      backgroundColor: "#EDEDEDC7",
      color: "black",
      "& fieldset": {
        borderColor: "transparent",
      },
      "&:hover fieldset": {
        borderColor: "transparent",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#00000000",
        // backgroundColor: "#EDEDEDC7",
        color: "#000000",
      },
      "& .MuiOutlinedInput-input": {
        color: "black !important",
      },
      "&.Mui-focused .MuiOutlinedInput-input": {
        color: "black !important",
      },
    },
  };

  const margin = {
    // marginTop: '25%'
    // border: '2px solid red'
  };

  const wrongNumberModalStyle = {
    height: "auto",
    bgcolor: "transparent",
    // p: 2,
    mx: "auto",
    my: "50vh",
    transform: "translateY(-55%)",
    borderRadius: 2,
    border: "none",
    outline: "none",
    // border: "2px solid green"
  };

  return (
    <div style={containerStyles}>
      <div id="recaptcha-container" />
      <AnimatePresence initial={false} custom={direction}>
        {currentIndex === 0 && (
          <div
            className="flex flex-col h-auto sm:justify-center justify-start pb-12"
            style={margin}
          >
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
              <div className="w-full">
                <div style={{ fontSize: 24, fontWeight: "600" }}>Sign in</div>
                <div
                  className="text-lightWhite"
                  style={{ fontSize: 13, fontWeight: "400" }}
                >
                  Good to have you back!
                </div>
                <div className="w-full lg:w-8/12 flex flex-row gap-6 mt-8">
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

                  {/* <PhoneNumberInput
                    fromSignIn={true}
                    formatErr={handleErr}
                    phonenumber={SignInNumber}
                  /> */}

                  <SigninNumberInput
                    fromSignIn={true}
                    formatErr={handleErr}
                    phonenumber={SignInNumber}
                    autoFocus={true}
                  />
                </div>

                {numberFormatErr ? (
                  <div
                    className="mt-2"
                    style={{
                      fontWeight: "400",
                      fontSize: 12,
                      fontFamily: "inter",
                      color: "#FF0100",
                      height: 13,
                    }}
                  >
                    {numberFormatErr}
                  </div>
                ) : (
                  ""
                )}

                {/* <div className='mt-2'>
                                    <button style={{ color: "#552AFF", fontSize: 13, fontWeight: "400" }}>
                                        <u>
                                            Reset Password
                                        </u>
                                    </button>
                                </div> */}
                <div
                  className="mt-6 w-full lg:w-8/12"
                  style={{ color: "white" }}
                >
                  {index1Loader ? (
                    <div className="w-full flex flex-row justify-center">
                      <CircularProgress size={25} />
                    </div>
                  ) : (
                    <div>
                      {numberFormatErr || signinVerificationNumber === null ? (
                        <button
                          className="bg-purple2 text-white w-full" //onClick={handleLogin}
                          style={{
                            fontSize: 15,
                            fontWeight: "400",
                            height: "52px",
                            borderRadius: "50px",
                          }}
                        >
                          Continue
                        </button>
                      ) : (
                        <button
                          className="bg-purple text-white w-full"
                          onClick={() => handleLogin()}
                          style={{
                            fontSize: 15,
                            fontWeight: "400",
                            height: "52px",
                            borderRadius: "50px",
                          }}
                        >
                          Continue
                        </button>
                      )}
                    </div>
                  )}
                </div>
                <div className="mt-6 flex flex-row items-center gap-1">
                  <div style={{ fontSize: 12, fontWeight: "400" }}>Or</div>
                  <button
                    onClick={handleSignUpContinue}
                    style={{ fontSize: 15, fontWeight: "500" }}
                  >
                    Signup
                  </button>
                </div>
                <Modal
                  open={openWrongNumberPopup}
                  onClose={() => setOpenWrongNumberPopup(false)}
                  closeAfterTransition
                  BackdropProps={{
                    timeout: 1000,
                    sx: {
                      backgroundColor: "transparent",
                      backdropFilter: "blur(40px)",
                    },
                  }}
                >
                  <Box
                    className="lg:w-8/12 sm:w-9/12 w-full"
                    sx={wrongNumberModalStyle}
                  >
                    {/* <LoginModal creator={creator} assistantData={getAssistantData} closeForm={setOpenLoginModal} /> */}
                    <div className="flex flex-row justify-center w-full">
                      <div
                        className="sm:w-7/12 w-full"
                        style={{
                          backgroundColor: "#ffffff23",
                          padding: 20,
                          borderRadius: 10,
                        }}
                      >
                        {/* <AddCard handleBack={handleBack} closeForm={closeForm} /> */}
                        <div
                          style={{
                            backgroundColor: "white",
                            padding: 18,
                            borderRadius: 10,
                          }}
                        >
                          {/* <div className='mt-2 flex flex-row justify-between items-center'>
                                    <Image src="/assets/claimIcon.png" alt='claimimg' height={38} width={38} />
                                    <button onClick={(() => setOpenWrongNumberPopup(false))}>
                                        <Image src="/assets/crossBtn.png" alt='cross' height={14} width={14} />
                                    </button>
                                </div> */}
                          <div
                            className=""
                            style={{
                              fontWeight: "600",
                              fontSize: 24,
                              fontFamily: "inter",
                            }}
                          >
                            Only in the US & Canada!
                          </div>
                          <div
                            className="text-black"
                            style={{
                              fontWeight: "400",
                              fontSize: 15,
                              fontFamily: "inter",
                              marginTop: 10,
                            }}
                          >
                            We're not available in your country yet, but we're
                            expanding soon! We'll keep you updated so you'll be
                            the first to know when CreatorX launches in your
                            region. You've been added to the waitlist!
                          </div>
                          <div
                            className="flex flex-row justify-center mt-4 w-full"
                            style={{ marginTop: 30 }}
                          >
                            <div>
                              <button
                                onClick={() => {
                                  // window.open("https://www.youtube.com", '_blank')
                                  // closeForm();
                                  setOpenWrongNumberPopup(false);
                                }}
                                className="bg-purple px-6 py-2 text-white"
                                style={{
                                  fontWeight: "400",
                                  fontFamily: "inter",
                                  fontSize: 15,
                                  borderRadius: "50px",
                                }}
                              >
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
            </motion.div>
          </div>
        )}
        {currentIndex === 1 && (
          <div
            className="flex flex-col h-auto sm:justify-center justify-start"
            style={margin}
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
            >
              <div className="w-full">
                <div>
                  <button onClick={handleBack}>
                    <Image
                      src={"/assets/backarrow.png"}
                      alt="back"
                      height={14}
                      width={16}
                    />
                  </button>
                </div>
                <div
                  className="text-lightWhite mt-4"
                  style={{
                    fontWeight: "500",
                    fontSize: 15,
                    fontFamily: "inter",
                  }}
                >
                  Enter verification code sent
                  {/* {Number(signinVerificationNumber.slice(-4))} */}
                </div>
                {/* <div className="flex flex-row gap-4 mt-4" onPaste={handlePaste}>
                  <input
                    id="P1"
                    ref={inputFocusRef}
                    inputMode="numeric"
                    pattern="[0-9]*"
                    type="text"
                    value={VP1}
                    onChange={(e) => {
                      handleInputChange2(e, setVP1, "P2");
                      setVerifyErr(false);
                    }}
                    maxLength={1}
                    style={loginBoxesstyle}
                    onKeyDown={(e) => handleBackspace2(e, setVP1, null)}
                  />
                  <input
                    id="P2"
                    type="text"
                    value={VP2}
                    inputMode="numeric"
                    pattern="[0-9]*"
                    onChange={(e) => {
                      handleInputChange2(e, setVP2, "P3");
                      setVerifyErr(false);
                    }}
                    maxLength={1}
                    style={loginBoxesstyle}
                    onKeyDown={(e) => handleBackspace2(e, setVP2, "P1")}
                  />
                  <input
                    id="P3"
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    value={VP3}
                    onChange={(e) => {
                      handleInputChange2(e, setVP3, "P4");
                      setVerifyErr(false);
                    }}
                    maxLength={1}
                    style={loginBoxesstyle}
                    onKeyDown={(e) => handleBackspace2(e, setVP3, "P2")}
                  />
                  <input
                    id="P4"
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    value={VP4}
                    onChange={(e) => {
                      handleInputChange2(e, setVP4, "P5");
                      setVerifyErr(false);
                    }}
                    maxLength={1}
                    style={loginBoxesstyle}
                    onKeyDown={(e) => handleBackspace2(e, setVP4, "P3")}
                  />
                  <input
                    id="P5"
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    value={VP5}
                    onChange={(e) => {
                      handleInputChange2(e, setVP5, "P6");
                      setVerifyErr(false);
                    }}
                    maxLength={1}
                    style={loginBoxesstyle}
                    onKeyDown={(e) => {
                      handleBackspace2(e, setVP5, "P4");
                      // if (e.key === 'Enter') {
                      //     handleVerifyLoginCode();
                      // }
                    }}
                  />
                  <input
                    id="P6"
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    value={VP6}
                    onChange={(e) => {
                      handleInputChange2(e, setVP6, null);
                      setVerifyErr(false);
                    }}
                    maxLength={1}
                    style={loginBoxesstyle}
                    onKeyDown={(e) => {
                      handleBackspace2(e, setVP6, "P5");
                      if (e.key === "Enter") {
                        handleVerifyLoginCode();
                      }
                    }}
                  />
                </div> */}

                {/* <div className='flex flex-row gap-2 sm:gap-4 mt-4' style={{ backgroundColor: 'red' }}>
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      id={`P${index + 1}`}
                      ref={(el) => (inputRefs.current[index] = el)}
                      autoFocus={index === 0} // Auto focus only on the first input
                      type="text"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      value={digit}
                      onChange={(e) => {
                        handleInputChange3(e, index);
                        setVerifyErr(false);
                      }}
                      maxLength={1}
                      style={boxStyle}
                      onKeyDown={(e) => {
                        handleBackspace3(e, index);
                        if (otp.length === 6 && e.key === "Enter") {
                          handleVerifyLoginCode();
                        }
                      }}
                      autoComplete="one-time-code" // For iOS autofill
                    />
                  ))}
                </div> */}

                <div className="w-full md:w-8/12">
                  <VerifyPhoneNumber
                    currentIndex={currentIndex}
                    signinVerificationNumber={signinVerificationNumber}
                    fromSignInPage={true} //setVerifyErr={setVerifyErr} setVerifyLoader={setVerifyLoader}
                    verificationId={verificationId}
                    handleContinue={handleContinue}
                  />
                </div>

                {/* <div>
                  {verifyErr && (
                    <div
                      className="mt-2"
                      style={{
                        fontWeight: "400",
                        fontSize: 12,
                        fontFamily: "inter",
                        color: "#FF0100",
                      }}
                    >
                      {verifyErr}
                    </div>
                  )}
                </div>

                <div
                  className="mt-8 w-full md:w-8/12"
                  style={{ color: "white" }}
                >
                  {verifyLoader ? (
                    <div className="w-full mt-4 flex flex-row justify-center">
                      <CircularProgress size={30} />
                    </div>
                  ) : (
                    <button
                      onClick={handleVerifyLoginCode}
                      className="bg-purple hover:bg-purple text-white rounded w-full"
                      style={{
                        fontSize: 15,
                        fontWeight: "400",
                        height: "52px",
                        borderRadius: "50px",
                      }}
                    >
                      Continue
                    </button>
                    // <div>
                    //   {VP1 && VP2 && VP3 && VP4 && VP5 && VP6 ? (
                    //     <button
                    //       onClick={handleVerifyLoginCode}
                    //       className="bg-purple hover:bg-purple text-white rounded w-full"
                    //       style={{
                    //         fontSize: 15,
                    //         fontWeight: "400",
                    //         height: "52px",
                    //         borderRadius: "50px",
                    //       }}
                    //     >
                    //       Continue
                    //     </button>
                    //   ) : (
                    //     <button
                    //       disabled
                    //       // onClick={handleVerifyLoginCode}
                    //       className="bg-purple2 hover:bg-purple2 text-white rounded w-full"
                    //       style={{
                    //         fontSize: 15,
                    //         fontWeight: "400",
                    //         height: "52px",
                    //         borderRadius: "50px",
                    //         color: "white",
                    //       }}
                    //     >
                    //       Continue
                    //     </button>
                    //   )}
                    // </div>
                  )}
                </div>
                {resendCodeLoader ? (
                  <CircularProgress className="mt-4 ms-6" size={20} />
                ) : (
                  <button
                    // onClick={(e) => handleLogin(e)}
                    onClick={(e) => sendOtp("Resend")}
                    className="text-purple mt-2"
                    style={{
                      fontSize: 15,
                      fontWeight: "500",
                      fontFamily: "inter",
                    }}
                  >
                    Resend Code
                  </button>
                )} */}

                {/* <div className="mt-8 w-full md:w-6/12">
                  <VerifyPhoneNumber currentIndex={currentIndex} userPhoneNumber={userPhoneNumber} />
                </div> */}

                {/* <div className="mt-4 flex flex-row items-center gap-1">
                  <div style={{ fontSize: 12, fontWeight: "400" }}>Or</div>
                  <button
                    onClick={handleSignUpContinue}
                    style={{
                      fontSize: 15,
                      fontWeight: "500",
                      fontFamily: "inter",
                    }}
                  >
                    Signup
                  </button>
                </div> */}
                {/* Err msg when not verified */}
              </div>
            </motion.div>
          </div>
        )}
        {currentIndex === 2 && (
          <div
            className="flex flex-col h-auto sm:justify-center justify-start"
            style={margin}
          >
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
              <div className="w-full flex justify-center">
                <div
                  className="w-full" //sm:w-full'
                >
                  <div>
                    <button onClick={handleBack}>
                      <Image
                        src={"/assets/backarrow.png"}
                        alt="back"
                        height={14}
                        width={16}
                      />
                    </button>
                  </div>
                  <div
                    className="mt-6"
                    style={{ fontSize: 24, fontWeight: "600" }}
                    onClick={handleContinue}
                  >
                    First, claim your unique url
                  </div>
                  <div
                    className="text-lightWhite mt-2"
                    style={{
                      fontSize: 13,
                      fontWeight: "400",
                      marginBottom: 50,
                    }}
                  >
                    Yes, the good ones are still available
                  </div>

                  <TextField
                    className="w-full sm:w-full lg:w-8/12"
                    autofill="off"
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
                    placeholder="Name your AI"
                    sx={MuiFieldStyle}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment
                          position="start"
                          style={{
                            color: "blue",
                            fontSize: 14,
                            fontWeight: "bold",
                            marginRight: 2,
                          }}
                        >
                          mycreatorx.com/
                        </InputAdornment>
                      ),
                      style: {
                        color: "black",
                        fontSize: 15,
                        fontWeight: "400",
                      },
                    }}
                  />

                  <div className="mt-2" style={{ height: 15 }}>
                    {checkUserNameData && checkUserNameData.status === true ? (
                      <div
                        className="mt-2"
                        style={{
                          fontWeight: "400",
                          fontSize: 12,
                          color: "green",
                        }}
                      >
                        {checkUserNameData.message}
                      </div>
                    ) : (
                      <div>
                        {checkUserNameData &&
                          checkUserNameData.status === false && (
                            <div
                              className="text-red mt-2"
                              style={{ fontWeight: "400", fontSize: 12 }}
                            >
                              Username is already taken, try something different
                            </div>
                          )}
                      </div>
                    )}
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

                  <div
                    className="w-full sm:w-full lg:w-8/12"
                    style={{ height: "55px" }}
                  >
                    <div>
                      {userName ? (
                        <div>
                          {checkUserNameData &&
                            checkUserNameData.status === true ? (
                            <div
                              style={{
                                fontWeight: "400",
                                fontSize: 14,
                                color: "green",
                              }}
                            >
                              {creatorLoader ? (
                                <div className="w-full mt-10 flex flex-row justify-center">
                                  <CircularProgress size={25} />
                                </div>
                              ) : (
                                <button
                                  onClick={handleCreatorClick}
                                  className="bg-purple hover:bg-purple text-white w-full mt-12"
                                  style={{
                                    fontSize: 15,
                                    fontWeight: "400",
                                    height: "44px",
                                    borderRadius: "50px",
                                  }}
                                >
                                  Continue
                                </button>
                              )}
                            </div>
                          ) : (
                            <div
                              style={{
                                fontWeight: "400",
                                fontSize: 14,
                                color: "green",
                              }}
                            >
                              <button
                                // disabled
                                className="bg-placeholderColor text-white rounded w-full mt-10"
                                style={{
                                  fontSize: 15,
                                  fontWeight: "400",
                                  height: "44px",
                                  color: "white",
                                  borderRadius: "50px",
                                }}
                              >
                                Continue
                              </button>
                            </div>
                          )}
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>

                  <div
                    className="mt-12 flex flex-row items-center gap-1"
                    style={{ height: "30px" }}
                  >
                    <div style={{ fontSize: 12, fontWeight: "400" }}>Or</div>
                    <button
                      onClick={handleMoveLogin}
                      className="text-purple"
                      style={{ fontSize: 12, fontWeight: "500" }}
                    >
                      Login
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
        {currentIndex === 3 && (
          <div
            className="flex flex-col h-auto sm:justify-center justify-start"
            style={margin}
          >
            <motion.div
              key="box4"
              custom={direction}
              variants={boxVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0 }}
              style={styles}
            >
              <div className="w-full flex justify-center">
                <div className="w-full sm:w-full">
                  <div>
                    <button onClick={handleBack}>
                      <Image
                        style={{ backgroundColor: "" }}
                        src="/assets/backarrow.png"
                        alt="back"
                        height={14}
                        width={16}
                      />
                    </button>
                  </div>
                  <div
                    className="mt-6 text-lightWhite"
                    style={{ fontWeight: "400", fontSize: 13 }}
                  >
                    app.mycreatorx.com/{userName} is all yours!
                  </div>
                  <div
                    className="mt-6"
                    style={{ fontSize: 24, fontWeight: "600" }}
                    onClick={handleContinue}
                  >
                    What's your email address?
                  </div>
                  <div className="w-full flex flex-row gap-6 mt-8">
                    <TextField
                      className=" w-full mt-6 sm:w-full lg:w-8/12"
                      autofill="off"
                      id="filled-basic"
                      type="email"
                      autoFocus={true}
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
                                return () => clearTimeout(timeout);
                              }
                            }
                          }, 1000);
                          return () => clearTimeout(timer);
                        }
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          handleVerifyEmail();
                        }
                      }}
                      // label="Email"
                      variant="outlined"
                      placeholder="Email Address"
                      sx={MuiFieldStyle}
                    />
                  </div>
                  <div className="mt-2" style={{ height: 14 }}>
                    {emailValidationError ? (
                      <div
                        style={{
                          fontWeight: "400",
                          fontSize: 12,
                          fontFamily: "inter",
                          color: "#FF0100",
                          height: 13,
                        }}
                      >
                        Enter valid email
                      </div>
                    ) : (
                      <div>
                        {emailVerificationCodeErr ? (
                          <div
                            style={{
                              fontWeight: "400",
                              fontSize: 12,
                              color: "red",
                              height: 14,
                            }}
                          >
                            {emailVerificationCodeErr}
                          </div>
                        ) : (
                          <div>
                            {checkUserEmailData &&
                              checkUserEmailData.status === true && (
                                <div
                                  style={{
                                    fontWeight: "400",
                                    fontSize: 12,
                                    color: "green",
                                    height: 14,
                                  }}
                                >
                                  Email Available
                                </div>
                              )}
                            {checkUserEmailData &&
                              checkUserEmailData.status === false && (
                                <div
                                  style={{
                                    fontWeight: "400",
                                    fontSize: 12,
                                    color: "red",
                                    height: 14,
                                  }}
                                >
                                  {checkUserEmailData.message}
                                </div>
                              )}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                  <div //style={{ height: '44px' }}
                  >
                    {userEmail ? (
                      <div>
                        {sendEmailCodeLoader ? (
                          <div className="w-full sm:w-full lg:w-8/12 flex flex-row justify-center mt-8">
                            <CircularProgress size={25} />
                          </div>
                        ) : (
                          <div>
                            {checkUserEmailData &&
                              checkUserEmailData.status === true ? (
                              <div
                                style={{
                                  fontWeight: "400",
                                  fontSize: 14,
                                  color: "green",
                                }}
                              >
                                <button
                                  // onClick={handleVerifyEmail}
                                  onClick={handleContinue}
                                  sx={{ textDecoration: "none" }}
                                  className="bg-purple hover:bg-purple w-full sm:w-full lg:w-8/12 mt-8"
                                  style={{
                                    fontSize: 15,
                                    fontWeight: "400",
                                    color: "white",
                                    height: "44px",
                                    borderRadius: "50px",
                                  }}
                                >
                                  Continue
                                </button>
                              </div>
                            ) : (
                              <div
                                style={{
                                  fontWeight: "400",
                                  fontSize: 14,
                                  color: "green",
                                }}
                              >
                                <button
                                  // disabled
                                  // onClick={handleContinue}
                                  sx={{ textDecoration: "none" }}
                                  className="bg-placeholderColor w-full sm:w-full lg:w-8/12 mt-8"
                                  style={{
                                    fontSize: 15,
                                    fontWeight: "400",
                                    color: "white",
                                    height: "44px",
                                    borderRadius: "50px",
                                  }}
                                >
                                  Continue
                                </button>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    ) : (
                      <div
                        className="w-full sm:w-full lg:w-8/12 flex flex-row justify-center mt-8"
                        style={{ height: "44px", backgroundColor: "" }}
                      />
                    )}
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
        {/* {currentIndex === 4 && (
          <div
            className="flex flex-col h-auto sm:justify-center justify-start"
            style={margin}
          >
            <motion.div
              key="box5"
              custom={direction}
              variants={boxVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0 }}
              style={styles}
            >
              <div className="w-full flex justify-center">
                <div className="w-full sm:w-full">
                  <div>
                    <button onClick={handleBack}>
                      <Image
                        src={"/assets/backarrow.png"}
                        alt="back"
                        height={14}
                        width={16}
                      />
                    </button>
                  </div>
                  <div
                    className="mt-6"
                    style={{ fontSize: 24, fontWeight: "600" }}
                    onClick={handleContinue}
                  >
                    Verify email address.
                  </div>
                  <div
                    className="text-lightWhite mt-3"
                    style={{ fontSize: 13, fontWeight: "400" }}
                  >
                    code was sent to {userEmail.slice(0, 4)}*********@gmail.com
                  </div>

                  <div className="flex flex-row gap-4 mt-8">
                    {["P1", "P2", "P3", "P4", "P5"].map((id, index) => (
                      <input
                        key={id}
                        id={id}
                        type="text" // Keep it as text to avoid spinners
                        inputMode="numeric" // Still allow numeric input on mobile devices
                        pattern="[0-9]*"
                        value={eval(`Email${id}`)} // Dynamically access EmailP1, EmailP2, etc.
                        ref={(el) => (emailInputRefs.current[index] = el)}
                        onChange={(e) => {
                          const value = e.target.value;
                          // Handle pasting
                          if (value.length > 1) {
                            const values = value.split("");
                            values.forEach((digit, idx) => {
                              if (idx + index < 5) {
                                handleInputChange2({ target: { value: digit } }, eval(`setEmailP${index + idx + 1}`), idx + index < 4 ? `P${index + idx + 2}` : null);
                              }
                            });
                            setVerifyErr(false);
                          } else if (/^[0-9]{0,1}$/.test(value)) {
                            handleInputChange2(e, eval(`setEmailP${index + 1}`), index < 4 ? `P${index + 2}` : null);
                            setVerifyErr(false);
                          }
                        }}
                        style={{
                          height: "40px",
                          width: "40px",
                          borderRadius: 6,
                          backgroundColor: "#EDEDEDC7",
                          textAlign: "center",
                          outline: "none",
                          border: "none",
                          WebkitAppearance: "none", // Remove spinner arrows
                          MozAppearance: "textfield", // Remove spinner arrows in Firefox
                        }}
                        onKeyDown={(e) => {
                          if (e.key === "Backspace") {
                            handleBackspace2(e, eval(`setEmailP${index + 1}`), index > 0 ? `P${index}` : null);
                          }
                          if (e.key === "Enter" && index === 4) {
                            handleVerifyEmailCode();
                          }
                        }}
                      />
                    ))}
                  </div>


                  <div style={{ height: 15 }}>
                    {emailVerificationCodeErr2 && (
                      <div
                        style={{
                          fontSize: 12,
                          fontWeight: "400",
                          color: "red",
                        }}
                      >
                        Invalid code
                      </div>
                    )}
                  </div>

                  <div className="flex flex-row gap-1 mt-6">
                    <div
                      className="text-lightWhite"
                      style={{ fontSize: 12, fontWeight: "400" }}
                    >
                      Didn't receive code?
                    </div>
                    {sendEmailCodeLoader ? (
                      <CircularProgress size={20} sx={{ marginLeft: 1 }} />
                    ) : (
                      <button
                        onClick={() => {
                          handleVerifyEmail("resendcode");
                        }}
                        className=""
                        style={{
                          fontSize: 12,
                          fontWeight: "400",
                          color: "#050A08",
                        }}
                      >
                        Resend
                      </button>
                    )}
                  </div>
                  <div //style={{ height: 50 }}
                  >
                    {EmailP1 && EmailP2 && EmailP3 && EmailP4 && EmailP5 && (
                      <div>
                        {verifyEmailLoader ? (
                          <div className="w-full sm:w-full lg:w-8/12 flex flex-row justify-center mt-8">
                            <CircularProgress size={25} />
                          </div>
                        ) : (
                          <button
                            onClick={handleVerifyEmailCode}
                            className="w-full sm:w-full lg:w-8/12 bg-purple hover:bg-purple text-white mt-8"
                            style={{
                              fontWeight: "400",
                              fontSize: 15,
                              height: 50,
                              borderRadius: "50px",
                            }}
                          >
                            Verify
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )} */}
        {currentIndex === 4 && (
          <div
            className="flex flex-col h-auto sm:justify-center justify-start pb-24"
            style={margin}
          >
            <motion.div
              key="box5"
              custom={direction}
              variants={boxVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0 }}
              style={styles}
            >
              <div className="w-full flex justify-center">
                <div className="w-full sm:w-full">
                  <div>
                    <button onClick={handleBack}>
                      <Image
                        src={"/assets/backarrow.png"}
                        alt="back"
                        height={14}
                        width={16}
                      />
                    </button>
                  </div>
                  <div
                    className="mt-6"
                    style={{ fontSize: 24, fontWeight: "600" }}
                    onClick={handleContinue}
                  >
                    Add your phone number
                  </div>
                  <div className="text-lightWhite mt-2">
                    We use this to share important updates with you
                  </div>
                  <div className="mt-12 w-full sm:w-full lg:w-8/12">
                    <PhoneNumberInput
                      phonenumber={userNumber}
                      formatErr={getNumberFormat}
                    />
                  </div>
                  <div style={{ height: 15 }}>
                    {formatError ? (
                      <div
                        style={{
                          fontWeight: "400",
                          fontSize: 12,
                          color: "red",
                        }}
                      >
                        {formatError}
                      </div>
                    ) : (
                      <div>
                        {checkUserPhoneNumberData &&
                          checkUserPhoneNumberData.status === true && (
                            <div
                              style={{
                                fontWeight: "400",
                                fontSize: 12,
                                color: "green",
                              }}
                            >
                              {checkUserPhoneNumberData.message}
                            </div>
                          )}
                        {checkUserPhoneNumberData &&
                          checkUserPhoneNumberData.status === false && (
                            <div
                              style={{
                                fontWeight: "400",
                                fontSize: 12,
                                color: "red",
                              }}
                            >
                              {checkUserPhoneNumberData.message}
                            </div>
                          )}
                      </div>
                    )}
                  </div>
                  <div>
                    {checkUserPhoneNumberData &&
                      checkUserPhoneNumberData.status === true ? (
                      <div
                        style={{
                          fontWeight: "400",
                          fontSize: 14,
                          color: "green",
                        }}
                      >
                        {VerifiyNumberLoader ? (
                          <div className="w-full sm:w-full lg:w-8/12 flex flex-row justify-center mt-8">
                            <CircularProgress size={20} />
                          </div>
                        ) : (
                          <button
                            onClick={(e) => sendOtp("signup")}
                            className="w-full sm:w-full lg:w-8/12 mt-6 bg-purple hover:bg-purple text-white"
                            style={{
                              height: 50,
                              fontSize: 15,
                              fontWeight: "400",
                              color: "white",
                              borderRadius: "50px",
                            }}
                          >
                            Continue
                          </button>
                        )}
                      </div>
                    ) : (
                      <div
                        style={{
                          fontWeight: "400",
                          fontSize: 14,
                          color: "green",
                        }}
                      >
                        <button
                          disabled
                          className="w-full sm:w-full lg:w-8/12 mt-6 bg-placeholderColor text-white"
                          style={{
                            height: 50,
                            fontSize: 15,
                            fontWeight: "400",
                            color: "white",
                            borderRadius: "50px",
                          }}
                        >
                          Continue
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
        {currentIndex === 5 && (
          <div
            className="flex flex-col h-auto sm:justify-center justify-start"
            style={margin}
          >
            <motion.div
              key="box6"
              custom={direction}
              variants={boxVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0 }}
              style={styles}
            >
              <div className="w-full flex justify-center">
                <div className="w-full sm:w-full">
                  <div>
                    <button onClick={handleBack}>
                      <Image
                        src={"/assets/backarrow.png"}
                        alt="back"
                        height={14}
                        width={16}
                      />
                    </button>
                  </div>
                  <div
                    className="mt-6"
                    style={{ fontSizeL: 24, fontWeight: "600" }}
                    onClick={handleContinue}
                  >
                    Verify phone number.
                  </div>
                  <div
                    className="text-lightWhite mt-3"
                    style={{ fontSize: 13, fontWeight: "400" }}
                  >
                    6 digit code was sent to number ending in{" "}
                    {Number(userPhoneNumber.slice(-4))}
                  </div>

                  <div className="flex flex-row gap-4 mt-8">
                    {["P1", "P2", "P3", "P4", "P5", "P6"].map((id, index) => (
                      <input
                        key={id}
                        id={id}
                        type="text"
                        inputMode="numeric"
                        pattern="[0-9]*"
                        value={eval(id)}
                        ref={index === 0 ? signUpref : null}
                        autoFocus={index === 0}
                        onChange={(e) =>
                          handlePhoneOtpInputChange(
                            e,
                            eval(`set${id}`),
                            `P${index + 2}`
                          )
                        }
                        maxLength={1}
                        style={{
                          height: "40px",
                          width: "40px",
                          borderRadius: 6,
                          backgroundColor: "#EDEDEDC7",
                          textAlign: "center",
                          outline: "none",
                          border: "none",
                        }}
                        onKeyDown={(e) =>
                          handleBackspace(
                            e,
                            eval(`set${id}`),
                            index > 0 ? `P${index}` : null
                          )
                        }
                        onPaste={(e) => handlePaste(e)}
                      />
                    ))}
                  </div>

                  <div>
                    {verifyPhoeCodeErr ? <div>{verifyPhoeCodeErr}</div> : ""}
                  </div>

                  <div className="flex flex-row gap-1 mt-6">
                    <div
                      className="text-lightWhite"
                      style={{ fontSize: 13, fontWeight: "400" }}
                    >
                      Didn't receive code?
                    </div>
                    {resendCodeLoader ? (
                      <CircularProgress className="mt-4 ms-6" size={20} />
                    ) : (
                      <button
                        style={{ fontSize: 13, fontWeight: "400" }}
                        // onClick={() => {
                        // }}
                        onClick={(e) => {
                          console.log("Number is", userPhoneNumber);
                          sendOtp("Resend");
                        }}
                      >
                        Resend
                      </button>
                    )}
                  </div>
                  <div //style={{ height: 50 }}
                  >
                    {verifyCodeSignUpLoader ? (
                      <div className="w-full sm:w-full lg:w-8/12 flex flex-row justify-center mt-8">
                        <CircularProgress size={25} />
                      </div>
                    ) : (
                      <button
                        onClick={() => verifyOtp("Signup")}
                        className="w-full bg-purple sm:w-full lg:w-8/12 hover:bg-purple text-white mt-8"
                        style={{
                          fontWeight: "400",
                          fontSize: 15,
                          height: 50,
                          borderRadius: "50px",
                        }}
                      >
                        Verify
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
        {currentIndex === 6 && (
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              height: "100%",
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "",
              width: "100%",
            }}
          >
            <Box
              sx={{
                position: "relative",
                //   width: "100%",
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "",
                width: "100%",
              }}
            >
              <Box
                sx={{
                  position: "absolute",
                  zIndex: 2,
                  display: "flex",
                  justifyContent: "start",
                  alignItems: "start",
                  top: -10,
                  width: "100%",
                  // left: 0,
                  backgroundColor: "",
                }}
              >
                <Lottie
                  animationData={require("/public/congratsanimation.json")}
                  lottieRef={lottieRef}
                  loop={true}
                  style={{ height: "250px", width: "250px" }}
                  onComplete={() => {
                    lottieRef.current.goToAndStop(3, true);
                  }}
                />
              </Box>

              <Box
                sx={{
                  position: "absolute",
                  zIndex: 2,
                  display: "flex",
                  justifyContent: "end",
                  alignItems: "start",
                  top: -10,
                  width: "100%",
                  // left: 0,
                  backgroundColor: "",
                }}
              >
                <Lottie
                  animationData={require("/public/congratsanimation.json")}
                  lottieRef={lottieRef}
                  loop={true}
                  style={{ height: "250px", width: "250px" }}
                  onComplete={() => {
                    lottieRef.current.goToAndStop(3, true);
                  }}
                />
              </Box>

              <Box
                sx={{
                  zIndex: 1,
                  position: "relative",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "100%",
                  height: "100%",
                  backgroundColor: "",
                }}
              >
                <div
                  className="flex flex-col justify-center h-screen"
                  style={{ backgroundColor: "" }}
                >
                  <motion.div
                    key="box7"
                    custom={direction}
                    variants={boxVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0 }}
                  //   style={styles}
                  // style={{ marginTop: -50, zIndex: 3 }}
                  >
                    {/* <div style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: '', marginTop: -80 }}>
                      <div
                        className="w-full flex flex-row justify-center"
                        // style={{ marginTop: 20 }}
                      >
                        <div
                          style={gifBackgroundImage}
                          className="flex flex-row justify-center items-center"
                        >
                          <Image
                            src="/mainAppGif3.gif"
                            alt="gif"
                            style={{
                              backgroundColor: "",
                              borderRadius: "50%",
                              height: isHighScreen ? "580px" : "350px",
                              width: isHighScreen ? "580px" : "350px",
                            }}
                            height={600}
                            width={600}
                          />
                        </div>
                      </div>

                      <div className="-mt-16">
                        <div
                          style={{
                            fontSize: 24,
                            fontWeight: "600",
                            textAlign: "center",
                          }}
                        >
                          Congratulations!
                        </div>
                        <div
                          style={{
                            fontSize: 16,
                            fontWeight: "500",
                            textAlign: "center",
                          }}
                        >
                          Your account has been created. Let's build your AI!
                        </div>
                      </div>

                      <div className="w-full flex justify-center mt-4">
                        <button
                          onClick={() => {
                            console.log("Trying to move");
                            router.push("/creator/buildscript");
                          }}
                          className="bg-purple text-white px-6 py-2"
                          style={{ borderRadius: "50px", }}>
                          Continue
                        </button>
                      </div>

                    </div> */}
                    <Congrats />
                  </motion.div>
                </div>
              </Box>
            </Box>
          </Box>
        )}
      </AnimatePresence>
    </div>
  );
}
