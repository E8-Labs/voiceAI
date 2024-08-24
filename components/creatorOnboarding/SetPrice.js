import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { MenuItem, Select, InputLabel, FormControl, Switch, Button, CircularProgress } from '@mui/material'

function SetPrice({ handleBack, handleContinue }) {

    const [toogleActive, setToogleActive] = useState(false);
    const [buildScriptLoader, setBuildScriptLoader] = useState(false);

    const handleApiCall = () => {
        try {
            setBuildScriptLoader(true);
            handleContinue()
        } catch (error) {
            console.log("error occured");

        } finally {
            setBuildScriptLoader(false)
        }
    }

    const styles = {
        inputContainer: {
            marginTop: 10,
            display: "flex",
            alignItems: "center",
            backgroundColor: "#EDEDED29", /* Light grey background */
            bordeRadius: 20, /* Rounded corners */
            padding: "5px 0px",
            paddingLeft: "15px"

        },
        input: {
            border: 'none',
            outline: 'none',
            backgroundColor: 'transparent',
            flexGrow: 1,
            fontSize: '16px',
            padding: '5px',
            color: '#000', // Ensure text is black
            MozAppearance: 'textfield'
        },
        text: {
            fontSize: 11,
            fontWeight: 'normal'
        },
        text2: {
            fontSize: 13,
            fontWeight: 'normal'
        }
    }

    const handleChange = () => {
        setToogleActive(!toogleActive)
    }

    return (
        <div className='w-full flex flex-col justify-center items-center '>
            <div className='w-full'>
                <div className='w-10/12 rounded' style={styles.inputContainer}>
                    {/* <div>$</div> */}
                    <input style={styles.input}
                        placeholder='$'
                        type='number'
                    >
                    </input>
                </div>
                <div className='text-gray-400 mt-3' style={styles.text}>
                    Nothing less than $1 per minute
                </div>

                <div className='w-10/12 flex flex-row justify-between'>
                    <div className='text-gray-400 mt-3' style={styles.text}>
                        Make it free
                    </div>
                    <Switch checked={toogleActive} onChange={handleChange} defaultChecked />
                </div>

                <div className='' style={styles.text}>
                    We'll charge $0.20 per minute for these calls.
                </div>

                <div className='w-10/12 mt-4'>
                    {
                        buildScriptLoader ?
                            <div className='w-full flex flex-row justify-center'>
                                <CircularProgress size={30} />
                            </div> :
                            <Button onClick={handleContinue}
                                className='bg-purple hover:bg-purple text-white w-full'
                                style={{ fontSize: 15, fontWeight: "400", height: "52px", borderRadius: "50px" }}>
                                Upload
                            </Button>
                    }
                </div>

                <div className='mt-8 w-10/12 flex flex-row justify-between'>
                    <div className='' style={styles.text2}>
                        Your price per minute
                    </div>

                    <div className='' style={styles.text2}>
                        $10
                    </div>

                </div>


                <div className='mt-8 w-10/12 flex flex-row  justify-between'>
                    <div className='w-9/12 flex flex-row'>
                        <div style={styles.text2}>
                            Our fee - 20% to run our engine.
                        </div>
                        <img src={'/assets/questionImage.png'}
                            style={{ alignSelf: 'center', height: 15, width: 15, }} />
                    </div>
                    <div className='' style={styles.text2}>
                        $2
                    </div>

                </div>
                <div style={styles.text2}>You keep the rest.</div>
                <div className='mt-6' style={styles.text2}>Profit (straight to bank)</div>
                {/* <div className = 'w-12/12 flex flex-col items-end mt-2' style = {{}}>
                    <div className='w-6/12 bg-white-500 shadow-lg p-5'>
                        <div style={{fontSize:12,color:'#00000080'}}>
                            We share this with our creators. We pay OpenAI, twilio, 11labs, Amazon Web Services, Stripe, 3rd Party Providers, and not to mention…our expensive developers at E8 Labs.
                        </div>
                    </div>
                </div> */}
                {/* <div className='w-full flex justify-center'>
                    <div className='w-6/12 bg-white-500 shadow-lg p-5'>
                        <div style={{ fontSize: 12, color: '#00000080' }}>
                            We share this with our creators. We pay OpenAI, twilio, 11labs, Amazon Web Services, Stripe, 3rd Party Providers, and not to mention…our expensive developers at E8 Labs.
                        </div>
                    </div>
                </div> */}
            </div>
        </div>

    )

}

export default SetPrice
