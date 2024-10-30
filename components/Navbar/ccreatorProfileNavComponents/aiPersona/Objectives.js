import Apis from '@/components/apis/Apis';
import { Alert, Box, CircularProgress, Fade, Modal, Popover, Snackbar, TextField } from '@mui/material';
import { CaretDown, CaretUp, DotsThree } from '@phosphor-icons/react'
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

const Objectives = ({ recallApi, aiData, loader }) => {


    const aiObjectiveRef = useRef(null);
    const [aiObjective, setAiObjective] = useState("");
    const [updateLoader, setUpdateLoader] = useState(false);
    const [showSaveBtn, setShowSaveBtn] = useState(false);
    const [resultSnack, setResultSnack] = useState(null);
    //code for the examples modal
    const [openExamplesPopup, setOpenExamplesPopup] = useState(false);
    const [toggleShowDetails, setToggleShowDetails] = useState(null);

    const [anchorEl, setAnchorEl] = useState(null);

    useEffect(() => {
        const localAiPersonaDetails = localStorage.getItem("aiPersonaDetails");
        if (localAiPersonaDetails) {
            const AiDetails = JSON.parse(localAiPersonaDetails);
            if (AiDetails?.ai?.aiObjective) {
                console.log("Objectives exist");
            } else {
                processObjectiveProfession();
            }
            setAiObjective(AiDetails?.ai?.aiObjective);
            console.log("Aidetails recieved from local storage are", AiDetails);
        }
        // if (aiData?.ai?.aiObjective) {
        //     setAiObjective(aiData.ai.aiObjective);
        // } else {
        //     setAiObjective("");
        // }
    }, []);

    const processObjectiveProfession = async () => {
        const localData = localStorage.getItem("User");
        if (localData) {
            const Data = JSON.parse(localData);
            console.log("localdata  of user is", Data.data.user);
            try {
                const ApiPath = Apis.ProcessObjectiveProfession;
                const AuthToken = Data.data.token;
                console.log("Auth token is", AuthToken);
                const response = await axios.post(ApiPath, {
                    headers: {
                        'Authorization': "Bearer " + AuthToken,
                        "Content-Type": "application/json"
                    }
                });
                if (response) {
                    console.log("Response of processObjectiveProfession api is ::", response.data.data);
                }
            } catch (error) {
                console.error("Error occured in api is", error);
            }
        }
    }

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    // const open = Boolean(anchorEl);
    const id = anchorEl ? 'simple-popover' : undefined;



    //code to update ai
    const handleUpdateAi = async () => {
        const localData = localStorage.getItem('User');
        try {
            setUpdateLoader(true);
            if (localData) {
                const Data = JSON.parse(localData);
                const AiPersona = localStorage.getItem('aiPersonaDetails');
                const PersonaDetails = JSON.parse(AiPersona);
                // console.log('Data of localstorage is', PersonaDetails);
                //code for updating localdata
                // let Updated = Data.data
                // return
                const AuthToken = Data.data.token;
                console.log("Auth token is", AuthToken);
                const ApiPath = Apis.UpdateBuilAI;
                console.log("Api path is", ApiPath);
                const formData = new FormData();
                // if (aiObjective) {
                formData.append('aiObjective', aiObjective)
                // }

                console.log("Form data is");
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
                        aiObjectiveRef.current.blur();
                        let ObjectiveUpdate = PersonaDetails.ai.aiObjective;
                        ObjectiveUpdate = aiObjective;
                        localStorage.setItem('aiPersonaDetails', JSON.stringify(ObjectiveUpdate));
                    }
                }
            }
        } catch (error) {
            console.error("Error occured in api is", error);
        } finally {
            setUpdateLoader(false);
        }
    }

    //code for modal styles
    const styles = {
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
        },
        AddNewValueModal: {
            height: "auto",
            bgcolor: "transparent",
            // p: 2,
            mx: "auto",
            my: "50vh",
            transform: "translateY(-55%)",
            borderRadius: 2,
            border: "none",
            outline: "none",
        },
    }

    const examplesData = [
        {
            id: 1,
            title: "Life Coach",
            description: "Your objective is to emulate {Creator Name}, a {life and personal development} expert, as callers reach out to discuss topics of {goal setting, mindset, emotional resilience, and life balance}. As {Creator Name}, embody a {compassionate, motivational, and insightful} persona providing guidance that empowers callers to gain {clarity, overcome personal obstacles, and build fulfilling lives}. Your advice should be practical and grounded, offering steps callers can apply in their daily routines to achieve {growth, happiness, and self-fulfillment}. During each call, identify the caller's main challenges or aspirations and make a tailored pitch for relevant products or services {Creator Name} offers, ensuring each suggestion aligns with the caller's personal journey and objectives."
        },
        {
            id: 2,
            title: "Fitness Coach",
            description: "Your objective is to emulate {Creator Name}, a {fitness and health} coach, as callers reach out to seek support on {exercise routines, nutrition, weight loss, and fitness motivation}. As {Creator Name}, embody a {motivational, knowledgeable, and supportive} persona that drives callers to take tangible steps toward {improving their physical health and fitness levels}. Your advice should be actionable, customized to each caller's fitness goals, and centered on long-term wellness and body positivity. Throughout the call, assess the caller's fitness background, current routines, and specific goals to make a personalized pitch for {Creator Name's} products or services, such as workout plans, coaching sessions, or nutrition guides, ensuring each recommendation feels relevant and achievable."
        },
        {
            id: 3,
            title: "Business Coach",
            description: "Your objective is to emulate {Creator Name}, an {entrepreneurship and business strategy} expert, as callers reach out to seek insights on {business growth, leadership, productivity, and scaling operations}. As {Creator Name}, embody a {strategic, results-oriented, and insightful} persona, helping callers break down complex business challenges into clear, actionable steps. Your guidance should focus on empowering callers to build {sustainable, successful business models} and develop leadership skills that foster team and personal growth. During the call, pinpoint the caller's business pain points or aspirations, providing tailored advice that aligns with their unique challenges. When relevant, pitch {Creator Name's} specialized services, such as one-on-one business coaching, courses, or tools, to further enhance their business journey and help them achieve their goals effectively."
        },
        {
            id: 3,
            title: "Dating Coach",
            description: "Your objective is to emulate {Creator Name}, a {dating and relationship} expert, as callers reach out to discuss topics of {confidence, relationship advice, and personal growth}. As Tristan, embody a {confident, knowledgeable, and empathetic persona} providing deep insights and practical advice on {dating dynamics, relationship management, and self-improvement}. Your guidance advice should be actionable, tailored to individual caller scenarios, encouraging them to become {more confident and successful in their interpersonal interactions}. During each call, actively identify the caller's main challenges or goals and make a personalized pitch or offer based on the products and services {Creatorname} offers that specifically addresses their needs, enhancing the relevance and impact of the advice given."
        }
    ]



    return (
        <div className='w-full'>
            <div className='w-11/12 flex flex-row items-center justify-between'>
                <div style={{ fontWeight: "medium", fontSize: 20, fontFamily: "inter" }}>
                    Objective
                </div>
                <button className='underline text-purple' onClick={() => { setOpenExamplesPopup(true) }}>
                    View Example
                </button>
            </div>
            <div style={{ fontWeight: "medium", fontSize: 14, fontFamily: "inter", color: "#00000060" }}>
                If you would like to reference the caller, use {`callername`}.<br /> Ex: Hey {`callername`}, it's …
            </div>

            {
                loader ?
                    <div className='w-full flex flex-row justify-center mt-8'>
                        <CircularProgress size={35} />
                    </div>
                    :
                    <div>
                        <div className='flex flex-row items-center justify-between w-11/12 border-[2px] border-[#00000010] pe-4 rounded mt-4'>
                            <div className='w-full'>
                                {/* <textarea
                                    className='w-[90%] outline-none border-none'
                                    rows={6}
                                    ref={aiObjectiveRef}
                                    value={aiObjective}
                                    onChange={(e) => { setAiObjective(e.target.value) }}
                                    onFocus={() => { setShowSaveBtn(true) }}
                                    onBlur={() => { setShowSaveBtn(false) }}
                                    placeholder="What's the objective for your AI?"
                                    style={{ resize: "none" }}
                                /> */}
                                <TextField
                                    multiline
                                    minRows={1}
                                    maxRows={8}
                                    ref={aiObjectiveRef}
                                    value={aiObjective}
                                    onChange={(e) => { setAiObjective(e.target.value) }}
                                    onFocus={() => { setShowSaveBtn(true) }}
                                    onBlur={() => { setShowSaveBtn(false) }}
                                    className='w-[100%] outline-none border-none'
                                    placeholder="What's the objective for your AI?"
                                    sx={{
                                        "& .MuiOutlinedInput-root": {
                                            "& fieldset": {
                                                border: "none", // Ensures no border in default state
                                            },
                                            "&:hover fieldset": {
                                                border: "none", // No border on hover
                                            },
                                            "&.Mui-focused fieldset": {
                                                border: "none", // No border when focused
                                            },
                                        },
                                    }}
                                />
                            </div>
                            <div>
                                {
                                    showSaveBtn && (
                                        <div>
                                            {
                                                updateLoader ?
                                                    <CircularProgress size={15} /> :
                                                    <button
                                                        className='text-purple underline'
                                                        style={{ fontWeight: "500", fontSize: 15, fontFamily: "inter" }}
                                                        onMouseDown={(e) => { e.preventDefault() }}
                                                        onClick={handleUpdateAi}
                                                    >
                                                        Save
                                                    </button>
                                            }
                                        </div>
                                    )
                                    //  :
                                    //     <button
                                    //         onClick={() => { aiObjectiveRef.current.focus() }}
                                    //         className='text-purple underline'
                                    //         style={{ fontWeight: "500", fontSize: 15, fontFamily: "inter" }}
                                    //     >
                                    //         Edit
                                    //     </button>
                                }
                            </div>
                            {/* <div>
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
                </div> */}

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
                            {/* <Box className="lg:w-5/12 sm:w-7/12 w-full" sx={styles.examplesModalStyle}>
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
                                                Examples
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
                            </Box> */}


                            <Box className="lg:w-5/12 sm:w-7/12 w-full" sx={styles.AddNewValueModal}>
                                {/* <LoginModal creator={creator} assistantData={getAssistantData} closeForm={setOpenLoginModal} /> */}
                                <div className="flex flex-row justify-center w-full">
                                    <div
                                        className="sm:w-7/12 w-full"
                                        style={{
                                            backgroundColor: "#ffffff20",
                                            padding: 20,
                                            borderRadius: 10,
                                        }}
                                    >
                                        <div style={{ backgroundColor: "#ffffff", borderRadius: 7, padding: 10 }}>
                                            <div className='flex flex-row items-center justify-between p-2' style={{ fontWeight: '500', fontFamily: "inter", fontSize: 20 }}>
                                                {/* <p /> */}
                                                <p>Objectives Examples</p>
                                                <button onClick={() => { setOpenExamplesPopup(false) }}>
                                                    <Image src="/assets/crossBtn.png" height={15} width={15} alt='*' />
                                                </button>
                                            </div>
                                            <div className='mt-4 overflow-auto max-h-[50vh] scrollbar scrollbar-track-transparent scrollbar-thin scrollbar-thumb-purple'>
                                                {
                                                    examplesData.map((item, index) => (
                                                        <div key={item.id} className='border rounded-lg mb-6 px-4 py-2'>
                                                            <button className='flex flex-row items-center w-full justify-between' onClick={(e) => { setToggleShowDetails(prevId => prevId === item.id ? null : item.id) }}>
                                                                <div style={{ fontWeight: "600", fontSize: 13, fontFamily: "inter" }}>
                                                                    {
                                                                        item.title
                                                                    }
                                                                </div>
                                                                <div>
                                                                    {item.id === toggleShowDetails ?
                                                                        <CaretUp size={22} weight="light" color='#620FEB' /> :
                                                                        <CaretDown size={22} weight="light" />
                                                                    }
                                                                </div>
                                                            </button>
                                                            {
                                                                item.id === toggleShowDetails && (
                                                                    <div style={{ fontWeight: "400", fontSize: 15, fontFamily: "inter" }}>
                                                                        {
                                                                            item.description
                                                                        }
                                                                    </div>
                                                                )
                                                            }
                                                        </div>
                                                    )
                                                    )
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Box>


                        </Modal>
                        {/* {
                            aiObjective ?
                                <div className='flex flex-row items-center justify-between w-11/12 border-[2px] border-[#00000010] p-4 rounded mt-4'>
                                    <div className='w-full'>
                                        <input
                                            className='w-[90%] outline-none border-none'
                                            ref={aiObjectiveRef}
                                            value={aiObjective}
                                            onChange={(e) => { setAiObjective(e.target.value) }}
                                            onFocus={() => { setShowSaveBtn(true) }}
                                            onBlur={() => { setShowSaveBtn(false) }}
                                            placeholder='Ai Objective'
                                        />
                                    </div>
                                    <div>
                                        {
                                            showSaveBtn ?
                                                <div>
                                                    {
                                                        updateLoader ?
                                                            <CircularProgress size={15} /> :
                                                            <button
                                                                className='text-purple underline'
                                                                style={{ fontWeight: "500", fontSize: 15, fontFamily: "inter" }}
                                                                onMouseDown={(e) => { e.preventDefault() }}
                                                                onClick={handleUpdateAi}
                                                            >
                                                                Save
                                                            </button>
                                                    }
                                                </div> :
                                                <button
                                                    onClick={() => { aiObjectiveRef.current.focus() }}
                                                    className='text-purple underline'
                                                    style={{ fontWeight: "500", fontSize: 15, fontFamily: "inter" }}
                                                >
                                                    Edit
                                                </button>
                                        }
                                    </div>
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


                                </div> :
                                <div className=''>

                                    <div className='text-2xl font-bold text-center mt-8'>
                                        You have no objective
                                    </div>

                                </div>
                        } */}
                    </div>
            }

        </div>
    )
}

export default Objectives