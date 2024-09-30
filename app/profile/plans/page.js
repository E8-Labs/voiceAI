'use client'
import AddCardDetails from '@/components/loginform/Addcard/AddCardDetails';
import { Alert, CircularProgress, Fade, Snackbar } from '@mui/material';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import Image from 'next/image';
import React from 'react'
import { useState } from 'react';

const Page = () => {


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
                    <div className='w-10/12 flex flex-row items-center justify-between px-8 bg-white py-4 rounded' style={{ border: "2px solid green", height: "54px" }}>
                        <div>
                            $97 / mo
                        </div>
                        <div className='flex flex-row items-center gap-6'>
                            <div>
                                Current plan
                            </div>
                            <button className='bg-purple flex flex-row justify-center items-center' style={{ height: "26px", width: "26px", borderRadius: "50%", }}>
                                {/* <Image src='/assets/Tick.png' alt='selected' height={10} width={6} /> */}
                                <img src='/assets/Tick.png' alt='tick' style={{ height: "10px", width: "14px" }} />
                            </button>
                        </div>
                    </div>

                    <div className='flex flex-row justify-end w-10/12 me-28'>
                        <div className='bg-purple text-white text-center py-2'>
                            Recomended
                        </div>
                    </div>
                    <div className='w-10/12 flex flex-row items-center justify-between px-8 bg-white py-4 rounded' style={{ border: "2px solid green", height: "54px" }}>
                        <div>
                            $97 / mo
                        </div>
                        <div className='flex flex-row items-center gap-6'>
                            <div>
                                Current plan
                            </div>
                            <button className='bg-purple flex flex-row justify-center items-center' style={{ height: "26px", width: "26px", borderRadius: "50%", }}>
                                {/* <Image src='/assets/Tick.png' alt='selected' height={10} width={6} /> */}
                                <img src='/assets/Tick.png' alt='tick' style={{ height: "10px", width: "14px" }} />
                            </button>
                        </div>
                    </div>
                </div>
                <div className='w-6/12'>Add card here</div>
            </div>
        </div>
    )
}

export default Page