import { Alert, Box, CircularProgress, Fade, Modal, Popover, Snackbar } from '@mui/material'
import { DotsThree } from '@phosphor-icons/react'
import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import Apis from '../apis/Apis';
import axios from 'axios';

const PhrasesandQuotes = ({ recallApi, aiData }) => {


    const [phrasesData, setPhrasesData] = useState([]);

    const [phrasesAnchorel, setPhrasesAnchorel] = useState(null);
    const phrasesPopoverId = phrasesAnchorel ? 'simple-popover' : undefined;
    const [phrasesLoader, setPhrasesLoader] = useState(false);
    const [selectedPhrase, setSelectedPhrase] = useState(null);
    const [resultSnack, setResultSnack] = useState(null);
    //add new Phrase or Quote
    const [addNewModal, setAddNewModal] = useState(false);
    const [addNewPhrase, setAddNewPhrase] = useState("");
    //Update Phrase or Quote
    const [updateModal, setUpdateModal] = useState(false);
    const [updatePhrase, setUpdatePhrase] = useState("");

    useEffect(() => {
        if (aiData?.PhrasesAndQuotes) {
            setPhrasesData(aiData.PhrasesAndQuotes);
        }
    }, [recallApi]);

    const handePhrasesMoreClick = (event, item) => {
        setPhrasesAnchorel(event.currentTarget);
        setSelectedPhrase(item);
        setUpdatePhrase(item.description);
    };

    const handleClose = () => {
        setPhrasesAnchorel(null);
    };

    //add new phrase
    const handleaddNewPhrase = async () => {
        try {
            setPhrasesLoader(true);
            const ApiPath = Apis.AddPhrase;
            const localData = localStorage.getItem('User');
            const Data = JSON.parse(localData);
            const AuthToken = Data.data.token;
            console.log("Authtoken is", AuthToken);
            console.log("Apipath is", ApiPath);

            const ApiData = {
                description: addNewPhrase
            }

            console.log("Data sendgin in api is", ApiData);

            const response = await axios.post(ApiPath, ApiData, {
                headers: {
                    "Authorization": "Bearer " + AuthToken,
                    "Content-Type": "application/json"
                }
            });
            if (response) {
                console.log("Response of add phrase api is", response.data);
                if (response.data.status === true) {
                    setAddNewModal(false);
                    setPhrasesAnchorel(null);
                    setAddNewPhrase("");
                    recallApi();
                } else {
                    console.log("Error occured")
                }
                setResultSnack(response.data.message);
            }

        } catch (error) {
            console.error("ERR occured in add phrase api is", error);
        } finally {
            setPhrasesLoader(false);
        }
    }

    //Update phrase
    const handleUpdatePhrase = async () => {
        try {
            setPhrasesLoader(true);
            const ApiPath = Apis.UpdatePhrase;
            const localData = localStorage.getItem('User');
            const Data = JSON.parse(localData);
            const AuthToken = Data.data.token;
            console.log("Authtoken is", AuthToken);
            console.log("Apipath is", ApiPath);

            const ApiData = {
                id: selectedPhrase.id,
                description: updatePhrase
            }

            console.log("Data sendgin in api is", ApiData);

            const response = await axios.post(ApiPath, ApiData, {
                headers: {
                    "Authorization": "Bearer " + AuthToken,
                    "Content-Type": "application/json"
                }
            });
            if (response) {
                console.log("Response of update phrase api is", response.data);
                if (response.data.status === true) {
                    setUpdateModal(false);
                    setPhrasesAnchorel(null);
                    setUpdatePhrase("");
                    recallApi();
                } else {
                    console.log("Error occured")
                }
                setResultSnack(response.data.message);
            }

        } catch (error) {
            console.error("ERR occured in update phrase api is", error);
        } finally {
            setPhrasesLoader(false);
        }
    }

    //Delete phrase
    const handleDeletetePhrase = async () => {
        try {
            setPhrasesLoader(true);
            const ApiPath = Apis.DeletePhrase;
            const localData = localStorage.getItem('User');
            const Data = JSON.parse(localData);
            const AuthToken = Data.data.token;
            console.log("Authtoken is", AuthToken);
            console.log("Apipath is", ApiPath);

            const ApiData = {
                id: selectedPhrase.id,
            }

            console.log("Data sendgin in api is", ApiData);

            const response = await axios.post(ApiPath, ApiData, {
                headers: {
                    "Authorization": "Bearer " + AuthToken,
                    "Content-Type": "application/json"
                }
            });
            if (response) {
                console.log("Response of delete phrase api is", response.data);
                if (response.data.status === true) {
                    setPhrasesAnchorel(null);
                    setUpdatePhrase("");
                    recallApi();
                } else {
                    console.log("Error occured")
                }
                setResultSnack(response.data.message);
            }

        } catch (error) {
            console.error("ERR occured in delete phrase api is", error);
        } finally {
            setPhrasesLoader(false);
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
            <div className='flex flex-row items-center justify-between'>
                <div style={{ fontWeight: "500", fontSize: 20, fontFamily: "inter", color: '#00000060' }}>
                    Communication | <span style={{ fontWeight: "500", fontFamily: "inter", color: '#000000' }}>Key Quotes</span>
                </div>
                <button className='text-purple underline' onClick={() => { setAddNewModal(true) }}>
                    Add New
                </button>
            </div>
            {
                phrasesData.map((item, index) => (
                    <div key={item.id} className='flex flex-row items-start p-4 border border-[#00000010] mt-8 justify-between'>
                        <div style={{ fontWeight: "500", fontSize: 13, fontFamily: "inter" }}>
                            {item.description}
                        </div>
                        <div>
                            <button className='-mt-2' aria-describedby={phrasesPopoverId} variant="contained" color="primary" onClick={(event) => { handePhrasesMoreClick(event, item) }}>
                                <DotsThree size={32} weight="bold" />
                            </button>
                            <Popover
                                id={phrasesPopoverId}
                                open={Boolean(phrasesAnchorel)}
                                anchorEl={phrasesAnchorel}
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
                                        onClick={() => { setUpdateModal(true) }}
                                    >
                                        Edit
                                    </button>
                                    {
                                        phrasesLoader ?
                                            <CircularProgress style={{ marginTop: 8 }} size={15} /> :
                                            <button style={{ fontSize: 13, fontWeight: "500", fontFamily: "inter", marginTop: 8 }}
                                                onClick={handleDeletetePhrase}
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

            <div>
                <button className='text-purple underline mt-4' style={{ fontWeight: "500", fontSize: 13, fontFamily: "inter" }}>
                    Advance Settings
                </button>
            </div>


            {/* Modal to add Phrase & Quote */}
            <Modal
                open={addNewModal}
                onClose={() => setAddNewModal(false)}
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
                                    <p>Add Phrase</p>
                                    <button onClick={() => { setAddNewModal(false) }}>
                                        <Image src="/assets/crossBtn.png" height={15} width={15} alt='*' />
                                    </button>
                                </div>
                                <div className='mt-4 w-full'>
                                    {/* <div>
                                        <input className='w-full p-2 rounded-lg bg-[#EDEDED80] outline-none border-none'
                                            // value={UpdateValues}
                                            // onChange={(e) => setUpdateValues(e.target.value)}
                                            placeholder='Title'
                                            style={{ fontWeight: "500", fontFamily: "inter", fontSize: 13 }}
                                        />
                                    </div> */}
                                    <div className='mt-8'>
                                        <textarea className='w-full p-2 rounded-lg bg-[#EDEDED80] outline-none border-none'
                                            value={addNewPhrase}
                                            onChange={(e) => setAddNewPhrase(e.target.value)}
                                            placeholder='Description'
                                            rows={4}
                                            style={{ fontWeight: "500", fontFamily: "inter", fontSize: 13, resize: "none" }}
                                        />
                                    </div>
                                    {
                                        phrasesLoader ?
                                            <div className='w-full flex flex-row justify-center' style={{ marginTop: 15 }}>
                                                <CircularProgress size={25} />
                                            </div> :
                                            <button className='w-full py-2 text-white bg-purple ' style={{ borderRadius: "50px", marginTop: 15 }}
                                                onClick={handleaddNewPhrase}
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


            {/* Modal to add Phrase & Quote */}
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
                                    <p>Update Phrase</p>
                                    <button onClick={() => { setUpdateModal(false) }}>
                                        <Image src="/assets/crossBtn.png" height={15} width={15} alt='*' />
                                    </button>
                                </div>
                                <div className='mt-4 w-full'>
                                    {/* <div>
                                        <input className='w-full p-2 rounded-lg bg-[#EDEDED80] outline-none border-none'
                                            // value={UpdateValues}
                                            // onChange={(e) => setUpdateValues(e.target.value)}
                                            placeholder='Title'
                                            style={{ fontWeight: "500", fontFamily: "inter", fontSize: 13 }}
                                        />
                                    </div> */}
                                    <div className='mt-8'>
                                        <textarea className='w-full p-2 rounded-lg bg-[#EDEDED80] outline-none border-none'
                                            value={updatePhrase}
                                            onChange={(e) => setUpdatePhrase(e.target.value)}
                                            placeholder='Description'
                                            rows={4}
                                            style={{ fontWeight: "500", fontFamily: "inter", fontSize: 13, resize: "none" }}
                                        />
                                    </div>
                                    {
                                        phrasesLoader ?
                                            <div className='w-full flex flex-row justify-center' style={{ marginTop: 15 }}>
                                                <CircularProgress size={25} />
                                            </div> :
                                            <button className='w-full py-2 text-white bg-purple ' style={{ borderRadius: "50px", marginTop: 15 }}
                                                onClick={handleUpdatePhrase}
                                            >
                                                Save
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

export default PhrasesandQuotes