'use client'
import React, { useEffect, useState } from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

const PhoneNumberInput = ({ phonenumber }) => {
    const [phone, setPhone] = useState('');
    const [focus, setFocus] = useState(false);
    // console.log("Phone number is", phone);

    useEffect(() => {
        phonenumber(phone)
    }, [phone])


    return (
        <PhoneInput
            country={''}
            value={phone}
            onChange={(phone) => setPhone(phone)}
            inputStyle={{
                width: '100%',
                height: '40px',
                fontSize: '16px',
                borderRadius: '4px',
                border: focus ? '2px solid #00000080' : "1px solid #00000070",
                paddingLeft: '60px',
                backgroundColor: "#EDEDEDC7",
                height: 50
            }}
            onFocus={() => setFocus(true)}
            onBlur={() => setFocus(false)}
            containerStyle={{
                marginBottom: '15px',
            }}
            buttonStyle={{
                background: '#ffffff00',
                border: 'none',
                marginRight: '-38px',
                zIndex: 10,
                outline: 'none',
                boxShadow: 'none',
            }}
            dropdownStyle={{
                marginTop: '5px',
                zIndex: 20,
            }}
            flagStyle={{
                display: 'none',
            }}
            countryCodeEditable={false}
            enableSearch={true}
        />
    );
};

export default PhoneNumberInput;
