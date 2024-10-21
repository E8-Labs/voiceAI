"use client"
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Apis from '@/components/apis/Apis';
import axios from 'axios';
import { Box, CircularProgress, Modal } from '@mui/material';
import moment from 'moment';
import InfiniteScroll from 'react-infinite-scroll-component';

const Page = () => {

    const [callLogDetails, setCallLogDetails] = useState([]);
    const [callLogloader, setCallLogloader] = useState(false);
    const [transcriptSummaryText, setTranscriptSummaryText] = useState('');
    const [transcriptText, setTranscriptText] = useState('');

    const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);

    // const getCallLogs = async () => {
    //     const localData = localStorage.getItem('User');
    //     if (localData) {
    //         try {
    //             setCallLogloader(true);
    //             const Data = JSON.parse(localData);
    //             // console.log("Data recieved is", Data);
    //             // const ApiPath = "http://localhost:8005/api/user/call_logs";
    //             const AuthToken = Data.data.token;
    //             console.log("Auth token", AuthToken);
    //             const ApiPath = Apis.CallerCallLogs;
    //             const response = await axios.get(ApiPath, {
    //                 headers: {
    //                     "Content-Type": "application/json",
    //                     "Authorization": "Bearer " + AuthToken
    //                 }
    //             });

    //             if (response) {
    //                 console.log("Response of CallLogs api", response);
    //                 if (response.data.status === true) {
    //                     setCallLogDetails(response.data.data);
    //                 } else {
    //                     console.log("Status of calllog api", response.data.status);
    //                 }

    //             }
    //         } catch (error) {
    //             console.error("Error occured in call log api", error);
    //         } finally {
    //             setCallLogloader(false);
    //         }
    //     }
    // }

    console.log("Status of has more is", hasMore);
    console.log("Status of loading is", loading);


    const getCallLogs = async (currentPage) => {
        const localData = localStorage.getItem('User');
        if (localData) {
            try {
                setLoading(true);
                // setCallLogloader(true);
                const Data = JSON.parse(localData);
                const AuthToken = Data.data.token;
                const ApiPath = Apis.CallerCallLogs;

                // Modify the API call with pagination
                let api = `${ApiPath}?offset=${callLogDetails.length}`
                console.log("Loading on ", api)
                const response = await axios.get(api, {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + AuthToken
                    }
                });

                if (response.data.status === true) {
                    console.log("Response of call logs api is", response.data);
                    const newCallLogs = response.data.data;
                    setCallLogDetails((prev) => [...prev, ...newCallLogs]);

                    // If less than 10 logs are fetched, stop further loading
                    if (newCallLogs.length < 10) {
                        setHasMore(false);
                    }
                } else {
                    setHasMore(false);
                }
            } catch (error) {
                console.error("Error occurred in call log API", error);
            } finally {
                setLoading(false);
                setCallLogloader(false);
            }
        }
    };

    // Fetch the initial call logs
    useEffect(() => {
        getCallLogs(1);
        setCallLogloader(true);
    }, []);

    // Function to fetch more data when scrolling down
    const fetchMoreData = () => {
        if (!loading) {
            setPage(prevPage => {
                const nextPage = prevPage + 1;
                getCallLogs(nextPage); // Fetch the next set of logs
                return nextPage;
            });
        }
    };

    const styles = {
        text: {
            fontSize: 14,
            color: '#00000090',
            fontWeight: '400'
        },
        text2: {
            textAlignLast: 'left',
            fontSize: 14,
            color: '#000000',
            fontWeight: 300,
            whiteSpace: 'nowrap',  // Prevent text from wrapping
            overflow: 'hidden',    // Hide overflow text
            textOverflow: 'ellipsis'  // Add ellipsis for overflow text
        }
    }


    const styleDetails = {
        maxHeight: '60vh',
        overflow: 'auto',
        scrollbarWidth: 'none',
        bgcolor: 'transparent',
        // p: 2,
        mx: 'auto',
        // my: '50vh',
        borderRadius: 20,
        border: "none",
        outline: "none",
        // border: "2px solid green",
        backgroundColor: '#ffffff50',
        padding: 25
    };

    const formatToHtml = async (text) => {
        const apiResponse = text;

        // Replace markdown-style bold and convert line breaks to <br> tags
        const formattedContent = apiResponse
            .replace(/### (.*?)\n/g, '<strong>$1</strong><br/>') // Heading 3
            .replace(/## (.*?)\n/g, '<h2>$1</h2>')  // Heading 2
            .replace(/# (.*?)\n/g, '<h1>$1</h1>')   // Heading 1
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') // Bold text
            .replace(/\n/g, '<br>'); // Line breaks

        return setTranscriptSummaryText(formattedContent)
    };

    // const [transcriptData, setTranscriptData] = useState('');
    const fetchTranscript = async (Text) => {
        const apiResponse = Text;

        // Handle bot and human responses, bold text, and new lines
        const formattedContent = apiResponse
            .replace(/bot: (.*?)(\n|$)/g, '<div class="flex justify-start mb-2"><div class="bg-blue-100 p-4 rounded-lg max-w-lg"><strong>Bot:</strong> $1</div></div>')   // Format bot messages (left)
            .replace(/human: (.*?)(\n|$)/g, '<div class="flex justify-end mb-2"><div class="bg-green-100 p-4 rounded-lg max-w-lg text-right"><strong>Human:</strong> $1</div></div>') // Format human messages (right)
            .replace(/\n/g, '<br>'); // Convert new lines to <br> tags

        setTranscriptText(formattedContent);
    }

    return (
        <div className='h-screen w-full' style={{ backgroundColor: "#ffffff40", overflow: 'hidden', scrollbarWidth: 0, }}>
            <div className='w-full pe-4 lg:w-9/12 flex flex-col gap-2 pt-10 ps-2 lg:ps-10' style={{ maxHeight: '90vh', overflow: "hidden", scrollbarWidth: "none" }}>
                <div className='ms-5' style={{ fontSize: 20, fontWeight: 400, fontFamily: 'inter' }}>
                    Call Logs
                </div>

                <div className='w-full p-5 rounded-xl border-2'
                    style={{ backgroundColor: "#FFFFFF40", maxHeight: '90vh', overflow: '' }}
                >
                    <div className='w-full flex flex-row justify-between lg:flex hidden'
                        style={{
                            backgroundColor: '#ffffff40', paddingTop: 5, paddingBottom: 5
                        }}>
                        <div className='w-3/12'>
                            <div style={styles.text}>Spoke to</div>
                        </div>
                        <div className='w-2/12 lg:w-2/12 '>
                            <div style={styles.text}>Status</div>
                        </div>
                        <div className='w-2/12 lg:w-1/12 '>
                            <div style={styles.text}>Amount</div>
                        </div>
                        <div className='w-3/12 lg:w-2/12'>
                            <div style={{ ...styles.text, paddingLeft: 13 }}>Duration</div>
                        </div>
                        <div className='w-3/12 lg:w-2/12'>
                            <div style={styles.text}>Date</div>
                        </div>
                        <div className='w-3/12 lg:w-2/12'>
                            <div style={styles.text}>Summary</div>
                        </div>
                    </div>
                    {
                        callLogloader ?
                            <div className='w-full flex justify-center mt-12'>
                                <CircularProgress size={30} />
                            </div> :
                            <div>
                                {
                                    callLogDetails === null || callLogDetails.length === 0 ?
                                        <div style={{ textAlign: 'center', marginTop: 20, fontWeight: '500', fontSize: 15, fontFamily: 'inter' }}>
                                            No Call Log
                                        </div> :
                                        <div style={{ height: "100%" }}>
                                            <div className='' id="scrollableDiv1" style={{ maxHeight: '70vh', overflow: "auto" }}>
                                                <InfiniteScroll className='lg:flex hidden flex-col w-full'
                                                    endMessage={
                                                        <p style={{ textAlign: 'center', paddingTop: '10px', fontWeight: "400", fontFamily: "inter", fontSize: 16, color: "#00000060" }}>
                                                            {`You're all caught up`}
                                                        </p>
                                                    }
                                                    scrollableTarget="scrollableDiv1"
                                                    dataLength={callLogDetails.length}
                                                    next={() => {
                                                        console.log("Loading more...")
                                                        getCallLogs()
                                                    }}
                                                    hasMore={hasMore}
                                                    loader={
                                                        <div className='w-full flex flex-row justify-center mt-8'>
                                                            <CircularProgress size={35} />
                                                        </div>
                                                    } // Show spinner while loading

                                                    style={{ overflow: "unset" }}
                                                >
                                                    <div className='lg:flex hidden flex flex-col'>
                                                        {callLogDetails.map((item, index) => (
                                                            <div key={item.id}>
                                                                <div className='w-full' //</>style={{}} onClick={() => { setOpen(item) }}
                                                                >
                                                                    <div className='w-full flex flex-row justify-between mt-10 items-center' key={item.id}>
                                                                        <div className='w-3/12 flex flex-row gap-2 items-center' style={{}}>
                                                                            {item.model.profile_image ?
                                                                                <Image src={item.model.profile_image} alt='profile'
                                                                                    style={{
                                                                                        width: '35px',
                                                                                        height: '35px',
                                                                                        backgroundColor: "",
                                                                                        borderRadius: "50%",
                                                                                        border: "3px solid white",
                                                                                        objectFit: 'cover',
                                                                                        objectPosition: 'center',
                                                                                        // backgroundColor: 'red'
                                                                                    }}
                                                                                    height={25} width={25}
                                                                                />
                                                                                :
                                                                                <div>
                                                                                    {
                                                                                        item.model.name == "Tristan" ?
                                                                                            <img src="/tristan.png" alt='profile'
                                                                                                // height={30} width={30} 
                                                                                                style={{ borderRadius: "50%", objectFit: 'cover', height: "40px", width: '40px' }}
                                                                                            /> :
                                                                                            <img src="/andrew.webp" alt='profile'
                                                                                                // height={30} width={40} 
                                                                                                style={{ borderRadius: "50%", objectFit: 'contain', height: "40px", width: '40px' }}
                                                                                            />
                                                                                    }
                                                                                </div>
                                                                            }

                                                                            {/* <div>
                                                                                {
                                                                                    item.model.name == "Tristan" ?
                                                                                        <img src="/tristan.png" alt='profile'
                                                                                            // height={30} width={30} 
                                                                                            style={{ borderRadius: "50%", objectFit: 'cover', height: "40px", width: '40px' }}
                                                                                        /> :
                                                                                        <img src="/andrew.webp" alt='profile'
                                                                                            // height={30} width={40} 
                                                                                            style={{ borderRadius: "50%", objectFit: 'contain', height: "40px", width: '40px' }}
                                                                                        />
                                                                                }
                                                                            </div> */}

                                                                            <div style={styles.text2}>
                                                                                {item.model.name}
                                                                            </div>
                                                                        </div>
                                                                        <div className='w-2/12 lg:w-2/12'>
                                                                            <div style={{
                                                                                textAlignLast: 'left',
                                                                                fontSize: 14,
                                                                                color: item.status === "completed" ? 'green' : '#FF424250',
                                                                                fontWeight: 300,
                                                                                whiteSpace: 'nowrap',  // Prevent text from wrapping
                                                                                overflow: 'hidden',    // Hide overflow text
                                                                                textOverflow: 'ellipsis'  // Add ellipsis for overflow text
                                                                            }}>
                                                                                {/* {item.status} */}
                                                                                {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                                                                            </div>
                                                                        </div>
                                                                        <div className='w-2/12 lg:w-1/12'>
                                                                            <div style={styles.text2}>
                                                                                ${Number(item.amount).toFixed(2)}
                                                                            </div>
                                                                        </div>
                                                                        <div className='w-3/12 lg:w-2/12 '>
                                                                            <div style={{ ...styles.text2, paddingLeft: 13 }}>
                                                                                {item.durationString}
                                                                            </div>
                                                                        </div>
                                                                        <div className='w-3/12 lg:w-2/12'>
                                                                            <div style={styles.text2}>
                                                                                {/* {item.model.owner.assitant.createdAt} */}
                                                                                {moment(item.createdAt).format('MM/DD/YYYY')}
                                                                            </div>
                                                                        </div>
                                                                        <div className='w-3/12 lg:w-2/12'>
                                                                            <div style={styles.text2}>
                                                                                {/* {item.model.owner.assitant.createdAt} */}
                                                                                {/* {moment(item.createdAt).format('MM/DD/YYYY')} */}
                                                                                <button
                                                                                    onClick={() => {
                                                                                        if (item.summary !== "") {
                                                                                            formatToHtml(item.summary);
                                                                                        } else {
                                                                                            fetchTranscript(item.transcript);
                                                                                        }
                                                                                    }} className='text-purple' style={{ fontWeight: '400', fontSize: 15, fontFamily: 'inter' }}>
                                                                                    Details
                                                                                </button>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className='w-full h-0.5 rounded mt-2' style={{ backgroundColor: '#00000011' }}></div>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </InfiniteScroll>
                                            </div>
                                            <div className='' id="scrollableDiv" style={{ maxHeight: '70vh', overflow: "auto" }}>
                                                <InfiniteScroll className='lg:hidden flex-col w-full'
                                                    endMessage={
                                                        <p style={{ textAlign: 'center', paddingTop: '10px', fontWeight: "400", fontFamily: "inter", fontSize: 16, color: "#00000060" }}>
                                                            {`You're all caught up`}
                                                        </p>
                                                    }
                                                    scrollableTarget="scrollableDiv"
                                                    dataLength={callLogDetails.length}
                                                    next={() => {
                                                        console.log("Loading more...")
                                                        fetchMoreData();
                                                    }}
                                                    hasMore={hasMore}
                                                    loader={
                                                        <div className='w-full flex flex-row justify-center mt-8'>
                                                            <CircularProgress size={35} />
                                                        </div>
                                                    } // Show spinner while loading

                                                    style={{ overflow: "unset" }}
                                                >
                                                    <div className='lg:hidden pb-4' style={{ border: '' }}>
                                                        {callLogDetails.map((item) => (
                                                            <div
                                                                key={item.id}
                                                                className='px-2 py-1 rounded w-full lg:hidden mt-4'
                                                                style={{ border: '1px solid #00000020' }}>
                                                                <div>
                                                                    {/* <div style={{ fontWeight: '500', fontFamily: 'inter', fontSize: '18' }}>
                                                                Spoke To:
                                                            </div> */}
                                                                    <div
                                                                        className='w-full flex flex-row justify-between mt-1'
                                                                        style={{ fontWeight: '400', fontFamily: 'inter', fontSize: '15' }}>
                                                                        <div className='flex flex-row gap-2 items-center' style={{}}>
                                                                            {item.model.profile_image ?
                                                                                <img src={item.model.profile_image} alt='profile' style={{ borderRadius: "50%" }}
                                                                                    height={40} width={40}
                                                                                />
                                                                                :
                                                                                <div>
                                                                                    {
                                                                                        item.model.name == "Tristan" ?
                                                                                            <img src="/tristan.png" alt='profile'
                                                                                                // height={30} width={30} 
                                                                                                style={{ borderRadius: "50%", objectFit: 'cover', height: "55px", width: '55px' }}
                                                                                            /> :
                                                                                            <img src="/andrew.webp" alt='profile'
                                                                                                // height={30} width={40} 
                                                                                                style={{ borderRadius: "50%", objectFit: 'contain', height: "55px", width: '55px' }}
                                                                                            />
                                                                                    }
                                                                                </div>
                                                                            }

                                                                            <div style={styles.text2} className='flex flex-col items-start justify-start'>
                                                                                <div>
                                                                                    {item.model.name}
                                                                                </div>
                                                                                <div
                                                                                    style={{
                                                                                        textAlignLast: 'left',
                                                                                        fontSize: 13,
                                                                                        color: item.status === "completed" ? 'green' : '#FF424250',
                                                                                        fontWeight: 300,
                                                                                        whiteSpace: 'nowrap',  // Prevent text from wrapping
                                                                                        overflow: 'hidden',    // Hide overflow text
                                                                                        textOverflow: 'ellipsis'  // Add ellipsis for overflow text
                                                                                    }}>
                                                                                    {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div style={{ fontWeight: '500', fontFamily: 'inter', fontSize: '15' }}>
                                                                            {item.durationString}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div>
                                                                    {/* <div className='mt-1' style={{ fontWeight: '500', fontFamily: 'inter', fontSize: '18' }}>
                                                                Status:
                                                            </div> */}
                                                                    <div className='w-full flex flex-row justify-between mt-2'>
                                                                        <div style={{ fontWeight: '500', fontFamily: 'inter', fontSize: '15' }}>
                                                                            ${Number(item.amount).toFixed(2)}
                                                                        </div>
                                                                        <div
                                                                            style={{ ...styles.text2, fontWeight: '400', fontFamily: 'inter', fontSize: '15' }}>
                                                                            {moment(item.createdAt).format('MM/DD/YYYY')}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                {/* <div className='mt-1' style={{ fontWeight: '500', fontFamily: 'inter', fontSize: '18' }}>
                                                            Date:
                                                        </div> */}
                                                                {/* <div
                                                            style={{ ...styles.text2, fontWeight: '400', fontFamily: 'inter', fontSize: '15' }}>
                                                            {moment(item.createdAt).format('MM/DD/YYYY')}
                                                        </div> */}
                                                            </div>
                                                        ))}
                                                    </div>
                                                </InfiniteScroll>
                                            </div>
                                        </div>
                                }
                            </div>
                    }
                </div>
            </div>
            <div className='h-100vh flex flex-col justify-center items-center'>
                <Modal
                    open={transcriptSummaryText}
                    onClose={(() => setTranscriptSummaryText(''))}
                    closeAfterTransition
                    BackdropProps={{
                        timeout: 1000,
                        sx: {
                            backgroundColor: 'transparent',
                            backdropFilter: 'blur(40px)',
                            height: "100%"
                        },
                    }} className='h-screen flex flex-col justify-center items-center'>
                    <Box className="lg:w-5/12 sm:w-7/12 w-10/12" style={styleDetails}>
                        <div dangerouslySetInnerHTML={{ __html: transcriptSummaryText }} />
                        {/* hello */}

                    </Box>
                </Modal>
                <Modal
                    open={transcriptText}
                    onClose={(() => setTranscriptText(''))}
                    closeAfterTransition
                    BackdropProps={{
                        timeout: 1000,
                        sx: {
                            backgroundColor: 'transparent',
                            backdropFilter: 'blur(40px)',
                            height: "100%"
                        },
                    }} className='h-screen flex flex-col justify-center items-center'>
                    <Box className="lg:w-5/12 sm:w-7/12 w-10/12" style={styleDetails}>
                        <div>
                            {/* {transcriptText} */}
                            <div dangerouslySetInnerHTML={{ __html: transcriptText }} />
                        </div>

                    </Box>
                </Modal>
            </div>
        </div >
    )
}

export default Page