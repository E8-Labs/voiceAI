"use client"
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Apis from '@/components/apis/Apis';
import axios from 'axios';
import { CircularProgress } from '@mui/material';

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
            fontSize: 12,
            color: '#00000090'
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
        <div className='h-screen w-full' style={{ backgroundColor: "#ffffff40", overflow: 'auto', scrollbarWidth: 0, }}>
            <div className='w-9/12 flex flex-col gap-2 pt-10 ps-10'>
                <div style={{ fontSize: 20, fontWeight: 400, fontFamily: 'inter' }}>
                    Calls Logs
                </div>

                <div className='w-full p-5 rounded-xl'
                    style={{ backgroundColor: "#FFFFFF30" }}
                >
                    <div className='w-full flex flex-row justify-between'>
                        <div className='w-4/12'>
                            <div style={styles.text}>Spoke to</div>
                        </div>
                        <div className='w-2/12 '>
                            <div style={styles.text}>Amount</div>
                        </div>
                        <div className='w-3/12'>
                            <div style={styles.text}>Minutes</div>
                        </div>
                        <div className='w-2/12'>
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
                                            {callLogDetails.map((item) => (
                                                <>
                                                    <button className='w-full' //</>style={{}} onClick={() => { setOpen(item) }}
                                                    >
                                                        <div className='w-full flex flex-row justify-between mt-10' key={item.id}>
                                                            <div className='w-4/12 flex flex-row gap-2' style={{}}>
                                                                {item.model.owner.profile_image ?
                                                                    <Image src={item.model.owner.profile_image} alt='profile'
                                                                        height={25} width={25}
                                                                    /> :
                                                                    <Image src="/assets/placeholderImg.jpg" alt='profile'
                                                                        height={25} width={25}
                                                                    />
                                                                }

                                                                <div style={styles.text2}>{item.model.owner.name}</div>
                                                            </div>
                                                            <div className='w-2/12'>
                                                                <div style={styles.text2}>{item.amount}</div>
                                                            </div>
                                                            <div className='w-3/12 '>
                                                                <div style={styles.text2}>{item.durationString}</div>
                                                            </div>
                                                            <div className='w-2/12'>
                                                                <div style={styles.text2}>{item.model.owner.assitant.createdAt}</div>
                                                            </div>
                                                        </div>
                                                        <div className='w-full h-0.5 rounded mt-2' style={{ backgroundColor: '#00000011' }}></div>
                                                    </button>
                                                </>
                                            ))}
                                        </div>
                                }
                            </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default Page