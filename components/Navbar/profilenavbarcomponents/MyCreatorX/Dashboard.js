import Apis from '@/components/apis/Apis';
import { CircularProgress, duration, FormControl, MenuItem, Select } from '@mui/material';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import moment from 'moment';

const Dashboard = () => {
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

    // useEffect(() => {
    //     console.log("Analytics value is", analyticsDuration);
    //     const DashboardLocalData = localStorage.getItem("DashboardData");
    //     if (dashboardDetails) {
    //         const details = JSON.parse(DashboardLocalData);
    //         if (analyticsDuration === "7days") {
    //             // setDashboardDetails()
    //             setDashBoardData(details['7_days']);
    //             setTopeCallersDetails(details['7_days'].topTenCallers)
    //             console.log("Details are", details['7_days'])
    //         } else if (analyticsDuration === "24hrs") {
    //             // setDashboardDetails()
    //             setDashBoardData(details['24_hours']);
    //             setTopeCallersDetails(details['24_hours'].topTenCallers)
    //         } else if (analyticsDuration === "30days") {
    //             // setDashboardDetails()
    //             setDashBoardData(details['30_days']);
    //             setTopeCallersDetails(details['30_days'].topTenCallers)
    //         }
    //     }
    // }, [analyticsDuration])


    // useEffect(() => {
    //     getDashboardData()
    // }, [])


    // const getDashboardData = async () => {
    //     setCallersLoader(true);
    //     try {
    //         const localData = localStorage.getItem('User');
    //         const Data = JSON.parse(localData);
    //         console.log("Local data is", Data);
    //         const AuthToken = Data.data.token;
    //         console.log("Authtoken is", AuthToken);
    //         // const token = m;
    //         const ApiPath = Apis.DashBoardApi;
    //         const result = await axios.get(ApiPath, {
    //             headers: {
    //                 "Authorization": "Bearer " + AuthToken,
    //                 "Content-Type": "application/json"
    //             }
    //         });
    //         if (result) {
    //             console.log("Result of get dashboard :::", result)
    //             if (result.data.data) {
    //                 // if()
    //                 localStorage.setItem('DashboardData', JSON.stringify(result.data.data));
    //                 setDashboardDetails(result.data.data);
    //                 setDashBoardData(result.data.data["24_hours"]);
    //                 setTopeCallersDetails(result.data.data["24_hours"].topTenCallers);
    //                 setProducts(result.data.data.products);
    //             }
    //         }
    //         // if (result) {
    //         //     let json = await result.json()

    //         //     if (json.status === true) {
    //         //         console.log('dashboard data is', json.data);
    //         //         const Data = json.data
    //         //         setHrsData(json.data["24_hours"]);
    //         //         setDaysData(json.data["7_days"]);
    //         //         setMonthData(json.data["30_days"]);
    //         //         setDashboardDetails()
    //         //     } else {
    //         //         console.log('dashboard api message is', json.message)
    //         //     }
    //         // }
    //     } catch (e) {
    //         console.log('dashboard api error is', e);
    //         setCallersLoader(false);
    //     } finally {
    //         setCallersLoader(false);
    //     }
    // }

    useEffect(() => {
        console.log("Analytics value is", analyticsDuration);
        const DashboardLocalData = localStorage.getItem("DashboardData");
        if (DashboardLocalData) {
            const details = JSON.parse(DashboardLocalData);
            if (analyticsDuration === "7days") {
                setDashBoardData(details['7_days']);
                setTopeCallersDetails(details['7_days'].topTenCallers);
                console.log("Details for 7 days:", details['7_days']);
            } else if (analyticsDuration === "24hrs") {
                setDashBoardData(details['24_hours']);
                setTopeCallersDetails(details['24_hours'].topTenCallers);
            } else if (analyticsDuration === "30days") {
                setDashBoardData(details['30_days']);
                setTopeCallersDetails(details['30_days'].topTenCallers);
            }
        }
    }, [analyticsDuration]); // Only runs when analyticsDuration changes

    useEffect(() => {
        getDashboardData();
    }, []); // Fetch dashboard data on component mount

    const getDashboardData = async () => {
        setCallersLoader(true);
        try {
            const localData = localStorage.getItem('User');
            const Data = JSON.parse(localData);
            const AuthToken = Data.data.token;
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
                setDashboardDetails(result.data.data);
                // Don't set to '24_hours' directly, rely on the selected duration instead
                const selectedData = result.data.data[analyticsDuration];
                setDashBoardData(selectedData);
                setTopeCallersDetails(selectedData.topTenCallers);
                setProducts(result.data.data.products);
                // setProducts(result.data.data.products);
            }
        } catch (e) {
            console.log('Dashboard API error:', e);
        } finally {
            setCallersLoader(false);
        }
    };

    const handleSelectTime = (event) => {
        event.preventDefault();
        setAnalyticsDuration(event.target.value); // This will trigger the useEffect to update the data based on duration
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
            fontSize: 18,
            color: '#000000',
            fontWeight: 300,
            whiteSpace: 'nowrap', // Prevent text from wrapping
            overflow: 'hidden', // Hide overflow text
            textOverflow: 'ellipsis', // Add ellipsis for overflow text
        },
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


    return (
        <div
            className='w-full flex flex-col p-15 pl-5'
            style={{ height: '90vh', overflow: 'auto', scrollbarWidth: 'none', msOverflowStyle: 'none', marginTop: 20 }}
        >
            <div className='flex flex-row w-full items-center gap-6'>
                <div className='w-4/12 py-5 px-6' style={{ backgroundColor: "#ffffff50", borderRadius: "15px" }}>
                    <div className='w-full flex flex-row justify-between'>
                        <div style={{ fontSize: 24, fontWeight: 300 }}>
                            Analytics
                        </div>
                        <div>
                            <FormControl>
                                {/* <InputLabel id="demo-simple-select-label">Age</InputLabel> */}
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={analyticsDuration}
                                    // label="Age"
                                    onChange={handleSelectTime}
                                    sx={{
                                        backgroundColor: 'white',
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
                                    }}
                                >
                                    <MenuItem value={"24hrs"}>Last 24 hrs</MenuItem>
                                    <MenuItem value={"7days"}>Last 7 days</MenuItem>
                                    <MenuItem value={"30days"}>Last 30 days</MenuItem>
                                </Select>
                            </FormControl>
                        </div>
                    </div>

                    <div className='w-full flex flex-row gap-7 mt-7 ml-2'>
                        <div className=' flex flex-col'>
                            <div style={{ fontSize: 13, fontWeight: "400", fontFamily: "inter" }}>Callers</div>
                            <div style={{ fontWeight: "300", fontFamily: "inter", fontSize: 32 }}>
                                {/* {numOfCallers(selectedDuration)} */}
                                {dashBoardData?.totalCalls}
                            </div>
                        </div>

                        <div className=' flex flex-col'>
                            <div style={{ fontSize: 13, fontWeight: "400", fontFamily: "inter" }}>Minutes</div>
                            <div className='w-full flex flex-row items-center'>
                                <div style={{ fontWeight: "300", fontFamily: "inter", fontSize: 32 }}>
                                    {/* {totalMin(selectedDuration)} */}
                                    {dashBoardData?.totalDurationMinutes}
                                </div>
                                {/* <div style={{ fontWeight: "300", fontFamily: "inter", fontSize: 15, color: "#00000080" }}>
                                    Mins
                                </div> */}
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
                                ${numOfCallers(selectedDuration)}
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
            </div>

            <div className='w-full mt-6 flex flex-row gap-2'>
                <div className='w-6/12 flex flex-col rounded-2xl px-6 pb-4' style={{ backgroundColor: "#ffffff50" }}>
                    <div className='mt-12 flex flex-row justify-between items-center'>
                        <div className='font-light'
                            style={{
                                fontSize: 20, fontWeight: "700", fontFamily: 'inter'
                            }}>Top Callers</div>
                        {
                            callersToDisplay.length > 3 && (
                                <button className='bg-purple text-white px-2 py-1'
                                    onClick={() => { setShowAlCallers(!showAllCallers) }}
                                    style={{
                                        borderRadius: "50px", fontSize: 13, fontWeight: "400", fontFamily: 'inter'
                                    }}>
                                    {showAllCallers ? "View less" : "View all"}
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


                    {/* {topCallers(selectedDuration) && topCallers(selectedDuration).length > 0 ? topCallers(selectedDuration).map((item) => (
                        <React.Fragment key={item.id}>
                            <div key={item.id} className='w-full flex flex-row justify-between mt-10'>
                                <div className='w-4/12'>
                                    <div style={styles.text2}>
                                        {item.name}
                                    </div>
                                </div>
                                <div className='w-3/12'>
                                <div style={styles.text2}>{item.city}</div>
                            </div>
                                <div className='w-3/12'>
                                    <div style={styles.text2}>{item.totalMinutes}</div>
                                </div>
                                <div className='w-2/12'>
                                    <div style={styles.text2}>{item.callCount}</div>
                                </div>
                                <div className='w-3/12 text-center'>
                                    <div style={styles.text2}>{item.totalSpent}</div>
                                </div>
                            </div>
                            <div className='w-full bg-gray-200 h-0.5 rounded mt-2'></div>
                        </React.Fragment>
                    )) : (
                        <div className='mt-3'> No callers</div>
                    )
                    } */}


                    {
                        callersLoader ?
                            <div className='w-full flex flex-row justify-center mt-4'>
                                <CircularProgress />
                            </div> :
                            <div>
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
                            </div>
                    }


                </div>
                <div className='w-4/12 flex flex-col rounded-2xl px-6 pb-4' style={{ backgroundColor: "#ffffff50" }}>
                    <div className='flex flex-row justify-between items-center mt-12'>
                        <div
                            style={{
                                fontSize: 20, fontWeight: "700", fontFamily: 'inter'
                            }}>Products</div>
                        <button
                            onClick={() => { setShowAlProductsl(!showAllProducts) }}
                            className='bg-purple text-white px-2 py-1'
                            style={{
                                borderRadius: "50px", fontSize: 13, fontWeight: "400", fontFamily: 'inter'
                            }}>
                            {showAllProducts ? "View less" : "View all"}
                        </button>
                    </div>
                    <div className='w-full flex flex-row gap-1 mt-5 justify-between'>
                        <div className='w-3/12'>
                            <div style={styles.text}>Product Name</div>
                        </div>
                        <div className='w-3/12'>
                            <div style={styles.text}>Amount</div>
                        </div>
                        <div className='w-3/12'>
                            <div style={styles.text}>Date</div>
                        </div>
                    </div>
                    {
                        callersLoader ?
                            <div className='w-full flex flex-row justify-center mt-4'>
                                <CircularProgress />
                            </div> :
                            <div>
                                {itemsToDisplay.map((item) => (
                                    // <React.Fragment key={item.id}>
                                    <>
                                        <div key={item.id} className='w-full flex flex-row gap-1 mt-10 justify-between'>
                                            <div className='w-3/12'>
                                                <div style={styles.text2}>{item.name}</div>
                                            </div>
                                            {/* <div className='w-4/12'>
                                    <div style={styles.text2}>{item.customer}</div>
                                </div> */}
                                            {/* <div className='w-2/12'>
                                <div style={styles.text2}>{item.city}</div>
                            </div> */}
                                            <div className='w-3/12'>
                                                <div style={styles.text2}>
                                                    ${Number(item.productPrice).toFixed(2)}
                                                </div>
                                            </div>
                                            <div className='w-3/12'>
                                                <div style={styles.text2}>
                                                    {/* {item.createdAt} */}
                                                    {moment(item.createdAt).format("MM/DD/YYYY")}
                                                </div>
                                            </div>
                                        </div>
                                        <div className='w-full bg-gray-200 h-0.5 rounded mt-2'></div>
                                        {/* </React.Fragment> */}
                                    </>
                                ))}
                            </div>
                    }
                </div>
            </div>


        </div>
    );
};

export default Dashboard;
