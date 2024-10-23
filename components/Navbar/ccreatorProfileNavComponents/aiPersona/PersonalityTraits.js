import { Alert, Box, CircularProgress, Fade, Modal, Popover, Slider, Snackbar } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Apis from '@/components/apis/Apis';
import axios from 'axios';
import { ArrowRight, DotsThree } from '@phosphor-icons/react';
import Image from 'next/image';

const PersonalityTraits = ({ aiData, recallApi }) => {

    const [openManuallyTrait, setOpenManuallyTrait] = useState(false);
    const [newTrait, setNewTrait] = useState("");
    const [openAddTraitPopup, setOpenAddTraitPopup] = useState(false);
    const [openUpdateTraitPopup, setOpenUpdateTraitPopup] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const id = anchorEl ? 'simple-popover' : undefined;
    const [newTraitSliderValue, setNewTraitSliderValue] = useState("1");
    const [personalityTraits, setPersonalityTraits] = useState([]);
    const [loadTraitsLoader, setLoadTraitsLoader] = useState(false);
    const [addTraitsLoader, setAddTraitsLoader] = useState(false);
    const [deleteTraitsLoader, setDeleteTraitsLoader] = useState(false);
    const [updateTraitValue, setUpdateTraitValue] = useState("");
    const [updateTraitSliderValue, setUpdateTraitSliderValue] = useState("");
    const [updateTraitId, setUpdateTraitId] = useState("");
    const [updateTraitItem, setUpdateTraitItem] = useState("");
    const [delTraitId, setDelTraitId] = useState("");
    const [showSaveBtn, setShowSaveBtn] = useState(null);
    const [updateTraitsLoader, setUpdateTraitsLoader] = useState(false);
    const [updateSnackMsg, setUpdateSnackMsg] = useState(null);

    const handleClick = (event, item) => {
        setAnchorEl(event.currentTarget);
        setUpdateTraitItem(item);
        setDelTraitId(item.id);
    };
    console.log("Anchor el value is", updateTraitItem);

    const handleClose = () => {
        setAnchorEl(null);
    };
    const getAiApi = async () => {
        try {
            setLoadTraitsLoader(true);
            const ApiPath = Apis.MyAiapi;
            const localData = localStorage.getItem('User');
            const Data = JSON.parse(localData);
            const AuthToken = Data.data.token;
            console.log("Authtoken is", AuthToken);
            console.log("Apipath is", ApiPath);

            const response = await axios.get(ApiPath, {
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": "Bearer " + AuthToken
                }
            });
            if (response) {
                console.log("Response of getai api", response.data.data);
                if (response.data) {
                    setMyAiData(response.data.data);
                    setPersonalityTraits(response.data.data.traits);
                }
            }
        } catch (error) {
            console.error("ERR occured in get ai api is", error);
        } finally {
            setLoadTraitsLoader(false);
        }
    }

    useEffect(() => {
        // getAiApi();
        try {
            setLoadTraitsLoader(true);
            // console.log("Data recieved is", aiData);
            // setPersonalityTraits(aiData.traits);
            const localAiPersonaDetails = localStorage.getItem("aiPersonaDetails");
            if (localAiPersonaDetails) {
                const AiDetails = JSON.parse(localAiPersonaDetails);
                setPersonalityTraits(AiDetails.traits);
                console.log("Aidetails recieved from local storage are", AiDetails);
            }
        } catch (error) {
            console.error("ERror occured");
        } finally {
            setLoadTraitsLoader(false);
        }
    }, [recallApi]);

    //code to add trait api
    const handleAddTrait = async () => {
        try {
            setAddTraitsLoader(true);
            const ApiPath = Apis.AddTrait;
            const localData = localStorage.getItem('User');
            const Data = JSON.parse(localData);
            const AuthToken = Data.data.token;
            console.log("Authtoken is", AuthToken);
            console.log("Apipath is", ApiPath);

            const ApiData = {
                trait: newTrait,
                score: newTraitSliderValue
            }

            console.log("Data sendgin in api is", ApiData);

            const response = await axios.post(ApiPath, ApiData, {
                headers: {
                    "Authorization": "Bearer " + AuthToken,
                    "Content-Type": "application/json"
                }
            });
            if (response) {
                console.log("Response of add trait api is", response.data);
                if (response.data.status === true) {
                    setOpenAddTraitPopup(false);
                    setNewTrait("");
                    setNewTraitSliderValue("");
                    setOpenManuallyTrait(false);
                    setPersonalityTraits(response.data.data.traits);
                    localStorage.setItem('aiPersonaDetails', JSON.stringify(response.data.data));
                } else {
                    console.log("Error occured")
                }
            }

        } catch (error) {
            console.error("ERR occured in add Trait api is", error);
        } finally {
            setAddTraitsLoader(false);
        }
    }


    //code to update the trait
    const handleUpdateTraitPopupClick = () => {
        console.log("Trait to be update is", updateTraitItem);
        setUpdateTraitValue(updateTraitItem.trait);
        setUpdateTraitSliderValue(updateTraitItem.score);
        setUpdateTraitId(updateTraitItem.id);
        setOpenUpdateTraitPopup(true);
    }

    //api call to update trait
    const handleUpdateTrait = async (item) => {
        try {
            setUpdateTraitsLoader(true);
            const ApiPath = Apis.UpdateTrait;
            const localData = localStorage.getItem('User');
            const Data = JSON.parse(localData);
            const AuthToken = Data.data.token;
            console.log("Authtoken is", AuthToken);
            console.log("Apipath is", ApiPath);

            // let ApiData = null

            // if (event === "updatetitle") {
            //     ApiData = {
            //         id: updateTraitId,
            //         trait: updateTraitValue,
            //         score: updateTraitSliderValue,
            //     }
            // } else {
            //     ApiData = {
            //         id: item.id,
            //         // trait: updateTraitValue,
            //         score: item.score,
            //     }
            // }

            const ApiData = {
                id: item.id,
                // trait: updateTraitValue,
                score: item.score,
            }

            console.log("Data sendgin in api is", ApiData);

            const response = await axios.post(ApiPath, ApiData, {
                headers: {
                    "Authorization": "Bearer " + AuthToken,
                    "Content-Type": "application/json"
                }
            });
            if (response) {
                console.log("Response of update trait api is", response.data);
                setUpdateSnackMsg(response.data.message);
                if (response.data.status === true) {
                    setAnchorEl(null);
                    setOpenUpdateTraitPopup(false);
                    // setPersonalityTraits(response.data.data.traits);
                    recallApi();
                    localStorage.setItem('aiPersonaDetails', JSON.stringify(response.data.data));
                } else {
                    console.log("Error occured")
                }
            }

        } catch (error) {
            console.error("ERR occured in add Trait api is", error);
        } finally {
            setUpdateTraitsLoader(false);
            setShowSaveBtn(null);
        }
    }

    //api call to update trait
    const handleUpdateTrait2 = async () => {
        try {
            setUpdateTraitsLoader(true);
            const ApiPath = Apis.UpdateTrait;
            const localData = localStorage.getItem('User');
            const Data = JSON.parse(localData);
            const AuthToken = Data.data.token;
            console.log("Authtoken is", AuthToken);
            console.log("Apipath is", ApiPath);

            // let ApiData = null

            // if (event === "updatetitle") {

            // } else {
            //     ApiData = {
            //         id: item.id,
            //         // trait: updateTraitValue,
            //         score: item.score,
            //     }
            // }

            const ApiData = {
                id: updateTraitId,
                trait: updateTraitValue,
                score: updateTraitSliderValue,
            }

            console.log("Data sendgin in api is", ApiData);

            const response = await axios.post(ApiPath, ApiData, {
                headers: {
                    "Authorization": "Bearer " + AuthToken,
                    "Content-Type": "application/json"
                }
            });
            if (response) {
                console.log("Response of update trait api is", response.data);
                setUpdateSnackMsg(response.data.message);
                if (response.data.status === true) {
                    setAnchorEl(null);
                    setOpenUpdateTraitPopup(false);
                    // setPersonalityTraits(response.data.data.traits);
                    recallApi();
                    localStorage.setItem('aiPersonaDetails', JSON.stringify(response.data.data));
                } else {
                    console.log("Error occured")
                }
            }

        } catch (error) {
            console.error("ERR occured in add Trait api is", error);
        } finally {
            setUpdateTraitsLoader(false);
            setShowSaveBtn(null);
        }
    }

    //api call to delete trait
    const handleDelTrait = async () => {
        try {
            setAddTraitsLoader(true);
            const ApiPath = Apis.DeleteTrait;
            const localData = localStorage.getItem('User');
            const Data = JSON.parse(localData);
            const AuthToken = Data.data.token;
            console.log("Authtoken is", AuthToken);
            console.log("Apipath is", ApiPath);

            const ApiData = {
                id: delTraitId,
                // trait: updateTraitValue,
                // score: updateTraitSliderValue,
            }

            console.log("Data sendgin in api is", ApiData);

            const response = await axios.post(ApiPath, ApiData, {
                headers: {
                    "Authorization": "Bearer " + AuthToken,
                    "Content-Type": "application/json"
                }
            });
            if (response) {
                console.log("Response of delete trait api is", response.data);
                if (response.data.status === true) {
                    setAnchorEl(null);
                    // getAiApi();
                    setPersonalityTraits(response.data.data.traits);
                    localStorage.setItem('aiPersonaDetails', JSON.stringify(response.data.data));
                    // setPersonalityTraits(prevTraits =>
                    //     prevTraits.filter(trait => trait.id !== delTraitId)
                    // );
                } else {
                    console.log("Error occured", response)
                }
                setUpdateSnackMsg(response.data.message);
            }

        } catch (error) {
            console.error("ERR occured in delete Trait api is", error);
        } finally {
            setAddTraitsLoader(false);
        }
    }

    //code to change the value of slider from array
    const handleSliderChange = (index, newValue, item) => {

        const oldValue = item.score;
        console.log("Old value:", oldValue);  // Log the old value
        console.log("New value:", newValue);  // Log the new value

        // Now update the state if needed, depending on how you're handling the slider change
        setPersonalityTraits(prevTraits => {
            const updatedTraits = [...prevTraits];
            updatedTraits[index].score = newValue;  // Update the score for the specific trait
            return updatedTraits;
        });

        console.log("item is", item);
        setShowSaveBtn(item);
    };

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
        }
    }

    return (
        <div className='w-10/12 ps-8'>

            {
                loadTraitsLoader ?
                    <div className='w-full flex flex-row justify-center mt-8'>
                        <CircularProgress size={35} />
                    </div> :
                    <div>
                        {
                            personalityTraits && personalityTraits.length > 0 ?
                                <div>
                                    <div className='flex flex-row items-center justify-between'>
                                        <div style={{ fontFamily: 'inter', fontSize: 15, fontWeight: '700' }}>
                                            Personality Trait
                                        </div>
                                        <button className='underline text-purple'
                                            onClick={() => { setOpenManuallyTrait(true) }}>
                                            Add New
                                        </button>
                                    </div>

                                    <div>

                                        <div className='max-h-[54vh] overflow-auto scrollbar scrollbar-thin scrollbar-track-transparent scrollbar-thumb-purple'>
                                            {
                                                personalityTraits.map((item, index) => (
                                                    <div key={index} className='mt-4 px-2'>
                                                        <div className='flex flex-row items-center justify-between'>
                                                            <div className='mt-3' style={{ fontWeight: '400', fontFamily: 'inter', fontSize: 13 }}>
                                                                {item.trait}
                                                            </div>
                                                            <div>
                                                                <button aria-describedby={id} variant="contained" color="primary" onClick={(event) => { handleClick(event, item) }}>
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
                                                                        <button className='text-purple' style={{ fontSize: 13, fontWeight: "500", fontFamily: "inter" }} onClick={handleUpdateTraitPopupClick}>
                                                                            Edit
                                                                        </button>
                                                                        {
                                                                            addTraitsLoader ?
                                                                                <div>
                                                                                    <CircularProgress size={15} />
                                                                                </div> :
                                                                                <button style={{ fontSize: 13, fontWeight: "500", fontFamily: "inter", marginTop: 8 }}
                                                                                    onClick={handleDelTrait}>
                                                                                    Delete
                                                                                </button>
                                                                        }
                                                                    </div>
                                                                </Popover>
                                                            </div>
                                                        </div>
                                                        <div className='mt-10 w-full'>
                                                            <Box className="w-full flex flex-row items-center gap-4">
                                                                <div>
                                                                    1
                                                                </div>
                                                                <Slider
                                                                    max={10}
                                                                    min={1}
                                                                    // defaultValue={5}
                                                                    aria-label="Default"
                                                                    valueLabelDisplay="on"
                                                                    value={item.score}
                                                                    onChange={(e, newValue) => handleSliderChange(index, newValue, item)}
                                                                    sx={{
                                                                        color: 'blue',
                                                                        '& .MuiSlider-valueLabel': {
                                                                            top: '-10px',
                                                                            '& *': {
                                                                                background: '#620FEB',
                                                                                color: '#ffffff',
                                                                                boxShadow: "none",
                                                                                border: "none",
                                                                                padding: '4px 8px',
                                                                                borderRadius: '4px',
                                                                                margin: 0,
                                                                            },
                                                                            backgroundColor: 'transparent',
                                                                            '&:before': {
                                                                                content: '""',
                                                                                position: 'absolute',
                                                                                width: 0,
                                                                                height: 0,
                                                                                borderLeft: '6px solid transparent',
                                                                                borderRight: '6px solid transparent',
                                                                                borderTop: '6px solid #620FEB',
                                                                                bottom: '-2px',
                                                                                left: '50%',
                                                                                transform: 'translateX(-50%)',
                                                                            },
                                                                        },
                                                                    }}
                                                                />
                                                                <div>
                                                                    10
                                                                </div>
                                                            </Box>
                                                        </div>

                                                    </div>
                                                ))
                                            }

                                        </div>

                                        {
                                            showSaveBtn && (
                                                <div className='mt-4'>
                                                    {
                                                        updateTraitsLoader ?
                                                            <CircularProgress size={25} /> :
                                                            <button className='text-white bg-purple p-4 py-2' style={{ borderRadius: "50px" }} onClick={() => { handleUpdateTrait(showSaveBtn) }}
                                                            >
                                                                Save Changes
                                                            </button>
                                                    }
                                                </div>
                                            )
                                        }
                                    </div>
                                </div>
                                :
                                <div>
                                    <div style={{ fontWeight: "500", fontSize: 20, fontFamily: "inter" }}>
                                        Personality traits
                                    </div>
                                    <div>
                                        <div className='flex flex-col items-center w-full gap-3 mt-8'>
                                            <Image src="/assets/creatorProfileNavIcons/settingIcon.png" height={75} width={75} alt='seting' />
                                            <div style={{ fontWeight: "500", fontSize: 15, fontFamily: "inter" }}>
                                                No personality trait found
                                            </div>
                                            <div style={{ fontWeight: "500", fontSize: 13, fontFamily: "inter", color: "#050A0860", textAlign: "center" }}>
                                                Please add a knowledge base or connect to your social <br /> media account.
                                            </div>
                                            <button className='bg-purple px-4 py-2 text-white' style={{ borderRadius: "50px" }} onClick={() => { setOpenManuallyTrait(true) }}>
                                                Add New
                                            </button>
                                        </div>
                                    </div>
                                </div>
                        }
                    </div>
            }



            {/* Code for frame work */}
            <Modal
                open={openAddTraitPopup}
                onClose={() => setOpenAddTraitPopup(false)}
                closeAfterTransition
                BackdropProps={{
                    timeout: 1000,
                    sx: {
                        backgroundColor: "transparent",
                        backdropFilter: "blur(20px)",
                    },
                }}
            >
                <Box className="lg:w-5/12 sm:w-7/12 w-full" sx={styles.examplesModalStyle}>
                    {/* <LoginModal creator={creator} assistantData={getAssistantData} closeForm={setOpenLoginModal} /> */}
                    <div className="flex flex-row justify-center w-full">
                        <div
                            className="sm:w-7/12 w-full"
                            style={{
                                backgroundColor: "#ffffff50",
                                padding: 20,
                                borderRadius: 10,
                            }}
                        >
                            <div style={{ backgroundColor: "#ffffff", borderRadius: 7, padding: 10 }}>
                                <div className='flex flex-row items-center justify-between p-2' style={{ fontWeight: '500', fontFamily: "inter", fontSize: 20 }}>
                                    <p />
                                    <p>Add Framework</p>
                                    <button onClick={() => { setOpenAddTraitPopup(false) }}>
                                        <Image src="/assets/crossBtn.png" height={15} width={15} alt='*' />
                                    </button>
                                </div>
                                <div className='mt-4 w-full'>
                                    <div className='flex flex-col items-center w-full'>
                                        <div className='flex flex-row items-center p-4 w-full justify-between rounded-lg mb-6'>
                                            <div style={styles.text1}>
                                                From knowledge base
                                            </div>
                                            <div>
                                                <ArrowRight size={20} weight="bold" color='#620FEB' />
                                            </div>
                                        </div>
                                        <div className='flex flex-row items-center p-4 w-full justify-between rounded-lg mb-6'>
                                            <div style={styles.text1}>
                                                From social account
                                            </div>
                                            <div>
                                                <ArrowRight size={20} weight="bold" color='#620FEB' />
                                            </div>
                                        </div>
                                        <div className='flex flex-row items-center p-4 w-full justify-between rounded-lg'>
                                            <div style={styles.text1}>
                                                Enter manually
                                            </div>
                                            <button onClick={() => { setOpenManuallyTrait(true) }}>
                                                <ArrowRight size={20} weight="bold" color='#620FEB' />
                                            </button>
                                        </div>
                                        {/* <div style={{ height: '30px', borderLeft: "1px dashed #620FEB", width: "1px" }} /> */}
                                    </div>
                                    {/* <div className='w-full flex flex-row justify-center items-center mt-6'>
                                                    <button
                                                        onClick={() => { setOpenExamplesPopup(false) }}
                                                        className='flex flex-row gap-2 justify-center items-center bg-purple text-white px-4 py-2 w-full'
                                                        style={{ fontWeight: "500", fontFamily: "inter", fontSize: 13, borderRadius: "50px" }}>
                                                        <p>
                                                            Close
                                                        </p>
                                                    </button>
                                                </div> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </Box>
            </Modal>

            {/* Code for add trait modal */}
            <Modal
                open={openManuallyTrait}
                onClose={() => setOpenManuallyTrait(false)}
                closeAfterTransition
                BackdropProps={{
                    timeout: 1000,
                    sx: {
                        backgroundColor: "transparent",
                        backdropFilter: "blur(20px)",
                    },
                }}
            >
                <Box className="lg:w-5/12 sm:w-7/12 w-full" sx={styles.examplesModalStyle}>
                    {/* <LoginModal creator={creator} assistantData={getAssistantData} closeForm={setOpenLoginModal} /> */}
                    <div className="flex flex-row justify-center w-full">
                        <div
                            className="sm:w-7/12 w-full"
                            style={{
                                backgroundColor: "#ffffff50",
                                padding: 20,
                                borderRadius: 10,
                            }}
                        >
                            <div style={{ backgroundColor: "#ffffff", borderRadius: 7, padding: 10 }}>
                                <div className='flex flex-row items-center justify-between p-2' style={{ fontWeight: '500', fontFamily: "inter", fontSize: 20 }}>
                                    <p />
                                    <p>Add Trait</p>
                                    <button onClick={() => { setOpenManuallyTrait(false) }}>
                                        <Image src="/assets/crossBtn.png" height={15} width={15} alt='*' />
                                    </button>
                                </div>
                                <div className='mt-4 w-full'>
                                    <div>
                                        <input className='w-full p-2 rounded-lg bg-[#EDEDED80] outline-none border-none'
                                            value={newTrait}
                                            onChange={(e) => setNewTrait(e.target.value)}
                                            placeholder="What's your personality trait?"
                                            style={{ fontWeight: "500", fontFamily: "inter", fontSize: 13 }}
                                        />
                                    </div>

                                    <div className='w-full'>
                                        <Box className="w-full mt-16 w-full flex flex-row items-center gap-4">
                                            <p>1</p>
                                            <Slider
                                                max={10}
                                                min={1}
                                                // defaultValue={5}
                                                aria-label="Default"
                                                valueLabelDisplay="on"
                                                value={newTraitSliderValue}
                                                onChange={(e) => setNewTraitSliderValue(e.target.value)}
                                                sx={{
                                                    color: 'blue',
                                                    '& .MuiSlider-valueLabel': {
                                                        top: '-10px',
                                                        '& *': {
                                                            background: 'blue',
                                                            color: '#ffffff',
                                                            boxShadow: "none",
                                                            border: "none",
                                                            padding: '4px 8px',
                                                            borderRadius: '4px',
                                                            margin: 0,
                                                        },
                                                        backgroundColor: 'transparent',
                                                        '&:before': {
                                                            content: '""',
                                                            position: 'absolute',
                                                            width: 0,
                                                            height: 0,
                                                            borderLeft: '6px solid transparent',
                                                            borderRight: '6px solid transparent',
                                                            borderTop: '6px solid blue',
                                                            bottom: '-2px',
                                                            left: '50%',
                                                            transform: 'translateX(-50%)',
                                                        },
                                                    },
                                                }}
                                            />
                                            <div>10</div>
                                        </Box>
                                    </div>

                                    <div style={{ marginTop: 15 }}>
                                        {
                                            addTraitsLoader ?
                                                <div className='w-full flex flex-row justify-center'>
                                                    <CircularProgress size={25} />
                                                </div> :
                                                <button className='w-full py-2 text-white bg-purple ' style={{ borderRadius: "50px" }} onClick={handleAddTrait}>
                                                    Add
                                                </button>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Box>
            </Modal>

            {/* Modal to update trait */}
            <Modal
                open={openUpdateTraitPopup}
                onClose={() => setOpenUpdateTraitPopup(false)}
                closeAfterTransition
                BackdropProps={{
                    timeout: 1000,
                    sx: {
                        backgroundColor: "transparent",
                        backdropFilter: "blur(20px)",
                    },
                }}
            >
                <Box className="lg:w-5/12 sm:w-7/12 w-full" sx={styles.examplesModalStyle}>
                    {/* <LoginModal creator={creator} assistantData={getAssistantData} closeForm={setOpenLoginModal} /> */}
                    <div className="flex flex-row justify-center w-full">
                        <div
                            className="sm:w-7/12 w-full"
                            style={{
                                backgroundColor: "#ffffff50",
                                padding: 20,
                                borderRadius: 10,
                            }}
                        >
                            <div style={{ backgroundColor: "#ffffff", borderRadius: 7, padding: 10 }}>
                                <div className='flex flex-row items-center justify-between p-2' style={{ fontWeight: '500', fontFamily: "inter", fontSize: 20 }}>
                                    <p />
                                    <p>Update Trait</p>
                                    <button onClick={() => { setOpenUpdateTraitPopup(false) }}>
                                        <Image src="/assets/crossBtn.png" height={15} width={15} alt='*' />
                                    </button>
                                </div>
                                <div className='mt-4 w-full'>
                                    <div>
                                        <input className='w-full p-2 rounded-lg bg-[#EDEDED80] outline-none border-none'
                                            value={updateTraitValue}
                                            onChange={(e) => setUpdateTraitValue(e.target.value)}
                                            placeholder="What's your personality trait?"
                                            style={{ fontWeight: "500", fontFamily: "inter", fontSize: 13 }}
                                        />
                                    </div>

                                    <div className='w-full'>
                                        <Box className="w-full mt-16 w-full flex flex-row items-center gap-4">
                                            <p>1</p>
                                            <Slider
                                                max={10}
                                                min={1}
                                                // defaultValue={5}
                                                aria-label="Default"
                                                valueLabelDisplay="on"
                                                value={updateTraitSliderValue}
                                                onChange={(e) => setUpdateTraitSliderValue(e.target.value)}
                                                sx={{
                                                    color: 'blue',
                                                    '& .MuiSlider-valueLabel': {
                                                        top: '-10px',
                                                        '& *': {
                                                            background: 'blue',
                                                            color: '#ffffff',
                                                            boxShadow: "none",
                                                            border: "none",
                                                            padding: '4px 8px',
                                                            borderRadius: '4px',
                                                            margin: 0,
                                                        },
                                                        backgroundColor: 'transparent',
                                                        '&:before': {
                                                            content: '""',
                                                            position: 'absolute',
                                                            width: 0,
                                                            height: 0,
                                                            borderLeft: '6px solid transparent',
                                                            borderRight: '6px solid transparent',
                                                            borderTop: '6px solid blue',
                                                            bottom: '-2px',
                                                            left: '50%',
                                                            transform: 'translateX(-50%)',
                                                        },
                                                    },
                                                }}
                                            />
                                            <div>10</div>
                                        </Box>
                                    </div>

                                    <div style={{ marginTop: 15 }}>
                                        {
                                            updateTraitsLoader ?
                                                <div className='w-full flex flex-row justify-center'>
                                                    <CircularProgress size={25} />
                                                </div> :
                                                <button className='w-full py-2 text-white bg-purple ' style={{ borderRadius: "50px" }} onClick={handleUpdateTrait2}>
                                                    Update
                                                </button>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Box>
            </Modal>

            <div>
                <Snackbar
                    open={updateSnackMsg}
                    autoHideDuration={3000}
                    onClose={() => {
                        setUpdateSnackMsg(null);
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
                            setUpdateSnackMsg(null);
                        }} severity="none"
                        className='bg-purple text-white'
                        sx={{ width: 'auto', fontWeight: '700', fontFamily: 'inter', fontSize: '22' }}>
                        {updateSnackMsg}
                    </Alert>
                </Snackbar>
            </div>



        </div>
    )
}

export default PersonalityTraits