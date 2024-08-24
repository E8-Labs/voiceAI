import React, { useState } from 'react'
import { TextField } from '@mui/material'
import Image from 'next/image'

function CallerInfo({ handleContinue, handleBack }) {

    const [text, setText] = useState("")

    const styles = {
        inputContainer: {
            marginTop:30,
            display: "flex",
            alignItems: "center",
            backgroundColor: "#EDEDED29", /* Light grey background */
            bordeRadius: 20, /* Rounded corners */
            padding:"10px 0px" /* Padding around input */

        },
        input: {
            border: 'none',
            outline: 'none',
            backgroundColor: 'transparent',
            flexGrow: 1,
            fontSize: '16px',
            paddingLeft: '10px',
            color: '#000', // Ensure text is black
        },
        button:{
            backgroundColor: '',
            border: 'none',
            cursor: 'pointer',
            fontSize: '18px',
            color: '#999',
            padding: '5 5px',
        }
    }

    return (
        <div className='w-full flex flex-col justify-center items-center '>
            <div className='w-full'>
                {/* <button style={{ marginTop: 20 }}
                    onClick={handleBack}
                >
                    <Image src={"/assets/backArrow.png"} width={30} height={30} />
                </button> */}
                <div  className='mt-6' style={{ fontSize: 24, fontWeight: "600", fontFamily: "inter" }}>
                    KYC - What would you like to know about your callers?
                </div>
                <div className='text-sm text-gray-400 mt-2'>
                    These are questions your AI will ask during the call to give you a better understanding about the person
                </div>
                <div className='w-11/12 rounded' style={styles.inputContainer}>
                    <input className='w-8/12' style={styles.input}
                        placeholder="What's your name?"
                    />
                    <button className='w-1/12'
                        // onClick={}
                    >
                        <Image src={'/assets/croseBtn.png'} height={20} width={20}/>
                    </button>
                </div>

                <div className='w-11/12 rounded' style={styles.inputContainer}>
                    <input className='w-8/12' style={styles.input}
                        placeholder="Where are you from?"
                    />
                    <button className='w-1/12'
                        // onClick={}
                    >
                        <Image src={'/assets/croseBtn.png'} height={20} width={20}/>
                    </button>
                </div>

                <button className='text-purple mt-8' style={{textDecoration:'underline'}}>
                    New Question
                </button>

            </div>

        </div>
    )
}

export default CallerInfo