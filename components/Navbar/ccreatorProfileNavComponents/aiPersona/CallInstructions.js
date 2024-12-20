import Apis from '@/components/apis/Apis';
import { Box, CircularProgress, Modal, Popover } from '@mui/material';
import { CaretDown, CaretUp, DotsThree, Plus } from '@phosphor-icons/react'
import axios from 'axios';
import Image from 'next/image'
import React, { useEffect, useState } from 'react'

const CallInstructions = () => {

    const [openExamplesPopup, setOpenExamplesPopup] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const [callInstructionData, setCallInstructionData] = useState([
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
    ]);
    const [strategyLoader, setStrategyLoader] = useState(false);
    //add strategy
    const [addStrategyModal, setAddStrategyModal] = useState(false);
    const [addStrategyTitle, setAddStrategyTitle] = useState("");
    const [addStrategyDescription, setAddStrategyDescription] = useState("");
    const [selectedItem, setSelectedItem] = useState("");

    //Update strategy
    const [updateStrategyModal, setUpdateStrategyModal] = useState(false);
    const [updateStrategyTitle, setUpdateStrategyTitle] = useState("");
    const [updateStrategyDescription, setUpdateStrategyDescription] = useState("");
    const [toggleShowDetails, setToggleShowDetails] = useState(null)

    const handleMoreClick = (event, item) => {
        setAnchorEl(event.currentTarget);
        setSelectedItem(item);
        console.log("Selected item is", item);
        setUpdateStrategyTitle(item.title);
        setUpdateStrategyDescription(item.description);
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
            setCallInstructionData(AiDetails.callStrategy);
            console.log("Aidetails recieved from local storage are", AiDetails);
        }
    }, []);


    //add CallStrategy
    const handleAddStrategy = async () => {
        try {
            setStrategyLoader(true);
            const ApiPath = Apis.AddCallStrategy;
            const localData = localStorage.getItem('User');
            const Data = JSON.parse(localData);
            const AuthToken = Data.data.token;
            console.log("Authtoken is", AuthToken);
            console.log("Apipath is", ApiPath);

            const ApiData = {
                title: addStrategyTitle,
                description: addStrategyDescription
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
                    setAddStrategyModal(false);
                    setAddStrategyDescription("");
                    setAddStrategyTitle("");
                    //addconcerned data here
                    localStorage.setItem('aiPersonaDetails', JSON.stringify(response.data.data));
                    setCallInstructionData(response.data.data.callStrategy);
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

    //Update CallStrategy
    const handleUpdateStrategy = async () => {
        try {
            setStrategyLoader(true);
            const ApiPath = Apis.UpdateCallStrategy;
            const localData = localStorage.getItem('User');
            const Data = JSON.parse(localData);
            const AuthToken = Data.data.token;
            console.log("Authtoken is", AuthToken);
            console.log("Apipath is", ApiPath);

            const ApiData = {
                id: selectedItem.id,
                title: updateStrategyTitle,
                description: updateStrategyDescription
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
                    setCallInstructionData(response.data.data.callStrategy);
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
            const ApiPath = Apis.DelCallStrategy;
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
                    setCallInstructionData(response.data.data.callStrategy);
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
        }
    }

    //dummy data
    const callFlowExamples = [
        {
            id: 1,
            title: "Pitch a product"
        },
        {
            id: 2,
            title: "Invite to a webinar"
        },
        {
            id: 3,
            title: "Engage with followers"
        },
    ]

    return (
        <div className='w-full'>
            <div className='flex flex-row items-center w-full justify-between'>
                <div style={{ fontWeight: "500", fontSize: 20, fontFamily: "inter" }}>
                    Call Flow
                </div>
                <button
                    className='underline text-purple border-none outline-none'
                    onClick={() => { setOpenExamplesPopup(true) }}
                >
                    View Examples
                </button>
            </div>

            {
                callInstructionData.length > 0 ?
                    <div className='mt-8 w-10/12'>
                        {
                            callInstructionData.map((item, index) => (
                                <div key={item.id} className='flex flex-col items-center w-full'>
                                    <div className='flex flex-row items-center p-4 border-[1px] border-[#00000010] w-full justify-between rounded-lg'>
                                        <div className='w-full flex flex-row items-center'>
                                            <div style={{ width: "10%" }}>
                                                <div className='text-white bg-purple flex flex-row items-center justify-center p-0 m-0'
                                                    style={{
                                                        borderRadius: "50%",
                                                        height: "30px",
                                                        width: "30px",
                                                        fontSize: 15,
                                                        resize: "contain"
                                                    }}>
                                                    {index + 1}
                                                </div>
                                            </div>
                                            <div style={{ ...styles.text1, width: "90%" }}>
                                                {item.description}
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
                                                PaperProps={{
                                                    style: {
                                                        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)', // Adjust shadow here
                                                    },
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
                                No Call strategy found yet
                            </div>
                            <div style={{ fontWeight: "500", fontSize: 13, fontFamily: "inter", color: "#050A0860", textAlign: "center" }}>
                                Please add your Call strategy
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
                {/* <Box className="lg:w-5/12 sm:w-7/12 w-full" sx={styles.AddNewValueModal}>
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
                                    <p>Call Flow Examples</p>
                                    <button onClick={() => { setExamplesModal(false) }}>
                                        <Image src="/assets/crossBtn.png" height={15} width={15} alt='*' />
                                    </button>
                                </div>
                                <div className='mt-4'>
                                    {
                                        callFlowExamples.map((item, index) => (
                                            <div key={item.id} className='border rounded-lg mb-6 px-4 py-2'>
                                                <div className='flex flex-row items-center w-full justify-between'>
                                                    <div style={{ fontWeight: "600", fontSize: 13, fontFamily: "inter" }}>
                                                        {
                                                            item.title
                                                        }
                                                    </div>
                                                    <button onClick={(e) => { setToggleShowDetails(prevId => prevId === item.id ? null : item.id) }}>
                                                        {item.id === toggleShowDetails ?
                                                            <CaretUp size={22} weight="light" color='#620FEB' /> :
                                                            <CaretDown size={22} weight="light" />
                                                        }
                                                    </button>
                                                </div>
                                                {
                                                    item.id === toggleShowDetails && (
                                                        <div style={{ fontWeight: "400", fontSize: 15, fontFamily: "inter" }}>
                                                            {
                                                                item.details
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
                </Box> */}
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
                                        callFlowExamples.map((item, index) => (
                                            <div key={item.id} className='flex flex-col items-center w-full'>
                                                <div className='flex flex-row items-center p-4 border-[2px] border-[#00000010] w-full justify-between rounded-lg'>
                                                    <div className='flex flex-row items-center gap-2'>
                                                        <div className='text-white bg-purple flex flex-row items-center justify-center' style={{ height: 29, width: 29, borderRadius: "50%" }}>
                                                            {item.id}
                                                        </div>
                                                        <div style={styles.text1}>
                                                            {item.title}
                                                        </div>
                                                    </div>
                                                </div>
                                                {/* <div style={{ height: '30px', borderLeft: "1px dashed #620FEB", width: "1px" }} /> */}
                                                {index !== callFlowExamples.length - 1 && (
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
                                    <p>Add Call Strategy</p>
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
                                    <div className='mt-12'>
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
                                    <p>Update Call Strategy</p>
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
                                    <div className='mt-12'>
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

        </div>
    )
}

export default CallInstructions