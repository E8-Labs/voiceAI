'use client'
import { Button, CircularProgress, IconButton, InputAdornment, TextField, Visibility, VisibilityOff } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useRef, useState } from "react";
import PhoneNumberInput from '../PhoneNumberInput';
import Apis from '../apis/Apis';
import axios from 'axios';
import AiSocialLinks from './AiSocialLinks';
import { useRouter } from 'next/navigation';
import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg';
import Knowledgebase from '../buildai/Knowledgebase';

const boxVariants = {
    enter: (direction) => ({
        x: direction > 0 ? '100%' : '-100%',
        opacity: 0.4,
    }),
    center: {
        x: 0,
        opacity: 1,
    },
    exit: (direction) => ({
        x: direction < 0 ? '100%' : '-100%',
        opacity: 0.4,
    }),
};

export default function ScriptAnimation({ onChangeIndex }) {

    const router = useRouter()
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState(0);

    //code for getting value of input fields
    const [aiName, setAiName] = useState("");
    const [talkAbout, setTalkAbout] = useState("");
    const [helpTagline, setHelpTagline] = useState("");
    const [buildAiLoader, setBuildAiLoader] = useState(false);
    const [selectedAudio, setSelectedAudio] = useState(null);
    const [audioUrl, setAudioUrl] = useState(null);
    const [compressedAudioUrl, setCompressedAudioUrl] = useState(null);
    //state to get sociallinks data
    const [socialLinks, setSocialLinks] = useState(null);
    const fileInputRef = useRef(null);

    // const handleSocialLinks = () => {}

    const handleAudioChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedAudio(file);
            const url = URL.createObjectURL(file);
            setAudioUrl(url);
        }
    };

    const handleUploadClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const compressAudio = async (file) => {
        if (!ffmpeg.isLoaded()) {
            await ffmpeg.load();
        }
        ffmpeg.FS('writeFile', 'input.mp3', await fetchFile(file));

        // Convert to a lower bitrate mp3 file
        await ffmpeg.run('-i', 'input.mp3', '-b:a', '96k', 'output.mp3');

        const data = ffmpeg.FS('readFile', 'output.mp3');
        const compressedBlob = new Blob([data.buffer], { type: 'audio/mp3' });
        const compressedUrl = URL.createObjectURL(compressedBlob);
        setCompressedAudioUrl(compressedUrl);
    };

    //calling api of ld your ai

    const handleBuildAI = async () => {
        try {
            setBuildAiLoader(true);
            const ApiPath = Apis.BuildAI;
            const LocalData = localStorage.getItem('User');
            const Data = JSON.parse(LocalData);
            const AuthToken = Data.data.token;
            console.log("Authtoken is", AuthToken);
            const formData = new FormData();
            formData.append('name', aiName);
            formData.append('action', helpTagline);
            formData.append('tagline', talkAbout);
            if (selectedAudio) {
                formData.append('media', selectedAudio);
                console.log("Audi sending in api", selectedAudio);
            }
            console.log("Data sending in api is", formData);
            const response = await axios.post(ApiPath, formData, {
                headers: {
                    'Authorization': 'Bearer ' + AuthToken
                }
            });

            if (response) {
                console.log("Response of create builai api is", response.data);
                if (response.data.status === true) {
                    router.push('/creator/buildscript2');
                    console.log("response of build ai apis is", response.data.data);
                } else {
                    console.log("status of api", response.data.status);
                }
            }

        } catch (error) {
            console.error("ERror occured in build ai api", error);
        } finally {
            setBuildAiLoader(false);
        }
    }


    //move to script2 flow
    const handleContinueToScript2 = () => {
        router.push('/creator/buildscript2')
    }

    const handleContinue = () => {
        // handleCurrentIndex();
        setDirection(1);
        setCurrentIndex((prevIndex) => prevIndex + 1);
    };

    const handleTempContinue = () => {
        // handleCurrentIndex();
        setDirection(2);
        setCurrentIndex((prevIndex) => prevIndex + 2);
    };

    const handleBack = () => {
        setDirection(-1);
        setCurrentIndex((prevIndex) => prevIndex - 1);
    };

    useEffect(() => {
        onChangeIndex(currentIndex)
    }, [currentIndex]);

    const containerStyles = {
        position: 'relative',
        // height: '40vh',
        width: '100%',
        overflow: 'hidden',
    };

    const styles = {
        // position: 'absolute', // Ensures the boxes are stacked on top of each other
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        // backgroundColor: "red",
        height: "20vh",
        // marginLeft: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginInline: 10
    };


    //styles for mui fields
    const MuiFieldStyle = {
        '& label.Mui-focused': {
            color: 'black',
        },
        '& .MuiFilledInput-root': {
            fontSize: 13,
            fontWeight: '400',
            backgroundColor: '#EDEDEDC7', // Optional: Removes the background color
            '&:before': {
                borderBottom: 'none', // Remove the default inactive state bottom border
            },
            '&:after': {
                borderBottom: 'none', // Remove the focused state bottom border
            },
            '&:hover:before': {
                borderBottom: 'none', // Remove the hover state bottom border
            },
        },
        '& .MuiOutlinedInput-root': {
            borderRadius: 2,
            height: "48px",
            backgroundColor: "#EDEDEDC7",
            color: "black",
            '& fieldset': {
                borderColor: 'transparent',
            },
            '&:hover fieldset': {
                borderColor: 'transparent',
            },
            '&.Mui-focused fieldset': {
                borderColor: '#00000000',
                color: "#000000",
            },
            '& .MuiOutlinedInput-input': {
                color: 'black !important',
            },
            '&.Mui-focused .MuiOutlinedInput-input': {
                color: 'black !important',
            },
        },
    };


    return (
        <div style={containerStyles}>
            <AnimatePresence initial={false} custom={direction}>
                {currentIndex === 0 && (
                    <div className='flex flex-col h-screen w-full justify-center' style={{ height: "" }}>
                        <motion.div
                            key="box1"
                            custom={direction}
                            variants={boxVariants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{ duration: 1 }}
                            style={styles}
                        >

                            <div className='w-full flex justify-center'>
                                <div className='w-10/12'>
                                    <div>
                                        {/* <button onClick={handleBack}>
                                            <Image src={'/assets/backarrow.png'} alt='back' height={14} width={16} />
                                        </button> */}
                                    </div>
                                    <div className='mt-6' style={{ fontSize: 24, fontWeight: "600", fontFamily: "inter" }}>
                                        Name you AI
                                    </div>
                                    <div className='text-lightWhite mt-2' style={{ fontSize: 13, fontWeight: "400" }}>
                                        {/* Name you ai */}
                                    </div>
                                    <TextField className=' w-9/12 mt-8'
                                        autofill='off'
                                        id="filled-basic"
                                        label="Name" variant="filled"
                                        value={aiName}
                                        onChange={(e) => setAiName(e.target.value)}
                                        placeholder='For ex: Hormozi, Tate.ai'
                                        sx={MuiFieldStyle}
                                    />

                                    <div className='w-10/12'>
                                        <Button onClick={handleContinue}
                                            className='bg-purple hover:bg-purple text-white w-full mt-12'
                                            style={{ fontSize: 15, fontWeight: "400", height: "52px", borderRadius: "50px" }}>
                                            Continue
                                        </Button>
                                    </div>

                                </div>
                            </div>


                        </motion.div>
                    </div>
                )}
                {currentIndex === 1 && (
                    <div className='flex flex-col h-screen justify-center' style={{ height: "", }}>
                        <motion.div
                            key="box2"
                            custom={direction}
                            variants={boxVariants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{ duration: 1 }}
                            style={styles}
                        >
                            <div className='w-full flex justify-center'>
                                <div className='w-10/12'>
                                    <div>
                                        <button onClick={handleBack}>
                                            <Image src={'/assets/backarrow.png'} alt='back' height={14} width={16} />
                                        </button>
                                    </div>
                                    <div className='mt-6' style={{ fontSize: 24, fontWeight: "600", fontFamily: "inter" }}>
                                        Describe what {aiName} does as a creator or influencer?
                                    </div>

                                    <TextField
                                        className='w-9/12 mt-8'
                                        autofill='off'
                                        id="filled-basic"
                                        label="Description"
                                        variant="filled"
                                        multiline
                                        rows={3}
                                        value={talkAbout}
                                        onChange={(e) => setTalkAbout(e.target.value)}
                                        placeholder=' talk about dating, business, fitness ...'
                                        sx={MuiFieldStyle}
                                    />

                                    <div className='w-10/12'>
                                        <Button onClick={handleContinue}
                                            className='bg-purple hover:bg-purple text-white w-full mt-12'
                                            style={{ fontSize: 15, fontWeight: "400", height: "52px", borderRadius: "50px" }}>
                                            Continue
                                        </Button>
                                    </div>


                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
                {currentIndex === 2 && (
                    <div className='flex flex-col h-screen justify-center' style={{ height: "", }}>
                        <motion.div
                            key="box3"
                            custom={direction}
                            variants={boxVariants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{ duration: 1 }}
                            style={styles}>
                            <div className='w-full flex justify-center'>
                                <div className='w-10/12'>
                                    <div>
                                        <button onClick={handleBack}>
                                            <Image src={'/assets/backarrow.png'} alt='back' height={14} width={16} />
                                        </button>
                                    </div>
                                    <div className='mt-6' style={{ fontSize: 24, fontWeight: "600", fontFamily: "inter" }}>
                                        What does {aiName} help your community with?
                                    </div>
                                    <TextField className=' w-9/12 mt-8'
                                        autofill='off'
                                        id="filled-basic"
                                        label="Ai help tagline" variant="filled"
                                        multiline
                                        rows={3}
                                        value={helpTagline}
                                        onChange={(e) => setHelpTagline(e.target.value)}
                                        placeholder='I help my community of followers with understanding their feelings for others, overcoming obstacles with their relationships, etc'
                                        sx={{
                                            '& label.Mui-focused': {
                                                color: '#050A0890',
                                            },
                                            '& .MuiFilledInput-root': {
                                                backgroundColor: '#EDEDED', // Optional: Removes the background color
                                                // padding: '6px 8px', // Decrease the padding inside the input container
                                                fontSize: 13,
                                                fontWeight: '400',
                                                fontFamily: "inter"
                                            },
                                            '& .MuiFilledInput-root:before': {
                                                borderBottom: 'none', // Remove the default inactive state bottom border
                                            },
                                            '& .MuiFilledInput-root:after': {
                                                borderBottom: 'none', // Remove the focused state bottom border
                                            },
                                            '& .MuiFilledInput-root:hover:before': {
                                                borderBottom: 'none', // Remove the hover state bottom border
                                            },
                                            '& .MuiFilledInput-root.Mui-focused:before': {
                                                borderBottom: 'none', // Ensure no border is shown when the field is focused
                                            }
                                        }}
                                    />

                                    <div className='w-10/12'>
                                        <Button onClick={handleContinue}
                                            className='bg-purple hover:bg-purple text-white w-full mt-12'
                                            style={{ fontSize: 15, fontWeight: "400", height: "52px", borderRadius: "50px" }}>
                                            Continue
                                        </Button>
                                    </div>

                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
                {currentIndex === 3 && (
                    <div className='flex flex-col h-screen justify-center' style={{ height: "", }}>
                        <motion.div
                            key="box4"
                            custom={direction}
                            variants={boxVariants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{ duration: 1 }}
                            style={styles}>
                            <div className='w-full flex justify-center'>
                                <div className='w-10/12'>
                                    <div>
                                        <button onClick={handleBack}>
                                            <Image src={'/assets/backarrow.png'} alt='back' height={14} width={16} />
                                        </button>
                                    </div>
                                    <div className='mt-6' style={{ fontSize: 24, fontWeight: "600", fontFamily: "inter" }}>
                                        Socials
                                    </div>

                                    <div>
                                        <AiSocialLinks handleContinue={handleContinue} />
                                    </div>

                                    {/* <div className='w-10/12'>
                                        <Button onClick={handleTempContinue}
                                            className='bg-purple hover:bg-purple text-white w-full mt-12'
                                            style={{ fontSize: 15, fontWeight: "400", height: "52px", borderRadius: "50px" }}>
                                            Continue
                                        </Button>
                                    </div> */}

                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
                {currentIndex === 4 && (
                    <div className='flex flex-col h-screen justify-center' style={{ height: "", }}>
                        <motion.div
                            key="box5"
                            custom={direction}
                            variants={boxVariants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{ duration: 1 }}
                            style={styles}>
                            <div className='w-full flex justify-center'>
                                <div className='w-10/12'>
                                    <div>
                                        <button onClick={handleBack}>
                                            <Image src={'/assets/backarrow.png'} alt='back' height={14} width={16} />
                                        </button>
                                    </div>
                                    <div className='mt-6' style={{ fontSize: 24, fontWeight: "600", fontFamily: "inter" }}>
                                        Knowledge base
                                    </div>
                                    <div className='text-lightWhite mt-2'
                                        style={{ fontSize: 13, fontWeight: "400", fontFamily: "inter" }}>
                                        Upload documents, paste plain text or a web url
                                    </div>

                                    <div className='mt-8'>
                                        <Knowledgebase handleContinue={handleContinue} />
                                    </div>

                                    {/* <div className='w-10/12'>
                                        <Button onClick={handleContinue}
                                            className='bg-purple hover:bg-purple text-white w-full mt-12'
                                            style={{ fontSize: 15, fontWeight: "400", height: "52px", borderRadius: "50px" }}>
                                            Continue
                                        </Button>
                                    </div> */}

                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
                {
                    currentIndex === 5 && (
                        <div className='flex h-screen flex-col justify-center' style={{ height: "", }}>
                            <motion.div
                                key="box6"
                                custom={direction}
                                variants={boxVariants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                transition={{ duration: 1 }}
                                style={styles}>
                                <div className='w-full flex justify-center'>
                                    <div className='w-10/12 flex flex-row items-center gap-4'>

                                        <div style={{ height: "100%", width: "2px" }} />

                                        <div>
                                            <div>
                                                <button onClick={handleBack}>
                                                    <Image src={'/assets/backarrow.png'} alt='back' height={14} width={16} />
                                                </button>
                                            </div>
                                            <div className='mt-6' style={{ fontSize: 24, fontWeight: "600", fontFamily: "inter" }}>
                                                Voice - Lets's clone your voice
                                            </div>
                                            <div className='text-lightWhite mt-2' style={{ fontSize: 13, fontWeight: "400" }}>
                                                Upload a high quality audio of your voice. <br />
                                                For best results, upload at least 10 minutes of audio.
                                            </div>

                                            {/* <div className="flex flex-col items-center">
                                                <input
                                                    type="file"
                                                    accept="audio/*"
                                                    onChange={handleAudioChange}
                                                    className="mb-4"
                                                />
                                                {selectedAudio && (
                                                    <audio controls>
                                                        <source src={selectedAudio} type="audio/mpeg" />
                                                        Your browser does not support the audio element.
                                                    </audio>
                                                )}
                                            </div> */}

                                            <div className="flex flex-col items-center">
                                                <input
                                                    type="file"
                                                    accept="audio/*"
                                                    ref={fileInputRef}
                                                    onChange={handleAudioChange}
                                                    className="hidden"
                                                />
                                                {audioUrl && (
                                                    <audio controls className="mb-4">
                                                        <source src={audioUrl} type="audio/mpeg" />
                                                        Your browser does not support the audio element.
                                                    </audio>
                                                )}
                                                {/* <button
                                                    onClick={handleUploadClick}
                                                    className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
                                                >
                                                    Select Audio
                                                </button> */}
                                            </div>

                                            <div className='flex flex-row items-center gap-6 mt-12'>
                                                <div className='w-7/12'>
                                                    <Button onClick={handleUploadClick}
                                                        className='bg-purple hover:bg-purple text-white w-full'
                                                        style={{ fontSize: 15, fontWeight: "400", borderRadius: "50px" }}>
                                                        Upload
                                                    </Button>
                                                </div>
                                                <button onClick={handleContinueToScript2}>
                                                    <u>
                                                        Skip
                                                    </u>
                                                </button>
                                            </div>
                                            <div className='w-full flex flex-row justify-end'>

                                                <div className='w-6/12'>
                                                    <Button onClick={handleBuildAI}
                                                        className='bg-purple hover:bg-purple text-white w-full mt-12'
                                                        style={{ fontSize: 15, fontWeight: "400", borderRadius: "50px" }}>
                                                        {
                                                            buildAiLoader ?
                                                                <div className='w-full flex justify-center'>
                                                                    <CircularProgress size={30} />
                                                                </div> :
                                                                "Continue"
                                                        }
                                                    </Button>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    )
                }
                {currentIndex === 6 && (
                    <div className='flex flex-col justify-center h-screen' style={{ height: "", }}>
                        <motion.div
                            key="box7"
                            custom={direction}
                            variants={boxVariants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{ duration: 1 }}
                            style={styles}>
                            <div style={{ height: "auto" }}>
                                <div style={{ height: 14 }}>
                                    <button onClick={handleBack}>
                                        <Image src={'/assets/backarrow.png'} alt='back' height={14} width={16} />
                                    </button>
                                </div>
                                {/* <Image src={'/assets/congratulations.png'} alt='congrats' height={445} width={445} /> */}
                                <div style={{ fontSize: 24, fontWeight: "600", textAlign: ' center' }}>
                                    Congratulations
                                </div>
                                <Image
                                    src={'/assets/applogo.png'}
                                    alt='congrats'
                                    height={550}
                                    width={445}
                                    layout="responsive"
                                    objectFit="contain"
                                // style={{
                                //     aspectRatio: '3 / 2',
                                //     maxWidth: '100%',
                                //     height: 'auto'
                                // }}
                                />
                                <div className='flex flex-row mt-6 justify-center w-full gap-1'>
                                    <button style={{ fontSize: 11, fontWeight: "400" }}>
                                        Privacy policy -
                                    </button>
                                    <button style={{ fontSize: 11, fontWeight: "400" }}>
                                        Terms & Condition -
                                    </button>
                                    <button style={{ fontSize: 11, fontWeight: "400" }}>
                                        Cookie Policy
                                    </button>
                                </div>

                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}