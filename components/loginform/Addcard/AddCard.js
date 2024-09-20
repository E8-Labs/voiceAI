import React, { useState } from 'react'
import { loadStripe } from '@stripe/stripe-js'
import { CardCvcElement, CardExpiryElement, CardNumberElement, Elements, useElements, useStripe } from '@stripe/react-stripe-js'
import { Button } from '@mui/material'
import { toast } from 'react-toastify'
import axios from 'axios'
import AddCardDetails from './AddCardDetails'

let stripePublickKey = process.env.NEXT_PUBLIC_REACT_APP_ENVIRONMENT === "Production" ? process.env.NEXT_PUBLIC_REACT_APP_STRIPE_PUBLISHABLE_KEY_LIVE : process.env.NEXT_PUBLIC_REACT_APP_STRIPE_PUBLISHABLE_KEY;
console.log("Public key is ", stripePublickKey)
const stripePromise = loadStripe(stripePublickKey);


const AddCard = ({ handleSubLoader, handleBack, closeForm, handleContinue, handleSubscribePlan, stop, getcardData, selectedPlan, handleBuilScriptContinue }) => {

    return (
        <Elements stripe={stripePromise}>
            <AddCardDetails
                closeForm={closeForm} handleContinue={handleContinue} selectedPlan={selectedPlan}
                handleSubscribePlan={handleSubscribePlan} stop={stop} getcardData={getcardData}
                handleSubLoader={handleSubLoader} handleBuilScriptContinue={handleBuilScriptContinue}
                />
        </Elements>
    )
}

export default AddCard
