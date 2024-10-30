import { Alert, Box, CircularProgress, Fade, Modal, Popover, Snackbar } from '@mui/material'
import { DotsThree } from '@phosphor-icons/react'
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react'
import AiCharacteristicSeeting from './AiCharacteristicSeeting';
import Apis from '@/components/apis/Apis';
import axios from 'axios';

const BasicInformation = ({ recallApi, aiData }) => {

    // //stoping code starts from here
    // const [greetCallersAnchorel, setgreetCallersAnchorel] = useState(null);
    // const greetCallersPopoverId = greetCallersAnchorel ? 'simple-popover' : undefined;
    // const [greetCallersLoader, setGreetCallersLoader] = useState(false);

    // const callersQueryPopoverId = greetCallersAnchorel ? 'simple-popover' : undefined;
    // const [callersQueryAnchorel, setcallersQueryAnchorel] = useState(null);
    // //code stoped  it was of popover


    const querryRef = useRef(null);
    const greetingRef = useRef(null);

    const [openAdvanceSettingPopup, setOpenAdvanceSettingPopup] = useState(false);
    const [updateLoader, setUpdateLoader] = useState(false);
    const [resultSnack, setResultSnack] = useState(null);
    //code for greeting input
    const [greetingValue, setGreetingValue] = useState("");
    const [showGreetingSaveBtn, setShowGreetingSaveBtn] = useState(false);

    //code for querry input
    const [userQuerry, setUserQuerry] = useState("");
    const [showQuerrySaveBtn, setShowQuerryBtn] = useState(false);

    useEffect(() => {
        const localAiPersonaDetails = localStorage.getItem("aiPersonaDetails");
        if (localAiPersonaDetails) {
            const AiDetails = JSON.parse(localAiPersonaDetails);
            setGreetingValue(AiDetails.ai.greeting);
            setUserQuerry(AiDetails.ai.possibleUserQuery);
            console.log("Aidetails recieved from local storage are", AiDetails);
        }
        // if (aiData) {
        //     setGreetingValue(aiData.ai.greeting);
        //     setUserQuerry(aiData.ai.possibleUserQuery);
        // }
    }, [recallApi]);

    const handleUpdateAi = async () => {
        const localData = localStorage.getItem('User');
        try {
            setUpdateLoader(true);
            if (localData) {
                const Data = JSON.parse(localData);
                const AuthToken = Data.data.token;
                console.log("Auth token is", AuthToken);
                const ApiPath = Apis.UpdateBuilAI;
                console.log("Api path is", ApiPath);
                const formData = new FormData();
                formData.append('greeting', greetingValue)
                formData.append('possibleUserQuery', userQuerry)

                console.log("Form data is")
                formData.forEach((value, key) => {
                    console.log(`${key}: ${value}`);
                });
                const response = await axios.post(ApiPath, formData, {
                    headers: {
                        'Authorization': 'Bearer ' + AuthToken
                    }
                });
                if (response) {
                    console.log("Response of update ai is", response.data);
                    setResultSnack(response.data.message);
                    if (response.data.status === true) {
                        greetingRef.current.blur();
                        recallApi();
                        // localStorage.setItem('aiPersonaDetails', JSON.stringify(response.data.data));
                    }
                }
            }
        } catch (error) {
            console.error("Error occured in api is", error);
        } finally {
            setUpdateLoader(false);
        }
    }


    // const handeGreetCallersMoreClick = (event) => {
    //     setgreetCallersAnchorel(event.currentTarget);
    // }

    // const handleClose = () => {
    //     setgreetCallersAnchorel(null);
    //     setcallersQueryAnchorel(null);
    // };

    // const handeCallersQueryMoreClick = (event) => {
    //     setcallersQueryAnchorel(event.currentTarget);
    // }
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
                <div className='w-[90%]' style={{ fontWeight: "500", fontSize: 13, fontFamily: "inter" }}>
                    {/* {aiData.ai.greeting} */}
                    <input
                        ref={greetingRef}
                        className='outline-none border-none w-[90%]'
                        value={greetingValue}
                        onFocus={() => { setShowGreetingSaveBtn(true) }}
                        onBlur={() => { setShowGreetingSaveBtn(false) }}
                        onChange={(e) => {
                            setGreetingValue(e.target.value);
                        }}
                        placeholder='Hey this is James. Feel free to ask me anything about....' />
                </div>
                {
                    showGreetingSaveBtn &&
                    <div>
                        {
                            updateLoader ?
                                <CircularProgress size={17} /> :
                                <button
                                    className='text-purple underline'
                                    style={{ fontWeight: "500", fontSize: 15, fontFamily: "inter" }}
                                    onMouseDown={(e) => e.preventDefault()}
                                    onClick={handleUpdateAi}
                                >
                                    Save
                                </button>
                        }
                    </div>
                    // :
                    // <button className='text-purple underline' style={{ fontWeight: "500", fontSize: 15, fontFamily: "inter" }}
                    //     onClick={(e) => {
                    //         greetingRef.current.focus();
                    //     }}>
                    //     Edit
                    // </button>
                }
                {/* <Popover
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
                        <button style={{ fontSize: 13, fontWeight: "500", fontFamily: "inter", marginTop: 8 }}
                        >
                            Delete
                        </button>
                    </div>
                </Popover> */}
            </div>


            <div className='mt-6' style={{ fontWeight: "500", fontSize: 15, fontFamily: "inter" }}>
                What might users ask your AI during the calls?
            </div>

            <div className='flex flex-row items-start w-full justify-between border rounded-lg p-4 mt-6'>
                <div className='w-[90%]' style={{ fontWeight: "500", fontSize: 13, fontFamily: "inter" }}>
                    {/* {aiData.ai.possibleUserQuery} */}
                    <input
                        className='outline-none border-none w-[90%]'
                        value={userQuerry}
                        ref={querryRef}
                        onFocus={() => { setShowQuerryBtn(true) }}
                        onBlur={() => { setShowQuerryBtn(false) }}
                        onChange={(e) => {
                            setUserQuerry(e.target.value);
                        }}
                        placeholder='How to scale my business, how to overcome a breakup, etc'
                    />
                </div>
                {
                    showQuerrySaveBtn &&
                    <div>
                        {
                            updateLoader ?
                                <CircularProgress size={17} /> :
                                <button
                                    className='text-purple underline'
                                    style={{ fontWeight: "500", fontSize: 15, fontFamily: "inter" }}
                                    onMouseDown={(e) => e.preventDefault()}
                                    onClick={handleUpdateAi}
                                >
                                    Save
                                </button>
                        }
                    </div>
                    // :
                    // <button className='text-purple underline' style={{ fontWeight: "500", fontSize: 15, fontFamily: "inter" }}
                    //     onClick={(e) => {
                    //         querryRef.current.focus();
                    //     }}>
                    //     Edit
                    // </button>
                }
                {/* <Popover
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
                </Popover> */}
            </div>

            <div>
                <button className='text-purple underline mt-12' onClick={() => setOpenAdvanceSettingPopup(true)}>
                    Advanced settings
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
                            className="sm:w-10/12 w-11/12 h-[85vh]"
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
                                    Advanced settings
                                </div>
                                <div className='mt-2'>
                                    <AiCharacteristicSeeting recallApi={recallApi} aiData={aiData} />
                                </div>
                            </div>
                        </div>
                    </div>
                </Box>
            </Modal>

            <div>
                <Snackbar
                    open={resultSnack}
                    autoHideDuration={3000}
                    onClose={() => {
                        setResultSnack(null);
                    }}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'center'
                    }}
                    TransitionComponent={Fade}
                    TransitionProps={{
                        direction: 'center'
                    }}
                >
                    <Alert
                        onClose={() => {
                            setResultSnack(null)
                        }} severity="none"
                        className='bg-purple rounded-lg text-white'
                        sx={{ width: 'auto', fontWeight: '700', fontFamily: 'inter', fontSize: '22' }}>
                        {resultSnack}
                    </Alert>
                </Snackbar>
            </div>


        </div>
    )
}

export default BasicInformation