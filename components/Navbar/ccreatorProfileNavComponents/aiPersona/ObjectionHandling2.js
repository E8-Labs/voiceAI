import Apis from '@/components/apis/Apis';
import { Alert, Box, CircularProgress, Fade, Modal, Popover, Slider, Snackbar } from '@mui/material';
import { CaretDown, CaretUp, DotsThree, Plus } from '@phosphor-icons/react';
import axios from 'axios';
import Image from 'next/image'
import React, { useEffect, useState } from 'react'

const ObjectionHandling2 = () => {

    const [anchorEl, setAnchorEl] = useState(null);
    const [callInstructionData, setCallInstructionData] = useState([]);
    const [strategyLoader, setStrategyLoader] = useState(false);
    const [resultSnackErr, setResultSnackErr] = useState(null);
    const [resultSnack, setResultSnack] = useState(null);
    //code for examples popup
    const [openExamplesPopup, setOpenExamplesPopup] = useState(false);
    const [toggleShowDetails, setToggleShowDetails] = useState(false);
    //add strategy
    const [addStrategyModal, setAddStrategyModal] = useState(false);
    const [addStrategyTitle, setAddStrategyTitle] = useState("");
    const [addStrategyDescription, setAddStrategyDescription] = useState("");
    const [selectedItem, setSelectedItem] = useState("");

    //Update strategy
    const [updateStrategyModal, setUpdateStrategyModal] = useState(false);
    const [updateStrategyTitle, setUpdateStrategyTitle] = useState("");
    const [updateStrategyDescription, setUpdateStrategyDescription] = useState("");

    //code for sliders
    const [assuranceSolution, setAssuranceSolution] = useState(2.5);
    const [validateconcerns, setValidateconcerns] = useState(2.5);
    const [compromisesandAlternatives, setCompromisesandAlternatives] = useState(2.5);
    const [positiveRedirects, setPositiveRedirects] = useState(2.5);
    const [ProvideDetailedExplanation, setProvideDetailedExplanation] = useState(2.5);
    const [updateLoader, setUpdateLoader] = useState(false);

    const handleSliderChange = (event, newValue) => {
        setAssuranceSolution(newValue);

    };

    const handleMoreClick = (event, item) => {
        setAnchorEl(event.currentTarget);
        setSelectedItem(item);
        console.log("Selected item is", item);
        setUpdateStrategyTitle(item.objectionType);
        setUpdateStrategyDescription(item.prompt);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    // const open = Boolean(anchorEl);
    const id = anchorEl ? 'simple-popover' : undefined;

    useEffect(() => {
        const localAiPersonaDetails = localStorage.getItem("aiPersonaDetails");
        if (localAiPersonaDetails) {
            const AiDetails = JSON.parse(localAiPersonaDetails);
            setCallInstructionData(AiDetails.objectionHandling);
            console.log("Aidetails recieved from local storage are", AiDetails);
        }
    }, []);


    //code to update AI
    const handleUpdateAi = async () => {

        try {
            setUpdateLoader(true);
            const ApiPath = Apis.UpdateBuilAI;
            const LocalData = localStorage.getItem("User");
            const Data = JSON.parse(LocalData);
            const AuthToken = Data.data.token;
            //console.log("Auth token", AuthToken);
            const formData = new FormData();
            formData.append("reassurance", assuranceSolution);
            formData.append("validateConcerns", validateconcerns);
            formData.append("compromiseAndAlternatives", compromisesandAlternatives);
            formData.append("positiveRedirects", positiveRedirects);
            formData.append("provideDetailedExplanation", ProvideDetailedExplanation);
            console.log("Data being sent to the API:");
            for (let [key, value] of formData.entries()) {
                console.log(`${key}: ${value}`);
            }
            console.log("Api path is", ApiPath);
            const response = await axios.post(ApiPath, formData, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + AuthToken,
                },
            });

            if (response) {
                console.log("Response of api is", response.data);
                if (response.data.status === true) {
                    console.log("Response of update ai api is", response);
                    localStorage.setItem('aiPersonaDetails', JSON.stringify(response.data.data));
                    setResultSnack(response.data.message);
                }else if(response.data.status === false){
                    setResultSnackErr(response.data.message);
                }
            }
        } catch (error) {
            console.error("error occured in script api is", error);
        } finally {
            setUpdateLoader(false);
        }
    };


    //add CallStrategy
    const handleAddStrategy = async () => {
        try {
            setStrategyLoader(true);
            const ApiPath = Apis.AddObjection;
            const localData = localStorage.getItem('User');
            const Data = JSON.parse(localData);
            const AuthToken = Data.data.token;
            console.log("Authtoken is", AuthToken);
            console.log("Apipath is", ApiPath);

            const ApiData = {
                objectionType: addStrategyTitle,
                prompt: addStrategyDescription
            }

            console.log("Data sendgin in api is", ApiData);

            const response = await axios.post(ApiPath, ApiData, {
                headers: {
                    "Authorization": "Bearer " + AuthToken,
                    "Content-Type": "application/json"
                }
            });
            if (response) {
                console.log("Response of add objection api is", response.data);
                if (response.data.status === true) {
                    setAddStrategyModal(false);
                    setAddStrategyDescription("");
                    setAddStrategyTitle("");
                    //addconcerned data here
                    localStorage.setItem('aiPersonaDetails', JSON.stringify(response.data.data));
                    setCallInstructionData(response.data.data.objectionHandling);
                } else {
                    console.log("Error occured")
                }
            }

        } catch (error) {
            console.error("ERR occured in objection api is", error);
        } finally {
            setStrategyLoader(false);
        }
    }

    //Update CallStrategy
    const handleUpdateStrategy = async () => {
        try {
            setStrategyLoader(true);
            const ApiPath = Apis.UpdateObjection;
            const localData = localStorage.getItem('User');
            const Data = JSON.parse(localData);
            const AuthToken = Data.data.token;
            console.log("Authtoken is", AuthToken);
            console.log("Apipath is", ApiPath);

            const ApiData = {
                id: selectedItem.id,
                objectionType: updateStrategyTitle,
                prompt: updateStrategyDescription
            }

            console.log("Data sendgin in api is", ApiData);

            const response = await axios.post(ApiPath, ApiData, {
                headers: {
                    "Authorization": "Bearer " + AuthToken,
                    "Content-Type": "application/json"
                }
            });
            if (response) {
                console.log("Response of add call strategy api is", response.data);
                if (response.data.status === true) {
                    setUpdateStrategyModal(false);
                    //addconcerned data here
                    setAnchorEl(null);
                    localStorage.setItem('aiPersonaDetails', JSON.stringify(response.data.data));
                    setCallInstructionData(response.data.data.objectionHandling);
                } else {
                    console.log("Error occured")
                }
            }

        } catch (error) {
            console.error("ERR occured in call strategy api is", error);
        } finally {
            setStrategyLoader(false);
        }
    }

    //delete Strategy
    const handleDeleteteStrategy = async () => {
        try {
            setStrategyLoader(true);
            const ApiPath = Apis.DelObjection;
            const localData = localStorage.getItem('User');
            const Data = JSON.parse(localData);
            const AuthToken = Data.data.token;
            console.log("Authtoken is", AuthToken);
            console.log("Apipath is", ApiPath);

            const ApiData = {
                id: selectedItem.id,
            }

            console.log("Data sendgin in api is", ApiData);

            const response = await axios.post(ApiPath, ApiData, {
                headers: {
                    "Authorization": "Bearer " + AuthToken,
                    "Content-Type": "application/json"
                }
            });
            if (response) {
                console.log("Response of del strategy api is", response.data);
                if (response.data.status === true) {
                    //set data to show
                    setAnchorEl(null);
                    localStorage.setItem('aiPersonaDetails', JSON.stringify(response.data.data));
                    setCallInstructionData(response.data.data.objectionHandling);
                } else {
                    console.log("Error occured")
                }
            }

        } catch (error) {
            console.error("ERR occured in del strategy api is", error);
        } finally {
            setStrategyLoader(false);
        }
    }


    const styles = {
        text1: {
            fontWeight: "400",
            fontFamily: "inter",
            fontSize: 15,
            marginTop: 25
        },
        text2: {
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
        sliderHeading: {
            fontWeight: "500", fontSize: 15, fontWeight: "inter"
        }
    }

    //dummy data
    const examplesData = [
        {
            id: 1,
            title: "Time-based Objection",
            details: "Caller: I don't have the time for this right now.Response: I totally understand. Time can feel so limited, but even dedicating a little time now can lead to big changes. Let's look at how we can fit this into your current routine. You'll thank yourself later for starting."
        },
        {
            id: 2,
            title: "Price Objection",
            details: "Caller: It's too expensive for me.Response: I get it, price is always a factor. But consider this: the value you'll get from this product is going to pay off tenfold in the long run. Investing in yourself now saves you time, money, and frustration down the road."
        },
        {
            id: 3,
            title: "Trust Objection",
            details: "Caller: I'm not sure this is going to work for me.Response: I completely understand your hesitation. But I've worked with so many people who were in your exact position, and they've seen amazing results. Trust me, if you put in the effort, you'll see the change."
        },
        {
            id: 4,
            title: "Value Objection",
            details: "Caller: I'm not sure if this will give me enough value.Response: I hear you. But the value comes from the transformation you'll experience, not just the product itself. Think of where you'll be a few months from now if you take this step today."
        },
        {
            id: 5,
            title: "Need Objection",
            details: "Caller: I don't think I need this right now.Response: I understand it might not feel urgent, but sometimes the best time to start is before things get worse. Imagine how much easier things will be when you've already tackled this challenge."
        },
    ]


    return (
        <div className='w-full overflow-auto max-h-[70vh] scrollbar scrollbar-track-transparent scrollbar-thin scrollbar-thumb-purple'>
            <div className='flex flex-row items-center w-full justify-between'>
                <div style={{ fontWeight: "500", fontSize: 20, fontFamily: "inter" }}>
                    Objection Handling
                </div>
                {/* <button
                    className='underline text-purple'
                    onClick={() => { setOpenExamplesPopup(true) }}
                >
                    View Examples
                </button> */}
            </div>

            {/* Code for Range Sliders */}

            <div className='w-8/12'>

                <div className='mt-4' style={styles.sliderHeading}>
                    Re-assurance & solution
                </div>
                <div className='mt-8 ms-6'>
                    <Slider
                        max={5}
                        min={1}
                        value={assuranceSolution}
                        onChange={handleSliderChange}
                        aria-label="Default"
                        valueLabelDisplay="on"
                        step={0.1}
                        sx={{
                            color: '#620FEB',
                            '& .MuiSlider-valueLabel': {
                                top: '-5px',
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
                </div>

                <div className='mt-4' style={styles.sliderHeading}>
                    Validate concerns
                </div>
                <div className='mt-8 ms-6'>
                    <Slider
                        max={5}
                        min={1}
                        value={validateconcerns}
                        // onChange={handleSliderChange}
                        onChange={(e) => { setValidateconcerns(e.target.value) }}
                        aria-label="Default"
                        valueLabelDisplay="on"
                        step={0.1}
                        sx={{
                            color: '#620FEB',
                            '& .MuiSlider-valueLabel': {
                                top: '-5px',
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
                </div>

                <div className='mt-4' style={styles.sliderHeading}>
                    Compromises and alternatives
                </div>
                <div className='mt-8 ms-6'>
                    <Slider
                        max={5}
                        min={1}
                        value={compromisesandAlternatives}
                        // onChange={handleSliderChange}
                        onChange={(e) => { setCompromisesandAlternatives(e.target.value) }}
                        aria-label="Default"
                        valueLabelDisplay="on"
                        step={0.1}
                        sx={{
                            color: '#620FEB',
                            '& .MuiSlider-valueLabel': {
                                top: '-5px',
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
                </div>

                <div className='mt-4' style={styles.sliderHeading}>
                    Compromises and alternatives
                </div>
                <div className='mt-8 ms-6'>
                    <Slider
                        max={5}
                        min={1}
                        value={positiveRedirects}
                        // onChange={handleSliderChange}
                        onChange={(e) => { setPositiveRedirects(e.target.value) }}
                        aria-label="Default"
                        valueLabelDisplay="on"
                        step={0.1}
                        sx={{
                            color: '#620FEB',
                            '& .MuiSlider-valueLabel': {
                                top: '-5px',
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
                </div>

                <div className='mt-4' style={styles.sliderHeading}>
                    Compromises and alternatives
                </div>
                <div className='mt-8 ms-6'>
                    <Slider
                        max={5}
                        min={1}
                        value={ProvideDetailedExplanation}
                        // onChange={handleSliderChange}
                        onChange={(e) => { setProvideDetailedExplanation(e.target.value) }}
                        aria-label="Default"
                        valueLabelDisplay="on"
                        step={0.1}
                        sx={{
                            color: '#620FEB',
                            '& .MuiSlider-valueLabel': {
                                top: '-5px',
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
                </div>

                <div className='w-full mt-6'>
                    {
                        updateLoader ?
                            <div className='w-full flex flex-row justify-center'>
                                <CircularProgress size={25} />
                            </div> :
                            <button className='w-full text-white bg-purple'
                                style={{
                                    height: "50px",
                                    borderRadius: "50px", fontWeight: "500", fontSize: 18, fontFamily: "inter"
                                }}
                                onClick={handleUpdateAi}
                                >
                                Update
                            </button>
                    }
                </div>

            </div>

            {/* <Slider
                max={10}
                min={1}
                // defaultValue={5}
                aria-label="Default"
                valueLabelDisplay="on"
                value={newValue}
                onChange={(e, newValue) => handleSliderChange(index, newValue, item)}
                sx={{
                    color: '#620FEB',
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
            /> */}



            {/* Code for Objection list */}
            <div className='mt-6' style={{ fontWeight: "500", fontSize: 16, fontFamily: "inter" }}>
                Objection List
            </div>
            {
                callInstructionData.length > 0 ?
                    <div className='mt-8 w-10/12 overflow-auto max-h-[30vh] scrollbar scrollbar-track-transparent scrollbar-thin scrollbar-thumb-purple'>
                        {
                            callInstructionData.map((item, index) => (
                                <div key={item.id} className='flex flex-col items-center w-full'>
                                    <div className='flex flex-row items-start p-4 border-[1px] border-[#00000010] w-full justify-between rounded-lg'>
                                        <div className='flex flex-row items-center gap-2'>
                                            {/* <div className='text-white bg-purple flex flex-row items-center justify-center' style={{ height: 29, width: 29, borderRadius: "50%" }}>
                                                {index + 1}
                                            </div> */}
                                            <div>
                                                <div style={styles.text2}>
                                                    {/* {item.objectionType} */}
                                                    {item.objectionType}
                                                </div>
                                                <div style={styles.text1}>
                                                    {/* {item.objectionType} */}
                                                    {item.prompt}
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            <button aria-describedby={id} variant="contained" color="primary" onClick={(event) => { handleMoreClick(event, item) }}>
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
                                                    <button className='text-purple' style={{ fontSize: 13, fontWeight: "500", fontFamily: "inter" }} onClick={() => { setUpdateStrategyModal(true) }}>
                                                        Edit
                                                    </button>
                                                    {
                                                        strategyLoader ?
                                                            <CircularProgress size={15} /> :
                                                            <button style={{ fontSize: 13, fontWeight: "500", fontFamily: "inter", marginTop: 8 }} onClick={handleDeleteteStrategy}>
                                                                Delete
                                                            </button>
                                                    }
                                                </div>
                                            </Popover>
                                        </div>
                                    </div>
                                    <div style={{ height: '30px', borderLeft: "1px dashed #620FEB", width: "1px" }} />
                                </div>
                            ))
                        }
                        <div className='w-full flex flex-row justify-center items-center'>
                            <button className='flex flex-row gap-2 justify-center items-center bg-purple text-white px-4 py-2'
                                style={{ fontWeight: "500", fontFamily: "inter", fontSize: 13, borderRadius: "50px" }}
                                onClick={() => setAddStrategyModal(true)}
                            >
                                <Plus size={22} weight="light" />
                                <p>
                                    Add step
                                </p>
                            </button>
                        </div>
                    </div> :
                    <div>
                        <div className='flex flex-col items-center w-full gap-3 mt-4'>
                            <div className='flex flex-row items-center justify-center bg-purple' style={{ height: "70px", width: "70px", borderRadius: "50%" }}>
                                <Image src="/assets/creatorProfileNavIcons/settingIcon.png" height={32} width={32} alt='seting' />
                            </div>
                            <div style={{ fontWeight: "500", fontSize: 15, fontFamily: "inter" }}>
                                No objection found yet
                            </div>
                            <div style={{ fontWeight: "500", fontSize: 13, fontFamily: "inter", color: "#050A0860", textAlign: "center" }}>
                                Please add your objection
                            </div>
                            <button className='bg-purple px-4 py-2 text-white' style={{ borderRadius: "50px" }} onClick={() => { setAddStrategyModal(true) }}>
                                Add New
                            </button>
                        </div>
                    </div>
            }


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
                                    <p>Objection Handling Examples</p>
                                    <button onClick={() => { setOpenExamplesPopup(false) }}>
                                        <Image src="/assets/crossBtn.png" height={15} width={15} alt='*' />
                                    </button>
                                </div>
                                <div className="mt-4 overflow-auto max-h-[50vh] scrollbar scrollbar-track-transparent scrollbar-thin scrollbar-thumb-purple">
                                    {examplesData.map((item) => {
                                        const detailsParts = item.details.split(/(Caller:|Response:)/).filter((part) => part.trim());

                                        return (
                                            <div key={item.id} className="border rounded-lg mb-6 px-4 py-2">
                                                <button
                                                    className="flex flex-row items-center w-full justify-between"
                                                    onClick={() => setToggleShowDetails((prevId) => (prevId === item.id ? null : item.id))}
                                                >
                                                    <div style={{ fontWeight: '600', fontSize: 13, fontFamily: 'inter' }}>
                                                        {item.title}
                                                    </div>
                                                    <div>
                                                        {item.id === toggleShowDetails ? (
                                                            <CaretUp size={22} weight="light" color="#620FEB" />
                                                        ) : (
                                                            <CaretDown size={22} weight="light" />
                                                        )}
                                                    </div>
                                                </button>
                                                {item.id === toggleShowDetails && (
                                                    <div style={{ fontWeight: '400', fontSize: 15, fontFamily: 'inter', marginTop: '8px' }}>
                                                        {detailsParts.map((part, index) => (
                                                            <div key={index} style={{ marginBottom: '4px' }}>
                                                                {part.includes('Caller:') ? (
                                                                    <span style={{ fontWeight: '500' }}>Caller:</span>
                                                                ) : part.includes('Response:') ? (
                                                                    <span style={{ fontWeight: '500' }}>Response:</span>
                                                                ) : null}
                                                                {part.replace(/^(Caller:|Response:)/, '').trim()}
                                                            </div>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                </Box>
            </Modal>

            {/* Code to add CallStrategy */}
            <Modal
                open={addStrategyModal}
                onClose={() => setAddStrategyModal(false)}
                closeAfterTransition
                BackdropProps={{
                    timeout: 1000,
                    sx: {
                        backgroundColor: "transparent",
                        backdropFilter: "blur(20px)",
                    },
                }}
            >
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
                                <div className='flex flex-row items-center justify-between p-2' style={{ fontWeight: '500', fontFamily: "inter", fontSize: 18 }}>
                                    <p />
                                    <p>Add Objection</p>
                                    <button onClick={() => { setAddStrategyModal(false) }}>
                                        <Image src="/assets/crossBtn.png" height={15} width={15} alt='*' />
                                    </button>
                                </div>
                                <div className='mt-8 w-full'>
                                    <div>
                                        <input className='w-full p-2 rounded-lg bg-[#EDEDED80] outline-none border-none'
                                            value={addStrategyTitle}
                                            onChange={(e) => setAddStrategyTitle(e.target.value)}
                                            placeholder='Title'
                                            style={{ fontWeight: "500", fontFamily: "inter", fontSize: 13 }}
                                        />
                                    </div>
                                    <div className='mt-8'>
                                        <textarea className='w-full p-2 rounded-lg bg-[#EDEDED80] outline-none border-none'
                                            value={addStrategyDescription}
                                            onChange={(e) => setAddStrategyDescription(e.target.value)}
                                            placeholder='Description'
                                            rows={4}
                                            style={{ fontWeight: "500", fontFamily: "inter", fontSize: 13, resize: "none" }}
                                        />
                                    </div>
                                    {
                                        strategyLoader ?
                                            <div className='w-full flex flex-row justify-center' style={{ marginTop: 35 }}>
                                                <CircularProgress size={25} />
                                            </div> :
                                            <button className='w-full py-2 text-white bg-purple ' style={{ borderRadius: "50px", marginTop: 35 }}
                                                onClick={handleAddStrategy}>
                                                Add
                                            </button>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </Box>
            </Modal>

            {/* Code to add CallStrategy */}
            <Modal
                open={updateStrategyModal}
                onClose={() => setUpdateStrategyModal(false)}
                closeAfterTransition
                BackdropProps={{
                    timeout: 1000,
                    sx: {
                        backgroundColor: "transparent",
                        backdropFilter: "blur(20px)",
                    },
                }}
            >
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
                                <div className='flex flex-row items-center justify-between p-2' style={{ fontWeight: '500', fontFamily: "inter", fontSize: 18 }}>
                                    <p />
                                    <p>Update Objection</p>
                                    <button onClick={() => { setUpdateStrategyModal(false) }}>
                                        <Image src="/assets/crossBtn.png" height={15} width={15} alt='*' />
                                    </button>
                                </div>
                                <div className='mt-8 w-full'>
                                    <div>
                                        <input className='w-full p-2 rounded-lg bg-[#EDEDED80] outline-none border-none'
                                            value={updateStrategyTitle}
                                            onChange={(e) => setUpdateStrategyTitle(e.target.value)}
                                            placeholder='Title'
                                            style={{ fontWeight: "500", fontFamily: "inter", fontSize: 13 }}
                                        />
                                    </div>
                                    <div className='mt-8'>
                                        <textarea className='w-full p-2 rounded-lg bg-[#EDEDED80] outline-none border-none'
                                            value={updateStrategyDescription}
                                            onChange={(e) => setUpdateStrategyDescription(e.target.value)}
                                            placeholder='Description'
                                            rows={4}
                                            style={{ fontWeight: "500", fontFamily: "inter", fontSize: 13, resize: "none" }}
                                        />
                                    </div>
                                    {
                                        strategyLoader ?
                                            <div className='w-full flex flex-row justify-center' style={{ marginTop: 35 }}>
                                                <CircularProgress size={25} />
                                            </div> :
                                            <button className='w-full py-2 text-white bg-purple ' style={{ borderRadius: "50px", marginTop: 35 }}
                                                onClick={handleUpdateStrategy}>
                                                Add
                                            </button>
                                    }
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
                        }} severity="success"
                        // className='bg-purple rounded-lg text-white'
                        sx={{ width: 'auto', fontWeight: '700', fontFamily: 'inter', fontSize: '22' }}
                    >
                        {resultSnack}
                    </Alert>
                </Snackbar>
            </div>
            <div>
                <Snackbar
                    open={resultSnackErr}
                    autoHideDuration={3000}
                    onClose={() => {
                        setResultSnackErr(null);
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
                            setResultSnackErr(null)
                        }} severity="success"
                        // className='bg-purple rounded-lg text-white'
                        sx={{ width: 'auto', fontWeight: '700', fontFamily: 'inter', fontSize: '22' }}
                    >
                        {resultSnackErr}
                    </Alert>
                </Snackbar>
            </div>




        </div>
    )
}

export default ObjectionHandling2