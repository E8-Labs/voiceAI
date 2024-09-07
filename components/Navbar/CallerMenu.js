'use client'
import { Drawer } from '@mui/material';
import React, { useState } from 'react';
// import callerProfileNav from './callerProfileNavComponents/CallerProfileNav';
import CallerProfileNav from "../Navbar/callerProfileNavComponents/CallerProfileNav";
import Image from 'next/image';

const CallerMenu = () => {

    const [openDrawer, setOpenDrawer] = useState(false);
    const handleOpenMenu = () => {
        setOpenDrawer(true);
    }

    const handleCloseMenu = (e) => {
        setOpenDrawer(e);
    }

    return (
        <div className='w-full' style={{ backgroundColor: "#ffffff30" }}>
            <button onClick={handleOpenMenu} className='ps-2 mt-6 border-none outline-none'>
                {/* <Image src="/assets/menuIcon.jpeg" alt='menu' height={20} width={40} /> */}
                <div className='rounded-2xl' style={{ height: "3px", width: "18px", backgroundColor: "black", marginTop: "2px" }} />
                <div className='rounded-2xl' style={{ height: "3px", width: "18px", backgroundColor: "black", marginTop: "2px" }} />
                <div className='rounded-2xl' style={{ height: "3px", width: "18px", backgroundColor: "black", marginTop: "2px" }} />
            </button>
            <div className='w-8/12'>
                <Drawer
                    open={openDrawer}
                    onClose={() => setOpenDrawer(false)}
                    anchor='left'
                    BackdropProps={{
                        timeout: 1000,
                        sx: {
                            backgroundColor: 'transparent',
                            // backdropFilter: 'blur(40px)',
                        },
                    }}
                    sx={{
                        '& .MuiDrawer-paper': {
                            backgroundColor: '#ffffff',
                            // boxShadow: '5px',  
                            height: '100%',
                            padding: 2,
                            backgroundImage: 'url("/creatorProfileBg.png")', // Ensure the correct path
                            backgroundSize: "cover",
                            backgroundRepeat: 'no-repeat',
                            backgroundPosition: 'center',
                            width: 'auto',
                            height: '100vh',
                        }
                    }}
                >
                    <div>
                        <div className='w-full'>
                            <CallerProfileNav handleCloseMenu={handleCloseMenu} />
                            {/* <LoginModal creator={creator} assistantData={getAssistantData} closeForm={hideBottom} /> */}
                        </div>
                    </div>
                </Drawer>
            </div>
        </div>
    )
}

export default CallerMenu