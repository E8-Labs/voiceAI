'use client'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Apis from '@/components/apis/Apis'
import axios from 'axios'
import { Alert, Box, Button, CircularProgress, Fade, Menu, MenuItem, Modal, Snackbar } from '@mui/material'
import { Elements } from '@stripe/react-stripe-js'
import AddCardDetails from '@/components/loginform/Addcard/AddCardDetails'
import { loadStripe } from '@stripe/stripe-js'

const Page = () => {

    let stripePublickKey = process.env.NEXT_PUBLIC_REACT_APP_ENVIRONMENT === "Production" ? process.env.NEXT_PUBLIC_REACT_APP_STRIPE_PUBLISHABLE_KEY_LIVE : process.env.NEXT_PUBLIC_REACT_APP_STRIPE_PUBLISHABLE_KEY;
    //console.log("Public key is ", stripePublickKey)
    const stripePromise = loadStripe(stripePublickKey);

    const [defaultCart, setDefaultCard] = useState("");
    const [paymentHistory, setPaymentHistory] = useState([]);
    const [cardsListData, setCardsListData] = useState([]);
    const [cardLoader, setCardLoader] = useState(false);
    const [invoiceLoader, setInvoiceLoader] = useState(false);
    const [addCardPopup, setAddCardPopup] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const [makeDefaultCardLoader, setMakeDefaultCardLoader] = useState(null);
    const [snackMessage, setSnackMessage] = useState(false);
    const [DelCardLoader, setDelCardLoader] = useState(false);
    const [cardSuccess, setCardSuccess] = useState(false);

    const handleClosePopup = (e) => {
        setAddCardPopup(e);
        setCardSuccess(true);
        getCards();
    }

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
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis'
        },
        backgroundImage: {
            backgroundImage: 'url("/assets/cardImage.png")',
            backgroundSize: "cover",
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            // width: 550,
            // height: 150,
            borderRadius: 10,
            color: 'white'
        }
    }

    const styleAddCardPopup = {
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



    const getInvoicesDetails = async () => {
        const localData = localStorage.getItem('User');
        if (localData) {
            try {
                setInvoiceLoader(true);
                const Data = JSON.parse(localData);
                const AuthToken = Data.data.token;
                console.log("Authtoken is", AuthToken);
                const ApiPath = Apis.CallerInvoices;
                console.log("Api Path iis", ApiPath);
                const response = await axios.get(ApiPath, {
                    headers: {
                        "Authorization": "Bearer " + AuthToken
                    }
                });

                if (response) {
                    if (response.data.status === true) {
                        console.log("Response is", response.data.data);
                        setPaymentHistory(response.data.data);
                    } else {
                        console.log("Not recieved data", response.data.message)
                        console.log("Status is", response.data.status);
                    }
                }
            } catch (error) {
                console.error("Error occured in api", error);
            } finally {
                setInvoiceLoader(false);
            }

        }
    }

    const getCards = async () => {
        const localData = localStorage.getItem('User');
        if (localData) {
            try {
                setCardLoader(true);
                const Data = JSON.parse(localData);
                const AuthToken = Data.data.token;
                // console.log("Authtoken is", AuthToken);
                const ApiPath = Apis.GetCardList;
                console.log("Api Path iis", ApiPath);
                const response = await axios.get(ApiPath, {
                    headers: {
                        "Authorization": "Bearer " + AuthToken
                    }
                });

                if (response) {
                    console.log("Response of get cards is", response.data.data);
                    setCardsListData(response.data.data);
                }
            } catch (error) {
                console.error("Error occured in getcards api", error);
            } finally {
                setCardLoader(false);
            }

        }
    }

    useEffect(() => {
        getInvoicesDetails();
        getCards();
    }, []);

    useEffect(() => {
        if (snackMessage) {
            const timeout = setTimeout(() => {
                setSnackMessage(null);
            }, 2000);
            return (() => clearTimeout(timeout));
        }
    }, [snackMessage])

    const handleOpenPdf = async (url) => {
        window.open(url, '_blank');
    }

    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleMakeDefaultCard = async (id) => {
        console.log("Card id is", id);
        const localData = localStorage.getItem('User');
        if (localData) {
            try {
                setMakeDefaultCardLoader(id);
                const Data = JSON.parse(localData);
                // const AuthToken = "sfdhiuhkajviqnlgh";
                const AuthToken = Data.data.token;
                // console.log("Authtoken is", AuthToken);
                const ApiPath = Apis.makeDefaultCard;
                console.log("Api Path iis", ApiPath);
                const formData = new FormData();
                formData.append('cardId', id);
                const response = await axios.post(ApiPath, formData, {
                    headers: {
                        'Authorization': 'Bearer ' + AuthToken
                    }
                });
                if (response) {
                    if (response.data.status === true) {
                        console.log("response of api", response.data);
                        setSnackMessage(response.data);
                        getCards();
                        handleClose();
                    } else {
                        setSnackMessage(response.data)
                    }
                }
            } catch (error) {
                console.error("Error occured in api", error);
            } finally {
                setMakeDefaultCardLoader(null);
            }
        }
    }

    const handleDeleteCard = async (cardId) => {
        console.log("Card id is", cardId);
        const localData = localStorage.getItem('User');
        if (localData) {
            setDelCardLoader(true);
            try {
                const Data = JSON.parse(localData);
                const ApiPath = Apis.DeleteCard;
                // const AuthToken = "sfdhiuhkajviqnlgh";
                const AuthToken = Data.data.token;
                // console.log("Authtoken is", AuthToken);
                const cardData = {
                    cardId: cardId
                }
                console.log("Card is sending in api", cardData);
                // return
                const response = await axios.post(ApiPath, cardData, {
                    headers: {
                        'Authorization': 'Bearer ' + AuthToken,
                        'Content-Type': 'application/json'
                    }
                });
                if (response.data) {
                    if (response.data.status === true) {
                        getCards();
                        handleClose();
                    } else {
                        console.log("Error occurd in api", response.data.message);
                    }
                }
            } catch (error) {
                console.error("Error occured in delete card api", error);
            } finally {
                setDelCardLoader(false);
            }
        }
    }


    return (
        <div className='h-screen w-full' style={{ backgroundColor: "#ffffff40", overflow: 'hidden', scrollbarWidth: 0, }}>
            <div className='w-11/12 pe-4 lg:w-9/12 flex flex-col gap-2 pt-10 ps-4 lg:ps-10'>


                <div className='w-full p-5 rounded-xl'
                    style={{ backgroundColor: "#FFFFFF40" }}
                >

                    <div className='flex flex-row justify-between items-center'>
                        <div style={{ fontSize: 20, fontWeight: 400, fontFamily: 'inter', paddingLeft: 10 }}>
                            Payment Method
                        </div>
                        <button onClick={() => setAddCardPopup(true)} className='text-purple underline' style={{ fontWeight: '400', fontFamily: 'inter', fontSize: 15 }}>
                            Add New
                        </button>
                    </div>
                    <div className='w-full flex flex-row gap-3 mt-4' style={{
                        // paddingLeft: 10,
                        overflowX: "auto",
                        whiteSpace: "nowrap",
                        scrollbarWidth: 'none'
                    }}>
                        {
                            cardLoader ?
                                <div className='mt-4 w-full flex flex-row justify-center'>
                                    <CircularProgress size={35} />
                                </div> :
                                <div className='w-full flex flex-row gap-3 mt-4' style={{
                                    // paddingLeft: 10,
                                    // overflowX: "auto",
                                    // whiteSpace: "nowrap",
                                    // scrollbarWidth: 'none'
                                }}>
                                    {
                                        cardsListData === null || cardsListData.length === 0 ?
                                            <div className='w-full' style={{ textAlign: 'center', marginTop: 20, fontWeight: '500', fontSize: 15, fontFamily: 'inter' }}>
                                                No Payment Source Added
                                            </div> :
                                            <div className='w-full flex flex-row gap-3 mt-4' style={{
                                                paddingLeft: 10,
                                                overflowX: "auto",
                                                whiteSpace: "nowrap",
                                                scrollbarWidth: 'none',
                                                // border: "2px solid red"
                                            }}>
                                                {
                                                    cardsListData.map((item) => (
                                                        <div className='flex flex-row gap-4' key={item.id}>
                                                            <div className='flex flex-col justify-between p-5 lg:w-[300px] lg:h-[150px]' style={styles.backgroundImage}>
                                                                <div className=''>
                                                                    <div className='w-full flex flex-row justify-between items-end'>
                                                                        <div style={{ fontSize: 14, fontWeight: 400, fontFamily: 'inter' }}>
                                                                            **** **** **** {item.last4}
                                                                        </div>
                                                                        <button
                                                                            id="basic-button"
                                                                            aria-controls={open ? 'basic-menu' : undefined}
                                                                            aria-haspopup="true"
                                                                            aria-expanded={open ? 'true' : undefined}
                                                                            onClick={handleClick}
                                                                            style={{ fontSize: 20, fontWeight: "900", }}>
                                                                            <Image className='lg:flex hidden' src="/3dot.png" height={10} width={30} alt='3dot' />
                                                                            <div className='lg:hidden' style={{ fontSize: 20, fontWeight: "900", }}>...</div>
                                                                        </button>
                                                                    </div>
                                                                    <Menu
                                                                        id="basic-menu"
                                                                        anchorEl={anchorEl}
                                                                        open={open}
                                                                        onClose={handleClose}
                                                                        MenuListProps={{
                                                                            'aria-labelledby': 'basic-button',
                                                                        }}
                                                                        anchorOrigin={{
                                                                            vertical: 'bottom',
                                                                            horizontal: 'right',
                                                                        }}
                                                                        transformOrigin={{
                                                                            vertical: 'top',
                                                                            horizontal: 'right',
                                                                        }}
                                                                        sx={{
                                                                            '& .MuiPaper-root': {
                                                                                boxShadow: 'none', // Remove the shadow
                                                                                // paddingTop: "0px", paddingBottom: "0px",
                                                                            },
                                                                        }}
                                                                    >
                                                                        <MenuItem className='py-'
                                                                            style={{ fontWeight: '400', fontFamily: 'Inter', fontSize: 13, color: "#FF124B" }}>
                                                                            <button onClick={() => handleDeleteCard(item.id)}>
                                                                                {
                                                                                    DelCardLoader ?
                                                                                        <CircularProgress size={25} /> :
                                                                                        "Delete"
                                                                                }
                                                                            </button>
                                                                        </MenuItem>
                                                                    </Menu>
                                                                    <div style={{ fontSize: 12, fontWeight: 400, fontFamily: 'inter' }}>
                                                                        Expiry {item.exp_month} / {item.exp_year}
                                                                    </div>
                                                                </div>
                                                                <div className='w-full flex flex-row justify-between items-end'>
                                                                    {
                                                                        item.isDefault === true ? (
                                                                            <div style={{ fontSize: 12, fontWeight: 400, fontFamily: 'inter' }}>
                                                                                Default Card
                                                                            </div>
                                                                        ) : (
                                                                            <div></div>
                                                                        )
                                                                    }
                                                                    <div>
                                                                        {
                                                                            item.isDefault === true ? (
                                                                                <Image src='/assets/selectedCircle.png' alt='icon'
                                                                                    height={18} width={18} style={{ objectFit: 'contain' }}
                                                                                />
                                                                            ) : (
                                                                                <div>
                                                                                    {
                                                                                        makeDefaultCardLoader === item.id ?
                                                                                            <CircularProgress size={15} sx={{ color: "blue" }} /> :
                                                                                            <button
                                                                                                onClick={() => {
                                                                                                    handleMakeDefaultCard(item.id)
                                                                                                }}
                                                                                                style={{
                                                                                                    height: 18, width: 18, borderRadius: '50%',
                                                                                                    border: "1px solid #ffffff"
                                                                                                }} />
                                                                                    }
                                                                                </div>
                                                                            )
                                                                        }
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                    ))
                                                }
                                            </div>
                                    }
                                </div>
                        }
                    </div>
                    <div className='w-full rounded-xl px-2 py-2 lg:p-8 mt-6' style={{ backgroundColor: '#ffffff60', maxHeight: '60vh', overflow: "auto", scrollbarWidth: "none" }}>
                        <div style={{ fontSize: 20, fontWeight: 400, fontFamily: 'inter', }}>
                            Payment History
                        </div>
                        <div className='w-full flex flex-row justify-between mt-5 gap-2 lg:flex hidden'>
                            <div className='w-3/12 lg:w-2/12'>
                                <div style={styles.text}>ID</div>
                            </div>
                            <div className='w-2/12 lg:w-2/12 '>
                                <div style={styles.text}>Purchases</div>
                            </div>
                            <div className='lg:flex hidden lg:w-2/12 '>
                                <div style={styles.text}>Creator</div>
                            </div>
                            <div className='w-2/12 lg:w-2/12'>
                                <div style={styles.text}>Amount</div>
                            </div>
                            <div className='w-3/12 lg:w-2/12'>
                                <div style={styles.text}>Date</div>
                            </div>
                            {/* <div className='w-3/12 lg:w-2/12'>
                                <div style={styles.text}>Action</div>
                            </div> */}
                        </div>
                        {
                            invoiceLoader ?
                                <div className='w-full mt-12 flex justify-center'>
                                    <CircularProgress size={35} />
                                </div> :
                                <div>
                                    {
                                        paymentHistory === null || paymentHistory.length === 0 ?
                                            <div className='w-full' style={{ textAlign: 'center', marginTop: 20, fontWeight: '500', fontSize: 15, fontFamily: 'inter' }}>
                                                No Payment History
                                            </div> :
                                            <div>
                                                <div className='lg:flex hidden flex-col'>
                                                    {paymentHistory.map((item) => (
                                                        <div>
                                                            {/* <button className='w-full' //</>style={{}} onClick={() => { setOpen(item) }}> */}
                                                            <div className='flex flex-col gap-2'>
                                                                <div className='w-full flex flex-row justify-between mt-10 gap-2' key={item.invoice_id}>
                                                                    <div className='w-3/12 lg:w-2/12'>
                                                                        <div style={styles.text2}>
                                                                            {item.payment_intent_id}
                                                                        </div>
                                                                    </div>
                                                                    <div className='w-2/12 lg:w-2/12'>
                                                                        <div style={styles.text2}>
                                                                            {item.product_name}
                                                                        </div>
                                                                    </div>
                                                                    <div className='lg:flex hidden lg:w-2/12 ms-2'>
                                                                        <div style={styles.text2}>
                                                                            {item.creatorName}
                                                                        </div>
                                                                    </div>
                                                                    <div className='w-2/12 lg:w-2/12 ms-2'>
                                                                        <div style={styles.text2}>
                                                                            ${item.payment_amount}
                                                                        </div>
                                                                    </div>
                                                                    <div className='w-3/12 lg:w-2/12'>
                                                                        <div style={styles.text2}>
                                                                            {item.payment_date}
                                                                        </div>
                                                                    </div>
                                                                    {/* <div className='w-2/12'>
                                                                <button onClick={() => handleOpenPdf(item.pdf_url)} style={{
                                                                    fontSize: 12, textDecoration: 'underline', fontWeight: 400, fontFamily: 'inter',
                                                                    color: '#2548FD'
                                                                }}>
                                                                    PDF
                                                                </button>
                                                            </div> */}
                                                                </div>
                                                            </div>
                                                            <div className='w-full h-0.5 rounded mt-2' style={{ backgroundColor: '#00000011' }}></div>
                                                            {/* </button> */}
                                                        </div>
                                                    ))}
                                                </div>

                                                <div className='lg:hidden' style={{ height: '45vh' }}>
                                                    {paymentHistory.map((item) => (
                                                        <div
                                                            key={item.invoice_id}
                                                            className='px-2 py-1 rounded w-full lg:hidden mt-4'
                                                            style={{ border: '1px solid #00000020' }}>
                                                            <div>
                                                                <div style={{ fontWeight: '600', fontFamily: 'inter', fontSize: '18' }}>
                                                                    Name
                                                                </div>
                                                                <div
                                                                    className='w-full flex flex-row justify-between'
                                                                    style={{ fontWeight: '400', fontFamily: 'inter', fontSize: '15' }}>
                                                                    <div>
                                                                        {item.product_name}
                                                                    </div>
                                                                    <div style={{ fontWeight: '600', fontFamily: 'inter', fontSize: '15' }}>
                                                                        ${item.payment_amount}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div>
                                                                <div className='mt-1' style={{ fontWeight: '600', fontFamily: 'inter', fontSize: '18' }}>
                                                                    Creator
                                                                </div>
                                                                <div className='w-full flex flex-row justify-between'>
                                                                    <div>
                                                                        {item.creatorName}
                                                                    </div>
                                                                    <div style={{ fontWeight: '600', fontFamily: 'inter', fontSize: '15' }}>
                                                                        {item.payment_date}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className='mt-1' style={{ fontWeight: '600', fontFamily: 'inter', fontSize: '18' }}>
                                                                Product Id
                                                            </div>
                                                            <div
                                                                style={{ ...styles.text2, fontWeight: '400', fontFamily: 'inter', fontSize: '15' }}>
                                                                {item.payment_intent_id}
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
            </div>

            {/* Modal to add card */}
            <Modal
                open={addCardPopup}
                onClose={(() => setAddCardPopup(false))}
                closeAfterTransition
                BackdropProps={{
                    timeout: 1000,
                    sx: {
                        backgroundColor: 'transparent',
                        backdropFilter: 'blur(40px)',
                    },
                }}
            >
                <Box className="lg:w-5/12 sm:w-7/12"
                    sx={styleAddCardPopup}
                >
                    <div className='flex flex-row justify-center'>
                        <div className='w-9/12' style={{ backgroundColor: "#ffffff23", padding: 20, borderRadius: 5 }}>
                            {/* <AddCard handleBack={handleBack} closeForm={closeForm} /> */}
                            <div style={{ backgroundColor: 'white', padding: 18, borderRadius: 5 }}>
                                <Elements stripe={stripePromise}>
                                    <AddCardDetails
                                        fromMYPlansScreen={true}
                                        closeAddCardPopup={handleClosePopup}
                                    />
                                </Elements>
                            </div>
                        </div>
                    </div>
                    {/* <LoginModal creator={creator} assistantData={getAssistantData} closeForm={setOpenLoginModal} /> */}
                </Box>
            </Modal>

            {/* snack messages */}
            <Snackbar
                open={snackMessage}
                // autoHideDuration={3000}
                onClose={() => {
                    setSnackMessage(null)
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
                        setSnackMessage(null);
                    }} severity={snackMessage && snackMessage.status === true ? "success" : "error"}// "error"
                    sx={{ width: 'auto', fontWeight: '700', fontFamily: 'inter', fontSize: '22' }}>
                    {/* {addCardDetails} */}
                    {
                        snackMessage && snackMessage.status === true ?
                            <div style={{ width: 'auto', fontWeight: '700', fontFamily: 'inter', fontSize: '22' }}>
                                Card set as default
                            </div> :
                            <div style={{ width: 'auto', fontWeight: '700', fontFamily: 'inter', fontSize: '22' }}>
                                {snackMessage && snackMessage.message}
                            </div>
                    }
                </Alert>
            </Snackbar>

            {/* add card success */}

            <Snackbar
                open={cardSuccess}
                // autoHideDuration={3000}
                onClose={() => {
                    setCardSuccess(false);
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
                        setCardSuccess(false);
                    }} severity="success"
                    sx={{ width: 'auto', fontWeight: '700', fontFamily: 'inter', fontSize: '22' }}>
                    {/* {addCardDetails} */}
                    Card added successfully
                </Alert>
            </Snackbar>

        </div>

    )
}

export default Page;