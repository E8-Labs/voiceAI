"use client"
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Apis from '@/components/apis/Apis';
import axios from 'axios';
import { CircularProgress } from '@mui/material';
import moment from 'moment';

const Page = () => {

    const [callLogDetails, setCallLogDetails] = useState([]);
    const [callLogloader, setCallLogloader] = useState(false);

    const getCallLogs = async () => {
        const localData = localStorage.getItem('User');
        if (localData) {
            try {
                setCallLogloader(true);
                const Data = JSON.parse(localData);
                // console.log("Data recieved is", Data);
                // const ApiPath = "http://localhost:8005/api/user/call_logs";
                const AuthToken = Data.data.token;
                console.log("Auth token", AuthToken);
                const ApiPath = Apis.CallerCallLogs;
                const response = await axios.get(ApiPath, {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + AuthToken
                    }
                });

                if (response) {
                    console.log("Response of CallLogs api", response);
                    if (response.data.status === true) {
                        setCallLogDetails(response.data.data);
                    } else {
                        console.log("Status of calllog api", response.data.status);
                    }

                }
            } catch (error) {
                console.error("Error occured in call log api", error);
            } finally {
                setCallLogloader(false);
            }
        }
    }

    useEffect(() => {
        getCallLogs();
    }, [])

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

    const callLogs = [
        {
            id: 1,
            name: 'Rayna Vaccaro',
            image: '/assets/profileImage.png',
            price: '$400',
            time: '32 minutes',
            date: '10/3/2007'
        },
        {
            id: 2,
            name: 'Rayna Vaccaro',
            image: '/assets/profileImage.png',
            price: '$400',
            time: '32 minutes',
            date: '10/3/2007'
        },
        {
            id: 3,
            name: 'Rayna Vaccaro',
            image: '/assets/profileImage.png',
            price: '$400',
            time: '32 minutes',
            date: '10/3/2007'
        },
    ]

    return (
        <div className='h-screen w-full' style={{ backgroundColor: "#ffffff40", overflow: 'hidden', scrollbarWidth: 0, }}>
            <div className='w-full pe-4 lg:w-9/12 flex flex-col gap-2 pt-10 ps-2 lg:ps-10' style={{ maxHeight: '90vh', overflow: "hidden", scrollbarWidth: "none" }}>
                <div style={{ fontSize: 20, fontWeight: 400, fontFamily: 'inter' }}>
                    Calls Logs
                </div>

                <div className='w-full p-5 rounded-xl border-2'
                    style={{ backgroundColor: "#FFFFFF40", maxHeight: '70vh', overflow: 'auto' }}
                >
                    <div className='w-full flex flex-row justify-between lg:flex hidden'>
                        <div className='w-3/12'>
                            <div style={styles.text}>Spoke to</div>
                        </div>
                        <div className='w-2/12 lg:w-2/12 '>
                            <div style={styles.text}>Status</div>
                        </div>
                        <div className='w-2/12 lg:w-2/12 '>
                            <div style={styles.text}>Amount</div>
                        </div>
                        <div className='w-3/12 lg:w-3/12'>
                            <div style={styles.text}>Duration</div>
                        </div>
                        <div className='w-3/12 lg:w-2/12'>
                            <div style={styles.text}>Date</div>
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
                                        <div>
                                            <div className='lg:flex hidden flex flex-col'>
                                                {callLogDetails.map((item) => (
                                                    <>
                                                        <button className='w-full' //</>style={{}} onClick={() => { setOpen(item) }}
                                                        >
                                                            <div className='w-full flex flex-row justify-between mt-10 items-center' key={item.id}>
                                                                <div className='w-3/12 flex flex-row gap-2 items-center' style={{}}>
                                                                    {item.model.owner.profile_image ?
                                                                        <img src={item.model.owner.profile_image} alt='profile' style={{ borderRadius: "50%" }}
                                                                            height={25} width={25}
                                                                        />
                                                                        :
                                                                        <div>
                                                                            {
                                                                                item.model.owner.name == "Tristan" ?
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

                                                                    <div style={styles.text2}>
                                                                        {item.model.owner.name}
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
                                                                        {item.status}
                                                                    </div>
                                                                </div>
                                                                <div className='w-2/12 lg:w-2/12'>
                                                                    <div style={styles.text2}>
                                                                        ${Number(item.amount).toFixed(2)}
                                                                    </div>
                                                                </div>
                                                                <div className='w-3/12 lg:w-3/12 '>
                                                                    <div style={styles.text2}>
                                                                        {item.durationString}
                                                                    </div>
                                                                </div>
                                                                <div className='w-3/12 lg:w-2/12'>
                                                                    <div style={styles.text2}>
                                                                        {/* {item.model.owner.assitant.createdAt} */}
                                                                        {moment(item.createdAt).format('MM/DD/YYYY')}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className='w-full h-0.5 rounded mt-2' style={{ backgroundColor: '#00000011' }}></div>
                                                        </button>
                                                    </>
                                                ))}
                                            </div>
                                            <div className='lg:hidden pb-4' style={{ height: '45vh' }}>
                                                {callLogDetails.map((item) => (
                                                    <div
                                                        key={item.id}
                                                        className='px-2 py-1 rounded w-full lg:hidden mt-4'
                                                        style={{ border: '1px solid #00000020' }}>
                                                        <div>
                                                            <div style={{ fontWeight: '600', fontFamily: 'inter', fontSize: '18' }}>
                                                                Spoke To:
                                                            </div>
                                                            <div
                                                                className='w-full flex flex-row justify-between mt-1'
                                                                style={{ fontWeight: '400', fontFamily: 'inter', fontSize: '15' }}>
                                                                <div className='flex flex-row gap-2 items-center' style={{}}>
                                                                    {item.model.owner.profile_image ?
                                                                        <img src={item.model.owner.profile_image} alt='profile' style={{ borderRadius: "50%" }}
                                                                            height={25} width={25}
                                                                        />
                                                                        :
                                                                        <div>
                                                                            {
                                                                                item.model.owner.name == "Tristan" ?
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

                                                                    <div style={styles.text2}>
                                                                        {item.model.owner.name}
                                                                    </div>
                                                                </div>
                                                                <div style={{ fontWeight: '600', fontFamily: 'inter', fontSize: '15' }}>
                                                                    ${Number(item.amount).toFixed(2)}
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <div className='mt-1' style={{ fontWeight: '600', fontFamily: 'inter', fontSize: '18' }}>
                                                                Status
                                                            </div>
                                                            <div className='w-full flex flex-row justify-between'>
                                                                <div
                                                                    style={{
                                                                        textAlignLast: 'left',
                                                                        fontSize: 14,
                                                                        color: item.status === "completed" ? 'green' : '#FF424250',
                                                                        fontWeight: 300,
                                                                        whiteSpace: 'nowrap',  // Prevent text from wrapping
                                                                        overflow: 'hidden',    // Hide overflow text
                                                                        textOverflow: 'ellipsis'  // Add ellipsis for overflow text
                                                                    }}>
                                                                    {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                                                                </div>
                                                                <div style={{ fontWeight: '600', fontFamily: 'inter', fontSize: '15' }}>
                                                                    {item.durationString}
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className='mt-1' style={{ fontWeight: '600', fontFamily: 'inter', fontSize: '18' }}>
                                                            Date
                                                        </div>
                                                        <div
                                                            style={{ ...styles.text2, fontWeight: '400', fontFamily: 'inter', fontSize: '15' }}>
                                                            {moment(item.createdAt).format('MM/DD/YYYY')}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                }
                            </div>
                    }
                </div>
            </div>
        </div >
    )
}

export default Page