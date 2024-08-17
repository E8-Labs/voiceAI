"use client"
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import Apis from '../apis/Apis'
import axios from 'axios'
import { CircularProgress } from '@mui/material'

const VerifyPhoneNumber = ({ handleBack, handleContinue, userLoginDetails, handleSignin }) => {


    const [P1, setP1] = useState("")
    const [P2, setP2] = useState("")
    const [P3, setP3] = useState("")
    const [P4, setP4] = useState("")
    const [P5, setP5] = useState("")
    const [verifyLoader, setVerifyLoader] = useState(false);
    const [showError, setShowError] = useState(null)

    const data = {
        code: P1 + P2 + P3 + P4,
        phone: userLoginDetails.phone,
    }

    useEffect(() => {
        console.log("User details are", userLoginDetails);
    }, [])




    function maskInput(event) {
        const input = event.target;
        const realValue = input.value;

        // Store the real value in a data attribute
        input.dataset.realValue = realValue;
        console.log("Real value is", realValue);


        // Replace the input value with an asterisk
        // input.value = realValue ? '*' : '';

        // Automatically move to the next input field
        if (realValue && input.nextElementSibling && input.nextElementSibling.tagName === "INPUT") {
            input.nextElementSibling.focus();
        }
    }

    function restrictToNumbers(event) {
        const key = event.key;

        if (
            key === "Backspace" || key === "Tab" || key === "Delete" ||
            key === "ArrowLeft" || key === "ArrowRight" ||
            key === "ArrowUp" || key === "ArrowDown"
        ) {
            return;
        }

        // If the key is not a number, prevent the input
        if (!/^\d$/.test(key)) {
            event.preventDefault();
        }
    }

    document.querySelectorAll('input[type="text"]').forEach(input => {
        input.addEventListener('keydown', function (event) {
            if (event.key === "Backspace") {

                input.value = ''; // Clear the current input value
                input.dataset.realValue = ''; // Clear the real value stored in the data attribute

                // Move the focus to the previous input field, if it exists
                if (input.previousElementSibling && input.previousElementSibling.tagName === "INPUT") {
                    input.previousElementSibling.focus();
                }
            }
        });
    });



    const handleVerifyClick = async () => {
        // handleContinue();
        setVerifyLoader(true);
        try {
            const response = await axios.post(Apis.verifyCode, data, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (response) {
                console.log("response of check code ", response.data);
                if (response.data.message === 'Phone verified') {
                    // handleContinue();
                    const SignUpApiPath = Apis.SignUp;
                    try {
                        const response = await axios.post(SignUpApiPath, userLoginDetails, {
                            headers: {
                                'Content-Type': 'application/json'
                            }
                        });
                        if (response.data.status === true) {
                            console.log("Response of signup api", response.data);
                            localStorage.setItem("User", JSON.stringify(response.data));
                            handleContinue();
                        } else if (response.data.status === false) {
                            console.log("Signup api response not found");
                        }
                    } catch (error) {
                        console.error("Error in login api is", error);
                    } finally {
                        setVerifyLoader(false);
                    }
                } else {
                    setShowError(response.data.message);
                }
            }
        } catch (error) {
            console.log("Error uccured in verification api is", error);
        } finally {
            setVerifyLoader(false);
        }
    }

    const handleBackClick = () => {
        handleBack()
    }


    return (
        <div>
            <div style={{ fontSize: 24, fontWeight: "600" }}>
                Verify Phone Number
            </div>
            <div className='text-lightWhite' style={{ fontSize: 13, fontWeight: "400" }}>
                6 digit code was sent to number ending with *9083
            </div>



            <div className='flex flex-row gap-4 mt-4'>
                <input
                    placeholder='*'
                    type='text'
                    value={P1}
                    onChange={(e) => setP1(e.target.value)}
                    maxLength={1}
                    style={{ height: "40px", width: "40px", borderRadius: 6, backgroundColor: "#EDEDEDC7", textAlign: "center", outline: "none", border: "none" }}
                    onInput={maskInput}
                    data-real-value=""
                    onKeyDown={restrictToNumbers}
                />
                <input
                    type='text'
                    placeholder='*'
                    value={P2}
                    onChange={(e) => setP2(e.target.value)}
                    maxLength={1}
                    style={{ height: "40px", width: "40px", borderRadius: 6, backgroundColor: "#EDEDEDC7", textAlign: "center", outline: "none", border: "none" }}
                    onInput={maskInput}
                    data-real-value=""
                    onKeyDown={restrictToNumbers}
                />
                <input
                    placeholder='*'
                    type='text'
                    value={P3}
                    onChange={(e) => setP3(e.target.value)}
                    maxLength={1}
                    style={{ height: "40px", width: "40px", borderRadius: 6, backgroundColor: "#EDEDEDC7", textAlign: "center", outline: "none", border: "none" }}
                    onInput={maskInput}
                    data-real-value=""
                    onKeyDown={restrictToNumbers}
                />
                <input
                    type='text'
                    placeholder='*'
                    value={P4}
                    onChange={(e) => setP4(e.target.value)}
                    maxLength={1}
                    style={{ height: "40px", width: "40px", borderRadius: 6, backgroundColor: "#EDEDEDC7", textAlign: "center", outline: "none", border: "none" }}
                    onInput={maskInput}
                    data-real-value=""
                    onKeyDown={restrictToNumbers}
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
                        <Image src={"/assets/backArrow.png"} alt='backArrow' height={9} width={13} />
                    </button>
                </div>
                <div>
                    <button onClick={handleVerifyClick} className='bg-purple rounded px-8 text-white py-3' style={{ fontWeight: "400", fontSize: 15 }}>
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
                    Sign in Instead
                </button>
            </div>
        </div>
    )
}

export default VerifyPhoneNumber