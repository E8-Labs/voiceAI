import { Alert, Box, CircularProgress, Fade, Modal, Popover, Snackbar } from '@mui/material'
import { DotsThree } from '@phosphor-icons/react'
import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import Apis from '@/components/apis/Apis';
import axios from 'axios';
import CommunicationSetting from './CommunicationSetting';

const DoNotDiscuss = ({ recallApi, aiData }) => {


    const [donotDiscussData, setDonotDiscussData] = useState([]);

    const [donotDisturbAnchorel, setDonotDiscussAnchorel] = useState(null);
    const donotDisturbPopoverId = donotDisturbAnchorel ? 'simple-popover' : undefined;
    const [donotDisturbLoader, setDonotDisturbLoader] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [selectedDonot, setselectedDonot] = useState(null);
    const [resultSnack, setResultSnack] = useState(null);
    //add new Donot discuss
    const [addNewDonotDescription, setaddNewDonotDescriptionDescription] = useState("");

    //update Donot
    const [updateDonotDescription, setUpdateDonotDescriptionDescription] = useState("");
    const [openUpdateModal, setOpenUpdateModal] = useState(false);

    //advance setting code
    const [openAdvanceSettingPopup, setOpenAdvanceSettingPopup] = useState(false);

    useEffect(() => {
        if (aiData?.DoNots) {
            setDonotDiscussData(aiData.DoNots);
        }
    }, []);

    const handeDonotDiscussMoreClick = (event, item) => {
        setUpdateDonotDescriptionDescription(item.description);
        setDonotDiscussAnchorel(event.currentTarget);
        setselectedDonot(item);
    }

    const handleClose = () => {
        setDonotDiscussAnchorel(null);
    };

    const handleOpenModal = () => {
        setOpenModal(true);
    }

    //add new donot
    const handleaddNewDonotDescription = async () => {
        try {
            setDonotDisturbLoader(true);
            const ApiPath = Apis.AddDonot;
            const localData = localStorage.getItem('User');
            const Data = JSON.parse(localData);
            const AuthToken = Data.data.token;
            console.log("Authtoken is", AuthToken);
            console.log("Apipath is", ApiPath);

            const ApiData = {
                description: addNewDonotDescription
            }

            console.log("Data sendgin in api is", ApiData);

            const response = await axios.post(ApiPath, ApiData, {
                headers: {
                    "Authorization": "Bearer " + AuthToken,
                    "Content-Type": "application/json"
                }
            });
            if (response) {
                console.log("Response of add donot api is", response.data);
                if (response.data.status === true) {
                    setOpenModal(false);
                    setaddNewDonotDescriptionDescription("");
                    // recallApi();
                    setDonotDiscussData(response.data.data.DoNots);
                } else {
                    console.log("Error occured")
                }
                setResultSnack(response.data.message);
            }

        } catch (error) {
            console.error("ERR occured in add donot api is", error);
        } finally {
            setDonotDisturbLoader(false);
        }
    }

    //Update donot
    const handleupdateDonotDescription = async () => {
        try {
            setDonotDisturbLoader(true);
            const ApiPath = Apis.UpdateDonot;
            const localData = localStorage.getItem('User');
            const Data = JSON.parse(localData);
            const AuthToken = Data.data.token;
            console.log("Authtoken is", AuthToken);
            console.log("Apipath is", ApiPath);

            const ApiData = {
                id: selectedDonot.id,
                description: updateDonotDescription,
            }

            console.log("Data sendgin in api is", ApiData);

            const response = await axios.post(ApiPath, ApiData, {
                headers: {
                    "Authorization": "Bearer " + AuthToken,
                    "Content-Type": "application/json"
                }
            });
            if (response) {
                console.log("Response of update donot api is", response.data);
                if (response.data.status === true) {
                    setOpenUpdateModal(false);
                    setDonotDiscussAnchorel(null);
                    // recallApi();
                    setDonotDiscussData(response.data.data.DoNots);
                } else {
                    console.log("Error occured")
                }
                setResultSnack(response.data.message);
            }

        } catch (error) {
            console.error("ERR occured in update donot api is", error);
        } finally {
            setDonotDisturbLoader(false);
        }
    }

    //Update donot
    const handleDeleteDonotDescription = async () => {
        try {
            setDonotDisturbLoader(true);
            const ApiPath = Apis.DeleteDonot;
            const localData = localStorage.getItem('User');
            const Data = JSON.parse(localData);
            const AuthToken = Data.data.token;
            console.log("Authtoken is", AuthToken);
            console.log("Apipath is", ApiPath);

            const ApiData = {
                id: selectedDonot.id,
                // description: addNewDonotDescription,
            }

            console.log("Data sendgin in api is", ApiData);

            const response = await axios.post(ApiPath, ApiData, {
                headers: {
                    "Authorization": "Bearer " + AuthToken,
                    "Content-Type": "application/json"
                }
            });
            if (response) {
                console.log("Response of delete donot api is", response.data);
                if (response.data.status === true) {
                    setDonotDiscussAnchorel(null);
                    setDonotDiscussData(response.data.data.DoNots);
                } else {
                    console.log("Error occured")
                }
                setResultSnack(response.data.message);
            }

        } catch (error) {
            console.error("ERR occured in delete donot api is", error);
        } finally {
            setDonotDisturbLoader(false);
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
        },
        styleSettingPopup: {
            height: "auto",
            bgcolor: "transparent",
            // p: 2,
            mx: "auto",
            my: "50vh",
            transform: "translateY(-50%)",
            borderRadius: 2,
            border: "none",
            outline: "none",
            // border: "2px solid green"
        }
    }


    return (
        <div>
            <div style={{ fontWeight: "500", fontSize: 20, fontFamily: "inter" }}>
                <span style={{ color: "#00000060" }}>Communication |</span> Donot Discuss
            </div>
            <div className='flex flex-row items-center justify-between'>
                <div style={{ fontWeight: "500", fontSize: 15, fontFamily: "inter", marginTop: 35 }}>
                    Do not discuss
                </div>
                <button className='underline text-purple' onClick={handleOpenModal}>
                    Add New
                </button>
            </div>
            {
                donotDiscussData.map((item, index) => (
                    <div key={item.id} className='flex flex-row items-start p-4 border border-[#00000010] mt-8 justify-between'>
                        <div style={{ fontWeight: "500", fontSize: 13, fontFamily: "inter" }}>
                            {item.description}
                        </div>
                        <div>
                            <button className='-mt-2' aria-describedby={donotDisturbPopoverId} variant="contained" color="primary" onClick={(event) => { handeDonotDiscussMoreClick(event, item) }}>
                                <DotsThree size={32} weight="bold" />
                            </button>
                            <Popover
                                id={donotDisturbPopoverId}
                                open={Boolean(donotDisturbAnchorel)}
                                anchorEl={donotDisturbAnchorel}
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
                                        onClick={() => { setOpenUpdateModal(true) }}
                                    >
                                        Edit
                                    </button>
                                    {
                                        donotDisturbLoader ?
                                            <CircularProgress style={{ marginTop: 8 }} size={15} /> :
                                            <button style={{ fontSize: 13, fontWeight: "500", fontFamily: "inter", marginTop: 8 }}
                                                onClick={handleDeleteDonotDescription}
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

            <div>
                <button className='text-purple underline mt-4' style={{ fontWeight: "500", fontSize: 13, fontFamily: "inter" }} onClick={() => { setOpenAdvanceSettingPopup(true) }}>
                    Advance Settings
                </button>
            </div>


            {/* Modal to add donot */}
            <Modal
                open={openModal}
                onClose={() => setOpenModal(false)}
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
                                    <p>Add Donot Discuss</p>
                                    <button onClick={() => { setOpenModal(false) }}>
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
                                            value={addNewDonotDescription}
                                            onChange={(e) => setaddNewDonotDescriptionDescription(e.target.value)}
                                            placeholder='Description'
                                            rows={4}
                                            style={{ fontWeight: "500", fontFamily: "inter", fontSize: 13, resize: "none" }}
                                        />
                                    </div>
                                    {
                                        donotDisturbLoader ?
                                            <div className='w-full flex flex-row justify-center' style={{ marginTop: 15 }}>
                                                <CircularProgress size={25} />
                                            </div> :
                                            <button className='w-full py-2 text-white bg-purple ' style={{ borderRadius: "50px", marginTop: 15 }}
                                                onClick={handleaddNewDonotDescription}
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

            {/* Modal to update donnot */}
            <Modal
                open={openUpdateModal}
                onClose={() => setOpenUpdateModal(false)}
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
                                    <p>Update Donot Discuss</p>
                                    <button onClick={() => { setOpenUpdateModal(false) }}>
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
                                            value={updateDonotDescription}
                                            onChange={(e) => setUpdateDonotDescriptionDescription(e.target.value)}
                                            placeholder='Description'
                                            rows={4}
                                            style={{ fontWeight: "500", fontFamily: "inter", fontSize: 13, resize: "none" }}
                                        />
                                    </div>
                                    {
                                        donotDisturbLoader ?
                                            <div className='w-full flex flex-row justify-center' style={{ marginTop: 15 }}>
                                                <CircularProgress size={25} />
                                            </div> :
                                            <button className='w-full py-2 text-white bg-purple ' style={{ borderRadius: "50px", marginTop: 15 }}
                                                onClick={handleupdateDonotDescription}
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

            {/* Modal for setting s */}
            <Modal
                open={openAdvanceSettingPopup}
                onClose={() => setOpenAdvanceSettingPopup(false)}
                closeAfterTransition
                BackdropProps={{
                    timeout: 1000,
                    sx: {
                        backgroundColor: "transparent",
                        backdropFilter: "blur(40px)",
                    },
                }}
            >
                <Box className="sm:w-11/12 w-full" sx={styles.styleSettingPopup}>
                    {/* <LoginModal creator={creator} assistantData={getAssistantData} closeForm={setOpenLoginModal} /> */}
                    <div className="flex flex-row justify-center w-full">
                        <div
                            className="sm:w-11/12 w-full h-[80vh]"
                            style={{
                                backgroundColor: "#ffffff63",
                                padding: 20,
                                borderRadius: 10,
                            }}
                        >
                            <div className='w-full bg-white px-14 py-6 rounded-lg' style={{ height: '100%' }}>
                                <div className='flex flex-row w-full justify-end'>
                                    <button onClick={() => setOpenAdvanceSettingPopup(false)}>
                                        <Image src="/assets/crossBtn.png" height={24} width={24} alt='*' />
                                    </button>
                                </div>
                                <div style={{ fontWeight: "500", fontFamily: "inter", fontSize: 15, color: "#00000060" }}>
                                    Advance Settings
                                </div>
                                <div className='mt-8'>
                                    <CommunicationSetting recallApi={recallApi} aiData={aiData} />
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


        </div >
    )
}

export default DoNotDiscuss