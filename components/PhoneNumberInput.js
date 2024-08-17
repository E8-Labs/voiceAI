'use client'
import React, { useEffect, useState } from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

const PhoneNumberInput = ({ phonenumber }) => {
    const [phone, setPhone] = useState('');
    const [focus, setFocus] = useState(false);
    const [countryCode, setCountryCode] = useState('us');
    const [error, setError] = useState(false);

    useEffect(() => {
        // Fetch the user's current location
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    const { latitude, longitude } = position.coords;
                    try {
                        const response = await fetch(
                            `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
                        );
                        const data = await response.json();
                        if (data.countryCode) {
                            setCountryCode(data.countryCode.toLowerCase());
                        }
                    } catch (error) {
                        console.error('Error fetching location data:', error);
                    }
                },
                (error) => {
                    console.error('Error getting geolocation:', error);
                }
            );
        }
    }, []);

    useEffect(() => {
        phonenumber(phone);
    }, [phone]);

    useEffect(() => {
        setError(false)
        setTimeout(() => {
            validatePhoneNumber()
        }, 3000);
        clearTimeout()
    }, [phone])

    const validatePhoneNumber = (phone) => {
        const phoneNumberPattern = /^\+[1-9]\d{1,14}$/;
        if (!phoneNumberPattern.test(`+${phone}`)) {
            setError(true);
        } else {
            setError(false);
        }
    };

    return (
        <div>
            <PhoneInput
                country={countryCode}
                value={phone}
                onChange={(phone) => {
                    setPhone(phone)
                    // validatePhoneNumber(phone);
                }}
                inputStyle={{
                    width: '100%',
                    height: '40px',
                    fontSize: '16px',
                    borderRadius: '4px',
                    border: focus ? '2px solid #00000080' : "1px solid #00000070",
                    paddingLeft: '60px',
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
            {/* {
                error ?
                    <div>
                        err
                    </div> :
                    <div>
                        no err
                    </div>
            } */}
        </div>
    );
};

export default PhoneNumberInput;
