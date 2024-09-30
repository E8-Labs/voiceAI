'use client'

import React, { useState } from 'react';
import Dashboard from '@/components/Navbar/profilenavbarcomponents/MyCreatorX/Dashboard';
import { AiDetails } from '@/components/Navbar/profilenavbarcomponents/MyCreatorX/AiDetails';
import { SocialKB } from '@/components/Navbar/profilenavbarcomponents/MyCreatorX/Social&KB';
import Calls from '@/components/Navbar/profilenavbarcomponents/MyCreatorX/Calls';
import SocialOAuth from '@/components/creatorOnboarding/SocialOAuth';
import { Box, Modal } from '@mui/material';
import Image from 'next/image';

const Page = () => {

  const [selectedMenu, setSelectedMenu] = useState(1);
  const [testAIPopup, setTestAIPopup] = useState(false);

  const styles = {
    buttonText: (item) => ({
      fontSize: 15,
      fontWeight: 400,
      color: "black", //selectedMenu === item.id ? "black" : "#00000060",
      // display: 'inline-block', // Ensure the text and purple bar are treated as inline-block elements
      position: 'relative', // Allow absolute positioning of the underline
    }),
    underline: {
      height: '3px',
      backgroundColor: "#552AFF",
      width: '100%', // Set width to 100% of the button text
      position: 'absolute', // Position it absolutely relative to the text
      bottom: '-2px', // Position it just below the text
      left: 0,
    },
    input: {
      padding: 10,
      borderRadius: 5,
      border: 'none',
      outline: 'none',
      backgroundColor: '#EDEDED',
      flexGrow: 1,
      fontSize: '16px',
      paddingLeft: '10px',
      color: '#000',
      marginTop: 20
    },
  }

  const manu = [{
    id: 1,
    manu: 'Dashboard',
  },
  {
    id: 2,
    manu: 'AI Persona',
  },
  {
    id: 3,
    manu: 'Social & KB',
  },
  {
    id: 4,
    manu: 'Calls',
  },
  {
    id: 5,
    manu: 'Conversations',
  }
]

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

  const aiModalStyle = {
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

  return (
    <div className={navbarComponent}>
      <div className='w-full flex flex-row justify-between pl-5 pt-10 pr-5 h-screen' style={{ overflow: 'hidden', backgroundColor: "#ffffff40" }}>
        <div className='w-full'>
          <div className='w-full flex flex-col'>
            <div className='flex flex-row justify-between items-center w-10/12'>
              <div className='flex flex-row gap-10'>
                {
                  manu.map((item) => (
                    <div key={item.id} className='flex flex-col items-center gap-8' style={{ backgroundColor: "" }}>
                      <button
                        style={styles.buttonText(item)}
                        onClick={() => {
                          setSelectedMenu(item.id)
                        }}
                      >
                        {item.manu}
                        {
                          selectedMenu === item.id && (
                            <div style={styles.underline}></div>
                          )
                        }
                      </button>
                    </div>
                  ))
                }
              </div>
              <button onClick={() => { setTestAIPopup(true) }} className='text-white px-3 py-2 bg-purple' style={{ borderRadius: "50px" }}>
                Test Your AI
              </button>
            </div>
            <div className='w-full flex flex-col'>
              {
                selectedMenu === 1 ? (
                  <Dashboard />
                ) : selectedMenu === 2 ? (
                  <AiDetails />
                ) : selectedMenu === 3 ? (
                  <SocialKB />
                  // <SocialOAuth />
                ) : selectedMenu === 4 ? (
                  <Calls />
                ) : ""
              }
            </div>
          </div>
        </div>
      </div>
      <Modal
        open={testAIPopup}
        onClose={(() => setTestAIPopup(false))}
        closeAfterTransition
        BackdropProps={{
          timeout: 1000,
          sx: {
            backgroundColor: 'transparent',
            backdropFilter: 'blur(40px)',
          },
        }}
      >
        <Box className="lg:w-5/12 sm:w-7/12 w-full"
          sx={aiModalStyle}
        >
          {/* <LoginModal creator={creator} assistantData={getAssistantData} closeForm={setOpenLoginModal} /> */}
          <div className='flex flex-row justify-center w-full'>
            <div className='sm:w-7/12 w-full' style={{ backgroundColor: "#ffffff23", padding: 20, borderRadius: 10 }}>
              {/* <AddCard handleBack={handleBack} closeForm={closeForm} /> */}
              <div style={{ backgroundColor: 'white', padding: 18, borderRadius: 10 }}>
                <div className='mt-2 flex flex-row justify-end items-center'>
                  {/* <Image src="/assets/claimIcon.png" alt='claimimg' height={38} width={38} /> */}
                  <button onClick={(() => setTestAIPopup(false))}>
                    <Image src="/assets/crossBtn.png" alt='cross' height={14} width={14} />
                  </button>
                </div>
                <div className='mt-8 text-center' style={{ fontWeight: '600', fontSize: 24, fontFamily: 'inter' }}>
                  Test Your AI
                </div>
                <input
                  className='w-full'
                  style={styles.input}
                  placeholder="Name"
                />
                <input
                  className='w-full'
                  style={styles.input}
                  placeholder="Phone Number"
                />
                <button className='w-full py-2' style={{
                  backgroundColor: '#552AFF', borderRadius: 5, color: 'white', marginTop: 20, borderRadius: "50px"
                }}
                // onClick={handleContinue}
                >
                  Test Call
                </button>
              </div>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  )
}

export default Page
