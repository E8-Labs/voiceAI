import { Box, CircularProgress, Modal, Popover } from '@mui/material';
import { DotsThree } from '@phosphor-icons/react'
import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import Apis from '@/components/apis/Apis';
import axios from 'axios';

const ValuesandBeliefs = ({ aiData, recallApi }) => {

    //get values
    const [valuesData, setValuesData] = useState([]);
    //add values
    const [addValueModal, setAddValueModal] = useState(false);
    const [valuesLoader, setAddValuesLoader] = useState(null);
    const [addValues, setAddValues] = useState("");
    const [valuesDescription, setValuesDescription] = useState("");
    //update values
    const [updateValueModal, setUpdateValueModal] = useState(false);
    const [UpdateValues, setUpdateValues] = useState("");
    const [updateValuesDescription, setUpdateValuesDescription] = useState("");
    //del values
    const [anchorEl, setAnchorEl] = useState(null);
    const id = anchorEl ? 'simple-popover' : undefined;
    const [valueAnchorEl, setValueAnchorEl] = useState(null);
    const valuedPopoverId = valueAnchorEl ? 'simple-popover' : undefined;
    const [selecteddItem, setSelectedItem] = useState("");

    //get beliefs
    const [beliefsData, setBeliefsData] = useState([]);
    //add belief
    const [addBeliefModal, setAddBeliefModal] = useState(false);
    const [addBelief, setAddBelief] = useState("");
    const [beliefDescription, setBeliefDescription] = useState("");
    //update belief
    const [updateBeliefModal, setUpdateBeliefModal] = useState(false);
    const [updateBelief, setUpdateBelief] = useState("");
    const [updateBeliefDescription, setUpdateBeliefDescription] = useState("");
    const [beliefData, setBeliefData] = useState(null);


    useEffect(() => {
        const localAiPersonaDetails = localStorage.getItem("aiPersonaDetails");
        if (localAiPersonaDetails) {
            const AiDetails = JSON.parse(localAiPersonaDetails);
            // setFrameWorkData(AiDetails.frameworks);
            if (AiDetails?.values) {
                setValuesData(AiDetails.values);
            }
            if (AiDetails?.beliefs) {
                setBeliefsData(AiDetails.beliefs);
            }
            console.log("Aidetails recieved from local storage are", AiDetails);
        }
        // if (aiData?.values) {
        //     setValuesData(aiData.values);
        // }
        // if (aiData?.beliefs) {
        //     setBeliefsData(aiData.beliefs);
        // }
    }, [recallApi])

    const handleClick = (event, item) => {
        setAnchorEl(event.currentTarget);
        setBeliefData(item);
        setUpdateBelief(item.title);
        setUpdateBeliefDescription(item.description);
    };

    const handleClose = () => {
        setAnchorEl(null);
        setValueAnchorEl(null);
    };

    const handleValuesEditClick = (event, item) => {
        setValueAnchorEl(event.currentTarget);
        setSelectedItem(item);
        setUpdateValues(item.title);
        setUpdateValuesDescription(item.description);
    }


    //ode to add Value&Beliefs
    const handleAddValue = async () => {
        try {
            setAddValuesLoader(true);
            const ApiPath = Apis.AddValues;
            const localData = localStorage.getItem('User');
            const Data = JSON.parse(localData);
            const AuthToken = Data.data.token;
            console.log("Authtoken is", AuthToken);
            console.log("Apipath is", ApiPath);

            const ApiData = {
                title: addValues,
                description: valuesDescription
            }

            console.log("Data sendgin in api is", ApiData);

            const response = await axios.post(ApiPath, ApiData, {
                headers: {
                    "Authorization": "Bearer " + AuthToken,
                    "Content-Type": "application/json"
                }
            });
            if (response) {
                console.log("Response of add values api is", response.data);
                if (response.data.status === true) {
                    setAddValueModal(false);
                    setAddValues("");
                    setValuesDescription("");
                    setValuesData(response.data.data.values);
                    localStorage.setItem('aiPersonaDetails', JSON.stringify(response.data.data));
                } else {
                    console.log("Error occured")
                }
            }

        } catch (error) {
            console.error("ERR occured in add Trait api is", error);
        } finally {
            setAddValuesLoader(false);
        }
    }


    //code to update values
    const handleUpdateValue = async () => {
        try {
            setAddValuesLoader(true);
            const ApiPath = Apis.UpdateValues;
            const localData = localStorage.getItem('User');
            const Data = JSON.parse(localData);
            const AuthToken = Data.data.token;
            console.log("Authtoken is", AuthToken);
            console.log("Apipath is", ApiPath);

            const ApiData = {
                id: selecteddItem.id,
                title: UpdateValues,
                description: updateValuesDescription,
            }

            console.log("Data sendgin in api is", ApiData);

            const response = await axios.post(ApiPath, ApiData, {
                headers: {
                    "Authorization": "Bearer " + AuthToken,
                    "Content-Type": "application/json"
                }
            });
            if (response) {
                console.log("Response of update values api is", response.data);
                if (response.data.status === true) {
                    setValueAnchorEl(null);
                    setValuesData(response.data.data.values);
                    setUpdateValueModal(false);
                    localStorage.setItem('aiPersonaDetails', JSON.stringify(response.data.data));
                } else {
                    console.log("Error occured")
                }
            }

        } catch (error) {
            console.error("ERR occured in add Trait api is", error);
        } finally {
            setAddValuesLoader(false);
        }
    }

    //code to delete values
    const handleDelValue = async () => {
        try {
            setAddValuesLoader(true);
            const ApiPath = Apis.DeleteValues;
            const localData = localStorage.getItem('User');
            const Data = JSON.parse(localData);
            const AuthToken = Data.data.token;
            console.log("Authtoken is", AuthToken);
            console.log("Apipath is", ApiPath);

            const ApiData = {
                id: selecteddItem.id,
            }

            console.log("Data sendgin in api is", ApiData);

            const response = await axios.post(ApiPath, ApiData, {
                headers: {
                    "Authorization": "Bearer " + AuthToken,
                    "Content-Type": "application/json"
                }
            });
            if (response) {
                console.log("Response of delete values api is", response.data);
                if (response.data.status === true) {
                    setValueAnchorEl(null);
                    setValuesData(response.data.data.values);
                    localStorage.setItem('aiPersonaDetails', JSON.stringify(response.data.data));
                    // setValuesData(prevData =>
                    //     prevData.filter(delValue => delValue.id !== selecteddItem.id)
                    // )
                } else {
                    console.log("Error occured")
                }
            }

        } catch (error) {
            console.error("ERR occured in add Trait api is", error);
        } finally {
            setAddValuesLoader(false);
        }
    }

    //code to add belief
    const handleAddBelief = async () => {
        try {
            setAddValuesLoader(true);
            const ApiPath = Apis.AddBeliefs;
            const localData = localStorage.getItem('User');
            const Data = JSON.parse(localData);
            const AuthToken = Data.data.token;
            console.log("Authtoken is", AuthToken);
            console.log("Apipath is", ApiPath);

            const ApiData = {
                title: addBelief,
                description: beliefDescription
            }

            console.log("Data sendgin in api is", ApiData);

            const response = await axios.post(ApiPath, ApiData, {
                headers: {
                    "Authorization": "Bearer " + AuthToken,
                    "Content-Type": "application/json"
                }
            });
            if (response) {
                console.log("Response of add belief api is", response.data);
                if (response.data.status === true) {
                    setAddBeliefModal(false);
                    setAddBelief("");
                    setBeliefDescription("");
                    // recallApi();
                    setBeliefsData(response.data.data.beliefs);
                    localStorage.setItem('aiPersonaDetails', JSON.stringify(response.data.data));
                } else {
                    console.log("Error occured")
                }
            }

        } catch (error) {
            console.error("ERR occured in add belief api is", error);
        } finally {
            setAddValuesLoader(false);
        }
    }

    //code to add belief
    const handleUpdateBelief = async () => {
        try {
            setAddValuesLoader(true);
            const ApiPath = Apis.UpdateBeliefs;
            const localData = localStorage.getItem('User');
            const Data = JSON.parse(localData);
            const AuthToken = Data.data.token;
            console.log("Authtoken is", AuthToken);
            console.log("Apipath is", ApiPath);

            const ApiData = {
                id: beliefData.id,
                title: updateBelief,
                description: updateBeliefDescription
            }

            console.log("Data sendgin in api is", ApiData);

            const response = await axios.post(ApiPath, ApiData, {
                headers: {
                    "Authorization": "Bearer " + AuthToken,
                    "Content-Type": "application/json"
                }
            });
            if (response) {
                console.log("Response of update belief api is", response.data);
                if (response.data.status === true) {
                    setUpdateBeliefModal(false);
                    setUpdateBelief("");
                    setUpdateBeliefDescription("");
                    setAnchorEl(null);
                    setBeliefsData(response.data.data.beliefs);
                    localStorage.setItem('aiPersonaDetails', JSON.stringify(response.data.data));
                } else {
                    console.log("Error occured")
                }
            }

        } catch (error) {
            console.error("ERR occured in add belief api is", error);
        } finally {
            setAddValuesLoader(false);
        }
    }


    //code to del belief
    const handleDeleteBelief = async () => {
        try {
            setAddValuesLoader(true);
            const ApiPath = Apis.DeleteBeliefs;
            const localData = localStorage.getItem('User');
            const Data = JSON.parse(localData);
            const AuthToken = Data.data.token;
            console.log("Authtoken is", AuthToken);
            console.log("Apipath is", ApiPath);

            const ApiData = {
                id: beliefData.id,
            }

            console.log("Data sendgin in api is", ApiData);

            const response = await axios.post(ApiPath, ApiData, {
                headers: {
                    "Authorization": "Bearer " + AuthToken,
                    "Content-Type": "application/json"
                }
            });
            if (response) {
                console.log("Response of update belief api is", response.data);
                if (response.data.status === true) {
                    setAnchorEl(null);
                    setBeliefsData(response.data.data.beliefs);
                    localStorage.setItem('aiPersonaDetails', JSON.stringify(response.data.data));
                    // setBeliefsData(prevData =>
                    //     prevData.filter(Belief => Belief.id !== beliefData.id)
                    // )
                } else {
                    console.log("Error occured")
                }
            }

        } catch (error) {
            console.error("ERR occured in add belief api is", error);
        } finally {
            setAddValuesLoader(false);
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
        <div className='w-10/12'>
            <div className='flex flex-row items-center w-full justify-between'>
                <div style={{ fontWeight: "500", fontSize: 20, fontFamily: "inter" }}>
                    Beliefs
                </div>
                <button
                    className='text-purple underline'
                    onClick={() => { setAddBeliefModal(true) }}
                >
                    Add New
                </button>
            </div>
            <div className='max-h-[29vh] overflow-auto scrollbar scrollbar-track-transparent scrollbar-thumb-purple scrollbar-thin mt-4'>
                {
                    beliefsData && beliefsData.length > 0 ?
                        <div>
                            {
                                beliefsData.map((item) => (
                                    <div key={item.id} className='flex flex-row items-start p-[2vh] border border-[#00000010] mb-4 justify-between'>
                                        <div>
                                            <div style={{ fontWeight: "500", fontSize: 12, fontFamily: "inter" }}>
                                                {item.title}
                                            </div>
                                            <div style={{ fontWeight: "400", fontSize: 15, fontFamily: "inter" }}>
                                                {item.description}
                                            </div>
                                        </div>
                                        <div>
                                            <button aria-describedby={id} variant="contained" color="primary" onClick={(event) => { handleClick(event, item) }}>
                                                <DotsThree size={27} weight="bold" />
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
                                                        className='text-purple' style={{
                                                            fontSize: 13, fontWeight: "500",
                                                            fontFamily: "inter"
                                                        }}
                                                        onClick={() => {
                                                            setUpdateBeliefModal(true);
                                                        }}>
                                                        Edit
                                                    </button>
                                                    {
                                                        valuesLoader ?
                                                            <CircularProgress size={15} /> :
                                                            <button style={{ fontSize: 13, fontWeight: "500", fontFamily: "inter", marginTop: 8 }} onClick={handleDeleteBelief}>
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
                        <div className='text-center w-full mt-8' style={{ fontWeight: "bold", fontSize: 18, fontFamily: "inter" }}>
                            <div style={{ fontWeight: "500", fontSize: 20, fontFamily: "inter" }}>
                                Beliefs
                            </div>
                            <div>
                                <div className='flex flex-col items-center w-full gap-3 mt-4'>
                                    <Image src="/assets/creatorProfileNavIcons/settingIcon.png" height={75} width={75} alt='seting' />
                                    <div style={{ fontWeight: "500", fontSize: 15, fontFamily: "inter" }}>
                                        No belief found yet
                                    </div>
                                    <div style={{ fontWeight: "500", fontSize: 13, fontFamily: "inter", color: "#050A0860", textAlign: "center" }}>
                                        Please add your belief
                                    </div>
                                    <button className='bg-purple px-4 py-2 text-white' style={{ borderRadius: "50px" }} onClick={() => { setAddBeliefModal(true) }}>
                                        Add New
                                    </button>
                                </div>
                            </div>
                        </div>
                }
            </div>

            {/* code for values */}
            <div className='flex flex-row items-center w-full justify-between mt-6'>
                <div style={{ fontWeight: "500", fontSize: 20, fontFamily: "inter" }}>
                    Values
                </div>
                <button
                    className='text-purple underline'
                    onClick={() => setAddValueModal(true)}
                >
                    Add new
                </button>
            </div>
            <div className='max-h-[25vh] overflow-auto scrollbar scrollbar-track-transparent scrollbar-thumb-purple scrollbar-thin mt-4'>
                {
                    valuesData && valuesData.length > 0 ?
                        <div>
                            {
                                valuesData.map((item) => (
                                    <div key={item.id} className='flex flex-row items-start p-[2vh] border border-[#00000010] mb-4 justify-between'>
                                        <div>
                                            <div style={{ fontWeight: "500", fontSize: 12, fontFamily: "inter" }}>
                                                {item.title}
                                            </div>
                                            <div style={{ fontWeight: "400", fontSize: 15, fontFamily: "inter" }}>
                                                {item.description}
                                            </div>
                                        </div>
                                        <div>
                                            <button className='-mt-2' aria-describedby={valuedPopoverId} variant="contained" color="primary" onClick={(event) => { handleValuesEditClick(event, item) }}>
                                                <DotsThree size={27} weight="bold" />
                                            </button>
                                            <Popover
                                                id={valuedPopoverId}
                                                open={Boolean(valueAnchorEl)}
                                                anchorEl={valueAnchorEl}
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
                                                        onClick={() => { setUpdateValueModal(true) }}>
                                                        Edit
                                                    </button>
                                                    {
                                                        valuesLoader ?
                                                            <CircularProgress style={{ marginTop: 8 }} size={15} /> :
                                                            <button style={{ fontSize: 13, fontWeight: "500", fontFamily: "inter", marginTop: 8 }}
                                                                onClick={handleDelValue}>
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
                        <div className='w-full text-center mt-8' style={{ fontWeight: "bold", fontSize: 18, fontFamily: "inter" }}>
                            <div className='flex flex-col items-center w-full gap-3 mt-4'>
                                <Image src="/assets/creatorProfileNavIcons/settingIcon.png" height={75} width={75} alt='seting' />
                                <div style={{ fontWeight: "500", fontSize: 15, fontFamily: "inter" }}>
                                    No value found yet
                                </div>
                                <div style={{ fontWeight: "500", fontSize: 13, fontFamily: "inter", color: "#050A0860", textAlign: "center" }}>
                                    Please add your value
                                </div>
                                <button className='bg-purple px-4 py-2 text-white' style={{ borderRadius: "50px" }} onClick={() => { setAddValueModal(true) }}>
                                    Add New
                                </button>
                            </div>
                        </div>
                }
            </div>

            {/* Modal to add values */}
            <Modal
                open={addValueModal}
                onClose={() => setAddValueModal(false)}
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
                                    <p>Add Values</p>
                                    <button onClick={() => { setAddValueModal(false) }}>
                                        <Image src="/assets/crossBtn.png" height={15} width={15} alt='*' />
                                    </button>
                                </div>
                                <div className='mt-4 w-full'>
                                    <div>
                                        <input className='w-full p-2 rounded-lg bg-[#EDEDED80] outline-none border-none'
                                            value={addValues}
                                            onChange={(e) => setAddValues(e.target.value)}
                                            placeholder='Title'
                                            style={{ fontWeight: "500", fontFamily: "inter", fontSize: 13 }}
                                        />
                                    </div>
                                    <div className='mt-8'>
                                        <textarea className='w-full p-2 rounded-lg bg-[#EDEDED80] outline-none border-none'
                                            value={valuesDescription}
                                            onChange={(e) => setValuesDescription(e.target.value)}
                                            placeholder='Description'
                                            rows={4}
                                            style={{ fontWeight: "500", fontFamily: "inter", fontSize: 13, resize: "none" }}
                                        />
                                    </div>
                                    {
                                        valuesLoader ?
                                            <div className='w-full flex flex-row justify-center' style={{ marginTop: 15 }}>
                                                <CircularProgress size={25} />
                                            </div> :
                                            <button className='w-full py-2 text-white bg-purple ' style={{ borderRadius: "50px", marginTop: 15 }}
                                                onClick={handleAddValue}>
                                                Save
                                            </button>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </Box>
            </Modal>

            {/* Modal to update Values */}
            <Modal
                open={updateValueModal}
                onClose={() => setUpdateValueModal(false)}
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
                                    <p>Update Values</p>
                                    <button onClick={() => { setUpdateValueModal(false) }}>
                                        <Image src="/assets/crossBtn.png" height={15} width={15} alt='*' />
                                    </button>
                                </div>
                                <div className='mt-4 w-full'>
                                    <div>
                                        <input className='w-full p-2 rounded-lg bg-[#EDEDED80] outline-none border-none'
                                            value={UpdateValues}
                                            onChange={(e) => setUpdateValues(e.target.value)}
                                            placeholder='Title'
                                            style={{ fontWeight: "500", fontFamily: "inter", fontSize: 13 }}
                                        />
                                    </div>
                                    <div className='mt-8'>
                                        <textarea className='w-full p-2 rounded-lg bg-[#EDEDED80] outline-none border-none'
                                            value={updateValuesDescription}
                                            onChange={(e) => setUpdateValuesDescription(e.target.value)}
                                            placeholder='Description'
                                            rows={4}
                                            style={{ fontWeight: "500", fontFamily: "inter", fontSize: 13, resize: "none" }}
                                        />
                                    </div>
                                    {
                                        valuesLoader ?
                                            <div className='w-full flex flex-row justify-center' style={{ marginTop: 15 }}>
                                                <CircularProgress size={25} />
                                            </div> :
                                            <button className='w-full py-2 text-white bg-purple ' style={{ borderRadius: "50px", marginTop: 15 }}
                                                onClick={handleUpdateValue}>
                                                Add
                                            </button>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </Box>
            </Modal>


            {/* Modal to add new belief */}
            <Modal
                open={addBeliefModal}
                onClose={() => setAddBeliefModal(false)}
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
                                    <p>Add Beliefs</p>
                                    <button onClick={() => { setAddBeliefModal(false) }}>
                                        <Image src="/assets/crossBtn.png" height={15} width={15} alt='*' />
                                    </button>
                                </div>
                                <div className='mt-4 w-full'>
                                    <div>
                                        <input className='w-full p-2 rounded-lg bg-[#EDEDED80] outline-none border-none'
                                            value={addBelief}
                                            onChange={(e) => setAddBelief(e.target.value)}
                                            placeholder='Title'
                                            style={{ fontWeight: "500", fontFamily: "inter", fontSize: 13 }}
                                        />
                                    </div>
                                    <div className='mt-8'>
                                        <textarea className='w-full p-2 rounded-lg bg-[#EDEDED80] outline-none border-none'
                                            value={beliefDescription}
                                            onChange={(e) => setBeliefDescription(e.target.value)}
                                            placeholder='Description'
                                            rows={4}
                                            style={{ fontWeight: "500", fontFamily: "inter", fontSize: 13, resize: "none" }}
                                        />
                                    </div>
                                    {
                                        valuesLoader ?
                                            <div className='w-full flex flex-row justify-center' style={{ marginTop: 15 }}>
                                                <CircularProgress size={25} />
                                            </div> :
                                            <button className='w-full py-2 text-white bg-purple ' style={{ borderRadius: "50px", marginTop: 15 }}
                                                onClick={handleAddBelief}>
                                                Save
                                            </button>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </Box>
            </Modal>

            {/* Modal to update beiefs */}
            <Modal
                open={updateBeliefModal}
                onClose={() => setUpdateBeliefModal(false)}
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
                                    <p>Add Beliefs</p>
                                    <button onClick={() => { setUpdateBeliefModal(false) }}>
                                        <Image src="/assets/crossBtn.png" height={15} width={15} alt='*' />
                                    </button>
                                </div>
                                <div className='mt-4 w-full'>
                                    <div>
                                        <input className='w-full p-2 rounded-lg bg-[#EDEDED80] outline-none border-none'
                                            value={updateBelief}
                                            onChange={(e) => setUpdateBelief(e.target.value)}
                                            placeholder='Title'
                                            style={{ fontWeight: "500", fontFamily: "inter", fontSize: 13 }}
                                        />
                                    </div>
                                    <div className='mt-8'>
                                        <textarea className='w-full p-2 rounded-lg bg-[#EDEDED80] outline-none border-none'
                                            value={updateBeliefDescription}
                                            onChange={(e) => setUpdateBeliefDescription(e.target.value)}
                                            placeholder='Description'
                                            rows={4}
                                            style={{ fontWeight: "500", fontFamily: "inter", fontSize: 13, resize: "none" }}
                                        />
                                    </div>
                                    {
                                        valuesLoader ?
                                            <div className='w-full flex flex-row justify-center' style={{ marginTop: 15 }}>
                                                <CircularProgress size={25} />
                                            </div> :
                                            <button className='w-full py-2 text-white bg-purple ' style={{ borderRadius: "50px", marginTop: 15 }}
                                                onClick={handleUpdateBelief}>
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

export default ValuesandBeliefs