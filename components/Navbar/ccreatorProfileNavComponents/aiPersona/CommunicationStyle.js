import Apis from '@/components/apis/Apis';
import { Alert, Box, CircularProgress, Fade, Modal, Popover, Snackbar } from '@mui/material';
import { DotsThree } from '@phosphor-icons/react';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import axios from 'axios';

const CommunicationStyle = () => {

    const [communicationStyleData, setCommunicationStyleData] = useState([]);

    const [communicationStyleAnchorel, setCommunicationStyleAnchorel] = useState(null);
    const communicationStylePopoverId = communicationStyleAnchorel ? 'simple-popover' : undefined;
    const [communicationStyleLoader, setCommunicationStyleLoader] = useState(false);
    const [SuccessSnack, setSuccessSnack] = useState(null);
    const [ErrSnack, setErrSnack] = useState(null);
    const [SelectedItem, setSelectedItem] = useState(null);
    //code to add communication style
    const [AddcommunicationModal, setAddcommunicationModal] = useState(false);
    const [AddCommunicationTitle, setAddCommunicationTitle] = useState("");
    const [AddCommunicationDescription, setAddCommunicationDescription] = useState("");
    //code for update communication style
    const [UpdateCommunicationModal, setUpdateCommunicationModal] = useState(false);
    const [UpdateCommunicationTitle, setUpdateCommunicationTitle] = useState("");
    const [UpdateCommunicationDescription, setUpdateCommunicationDescription] = useState("");



    const handleAddCommunicationStyle = async () => {
        try {
            setCommunicationStyleLoader(true);
            const ApiPath = Apis.AddCommunicationStyle;
            const localData = localStorage.getItem('User');
            const Data = JSON.parse(localData);
            const AuthToken = Data.data.token;
            console.log("Loggedin user id is", Data.data.user.id);
            // return
            console.log("Authtoken is", AuthToken);
            console.log("Apipath is", ApiPath);

            const ApiData = {
                title: AddCommunicationTitle,
                description: AddCommunicationDescription
            }

            console.log("Data sendgin in api is", ApiData);

            const response = await axios.post(ApiPath, ApiData, {
                headers: {
                    "Authorization": "Bearer " + AuthToken,
                    "Content-Type": "application/json"
                }
            });
            if (response) {
                console.log("Response of add communication style api is", response.data.data);
                if (response.data.status === true) {
                    setAddcommunicationModal(false);
                    setAddCommunicationTitle("");
                    setAddCommunicationDescription("");
                    // recallApi();
                    setCommunicationStyleData(response.data.data.Communicatinstyle);
                    localStorage.setItem('aiPersonaDetails', JSON.stringify(response.data.data));
                    setSuccessSnack(response.data.message);
                } else {
                    setErrSnack(response.data.message);
                    console.log("Error occured")
                }
            }

        } catch (error) {
            console.error("ERR occured in add communication style api is", error);
        } finally {
            setCommunicationStyleLoader(false);
        }
    }

    const handleUpdateCommunicationStyle = async () => {
        try {
            setCommunicationStyleLoader(true);
            const ApiPath = Apis.UpdateCommunicationStyle;
            const localData = localStorage.getItem('User');
            const Data = JSON.parse(localData);
            const AuthToken = Data.data.token;
            console.log("Loggedin user id is", Data.data.user.id);
            // return
            console.log("Authtoken is", AuthToken);
            console.log("Apipath is", ApiPath);

            const ApiData = {
                id: SelectedItem.id,
                title: UpdateCommunicationTitle,
                description: UpdateCommunicationDescription
            }

            console.log("Data sendgin in api is", ApiData);

            const response = await axios.post(ApiPath, ApiData, {
                headers: {
                    "Authorization": "Bearer " + AuthToken,
                    "Content-Type": "application/json"
                }
            });
            if (response) {
                console.log("Response of update communication style api is", response.data.data);
                if (response.data.status === true) {
                    setUpdateCommunicationModal(false);
                    setCommunicationStyleAnchorel(null);
                    setCommunicationStyleData(response.data.data.Communicatinstyle);
                    localStorage.setItem('aiPersonaDetails', JSON.stringify(response.data.data));
                    setSuccessSnack(response.data.message);
                } else {
                    setErrSnack(response.data.message);
                    console.log("Error occured")
                }
            }

        } catch (error) {
            console.error("ERR occured in update communication style api is", error);
        } finally {
            setCommunicationStyleLoader(false);
        }
    }

    const handleDelCommunicationStyle = async () => {
        try {
            setCommunicationStyleLoader(true);
            const ApiPath = Apis.UpdateCommunicationStyle;
            const localData = localStorage.getItem('User');
            const Data = JSON.parse(localData);
            const AuthToken = Data.data.token;
            console.log("Loggedin user id is", Data.data.user.id);
            // return
            console.log("Authtoken is", AuthToken);
            console.log("Apipath is", ApiPath);

            const ApiData = {
                id: SelectedItem.id,
            }

            console.log("Data sendgin in api is", ApiData);

            const response = await axios.post(ApiPath, ApiData, {
                headers: {
                    "Authorization": "Bearer " + AuthToken,
                    "Content-Type": "application/json"
                }
            });
            if (response) {
                console.log("Response of del communication style api is", response.data.data);
                if (response.data.status === true) {
                    setCommunicationStyleAnchorel(null);
                    setCommunicationStyleData(response.data.data.Communicatinstyle);
                    localStorage.setItem('aiPersonaDetails', JSON.stringify(response.data.data));
                    setSuccessSnack(response.data.message);
                } else {
                    setErrSnack(response.data.message);
                    console.log("Error occured")
                }
            }

        } catch (error) {
            console.error("ERR occured in del communication style api is", error);
        } finally {
            setCommunicationStyleLoader(false);
        }
    }



    useEffect(() => {
        const loalAiPersonaDetails = localStorage.getItem("aiPersonaDetails");
        if (loalAiPersonaDetails) {
            const AiDetails = JSON.parse(loalAiPersonaDetails);
            setCommunicationStyleData(AiDetails.Communicatinstyle);
            console.log("Aidetails recieved from local storage are", AiDetails);
        }
    }, []);


    const handleClose = () => {
        setCommunicationStyleAnchorel(null);
    };

    const handeMoreClick = (event, item) => {
        setCommunicationStyleAnchorel(event.currentTarget);
        setSelectedItem(item);
        setUpdateCommunicationTitle(item.title);
        setUpdateCommunicationDescription(item.description);
    };

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
        },
    }



    return (
        <div>
            <div className='flex flex-row items-center justify-between' style={{ fontWeight: "500", fontSize: 15, fontFamily: "inter" }}>
                <div>
                    Communication Style
                </div>
                <button className='text-purple underline border-none outline-none' onClick={() => setAddcommunicationModal(true)}>
                    Add New
                </button>
            </div>

            <div className='overflow-auto max-h-[46vh]'>
                <div>

                    {
                        communicationStyleData.map((item, index) => (
                            <div key={item.id} className='flex flex-row items-start p-4 border border-[#00000010] mt-8 justify-between'>
                                <div style={{ fontWeight: "500", fontSize: 13, fontFamily: "inter" }}>
                                    {item.description}
                                </div>
                                <div>
                                    <button className='-mt-2' aria-describedby={communicationStylePopoverId} variant="contained" color="primary" onClick={(event) => { handeMoreClick(event, item) }}>
                                        <DotsThree size={32} weight="bold" />
                                    </button>
                                    <Popover
                                        id={communicationStylePopoverId}
                                        open={Boolean(communicationStyleAnchorel)}
                                        anchorEl={communicationStyleAnchorel}
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
                                                onClick={() => { setUpdateCommunicationModal(true) }}
                                            >
                                                Edit
                                            </button>
                                            {
                                                communicationStyleLoader ?
                                                    <CircularProgress style={{ marginTop: 8 }} size={15} /> :
                                                    <button style={{ fontSize: 13, fontWeight: "500", fontFamily: "inter", marginTop: 8 }}
                                                    onClick={handleDelCommunicationStyle}
                                                    >
                                                        Delete
                                                    </button>
                                            }
                                        </div>
                                    </Popover>
                                </div>
                            </div >
                        ))
                    }
                </div>
            </div>


            {/* Modal to add communication style */}
            <Modal
                open={AddcommunicationModal}
                onClose={() => setAddcommunicationModal(false)}
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
                                    <p>Add Communication Style</p>
                                    <button onClick={() => { setAddcommunicationModal(false) }}>
                                        <Image src="/assets/crossBtn.png" height={15} width={15} alt='*' />
                                    </button>
                                </div>
                                <div className='mt-4 w-full'>
                                    <div>
                                        <input className='w-full p-2 rounded-lg bg-[#EDEDED80] outline-none border-none'
                                            value={AddCommunicationTitle}
                                            onChange={(e) => setAddCommunicationTitle(e.target.value)}
                                            placeholder='Title'
                                            style={{ fontWeight: "500", fontFamily: "inter", fontSize: 13 }}
                                        />
                                    </div>
                                    <div className='mt-8'>
                                        <textarea className='w-full p-2 rounded-lg bg-[#EDEDED80] outline-none border-none'
                                            value={AddCommunicationDescription}
                                            onChange={(e) => setAddCommunicationDescription(e.target.value)}
                                            placeholder='Description'
                                            rows={4}
                                            style={{ fontWeight: "500", fontFamily: "inter", fontSize: 13, resize: "none" }}
                                        />
                                    </div>
                                    {
                                        communicationStyleLoader ?
                                            <div className='w-full flex flex-row justify-center' style={{ marginTop: 15 }}>
                                                <CircularProgress size={25} />
                                            </div> :
                                            <button className='w-full py-2 text-white bg-purple ' style={{ borderRadius: "50px", marginTop: 15 }}
                                                onClick={handleAddCommunicationStyle}
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

            {/* Modal to update communication style */}
            <Modal
                open={UpdateCommunicationModal}
                onClose={() => setUpdateCommunicationModal(false)}
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
                                    <p>Update Communication Style</p>
                                    <button onClick={() => { setUpdateCommunicationModal(false) }}>
                                        <Image src="/assets/crossBtn.png" height={15} width={15} alt='*' />
                                    </button>
                                </div>
                                <div className='mt-4 w-full'>
                                    <div>
                                        <input className='w-full p-2 rounded-lg bg-[#EDEDED80] outline-none border-none'
                                            value={UpdateCommunicationTitle}
                                            onChange={(e) => setUpdateCommunicationTitle(e.target.value)}
                                            placeholder='Title'
                                            style={{ fontWeight: "500", fontFamily: "inter", fontSize: 13 }}
                                        />
                                    </div>
                                    <div className='mt-8'>
                                        <textarea className='w-full p-2 rounded-lg bg-[#EDEDED80] outline-none border-none'
                                            value={UpdateCommunicationDescription}
                                            onChange={(e) => setUpdateCommunicationDescription(e.target.value)}
                                            placeholder='Description'
                                            rows={4}
                                            style={{ fontWeight: "500", fontFamily: "inter", fontSize: 13, resize: "none" }}
                                        />
                                    </div>
                                    {
                                        communicationStyleLoader ?
                                            <div className='w-full flex flex-row justify-center' style={{ marginTop: 15 }}>
                                                <CircularProgress size={25} />
                                            </div> :
                                            <button className='w-full py-2 text-white bg-purple ' style={{ borderRadius: "50px", marginTop: 15 }}
                                                onClick={handleUpdateCommunicationStyle}
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
                    open={SuccessSnack}
                    autoHideDuration={3000}
                    onClose={() => {
                        setSuccessSnack(null);
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
                            setSuccessSnack(null)
                        }} severity="success"
                        // className='bg-purple rounded-lg text-white'
                        sx={{ width: 'auto', fontWeight: '700', fontFamily: 'inter', fontSize: '22' }}
                    >
                        {SuccessSnack}
                    </Alert>
                </Snackbar>
            </div>
            <div>
                <Snackbar
                    open={ErrSnack}
                    autoHideDuration={3000}
                    onClose={() => {
                        setErrSnack(null);
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
                            setErrSnack(null)
                        }} severity="success"
                        // className='bg-purple rounded-lg text-white'
                        sx={{ width: 'auto', fontWeight: '700', fontFamily: 'inter', fontSize: '22' }}
                    >
                        {ErrSnack}
                    </Alert>
                </Snackbar>
            </div>


        </div>
    )
}

export default CommunicationStyle;
