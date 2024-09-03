'use client'
import AddCardDetails from '@/components/loginform/Addcard/AddCardDetails';
import { Alert, CircularProgress, Fade, Snackbar } from '@mui/material';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import Image from 'next/image';
import React from 'react'
import { useState } from 'react';

const Page = () => {

    let stripePublickKey = process.env.NEXT_PUBLIC_REACT_APP_ENVIRONMENT === "Production" ? process.env.NEXT_PUBLIC_REACT_APP_STRIPE_PUBLISHABLE_KEY_LIVE : process.env.NEXT_PUBLIC_REACT_APP_STRIPE_PUBLISHABLE_KEY;
    //console.log("Public key is ", stripePublickKey)
    const stripePromise = loadStripe(stripePublickKey);

    const [selectedPlan, setSelectedPlan] = useState(null);
    const handlePlanSelect = (index) => {
        console.log("Handle plan select", index)
        if (selectedPlan === index) {
            // setSelectedPlan(null); // Deselect the card if it is already select
        } else {
            setSelectedPlan(index); // Select the card if it is not selected
            selectedPlanRef.current = index;
        }
    }

    return (
        <div className='w-full h-screen' style={{ backgroundColor: '#ffffff23' }}>
            <div className='px-4 pt-10'>
                <div style={{ fontWeight: '500', fontSize: 20, fontFamily: 'inter' }}>
                    Plans
                </div>
                <div className='mt-6 w-full flex flex-row gap-4' style={{ backgroundColor: '#ffffff50' }}>
                    <div className='w-6/12 flex flex-col items-center'>
                        <div className='w-10/12'
                            // style={{ border: '2px solid red' }}
                        >
                            <div className='flex flex-row items-center w-full px-6 rounded-xl justify-between' style={{ height: "70px", border: "1px solid #EFEFEF" }}>
                                <div style={{ fontWeight: "500", fontSize: 20, fontFamily: "inter" }}>
                                    $97/ mo
                                </div>
                                <button onClick={() => handlePlanSelect(0)}>
                                    {
                                        selectedPlan === 0 ?
                                            <Image alt='selected' style={{ borderRadius: "50%" }} src='/assets/selected.png' height={27} width={27} /> :
                                            <Image alt='selected' style={{ borderRadius: "50%" }} src='/assets/unselected.png' height={27} width={27} />
                                    }
                                </button>
                            </div>
                            <div className='items-center w-full px-6 rounded-xl justify-between' style={{ height: "70px", border: "1px solid #EFEFEF", marginTop: 50 }}>
                                <div className='w-full flex flex-row justify-end'>
                                    <div className='bg-purple text-white px-2 py-1' style={{ borderRadius: "50px", width: "fit-content", marginTop: "-18px" }}>
                                        Recomended
                                    </div>
                                </div>
                                <div className='flex flex-row items-center w-full rounded-xl justify-between'>
                                    <div style={{ fontWeight: "500", fontSize: 20, fontFamily: "inter" }}>
                                        <div style={{ fontWeight: "500", fontSize: 20, fontFamily: "inter" }}>
                                            $1200/ yr
                                        </div>
                                        <div style={{ fontWeight: "400", fontSize: 18, fontFamily: "inter" }}>
                                            Save $200 (12 %)
                                        </div>
                                    </div>
                                    <div className='flex flex-row gap-2 items-center'>
                                        <button onClick={() => handlePlanSelect(1)}>
                                            {
                                                selectedPlan === 1 ?
                                                    <Image alt='selected' style={{ borderRadius: "50%" }} src='/assets/selected.png' height={27} width={27} /> :
                                                    <Image alt='selected' style={{ borderRadius: "50%" }} src='/assets/unselected.png' height={27} width={27} />
                                            }
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className='w-full flex flex-col items-center' style={{ marginTop: 30 }}>
                                <button
                                    // onClick={handleSubscribePlan}
                                    className='w-full py-3 text-white bg-purple' style={{ borderRadius: "5px" }}>
                                    {/*
                                        subscribeLoader ?
                                            <CircularProgress size={25} /> : "Continue"
                                        */}
                                    Upgrade
                                </button>
                                <button className='mt-6 underline'
                                    style={{ color: '#FF3B3B', fontWeight: '400', fontFamily: 'inter', fontSize: 13 }}
                                >
                                    Cancel my Plan
                                </button>
                            </div>

                            <div className='mt-6' style={{ fontWeight: '500', fontSize: 15, fontFamily: 'inter' }}>
                                Payment History
                            </div>

                            <div>

                            </div>


                            {/* err msg when card not added */}
                            <Snackbar
                                // open={selectPlanErr}
                                autoHideDuration={2000}
                                // onClose={() => setSelectPlanErr(false)}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'center',
                                }}
                                TransitionComponent={Fade}
                                TransitionProps={{
                                    timeout: {
                                        enter: 1000,
                                        exit: 1000,
                                    }
                                }}
                                sx={{
                                    position: 'fixed', // Ensures it stays in place
                                    top: 20, // Adjust as needed for spacing from the top
                                    left: '50%', // Center horizontally
                                    transform: 'translateX(-50%)', // Center horizontally
                                }}
                            >
                                <Alert
                                    // onClose={() => setSelectPlanErr(false)}
                                    severity="error"
                                    sx={{
                                        width: '100%',
                                        backgroundColor: 'white', // Set background color to white
                                        color: 'black',
                                        border: "2px solid #EDEDED80"
                                    }}
                                >
                                    Select plan to continue.
                                </Alert>
                            </Snackbar>

                            {/* Err msg when card not added */}

                            <Snackbar
                                // open={subscribeFailureErr}
                                autoHideDuration={2000}
                                // onClose={() => setSubscribeFailureErr(null)}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'center',
                                }}
                                TransitionComponent={Fade}
                                TransitionProps={{
                                    timeout: {
                                        enter: 1000,
                                        exit: 1000,
                                    }
                                }}
                                sx={{
                                    position: 'fixed', // Ensures it stays in place
                                    top: 20, // Adjust as needed for spacing from the top
                                    left: '50%', // Center horizontally
                                    transform: 'translateX(-50%)', // Center horizontally
                                }}
                            >
                                <Alert
                                    // onClose={() => setSubscribeFailureErr(null)}
                                    severity="error"
                                    sx={{
                                        width: '100%',
                                        backgroundColor: 'white', // Set background color to white
                                        color: 'black',
                                        border: "2px solid #EDEDED80"
                                    }}
                                >
                                    { }
                                </Alert>
                            </Snackbar>

                        </div>
                    </div>
                    <div className='w-6/12'>
                        <div className='w-full'>
                            <div style={{ fontSize: 20, fontWeight: '400', fontFamily: 'inter', marginTop: 40 }}>
                                Make Payment
                            </div>
                            <button style={{ fontSize: 15, fontWeight: '400', fontFamily: 'inter', marginTop: 30 }}>
                                You are only charged for minutes talked
                            </button>
                            <div className='flex flex-row gap-6' style={{ marginTop: 25 }}>
                                <Image src="/assets/card.png" alt='card' height={64} width={140} />
                                <Image src="/assets/eps.png" alt='card' height={64} width={140} />
                                <Image src="/assets/giro.png" alt='card' height={64} width={140} />
                            </div>
                            <div className='w-8/12'>
                                <Elements stripe={stripePromise}>
                                    <AddCardDetails
                                        // subscribePlan={subscribePlan}
                                        fromBuildAiScreen={true}
                                    // subscribeLoader={subscribeLoaderStatus}
                                    // selectedPlan={selectedPlan}
                                    // stop={stop}
                                    />
                                </Elements>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Page