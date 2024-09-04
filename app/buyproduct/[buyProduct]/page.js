"use client"
import Apis from '@/components/apis/Apis';
import { Alert, Box, CircularProgress, Fade, Modal, Snackbar } from '@mui/material';
import axios from 'axios';
import Image from 'next/image';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const Page = () => {

    // const { buyProduct } = useSearchParams();
    const { buyProduct } = useParams();
    const router = useRouter();
    const [openBuyModal, setOpenBuyModal] = useState(true);
    const [productDetails, setProductDetails] = useState(null);
    const [buyProductLoader, setBuyProductLoader] = useState(false);
    const [buyProductSuccess, setBuyProductSuccess] = useState(null);
    const [allowBuy, setAllowBuy] = useState(false);

    useEffect(() => {
        console.log('Product i am buying id is', buyProduct);
        // console.log('Product i am buying details are', router);
    }, []);

    const ModalCss = {
        height: 'auto',
        bgcolor: 'transparent',
        p: 2,
        mx: 'auto',
        my: '50vh',
        transform: 'translateY(-50%)',
        borderRadius: 2,
        border: "none",
        outline: "none",
        // border: "2px solid green"
    };

    // useEffect(() => {
    //     const handleEvent = (event) => {
    //         console.log("Event received is", event.detail.message);
    //     }

    //     window.addEventListener('buyProduct', handleEvent);

    //     return () => {
    //         window.removeEventListener('buyProduct', handleEvent);
    //     };
    // }, []);

    useEffect(() => {
        const userLocalData = localStorage.getItem('User');
        if (userLocalData) {
            console.log("LocalData Exists");
        } else {
            console.log("LocalData does not exist");

            // Set a flag indicating that the user is coming from this logic
            const fromBuy = {
                status: false,
                id: buyProduct
            };
            localStorage.setItem('fromBuyScreen', JSON.stringify(fromBuy));

            // Set a flag to trigger the reload on the /tate page
            localStorage.setItem('needsReload', 'true');

            // Navigate to /tate
            router.push("/tate");
        }

        const productLocalData = localStorage.getItem('buyProductdata');
        const productData = JSON.parse(productLocalData);
        console.log("data received is", productData);
        setProductDetails(productData);
    }, []);



    const handleBuyProduct = async () => {
        const localData = localStorage.getItem("User");
        if (localData) {
            try {
                setBuyProductLoader(true);
                const Data = JSON.parse(localData);
                const AuthToken = Data.data.token;
                // const AuthToken = "afieglbjlhdfblsbhilhgkfnangieornkcvnlsjl";
                const ApiPath = Apis.BuyProduct;
                const ApiData = {
                    productId: buyProduct
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
                        // setOpenBuyProductDrawer(null);
                        setAllowBuy(true);
                        localStorage.removeItem('buyProductdata');
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


    const backgroundImage = {
        backgroundImage: 'url("/backgroundImage.png")', // Ensure the correct path
        backgroundSize: "cover",
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        width: '100%',
        height: '100vh',
    }


    return (
        <div className='w-full' style={backgroundImage}>
            <Modal
                open={openBuyModal}
                // onClose={(() => setOpenBuyModal(false))}
                closeAfterTransition
                BackdropProps={{
                    timeout: 1000,
                    sx: {
                        backgroundColor: 'transparent',
                        // backdropFilter: 'blur(40px)',
                    },
                }}
            >
                <Box className="lg:w-3/12 md:w-4/12 sm:w-6/12 w-8/12"
                    sx={ModalCss}
                >
                    <div className='w-full'>
                        <div className='flex flex-col w-full items-center justify-center' style={{ backgroundColor: 'white', padding: 20, borderRadius: 3, paddingBottom: 60 }}>
                            <div className='mt-10'>
                                <Image src="/assets/placeholderImg.jpg" alt='profile' height={60} width={60} />
                            </div>
                            <div className='mt-3' style={{ fontWeight: "400", fontFamily: "inter", fontSize: 15 }}>
                                {productDetails && productDetails.user.name}
                            </div>
                            <div className='mt-8' style={{ fontWeight: "500", fontFamily: "inter", fontSize: 18 }}>
                                {productDetails && productDetails.name}
                            </div>
                            <div className='mt-8' style={{ fontWeight: "700", fontFamily: "inter", fontSize: 28 }}>
                                ${productDetails && productDetails.productPrice}
                            </div>
                            <div>

                                {
                                    buyProductLoader ?
                                        <CircularProgress className='mt-4' size={20} /> :
                                        <div>
                                            {
                                                allowBuy ?
                                                    <button className='px-6 py-1 mt-10 bg-purple2' style={{ borderRadius: "50px", color: "white" }}>
                                                        Pay Now
                                                    </button> :
                                                    <button onClick={handleBuyProduct} className='px-6 py-1 mt-10 bg-purple' style={{ borderRadius: "50px", color: "white" }}>
                                                        Pay Now
                                                    </button>
                                            }
                                        </div>
                                }

                            </div>
                        </div>
                    </div>
                </Box>
            </Modal>

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
                    {
                        buyProductSuccess && buyProductSuccess.status === true ?
                            "Product purchased successfully." :
                            <div>
                                {buyProductSuccess && buyProductSuccess.message}
                            </div>
                    }
                </Alert>
            </Snackbar>
        </div>
    )
}

export default Page