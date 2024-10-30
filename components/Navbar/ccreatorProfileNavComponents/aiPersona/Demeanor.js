import Apis from '@/components/apis/Apis';
import { Alert, Box, CircularProgress, Fade, Modal, Popover, Snackbar } from '@mui/material';
import { CaretDown, CaretUp, DotsThree } from '@phosphor-icons/react';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';

const Demeanor = ({ recallApi, aiData }) => {

    const [demenorData, setDemenorData] = useState([]);
    const [anchorEl, setAnchorEl] = useState(null);
    const id = anchorEl ? 'simple-popover' : undefined;
    const [demeanorLoader, setDemeanorLoader] = useState(false);
    const [selectedDemeanor, setSelectedDemeanor] = useState(null);
    //code for Examples demeanor
    const [examplesModal, setExamplesModal] = useState(false);
    const [toggleShowDetails, setToggleShowDetails] = useState(null);
    //code to add demeanor
    const [addDemeanorModal, setAddDemeanorModal] = useState(false);
    const [addDemeanorTitle, setAddDemeanorTitle] = useState('');
    const [addDemeanorDescription, setAddDemeanorDescription] = useState('');
    //code to update demeanor
    const [updateDemeanorModal, setUpdateDemeanorModal] = useState(false);
    const [updateDemeanorTitle, setUpdateDemeanorTitle] = useState('');
    const [updateDemeanorDescription, setUpdateDemeanorDescription] = useState('');
    const [resultSnack, setResultSnack] = useState(false);
    const [resultSnackErr, setResultSnackErr] = useState(null);

    useEffect(() => {
        const loalAiPersonaDetails = localStorage.getItem("aiPersonaDetails");
        if (loalAiPersonaDetails) {
            const AiDetails = JSON.parse(loalAiPersonaDetails);
            setDemenorData(AiDetails.demeanor);
            console.log("Aidetails recieved from local storage are", AiDetails);
        }
        // if (aiData?.DoNots) {
        //     setDonotDiscussData(aiData.DoNots);
        // }
    }, []);

    const demeanorExamples = [
        //         Supportive and Encouraging: Promotes a positive and supportive environment to foster growth and learning.

        // Direct and Honest: Communicates directly but tactfully, ensuring clarity and effectiveness in advice.

        // Reflective and Thoughtful: Uses reflection on personal experiences to offer deeper insights and relatable advice.
        {
            id: 1,
            title: "Supportive and Encouraging",
            details: "Promotes a positive and supportive environment to foster growth and learning."
        },
        {
            id: 2,
            title: "Direct and Honest",
            details: "Communicates directly but tactfully, ensuring clarity and effectiveness in advice."
        },
        {
            id: 3,
            title: "Reflective and Thoughtful",
            details: "Uses reflection on personal experiences to offer deeper insights and relatable advice."
        },
    ]


    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleClick = (event, item) => {
        setAnchorEl(event.currentTarget);
        setSelectedDemeanor(item);
        setUpdateDemeanorTitle(item.title);
        setUpdateDemeanorDescription(item.description);
    };


    //add new donot
    const handleadddemeanor = async () => {
        try {
            setDemeanorLoader(true);
            const ApiPath = Apis.AddDemeanor;
            const localData = localStorage.getItem('User');
            const Data = JSON.parse(localData);
            const AuthToken = Data.data.token;
            console.log("Loggedin user id is", Data.data.user.id);
            // return
            console.log("Authtoken is", AuthToken);
            console.log("Apipath is", ApiPath);

            const ApiData = {
                title: addDemeanorTitle,
                description: addDemeanorDescription
            }

            console.log("Data sendgin in api is", ApiData);

            const response = await axios.post(ApiPath, ApiData, {
                headers: {
                    "Authorization": "Bearer " + AuthToken,
                    "Content-Type": "application/json"
                }
            });
            if (response) {
                console.log("Response of add demeanor api is", response.data.data);
                if (response.data.status === true) {
                    setAddDemeanorModal(false);
                    setAddDemeanorTitle("");
                    setAddDemeanorDescription("");
                    // recallApi();
                    setDemenorData(response.data.data.demeanor);
                    localStorage.setItem('aiPersonaDetails', JSON.stringify(response.data.data));
                    setResultSnack(response.data.message);
                } else {
                    setResultSnackErr(response.data.message);
                    console.log("Error occured")
                }
            }

        } catch (error) {
            console.error("ERR occured in add demeanor api is", error);
        } finally {
            setDemeanorLoader(false);
        }
    }

    //Update donot
    const handleupdateDemenor = async () => {
        try {
            setDemeanorLoader(true);
            const ApiPath = Apis.UpdateDemeanor;
            const localData = localStorage.getItem('User');
            const Data = JSON.parse(localData);
            const AuthToken = Data.data.token;
            console.log("Authtoken is", AuthToken);
            console.log("Apipath is", ApiPath);

            const ApiData = {
                id: selectedDemeanor.id,
                title: updateDemeanorTitle,
                description: updateDemeanorDescription,
            }

            console.log("Data sendgin in api is", ApiData);

            const response = await axios.post(ApiPath, ApiData, {
                headers: {
                    "Authorization": "Bearer " + AuthToken,
                    "Content-Type": "application/json"
                }
            });
            if (response) {
                console.log("Response of update demenor api is", response.data);
                if (response.data.status === true) {
                    setUpdateDemeanorModal(false);
                    setAnchorEl(null);
                    // recallApi();
                    setDemenorData(response.data.data.Demeanor);
                    localStorage.setItem('aiPersonaDetails', JSON.stringify(response.data.data));
                } else {
                    console.log("Error occured")
                }
                setResultSnack(response.data.message);
            }

        } catch (error) {
            console.error("ERR occured in update demenor api is", error);
        } finally {
            setDemeanorLoader(false);
        }
    }

    //Delete demeanor
    const handleDelDemenor = async () => {
        try {
            setDemeanorLoader(true);
            const ApiPath = Apis.DelDemeanor;
            const localData = localStorage.getItem('User');
            const Data = JSON.parse(localData);
            const AuthToken = Data.data.token;
            console.log("Authtoken is", AuthToken);
            console.log("Apipath is", ApiPath);

            const ApiData = {
                id: selectedDemeanor.id,
            }

            console.log("Data sendgin in api is", ApiData);

            const response = await axios.post(ApiPath, ApiData, {
                headers: {
                    "Authorization": "Bearer " + AuthToken,
                    "Content-Type": "application/json"
                }
            });
            if (response) {
                console.log("Response of delete demenor api is", response.data);
                if (response.data.status === true) {
                    setAnchorEl(null);
                    setDemenorData(response.data.data.DoNots);
                    localStorage.setItem('aiPersonaDetails', JSON.stringify(response.data.data));
                } else {
                    console.log("Error occured")
                }
                setResultSnack(response.data.message);
            }

        } catch (error) {
            console.error("ERR occured in delete demenor api is", error);
        } finally {
            setDemeanorLoader(false);
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
            <div className='flex flex-row items-center justify-between' style={{ fontWeight: "500", fontSize: 15, fontFamily: "inter" }}>
                <div className='flex flex-row items-end gap-2'>
                    <div>
                        Demeanor
                    </div>
                    {
                        demenorData.length > 0 &&
                        <button className='text-purple underline text-xs' onClick={() => { setExamplesModal(true) }}>
                            (View Examples)
                        </button>
                    }
                </div>

                {
                    demenorData.length > 0 ?
                        <button className='text-purple underline' onClick={() => { setAddDemeanorModal(true) }}>
                            Add New
                        </button> :
                        <button className='text-purple underline' onClick={() => { setExamplesModal(true) }}>
                            View Examples
                        </button>
                }
            </div>

            <div className='max-h-[55vh] overflow-auto scrollbar scrollbar-thumb-purple scrollbar-track-transparent scrollbar-thin'>
                {
                    demenorData.length > 0 ?
                        <div>
                            {
                                demenorData.map((item) => (
                                    <div key={item.id}>
                                        <div className='border-2 rounded-lg p-4 mt-8 flex flex-row items-start justify-between'>

                                            <div>
                                                <div style={{ fontWeight: "500", fontSize: 13, fontFamily: "inter" }}>
                                                    {item.title}
                                                </div>
                                                <div style={{ fontWeight: "400", fontSize: 15, fontFamily: "inter" }}>
                                                    {item.description}
                                                </div>
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
                                                            onClick={() => { setUpdateDemeanorModal(true) }}
                                                            className='text-purple' style={{
                                                                fontSize: 13, fontWeight: "500",
                                                                fontFamily: "inter"
                                                            }}>
                                                            Edit
                                                        </button>
                                                        {
                                                            demeanorLoader ?
                                                                <CircularProgress size={15} /> :
                                                                <button style={{ fontSize: 13, fontWeight: "500", fontFamily: "inter", marginTop: 8 }} onClick={handleDelDemenor}>
                                                                    Delete
                                                                </button>
                                                        }
                                                    </div>
                                                </Popover>
                                            </div>

                                        </div>
                                    </div>
                                ))
                            }
                        </div> :
                        <div>
                            <div className='flex flex-col items-center w-full gap-3 mt-4'>
                                <div className='flex flex-row items-center justify-center bg-purple' style={{ height: "70px", width: "70px", borderRadius: "50%" }}>
                                    <Image src="/assets/creatorProfileNavIcons/settingIcon.png" height={32} width={32} alt='seting' />
                                </div>
                                <div style={{ fontWeight: "500", fontSize: 15, fontFamily: "inter" }}>
                                    No demeanor found yet
                                </div>
                                <div style={{ fontWeight: "500", fontSize: 13, fontFamily: "inter", color: "#050A0860", textAlign: "center" }}>
                                    Please add your demeanor
                                </div>
                                <button className='bg-purple px-4 py-2 text-white' style={{ borderRadius: "50px" }} onClick={() => { setAddDemeanorModal(true) }}>
                                    Add New
                                </button>
                            </div>
                        </div>
                }
            </div>


            {/* Modal to add demeanor */}
            <Modal
                open={addDemeanorModal}
                onClose={() => setAddDemeanorModal(false)}
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
                                    <p>Add Demeanor</p>
                                    <button onClick={() => { setAddDemeanorModal(false) }}>
                                        <Image src="/assets/crossBtn.png" height={15} width={15} alt='*' />
                                    </button>
                                </div>
                                <div className='mt-4 w-full'>
                                    <div>
                                        <input className='w-full p-2 rounded-lg bg-[#EDEDED80] outline-none border-none'
                                            value={addDemeanorTitle}
                                            onChange={(e) => setAddDemeanorTitle(e.target.value)}
                                            placeholder='Ex: Supportive and Encouraging'
                                            style={{ fontWeight: "500", fontFamily: "inter", fontSize: 13 }}
                                        />
                                    </div>
                                    <div className='mt-8'>
                                        <textarea className='w-full p-2 rounded-lg bg-[#EDEDED80] outline-none border-none'
                                            value={addDemeanorDescription}
                                            onChange={(e) => setAddDemeanorDescription(e.target.value)}
                                            placeholder='For example:  Promotes a positive and supportive environment to foster growth and learning'
                                            rows={4}
                                            style={{ fontWeight: "500", fontFamily: "inter", fontSize: 13, resize: "none" }}
                                        />
                                    </div>
                                    {
                                        demeanorLoader ?
                                            <div className='w-full flex flex-row justify-center' style={{ marginTop: 15 }}>
                                                <CircularProgress size={25} />
                                            </div> :
                                            <button className='w-full py-2 text-white bg-purple ' style={{ borderRadius: "50px", marginTop: 15 }}
                                                onClick={handleadddemeanor}
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
                open={updateDemeanorModal}
                onClose={() => setUpdateDemeanorModal(false)}
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
                                    <button onClick={() => { setUpdateDemeanorModal(false) }}>
                                        <Image src="/assets/crossBtn.png" height={15} width={15} alt='*' />
                                    </button>
                                </div>
                                <div className='mt-4 w-full'>
                                    <div>
                                        <input className='w-full p-2 rounded-lg bg-[#EDEDED80] outline-none border-none'
                                            value={updateDemeanorTitle}
                                            onChange={(e) => setUpdateDemeanorTitle(e.target.value)}
                                            placeholder='Ex: Supportive and Encouraging'
                                            style={{ fontWeight: "500", fontFamily: "inter", fontSize: 13 }}
                                        />
                                    </div>
                                    <div className='mt-8'>
                                        <textarea className='w-full p-2 rounded-lg bg-[#EDEDED80] outline-none border-none'
                                            value={updateDemeanorDescription}
                                            onChange={(e) => setUpdateDemeanorDescription(e.target.value)}
                                            placeholder='For example:  Promotes a positive and supportive environment to foster growth and learning'
                                            rows={4}
                                            style={{ fontWeight: "500", fontFamily: "inter", fontSize: 13, resize: "none" }}
                                        />
                                    </div>
                                    {
                                        demeanorLoader ?
                                            <div className='w-full flex flex-row justify-center' style={{ marginTop: 15 }}>
                                                <CircularProgress size={25} />
                                            </div> :
                                            <button className='w-full py-2 text-white bg-purple ' style={{ borderRadius: "50px", marginTop: 15 }}
                                                onClick={handleupdateDemenor}
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

            {/* Modal for the demeanor examples */}
            <Modal
                open={examplesModal}
                onClose={() => setExamplesModal(false)}
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
                                    {/* <p /> */}
                                    <p>Demeanor Examples</p>
                                    <button onClick={() => { setExamplesModal(false) }}>
                                        <Image src="/assets/crossBtn.png" height={15} width={15} alt='*' />
                                    </button>
                                </div>
                                <div className='mt-4'>
                                    {
                                        demeanorExamples.map((item, index) => (
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

export default Demeanor