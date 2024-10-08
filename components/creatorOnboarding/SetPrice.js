import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { MenuItem, Select, InputLabel, FormControl, Switch, Button, CircularProgress, Popover, Typography } from '@mui/material'
import { color } from 'framer-motion';

function SetPrice({ handleContinue, buildScriptLoader }) {

    const [toogleActive, setToogleActive] = useState(false);
    // const [buildScriptLoader, setBuildScriptLoader] = useState(false);
    const [callPrice, setCallPrice] = useState("");
    const [showInputErr, setShowInputErr] = useState(false);
    const [showWarningText, setShowWarningText] = useState(false);
    const [anchorel, setAnchorel] = useState(null);
    const open = Boolean(anchorel)
    const id = open ? '0' : undefined
    // const [showFreeAmount, setShowFreeAMount] = useState(false);


    const styles = {
        inputContainer: {
            marginTop: 10,
            display: "flex",
            alignItems: "center",
            backgroundColor: "#EDEDED80", /* Light grey background */
            bordeRadius: 20, /* Rounded corners */
            padding: "5px 0px",
            paddingLeft: "15px",
            border: callPrice && showInputErr ? "1px solid red" : "none",
            borderRadius: 5

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
            fontWeight: 'normal',
            color: '#050A0860'
        },
        text2: {
            fontSize: 13,
            fontWeight: 'normal',
            color: '#050A0860'
        }
    }

    const handleChange = () => {
        setShowInputErr(false);
        setToogleActive(!toogleActive);
        setCallPrice("");
    }

    const handleUploadClick = () => {
        handleContinue({ callPrice, toogleActive });
    }

    return (
        <div className='w-full flex flex-col justify-center items-center '>
            <div className='w-full'>
                <div className='w-10/12 rounded' style={styles.inputContainer}>
                    {/* <div>$</div> */}
                    <div className="flex items-center border-none border-gray-300 w-full">
                        <span className="mr-1">$</span>
                        <input
                            disabled={toogleActive ? true : false}
                            style={{
                                ...styles.input,
                                WebkitAppearance: "none",
                                MozAppearance: "textfield",
                                appearance: "none",
                                // backgroundColor: 'red'
                            }}
                            className='w-full border-none outline-none'
                            value={callPrice}
                            onChange={(e) => {
                                e.target.value = e.target.value.replace(/[^0-9 .]/g, '');
                                setCallPrice(e.target.value);
                                let P = e.target.value;
                                if (P) {
                                    if (P < 1) {
                                        console.log("Value is less then 1", P);
                                        setShowInputErr(true)
                                    } else {
                                        setShowInputErr(false)
                                    }
                                }
                            }}
                            onFocus={() => { setShowWarningText(true) }}
                            onBlur={() => { setShowWarningText(false) }}
                            // placeholder='$'
                            type='text'
                            inputMode='number'
                            pattern='[0-9]*'
                        />
                    </div>
                </div>
                <div className='text-red mt-3'
                    style={{
                        fontSize: 11,
                        fontWeight: 'normal',
                        height: 12
                        // color: '#'
                    }}>
                    {callPrice && showInputErr && ("Nothing less than $1 per minute")}
                </div>

                <div className='w-10/12 flex flex-row justify-between'>
                    <div className='text-gray-400 mt-3' style={styles.text}>
                        Make it free
                    </div>
                    <Switch checked={toogleActive} onChange={handleChange} defaultChecked
                        sx={{
                            '& .MuiSwitch-switchBase.Mui-checked': {
                                color: '#620FEB', // Color for the thumb when checked
                            },
                            '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                                backgroundColor: '#620FEB', // Color for the track when checked
                            },
                            '& .MuiSwitch-switchBase': {
                                color: 'gray', // Color for the thumb when unchecked
                            },
                            '& .MuiSwitch-track': {
                                backgroundColor: 'gray', // Color for the track when unchecked
                            },
                        }} />
                </div>


                <div className='' style={{ ...styles.text, height: 12 }}>
                    {toogleActive && (
                        "We'll charge $0.20 per minute for these calls."
                    )}
                </div>

                <div className='w-10/12 mt-4'>
                    {
                        buildScriptLoader ?
                            <div className='w-full flex flex-row justify-center mt-2'>
                                <CircularProgress size={30} />
                            </div> :
                            <div>
                                {
                                    showInputErr === false && (toogleActive || callPrice) ?
                                        <button onClick={handleUploadClick}
                                            className='bg-purple hover:bg-purple text-white w-full'
                                            style={{ fontSize: 15, fontWeight: "400", height: "52px", borderRadius: "50px" }}>
                                            Continue
                                        </button> :
                                        <button
                                            disabled
                                            //onClick={handleUploadClick}
                                            className='bg-purple2 hover:bg-purple2 text-white w-full'
                                            style={{ fontSize: 15, fontWeight: "400", height: "52px", borderRadius: "50px", color: "white" }}>
                                            Continue
                                        </button>
                                }
                            </div>
                    }
                </div>

                <div className='mt-8 w-10/12 flex flex-row justify-between'>
                    <div className='' style={styles.text2}>
                        Your price per minute
                    </div>

                    <div className='' style={styles.text2}>
                        ${callPrice}
                    </div>

                </div>


                <div className='mt-8 w-10/12 flex flex-row  justify-between'>
                    <div className='w-9/12 flex flex-row pe-12'>
                        <div style={styles.text2}>
                            Our fee - 20% to run our engine.
                        </div>
                        {/* <button aria-describedby={id}
                            onMouseEnter={(e) => { setAnchorel(e.currentTarget) }}
                        // onMouseLeave={(e) => { setAnchorel(null) }}
                        >
                            <img src={'/assets/questionImage.png'}
                                style={{ alignSelf: 'center', height: 15, width: 15 }} />
                        </button> */}

                        <div className='ms-1'>

                            <Typography
                                aria-owns={open ? 'mouse-over-popover' : undefined}
                                aria-haspopup="true"
                                onMouseEnter={(e) => {
                                    setAnchorel(e.currentTarget)
                                }}
                                onMouseLeave={(e) => {
                                    setAnchorel(null)
                                }}
                            >
                                <img src={'/assets/questionImage.png'}
                                    style={{ alignSelf: 'center', height: 15, width: 15 }} />
                            </Typography>
                            <Popover
                                id="mouse-over-popover"
                                sx={{
                                    pointerEvents: 'none',
                                }}
                                PaperProps={{
                                    sx: {
                                        borderRadius: '10px', // Add borderRadius here
                                        padding: "2px"
                                    },
                                }}
                                open={open}
                                anchorEl={anchorel}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                }}
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left',
                                }}
                                onClose={() => {
                                    setAnchorel(null)
                                }}
                                disableRestoreFocus
                            >
                                <Typography sx={{ p: 1, fontSize: 13, padding: 1 }}>We share this with our creators. We pay<br /> OpenAI, twilio, 11labs, Amazon Web<br /> Services, Stripe, 3rd Party Providers,<br />and not to mention…our expensive<br /> developers at E8 Labs.</Typography>
                            </Popover>
                        </div>


                    </div>
                    <div className='' style={styles.text2}>
                        ${(20 / 100) * callPrice}
                    </div>

                </div>
                <div style={styles.text2}>You keep the rest.</div>

                <div className='flex flex-row justify-between w-10/12 mt-6'>
                    <div className='' style={styles.text2}>Profit (straight to the bank)</div>
                    <div style={styles.text2}>${(80 / 100) * callPrice}</div>
                </div>


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
        </div >

    )

}

export default SetPrice
