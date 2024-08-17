import React, { useEffect, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js'
import { CardCvcElement, CardExpiryElement, CardNumberElement, Elements, useElements, useStripe } from '@stripe/react-stripe-js';
// import { CardPostalCodeElement } from '@stripe/react-stripe-js';
import { Alert, Button, CircularProgress, Slide, Snackbar } from '@mui/material'
import { toast } from 'react-toastify'
import axios from 'axios'
import Image from 'next/image';
import Apis from '@/components/apis/Apis';
// import Apis from '../Apis/Apis';

const AddCardDetails = ({ handleBack, closeForm }) => {

    const handleBackClick = (e) => {
        e.preventDefault();
        handleBack();
    }

    const [addCardLoader, setAddCardLoader] = useState(false);
    const [addNumberErr, setAddNumberErr] = useState(false);
    const [addDateErr, setAddDateErr] = useState(false);
    const [cvcErr, setCvcErr] = useState(false);
    const [credentialsErr, setCredentialsErr] = useState(false);
    const [addCardSuccess, setAddCardSuccess] = useState(false);
    const [addCardFailure, setAddCardFailure] = useState(false);
    const [addCardDetails, setAddCardDetails] = useState(null);

    const elementOptions = {
        style: {
            base: {
                backgroundColor: '#EDEDEDC7',
                color: '#000000',
                fontSize: '18px',
                lineHeight: '40px',
                borderRadius: 10,
                padding: 10,
                '::placeholder': {
                    color: 'gray',
                },
            },
            invalid: {
                color: 'red',
            },
        },
    };

    //code for adding card api

    const stripeReact = useStripe();
    const elements = useElements();

    // useEffect(() => {})

    const handleAddCard = async (e) => {
        // Check if the event object is provided and prevent the default behavior
        setAddCardLoader(true);
        if (e && e.preventDefault) {
            e.preventDefault();
        }

        // Close the modal
        // handleClose4(e);
        // return
        if (!stripeReact || !elements) {
            return
        }

        const cardNumberElement = elements.getElement(CardNumberElement);

        stripeReact.createToken(cardNumberElement).then(async function (tok) {
            if (tok.error) {
                setCredentialsErr(true);
                toast.error(tok.error.code, {
                    position: "bottom-right",
                    pauseOnHover: true,
                    autoClose: 8000,
                    theme: "dark"
                });
            } else if (tok.token.id) {
                console.log("Token generating for card number :", tok.token.id)
                const tokenId = tok.token.id;
                let api = process.env.NEXT_PUBLIC_REACT_APP_ENVIRONMENT === "Development2" ? "https://bf59-119-156-82-235.ngrok-free.app" : "https://plurawlapp.com/plurawl";
                const ApiPath = Apis.addCard;
                const AddCardData = {
                    source: tokenId
                }
                try {
                    const LocalData = localStorage.getItem('User');
                    const D = JSON.parse(LocalData);
                    // console.log("Local data is", D);
                    const AuthToken = D.data.token;
                    console.log("Token for add card ", D.data.token);
                    // return
                    console.log('Data sending in api is :', AddCardData);
                    const response = await axios.post(ApiPath, AddCardData, {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': 'Bearer ' + AuthToken
                        }
                    });
                    if (response) {
                        console.log("Response of add card api is", response.data);
                    }
                    if (response.status === 200) {
                        // setAddCardDetails(response.data.message);
                        if (response.data.message === "Card not added") {
                            setAddCardFailure(true);
                        } else {
                            setAddCardSuccess(true);
                            closeForm();
                        }
                    }
                } catch (error) {
                    console.error("Error occured in adding user card api is :", error);
                } finally {
                    setAddCardLoader(false);
                }
            }
        })

    }

    return (
        <div style={{ width: '100%' }}>
            <div style={{ fontSize: 18, fontWeight: "500", fontFamily: "inter" }}>
                Add Card
            </div>
            <div className='mt-4'>
                <CardNumberElement
                    options={elementOptions}
                    style={{
                        width: '100%', padding: '8px', backgroundColor: 'black',
                        color: 'black', fontSize: '22px', border: '1px solid blue', borderRadius: '4px'
                    }} />
            </div>
            <div className='flex flex-row gap-2 w-full mt-4'>
                <div className='w-6/12'>
                    <CardExpiryElement
                        options={elementOptions}
                        style={{
                            width: '100%', padding: '8px',
                            color: 'white', fontSize: '22px', border: '1px solid blue', borderRadius: '4px'
                        }} />
                </div>
                <div className='w-6/12'>
                    <CardCvcElement
                        options={elementOptions}
                        style={{
                            width: '100%', padding: '8px',
                            color: 'white', fontSize: '22px', border: '1px solid blue', borderRadius: '4px'
                        }} />
                </div>
            </div>
            {/* <CardPostalCodeElement id="postal-code" options={elementOptions} /> */}
            <div className='w-full mt-6 flex justify-center'>
                {
                    addCardLoader ?
                        <div>
                            <CircularProgress size={30} />
                        </div> :
                        <div className='flex flex-row justify-end items-center mt-8 w-full'>
                            <div>
                                <button onClick={handleAddCard} className='bg-purple rounded px-8 text-white py-3' style={{ fontWeight: "400", fontSize: 15 }}>
                                    Continue
                                </button>
                            </div>
                        </div>
                }
            </div>
            <div>
                <Snackbar
                    open={credentialsErr}
                    autoHideDuration={3000}
                    onClose={() => {
                        setCredentialsErr(false)
                    }}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right'
                    }}
                    TransitionComponent={Slide}
                    TransitionProps={{
                        direction: 'left'
                    }}
                >
                    <Alert
                        onClose={() => {
                            setCredentialsErr(false)
                        }} severity="error"
                        sx={{ width: 'auto', fontWeight: '700', fontFamily: 'inter', fontSize: '22' }}>
                        Enter all Credientials.
                    </Alert>
                </Snackbar>
            </div>
            <div>
                <Snackbar
                    open={addCardFailure}
                    // autoHideDuration={3000}
                    onClose={() => {
                        setAddCardFailure(false)
                    }}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right'
                    }}
                    TransitionComponent={Slide}
                    TransitionProps={{
                        direction: 'left'
                    }}
                >
                    <Alert
                        onClose={() => {
                            setAddCardFailure(false)
                        }} severity="error"
                        sx={{ width: 'auto', fontWeight: '700', fontFamily: 'inter', fontSize: '22' }}>
                        {/* {addCardDetails} */}
                        Card not added
                    </Alert>
                </Snackbar>
            </div>
            <div>
                <Snackbar
                    open={addCardSuccess}
                    // autoHideDuration={3000}
                    onClose={() => {
                        setAddCardSuccess(false)
                    }}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right'
                    }}
                    TransitionComponent={Slide}
                    TransitionProps={{
                        direction: 'left'
                    }}
                >
                    <Alert
                        onClose={() => {
                            setAddCardSuccess(false)
                        }} severity="success"
                        sx={{ width: 'auto', fontWeight: '700', fontFamily: 'inter', fontSize: '22' }}>
                        {/* {addCardDetails} */}
                        Card added successfully
                    </Alert>
                </Snackbar>
            </div>
        </div>
    )
}

export default AddCardDetails