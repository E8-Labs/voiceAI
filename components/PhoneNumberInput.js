'use client'
import React, { useEffect, useState } from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

const PhoneNumberInput = ({ phonenumber, myCallerAccount }) => {
    const [phone, setPhone] = useState('');
    const [focus, setFocus] = useState(false);
    const [countryCode, setCountryCode] = useState('us');
    const [error, setError] = useState(false);
    const [data, setData] = useState(null);

    useEffect(() => {
        const localData = localStorage.getItem('formData');
        if (localData) {
            const Data = JSON.parse(localData);
            const timeOut = setTimeout(() => {
                setPhone(Data.phonenumber);
            }, 1500);
            return () => clearTimeout(timeOut);
        }

        const timeOut = setTimeout(() => {
            const localData = localStorage.getItem('User');
            if (localData) {
                const Data = JSON.parse(localData);
                if (Data.data.user.phone) {
                    console.log("Receiving number", Data.data.user.phone);
                    setPhone(Data.data.user.phone);
                }
            }
        }, 1500);
        return () => clearTimeout(timeOut);
    }, []);

    // Fetch user's current location
    useEffect(() => {
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

    // Update phone number in parent component
    useEffect(() => {
        phonenumber(phone);
    }, [phone, phonenumber]);

    // Validate phone number with a timeout
    useEffect(() => {
        if (phone) {
            const timer = setTimeout(() => {
                validatePhoneNumber(phone);
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [phone]);

    // Only run once to fetch local data
    useEffect(() => {
        const LocalData = localStorage.getItem('route');
        const Data = JSON.parse(LocalData);
        console.log("Data from localstorage", Data);

        setData(Data);
    }, []);

    const validatePhoneNumber = (phone) => {
        const phoneNumberPattern = /^\+[1-9]\d{1,14}$/;
        if (!phoneNumberPattern.test(`+${phone}`)) {
            setError(true);
        } else {
            setError(false);
        }
    };

    return (
        <div className='w-full'>
            <PhoneInput
                country={countryCode}
                value={phone}
                onChange={(phone) => setPhone(phone)}
                inputStyle={{
                    width: '100%',
                    fontSize: '16px',
                    borderRadius: '10px',
                    border: '#00000070',
                    paddingLeft: '60px',
                    height: 50,
                    backgroundColor: myCallerAccount ? 'transparent' : '#EDEDED',
                }}
                onFocus={() => setFocus(true)}
                onBlur={() => setFocus(false)}
                containerStyle={{
                    marginBottom: '15px',
                }}
                buttonStyle={{
                    background: 'transparent', // Make button background transparent
                    border: 'none',
                    marginRight: '-38px',
                    zIndex: 10,
                    outline: 'none',
                    boxShadow: 'none',
                    cursor: 'pointer',
                }}
                dropdownStyle={{
                    marginTop: '5px',
                    zIndex: 20,
                    background: '#fff', // Dropdown menu background
                }}
                flagStyle={{
                    display: 'none',
                }}
                countryCodeEditable={true}  // Allow users to edit country code
                enableSearch={true}
                searchStyle={{
                    backgroundColor: 'transparent',
                }}
            />

            {/* Add CSS for hover effect */}
            <style jsx global>{`
                .flag-dropdown:hover .selected-flag {
                    background-color: transparent !important;  // Make hover background transparent
                }
                .flag-dropdown .selected-flag {
                    background-color: transparent !important;  // Make the default background transparent
                }
            `}</style>
        </div>
    );
};

export default PhoneNumberInput;
