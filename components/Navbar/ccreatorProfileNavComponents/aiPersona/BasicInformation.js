import { Box, CircularProgress, Modal, Popover } from '@mui/material'
import { DotsThree } from '@phosphor-icons/react'
import Image from 'next/image';
import React, { useState } from 'react'
import AiCharacteristicSeeting from './AiCharacteristicSeeting';

const BasicInformation = ({ recallApi, aiData }) => {

    const [greetCallersAnchorel, setgreetCallersAnchorel] = useState(null);
    const greetCallersPopoverId = greetCallersAnchorel ? 'simple-popover' : undefined;
    const [greetCallersLoader, setGreetCallersLoader] = useState(false);

    const callersQueryPopoverId = greetCallersAnchorel ? 'simple-popover' : undefined;
    const [callersQueryAnchorel, setcallersQueryAnchorel] = useState(null);
    const [openAdvanceSettingPopup, setOpenAdvanceSettingPopup] = useState(false);


    const handeGreetCallersMoreClick = (event) => {
        setgreetCallersAnchorel(event.currentTarget);
    }

    const handleClose = () => {
        setgreetCallersAnchorel(null);
        setcallersQueryAnchorel(null);
    };

    const handeCallersQueryMoreClick = (event) => {
        setcallersQueryAnchorel(event.currentTarget);
    }
    const styleSettingPopup = {
        height: "auto",
        bgcolor: "transparent",
        // p: 2,
        mx: "auto",
        my: "50vh",
        transform: "translateY(-50%)",
        borderRadius: 2,
        border: "none",
        outline: "none",
        // border: "2px solid green"
    };


    return (
        <div>
            <div style={{ fontWeight: "500", fontSize: 20, fontFamily: "inter" }}>
                <span style={{ color: "#00000060" }}>AI Characteristics |</span> Basic Information
            </div>

            <div className='mt-6' style={{ fontWeight: "500", fontSize: 15, fontFamily: "inter" }}>
                How would you like to greet your callers?
            </div>

            <div className='flex flex-row items-start w-full justify-between border rounded-lg p-4 mt-6'>
                <div style={{ fontWeight: "500", fontSize: 13, fontFamily: "inter" }}>
                    {aiData.ai.greeting}
                </div>
                <button aria-describedby={greetCallersPopoverId} variant="contained" color="primary" onClick={(event) => { handeGreetCallersMoreClick(event) }}>
                    <DotsThree size={32} weight="bold" />
                </button>
                <Popover
                    id={greetCallersPopoverId}
                    open={Boolean(greetCallersAnchorel)}
                    anchorEl={greetCallersAnchorel}
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
                        <button className='text-purple' style={{ fontSize: 13, fontWeight: "500", fontFamily: "inter" }} onClick={() => { console.log("Helo test case 1") }}
                        >
                            Edit
                        </button>
                        {/* <CircularProgress style={{ marginTop: 8 }} size={15} /> */}
                        <button style={{ fontSize: 13, fontWeight: "500", fontFamily: "inter", marginTop: 8 }}
                        >
                            Delete
                        </button>
                    </div>
                </Popover>
            </div>


            <div className='mt-6' style={{ fontWeight: "500", fontSize: 15, fontFamily: "inter" }}>
                What might users ask your AI during the calls?
            </div>

            <div className='flex flex-row items-start w-full justify-between border rounded-lg p-4 mt-6'>
                <div style={{ fontWeight: "500", fontSize: 13, fontFamily: "inter" }}>
                    {aiData.ai.possibleUserQuery}
                </div>
                <button aria-describedby={callersQueryPopoverId} variant="contained" color="primary" onClick={(event) => { handeCallersQueryMoreClick(event) }}>
                    <DotsThree size={32} weight="bold" />
                </button>
                <Popover
                    id={callersQueryPopoverId}
                    open={Boolean(callersQueryAnchorel)}
                    anchorEl={callersQueryAnchorel}
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
                        <button className='text-purple' style={{ fontSize: 13, fontWeight: "500", fontFamily: "inter" }} onClick={() => { console.log("Helo test case 2") }}
                        >
                            Edit
                        </button>
                        <button style={{ fontSize: 13, fontWeight: "500", fontFamily: "inter", marginTop: 8 }}
                        >
                            Delete
                        </button>
                    </div>
                </Popover>
            </div>

            <div>
                <button className='text-purple underline mt-12' onClick={() => setOpenAdvanceSettingPopup(true)}>
                    Advance Settings
                </button>
            </div>

            <Modal
                open={openAdvanceSettingPopup}
                onClose={() => setOpenAdvanceSettingPopup(false)}
                closeAfterTransition
                BackdropProps={{
                    timeout: 1000,
                    sx: {
                        backgroundColor: "transparent",
                        backdropFilter: "blur(40px)",
                    },
                }}
            >
                <Box className="sm:w-11/12 w-full" sx={styleSettingPopup}>
                    {/* <LoginModal creator={creator} assistantData={getAssistantData} closeForm={setOpenLoginModal} /> */}
                    <div className="flex flex-row justify-center w-full">
                        <div
                            className="sm:w-11/12 w-full h-[80vh]"
                            style={{
                                backgroundColor: "#ffffff63",
                                padding: 20,
                                borderRadius: 10,
                            }}
                        >
                            <div className='w-full bg-white px-14 py-6 rounded-lg' style={{ height: '100%' }}>
                                <div className='flex flex-row w-full justify-end'>
                                    <button onClick={() => setOpenAdvanceSettingPopup(false)}>
                                        <Image src="/assets/crossBtn.png" height={24} width={24} />
                                    </button>
                                </div>
                                <div style={{ fontWeight: "500", fontFamily: "inter", fontSize: 15, color: "#00000060" }}>
                                    Advance Settings
                                </div>
                                <div className='mt-8'>
                                    <AiCharacteristicSeeting recallApi={recallApi} aiData={aiData} />
                                </div>
                            </div>
                        </div>
                    </div>
                </Box>
            </Modal>


        </div>
    )
}

export default BasicInformation