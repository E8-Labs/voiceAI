import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { MenuItem, Select, InputLabel, FormControl, Switch, Button, CircularProgress, Popover, Typography } from '@mui/material'

const EnableCallPrice = () => {

    const [callPrice, setCallPrice] = useState("");
    const [showInputErr, setShowInputErr] = useState(false);
    const [showWarningText, setShowWarningText] = useState(false);
    const [anchorel, setAnchorel] = useState(null);
    const open = Boolean(anchorel)
    const id = open ? '0' : undefined

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
        PriceText: {
            fontSize: 13,
            fontWeight: 'normal',
            color: '#050A0860'
        }
    }

    return (
        <div>
            <div className='w-10/12 rounded' style={styles.inputContainer}>
                {/* <div>$</div> */}
                <div className="flex items-center border-none border-gray-300 w-full">
                    <span className="mr-1">$</span>
                    <input
                        // disabled={toogleActive ? true : false}
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
            <div>
                <div className='mt-8 w-10/12 flex flex-row justify-between'>
                    <div className='' style={styles.PriceText}>
                        Your price per minute
                    </div>

                    <div className='' style={styles.PriceText}>
                        ${callPrice}
                    </div>

                </div>


                <div className='mt-8 w-10/12 flex flex-row  justify-between'>
                    <div className='w-9/12 flex flex-row pe-12'>
                        <div style={styles.PriceText}>
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
                    <div className='' style={styles.PriceText}>
                        ${((20 / 100) * callPrice).toFixed(2)}
                    </div>

                </div>
                <div style={styles.PriceText}>You keep the rest.</div>

                <div className='flex flex-row justify-between w-10/12 mt-6'>
                    <div className='' style={styles.PriceText}>Profit (straight to the bank)</div>
                    <div style={styles.PriceText}>${((80 / 100) * callPrice).toFixed(2)}</div>
                </div>
            </div>
        </div>
    )
}

export default EnableCallPrice