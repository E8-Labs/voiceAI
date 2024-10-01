'use client'
import AddCardDetails from '@/components/loginform/Addcard/AddCardDetails';
import AddCreatorProfile from '@/components/loginform/Addcard/AddCreatorProfileCard';
import { Alert, CircularProgress, Fade, Snackbar } from '@mui/material';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import Image from 'next/image';
import React from 'react'
import { useState } from 'react';

const Page = () => {

    const [selectMonthlyPlan, setSelectMonthlyPlan] = useState(false);
    const [selectYearlylyPlan, setSelectYearlylyPlan] = useState(false);
    const [addCardStatus, setAddCardStatus] = useState(false);
    const [addCardData, setAddCardData] = useState(null);
    const [selectPlanErr, setSelectPlanErr] = useState(false);
    const [upgradePlanLoader, setUpgradePlanLoader] = useState(false);

    const monthlyPlanClick = (e) => {
        console.log("Plan value is", e)
        setSelectMonthlyPlan(!selectMonthlyPlan);
        setSelectYearlylyPlan(false);
    }

    const yearlyPlanClick = () => {
        setSelectMonthlyPlan(false);
        setSelectYearlylyPlan(!selectYearlylyPlan);
    }


    //code for adding carddetails
    let stripePublickKey = process.env.NEXT_PUBLIC_REACT_APP_ENVIRONMENT === "Production" ? process.env.NEXT_PUBLIC_REACT_APP_STRIPE_PUBLISHABLE_KEY_LIVE : process.env.NEXT_PUBLIC_REACT_APP_STRIPE_PUBLISHABLE_KEY;
    console.log("Public key is ", stripePublickKey)
    const stripePromise = loadStripe(stripePublickKey);

    const handleUpgradePlanClick = (loaderStat) => {
        if (selectMonthlyPlan || selectYearlylyPlan === true) {
            setUpgradePlanLoader(true);
            setAddCardStatus(true);
        } else {
            setSelectPlanErr(true);
            console.log("Select a plan to continue")
        }
    }

    const handleLoaderStatus = (stat) => {
        setUpgradePlanLoader(stat)
    }

    const getAddCardData = (data) => {
        console.log("Add card details recieved are", data);
        setAddCardData(data);
    }

    return (
        <div className='w-full h-screen px-8' style={{ backgroundColor: '#ffffff23' }}>
            <div className='flex flex-row w-full'>
                <div className='w-6/12 flex flex-col items-center' style={{ marginTop: 50 }}>
                    <div className='w-10/12' style={{ fontWeight: "400", fontSize: 20, fontFamily: "inter" }}>
                        Plans
                    </div>
                </div>
            </div>
            <div className='flex flex-row w-full' style={{ backgroundColor: "#ffffff40" }}>
                <div className='w-6/12 flex flex-col items-center' style={{ marginTop: 50 }}>
                    <div className='w-10/12 flex flex-row items-center justify-between px-8 bg-white py-4 rounded' style={{ height: "54px" }}>
                        <div style={{ fontWeight: "500", fontSize: 20, fontFamily: "inter" }}>
                            $97 / mo
                        </div>
                        <div className='flex flex-row items-center gap-6'>
                            {
                                selectMonthlyPlan && (
                                    <div>
                                        Current plan
                                    </div>
                                )
                            }
                            {
                                selectMonthlyPlan ?
                                    <button onClick={() => monthlyPlanClick()} className='bg-purple flex flex-row justify-center items-center' style={{ height: "26px", width: "26px", borderRadius: "50%", }}>
                                        {/* <Image src='/assets/Tick.png' alt='selected' height={10} width={6} /> */}
                                        <img src='/assets/Tick.png' alt='tick' style={{ height: "10px", width: "14px" }} />
                                    </button> :
                                    <button onClick={() => monthlyPlanClick(0)} className='border-2 border-purple' style={{ height: "26px", width: "26px", borderRadius: "50%", border: "" }} />
                            }
                        </div>
                    </div>

                    <div className='flex flex-row justify-end w-10/12 me-28' style={{ marginTop: 35 }}>
                        <div className='bg-purple text-white text-center py-1 px-4 -mb-4'
                            style={{
                                borderRadius: "45px",
                                fontSize: 12, fontFamily: "inter",
                                fontWeight: '400',
                                zIndex: 1
                            }}>
                            Recomended
                        </div>
                    </div>
                    <div className='w-10/12 flex flex-row items-center justify-between px-8 bg-white py-4 rounded' style={{ height: "82px" }}>
                        <div>
                            <div style={{ fontWeight: "500", fontSize: 20, fontFamily: "inter" }}>
                                $1200 / yr
                            </div>
                            <div style={{ fontWeight: "400", fontSize: 13, fontFamily: "inter" }}>
                                Saved $200 ( 12%)
                            </div>
                        </div>
                        <div className='flex flex-row items-center gap-6'>
                            {
                                selectYearlylyPlan && (
                                    <div>
                                        Current plan
                                    </div>
                                )
                            }
                            {
                                selectYearlylyPlan ?
                                    <button onClick={yearlyPlanClick} className='bg-purple flex flex-row justify-center items-center' style={{ height: "26px", width: "26px", borderRadius: "50%", }}>
                                        {/* <Image src='/assets/Tick.png' alt='selected' height={10} width={6} /> */}
                                        <img src='/assets/Tick.png' alt='tick' style={{ height: "10px", width: "14px" }} />
                                    </button> :
                                    <button onClick={yearlyPlanClick} className='border-2 border-purple' style={{ height: "26px", width: "26px", borderRadius: "50%", border: "" }} />
                            }
                        </div>
                    </div>

                    <div className='w-10/12'>
                        {
                            upgradePlanLoader ?
                                <div className='w-full py-4 items-center flex justify-center mt-12'>
                                    <CircularProgress size={25} />
                                </div> :
                                <button onClick={handleUpgradePlanClick} className='mt-12 py-4 w-full rounded text-white bg-purple' style={{ fontWeight: "400", fontFamily: 'inter', fontSize: 15 }}>
                                    Upgrade
                                </button>
                        }
                        <button className='underline text-center w-full mt-8 text-[#FF3B3B]'>
                            Cancel My Plan
                        </button>
                        <div className='mt-6' style={{ fontWeight: "400", fontSize: 15, fontFamily: "inter" }}>
                            Payment History
                        </div>
                        <div className='mt-12 flex flex-flow justify-between items-start'>
                            <div>
                                <div style={{ fontweight: "400", fontSize: 13, fontFamily: "inter" }}>
                                    INV-990
                                </div>
                                <div className='mt-2' style={{ fontweight: "400", fontSize: 11, fontFamily: "inter" }}>
                                    21 May 2024
                                </div>
                            </div>
                            <div className='flex flex-flow gap-12'>
                                <div style={{ fontWeight: "600", fontSize: 13, fontFamily: "inter" }}>
                                    $97
                                </div>
                                <div className='text-purple underline' style={{ fontWeight: "600", fontSize: 13, fontFamily: "inter" }}>
                                    PDF
                                </div>
                            </div>
                        </div>
                    </div>


                </div>
                <div className='w-6/12'>
                    <div className='me-8 mt-8 p-6' style={{ backgroundColor: "#ffffff60", }}>
                        <div className='p-4' style={{ backgroundColor: "#ffffff60", }}>
                            <div style={{ fontweight: "500", fontFamily: "inter", fontSize: 20 }}>
                                Make Payment
                            </div>
                            <div style={{ fontSize: 15, fontweight: "400", fontFamily: "inter", marginTop: 25 }}>
                                You're only charged for minutes talked
                            </div>
                            <div className='flex flex-row gap-6' style={{ marginTop: 25 }}>
                                <Image src="/assets/card.png" alt='card' height={64} width={140} />
                                <Image src="/assets/eps.png" alt='card' height={64} width={140} />
                                <Image src="/assets/giro.png" alt='card' height={64} width={140} />
                            </div>

                            <Elements stripe={stripePromise}>
                                {/* <AddCardDetails fromCreatorProfile={true} /> */}
                                <AddCreatorProfile addCardStatus={addCardStatus} getAddCardData={getAddCardData} handleLoaderStatus={handleLoaderStatus} />
                            </Elements>

                        </div>
                    </div>
                </div>
                <div>
                    <Snackbar
                        open={selectPlanErr}
                        autoHideDuration={3000}
                        onClose={() => {
                            setSelectPlanErr(false);
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
                                setSelectPlanErr(false);
                            }} severity="error"
                            sx={{ width: 'auto', fontWeight: '700', fontFamily: 'inter', fontSize: '22' }}>
                            Select a plan to continue
                        </Alert>
                    </Snackbar>
                </div>
            </div>
        </div>
    )
}

export default Page