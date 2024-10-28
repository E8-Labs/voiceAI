import Apis from '@/components/apis/Apis';
import { Alert, Box, CircularProgress, Fade, Modal, Popover, Snackbar } from '@mui/material';
import { DotsThree } from '@phosphor-icons/react'
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'

const Objectives = ({ recallApi, aiData, loader }) => {


    const aiObjectiveRef = useRef(null);
    const [aiObjective, setAiObjective] = useState("");
    const [updateLoader, setUpdateLoader] = useState(false);
    const [showSaveBtn, setShowSaveBtn] = useState(false);
    const [resultSnack, setResultSnack] = useState(null);
    const [openExamplesPopup, setOpenExamplesPopup] = useState(false);

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
    }

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