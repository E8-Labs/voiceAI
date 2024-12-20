import { Box, CircularProgress, Modal, Popover } from '@mui/material'
import { DotsThree } from '@phosphor-icons/react'
import React, { useEffect, useState } from 'react'
import Apis from '@/components/apis/Apis';
import axios from 'axios';
import Image from 'next/image';

const IntractionExamples = ({ recallApi, aiData,  recallUseEffect }) => {

    //get intraction
    const [intractionsData, setIntractionsData] = useState([]);
    const [intractionanchorel, setintractionanchorel] = useState(null);
    const IntractionPopoverId = intractionanchorel ? 'simple-popover' : undefined;
    const [intractionLoader, setIntractionLoader] = useState(false);
    //add intraction
    const [addIntractionModal, setAddIntractionModal] = useState(false);
    const [addIntractionTitle, setAddIntractionTitle] = useState("");
    const [addIntractionDescription, setAddIntractionDescription] = useState("");
    //update intraction
    const [updateIntractionModal, setUpdateIntractionModal] = useState(false);
    const [updateIntractionTitle, setUpdateIntractionTitle] = useState("");
    const [updateIntractionDescription, setUpdateIntractionDescription] = useState("");
    const [selectedItem, setSelectedItem] = useState(null);


    useEffect(() => {
        const localAiPersonaDetails = localStorage.getItem("aiPersonaDetails");
        if (localAiPersonaDetails) {
            const AiDetails = JSON.parse(localAiPersonaDetails);
            setIntractionsData(AiDetails.intractions);
            console.log("Aidetails recieved from local storage are", AiDetails);
        }
        // if (aiData) {
        //     setIntractionsData(aiData.intractions);
        // }
    }, [recallApi]);

    const handleClose = () => {
        setintractionanchorel(null);
    };

    const handeFramerworkMoreClick = (event, item) => {
        setintractionanchorel(event.currentTarget);
        setSelectedItem(item);
        setUpdateIntractionDescription(item.answer);
        setUpdateIntractionTitle(item.question);
    }

    //update intraction
    const handleAddIntraction = async () => {
        try {
            setIntractionLoader(true);
            const ApiPath = Apis.AddIntractions;
            const localData = localStorage.getItem('User');
            const Data = JSON.parse(localData);
            const AuthToken = Data.data.token;
            console.log("Authtoken is", AuthToken);
            console.log("Apipath is", ApiPath);

            const ApiData = {
                question: addIntractionTitle,
                answer: addIntractionDescription
            }

            console.log("Data sendgin in api is", ApiData);

            const response = await axios.post(ApiPath, ApiData, {
                headers: {
                    "Authorization": "Bearer " + AuthToken,
                    "Content-Type": "application/json"
                }
            });
            if (response) {
                console.log("Response of add intraction api is", response.data);
                if (response.data.status === true) {
                    setAddIntractionModal(false);
                    setAddIntractionDescription("");
                    setAddIntractionTitle("");
                    setIntractionsData(response.data.data.intractions);
                    localStorage.setItem('aiPersonaDetails', JSON.stringify(response.data.data));
                } else {
                    console.log("Error occured")
                }
                recallUseEffect()
            }

        } catch (error) {
            console.error("ERR occured in add intraction api is", error);
        } finally {
            setIntractionLoader(false);
        }
    }

    //delete intraction
    const handleDeleteteIntraction = async () => {
        try {
            setIntractionLoader(true);
            const ApiPath = Apis.DeleteIntractions;
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
                console.log("Response of del intraction api is", response.data);
                if (response.data.status === true) {
                    setintractionanchorel(null);
                    setIntractionsData(response.data.data.intractions);
                    localStorage.setItem('aiPersonaDetails', JSON.stringify(response.data.data));
                    // setIntractionsData(intractions =>
                    //     intractions.filter(preIntraction => preIntraction.id !== selectedItem.id)
                    // )
                    recallUseEffect();
                } else {
                    console.log("Error occured")
                }
            }

        } catch (error) {
            console.error("ERR occured in del intraction api is", error);
        } finally {
            setIntractionLoader(false);
        }
    }

    //add intraction
    const handleUpdateIntraction = async () => {
        try {
            setIntractionLoader(true);
            const ApiPath = Apis.UpdateIntractions;
            const localData = localStorage.getItem('User');
            const Data = JSON.parse(localData);
            const AuthToken = Data.data.token;
            console.log("Authtoken is", AuthToken);
            console.log("Apipath is", ApiPath);

            const ApiData = {
                id: selectedItem.id,
                question: updateIntractionTitle,
                answer: updateIntractionDescription
            }

            console.log("Data sendgin in api is", ApiData);

            const response = await axios.post(ApiPath, ApiData, {
                headers: {
                    "Authorization": "Bearer " + AuthToken,
                    "Content-Type": "application/json"
                }
            });
            if (response) {
                console.log("Response of update intraction api is", response.data);
                if (response.data.status === true) {
                    setUpdateIntractionModal(false);
                    setUpdateIntractionDescription("");
                    setUpdateIntractionTitle("");
                    setintractionanchorel(null);
                    setIntractionsData(response.data.data.intractions);
                    localStorage.setItem('aiPersonaDetails', JSON.stringify(response.data.data));
                } else {
                    console.log("Error occured")
                }
            }

        } catch (error) {
            console.error("ERR occured in update intraction api is", error);
        } finally {
            setIntractionLoader(false);
        }
    }

    //style for the Modal
    const styles = {
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

    return (
        <div>
            <div className='flex flex-row items-center w-full justify-between'>
                <div style={{ fontWeight: "500", fontSize: 20, fontFamily: "inter" }}>
                    <span style={{ color: "#00000060" }}>Communication |</span> Intraction Exaples
                </div>
                <button
                    className='text-purple underline'
                    onClick={() => setAddIntractionModal(true)}
                >
                    Add new
                </button>
            </div>

            {
                intractionsData && intractionsData.length > 0 ?
                    <div className='max-h-[50vh] overflow-auto scrollbar scrollbar-track-transparent scrollbar-thumb-purple scrollbar-thin'>
                        {
                            intractionsData.map((item) => (
                                <div key={item.id} className='flex flex-row items-start p-4 border border-[#00000010] mt-8 justify-between'>
                                    <div>
                                        <div>
                                            {item.question}
                                        </div>
                                        <div style={{ fontWeight: "500", fontSize: 13, fontFamily: "inter" }}>
                                            {item.answer}
                                        </div>
                                    </div>
                                    <div>
                                        <button className='-mt-2' aria-describedby={IntractionPopoverId} variant="contained" color="primary" onClick={(event) => { handeFramerworkMoreClick(event, item) }}>
                                            <DotsThree size={32} weight="bold" />
                                        </button>
                                        <Popover
                                            id={IntractionPopoverId}
                                            open={Boolean(intractionanchorel)}
                                            anchorEl={intractionanchorel}
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
                                                    onClick={() => { setUpdateIntractionModal(true) }}
                                                >
                                                    Edit
                                                </button>
                                                {
                                                    intractionLoader ?
                                                        <CircularProgress style={{ marginTop: 8 }} size={15} /> :
                                                        <button style={{ fontSize: 13, fontWeight: "500", fontFamily: "inter", marginTop: 8 }}
                                                            onClick={handleDeleteteIntraction}
                                                        >
                                                            Delete
                                                        </button>
                                                }
                                            </div>
                                        </Popover>
                                    </div>
                                </div>
                            ))
                        }
                    </div> :
                    <div className='text-xl font-bold text-center mt-8'>
                        <div className='flex flex-col items-center w-full gap-3 mt-4'>
                            <div className='flex flex-row items-center justify-center bg-purple' style={{ height: "70px", width: "70px", borderRadius: "50%" }}>
                                <Image src="/assets/creatorProfileNavIcons/settingIcon.png" height={32} width={32} alt='seting' />
                            </div>
                            <div style={{ fontWeight: "500", fontSize: 15, fontFamily: "inter" }}>
                                No intraction examples found yet
                            </div>
                            <div style={{ fontWeight: "500", fontSize: 13, fontFamily: "inter", color: "#050A0860", textAlign: "center" }}>
                                Please add your intraction example
                            </div>
                            <button className='bg-purple px-4 py-2 text-white' style={{ borderRadius: "50px" }} onClick={() => { setAddIntractionModal(true) }}>
                                Add New
                            </button>
                        </div>
                    </div>
            }


            {/* Modal to add values */}
            <Modal
                open={addIntractionModal}
                onClose={() => setAddIntractionModal(false)}
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
                                    {/* <p /> */}
                                    <p>Add Interaction Examples</p>
                                    <button onClick={() => { setAddIntractionModal(false) }}>
                                        <Image src="/assets/crossBtn.png" height={15} width={15} alt='*' />
                                    </button>
                                </div>
                                <div className='mt-8 w-full'>
                                    <div>
                                        <input className='w-full p-2 rounded-lg bg-[#EDEDED80] outline-none border-none'
                                            value={addIntractionTitle}
                                            onChange={(e) => setAddIntractionTitle(e.target.value)}
                                            placeholder='Ex: Building Confidence'
                                            style={{ fontWeight: "500", fontFamily: "inter", fontSize: 13 }}
                                        />
                                    </div>
                                    <div className='mt-8'>
                                        <textarea className='w-full p-2 rounded-lg bg-[#EDEDED80] outline-none border-none'
                                            value={addIntractionDescription}
                                            onChange={(e) => setAddIntractionDescription(e.target.value)}
                                            placeholder="Ex: How can I be more confident when approaching someone I'm interested in?"
                                            rows={4}
                                            style={{ fontWeight: "500", fontFamily: "inter", fontSize: 13, resize: "none" }}
                                        />
                                    </div>
                                    {
                                        intractionLoader ?
                                            <div className='w-full flex flex-row justify-center' style={{ marginTop: 35 }}>
                                                <CircularProgress size={25} />
                                            </div> :
                                            <button className='w-full py-2 text-white bg-purple ' style={{ borderRadius: "50px", marginTop: 35 }}
                                                onClick={handleAddIntraction}>
                                                Add
                                            </button>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </Box>
            </Modal>

            {/* Modal to add values */}
            <Modal
                open={updateIntractionModal}
                onClose={() => setUpdateIntractionModal(false)}
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
                                    <p>Update Intraction</p>
                                    <button onClick={() => { setUpdateIntractionModal(false) }}>
                                        <Image src="/assets/crossBtn.png" height={15} width={15} alt='*' />
                                    </button>
                                </div>
                                <div className='mt-8 w-full'>
                                    <div>
                                        <input className='w-full p-2 rounded-lg bg-[#EDEDED80] outline-none border-none'
                                            value={updateIntractionTitle}
                                            onChange={(e) => setUpdateIntractionTitle(e.target.value)}
                                            placeholder='Ex: Building Confidence'
                                            style={{ fontWeight: "500", fontFamily: "inter", fontSize: 13 }}
                                        />
                                    </div>
                                    <div className='mt-12'>
                                        <textarea className='w-full p-2 rounded-lg bg-[#EDEDED80] outline-none border-none'
                                            value={updateIntractionDescription}
                                            onChange={(e) => setUpdateIntractionDescription(e.target.value)}
                                            placeholder="Ex: How can I be more confident when approaching someone I'm interested in?"
                                            rows={4}
                                            style={{ fontWeight: "500", fontFamily: "inter", fontSize: 13, resize: "none" }}
                                        />
                                    </div>
                                    {
                                        intractionLoader ?
                                            <div className='w-full flex flex-row justify-center' style={{ marginTop: 35 }}>
                                                <CircularProgress size={25} />
                                            </div> :
                                            <button className='w-full py-2 text-white bg-purple ' style={{ borderRadius: "50px", marginTop: 35 }}
                                                onClick={handleUpdateIntraction}>
                                                Update
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

export default IntractionExamples