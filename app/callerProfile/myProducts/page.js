"use client"
import React, { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Apis from '@/components/apis/Apis'
import axios from 'axios'
import { Alert, Box, CircularProgress, Drawer, Fade, Snackbar } from '@mui/material'
import moment from 'moment'
import { useRouter } from 'next/navigation'
import { AnimatePresence, motion } from 'framer-motion'
import zIndex from '@mui/material/styles/zIndex'
const Page = () => {

    const router = useRouter();

    const [callerDashboardData, setCallerDashboardData] = useState([]);
    const [buyedProducts, setBuyedProducts] = useState([]);
    const [openProducts, setOpenProducts] = useState([]);
    const [showAll, setShowAll] = useState(false);
    const itemsToDisplay = showAll ? buyedProducts : buyedProducts.slice(0, 3);
    const [openBuyProductDrawer, setOpenBuyProductDrawer] = useState(null);
    const [buyProductLoader, setBuyProductLoader] = useState(null);
    const [buyProductSuccess, setBuyProductSuccess] = useState(null);
    const [creatorsLoader, setCreatorsLoader] = useState(false);
    const [purchasedProductLoader, setPurchasedProductLoaderLoader] = useState(false);
    const [apiData, setApiData] = useState(false);
    const [opensearchBar, setOpensearchBar] = useState(false);
    const [searchValue, setsearchValue] = useState("");
    const [isOpen, setIsOpen] = useState(false);

    const handleClick = () => {
        setIsOpen(!isOpen);
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
            textOverflow: 'ellipsis',  // Add ellipsis for overflow text
            // border: "2px solid red"
        }
    }

    const products = [
        {
            id: 1,
            disc: '30 days transformation journey for the mind and body',
            price: "$400"
        },
        {
            id: 2,
            disc: '30 days transformation journey for the mind and body',
            price: "$400"
        },
        {
            id: 3,
            disc: '30 days transformation journey for the mind and body',
            price: "$400"
        },
    ]

    const productsDetails = [
        {
            id: 1,
            name: '30 days transformation journey for the mind and body',
            price: '$400',
            creator: 'Andrew Tate',
            date: '10/3/2007'
        },
        {
            id: 2,
            name: '30 days transformation journey for the mind and body',
            price: '$400',
            creator: 'Andrew Tate',
            date: '10/3/2007'
        },
        {
            id: 3,
            name: '30 days transformation journey for the mind and body',
            price: '$400',
            creator: 'Andrew Tate',
            date: '10/3/2007'
        },
    ]

    const getCallerDashoboard = async () => {
        const localData = localStorage.getItem("User");
        if (localData) {
            try {
                setCreatorsLoader(true);
                setPurchasedProductLoaderLoader(true);
                const Data = JSON.parse(localData);
                const AuthToken = Data.data.token;
                const ApiPath = Apis.CallerDashboard;
                const response = await axios.get(ApiPath, {
                    headers: {
                        'Authorization': 'Bearer ' + AuthToken,
                        'Content-Type': 'application/json'
                    }
                });
                if (response) {
                    console.log("Response of callerdashboard api is", response.data);
                    if (response.data.status === true) {
                        if (response.data.data === null) {
                            setApiData(true);
                            console.log("Api data set to true")
                        } else {
                            setCallerDashboardData(response.data.data.callersDashboardData);
                            console.log("Caller dashboard data recieved is")
                            setOpenProducts(response.data.data.callersDashboardData[0]);
                            setBuyedProducts(response.data.data.products);
                        }
                    } else {
                        console.log("Status is", response.data.message);
                        console.log("Status is", response.data.status);
                    }
                }
            } catch (error) {
                console.error("Eror ocured in api", error);

            }
            finally {
                setCreatorsLoader(false);
                setPurchasedProductLoaderLoader(false);
            }
        }
    }

    useEffect(() => {
        if (buyProductSuccess) {
            const timeout = setTimeout(() => {
                setBuyProductSuccess(null);
            }, 2000);
            return (() => clearTimeout(timeout))
        }
    }, [buyProductSuccess]);

    useEffect(() => {
        getCallerDashoboard();
    }, []);

    const handleBuyProduct = async (id) => {
        const localData = localStorage.getItem("User");
        if (localData) {
            try {
                setBuyProductLoader(true);
                const Data = JSON.parse(localData);
                const AuthToken = Data.data.token;
                // const AuthToken = "afieglbjlhdfblsbhilhgkfnangieornkcvnlsjl";
                const ApiPath = Apis.BuyProduct;
                const ApiData = {
                    productId: id
                }
                console.log("Id sending", ApiData);
                // return
                const response = await axios.post(ApiPath, ApiData, {
                    headers: {
                        'Authorization': 'Bearer ' + AuthToken,
                        'Content-Type': 'application/json'
                    }
                });
                if (response) {
                    console.log("Response of apis is", response.data);
                    setBuyProductSuccess(response.data);
                    if (response.data.status === true) {
                        setOpenBuyProductDrawer(null);
                    } else {
                        console.log("Status is", response.data.status);
                        console.log("No responce :", response.data.message);
                    }
                }
            } catch (error) {
                console.error("Error occured in api", error);
            } finally {
                setBuyProductLoader(false);

            }
        }
    }

    const handleBuyProductClick = (product) => {
        console.log("Product details are", product);
        // return
        localStorage.setItem('buyProductdata', JSON.stringify(product));
        window.open(`/buyproduct/${product.id}`, '_blank');
        // const event = new CustomEvent('buyProduct', {
        //     detail: {
        //         message: "Hello, this is a buy product event",
        //         productId: product.id
        //     }
        // });

        // console.log("Dispatching event", event);
        // window.dispatchEvent(event);
    }

    const handleOpenProducts = (item) => {
        setOpenProducts(item);
    }

    //code to filter data
    const filteredData = callerDashboardData.filter(item =>
        item.profile.name.toLowerCase().includes(searchValue.toLowerCase())
    );

    // useEffect(() => {
    //     if (filteredData && filteredData.length > 0) {
    //         // Set the first user's products if filteredData exists and is not empty
    //         setOpenProducts(filteredData[0]);
    //     } else {
    //         // Reset openProducts if there are no matching results
    //         setOpenProducts(null);
    //     }
    // }, [filteredData]);

    const updateRef = useRef(false);

    useEffect(() => {
        if (filteredData && filteredData.length > 0) {
            const currentItemExists = filteredData.some(item => item.profile.id === openProducts?.profile?.id);

            if (!currentItemExists && !updateRef.current) {
                setOpenProducts(filteredData[0]);
                updateRef.current = true; // Mark that we have just updated
            } else {
                updateRef.current = false; // Reset after update
            }
        } else {
            setOpenProducts(null);
        }
    }, [filteredData, openProducts]);


    return (
        <div className='h-screen w-full' style={{ backgroundColor: "#ffffff40", overflow: 'auto', scrollbarWidth: 0, }}>
            <div className='w-11/12 pe-4 lg:w-10/12 flex flex-col gap-2 pt-10 ps-2 lg:ps-10'>
                <div className='ps-8' style={{ fontSize: 20, fontWeight: 400, fontFamily: 'inter' }}>
                    Products
                </div>

                {
                    apiData ?
                        <div className='w-full p-8 rounded-xl flex flex-col justify-center mt-4'
                            style={{
                                fontWeight: '500', fontFamily: 'inter', fontSize: 22, textAlign: 'center',
                                backgroundColor: '#FFFFFF40', height: '20vh'
                            }}>
                            No Creator
                        </div> :
                        <div>
                            <div className='w-full flex flex-row p-4 rounded-xl' style={{ backgroundColor: "#ffffff40" }}>

                                <div className='w-6/12'>
                                    <div className='flex flex-row justify-between items-center px-4'>
                                        <div className='flex flex-col justify-center' style={{ height: 50, fontSize: 20, fontWeight: 400 }}>
                                            Creators
                                        </div>
                                        <AnimatePresence style={{ zIndex: 0 }}>
                                            {
                                                opensearchBar &&
                                                <motion.div
                                                    initial={{ opacity: 0, x: 20 }}
                                                    animate={{ opacity: 1, x: -10 }}
                                                    exit={{ opacity: 0, x: 20 }}
                                                    transition={{ duration: 0.3 }}
                                                    style={{
                                                        width: '70%',
                                                        marginRight: -80,
                                                        zIndex: 1
                                                        // border: '2px solid green'
                                                    }}
                                                >
                                                    <div className='w-full' style={{ zIndex: 1 }}>
                                                        <input className='w-full py-2 bg-transparent outline-none border-none px-4'
                                                            value={searchValue}
                                                            onChange={(e) => setsearchValue(e.target.value)}
                                                            placeholder='Search...'
                                                            style={{
                                                                fontSize: 15, fontFamily: 'inter',
                                                                border: '2px solid white', borderRadius: '50px'
                                                            }} />
                                                    </div>
                                                </motion.div>
                                            }
                                        </AnimatePresence>
                                        {
                                            opensearchBar ?
                                                <button onClick={() => setOpensearchBar(!opensearchBar)} className='outline-none border-none' style={{ zIndex: 2 }}>
                                                    <Image src="/assets/croseBtn.png" height={24} width={24} alt='search' />
                                                </button> :
                                                <button onClick={() => setOpensearchBar(!opensearchBar)} className='outline-none border-none'>
                                                    <Image src="/assets/searchIcon.png" height={24} width={24} alt='search' />
                                                </button>
                                        }

                                    </div>


                                    <div>
                                        {
                                            creatorsLoader ?
                                                <div className='mt-4 w-full flex flex-row justify-center'>
                                                    <CircularProgress size={30} />
                                                </div> :
                                                <div>
                                                    {
                                                        callerDashboardData === null ?
                                                            <div className='ms-4 mt-2' style={{ fontWeight: '500', fontFamily: 'inter', fontSize: 15, }}>
                                                                No creator
                                                            </div> :
                                                            <div style={{ maxHeight: '30vh', overflow: "auto", scrollbarWidth: "none" }}>
                                                                {
                                                                    filteredData.map((item) => (
                                                                        <div key={item.profile.id} className='w-full rounded-xl flex flex-row mt-2'
                                                                        // style={{ backgroundColor: "#FFFFFF30" }}
                                                                        >
                                                                            <button onClick={() => handleOpenProducts(item)}
                                                                                className='w-full flex flex-row gap-2 p-2'
                                                                                style={{ backgroundColor: openProducts === item ? '#ffffff69' : "transparent" }}>
                                                                                <div className='w-full flex flex-row gap-2' style={{ height: 'fit-content' }}>
                                                                                    {item.profile.profile_image ?
                                                                                        <Image src={item.profile.profile_image} alt='profile'
                                                                                            height={50} width={50} style={{ borderRadius: "50%", height: "fit-content" }}
                                                                                        /> :
                                                                                        <Image src="/assets/placeholderImg.jpg" alt='profile'
                                                                                            height={50} width={50} style={{ borderRadius: "50%", height: "fit-content" }}
                                                                                        />
                                                                                    }
                                                                                    <div className='flex flex-col' style={{ textAlign: "start" }}>
                                                                                        <div style={{ fontSize: 18, fontWeight: 400, fontFamily: 'inter', }}>
                                                                                            {item.profile.name}
                                                                                        </div>
                                                                                        <div style={{ fontSize: 14, fontWeight: 400, fontFamily: 'inter', color: '#00000090', }}>
                                                                                            {item.products.length} {
                                                                                                item.products.length < 2 ? "Product" : "Products"
                                                                                            }

                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </button>
                                                                        </div>
                                                                    ))
                                                                }
                                                            </div>
                                                    }
                                                </div>
                                        }
                                    </div>

                                </div>

                                <div className='w-6/12'>
                                    {
                                        openProducts &&
                                        <div className='w-full'>

                                            {
                                                openProducts === null || openProducts.length === 0 ?
                                                    <div className='mt-2'>

                                                    </div> :
                                                    <div>
                                                        <div className='w-full flex flex-col gap-5 px-4 pb-4'
                                                            style={{ maxHeight: "30vh", overflow: "auto", scrollbarWidth: "none", backgroundColor: "#ffffff69" }}>
                                                            {
                                                                openProducts.products.map((product) => (
                                                                    <div key={product.id} className='w-full flex flex-col'>
                                                                        <div className='flex flex-row justify-between items-start'>
                                                                            <div className='flex flex-col'>
                                                                                <div
                                                                                    style={{ fontSize: 13, fontWeight: "400", fontFamily: 'inter' }}>
                                                                                    {/* {item.disc} */}
                                                                                    {product.name}
                                                                                </div>
                                                                                <div style={{ fontSize: 20, fontWeight: "500", fontFamily: 'inter' }}>
                                                                                    {/* {item.price} */}
                                                                                    ${product.productPrice}
                                                                                </div>
                                                                            </div>

                                                                            {/* <button className='px-3'
                                                    onClick={() => {
                                                        console.log("Product sendding in api", product);
                                                        // return
                                                        // setOpenBuyProductDrawer(product);
                                                        // router.push(`/callerProfile/myProducts/${product.id}`);
                                                        console.log("product id is", product.id);
                                                        //add event listener here
                                                        const event = new CustomEvent('buyProduct', {
                                                            detail: {
                                                                message: "Hello, this is a buy product event"
                                                            }
                                                        });
                                                        window.dispatchEvent(event);
                                                        console.log("Event dispatched:", event);
                                                        console.log("Event added");
    
                                                        setTimeout(() => {
                                                            window.open(`/buyproduct/${product.id}`, '_blank');
                                                        }, 500);
    
                                                        return
                                                        window.open(`/buyproduct/${product.id}`, '_blank');
                                                    }}
                                                    style={{
                                                        color: 'white', backgroundColor: '#552AFF', borderRadius: 20, fontSize: 14,
                                                        paddingTop: "2px", paddingBottom: "2px"
                                                    }}>
                                                    Buy
                                                </button> */}

                                                                            <button className='px-3'
                                                                                onClick={() => {
                                                                                    handleBuyProductClick(product);
                                                                                }}
                                                                                style={{
                                                                                    color: 'white', backgroundColor: '#552AFF', borderRadius: 20, fontSize: 14,
                                                                                    paddingTop: "2px", paddingBottom: "2px"
                                                                                }}>
                                                                                Buy
                                                                            </button>


                                                                        </div>
                                                                    </div>
                                                                ))
                                                            }
                                                        </div>
                                                    </div>
                                            }
                                        </div>
                                    }
                                </div>

                            </div>

                            {/* buyedProducts === null && buyedProducts.length === 0 ? */}
                            <div>
                                {
                                    purchasedProductLoader ?
                                        <div className='w-full flex flex-row justify-center mt-6'>
                                            <CircularProgress size={30} />
                                        </div> :
                                        <div>
                                            {
                                                buyedProducts === null || buyedProducts.length < 1 ?
                                                    <div className='w-full p-8 rounded-xl flex flex-col justify-center mt-4'
                                                        style={{
                                                            fontWeight: '500', fontFamily: 'inter', fontSize: 22, textAlign: 'center',
                                                            backgroundColor: '#FFFFFF40', //height: '20vh'
                                                        }}>
                                                        No Products Purchased
                                                    </div> :
                                                    <div className='w-full p-8 mb-10 mt-4 rounded-xl' style={{ backgroundColor: '#FFFFFF40' }}>
                                                        <div className='w-full flex flex-row justify-between'>
                                                            <div style={{ fontSize: 18, fontWeight: 400, fontFamily: 'inter' }}>
                                                                Purchased Products
                                                            </div>
                                                            {
                                                                showAll ?
                                                                    <button
                                                                        onClick={() => setShowAll(false)}
                                                                        className='px-3 py-2'
                                                                        style={{ color: 'white', backgroundColor: '#552AFF', borderRadius: 20, fontSize: 14 }}>
                                                                        View Less
                                                                    </button> :
                                                                    <button
                                                                        onClick={() => setShowAll(true)}
                                                                        className='px-3 py-2'
                                                                        style={{ color: 'white', backgroundColor: '#552AFF', borderRadius: 20, fontSize: 14 }}>
                                                                        View All
                                                                    </button>
                                                            }
                                                        </div>

                                                        <div className='w-full flex flex-row justify-between mt-10' style={{
                                                            backgroundColor: '#ffffff40', paddingTop: 5, paddingBottom: 5, paddingLeft: 3
                                                        }}>
                                                            <div className='w-4/12'>
                                                                <div style={styles.text}>Name</div>
                                                            </div>
                                                            <div className='w-2/12 '>
                                                                <div style={styles.text}>Amount</div>
                                                            </div>
                                                            <div className='w-3/12'>
                                                                <div style={styles.text}>Creator</div>
                                                            </div>
                                                            <div className='w-2/12'>
                                                                <div style={styles.text}>Date</div>
                                                            </div>
                                                        </div>


                                                        <div className='w-full'>
                                                            {itemsToDisplay.map((item) => (
                                                                <div key={item.id}>
                                                                    <button className='w-full' //</>style={{}} onClick={() => { setOpen(item) }}
                                                                    >
                                                                        <div className='w-full flex flex-row justify-between mt-10' key={item.id}>
                                                                            <div className='w-4/12' style={{}}>
                                                                                <div className='lg:hidden' style={styles.text2}>
                                                                                    {item.name.slice(0, 6)}
                                                                                    {/* {item.name} */}
                                                                                </div>
                                                                                <div className='lg:flex hidden' style={styles.text2}>
                                                                                    {item.name}
                                                                                    {/* {item.name} */}
                                                                                </div>
                                                                            </div>
                                                                            <div className='w-2/12'>
                                                                                <div style={styles.text2}>
                                                                                    ${item.productPrice}
                                                                                </div>
                                                                            </div>
                                                                            <div className='w-3/12 '>
                                                                                <div style={styles.text2}>
                                                                                    {item.user.name}
                                                                                </div>
                                                                            </div>
                                                                            <div className='w-2/12'>
                                                                                <div style={styles.text2}>{moment(item.createdAt).format('MM/DD/YYYY')}</div>
                                                                            </div>
                                                                        </div>
                                                                        <div className='w-full h-0.5 rounded mt-2' style={{ backgroundColor: '#00000011' }}></div>
                                                                    </button>
                                                                </div>
                                                            ))}
                                                        </div>

                                                    </div>
                                            }
                                        </div>
                                }
                            </div>
                        </div>
                }

            </div>

            {/* Buy product drawer */}

            <Drawer
                open={!!openBuyProductDrawer}  // Convert to boolean to control the Drawer
                onClose={() => setOpenBuyProductDrawer(null)}
                anchor='right'
                sx={{ '& .MuiDrawer-paper': { width: '30%' } }}
            >
                <div className='pt-6 px-8' style={{ backgroundColor: "#ffffff70", height: "auto" }}>
                    <div className='flex flex-row w-full justify-between items-center'>
                        <div style={{ color: 'black', fontWeight: '400', fontSize: 15, fontFamily: 'inter' }}>
                            Product Details
                        </div>
                        <div>
                            <button onClick={() => setOpenBuyProductDrawer(null)}>
                                <Image src="/assets/crossBtn2.png" alt='cross' height={15} width={15} />
                            </button>
                        </div>
                    </div>

                    {openBuyProductDrawer &&
                        <div>
                            <div className='mt-6'>
                                Price :
                            </div>
                            <div
                                className='px-4 py-2 rounded-lg mt-2 flex flex-row gap-3 items-center'
                                style={{
                                    border: "1px solid #00000015",
                                }}
                            >
                                <div>
                                    <Image className='rounded' src="/us.jpg" alt='flag' height={20} width={40} />
                                </div>
                                <div>
                                    $ {openBuyProductDrawer.productPrice}
                                </div>
                            </div>

                            <div>
                                <div className='mt-5 w-full flex flex-row justify-between'>
                                    <div style={{ fontWeight: '500', fontFamily: 'inter', fontSize: 15 }}>
                                        {openBuyProductDrawer.name}
                                    </div>
                                    <div style={{ fontWeight: '400', fontFamily: 'inter', fontSize: 15 }}>
                                        USD {openBuyProductDrawer.productPrice}
                                    </div>
                                </div>
                                <div style={{ fontWeight: '400', fontFamily: 'inter', fontSize: 13 }}>
                                    Buy {openBuyProductDrawer.name}  $ {openBuyProductDrawer.productPrice}
                                </div>
                            </div>

                            <div className='w-full flex flex-row justify-center mt-12'>
                                {
                                    buyProductLoader ?
                                        <div className='w-full py-3 bg-purple flex flex-row justify-center'
                                            style={{ borderRadius: '50px' }}>
                                            <CircularProgress size={25} />
                                        </div> :
                                        <button
                                            onClick={() => {
                                                // handleBuyProduct(openBuyProductDrawer.id);
                                                router.push({
                                                    pathname: `/callerProfile/myProducts/${openBuyProductDrawer.id}`,
                                                    details: { openBuyProductDrawer }
                                                });
                                                console.log("product id is", openBuyProductDrawer.id);
                                            }}
                                            className='w-full py-3 w-10/12 bg-purple'
                                            style={{ fontWeight: '400', fontSize: 15, fontFamily: 'inter', color: 'white', borderRadius: '50px' }}>
                                            Buy
                                        </button>
                                }
                            </div>
                        </div>
                    }
                </div>
            </Drawer >

            <Snackbar
                open={buyProductSuccess}
                // autoHideDuration={3000}
                onClose={() => {
                    setBuyProductSuccess(null)
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
                        setBuyProductSuccess(null)
                    }} severity={buyProductSuccess && buyProductSuccess.status === true ? "success" : "error"}
                    sx={{ width: 'auto', fontWeight: '700', fontFamily: 'inter', fontSize: '22' }}>
                    {/* {addCardDetails} */}
                    {buyProductSuccess && buyProductSuccess.status === true ?
                        "Product purchased successfully." :
                        <div>
                            {buyProductSuccess && buyProductSuccess.message}
                        </div>}
                </Alert>
            </Snackbar>


        </div >
    )
}

export default Page