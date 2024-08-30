'use client'
import React, { useState } from 'react';
import BasicInfo from '@/components/Navbar/profilenavbarcomponents/myaccount/Basicinfo';
import MyAi from '../../../components/Navbar/profilenavbarcomponents/myaccount/MyAi';

const Page = () => {

    const [actInfo, setActInfo] = useState(true)
    const [actAi, setActAi] = useState(false)

    const handleInfoClick = () => {
        setActInfo(true)
        setActAi(false)
    }

    const handleAiClick = () => {
        setActInfo(false)
        setActAi(true)

    }

    const navbarComponent = {
        height: "100vh", // Full screen height
        backgroundImage: "url('/assets/navComponentBg.png')",
        backgroundSize: "cover", // Cover the entire container
        backgroundPosition: "center", // Center the background image
        backgroundRepeat: "no-repeat", // Prevent repeating the image
        display: "flex",
        justifyContent: "center",
        color: "black", // Add your desired text color
    };


    return (
        <div
            style={navbarComponent}
        // className={navBg.navbarcomponent}
        >
            <div className='w-full flex flex-col pl-10 pr-10 pt-10' style={{ overflow: 'hidden' }}>
                <div className='w-full flex flex-row gap-6 '>
                    <button onClick={handleInfoClick}>
                        <div style={{ fontSize: actInfo ? 24 : 20, color: actInfo ? "#000000" : "#00000060" }}>
                            Basic Info
                        </div>
                    </button>

                    <button onClick={handleAiClick}>
                        <div style={{ fontSize: actAi ? 24 : 20, color: actAi ? "#000000" : "#00000060" }}>
                            My AI
                        </div>
                    </button>

                </div>

                <div className='w-full'>
                    {
                        actInfo ? (
                            <BasicInfo />
                        ) : (
                            <MyAi />
                        )
                    }
                </div>
            </div>

        </div>
    )
}

export default Page