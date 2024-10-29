import { Alert, Box, CircularProgress, Fade, Modal, Popover, Slide, Snackbar } from '@mui/material'
import { DotsThree } from '@phosphor-icons/react'
import React, { useEffect, useState } from 'react'
import CommunicationSetting from './CommunicationSetting';
import Image from 'next/image';
import Apis from '@/components/apis/Apis';
import axios from 'axios';

const FAQ = ({ recallApi, aiData }) => {


    const [FAQData, setFAQData] = useState([]);

    const [FAQAnchorel, setFAQAnchorel] = useState(null);
    const FAQPopoverId = FAQAnchorel ? 'simple-popover' : undefined;
    const [FAQLoader, setFAQLoader] = useState(false);
    const [openAdvanceSettingPopup, setOpenAdvanceSettingPopup] = useState(false);
    const [selectedFAQ, setSelectedFAQ] = useState(null);
    const [resultSnackSuccess, setResultSnackSuccess] = useState(null);
    const [resultSnackErr, setResultSnackErr] = useState(null);

    //code to add new FAQ
    const [addFaqModal, setAddFaqModal] = useState(false);
    const [addFaqQuestion, setAddFaqQuestion] = useState("");
    const [addFaqAnswer, setAddFaqAnswer] = useState("");

    //code to update Communication FAQ
    const [updateFaqModal, setUpdateFaqModal] = useState(false);
    const [updateFaqQuestion, setUpdateFaqQuestion] = useState("");
    const [updateFaqAnswer, setUpdateFaqAnswer] = useState("");

    useEffect(() => {
        const localAiPersonaDetails = localStorage.getItem("aiPersonaDetails");
        if (localAiPersonaDetails) {
            const AiDetails = JSON.parse(localAiPersonaDetails);
            setFAQData(AiDetails.communicatinCommonFaqs);
            console.log("Aidetails recieved from local storage are", AiDetails);
        }
    }, []);

    const handeFAQMoreClick = (event, item) => {
        setFAQAnchorel(event.currentTarget);
        setSelectedFAQ(item);
        setUpdateFaqQuestion(item.question);
        setUpdateFaqAnswer(item.answer);
    }

    const handleClose = () => {
        setFAQAnchorel(null);
    };


    //code to add FAQ question
    const handleAddFaq = async () => {
        setFAQLoader(true);
        try {
            const ApiPath = Apis.AddComunictionFAQ;
            const localData = localStorage.getItem('User');
            const Data = JSON.parse(localData);
            const AuthToken = Data.data.token;
            console.log("Loggedin user id is", Data.data.user.id);
            // return
            console.log("Authtoken is", AuthToken);
            console.log("Apipath is", ApiPath);

            const ApiData = {
                question: addFaqQuestion,
                answer: addFaqAnswer
            }

            console.log("Data sendgin in api is", ApiData);

            const response = await axios.post(ApiPath, ApiData, {
                headers: {
                    "Authorization": "Bearer " + AuthToken,
                    "Content-Type": "application/json"
                }
            });
            if (response) {
                console.log("Response of add FAQ api is", response.data.data);
                if (response.data.status === true) {
                    setAddFaqModal(false);
                    setAddFaqQuestion("");
                    setAddFaqAnswer("");
                    setFAQData(response.data.data.communicatinCommonFaqs);
                    localStorage.setItem('aiPersonaDetails', JSON.stringify(response.data.data));
                    setResultSnackSuccess(response.data.message);
                } else {
                    console.log("Error occured")
                    setResultSnackErr(response.data.message);
                }
            }

        } catch (error) {
            console.error("ERR occured in add donot api is", error);
        } finally {
            setFAQLoader(false);
        }
    }


    //code to update FAQ Question
    const hnadleUpdateFAQ = async () => {
        setFAQLoader(true);
        try {
            const ApiPath = Apis.UpdateComunictionFAQ;
            const localData = localStorage.getItem('User');
            const Data = JSON.parse(localData);
            const AuthToken = Data.data.token;
            console.log("Loggedin user id is", Data.data.user.id);
            // return
            console.log("Authtoken is", AuthToken);
            console.log("Apipath is", ApiPath);

            const ApiData = {
                id: selectedFAQ.id,
                question: updateFaqQuestion,
                answer: updateFaqAnswer
            }

            console.log("Data sendgin in api is", ApiData);

            const response = await axios.post(ApiPath, ApiData, {
                headers: {
                    "Authorization": "Bearer " + AuthToken,
                    "Content-Type": "application/json"
                }
            });
            if (response) {
                console.log("Response of add FAQ api is", response.data.data);
                if (response.data.status === true) {
                    setFAQAnchorel(null);
                    setUpdateFaqModal(false);
                    setFAQData(response.data.data.communicatinCommonFaqs);
                    localStorage.setItem('aiPersonaDetails', JSON.stringify(response.data.data));
                    setResultSnackSuccess(response.data.message);
                } else {
                    console.log("Error occured")
                    setResultSnackErr(response.data.message);
                }
            }

        } catch (error) {
            console.error("ERR occured in add donot api is", error);
        } finally {
            setFAQLoader(false);
        }
    }

    //code to Delete FAQ question
    const handleDelFaq = async () => {
        setFAQLoader(true);
        try {
            const ApiPath = Apis.DelComunictionFAQ;
            const localData = localStorage.getItem('User');
            const Data = JSON.parse(localData);
            const AuthToken = Data.data.token;
            console.log("Loggedin user id is", Data.data.user.id);
            // return
            console.log("Authtoken is", AuthToken);
            console.log("Apipath is", ApiPath);

            const ApiData = {
                id: selectedFAQ.id
            }

            console.log("Data sendgin in api is", ApiData);

            const response = await axios.post(ApiPath, ApiData, {
                headers: {
                    "Authorization": "Bearer " + AuthToken,
                    "Content-Type": "application/json"
                }
            });
            if (response) {
                console.log("Response of del FAQ api is", response.data.data);
                if (response.data.status === true) {
                    setFAQAnchorel(null);
                    setFAQData(response.data.data.communicatinCommonFaqs);
                    localStorage.setItem('aiPersonaDetails', JSON.stringify(response.data.data));
                    setResultSnackSuccess(response.data.message);
                } else {
                    console.log("Error occured")
                    setResultSnackErr(response.data.message);
                }
            }

        } catch (error) {
            console.error("ERR occured in add donot api is", error);
        } finally {
            setFAQLoader(false);
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

    //code for snack animation
    function SlideDownTransition(props) {
        return <Slide {...props} direction="down" />;
    }


    return (
        <div>
            <div style={{ fontWeight: "500", fontSize: 20, fontFamily: "inter" }}>
                <span style={{ color: "#00000060" }}>Communication |</span> FAQ
            </div>
            <div className='flex flex-row justify-between items-center mt-8'>
                <div style={{ fontWeight: "500", fontSize: 15, fontFamily: "inter" }}>
                    FAQ
                </div>
                <button className='underline text-purple' style={{ fontWeight: "500", fontSize: 15, fontFamily: "inter" }} onClick={() => { setAddFaqModal(true) }}>
                    Add New
                </button>
            </div>

            {
                FAQData.length > 0 ?
                    <div>
                        {
                            FAQData.map((item, index) => (
                                <div key={item.id} className='flex flex-row items-start p-4 border border-[#00000010] mt-8 justify-between'>
                                    <div>
                                        <div style={{ fontWeight: "600", fontSize: 13, fontFamily: "inter" }}>
                                            {item.question}
                                        </div>
                                        <div className='mt-4' style={{ fontWeight: "500", fontSize: 13, fontFamily: "inter" }}>
                                            {item.answer}
                                        </div>
                                    </div>
                                    <div>
                                        <button className='-mt-2' aria-describedby={FAQPopoverId} variant="contained" color="primary" onClick={(event) => { handeFAQMoreClick(event, item) }}>
                                            <DotsThree size={32} weight="bold" />
                                        </button>
                                        <Popover
                                            id={FAQPopoverId}
                                            open={Boolean(FAQAnchorel)}
                                            anchorEl={FAQAnchorel}
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
                                                    onClick={() => { setUpdateFaqModal(true) }}
                                                >
                                                    Edit
                                                </button>
                                                {
                                                    FAQLoader ?
                                                        <CircularProgress style={{ marginTop: 8 }} size={15} /> :
                                                        <button style={{ fontSize: 13, fontWeight: "500", fontFamily: "inter", marginTop: 8 }}
                                                            onClick={handleDelFaq}
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
                    <div>
                        <div className='flex flex-col items-center w-full gap-3 mt-4'>
                            <Image src="/assets/creatorProfileNavIcons/settingIcon.png" height={75} width={75} alt='seting' />
                            <div style={{ fontWeight: "500", fontSize: 15, fontFamily: "inter" }}>
                                No communication FAQ's found yet
                            </div>
                            <div style={{ fontWeight: "500", fontSize: 13, fontFamily: "inter", color: "#050A0860", textAlign: "center" }}>
                                Please add your communication FAQ's
                            </div>
                            <button className='bg-purple px-4 py-2 text-white' style={{ borderRadius: "50px" }} onClick={() => { setAddFaqModal(true) }}>
                                Add New
                            </button>
                        </div>
                    </div>
            }



            <div>
                <button className='text-purple underline mt-4' style={{ fontWeight: "500", fontSize: 13, fontFamily: "inter" }} onClick={() => { setOpenAdvanceSettingPopup(true) }}>
                    Advanced settings
                </button>
            </div>


            {/* Modal to add FAQ */}
            <Modal
                open={addFaqModal}
                onClose={() => setAddFaqModal(false)}
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
                                    <p>Add Communication FAQ's</p>
                                    <button onClick={() => { setAddFaqModal(false) }}>
                                        <Image src="/assets/crossBtn.png" height={15} width={15} alt='*' />
                                    </button>
                                </div>
                                <div className='mt-4 w-full'>
                                    <div>
                                        <input className='w-full p-2 rounded-lg bg-[#EDEDED80] outline-none border-none'
                                            value={addFaqQuestion}
                                            onChange={(e) => setAddFaqQuestion(e.target.value)}
                                            placeholder='Title'
                                            style={{ fontWeight: "500", fontFamily: "inter", fontSize: 13 }}
                                        />
                                    </div>
                                    <div className='mt-8'>
                                        <textarea className='w-full p-2 rounded-lg bg-[#EDEDED80] outline-none border-none'
                                            value={addFaqAnswer}
                                            onChange={(e) => setAddFaqAnswer(e.target.value)}
                                            placeholder='Description'
                                            rows={4}
                                            style={{ fontWeight: "500", fontFamily: "inter", fontSize: 13, resize: "none" }}
                                        />
                                    </div>
                                    {
                                        FAQLoader ?
                                            <div className='w-full flex flex-row justify-center' style={{ marginTop: 15 }}>
                                                <CircularProgress size={25} />
                                            </div> :
                                            <button className='w-full py-2 text-white bg-purple ' style={{ borderRadius: "50px", marginTop: 15 }}
                                                onClick={handleAddFaq}
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

            {/* Modal to update FAQ */}
            <Modal
                open={updateFaqModal}
                onClose={() => setUpdateFaqModal(false)}
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
                                    <p>Update Communication FAQ's</p>
                                    <button onClick={() => { setUpdateFaqModal(false) }}>
                                        <Image src="/assets/crossBtn.png" height={15} width={15} alt='*' />
                                    </button>
                                </div>
                                <div className='mt-4 w-full'>
                                    <div>
                                        <input className='w-full p-2 rounded-lg bg-[#EDEDED80] outline-none border-none'
                                            value={updateFaqQuestion}
                                            onChange={(e) => setUpdateFaqQuestion(e.target.value)}
                                            placeholder='Title'
                                            style={{ fontWeight: "500", fontFamily: "inter", fontSize: 13 }}
                                        />
                                    </div>
                                    <div className='mt-8'>
                                        <textarea className='w-full p-2 rounded-lg bg-[#EDEDED80] outline-none border-none'
                                            value={updateFaqAnswer}
                                            onChange={(e) => setUpdateFaqAnswer(e.target.value)}
                                            placeholder='Description'
                                            rows={4}
                                            style={{ fontWeight: "500", fontFamily: "inter", fontSize: 13, resize: "none" }}
                                        />
                                    </div>
                                    {
                                        FAQLoader ?
                                            <div className='w-full flex flex-row justify-center' style={{ marginTop: 15 }}>
                                                <CircularProgress size={25} />
                                            </div> :
                                            <button className='w-full py-2 text-white bg-purple ' style={{ borderRadius: "50px", marginTop: 15 }}
                                                onClick={hnadleUpdateFAQ}
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


            {/* Modal for settings */}
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
                                    Advanced settings
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
                    open={resultSnackSuccess}
                    autoHideDuration={3000}
                    onClose={() => {
                        setResultSnackSuccess(null);
                    }}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'center'
                    }}
                    TransitionComponent={SlideDownTransition}
                // TransitionComponent={Fade}
                // TransitionProps={{
                //     direction: 'center'
                // }}
                >
                    <Alert
                        onClose={() => {
                            setResultSnackSuccess(null)
                        }} severity="success"
                        // className='bg-purple rounded-lg text-white'
                        sx={{ width: 'auto', fontWeight: '700', fontFamily: 'inter', fontSize: '22' }}>
                        {resultSnackSuccess}
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
                    TransitionComponent={SlideDownTransition}
                // TransitionComponent={Fade}
                // TransitionProps={{
                //     direction: 'center'
                // }}
                >
                    <Alert
                        onClose={() => {
                            setResultSnackErr(null)
                        }} severity="error"
                        // className='bg-purple rounded-lg text-white'
                        sx={{ width: 'auto', fontWeight: '700', fontFamily: 'inter', fontSize: '22' }}>
                        {resultSnackErr}
                    </Alert>
                </Snackbar>
            </div>





        </div>
    )
}

export default FAQ