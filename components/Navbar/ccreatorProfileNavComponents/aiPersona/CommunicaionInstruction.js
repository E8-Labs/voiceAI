import { Alert, Box, CircularProgress, Fade, Modal, Popover, Snackbar } from '@mui/material'
import { DotsThree } from '@phosphor-icons/react'
import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import Apis from '@/components/apis/Apis';
import axios from 'axios';

const CommunicaionInstruction = ({ recallApi, aiData }) => {

    const [communicationInstructionData, setCommunicationInstructionData] = useState([]);
    const [anchorEl, setAnchorEl] = useState(null);
    const id = anchorEl ? 'simple-popover' : undefined;
    const [communicationInstructionLoader, setCommunicationInstructionLoader] = useState(false);
    const [resultSnack, setResultSnack] = useState(null);
    const [selectedInstruction, setSelectedInstruction] = useState(null);
    //add new commmunicationInstruction
    const [adddComunicationInstModal, setAdddComunicationInstModal] = useState(false);
    const [commmunicationInstructionDescription, setCommmunicationInstructionDescription] = useState("");
    const [addCommunicationTitle, setAddCommunicationTitle] = useState("");
    //code for update modal
    const [updateModal, setUpdateModal] = useState(false);
    const [updateDescription, setUpdateDescription] = useState("");
    const [updateTitle, setUpdateTitle] = useState("");



    useEffect(() => {
        const localAiPersonaDetails = localStorage.getItem("aiPersonaDetails");
        if (localAiPersonaDetails) {
            const AiDetails = JSON.parse(localAiPersonaDetails);
            setCommunicationInstructionData(AiDetails.CommunicationInstructions);
            console.log("Aidetails recieved from local storage are", AiDetails);
        }
        // if (aiData?.CommunicationInstructions
        // ) {
        //     setCommunicationInstructionData(aiData.CommunicationInstructions);
        // }
    }, []);


    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleClick = (event, item) => {
        setAnchorEl(event.currentTarget);
        setSelectedInstruction(item);
        setUpdateDescription(item.description);
        setUpdateTitle(item.title);
    };

    //code to add Communication Inst
    const handleAddCommunicationInst = async () => {
        try {
            setCommunicationInstructionLoader(true);
            const ApiPath = Apis.AddCommunicationInst;
            const localData = localStorage.getItem('User');
            const Data = JSON.parse(localData);
            const AuthToken = Data.data.token;
            console.log("Authtoken is", AuthToken);
            console.log("Apipath is", ApiPath);

            const ApiData = {
                description: commmunicationInstructionDescription,
                title: addCommunicationTitle
            }

            console.log("Data sendgin in api is", ApiData);

            const response = await axios.post(ApiPath, ApiData, {
                headers: {
                    "Authorization": "Bearer " + AuthToken,
                    "Content-Type": "application/json"
                }
            });
            if (response) {
                console.log("Response of add commmunicationInstruction api is", response.data);
                if (response.data.status === true) {
                    setAdddComunicationInstModal(false);
                    setCommmunicationInstructionDescription("");
                    setAddCommunicationTitle("");
                    setAnchorEl(null);
                    setCommunicationInstructionData(response.data.data.CommunicationInstructions);
                    localStorage.setItem('aiPersonaDetails', JSON.stringify(response.data.data));
                } else {
                    console.log("Error occured")
                }
                setResultSnack(response.data.message);
            }

        } catch (error) {
            console.error("ERR occured in add commmunicationInstruction api is", error);
        } finally {
            setCommunicationInstructionLoader(false);
        }
    }

    //code to add Communication Inst
    const handleUpdateCommunicationInst = async () => {
        try {
            setCommunicationInstructionLoader(true);
            const ApiPath = Apis.UpdateCommunicationInst;
            const localData = localStorage.getItem('User');
            const Data = JSON.parse(localData);
            const AuthToken = Data.data.token;
            console.log("Authtoken is", AuthToken);
            console.log("Apipath is", ApiPath);

            const ApiData = {
                id: selectedInstruction.id,
                description: updateDescription,
                title: updateTitle
            }

            console.log("Data sendgin in api is", ApiData);

            const response = await axios.post(ApiPath, ApiData, {
                headers: {
                    "Authorization": "Bearer " + AuthToken,
                    "Content-Type": "application/json"
                }
            });
            if (response) {
                console.log("Response of update commmunicationInstruction api is", response.data);
                if (response.data.status === true) {
                    setUpdateModal(false);
                    setAnchorEl(null);
                    setCommunicationInstructionData(response.data.data.CommunicationInstructions);
                    localStorage.setItem('aiPersonaDetails', JSON.stringify(response.data.data));
                } else {
                    console.log("Error occured")
                }
                setResultSnack(response.data.message);
            }

        } catch (error) {
            console.error("ERR occured in update commmunicationInstruction api is", error);
        } finally {
            setCommunicationInstructionLoader(false);
        }
    }

    //code to add Communication Inst
    const handleDeleteCommunication = async () => {
        try {
            setCommunicationInstructionLoader(true);
            const ApiPath = Apis.DeleteCommunicationInst;
            const localData = localStorage.getItem('User');
            const Data = JSON.parse(localData);
            const AuthToken = Data.data.token;
            console.log("Authtoken is", AuthToken);
            console.log("Apipath is", ApiPath);

            const ApiData = {
                id: selectedInstruction.id,
            }

            console.log("Data sendgin in api is", ApiData);

            const response = await axios.post(ApiPath, ApiData, {
                headers: {
                    "Authorization": "Bearer " + AuthToken,
                    "Content-Type": "application/json"
                }
            });
            if (response) {
                console.log("Response of delete commmunicationInstruction api is", response.data);
                if (response.data.status === true) {
                    setAnchorEl(null);
                    setCommunicationInstructionData(response.data.data.CommunicationInstructions);
                    localStorage.setItem('aiPersonaDetails', JSON.stringify(response.data.data));
                } else {
                    console.log("Error occured")
                }
                setResultSnack(response.data.message);
            }

        } catch (error) {
            console.error("ERR occured in delete commmunicationInstruction api is", error);
        } finally {
            setCommunicationInstructionLoader(false);
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
            <div className='flex flex-row items-center justify-between' style={{ fontWeight: "500", fontFamily: "inter", fontSize: 15 }}>
                <div>
                    Communication Instructions
                </div>
                <button className='text-purple underline' onClick={() => { setAdddComunicationInstModal(true) }}>
                    View Examples
                </button>
            </div>

            {
                communicationInstructionData && communicationInstructionData.length > 0 ?
                    <div className='max-h-[55vh] overflow-auto scrollbar scrollbar-track-transparent scrollbar-thumb-purple scrollbat-thin'>
                        {
                            communicationInstructionData.map((item) => (
                                <div key={item.id} className='p-3 border-2 rounded-lg mt-8'>
                                    <div className='flex flex-row items-center justify-between'>
                                        <div style={{ fontWeight: "700", fontFamily: "inter", fontSize: 13 }}>
                                            {item.title}
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
                                                    <button
                                                        onClick={() => { setUpdateModal(true) }}
                                                        className='text-purple' style={{
                                                            fontSize: 13, fontWeight: "500",
                                                            fontFamily: "inter"
                                                        }}>
                                                        Edit
                                                    </button>
                                                    {
                                                        communicationInstructionLoader ?
                                                            <CircularProgress size={15} /> :
                                                            <button style={{ fontSize: 13, fontWeight: "500", fontFamily: "inter", marginTop: 8 }} onClick={handleDeleteCommunication}>
                                                                Delete
                                                            </button>
                                                    }
                                                </div>
                                            </Popover>
                                        </div>
                                    </div>
                                    <div style={{ fontWeight: "500", fontFamily: "inter", fontSize: 13 }}>
                                        {item.description}
                                    </div>
                                </div>
                            ))
                        }
                    </div> :
                    <div className='text-xl font-bold text-center mt-8'>
                        No Communication Instruction Added
                    </div>
            }

            {/* Modal to add Communication Instruction */}
            <Modal
                open={adddComunicationInstModal}
                onClose={() => setAdddComunicationInstModal(false)}
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
                                <div className='flex flex-row items-center justify-between p-2' style={{ fontWeight: '500', fontFamily: "inter", fontSize: 20 }}>
                                    <p />
                                    <p>Add Communication Instruction</p>
                                    <button onClick={() => { setAdddComunicationInstModal(false) }}>
                                        <Image src="/assets/crossBtn.png" height={15} width={15} alt='*' />
                                    </button>
                                </div>
                                <div className='mt-4 w-full'>
                                    <div>
                                        <input className='w-full p-2 rounded-lg bg-[#EDEDED80] outline-none border-none'
                                            value={addCommunicationTitle}
                                            onChange={(e) => setAddCommunicationTitle(e.target.value)}
                                            placeholder='Title'
                                            style={{ fontWeight: "500", fontFamily: "inter", fontSize: 13 }}
                                        />
                                    </div>
                                    <div className='mt-8'>
                                        <textarea className='w-full p-2 rounded-lg bg-[#EDEDED80] outline-none border-none'
                                            value={commmunicationInstructionDescription}
                                            onChange={(e) => setCommmunicationInstructionDescription(e.target.value)}
                                            placeholder='Description'
                                            rows={4}
                                            style={{ fontWeight: "500", fontFamily: "inter", fontSize: 13, resize: "none" }}
                                        />
                                    </div>
                                    {
                                        communicationInstructionLoader ?
                                            <div className='w-full flex flex-row justify-center' style={{ marginTop: 15 }}>
                                                <CircularProgress size={25} />
                                            </div> :
                                            <button className='w-full py-2 text-white bg-purple ' style={{ borderRadius: "50px", marginTop: 15 }}
                                                onClick={handleAddCommunicationInst}
                                            >
                                                Add
                                            </button>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </Box>
            </Modal>

            {/* Modal to add Communication Instruction */}
            <Modal
                open={updateModal}
                onClose={() => setUpdateModal(false)}
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
                                <div className='flex flex-row items-center justify-between p-2' style={{ fontWeight: '500', fontFamily: "inter", fontSize: 20 }}>
                                    <p />
                                    <p>Update Communication Instruction</p>
                                    <button onClick={() => { setUpdateModal(false) }}>
                                        <Image src="/assets/crossBtn.png" height={15} width={15} alt='*' />
                                    </button>
                                </div>
                                <div className='mt-4 w-full'>
                                    <div>
                                        <input className='w-full p-2 rounded-lg bg-[#EDEDED80] outline-none border-none'
                                            value={updateTitle}
                                            onChange={(e) => setUpdateTitle(e.target.value)}
                                            placeholder='Title'
                                            style={{ fontWeight: "500", fontFamily: "inter", fontSize: 13 }}
                                        />
                                    </div>
                                    <div className='mt-8'>
                                        <textarea className='w-full p-2 rounded-lg bg-[#EDEDED80] outline-none border-none'
                                            value={updateDescription}
                                            onChange={(e) => setUpdateDescription(e.target.value)}
                                            placeholder='Description'
                                            rows={4}
                                            style={{ fontWeight: "500", fontFamily: "inter", fontSize: 13, resize: "none" }}
                                        />
                                    </div>
                                    {
                                        communicationInstructionLoader ?
                                            <div className='w-full flex flex-row justify-center' style={{ marginTop: 15 }}>
                                                <CircularProgress size={25} />
                                            </div> :
                                            <button className='w-full py-2 text-white bg-purple ' style={{ borderRadius: "50px", marginTop: 15 }}
                                                onClick={handleUpdateCommunicationInst}
                                            >
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

export default CommunicaionInstruction