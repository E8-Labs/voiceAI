'use client'

import React, { useState } from 'react';
import Dashboard from '@/components/Navbar/profilenavbarcomponents/MyCreatorX/Dashboard';
import { AiDetails } from '@/components/Navbar/profilenavbarcomponents/MyCreatorX/AiDetails';
import { SocialKB } from '@/components/Navbar/profilenavbarcomponents/MyCreatorX/Social&KB';
import Calls from '@/components/Navbar/profilenavbarcomponents/MyCreatorX/Calls';

const Page = () => {

  const [selectedMenu, setSelectedMenu] = useState(1)

  const styles = {
    buttonText: (item) => ({
      fontSize: '2vh',
      fontWeight: 400,
      color: selectedMenu === item.id ? "black" : "#00000060",
      // display: 'inline-block', // Ensure the text and purple bar are treated as inline-block elements
      position: 'relative', // Allow absolute positioning of the underline
    }),
    underline: {
      height: '2px',
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
      color: '#000', // Ensure text is black
    },
  }

  const manu = [{
    id: 1,
    manu: 'Dashboard',
  }, {
    id: 2,
    manu: 'AI Persona',
  }, {
    id: 3,
    manu: 'Social & KB',
  }, {
    id: 4,
    manu: 'Calls',
  }]

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
    <div className={navbarComponent}>
      <div className='w-full flex flex-row justify-between pl-5 pt-10 pr-5' style={{ overflow: 'hidden' }}>
        <div className='w-8/12'>
          <div className='w-full flex flex-col'>
            <div className='w-full flex flex-row gap-4 '>
              {
                manu.map((item) => (
                  <div key={item.id} className='w-2/12 flex flex-col items-center'>
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
            <div className='w-full flex flex-col'>
              {
                selectedMenu === 1 ? (
                  <Dashboard />
                ) : selectedMenu === 2 ? (
                  <AiDetails />
                ) : selectedMenu === 3 ? (
                  <SocialKB />
                ) : selectedMenu === 4 ? (
                  <Calls />
                ) : ""
              }
            </div>
          </div>
        </div>
        <div className='w-4/12 flex flex-col items-end pt-10'>
          <div className='w-11/12 bg-white p-5 flex flex-col gap-10 items-center shadow  rounded'>
            <div style={{ fontSize: 17, fontWeight: 500 }}>
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

            <button className='w-full py-3' style={{
              backgroundColor: '#552AFF', borderRadius: 5, color: 'white', marginTop: 25, borderRadius: "50px"
            }}
            // onClick={handleContinue}
            >
              Test AI
            </button>

          </div>
        </div>
      </div>
    </div>
  )
}

export default Page
