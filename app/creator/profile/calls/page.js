"use client"
import loginFunction from '@/components/loginFunction';
import Calls from '@/components/Navbar/ccreatorProfileNavComponents/calls/Calls';
import axios from 'axios';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { CircularProgressbar, CircularProgressbarWithChildren } from 'react-circular-progressbar';

const Page = () => {
    loginFunction();
    const value = 0.65
    return (
        <div className='w-full h-screen' style={{ overflow: 'hidden', backgroundColor: "#ffffff40" }}>
            <div className='w-11/12 pt-12 pl-10 pb-8'>
                <div className='w-fll flex flex-row items-center justify-between'>
                    <p style={{ fontSize: 28, fontWeight: "500", fontFamily: "inter" }}>
                        Calls
                    </p>
                    {/* <Image
                src="/assets/placeholderImg.jpg"
                alt='profile'
                height={70}
                width={70}
                style={{
                    width: '70px',
                    height: '70px',
                    backgroundColor: "",
                    borderRadius: "50%",
                    border: "3px solid white",
                    objectFit: 'cover',
                    objectPosition: 'center',
                    // backgroundColor: 'red'
                }}
            /> */}
                </div>
                <div className='w-full flex flex-row items-center justify-between mt-4 bg-white px-6 py-4 rounded-2xl'>
                    <div className='flex flex-row items-center gap-2'>
                        <div style={{ height: "71px", width: "71px" }}>
                            <CircularProgressbar value={value} maxValue={1} text={`${value * 100}%`}
                                strokeWidth={4}
                                styles={{
                                    path: {
                                        stroke: `#552AFF`, // Change the color to red
                                    },
                                    text: {
                                        fill: '#000000', // Change the text color to red
                                        fontSize: 20,
                                        fontWeight: "500"
                                    },
                                    trail: {
                                        stroke: '#d6d6d6', // Change the trail color (if needed)
                                    },
                                }} />
                        </div>
                        <div className='flex flex-col gap-1'>
                            <div style={{ fontWeight: "500", fontSize: 15, fontFamily: "inter" }}>
                                Complete Profile
                            </div>
                            <div style={{ fontWeight: "500", fontSize: 13, fontFamily: "inter" }}>
                                Voice, Kb, SocialLinks etc
                            </div>
                        </div>
                    </div>
                    <div>
                        <button className='text-white bg-purple px-4 py-2' style={{ fontWeight: "500", fontSize: 13, fontFamily: "inter", borderRadius: "50px" }}>
                            Complete
                        </button>
                    </div>
                </div>

                <div>
                    <Calls />
                </div>


            </div>
        </div>
    )
}

export default Page