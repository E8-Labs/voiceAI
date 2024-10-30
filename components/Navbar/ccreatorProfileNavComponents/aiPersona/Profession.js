import Apis from '@/components/apis/Apis';
import { Alert, CircularProgress, Fade, Popover, Snackbar } from '@mui/material'
import { DotsThree } from '@phosphor-icons/react'
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'

const Profession = ({ recallApi, aiData }) => {


    const [professionData, setProfessionData] = useState([
        {
            id: 1,
            heading: "Describe what {name} does as a creator?",
            details: "Lorem ipsum dolor sit amet consectetur. Amet quis interdum ipsum non eu aliquam aliquet consequat et. Tincidunt pharetra quam ac viverra. Sit pellentesque faucibus non sit. Feugiat consequat ultrices erat est. Nulla."
        },
        {
            id: 2,
            heading: "What does {name} help your community with?",
            details: "Lorem ipsum dolor sit amet consectetur. Amet quis interdum ipsum non eu aliquam aliquet consequat et. Tincidunt pharetra quam ac viverra. Sit pellentesque faucibus non sit. Feugiat consequat ultrices erat est. Nulla."
        },
    ]);

    const [ProfessionAnchorel, setProfessionAnchorel] = useState(null);
    const ProfessionPopoverId = ProfessionAnchorel ? 'simple-popover' : undefined;
    const [professionLoader, setProfessionLoader] = useState(false);


    const [updateLoader, setUpdateLoader] = useState(false);
    const [resultSnack, setResultSnack] = useState(false);
    //code for tagline
    const taglineRef = useRef(null);
    const [tagline, setTagline] = useState("");
    const [showTaglineBtn, setShowTaglineBtn] = useState(false);

    //code for action
    const actionRef = useRef();
    const [actionValue, setActionValue] = useState("");
    const [showActionBtn, setShowActionBtn] = useState(false);


    useEffect(() => {
        if (aiData) {
            setTagline(aiData.ai.tagline);
            setActionValue(aiData.ai.action);
            if (aiData?.ai?.tagline && aiData?.ai?.action) {
                console.log("Professionn added")
            } else {
                processObjectiveProfession();
            }
        }
    }, [recallApi]);

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


    const handeProfessionMoreClick = (event) => {
        setProfessionAnchorel(event.currentTarget);
    }

    const handleClose = () => {
        setProfessionAnchorel(null);
    };


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
                formData.append('tagline', tagline)
                formData.append('possibleUserQuery', actionValue)

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
                        taglineRef.current.blur();
                        recallApi();
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
        <div>
            <div style={{ fontWeight: "500", fontSize: 20, fontFamily: "inter" }}>
                <span style={{ color: "#00000060" }}>AI Characteristics |</span> Profession
            </div>
            <div style={{ fontWeight: "500", fontSize: 15, fontFamily: "inter", marginTop: 35 }}>
                Profession
            </div>

            <div className='flex flex-row items-start p-4 border border-[#00000010] mt-8 justify-between'>
                <div className='w-full'>
                    <div style={{ fontWeight: "bold", fontSize: 13, fontFamily: "inter" }}>
                        Describe what {aiData?.ai?.name?.charAt(0).toUpperCase() + aiData?.ai?.name?.slice(+1)} does as a creator?
                    </div>
                    <div className='mt-4 w-full' style={{ fontWeight: "500", fontSize: 13, fontFamily: "inter" }}>
                        {/* {aiData.ai.tagline} */}
                        <input
                            className='w-[90%] outline-none border-none'
                            ref={taglineRef}
                            value={tagline}
                            onChange={(e) => { setTagline(e.target.value) }}
                            onFocus={() => { setShowTaglineBtn(true) }}
                            onBlur={() => { setShowTaglineBtn(false) }}
                            placeholder='I talk about dating, business, fitness.. '
                        />
                    </div>
                </div>

                {
                    showTaglineBtn &&
                    (
                        <div>
                            {
                                updateLoader ?
                                    <CircularProgress size={15} /> :
                                    <button
                                        className='text-purple underline'
                                        style={{ fontWeight: "500", fontSize: 15, fontFamily: "inter" }}
                                        onMouseDown={(e) => {
                                            e.preventDefault()
                                        }}
                                        onClick={handleUpdateAi}
                                    >
                                        Save
                                    </button>
                            }
                        </div>
                    )
                    // :
                    // <button
                    //     className='text-purple underline'
                    //     style={{ fontWeight: "500", fontSize: 15, fontFamily: "inter" }}
                    //     onClick={() => {
                    //         taglineRef.current.focus()
                    //     }}
                    // >
                    //     Edit
                    // </button>
                }


                {/* <div>
                    <button className='-mt-2' aria-describedby={ProfessionPopoverId} variant="contained" color="primary" onClick={(event) => { handeProfessionMoreClick(event) }}>
                        <DotsThree size={32} weight="bold" />
                    </button>
                    <Popover
                        id={ProfessionPopoverId}
                        open={Boolean(ProfessionAnchorel)}
                        anchorEl={ProfessionAnchorel}
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
                            <button className='text-purple' style={{ fontSize: 13, fontWeight: "500", fontFamily: "inter" }}
                            // onClick={() => { setUpdateIntractionModal(true) }}
                            >
                                Edit
                            </button>
                            {
                                professionLoader ?
                                    <CircularProgress style={{ marginTop: 8 }} size={15} /> :
                                    <button style={{ fontSize: 13, fontWeight: "500", fontFamily: "inter", marginTop: 8 }}
                                    // onClick={handleDeleteteIntraction}
                                    >
                                        Delete
                                    </button>
                            }
                        </div>
                    </Popover>
                </div> */}
            </div>

            <div className='flex flex-row items-start p-4 border border-[#00000010] mt-8 justify-between'>
                <div className='w-full'>
                    <div style={{ fontWeight: "bold", fontSize: 13, fontFamily: "inter" }}>
                        What does {aiData?.ai?.name?.charAt(0).toUpperCase() + aiData?.ai?.name?.slice(+1)} help your community with?
                    </div>
                    <div className='mt-4 w-full' style={{ fontWeight: "500", fontSize: 13, fontFamily: "inter" }}>
                        {/* {aiData.ai.action} */}
                        <input
                            className='w-full border-none outline-none'
                            ref={actionRef}
                            value={actionValue}
                            onChange={(e) => { setActionValue(e.target.value) }}
                            onFocus={() => { setShowActionBtn(true) }}
                            onBlur={() => { setShowActionBtn(false) }}
                            placeholder='I help my community of followers with understanding their feelings for others, overcoming obstacles with their relationships, etc'
                        />
                    </div>
                </div>

                {
                    showActionBtn && (
                        <div>
                            {
                                updateLoader ?
                                    <CircularProgress size={15} /> :
                                    <button
                                        className='text-purple underline'
                                        style={{ fontWeight: "500", fontSize: 15, fontFamily: "inter" }}
                                        onMouseDown={(e) => {
                                            e.preventDefault()
                                        }}
                                        onClick={handleUpdateAi}
                                    >
                                        Save
                                    </button>
                            }
                        </div>
                    )
                    //  :
                    // <button
                    //     className='text-purple underline'
                    //     style={{ fontWeight: "500", fontSize: 15, fontFamily: "inter" }}
                    //     onClick={() => {
                    //         actionRef.current.focus()
                    //     }}
                    // >
                    //     Edit
                    // </button>
                }


                {/* <div>
                    <button className='-mt-2' aria-describedby={ProfessionPopoverId} variant="contained" color="primary" onClick={(event) => { handeProfessionMoreClick(event) }}>
                        <DotsThree size={32} weight="bold" />
                    </button>
                    <Popover
                        id={ProfessionPopoverId}
                        open={Boolean(ProfessionAnchorel)}
                        anchorEl={ProfessionAnchorel}
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
                            <button className='text-purple' style={{ fontSize: 13, fontWeight: "500", fontFamily: "inter" }}
                            // onClick={() => { setUpdateIntractionModal(true) }}
                            >
                                Edit
                            </button>
                            {
                                professionLoader ?
                                    <CircularProgress style={{ marginTop: 8 }} size={15} /> :
                                    <button style={{ fontSize: 13, fontWeight: "500", fontFamily: "inter", marginTop: 8 }}
                                    // onClick={handleDeleteteIntraction}
                                    >
                                        Delete
                                    </button>
                            }
                        </div>
                    </Popover>
                </div> */}
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

        </div>
    )
}

export default Profession