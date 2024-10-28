import Apis from '@/components/apis/Apis';
import { Box, CircularProgress, duration, FormControl, MenuItem, Modal, Select } from '@mui/material';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import moment from 'moment';
import { CircularProgressbar, CircularProgressbarWithChildren } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { ArrowDown, ArrowRight, ArrowUp, CaretDown, CaretUpDown } from '@phosphor-icons/react';
import Image from 'next/image';
import ProfileStat from '@/components/ProfileStat';
import SetPrice from '@/components/creatorOnboarding/SetPrice';
import EnableCallPrice from '../../ccreatorProfileNavComponents/aiPersona/EnableCallPrice';
import { Switch, Button, Popover, Typography } from '@mui/material'

const Dashboard = () => {


    const value = 0.66
    const [selectedDuration, setSelectedDuration] = useState(1);
    const [HrsData, setHrsData] = useState({})
    const [daysData, setDaysData] = useState({})
    const [monthData, setMonthData] = useState({})


    const [products, setProducts] = useState([]);
    const [showAllProducts, setShowAlProductsl] = useState(false);
    const itemsToDisplay = showAllProducts ? products : products.slice(0, 3);
    const [revenuceDetails, setrevenueDetails] = useState(null);
    const [topCallersDetails, setTopeCallersDetails] = useState([]);
    const [showAllCallers, setShowAlCallers] = useState(false);
    const callersToDisplay = showAllCallers ? topCallersDetails : topCallersDetails.slice(0, 3);
    const [dashboardDetails, setDashboardDetails] = useState(null);
    const [dashBoardData, setDashBoardData] = useState(null);
    const [analyticsDuration, setAnalyticsDuration] = useState('24hrs');
    const [callersLoader, setCallersLoader] = useState(false);
    const [creatorName, setCreatorName] = useState("");
    const [enablePRiceBtn, setEnablePRiceBtn] = useState(false);
    const [showEnablePriceModal, setShowEnablePriceModal] = useState(false);
    // const [aiData, setAiData] = useState(null);
    const [callAmount, setCallAmount] = useState(null);

    //code for enabling price
    const [callPrice, setCallPrice] = useState("");
    const [showInputErr, setShowInputErr] = useState(false);
    const [showWarningText, setShowWarningText] = useState(false);
    const [anchorel, setAnchorel] = useState(null);
    const open = Boolean(anchorel)
    const id = open ? '0' : undefined;
    const [updateLoader, setUpdateLoader] = useState(false);


    const callDetails = [
        { id: 1, name: 'Rayna Passaquindici Arcand', talkTime: '32 minutes', city: 'San Francisco, CA', amount: '$1.0', calls: 32 },
        { id: 2, name: 'Gretchen Workman', talkTime: '32 minutes', city: 'San Francisco, CA', amount: '$1.0', calls: 32 },
        { id: 3, name: 'Zain Baptista', talkTime: '32 minutes', city: 'San Francisco, CA', amount: '$1.0', calls: 32 },
        { id: 4, name: 'Jordyn Korsgaard', talkTime: '32 minutes', city: 'San Francisco, CA', amount: '$1.0', calls: 32 },
        { id: 5, name: 'Lincoln Stanton', talkTime: '32 minutes', city: 'San Francisco, CA', amount: '$1.0', calls: 32 },
    ];

    const soldProducts = [
        { id: 1, productName: 'Product 1', customer: 'Iyana Mostafa', city: 'San Francisco, CA', amount: '$1.0', date: '10/3/2007' },
        { id: 2, productName: 'Product 2', customer: 'Iyana Mostafa', city: 'San Francisco, CA', amount: '$1.0', date: '10/3/2007' },
        { id: 3, productName: 'Product 3', customer: 'Iyana Mostafa', city: 'San Francisco, CA', amount: '$1.0', date: '10/3/2007' },
        { id: 4, productName: 'Product 4', customer: 'Iyana Mostafa', city: 'San Francisco, CA', amount: '$1.0', date: '10/3/2007' },
        { id: 5, productName: 'Product 5', customer: 'Iyana Mostafa', city: 'San Francisco, CA', amount: '$1.0', date: '10/3/2007' },
    ];

    useEffect(() => {
        console.log("Analytics value is", analyticsDuration);
        console.log("Test case check 1 for loca.duration change")
        const DashboardLocalData = localStorage.getItem("DashboardData");
        if (DashboardLocalData) {
            const details = JSON.parse(DashboardLocalData);
            if (analyticsDuration === "7days") {
                setDashBoardData(details['7_days']);
                setTopeCallersDetails(details['7_days'].topTenCallers);
                // console.log("Details for 7 days:", details['7_days']);
            } else if (analyticsDuration === "24hrs") {
                setDashBoardData(details['24_hours']);
                setTopeCallersDetails(details['24_hours'].topTenCallers);
            } else if (analyticsDuration === "30days") {
                setDashBoardData(details['30_days']);
                setTopeCallersDetails(details['30_days'].topTenCallers);
            }
        }
    }, [analyticsDuration]);

    useEffect(() => {
        console.log("Api call check 1 ----------")
        getDashboardData();
        getAi();
    }, []);

    const getDashboardData = async () => {
        setCallersLoader(true);
        try {
            const localData = localStorage.getItem('User');
            if (localData) {
                const Data = JSON.parse(localData);
                const AuthToken = Data.data.token;
                console.log("Loggedin user details are", Data.data.user.role);
                if (Data.data.user.role !== "creator") {
                    router.push("/");
                    return
                }
                setCreatorName(Data.data.user.username);
                const ApiPath = Apis.DashBoardApi;
                const result = await axios.get(ApiPath, {
                    headers: {
                        "Authorization": "Bearer " + AuthToken,
                        "Content-Type": "application/json"
                    }
                });
                if (result && result.data.data) {
                    console.log("Result of get dashboard :::", result);
                    localStorage.setItem('DashboardData', JSON.stringify(result.data.data));
                    setDashboardDetails(result.data.data['24_hours']);
                    setDashBoardData(result.data.data['24_hours']);
                    setTopeCallersDetails(result.data.data['24_hours'].topTenCallers);
                    setProducts(result.data.data.products);
                    // setProducts(result.data.data.products);
                }
            } else {
                router.push("/tristan")
                return
            }
        } catch (error) {
            console.log('Dashboard API error:', error);
        } finally {
            setCallersLoader(false);
        }
    };

    const getAi = async () => {
        const localData = localStorage.getItem('User');
        if (localData) {
            try {
                const Data = JSON.parse(localData);
                const AuthToken = Data.data.token;
                const ApiPath = Apis.MyAiapi;
                // const ApiPath = Apis.MyProfile;
                const response = await axios.get(ApiPath, {
                    headers: {
                        "Authorization": "Bearer " + AuthToken,
                        "Content-Type": "application/json"
                    }
                });
                if (response) {
                    console.log("Response of get .my ai Api is", response.data.data);
                    if (response?.data?.data?.ai) {
                        console.log("Ai is Present");
                    } else {
                        router.push("/creator/buildscript");
                    }
                    if (response?.data?.data?.questions) {
                        console.log("Kycs are added");
                    } else {
                        router.push("/creator/buildscript2");
                    }
                    if (response.data.data.ai.isFree === true) {
                        console.log("Status of is free is ::");
                        setEnablePRiceBtn(true);
                    } else {
                        setEnablePRiceBtn(false);
                        setCallAmount(response.data.data.ai.price)
                    }

                    if (response?.data?.data?.ai?.aiObjective) {
                        console.log("Objectives exist");
                    } else {
                        processObjectiveProfession();
                    }

                    if (response?.data?.data?.ai?.tagline && response?.data?.data?.ai?.action) {
                        console.log("Professionn added")
                    } else {
                        processObjectiveProfession();
                    }
                }
            } catch (error) {
                console.error("Error occured is");
            }
        }
    }

    const processObjectiveProfession = async () => {
        const localData = localStorage.getItem("User");
        if (localData) {
            const Data = JSON.parse(localData);
            console.log("localdata  of user is", Data.data.user);
            try {
                const ApiPath = Apis.ProcessObjectiveProfession;
                const AuthToken = Data.data.token;
                console.log("Auth token is", AuthToken);
                const response = await axios.post(ApiPath, {
                    headers: {
                        'Authorization': "Bearer " + AuthToken,
                        "Content-Type": "application/json"
                    }
                });
                if (response) {
                    console.log("Response of processObjectiveProfession api is ::", response.data.data);
                }
            } catch (error) {
                console.error("Error occured in api is", error);
            }
        }
    }

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
                formData.append('price', callPrice);


                const response = await axios.post(ApiPath, formData, {
                    headers: {
                        "Authorization": "Bearer " + AuthToken,
                        "Content-Type": "application/json"
                    }
                });
                if (response) {
                    console.log("Response of updateai Api is", response.data.data);
                    if (response.data.status === true) {
                        setShowEnablePriceModal(false);
                        setCallPrice("");
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

    const handleSelectTime = (event) => {
        event.preventDefault();
        setAnalyticsDuration(event.target.value);
    };


    const numOfCallers = (duration) => {
        if (duration === 1) {
            return HrsData.totalCalls
        }
        if (duration === 2) {
            return daysData.totalCalls
        }
        if (duration === 3) {
            return monthData.totalCalls
        }
    }
    const totalMin = (duration) => {
        if (duration === 1) {
            return HrsData.totalDurationMinutes
        }
        if (duration === 2) {
            return daysData.totalDurationMinutes
        }
        if (duration === 3) {
            return monthData.totalDurationMinutes
        }
    }

    const totalRev = (duration) => {
        if (duration === 1) {
            return HrsData.totalEarnings
        }
        if (duration === 2) {
            return daysData.totalEarnings
        }
        if (duration === 3) {
            return monthData.totalEarnings
        }
    }

    const styles = {
        text: {
            fontSize: 12,
            color: '#00000090',
        },
        text2: {
            textAlignLast: 'left',
            fontSize: 13,
            color: '#00000060',
            fontWeight: "500",
            whiteSpace: 'nowrap', // Prevent text from wrapping
            overflow: 'hidden', // Hide overflow text
            textOverflow: 'ellipsis', // Add ellipsis for overflow text
        },
        statsHeading: {
            fontWeight: "400",
            fontFamily: "inter",
            fontSize: 12,
            color: "#ffffff70"
        },
        statsSubText: {
            fontSize: 12,
            fontFamily: "inter",
            fontWeight: "400", color: "#00FF57"
        },
        //style for the Modal
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
        inputContainer: {
            marginTop: 10,
            display: "flex",
            alignItems: "center",
            backgroundColor: "#EDEDED", /* Light grey background */
            bordeRadius: 20, /* Rounded corners */
            padding: "5px 0px",
            paddingLeft: "15px",
            border: callPrice && showInputErr ? "1px solid red" : "none",
            borderRadius: 5

        },
        input: {
            border: 'none',
            outline: 'none',
            backgroundColor: 'transparent',
            flexGrow: 1,
            fontSize: '16px',
            padding: '5px',
            color: '#000', // Ensure text is black
            MozAppearance: 'textfield'
        },
        text: {
            fontSize: 11,
            fontWeight: 'normal',
            color: '#050A0860'
        },
        PriceText: {
            fontSize: 13,
            fontWeight: 'normal',
            color: '#050A0860'
        }
    };


    // const topCallers = (duration) => {
    //     if (duration === 1) {
    //         return HrsData.topTenCallers
    //     }
    //     if (duration === 2) {
    //         return daysData.topTenCallers
    //     }
    //     if (duration === 3) {
    //         return monthData.topTenCallers
    //     }
    // }



    // const handleSelectTime = (event) => {
    //     event.preventDefault();
    //     setAnalyticsDuration(event.target.value);
    // };

    //code for analytics
    // {
    //     callersLoader ?
    //         <CircularProgress size={20} /> :
    //         <div>
    //             <FormControl>
    //                 {/* <InputLabel id="demo-simple-select-label">Age</InputLabel> */}
    //                 <Select
    //                     labelId="demo-simple-select-label"
    //                     id="demo-simple-select"
    //                     value={analyticsDuration}
    //                     // label="Age"
    //                     onChange={handleSelectTime}
    //                     sx={{
    //                         backgroundColor: 'white',
    //                         '& .MuiOutlinedInput-notchedOutline': {
    //                             borderColor: 'transparent',
    //                         },
    //                         '&:hover .MuiOutlinedInput-notchedOutline': {
    //                             borderColor: 'transparent',
    //                         },
    //                         '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
    //                             borderColor: 'transparent',
    //                         },
    //                         '& .MuiSelect-select': {
    //                             paddingTop: 1,
    //                             paddingBottom: 1,
    //                         },
    //                     }}
    //                 >
    //                     <MenuItem value={"24hrs"}>Last 24 hrs</MenuItem>
    //                     <MenuItem value={"7days"}>Last 7 days</MenuItem>
    //                     <MenuItem value={"30days"}>Last 30 days</MenuItem>
    //                 </Select>
    //             </FormControl>
    //         </div>
    // }


    return (
        <div
            className='w-full flex flex-col pl-5 overflow-none'
            style={{ height: '90vh' }}
        >
            {/* <div className='flex flex-row w-full items-center gap-6'>
                <div className='w-4/12 py-5 px-6' style={{ backgroundColor: "#ffffff50", borderRadius: "15px" }}>
                    <div className='w-full flex flex-row justify-between'>
                        <div style={{ fontSize: 20, fontWeight: 700 }}>
                            Analytics
                        </div>

                    </div>

                    <div className='w-full flex flex-row gap-7 mt-7 ml-2'>
                        <div className=' flex flex-col'>
                            <div style={{ fontSize: 13, fontWeight: "400", fontFamily: "inter" }}>Callers</div>
                            <div style={{ fontWeight: "300", fontFamily: "inter", fontSize: 32 }}>
                                {dashBoardData?.totalCalls}
                            </div>
                        </div>

                        <div className=' flex flex-col'>
                            <div style={{ fontSize: 13, fontWeight: "400", fontFamily: "inter" }}>Minutes</div>
                            <div className='w-full flex flex-row items-center'>
                                <div style={{ fontWeight: "300", fontFamily: "inter", fontSize: 32 }}>
                                    {dashBoardData?.totalDurationMinutes}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='w-4/12 py-5 px-6' style={{ backgroundColor: "#552AFF", borderRadius: "15px", color: "white" }}>
                    <div className='w-11/12 flex flex-row justify-between'>
                        <div style={{ fontSize: 20, fontWeight: 700, fontFamily: "inter" }}>Revenue</div>
                    </div>

                    <div className='w-full flex flex-row gap-7 mt-7 ml-2'>
                        <div className='w-6/12 flex flex-col'>
                            <div style={{ fontSize: 13, fontWeight: "400", fontFamily: "inter", color: "#ffffff80" }}>
                                Minutes Talked
                            </div>
                            <div style={{ fontWeight: "300", fontFamily: "inter", fontSize: 32 }}>
                                ${dashBoardData?.totalEarnings}
                            </div>
                        </div>

                        <div className='w-6/12 flex flex-col'>
                            <div style={{ fontSize: 13, fontWeight: "400", fontFamily: "inter", color: "#ffffff80" }}>
                                Products
                            </div>
                            <div className='w-full flex flex-row items-center'>
                                <div style={{ fontWeight: "300", fontFamily: "inter", fontSize: 32 }}>
                                    ${totalMin(selectedDuration)}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div> */}

            {/* <div className='w-11/12 flex flex-row justify-end'>
                <Image
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
                />
            </div> */}

            {/*<div className='w-11/12 flex flex-row items-center justify-between mt-4 bg-white px-6 py-4 rounded-2xl'>
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
                        </div>*/}
            <div>
                <ProfileStat />
            </div>

            <div className='w-11/12'>
                <div className='bg-[#552AFF] rounded-2xl px-4 pt-2 text-white w-full mt-4'>
                    <div className='w-full items-center justify-between flex flex-row'>
                        <div style={{ fontWeight: "500", fontSize: 20, fontFamily: "inter", color: "#ffffff60" }}>
                            Good to see you back <span className='text-white'>
                                {creatorName.charAt(0).toUpperCase() + creatorName.slice(1)}
                            </span>
                        </div>
                        <div>
                            {/* {
                    callersLoader ? */}
                            {/* < size={20} /> : */}
                            <div>
                                <FormControl>
                                    {/* <InputLabel id="demo-simple-select-label">Age</InputLabel> */}
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={analyticsDuration}
                                        // label="Age"
                                        onChange={handleSelectTime}
                                        IconComponent={CaretDown}
                                        sx={{
                                            backgroundColor: 'transparent',
                                            color: "white",
                                            '& .MuiOutlinedInput-notchedOutline': {
                                                borderColor: 'transparent',
                                            },
                                            '&:hover .MuiOutlinedInput-notchedOutline': {
                                                borderColor: 'transparent',
                                            },
                                            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                                borderColor: 'transparent',
                                            },
                                            '& .MuiSelect-select': {
                                                paddingTop: 1,
                                                paddingBottom: 1,
                                            },
                                            '& .MuiSelect-icon': {
                                                color: 'white',  // Arrow color
                                            },
                                        }}
                                    >
                                        <MenuItem value={"24hrs"}>Last 24 hrs</MenuItem>
                                        <MenuItem value={"7days"}>Last 7 days</MenuItem>
                                        <MenuItem value={"30days"}>Last 30 days</MenuItem>
                                    </Select>
                                </FormControl>
                            </div>
                            {/* } */}
                        </div>
                    </div>
                    <div style={{ fontWeight: "500", fontSize: 13, fontFamily: "inter", color: "#ffffff" }}>
                        See your stats
                    </div>

                    <div className='w-10/12 flex flex-row items-center mt-6 pb-6 justify-between'>
                        <div className='flex flex-row items-center gap-6'>

                            <div className='flex flex-row justify-center items-center border-2 border-white'
                                style={{
                                    width: "55px",
                                    height: "55px", borderRadius: "50%",
                                }}>
                                <img style={{ width: 17 }} src="/assets/selectedCallIcon.png" alt="phoneicon" />
                            </div>
                            {/* <div style={{ height: "71px", width: "71px" }}>
                            <CircularProgressbarWithChildren value={66}
                                strokeWidth={4}
                                styles={{
                                    path: {
                                        stroke: `white`, // Change the color to red
                                    },
                                    text: {
                                        fill: '#000000', // Change the text color to red
                                        fontSize: 20,
                                        fontWeight: "500"
                                    },
                                    trail: {
                                        stroke: '#ffffff60', // Change the trail color (if needed)
                                    },
                                }}>
                                <img style={{ width: 17, marginTop: -5 }} src="/assets/creatorProfileNavIcons/document.png" alt="doge" />
                            </CircularProgressbarWithChildren>
                        </div> */}
                            <div className='flex flex-col gap-2'>
                                <div style={styles.statsHeading}>
                                    Callers
                                </div>
                                <div className='flex flex-row items-center gap-1'>
                                    <p style={{ fontWeight: "500", fontSize: 13, fontFamily: "inter" }}>
                                        {dashBoardData?.totalCalls ?
                                            <div>
                                                {dashBoardData.totalCalls}
                                            </div> : "0"}
                                    </p>
                                    <div className='flex flex-row items-center'>
                                        {/* <Image src="/assets/creatorProfileNavIcons/greenUp.png" alt='up' height={13} width={10} /> */}
                                        <ArrowUp className='mb-1' size={15} weight="bold" color='#00FF57' />
                                        <div style={styles.statsSubText}>
                                            2%
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='flex flex-row items-center gap-6'>
                            <div className='flex flex-row justify-center items-center border-2 border-white'
                                style={{
                                    width: "55px",
                                    height: "55px", borderRadius: "50%",
                                }}>
                                <img style={{ width: 17 }} src="/assets/carbon_time.png" alt="doge" />
                            </div>
                            {/* <div style={{ height: "71px", width: "71px" }}>
                            <CircularProgressbarWithChildren value={66}
                                strokeWidth={4}
                                styles={{
                                    path: {
                                        stroke: `white`, // Change the color to red
                                    },
                                    text: {
                                        fill: '#000000', // Change the text color to red
                                        fontSize: 20,
                                        fontWeight: "500"
                                    },
                                    trail: {
                                        stroke: '#ffffff60', // Change the trail color (if needed)
                                    },
                                }}>
                                <img style={{ width: 17, marginTop: -5 }} src="/assets/creatorProfileNavIcons/document.png" alt="doge" />
                            </CircularProgressbarWithChildren>
                        </div> */}
                            <div className='flex flex-col gap-2'>
                                <div style={styles.statsHeading}>
                                    Minutes
                                </div>
                                <div className='flex flex-row items-center gap-1'>
                                    <p style={{ fontWeight: "500", fontSize: 13, fontFamily: "inter" }}>
                                        {dashBoardData?.totalDurationMinutes ?
                                            <div>
                                                {dashBoardData.totalDurationMinutes}
                                            </div> : "0"}
                                    </p>
                                    <div className='flex flex-row items-center'>
                                        {/* <Image src="/assets/creatorProfileNavIcons/greenUp.png" alt='up' height={13} width={10} /> */}
                                        <ArrowUp className='mb-1' size={15} weight="bold" color='#00FF57' />
                                        <div style={styles.statsSubText}>
                                            2%
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='flex flex-row items-center gap-6'>
                            <div className='flex flex-row justify-center items-center border-2 border-white'
                                style={{
                                    width: "55px",
                                    height: "55px", borderRadius: "50%",
                                }}>
                                <img style={{ width: 20, height: 20 }} src="/assets/minTalIcon.png" alt="doge" />
                            </div>
                            {/* <div style={{ height: "71px", width: "71px" }}>
                            <CircularProgressbarWithChildren value={66}
                                strokeWidth={4}
                                styles={{
                                    path: {
                                        stroke: `white`, // Change the color to red
                                    },
                                    text: {
                                        fill: '#000000', // Change the text color to red
                                        fontSize: 20,
                                        fontWeight: "500"
                                    },
                                    trail: {
                                        stroke: '#ffffff60', // Change the trail color (if needed)
                                    },
                                }}>
                                <img style={{ width: 17, marginTop: -5 }} src="/assets/creatorProfileNavIcons/document.png" alt="doge" />
                            </CircularProgressbarWithChildren>
                        </div> */}
                            <div className='flex flex-col gap-2'>
                                <div style={styles.statsHeading}>
                                    Call Rev
                                </div>
                                <div className='flex flex-row items-center gap-1'>
                                    {
                                        enablePRiceBtn ?
                                            <button style={{ ...styles.statsHeading, color: "white" }} onClick={() => { setShowEnablePriceModal(true) }}>
                                                Enable Price
                                            </button> :
                                            <div style={{ ...styles.statsHeading, color: "white" }}>
                                                {callAmount && (<div>${callAmount.toFixed(2)}</div>)}
                                            </div>
                                    }

                                    {/* Modal to enable pricce if not */}
                                    <Modal
                                        open={showEnablePriceModal}
                                        onClose={() => setShowEnablePriceModal(false)}
                                        closeAfterTransition
                                        BackdropProps={{
                                            timeout: 1000,
                                            sx: {
                                                backgroundColor: "transparent",
                                                backdropFilter: "blur(20px)",
                                            },
                                        }}
                                    >
                                        <Box className="lg:w-5/12 sm:w-7/12 lg:w-6/12 xl:w-5/12 w-full" sx={styles.AddNewValueModal}>
                                            {/* <LoginModal creator={creator} assistantData={getAssistantData} closeForm={setOpenLoginModal} /> */}
                                            <div className="flex flex-row justify-center w-full">
                                                <div
                                                    className="sm:w-full w-full"
                                                    style={{
                                                        backgroundColor: "#ffffff20",
                                                        padding: 20,
                                                        borderRadius: 10,
                                                    }}
                                                >
                                                    <div style={{ backgroundColor: "#ffffff", borderRadius: 7, padding: 10 }}>
                                                        <div className='flex flex-row items-center justify-end p-2' style={{ fontWeight: '500', fontFamily: "inter", fontSize: 20 }}>
                                                            {/* <p /> */}
                                                            {/* <p>Update </p> */}
                                                            <button onClick={() => { setShowEnablePriceModal(false) }}>
                                                                <Image src="/assets/crossBtn.png" height={15} width={15} alt='*' />
                                                            </button>
                                                        </div>
                                                        <div className='w-full flex flex-row justify-center'>
                                                            <div className='w-10/12'>
                                                                <div className='w-10/12 rounded' style={styles.inputContainer}>
                                                                    {/* <div>$</div> */}
                                                                    <div className="flex items-center border-none border-gray-300 w-full">
                                                                        <span className="mr-1">$</span>
                                                                        <input
                                                                            // disabled={toogleActive ? true : false}
                                                                            style={{
                                                                                ...styles.input,
                                                                                WebkitAppearance: "none",
                                                                                MozAppearance: "textfield",
                                                                                appearance: "none",
                                                                                // backgroundColor: 'red'
                                                                            }}
                                                                            className='w-full border-none outline-none'
                                                                            value={callPrice}
                                                                            onChange={(e) => {
                                                                                e.target.value = e.target.value.replace(/[^0-9 .]/g, '');
                                                                                setCallPrice(e.target.value);
                                                                                let P = e.target.value;
                                                                                if (P) {
                                                                                    if (P < 1) {
                                                                                        console.log("Value is less then 1", P);
                                                                                        setShowInputErr(true)
                                                                                    } else {
                                                                                        setShowInputErr(false)
                                                                                    }
                                                                                }
                                                                            }}
                                                                            onFocus={() => { setShowWarningText(true) }}
                                                                            onBlur={() => { setShowWarningText(false) }}
                                                                            // placeholder='$'
                                                                            type='text'
                                                                            inputMode='number'
                                                                            pattern='[0-9]*'
                                                                        />
                                                                    </div>
                                                                </div>
                                                                <div className='text-red mt-3'
                                                                    style={{
                                                                        fontSize: 11,
                                                                        fontWeight: 'normal',
                                                                        height: 12
                                                                        // color: '#'
                                                                    }}>
                                                                    {callPrice && showInputErr && ("Nothing less than $1 per minute")}
                                                                </div>
                                                                <div>
                                                                    <div className='mt-8 w-10/12 flex flex-row justify-between'>
                                                                        <div className='' style={styles.PriceText}>
                                                                            Your price per minute
                                                                        </div>

                                                                        <div className='' style={styles.PriceText}>
                                                                            ${callPrice}
                                                                        </div>

                                                                    </div>


                                                                    <div className='mt-8 w-10/12 flex flex-row  justify-between'>
                                                                        <div className='w-9/12 flex flex-row pe-12'>
                                                                            <div style={styles.PriceText}>
                                                                                Our fee - 20% to run our engine.
                                                                            </div>
                                                                            <div className='ms-1'>

                                                                                <Typography
                                                                                    aria-owns={open ? 'mouse-over-popover' : undefined}
                                                                                    aria-haspopup="true"
                                                                                    onMouseEnter={(e) => {
                                                                                        setAnchorel(e.currentTarget)
                                                                                    }}
                                                                                    onMouseLeave={(e) => {
                                                                                        setAnchorel(null)
                                                                                    }}
                                                                                >
                                                                                    <img src={'/assets/questionImage.png'}
                                                                                        style={{ alignSelf: 'center', height: 15, width: 15 }} />
                                                                                </Typography>
                                                                                <Popover
                                                                                    id="mouse-over-popover"
                                                                                    sx={{
                                                                                        pointerEvents: 'none',
                                                                                    }}
                                                                                    PaperProps={{
                                                                                        sx: {
                                                                                            borderRadius: '10px', // Add borderRadius here
                                                                                            padding: "2px"
                                                                                        },
                                                                                    }}
                                                                                    open={open}
                                                                                    anchorEl={anchorel}
                                                                                    anchorOrigin={{
                                                                                        vertical: 'bottom',
                                                                                        horizontal: 'left',
                                                                                    }}
                                                                                    transformOrigin={{
                                                                                        vertical: 'top',
                                                                                        horizontal: 'left',
                                                                                    }}
                                                                                    onClose={() => {
                                                                                        setAnchorel(null)
                                                                                    }}
                                                                                    disableRestoreFocus
                                                                                >
                                                                                    <Typography sx={{ p: 1, fontSize: 13, padding: 1 }}>We share this with our creators. We pay<br /> OpenAI, twilio, 11labs, Amazon Web<br /> Services, Stripe, 3rd Party Providers,<br />and not to mention…our expensive<br /> developers at E8 Labs.</Typography>
                                                                                </Popover>
                                                                            </div>


                                                                        </div>
                                                                        <div className='' style={styles.PriceText}>
                                                                            ${((20 / 100) * callPrice).toFixed(2)}
                                                                        </div>

                                                                    </div>
                                                                    <div style={styles.PriceText}>You keep the rest.</div>

                                                                    <div className='flex flex-row justify-between w-10/12 mt-6'>
                                                                        <div className='' style={styles.PriceText}>Profit (straight to the bank)</div>
                                                                        <div style={styles.PriceText}>${((80 / 100) * callPrice).toFixed(2)}</div>
                                                                    </div>
                                                                    {
                                                                        updateLoader ?
                                                                            <div className='text-white flex flex-row justify-center w-10/12 mt-10'>
                                                                                <CircularProgress size={25} />
                                                                            </div> :
                                                                            <button
                                                                                onClick={updateAi}
                                                                                className='bg-purple text-white w-10/12 mt-10'
                                                                                style={{ fontSize: 15, fontWeight: "400", height: "52px", borderRadius: "50px", color: "white" }}>
                                                                                Continue
                                                                            </button>
                                                                    }
                                                                </div>
                                                            </div>
                                                            {/* <EnableCallPrice /> */}
                                                            {/* <SetPrice /> */}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </Box>
                                    </Modal>



                                    {/* <p style={{ fontWeight: "500", fontSize: 13, fontFamily: "inter" }}>
                                        ${dashBoardData?.totalEarnings ?
                                            <div>
                                                {dashBoardData.totalEarnings.toFixed(2)}
                                            </div> : "0"}
                                    </p>
                                    <div className='flex flex-row items-center'>
                                        <ArrowDown className='mb-1' size={15} weight="bold" color='#FF7918' />
                                        <div style={{ ...styles.statsSubText, color: "#FF7918" }}>
                                            2%
                                        </div>
                                    </div> */}
                                </div>
                            </div>
                        </div>
                        <div className='flex flex-row items-center gap-6'>
                            <div className='flex flex-row justify-center items-center border-2 border-white'
                                style={{
                                    width: "55px",
                                    height: "55px", borderRadius: "50%",
                                }}>
                                <img style={{ width: 17, height: 17 }} src="/assets/revenueIcon.png" alt="doge" />
                            </div>
                            {/* <div style={{ height: "71px", width: "71px" }}>
                            <CircularProgressbarWithChildren value={66}
                                strokeWidth={4}
                                styles={{
                                    path: {
                                        stroke: `white`, // Change the color to red
                                    },
                                    text: {
                                        fill: '#000000', // Change the text color to red
                                        fontSize: 20,
                                        fontWeight: "500"
                                    },
                                    trail: {
                                        stroke: '#ffffff60', // Change the trail color (if needed)
                                    },
                                }}>
                                <img style={{ width: 17, marginTop: -5 }} src="/assets/creatorProfileNavIcons/document.png" alt="doge" />
                            </CircularProgressbarWithChildren>
                        </div> */}
                            <div className='flex flex-col gap-2'>
                                <div style={styles.statsHeading}>
                                    Product Rev
                                </div>
                                <div className='flex flex-row items-center gap-1'>
                                    <p style={{ fontWeight: "500", fontSize: 13, fontFamily: "inter" }}>
                                        ${dashBoardData?.totalEarnings ?
                                            <div>
                                                {dashBoardData.totalEarnings.toFixed(2)}
                                            </div> : "0"}</p>
                                    <div className='flex flex-row items-center'>
                                        {/* <Image src="/assets/creatorProfileNavIcons/greenUp.png" alt='up' height={13} width={10} /> */}
                                        <ArrowRight className='mb-1' size={15} weight="bold" color='white' />
                                        <div style={{ ...styles.statsSubText, color: "white" }}>
                                            Flat
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

                <div className='w-full mt-6 mb-8 flex flex-row gap-2'>
                    <div className='w-6/12 flex flex-col rounded-2xl px-6 pb-4 max-h-[55vh] overflow-auto scrollbar scrollbar-track-transparent scrollbar-thin scrollbar-thumb-purple' style={{ backgroundColor: "#ffffff", height: "auto" }}>
                        <div className='flex flex-row justify-between items-center mt-12 w-11/12 ps-6'>
                            <div
                                style={{
                                    fontSize: 20, fontWeight: "500", fontFamily: 'inter'
                                }}>Products</div>
                            {
                                products.length > 3 && (
                                    <button
                                        onClick={() => { setShowAlProductsl(!showAllProducts) }}
                                        className='text-purple py-1 underline'
                                        style={{
                                            borderRadius: "50px", fontSize: 13, fontWeight: "400", fontFamily: 'inter'
                                        }}>
                                        {showAllProducts ? "View Less Products" : "View All Products"}
                                    </button>
                                )}
                        </div>
                        {/* <div className='w-full flex flex-row gap-1 mt-5 justify-between'>
                        <div className='w-3/12'>
                            <div style={styles.text}>Product Name</div>
                        </div>
                        <div className='w-3/12'>
                            <div style={styles.text}>Amount</div>
                        </div>
                        <div className='w-3/12'>
                            <div style={styles.text}>Date</div>
                        </div>
                    </div> */}
                        <div className='w-full flex flex-col items-center'>
                            {
                                callersLoader ?
                                    <div className='w-10/12 flex flex-row justify-center mt-4'>
                                        <CircularProgress />
                                    </div> :
                                    <div className='w-10/12'>
                                        {
                                            products.length > 0 ?
                                                <div key={products.id}>
                                                    {itemsToDisplay.map((item) => (
                                                        // <React.Fragment key={item.id}>
                                                        <div key={item.id}>
                                                            <div key={item.id} className='w-full flex flex-row gap-1 mt-10 justify-between'>
                                                                <div>
                                                                    <div style={{ ...styles.text2, color: "#000000", fontSize: 15, fontWeight: "500" }}>{item.name}</div>
                                                                    <div style={styles.text2}>
                                                                        {/* {item.createdAt} */}
                                                                        {moment(item.createdAt).format("MM/DD/YYYY")}
                                                                    </div>
                                                                </div>
                                                                <div className='flex flex-col items-end'>
                                                                    <div style={{ ...styles.text2, color: "#000000", fontSize: 20 }}>
                                                                        ${Number(item.productPrice).toFixed(2)}
                                                                    </div>
                                                                    {/* <div style={styles.text2}>
                                                                    200 Purchased
                                                                </div> */}
                                                                </div>
                                                            </div>
                                                            {/* </React.Fragment> */}
                                                        </div>
                                                    ))}
                                                </div> :
                                                <div className='text-center mt-8 text-2xl font-bold'>
                                                    No purchases yet
                                                </div>
                                        }
                                    </div>
                            }
                        </div>
                    </div>
                    <div className='w-6/12 flex flex-col rounded-2xl px-6 pb-4 max-h-[55vh] overflow-auto scrollbar scrollbar-track-transparent scrollbar-thin scrollbar-thumb-purple' style={{ backgroundColor: "#ffffff", height: "auto" }}>
                        <div className='mt-12 flex flex-row justify-between items-center'>
                            <div className='font-light'
                                style={{
                                    fontSize: 20, fontWeight: "500", fontFamily: 'inter'
                                }}>Top Callers</div>
                            {
                                topCallersDetails.length > 3 && (
                                    <button className='text-purple underline'
                                        onClick={() => { setShowAlCallers(!showAllCallers) }}
                                        style={{
                                            fontSize: 13, fontWeight: "400", fontFamily: 'inter'
                                        }}>
                                        {showAllCallers ? "View less callers" : "View all callers"}
                                    </button>
                                )
                            }
                        </div>
                        <div className='w-full flex flex-row justify-between mt-5'>
                            <div className='w-4/12'>
                                <div style={styles.text}>Name</div>
                            </div>
                            {/* <div className='w-3/12'>
                        <div style={styles.text}>City, state</div>
                    </div> */}
                            <div className='w-3/12'>
                                <div style={styles.text}>Total Minutes</div>
                            </div>
                            <div className='w-2/12'>
                                <div style={styles.text}>Num of calls</div>
                            </div>
                            <div className='w-3/12 ps-8'>
                                <div style={styles.text}>Total spent</div>
                            </div>
                        </div>


                        {
                            callersLoader ?
                                <div className='w-full flex flex-row justify-center mt-4'>
                                    <CircularProgress />
                                </div> :
                                <div>
                                    {
                                        topCallersDetails.length > 0 ?
                                            <div key={topCallersDetails.id}>
                                                {
                                                    callersToDisplay.map((item) => (
                                                        <div key={item.id} className='w-full flex flex-row justify-between mt-10'>
                                                            <div className='w-4/12'>
                                                                <div style={styles.text2}>
                                                                    {item.name}
                                                                </div>
                                                            </div>
                                                            {/* <div className='w-3/12 border-2 border-red'>
                                                <div style={styles.text2}>
                                                    {item.city}
                                                </div>
                                            </div> */}
                                                            <div className='w-3/12'>
                                                                <div style={styles.text2}>
                                                                    {item.totalMinutes}
                                                                </div>
                                                            </div>
                                                            <div className='w-2/12'>
                                                                <div style={styles.text2}>
                                                                    {item.callCount}
                                                                </div>
                                                            </div>
                                                            <div className='w-3/12 text-center ps-8'>
                                                                <div style={styles.text2}>
                                                                    ${Number(item.totalSpent).toFixed(2)}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))
                                                }
                                            </div> :
                                            <div className='text-center mt-8 text-2xl font-bold'>
                                                No caller yet
                                            </div>
                                    }
                                </div>
                        }


                    </div>
                </div>
            </div>


        </div>
    );
};

export default Dashboard;
