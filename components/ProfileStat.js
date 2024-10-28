import React, { useEffect, useRef, useState } from 'react';
import { CircularProgressbar, CircularProgressbarWithChildren } from 'react-circular-progressbar';
import Apis from './apis/Apis';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { Box, CircularProgress, Modal } from '@mui/material';
import Image from 'next/image';
import EnableCallPrice from './Navbar/ccreatorProfileNavComponents/aiPersona/EnableCallPrice';

const ProfileStat = () => {

    const router = useRouter();

    const value = 0.2;

    const [showSocials, setShowSocials] = useState(false);
    const [showKb, setShowKb] = useState(false);
    const [uploadVoice, setUploadVoice] = useState(false);
    const [voiceModal, setVoiceModal] = useState(false);

    //code to select voice
    const [selectedAudio, setSelectedAudio] = useState(null);
    const [audioUrl, setAudioUrl] = useState(null);
    const fileInputRef = useRef(null);
    const [updateLoader, setUpdateLoader] = useState(false);

    const handleAudioChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedAudio(file);
            const url = URL.createObjectURL(file);
            setAudioUrl(url);
            console.log("Selected audio file url is", url);
        }
    };

    const handleUploadClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const updateAi = async () => {
        const localData = localStorage.getItem('User');
        setUpdateLoader(true);
        if (localData) {
            try {
                const Data = JSON.parse(localData);
                const AuthToken = Data.data.token;
                const ApiPath = Apis.UpdateBuilAI;
                // const ApiPath = Apis.MyProfile;
                const formData = new FormData();
                if (selectedAudio) {
                    formData.append("media", selectedAudio);
                    console.log("Audi sending in api", selectedAudio);
                }


                const response = await axios.post(ApiPath, formData, {
                    headers: {
                        "Authorization": "Bearer " + AuthToken,
                        "Content-Type": "application/json"
                    }
                });
                if (response) {
                    console.log("Response of updateai Api is", response.data.data);
                    if (response.data.status === true) {
                        setVoiceModal(false);
                        setAudioUrl(null);
                        setSelectedAudio(null);
                    }
                }
            } catch (error) {
                console.error("Error occured is", error);
            }
            finally {
                setUpdateLoader(false);
            }
        }
    }

    const getAiApi = async () => {
        try {
            console.log("Trying....");
            const ApiPath = Apis.MyAiapi;
            const localData = localStorage.getItem('User');
            const Data = JSON.parse(localData);
            const AuthToken = Data.data.token;
            console.log("Authtoken is", AuthToken);
            console.log("Apipath is", ApiPath);

            const response = await axios.get(ApiPath, {
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": "Bearer " + AuthToken
                }
            });
            // return
            if (response) {
                console.log("Response of getai on parent screen api", response.data.data);
                if (response.data) {
                    localStorage.setItem('aiPersonaDetails', JSON.stringify(response.data.data));
                    if (response.data.data.ai.audio === null) {
                        setUploadVoice(true);
                    }
                    if (response.data.data.kb.length > 0) {
                        console.log("KB exists");
                    } else {
                        setShowKb(true);
                    }
                    const ResponseData = response.data.data.ai;
                    if (ResponseData.discordUrl || ResponseData.fbUrl || ResponseData.instaUrl || ResponseData.twitterUrl || ResponseData.webUrl || ResponseData.youtubeUrl === "") {
                        setShowSocials(true);
                    }
                }
            }
        } catch (error) {
            console.error("ERR occured in get ai api is", error);
        } finally {
            // setLoader(false);
        }
    }

    useEffect(() => {
        getAiApi();
    }, []);

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
    }

    return (
        <div>
            <div className='w-11/12 flex flex-row items-center justify-between mt-4 bg-white px-6 py-4 rounded-2xl'>
                <div className='flex flex-row items-center gap-2'>
                    <div style={{ height: "71px", width: "71px" }}>
                        <CircularProgressbar value={value} maxValue={1} text={`${value * 100}%`}
                            strokeWidth={4}
                            styles={{
                                path: {
                                    stroke: `#552AFF`, // Change the color to red
                                },
                                text: {
                                    fill: '#000000', // Change the text color to red
                                    fontSize: 20,
                                    fontWeight: "500"
                                },
                                trail: {
                                    stroke: '#d6d6d6', // Change the trail color (if needed)
                                },
                            }} />
                    </div>
                    <div className='flex flex-col gap-1'>
                        <div style={{ fontWeight: "500", fontSize: 15, fontFamily: "inter" }}>
                            Complete Profile
                        </div>
                        <div style={{ fontWeight: "500", fontSize: 13, fontFamily: "inter" }}>
                            {
                                showKb && (
                                    <button onClick={() => { router.push('/creator/profile/knowledgebase') }}>
                                        Knowledge Base,
                                    </button>
                                )
                            }
                            {
                                uploadVoice && (
                                    <button onClick={() => { setVoiceModal(true) }}>
                                        Voice,
                                    </button>
                                )
                            }
                            {
                                showSocials && (
                                    <button onClick={() => { router.push('/creator/profile/socials') }}>
                                        Missing Social Links,
                                    </button>
                                )
                            }
                            {
                                showKb || showSocials && (
                                    "etc"
                                )
                            }

                            {/* Modal to add voice */}
                            <Modal
                                open={voiceModal}
                                onClose={() => setVoiceModal(false)}
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
                                                    <p></p>
                                                    <button onClick={() => { setVoiceModal(false) }}>
                                                        <Image src="/assets/crossBtn.png" height={15} width={15} alt='*' />
                                                    </button>
                                                </div>
                                                <div
                                                    className="mt-6"
                                                    style={{
                                                        fontSize: 24,
                                                        fontWeight: "600",
                                                        fontFamily: "inter",
                                                    }}
                                                >
                                                    Voice - Lets's clone your voice
                                                </div>
                                                <div
                                                    className="text-lightWhite mt-2"
                                                    style={{ fontSize: 13, fontWeight: "400" }}
                                                >
                                                    Upload a high quality audio of your voice.<br />
                                                    For best results, upload at least 10 minutes of audio. Max 20MB (mp3, wave, mov)
                                                </div>

                                                <div className="mt-6">
                                                    Upload mp3, wave mov.
                                                </div>
                                                <div className="flex flex-col items-center mt-6">
                                                    <input
                                                        type="file"
                                                        // accept="audio/*"
                                                        accept="audio/*,.mov,.mp3,.wav, .mp4/*"
                                                        ref={fileInputRef}
                                                        onChange={handleAudioChange}
                                                        className="hidden"
                                                    />
                                                    {audioUrl && (
                                                        <div className="flex flex-row items-center gap-4">
                                                            <audio controls className="mb-">
                                                                <source src={audioUrl} type="audio/mpeg" />
                                                                Your browser does not support the audio element.
                                                            </audio>
                                                            <div>
                                                                <button onClick={() => {
                                                                    setAudioUrl(null);
                                                                    setSelectedAudio(null);
                                                                    if (fileInputRef.current) {
                                                                        fileInputRef.current.value = '';
                                                                    }
                                                                }}>
                                                                    <Image src="/assets/croseBtn.png" alt="cross" height={30} width={30} />
                                                                </button>
                                                            </div>
                                                        </div>
                                                    )}
                                                    {
                                                        audioUrl ?
                                                            <div className='w-full'>
                                                                {
                                                                    updateLoader ?
                                                                        <div className='w-full flex flex-row justify-center mt-8'>
                                                                            <CircularProgress size={25} />
                                                                        </div> :
                                                                        <button className='bg-purple w-full text-white mt-8'
                                                                            onClick={updateAi}
                                                                            style={{
                                                                                fontWeight: "500",
                                                                                fontFamily: "inter",
                                                                                fontSize: 15,
                                                                                borderRadius: "50px",
                                                                                height: "50px"
                                                                            }}
                                                                        >
                                                                            Save Audio
                                                                        </button>
                                                                }
                                                            </div>
                                                            :
                                                            <button className='bg-purple w-full text-white mt-8'
                                                                onClick={handleUploadClick}
                                                                style={{
                                                                    fontWeight: "500",
                                                                    fontFamily: "inter",
                                                                    fontSize: 15,
                                                                    borderRadius: "50px",
                                                                    height: "50px"
                                                                }}
                                                            >
                                                                Upload Audio
                                                            </button>
                                                    }
                                                </div>
                                                {/* <EnableCallPrice /> */}
                                            </div>
                                        </div>
                                    </div>
                                </Box>
                            </Modal>

                        </div>
                    </div>
                </div>
                <div>
                    <button className='text-white bg-purple px-4 py-2' style={{ fontWeight: "500", fontSize: 13, fontFamily: "inter", borderRadius: "50px" }}>
                        Complete
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ProfileStat;
