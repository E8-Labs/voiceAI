"use client"
import Apis from '@/components/apis/Apis';
import Knowledgebase from '@/components/buildai/Knowledgebase';
import { Box, Modal } from '@mui/material';
import axios from 'axios';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { CircularProgressbar, CircularProgressbarWithChildren } from 'react-circular-progressbar';

const Page = () => {
    const value = 0.5;

    const [aiData, setAiData] = useState(null);
    const [showKbPopup, setKbPopup] = useState(false);
    const [documentData, setDocumentData] = useState([]);
    const [webData, setWebData] = useState([]);
    const [textData, setTextData] = useState([]);
    const [urlDelLoader, setUrlDelLoader] = useState(false);



    // console.log("Text data is", textData);
    const getAiApi = async () => {
        try {
            console.log("Trying....")
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
            if (response) {
                console.log("Response of getai on parent screen api", response.data.data);
                if (response.data) {
                    setAiData(response.data.data);
                    const responseData = response.data.data.kb;
                    responseData.forEach(item => {
                        if (item.type === "Text") {
                            // Append to the existing textData array
                            setTextData(prevData => [...prevData, item]);
                        } else if (item.type === "Document") {
                            // Append to the existing documentData array
                            setDocumentData(prevData => [...prevData, item]);
                        } else if (item.type === "Web URL") {
                            // Append to the existing webData array
                            setWebData(prevData => [...prevData, item]);
                        }
                    });
                }
            }
        } catch (error) {
            console.error("ERR occured in get ai api is", error);
        } finally {
            // setLoadTraitsLoader(false);
        }
    }

    //code to delete KB
    

    useEffect(() => {
        getAiApi();
    }, []);

    const handleCloseModal = (status) => {
        setKbPopup(status)
    }

    const getknowledgeData = (data) => {
        getAiApi();
    }

    const styles = {
        heading: {
            fontWeight: "500",
            fontFamily: "inter",
            fontSize: 15,
            marginTop: 30
        },
        kbData: {
            fontWeight: "500",
            fontSize: 15,
            fontFamily: "inter"
        },
        kbPopupStyle: {
            height: 'auto',
            // bgcolor: 'white',
            p: 2,
            mx: 'auto',
            my: '50vh',
            transform: 'translateY(-50%)',
            borderRadius: 2,
            border: "none",
            outline: "none",
            // border: "2px solid green"
        }
    };


    return (
        <div className='w-full h-screen' style={{ overflow: 'auto', backgroundColor: "#ffffff40" }}>
            <div className='w-11/12 pt-12 pl-10 pb-8'>
                <div className='w-fll flex flex-row items-center justify-between'>
                    <p style={{ fontSize: 28, fontWeight: "500", fontFamily: "inter" }}>
                        Knowledge base
                    </p>
                    {/* <Image
                src="/assets/placeholderImg.jpg"
                alt='profile'
                height={70}
                width={70}
                style={{
                    width: '70px',
                    height: '70px',
                    backgroundColor: "",
                    borderRadius: "50%",
                    border: "3px solid white",
                    objectFit: 'cover',
                    objectPosition: 'center',
                    // backgroundColor: 'red'
                }}
            /> */}
                </div>
                <div className='w-full flex flex-row items-center justify-between mt-4 bg-white px-6 py-4 rounded-2xl'>
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
                                Voice, Kb, SocialLinks etc
                            </div>
                        </div>
                    </div>
                    <div>
                        <button className='text-white bg-purple px-4 py-2' style={{ fontWeight: "500", fontSize: 13, fontFamily: "inter", borderRadius: "50px" }}>
                            Complete
                        </button>
                    </div>
                </div>

                <div className='bg-white mt-3 w-full bg-white rounded-2xl flex flex-col items-center'>
                    <div className='w-11/12'>
                        {/* Code for showing documents */}
                        <div className='flex flex-row items-center justify-between'>
                            <div style={styles.heading}>
                                Documents
                            </div>
                            <button className='text-purple underline' onClick={() => { setKbPopup(true) }}>
                                Add Knowledge base
                            </button>
                        </div>

                        {
                            documentData && documentData.length > 0 ?
                                <div className='max-h-[18vh] overflow-auto'>
                                    {
                                        documentData.map((item) => (
                                            <div key={item.id} className='border-2 bg-white rounded-lg p-4 mt-4'>
                                                <div className='text-purple' style={styles.kbData}>
                                                    {item.documentUrl}
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div> : "No Document"
                        }

                        {/* code for showing web links */}
                        <div style={styles.heading}>
                            Websites
                        </div>

                        {
                            webData && webData.length > 0 ?
                                <div className='max-h-[18vh] overflow-auto'>
                                    {
                                        webData.map((item) => (
                                            <div key={item.id} className='border-2 bg-white rounded-lg p-4 mt-4 flex flex-row items-center justify-between'>
                                                <div className='text-black' style={styles.kbData}>
                                                    {item.content}
                                                </div>
                                                <button className='text-red'>
                                                    Delete
                                                </button>
                                            </div>
                                        ))
                                    }
                                </div> : "No WebUrl"
                        }

                        {/* code for showing Text */}
                        <div style={styles.heading}>
                            Text
                        </div>

                        {
                            textData.length > 0 ?
                                <div className='max-h-[18vh] overflow-auto pb-8'>
                                    {
                                        textData.map((item) => (
                                            <div key={item.id} className='border-2 bg-white rounded-lg p-4 mt-4'>
                                                <div className='text-black' style={styles.kbData}>
                                                    {item.content}
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div> : "No Text Added"
                        }


                    </div>
                </div>

                {/* code for adding social and kkb */}
                <div>
                    <Modal
                        open={showKbPopup}
                        onClose={(() => setKbPopup(false))}
                        closeAfterTransition
                        BackdropProps={{
                            timeout: 1000,
                            sx: {
                                backgroundColor: 'transparent',
                                backdropFilter: 'blur(30px)',
                            },
                        }} //style={{ backgroundColor: "red" }}
                    >
                        <Box className="lg:w-4/12 md:w-5/12 sm:w-7/12"
                            sx={styles.kbPopupStyle}
                        >
                            <div className='flex flex-row justify-center'>
                                <Knowledgebase closeModal={handleCloseModal} getknowledgeData={getknowledgeData} />
                            </div>
                        </Box>
                    </Modal>
                </div>


            </div>
        </div>
    )
}

export default Page