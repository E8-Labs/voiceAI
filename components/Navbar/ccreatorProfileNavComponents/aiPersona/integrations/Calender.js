import Apis from '@/components/apis/Apis';
import { Alert, Box, CircularProgress, Fade, Modal, Snackbar } from '@mui/material';
import axios from 'axios';
import Image from 'next/image';
import React, { useState } from 'react';

const Calender = () => {

    //code for Calendly
    const [OpenCalendlyModal, setOpenCalendlyModal] = useState(false);
    const [CalenderKey, setCalenderKey] = useState("");
    const [SuccessSnack, setSuccessSnack] = useState(null);
    const [ErrSnack, setErrSnack] = useState(null);
    const [UpdateLoader, setUpdateLoader] = useState(false);

    const handleUpdateAi = async () => {
        try {
            setUpdateLoader(true);
            const localData = localStorage.getItem("User");
            if (localData) {
                const loginDetails = JSON.parse(localData);
                const Authtoken = loginDetails.data.token;
                const ApiPath = Apis.UpdateBuilAI;
                const formData = new FormData();
                formData.append("calCalendarApiKey", CalenderKey);
                for (let [key, value] of formData.entries()) {
                    console.log(`${key}: ${value}`);
                }
                const response = await axios.post(ApiPath, formData, {
                    headers: {
                        "Authorization": "Bearer " + Authtoken,
                    }
                });

                if (response) {
                    console.log("Response of update api is", response.data.data);
                    if (response.data.status === true) {
                        setSuccessSnack(response.data.message);
                        setOpenCalendlyModal(false);
                        setCalenderKey("");
                    } else if (response.data.status === false) {
                        setErrSnack(response.data.message);
                    }
                }

            } else {
                alert("Cannot Proceed!! No user logged in");
                return
            }
        }
        catch (error) {
            console.error("Error occured in update ai api is", error);
        }
        finally {
            setUpdateLoader(false);
        }
    }

    const styles = {
        addButton: {
            fontWeight: "500",
            fontFamily: "inter",
            fontSize: 15,
            borderRadius: "40px"
        },
        AddNewProductModal: {
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
            <div>
                <div style={{ fontWeight: "500", fontSize: 20, fontFamily: "inter" }}>
                    <span style={{ color: "#00000060" }}>Integrations |</span> Calender
                </div>
            </div>
            <div>
                <div className='flex flex-row w-8/12 justify-between items-center border p-3 rounded-lg mt-6 bg-white'>
                    <div>
                        Calendly
                    </div>
                    <button className='text-white bg-purple px-4 py-1 flex flex-row item-center' style={styles.addButton}>
                        Add
                    </button>
                </div>
                <div className='flex flex-row w-8/12 justify-between items-center border p-3 rounded-lg mt-6 bg-white'>
                    <div>
                        GHL Calender
                    </div>
                    <button className='text-white bg-purple px-4 py-1 flex flex-row item-center' style={styles.addButton}>
                        Add
                    </button>
                </div>
                <div className='flex flex-row w-8/12 justify-between items-center border p-3 rounded-lg mt-6 bg-white'>
                    <div>
                        Cal.com
                    </div>
                    <button className='text-white bg-purple px-4 py-1 flex flex-row item-center' style={styles.addButton} onClick={() => { setOpenCalendlyModal(true) }}>
                        Add
                    </button>
                </div>
            </div>

            {/* Modal to add Products */}
            <Modal
                open={OpenCalendlyModal}
                onClose={() => setOpenCalendlyModal(false)}
                closeAfterTransition
                BackdropProps={{
                    timeout: 1000,
                    sx: {
                        backgroundColor: "transparent",
                        backdropFilter: "blur(20px)",
                    },
                }}
            >
                <Box className="lg:w-5/12 sm:w-7/12 w-full" sx={styles.AddNewProductModal}>
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
                                    <p>Real Time Booking</p>
                                    <button onClick={() => { setOpenCalendlyModal(false) }}>
                                        <Image src="/assets/crossBtn.png" height={15} width={15} alt='*' />
                                    </button>
                                </div>
                                <div className='mt-8 w-full'>

                                    <div //className="max-h-[50vh] overflow-y-auto scrollbar scrollbar-thumb-purple scrollbar-track-transparent scrollbar-thin"
                                    >
                                        <div className='border rounded px-4 py-1' style={{ width: "fit-content", fontWeight: "400", fontSize: 14, fontFamily: "inter" }}>
                                            Cal.com
                                        </div>

                                        <div className='mt-6' style={{ fontWeight: "500", fontSize: 16, fontFamily: "inter" }}>
                                            Calender
                                        </div>
                                        <div className='mt-4'>
                                            <input
                                                value={CalenderKey}
                                                onChange={(e) => { setCalenderKey(e.target.value) }}
                                                className='border p-2 w-full outline-none rounded'
                                                placeholder='Enter Calender Key'
                                            />
                                        </div>
                                        <div className='mt-4 w-full flex flex-row justify-end'>
                                            {
                                                CalenderKey ?
                                                    <div>
                                                        {
                                                            UpdateLoader ?
                                                                <CircularProgress size={25} /> :
                                                                <button className='bg-purple text-white p-2 px-4 rounded' onClick={handleUpdateAi}>
                                                                    Next
                                                                </button>
                                                        }
                                                    </div> :
                                                    <button className='bg-gray-200 p-2 px-4 rounded'>
                                                        Next
                                                    </button>
                                            }
                                        </div>
                                    </div>

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

export default Calender