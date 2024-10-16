import { Alert, Box, CircularProgress, Fade, Modal, Popover, Snackbar } from '@mui/material';
import { DotsThree } from '@phosphor-icons/react'
import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import Apis from '../apis/Apis';
import axios from 'axios';

const Philosophy = ({ aiData, recallApi }) => {

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

    //get philosophy
    const [philosophyData, setPhilosophyData] = useState([]);
    //add philosophy
    const [addPhilosophyModal, setAddPhilosophyModal] = useState(false);
    const [addPhilosophy, setAddPhilosophy] = useState("");
    const [philosophyDescription, setPhilosophyDescription] = useState("");
    //update philosophy
    const [updatePhilosophyModal, setUpdatePhilosophyModal] = useState(false);
    const [updatePhilosophy, setUpdatePhilosophy] = useState("");
    const [updatephilosophyDescription, setUpdatephilosophyDescription] = useState("");
    const [selectedPhilosophyDetails, setSelectedPhilosophyDetails] = useState(null);
    const [resultSnack, setResultSnack] = useState(null);

    useEffect(() => {
        if (aiData?.values) {
            setValuesData(aiData.values);
        }
        if (aiData?.Philosophies) {
            setPhilosophyData(aiData.Philosophies);
        }
    }, [recallApi])

    const handleClick = (event, item) => {
        setAnchorEl(event.currentTarget);
        setSelectedPhilosophyDetails(item);
        setUpdatePhilosophy(item.title);
        setUpdatephilosophyDescription(item.description);
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


    //ode to add Views& Philosophies
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
                    recallApi();
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
                    recallApi();
                    setUpdateValueModal(false);
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
                    setValuesData(prevData =>
                        prevData.filter(delValue => delValue.id !== selecteddItem.id)
                    )
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

    //code to add philosophy
    const handleaddPhilosophy = async () => {
        try {
            setAddValuesLoader(true);
            const ApiPath = Apis.AddPhilosophy;
            const localData = localStorage.getItem('User');
            const Data = JSON.parse(localData);
            const AuthToken = Data.data.token;
            console.log("Authtoken is", AuthToken);
            console.log("Apipath is", ApiPath);

            const ApiData = {
                // title: addPhilosophy,
                description: philosophyDescription
            }

            console.log("Data sendgin in api is", ApiData);

            const response = await axios.post(ApiPath, ApiData, {
                headers: {
                    "Authorization": "Bearer " + AuthToken,
                    "Content-Type": "application/json"
                }
            });
            if (response) {
                console.log("Response of add philosophy api is", response.data);
                if (response.data.status === true) {
                    setAddPhilosophyModal(false);
                    setAddPhilosophy("");
                    setPhilosophyDescription("");
                    recallApi();
                } else {
                    console.log("Error occured")
                }
                setResultSnack(response.data.message);
            }

        } catch (error) {
            console.error("ERR occured in add philosophy api is", error);
        } finally {
            setAddValuesLoader(false);
        }
    }

    //code to add philosophy
    const handleupdatePhilosophy = async () => {
        try {
            setAddValuesLoader(true);
            const ApiPath = Apis.UpdatePhilosophy;
            const localData = localStorage.getItem('User');
            const Data = JSON.parse(localData);
            const AuthToken = Data.data.token;
            console.log("Authtoken is", AuthToken);
            console.log("Apipath is", ApiPath);

            const ApiData = {
                id: selectedPhilosophyDetails.id,
                title: updatePhilosophy,
                description: updatephilosophyDescription
            }

            console.log("Data sendgin in api is", ApiData);

            const response = await axios.post(ApiPath, ApiData, {
                headers: {
                    "Authorization": "Bearer " + AuthToken,
                    "Content-Type": "application/json"
                }
            });
            if (response) {
                console.log("Response of update philosophy api is", response.data);
                if (response.data.status === true) {
                    setUpdatePhilosophyModal(false);
                    setUpdatePhilosophy("");
                    setUpdatephilosophyDescription("");
                    setAnchorEl(null);
                    recallApi();
                } else {
                    console.log("Error occured")
                }
                setResultSnack(response.data.message);
            }

        } catch (error) {
            console.error("ERR occured in add philosophy api is", error);
        } finally {
            setAddValuesLoader(false);
        }
    }


    //code to del philosophy
    const handleDeletephilosophy = async () => {
        try {
            setAddValuesLoader(true);
            const ApiPath = Apis.DeletePhilosophy;
            const localData = localStorage.getItem('User');
            const Data = JSON.parse(localData);
            const AuthToken = Data.data.token;
            console.log("Authtoken is", AuthToken);
            console.log("Apipath is", ApiPath);

            const ApiData = {
                id: selectedPhilosophyDetails.id,
            }

            console.log("Data sendgin in api is", ApiData);

            const response = await axios.post(ApiPath, ApiData, {
                headers: {
                    "Authorization": "Bearer " + AuthToken,
                    "Content-Type": "application/json"
                }
            });
            if (response) {
                console.log("Response of delete philosophy api is", response.data);
                if (response.data.status === true) {
                    setAnchorEl(null);
                    setPhilosophyData(prevData =>
                        prevData.filter(Philosophy => Philosophy.id !== selectedPhilosophyDetails.id)
                    );
                } else {
                    console.log("Error occured")
                }
                setResultSnack(response.data.message);
            }

        } catch (error) {
            console.error("ERR occured in delete  philosophy api is", error);
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
        <div className='w-10/12 max-h-[52%] overflow-auto scrollbar scrollbar-track-transparent scrollbar-thumb-purple scrollbar-thin'>
            <div className='flex flex-row items-center w-full justify-between'>
                <div style={{ fontWeight: "500", fontSize: 20, fontFamily: "inter" }}>
                    Philosophies
                </div>
                <button
                    className='text-purple underline'
                    onClick={() => { setAddPhilosophyModal(true) }}
                >
                    Add New
                </button>
            </div>
            {
                philosophyData && philosophyData.length > 0 ?
                    <div>
                        {
                            philosophyData.map((item) => (
                                <div key={item.id} className='flex flex-row items-center p-4 border border-[#00000010] mt-8 justify-between'>
                                    <div>
                                        {item.description}
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
                                                    className='text-purple' style={{
                                                        fontSize: 13, fontWeight: "500",
                                                        fontFamily: "inter"
                                                    }}
                                                    onClick={() => {
                                                        setUpdatePhilosophyModal(true);
                                                    }}>
                                                    Edit
                                                </button>
                                                {
                                                    valuesLoader ?
                                                        <CircularProgress size={15} /> :
                                                        <button style={{ fontSize: 13, fontWeight: "500", fontFamily: "inter", marginTop: 8 }} onClick={handleDeletephilosophy}>
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
                        No Philosophy Added
                    </div>
            }

            {/* code for values */}
            <div className='flex flex-row items-center w-full justify-between mt-12'>
                <div style={{ fontWeight: "500", fontSize: 20, fontFamily: "inter" }}>
                    Views
                </div>
                <button
                    className='text-purple underline'
                    onClick={() => setAddValueModal(true)}
                >
                    Add new
                </button>
            </div>
            {
                valuesData ?
                    <div>
                        {
                            valuesData.map((item) => (
                                <div key={item.id} className='flex flex-row items-start p-4 border border-[#00000010] mt-8 justify-between'>
                                    <div>
                                        {/* <div>
                                {item.title}
                            </div> */}
                                        <div style={{ fontWeight: "500", fontSize: 13, fontFamily: "inter" }}>
                                            {item.description}
                                        </div>
                                    </div>
                                    <div>
                                        <button className='-mt-2' aria-describedby={valuedPopoverId} variant="contained" color="primary" onClick={(event) => { handleValuesEditClick(event, item) }}>
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
                        No Values
                    </div>
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


            {/* Modal to add new philosophy */}
            <Modal
                open={addPhilosophyModal}
                onClose={() => setAddPhilosophyModal(false)}
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
                                    <p>Add philosophies</p>
                                    <button onClick={() => { setAddPhilosophyModal(false) }}>
                                        <Image src="/assets/crossBtn.png" height={15} width={15} alt='*' />
                                    </button>
                                </div>
                                <div className='mt-4 w-full'>
                                    {/* <div>
                                        <input className='w-full p-2 rounded-lg bg-[#EDEDED80] outline-none border-none'
                                            value={addPhilosophy}
                                            onChange={(e) => setAddPhilosophy(e.target.value)}
                                            placeholder='Title'
                                            style={{ fontWeight: "500", fontFamily: "inter", fontSize: 13 }}
                                        />
                                    </div> */}
                                    <div className='mt-8'>
                                        <textarea className='w-full p-2 rounded-lg bg-[#EDEDED80] outline-none border-none'
                                            value={philosophyDescription}
                                            onChange={(e) => setPhilosophyDescription(e.target.value)}
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
                                                onClick={handleaddPhilosophy}>
                                                Add
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
                open={updatePhilosophyModal}
                onClose={() => setUpdatePhilosophyModal(false)}
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
                                    <p>Update philosophies</p>
                                    <button onClick={() => { setUpdatePhilosophyModal(false) }}>
                                        <Image src="/assets/crossBtn.png" height={15} width={15} alt='*' />
                                    </button>
                                </div>
                                <div className='mt-4 w-full'>
                                    {/* <div>
                                        <input className='w-full p-2 rounded-lg bg-[#EDEDED80] outline-none border-none'
                                            value={updatePhilosophy}
                                            onChange={(e) => setUpdatePhilosophy(e.target.value)}
                                            placeholder='Title'
                                            style={{ fontWeight: "500", fontFamily: "inter", fontSize: 13 }}
                                        />
                                    </div> */}
                                    <div className='mt-8'>
                                        <textarea className='w-full p-2 rounded-lg bg-[#EDEDED80] outline-none border-none'
                                            value={updatephilosophyDescription}
                                            onChange={(e) => setUpdatephilosophyDescription(e.target.value)}
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
                                                onClick={handleupdatePhilosophy}>
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

export default Philosophy