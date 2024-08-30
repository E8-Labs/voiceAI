import React, { useEffect, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js'
import { CardCvcElement, CardExpiryElement, CardNumberElement, useElements, useStripe } from '@stripe/react-stripe-js';
// import { CardPostalCodeElement } from '@stripe/react-stripe-js';
import { Alert, Button, CircularProgress, Slide, Snackbar } from '@mui/material'
import { toast } from 'react-toastify'
import axios from 'axios'
import Image from 'next/image';
import Apis from '@/components/apis/Apis';
// import Apis from '../Apis/Apis';

const AddCardDetails = ({
    subscribePlan, fromBuildAiScreen = false, closeForm, selectedPlan }) => {


    const stripeReact = useStripe();
    const elements = useElements();
    //console.log("From Build AI Screen ", fromBuildAiScreen)
    //console.log("From Build AI Screen Selected Plan", selectedPlan)
    if (!stripeReact || !elements) {
        //console.log("Stripe error here");
        //console.log("Stripe error ", stripeReact)
        //console.log("Stripe error 2 ", elements)
        return (
            <div>Loading stripe</div>
        )
    }
    else {
        //console.log("No stripe err");
    }
    const handleBackClick = (e) => {
        e.preventDefault();
        handleBack();
    }

    const [addCardLoader, setAddCardLoader] = useState(false);
    const [addNumberErr, setAddNumberErr] = useState(false);
    const [addDateErr, setAddDateErr] = useState(false);
    const [cvcErr, setCvcErr] = useState(false);
    const [credentialsErr, setCredentialsErr] = useState(false);
    const [addCardSuccess, setAddCardSuccess] = useState(false);
    const [addCardFailure, setAddCardFailure] = useState(false);
    const [addCardDetails, setAddCardDetails] = useState(null);
    // const [selectedUserPlan, setSelectedUserPlan] = useState(null);

    const elementOptions = {
        style: {
            base: {
                backgroundColor: 'transparent',
                color: '#000000',
                fontSize: '18px',
                lineHeight: '40px',
                borderRadius: 10,
                padding: 10,
                '::placeholder': {
                    color: 'gray',
                },
            },
            invalid: {
                color: 'red',
            },
        },
    };

    //code for adding card api

    // useEffect(()=>{
    //     console.log("Selected Plan changed", selectedPlan)
    // }, [selectedPlan])

    useEffect(() => {
        // const localData = localStorage.getItem('fromBuildScreen');
        // const Data = JSON.parse(localData);
        // //console.log("Data recieved from build screen", Data);
        // setfromBuildAiScreen(Data);

        const handleCustomEvent = (event) => {
            //console.log('Received event:', event.detail.message);
            // handleAddCard()
            subscribePlan();
        };

        window.addEventListener('subscribePlan', handleCustomEvent);

        // Cleanup listener on component unmount
        return () => {
            window.removeEventListener('subscribePlan', handleCustomEvent);
        };
    }, [])

    // useEffect(() => {})
    //console.log("Sending back plan ", selectedPlan)
    // let selPlan = null;

    const handleAddCard = async (e) => {

        // Check if the event object is provided and prevent the default behavior
        // if (selectedPlan) {
        //     // selPlan = selectedPlan;
        //     // setSelectedUserPlan(selectedPlan);
        //     //console.log("selected plan is ", selectedPlan);
        // }
        //console.log("Pln status i have selecetd", selectedPlan);
        // if (!selectedPlan) {
        //     console.log("No plan selected Add Card Detail")
        //     return
        // }
        // if (fromBuildAiScreen) {
        //     //console.log("plan sending in api ", selectedUserPlan)
        //     subscribePlan();
        // }
        // return
        // return
        if (stop) {
            stop(false);
        }

        // return
        if (e && e.preventDefault) {
            e.preventDefault();
        }

        // Close the modal
        // handleClose4(e);
        // return
        if (!stripeReact || !elements) {
            //console.log("Stripe error here");
            //console.log("Stripe error ", stripeReact)
            //console.log("Stripe error 2 ", elements)
            return
        }
        else {
            //console.log("No stripe err");
        }

        const cardNumberElement = elements.getElement(CardNumberElement);

        stripeReact.createToken(cardNumberElement).then(async function (tok) {
            if (tok.error) {
                setCredentialsErr(true);
                toast.error(tok.error.code, {
                    position: "bottom-right",
                    pauseOnHover: true,
                    autoClose: 8000,
                    theme: "dark"
                });
            } else if (tok.token.id) {
                // setAddCardLoader(true);
                // if (handleSubLoader) {
                //     handleSubLoader(true);
                // }
                // return
                //console.log("Token generating for card number :", tok.token.id)
                const tokenId = tok.token.id;

                const ApiPath = Apis.addCard;
                const AddCardData = {
                    source: tokenId
                }
                try {
                    const LocalData = localStorage.getItem('User');
                    const D = JSON.parse(LocalData);
                    // //console.log("Local data is", D);
                    const AuthToken = D.data.token;
                    //console.log("Token for add card ", D.data.token);
                    // return
                    //console.log('Data sending in api is :', AddCardData);
                    const response = await axios.post(ApiPath, AddCardData, {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': 'Bearer ' + AuthToken
                        }
                    });
                    if (response) {
                        //console.log("Response of add card api is", response.data);
                    }
                    if (response.status === 200) {
                        // setAddCardDetails(response.data.message);
                        if (response.data.message === "Card not added") {
                            setAddCardFailure(true);
                        } else {
                            //console.log("Here in subscribe plan else", fromBuildAiScreen)
                            setAddCardSuccess(true);
                            const callStatus = {
                                callStatus: true
                            }
                            //console.log("Testing build screen data",);

                            if (fromBuildAiScreen) {
                                //console.log("plan sending in api ", selectedUserPlan)
                                subscribePlan();
                            }
                            else {
                                //console.log("No build screen data", fromBuildAiScreen)
                            }
                            if (closeForm) { //
                                localStorage.setItem('callStatus', JSON.stringify(callStatus));
                                closeForm();
                                window.location.reload();
                            }
                        }
                    }
                } catch (error) {
                    console.error("Error occured in adding user card api is :", error);
                } finally {
                    // setAddCardLoader(false);
                }
            }
        })

    }

    //code to add card from subscription screen
    // //console.log("status on subscribe", handleSubscribePlan);
    // if (handleSubscribePlan === true) {
    //     handleAddCard();
    // }

    // const subscribePlan = async () => {
    //     console.log("Subscribing user plan ", selectedPlan)
    //     try {
    //         const localData = localStorage.getItem('User');
    //         const data = JSON.parse(localData);
    //         //console.log("Local data for subscibe plan", data.data.token);

    //         const AuthToken = data.data.token;
    //         //console.log("Auth token is", AuthToken);
    //         const ApiPath = Apis.CreateSubscription;
    //         //console.log("Api path for subscribe pla :", ApiPath);
    //         // //console.log("Subscribing plan", )
    //         // let plan = null;
    //         // if (selectedPlan) {
    //         //     plan = selectedPlan
    //         // }
    //         const dataToSend = {
    //             sub_type: selectedPlan
    //         }
    //         console.log("Data sending in api", dataToSend);
    //         return
    //         const response = await axios.post(ApiPath, dataToSend, {
    //             headers: {
    //                 "Authorization": "Bearer " + AuthToken,
    //                 "Content-Type": "application/json"
    //             }
    //         });
    //         // return
    //         if (response) {
    //             //console.log("Response of subscribe plan api is", response.data);
    //             if (response.data.status === true) {
    //                 localStorage.removeItem("fromBuildScreen");
    //                 // handleSubLoader(false);
    //                 handleContinue();
    //             }
    //         } else {
    //             //console.log("api not responded");
    //         }
    //     } catch (error) {
    //         console.error("ERROR occured in subscribePlan Api", error);

    //     }
    //     finally {
    //         // handleSubLoader(false);
    //     }
    // }



    return (
        <div style={{ width: '100%' }}>
            {
                fromBuildAiScreen ?
                    "" :
                    <div style={{ fontSize: 24, fontWeight: "600", fontFamily: "inter" }}>
                        Add Payment Method
                    </div>
            }
            <div className='mt-4'>
                <div style={{ fontWeight: "400", fontFamily: "inter", fontSize: 13, color: "#4F5B76" }}>
                    Card Number
                </div>
                <div className='mt-2 px-3 py-1' style={{ backgroundColor: "#EDEDEDC7", borderRadius: "8px" }}>
                    <CardNumberElement
                        options={elementOptions} />
                </div>
            </div>
            <div className='flex flex-row gap-2 w-full mt-8'>
                <div className='w-6/12'>
                    <div style={{ fontWeight: "400", fontFamily: "inter", fontSize: 13, color: "#4F5B76" }}>
                        Exp
                    </div>
                    <div className='mt-2 px-3 py-1' style={{ backgroundColor: "#EDEDEDC7", borderRadius: "8px" }}>
                        <CardExpiryElement
                            options={elementOptions}
                            style={{
                                width: '100%', padding: '8px',
                                color: 'white', fontSize: '22px', border: '1px solid blue', borderRadius: '4px'
                            }} />
                    </div>
                </div>
                <div className='w-6/12'>
                    <div style={{ fontWeight: "400", fontFamily: "inter", fontSize: 13, color: "#4F5B76" }}>
                        CVC
                    </div>
                    <div className='mt-2 px-3 py-1' style={{ backgroundColor: "#EDEDEDC7", borderRadius: "8px" }}>
                        <CardCvcElement
                            options={elementOptions}
                            style={{
                                width: '100%', padding: '8px',
                                color: 'white', fontSize: '22px', border: '1px solid blue', borderRadius: '4px'
                            }} />
                    </div>
                </div>
            </div>
            {/* <CardPostalCodeElement id="postal-code" options={elementOptions} /> */}
            <div className='w-full mt-6 flex justify-center'>
                {
                    addCardLoader ?
                        <div className='flex flex-row justify-end items-center mt-8 w-full'>
                            <CircularProgress size={30} />
                        </div> :
                        <div className='flex flex-row justify-end items-center mt-8 w-full'>
                            <div>
                                {
                                    !fromBuildAiScreen &&
                                    <button onClick={handleAddCard} className='bg-purple rounded px-8 text-white py-3' style={{ fontWeight: "400", fontSize: 15, borderRadius: "50px" }}>
                                        Start a call
                                    </button>
                                }
                                {/* <button onClick={handleAddCard} className='bg-purple rounded px-8 text-white py-3' style={{ fontWeight: "400", fontSize: 15, borderRadius: "50px" }}>
                                    {
                                        fromBuildAiScreen ? "Continue" : "Start a call"
                                    }
                                </button> */}
                            </div>
                        </div>
                }
            </div>
            <div>
                <Snackbar
                    open={credentialsErr}
                    autoHideDuration={3000}
                    onClose={() => {
                        setCredentialsErr(false);
                        setAddCardLoader(false);
                    }}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right'
                    }}
                    TransitionComponent={Slide}
                    TransitionProps={{
                        direction: 'left'
                    }}
                >
                    <Alert
                        onClose={() => {
                            setCredentialsErr(false);
                            setAddCardLoader(false);
                        }} severity="error"
                        sx={{ width: 'auto', fontWeight: '700', fontFamily: 'inter', fontSize: '22' }}>
                        Enter all Credientials.
                    </Alert>
                </Snackbar>
            </div>
            <div>
                <Snackbar
                    open={addCardFailure}
                    // autoHideDuration={3000}
                    onClose={() => {
                        setAddCardFailure(false)
                    }}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right'
                    }}
                    TransitionComponent={Slide}
                    TransitionProps={{
                        direction: 'left'
                    }}
                >
                    <Alert
                        onClose={() => {
                            setAddCardFailure(false)
                        }} severity="error"
                        sx={{ width: 'auto', fontWeight: '700', fontFamily: 'inter', fontSize: '22' }}>
                        {/* {addCardDetails} */}
                        Card not added
                    </Alert>
                </Snackbar>
            </div>
            <div>
                <Snackbar
                    open={addCardSuccess}
                    // autoHideDuration={3000}
                    onClose={() => {
                        setAddCardSuccess(false)
                    }}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right'
                    }}
                    TransitionComponent={Slide}
                    TransitionProps={{
                        direction: 'left'
                    }}
                >
                    <Alert
                        onClose={() => {
                            setAddCardSuccess(false)
                        }} severity="success"
                        sx={{ width: 'auto', fontWeight: '700', fontFamily: 'inter', fontSize: '22' }}>
                        {/* {addCardDetails} */}
                        Card added successfully
                    </Alert>
                </Snackbar>
            </div>
        </div>
    )
}

export default AddCardDetails