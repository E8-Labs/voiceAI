import { Box, Modal, Popover } from '@mui/material';
import { DotsThree, Plus } from '@phosphor-icons/react'
import Image from 'next/image'
import React, { useState } from 'react'

const CallInstructions = () => {

    const [openExamplesPopup, setOpenExamplesPopup] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    // const open = Boolean(anchorEl);
    const id = anchorEl ? 'simple-popover' : undefined;
    const styles = {
        text1: {
            fontWeight: "500",
            fontFamily: "inter",
            fontSize: 15
        },
        examplesModalStyle: {
            height: "auto",
            bgcolor: "transparent",
            // p: 2,
            mx: "auto",
            my: "50vh",
            transform: "translateY(-55%)",
            borderRadius: 2,
            border: "none",
            outline: "none",
        }
    }

    //dummy data
    const callInstructionData = [
        {
            id: 1,
            heading: "Greet callers"
        },
        {
            id: 2,
            heading: "Greet callers"
        },
        {
            id: 3,
            heading: "Greet callers"
        },
    ]

    const examplesData = [
        {
            id: 1,
            heading: "Pitch a product"
        },
        {
            id: 2,
            heading: "Invite to a webinar"
        },
        {
            id: 3,
            heading: "Engage with followers"
        },
    ]

    return (
        <div className='w-full'>
            <div className='flex flex-row items-center w-full justify-between'>
                <div style={{ fontWeight: "500", fontSize: 20, fontFamily: "inter" }}>
                    Call Instructions
                </div>
                <button
                    className='underline text-purple'
                    onClick={() => { setOpenExamplesPopup(true) }}
                >
                    View Examples
                </button>
            </div>
            <div className='mt-8 w-10/12'>
                {
                    callInstructionData.map((item) => (
                        <div key={item.id} className='flex flex-col items-center w-full'>
                            <div className='flex flex-row items-center p-4 border-[1px] border-[#00000010] w-full justify-between rounded-lg'>
                                <div className='flex flex-row items-center gap-2'>
                                    <div className='text-white bg-purple flex flex-row items-center justify-center' style={{ height: 29, width: 29, borderRadius: "50%" }}>
                                        {item.id}
                                    </div>
                                    <div style={styles.text1}>
                                        {item.heading}
                                    </div>
                                </div>
                                <div>
                                    <button aria-describedby={id} variant="contained" color="primary" onClick={handleClick}>
                                        <DotsThree size={32} weight="bold" />
                                    </button>
                                    <Popover
                                        id={id}
                                        open={Boolean(anchorEl)}
                                        anchorEl={anchorEl}
                                        onClose={handleClose}
                                        anchorOrigin={{
                                            vertical: 'bottom',
                                            horizontal: 'center',
                                        }}
                                        transformOrigin={{
                                            vertical: 'top',
                                            horizontal: 'center',
                                        }}
                                    >
                                        <div className='p-2 flex flex-col justify-start items-start w-[100px]'>
                                            <button className='text-purple' style={{ fontSize: 13, fontWeight: "500", fontFamily: "inter" }}>
                                                Edit
                                            </button>
                                            <button style={{ fontSize: 13, fontWeight: "500", fontFamily: "inter", marginTop: 8 }}>
                                                Delete
                                            </button>
                                        </div>
                                    </Popover>
                                </div>
                            </div>
                            <div style={{ height: '30px', borderLeft: "1px dashed #620FEB", width: "1px" }} />
                        </div>
                    ))
                }
                <div className='w-full flex flex-row justify-center items-center'>
                    <button className='flex flex-row gap-2 justify-center items-center bg-purple text-white px-4 py-2' style={{ fontWeight: "500", fontFamily: "inter", fontSize: 13, borderRadius: "50px" }}>
                        <Plus size={22} weight="light" />
                        <p>
                            Add step
                        </p>
                    </button>
                </div>
            </div>

            {/* Code for examples modal */}
            <Modal
                open={openExamplesPopup}
                onClose={() => setOpenExamplesPopup(false)}
                closeAfterTransition
                BackdropProps={{
                    timeout: 1000,
                    sx: {
                        backgroundColor: "transparent",
                        backdropFilter: "blur(40px)",
                    },
                }}
            >
                <Box className="lg:w-5/12 sm:w-7/12 w-full" sx={styles.examplesModalStyle}>
                    {/* <LoginModal creator={creator} assistantData={getAssistantData} closeForm={setOpenLoginModal} /> */}
                    <div className="flex flex-row justify-center w-full">
                        <div
                            className="sm:w-7/12 w-full"
                            style={{
                                backgroundColor: "#ffffff23",
                                padding: 20,
                                borderRadius: 10,
                            }}
                        >
                            <div style={{ backgroundColor: "#ffffff", borderRadius: 7, padding: 10 }}>
                                <div style={{ fontWeight: '500', fontFamily: "inter", fontSize: 20 }}>
                                    Example
                                </div>
                                <div className='mt-4 w-full'>
                                    {
                                        examplesData.map((item, index) => (
                                            <div key={item.id} className='flex flex-col items-center w-full'>
                                                <div className='flex flex-row items-center p-4 border-[2px] border-[#00000010] w-full justify-between rounded-lg'>
                                                    <div className='flex flex-row items-center gap-2'>
                                                        <div className='text-white bg-purple flex flex-row items-center justify-center' style={{ height: 29, width: 29, borderRadius: "50%" }}>
                                                            {item.id}
                                                        </div>
                                                        <div style={styles.text1}>
                                                            {item.heading}
                                                        </div>
                                                    </div>
                                                </div>
                                                {/* <div style={{ height: '30px', borderLeft: "1px dashed #620FEB", width: "1px" }} /> */}
                                                {index !== examplesData.length - 1 && (
                                                    <div style={{ height: '30px', borderLeft: "1px dashed #620FEB", width: "1px" }} />
                                                )}
                                            </div>
                                        ))
                                    }
                                    <div className='w-full flex flex-row justify-center items-center mt-8'>
                                        <button
                                            onClick={() => { setOpenExamplesPopup(false) }}
                                            className='flex flex-row gap-2 justify-center items-center bg-purple text-white px-4 py-2 w-full'
                                            style={{ fontWeight: "500", fontFamily: "inter", fontSize: 13, borderRadius: "50px" }}>
                                            <p>
                                                Close
                                            </p>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Box>
            </Modal>

        </div>
    )
}

export default CallInstructions