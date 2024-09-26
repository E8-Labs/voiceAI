"use client";
import React, { useEffect, useRef, useState } from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { parsePhoneNumberFromString } from 'libphonenumber-js';

const SigninNumberInput = ({ fromSignIn, formatErr, phonenumber, autoFocus }) => {
    const inputElementRef = useRef(null);
    const [phone, setPhone] = useState('');
    const [countryCode, setCountryCode] = useState(''); // Default to US
    const [selectedCountry, setSelectedCountry] = useState(''); // Track the selected country

    useEffect(() => {
        const localData = localStorage.getItem('formData');
        if (localData) {
            const Data = JSON.parse(localData);
            setPhone(Data.phonenumber);
        }
    }, []);

    useEffect(() => {
        if (fromSignIn && autoFocus && inputElementRef.current) {
            const timer = setTimeout(() => {
                // Scroll into view before focusing
                inputElementRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
                inputElementRef.current.focus({ preventScroll: true });
                console.log('Focus set after scroll');
            }, 500); // Slight delay to ensure component is rendered
            return () => clearTimeout(timer);
        }
    }, [fromSignIn, autoFocus]);

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
                    getGeoLocation();
                    console.log("On focus start");
                }}
                onBlur={() => {
                    console.log("On blur start");
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
                    autoFocus: true,
                    inputMode: 'numeric', // Ensures numeric keypad on mobile
                    pattern: '[0-9]*', // Helps enforce numeric input on mobile
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
const Page = () => {
    const [numberFormatErr, setNumberFormatErr] = useState(null);
    const [signinVerificationNumber, setSigninVerificationNumber] = useState(null);

    const SignInNumber = (number) => {
        setSigninVerificationNumber(number);
        console.log("Number is", number);
    };

    const handleErr = (err) => {
        console.log("Err", err);
        setNumberFormatErr(err);
    };

    return (
        <div>
            LogIn component

            <div className='w-9/12 sm:w-4/12 ms-8 mt-8'>
                <SigninNumberInput
                    fromSignIn={true}
                    formatErr={handleErr}
                    phonenumber={SignInNumber}
                    autoFocus={true}
                />
            </div>
            {numberFormatErr && (
                <div className="mt-2 text-red-500 text-sm">{numberFormatErr}</div>
            )}
        </div>
    )
}

export default Page;
