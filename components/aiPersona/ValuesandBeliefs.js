import { Box, CircularProgress, Modal, Popover } from '@mui/material';
import { DotsThree } from '@phosphor-icons/react'
import Image from 'next/image';
import React, { useState } from 'react'
import Apis from '../apis/Apis';
import axios from 'axios';

const ValuesandBeliefs = () => {

    const [addValueModal, setAddValueModal] = useState(false);
    const [valuesLoader, setAddValuesLoader] = useState(null);
    const [addValues, setAddValues] = useState("");
    const [valuesDescription, setValuesDescription] = useState("");

    const [updateValueModal, setUpdateValueModal] = useState(false);
    const [UpdateValues, setUpdateValues] = useState("");
    const [updateValuesDescription, setUpdateValuesDescription] = useState("");

    const [anchorEl, setAnchorEl] = useState(null);
    const id = anchorEl ? 'simple-popover' : undefined;
    const [valueAnchorEl, setValueAnchorEl] = useState(null);
    const valuedPopoverId = valueAnchorEl ? 'simple-popover' : undefined;

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
        setValueAnchorEl(null);
    };

    const handleValuesEditClick = (event) => {
        setValueAnchorEl(event.currentTarget);
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
                    // getAiApi();
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
                id: "id",
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
                    setAddValueModal(false);
                    // getAiApi();
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

    //My data
    const beliefsData = [
        {
            id: 1,
            myBelief: "I believe in ALLAH"
        },
        {
            id: 2,
            myBelief: "I believe in ALLAH"
        },
        {
            id: 3,
            myBelief: "I believe in ALLAH"
        },
        {
            id: 4,
            myBelief: "I believe in ALLAH"
        },
    ];

    const valuesData = [
        {
            id: 1,
            value: "Good working"
        },
        {
            id: 2,
            value: "Good working"
        },
        {
            id: 3,
            value: "Good working"
        },
        {
            id: 4,
            value: "Good working"
        },
    ]

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
        <div className='w-10/12 max-h-[65vh] overflow-auto scrollbar scrollbar-track-transparent scrollbar-thumb-purple scrollbar-thin'>
            <div className='flex flex-row items-center w-full justify-between'>
                <div style={{ fontWeight: "500", fontSize: 20, fontFamily: "inter" }}>
                    Beliefs
                </div>
                <button
                    className='text-purple'
                // onClick={() => { setOpenExamplesPopup(true) }}
                >
                    Edit
                </button>
            </div>
            {
                beliefsData.map((item) => (
                    <div key={item.id} className='flex flex-row items-center p-4 border border-[#00000010] mt-8 justify-between'>
                        <div>
                            {item.myBelief}
                        </div>
                        <div>
                            <button aria-describedby={id} variant="contained" color="primary" onClick={handleClick}>
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
                                        className='text-purple' style={{
                                            fontSize: 13, fontWeight: "500",
                                            fontFamily: "inter"
                                        }}>
                                        Edit
                                    </button>
                                    <button style={{ fontSize: 13, fontWeight: "500", fontFamily: "inter", marginTop: 8 }}>
                                        Delete
                                    </button>
                                </div>
                            </Popover>
                        </div>
                    </div>
                ))
            }

            {/* code for values */}
            <div className='flex flex-row items-center w-full justify-between mt-12'>
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
            {
                valuesData.map((item) => (
                    <div key={item.id} className='flex flex-row items-center p-4 border border-[#00000010] mt-8 justify-between'>
                        <div>
                            {item.value}
                        </div>
                        <div>
                            <button aria-describedby={valuedPopoverId} variant="contained" color="primary" onClick={handleValuesEditClick}>
                                <DotsThree size={32} weight="bold" />
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
                                    <button className='text-purple' style={{ fontSize: 13, fontWeight: "500", fontFamily: "inter" }}>
                                        Edit
                                    </button>
                                    <button style={{ fontSize: 13, fontWeight: "500", fontFamily: "inter", marginTop: 8 }}>
                                        Delete
                                    </button>
                                </div>
                            </Popover>
                        </div>
                    </div>
                ))
            }

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
                                                Add
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

        </div>
    )
}

export default ValuesandBeliefs