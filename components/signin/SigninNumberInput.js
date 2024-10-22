'use client';
import React, { useEffect, useRef, useState } from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { parsePhoneNumberFromString } from 'libphonenumber-js';

const SigninNumberInput = ({ fromSignIn, formatErr, phonenumber, autoFocus }) => {
    const inputElementRef = useRef(null);
    const [phone, setPhone] = useState('');
    const [focus, setFocus] = useState(false);
    const [countryCode, setCountryCode] = useState(''); // Default to US
    const [selectedCountry, setSelectedCountry] = useState(''); // Track the selected country
    const [error, setError] = useState('');
    const [data, setData] = useState(null);

    useEffect(() => {
        const localData = localStorage.getItem('formData');
        if (localData) {
            const Data = JSON.parse(localData);
            setPhone(Data.phonenumber);
        }
        console.log("Getting number check 1");
        const timer = setTimeout(() => {
            const SigninNumber = localStorage.getItem('SigninNumber');
            if (!localData) {
                if (SigninNumber) {
                    console.log("Getting number check 2");
                    const Number = JSON.parse(SigninNumber);
                    console.log("Sign in number is", JSON.parse(SigninNumber));
                    setPhone(Number);
                }
            }
        }, 300);
        return (() => clearTimeout(timer));
    }, []);

    useEffect(() => {
        if (typeof document !== 'undefined') {
            const handleVisibilityChange = () => {
                if (document.visibilityState === 'visible' && fromSignIn && autoFocus && inputElementRef.current) {
                    setTimeout(() => {
                        inputElementRef.current.focus();
                        console.log('Focus is set to true');
                    }, 1000);
                }
            };

            document.addEventListener('visibilitychange', handleVisibilityChange);

            return () => {
                document.removeEventListener('visibilitychange', handleVisibilityChange);
            };
        }
    }, []);

    useEffect(() => {
        const localLocation = localStorage.getItem('userLocation');
        if (localLocation) {
            let loc = JSON.parse(localLocation);
            if (typeof loc.countryCode !== 'undefined') {
                setCountryCode(loc.countryCode.toLowerCase());
            }
        }
    }, []);

    useEffect(() => {
        if (phone) {
            const timer = setTimeout(() => {
                validatePhoneNumber(phone, selectedCountry);
            }, 500);
            return () => clearTimeout(timer);
        }
    }, [phone, selectedCountry]);

    useEffect(() => {
        const LocalData = localStorage.getItem('route');
        if (LocalData) {
            const Data = JSON.parse(LocalData);
            setData(Data);
        }
    }, []);

    const getGeoLocation = () => {
        const localLocation = localStorage.getItem('userLocation');
        if (localLocation) {
            let loc = JSON.parse(localLocation);
            if (typeof loc.countryCode !== 'undefined') {
                setCountryCode(loc.countryCode.toLowerCase());
            } else {
                askLocation();
            }
        } else {
            askLocation();
        }
    }

    const askLocation = () => {
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
                        const locationData = {
                            state: data.principalSubdivision,
                            city: data.city || data.locality,
                            country: data.countryName,
                            countryCode: data.countryCode
                        };
                        localStorage.setItem('userLocation', JSON.stringify(locationData));
                    } catch (error) {
                        console.error('Error fetching location data:', error);
                    }
                },
                (error) => {
                    console.error('Error getting geolocation:', error);
                }
            );
        }
    }

    const validatePhoneNumber = (phone, countryCode) => {
        try {
            const phoneNumber = parsePhoneNumberFromString(`+${phone}`, countryCode.toUpperCase());
            if (!phoneNumber || !phoneNumber.isValid()) {
                formatErr('Enter valid phone number');
                return;
            } else {
                formatErr('');
            }
            phonenumber(phone); // Pass valid phone number up to parent
        } catch (error) {
            formatErr('Error occurred while formatting');
        }
    };

    return (
        <div className='w-full'>
            <PhoneInput
                country={countryCode}
                value={phone}
                onChange={(phone, countryData) => {
                    setPhone(phone);
                    setSelectedCountry(countryData.countryCode);
                    formatErr('');
                }}
                inputStyle={{
                    width: '100%',
                    fontSize: '16px',
                    borderRadius: '10px',
                    border: '#00000070',
                    paddingLeft: '60px',
                    height: 50,
                    backgroundColor: '#EDEDED',
                }}
                onFocus={() => {
                    // setFocus(true);
                    getGeoLocation();
                    console.log("On focus start")
                }}
                onBlur={() => {
                    console.log("On blur start")
                    // setFocus(true);
                }}
                containerStyle={{}}
                buttonStyle={{
                    background: 'transparent',
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
                    background: '#fff',
                }}
                flagStyle={{
                    display: 'none',
                }}
                countryCodeEditable={true}
                enableSearch={true}
                searchStyle={{
                    backgroundColor: 'transparent',
                }}
                inputProps={{
                    ref: inputElementRef,
                    autoFocus: autoFocus
                }}
            />

            <button
                onClick={() => {
                    if (inputElementRef.current) {
                        inputElementRef.current.focus();
                    }
                }}
                style={{ display: 'none' }} // Hide this button but keep it accessible
                aria-hidden="true"
            >
                Focus Input
            </button>


            <style jsx global>{`
                .flag-dropdown:hover .selected-flag {
                    background-color: transparent !important;
                }
                .flag-dropdown .selected-flag {
                    background-color: transparent !important;
                }
            `}</style>
        </div>
    )
}

export default SigninNumberInput;
