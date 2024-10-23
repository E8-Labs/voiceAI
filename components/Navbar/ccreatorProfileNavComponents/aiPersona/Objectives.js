import Apis from '@/components/apis/Apis';
import { Alert, CircularProgress, Fade, Popover, Snackbar } from '@mui/material';
import { DotsThree } from '@phosphor-icons/react'
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'

const Objectives = ({ recallApi, aiData, loader }) => {


    const aiObjectiveRef = useRef(null);
    const [aiObjective, setAiObjective] = useState("");
    const [updateLoader, setUpdateLoader] = useState(false);
    const [showSaveBtn, setShowSaveBtn] = useState(false);
    const [resultSnack, setResultSnack] = useState(null);

    const [anchorEl, setAnchorEl] = useState(null);

    useEffect(() => {
        if (aiData?.ai?.aiObjective) {
            setAiObjective(aiData.ai.aiObjective);
        } else {
            setAiObjective("");
        }
    }, [recallApi]);

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
                const AuthToken = Data.data.token;
                console.log("Auth token is", AuthToken);
                const ApiPath = Apis.UpdateBuilAI;
                console.log("Api path is", ApiPath);
                const formData = new FormData();
                if (aiObjective) {
                    formData.append('aiObjective', aiObjective)
                }

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
                        aiObjectiveRef.current.blur();
                    }
                }
            }
        } catch (error) {
            console.error("Error occured in api is", error);
        } finally {
            setUpdateLoader(false);
        }
    }



    return (
        <div className='w-full'>
            <div style={{ fontWeight: "medium", fontSize: 20, fontFamily: "inter" }}>
                Objectives
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