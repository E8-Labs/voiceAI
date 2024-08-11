import React, { useState } from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

const PhoneNumberInput = () => {
    const [phone, setPhone] = useState('');
    // console.log("Phone number is", phone);


    return (
        <PhoneInput
            country={'us'}
            value={phone}
            onChange={(phone) => setPhone(phone)}
            inputStyle={{
                width: '100%',
                height: '40px',
                fontSize: '16px',
                borderRadius: '4px',
                border: '1px solid #00000000',
                paddingLeft: '60px', // Adjust padding to make room for country code
                backgroundColor: "#EDEDEDC7",
                height: 50
            }}
            containerStyle={{
                marginBottom: '15px',
            }}
            buttonStyle={{
                background: '#EDEDEDC7', // No background for the button
                border: 'none', // No border for the button
                marginRight: '-38px', // Align the dropdown toggle with the input
                zIndex: 10, // Ensure the button is clickable
            }}
            dropdownStyle={{
                marginTop: '5px',
                zIndex: 20,
            }}
            flagStyle={{
                display: 'none', // Hide the flag completely
            }}
            countryCodeEditable={false} // Make the country code uneditable
            enableSearch={true} // Allow searching in the dropdown
        />
    );
};

export default PhoneNumberInput;
