'use client'
import React, { useEffect, useRef, useState } from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { parsePhoneNumberFromString } from 'libphonenumber-js';

const PhoneNumberInput = ({ phonenumber, myCallerAccount, editAccess, formatErr, fromCreateAccount, fromSignIn, userLocation, autoFocus }) => {

    // console.log("Should auto focus", autoFocus)
    const inputElementRef = useRef(null);
    const [phone, setPhone] = useState('');
    const [focus, setFocus] = useState(false);
    const [countryCode, setCountryCode] = useState(''); // Default to US
    const [selectedCountry, setSelectedCountry] = useState(''); // Track the selected country
    const [error, setError] = useState('');
    const [data, setData] = useState(null);

    useEffect(() => {
        const localData = localStorage.getItem('formData');
        if (!editAccess) {
            // console.log("Edit  Access", editAccess);
            setCountryCode('us');
            setSelectedCountry('us');
        }
        // if (localData) {
        //     //issue can be here
        //     const Data = JSON.parse(localData);
        //     const timeOut = setTimeout(() => {
        //         setPhone(Data.phonenumber);
        //     }, 1500);
        //     return () => clearTimeout(timeOut);
        // }

        if (editAccess) {
            setCountryCode('');
            setSelectedCountry('');
            const timeOut = setTimeout(() => {
                const localData = localStorage.getItem('User');
                if (localData) {
                    const Data = JSON.parse(localData);
                    if (Data.data.user.phone) {
                        console.log("Receiving number", Data.data.user.phone);
                        setPhone(Data.data.user.phone);
                    }
                }
            }, 500);
            return () => clearTimeout(timeOut);
        } else {
            if (localData) {
                //issue can be here
                const Data = JSON.parse(localData);
                const timeOut = setTimeout(() => {
                    setPhone(Data.phonenumber);
                }, 1500);
                return () => clearTimeout(timeOut);
            }
        }

        // const timeOut = setTimeout(() => {
        //     const localData = localStorage.getItem('User');
        //     if (localData) {
        //         const Data = JSON.parse(localData);
        //         if (Data.data.user.phone) {
        //             console.log("Receiving number", Data.data.user.phone);
        //             setPhone(Data.data.user.phone);
        //         }
        //     }
        // }, 500);
        // return () => clearTimeout(timeOut);
    }, []);

    useEffect(() => {
        console.log('Country Code changed ', countryCode)
    }, [countryCode])

    useEffect(() => {
        const localLocation = localStorage.getItem('userLocation');
        if (localLocation) {
            let loc = JSON.parse(localLocation);
            console.log("Location recieved form localstorage On Login", loc)
            if (typeof loc.countryCode != 'undefined') {
                setCountryCode(loc.countryCode.toLowerCase());
                console.log("Code set is", loc.countryCode.toLowerCase());
            }

        } else {
        }

        const timeOut = setTimeout(() => {

            if (fromSignIn) {
                console.log("Input Eement Ref Phone Focus", inputElementRef.current)
                if (inputElementRef.current && autoFocus) {
                    inputElementRef.current.focus();
                    setFocus(true);
                }
            }
        }, 3000);
        return () => clearTimeout(timeOut);


    }, []);

    useEffect(() => {
        const localNumber = localStorage.getItem('signinNumber');
        if (localNumber) {
            const Number = JSON.parse(localNumber);
            console.log('Number from signin screen', Number);
            // setPhone(Number);
            const timeOut = setTimeout(() => {
                setPhone(Number);
            }, 1500);
            return () => clearTimeout(timeOut);
        }
    }, [])

    //getting user location

    // const getGeoLocation = () => {
    //     if (navigator.geolocation) {
    //         navigator.geolocation.getCurrentPosition(
    //             async (position) => {
    //                 const { latitude, longitude } = position.coords;
    //                 try {
    //                     const response = await fetch(
    //                         `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
    //                     );
    //                     const data = await response.json();
    //                     if (data.countryCode) {
    //                         setCountryCode(data.countryCode.toLowerCase());
    //                     }
    //                 } catch (error) {
    //                     console.error('Error fetching location data:', error);
    //                 }
    //             },
    //             (error) => {
    //                 console.error('Error getting geolocation:', error);
    //             }
    //         );
    //     }
    // }


    //test code to get the user location and saving it on the localstorage
    const getGeoLocation = () => {

        // localStorage.removeItem("userLocation")
        const localLocation = localStorage.getItem('userLocation');
        // let loc = null
        if (localLocation) {
            let loc = JSON.parse(localLocation)
            console.log('Location From LocalStorage on Focus', loc);
            if (typeof loc.countryCode != 'undefined') {
                setCountryCode(loc.countryCode.toLowerCase());
                console.log("Code set is", loc.countryCode.toLowerCase());
            }
            else {
                askLocation()
            }
        } else {
            askLocation()
        }

    }

    const askLocation = () => {
        console.log("Gettign lcoation 1")
        if (navigator.geolocation) {
            console.log("Gettign lcoation 2")
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

                        // Save location data to local storage
                        const locationData = {
                            state: data.principalSubdivision, // State/Province
                            city: data.city || data.locality, // City
                            country: data.countryName, // Country
                            countryCode: data.countryCode
                        };
                        localStorage.setItem('userLocation', JSON.stringify(locationData));
                        console.log('Location data saved to local storage:', locationData);
                        userLocation(locationData);
                        console.log('Location obtained ask Location', locationData)
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



    // useEffect(() => {
    //     if (editAccess) {
    //         setCountryCode("");
    //         setSelectedCountry("");
    //         const localData = localStorage.getItem('User');
    //         setTimeout(() => {
    //             if (localData) {
    //                 const Data = JSON.parse(localData);
    //                 if (Data.data.user.phone) {
    //                     console.log("Receiving number", Data.data.user.phone);
    //                     setPhone(Data.data.user.phone);
    //                 }
    //             }
    //         }, 500);

    //         // return (() => clearTimeout(timer));
    //         console.log("Acess denied");
    //     } else {
    //         setCountryCode("us");
    //         setSelectedCountry("us");
    //         // getGeoLocation();
    //     }
    // }, []);

    useEffect(() => {
        if (!editAccess) {
            if (phone) {
                const timer = setTimeout(() => {
                    console.log("Log is working")
                    validatePhoneNumber(phone, selectedCountry);
                }, 500);
                return () => clearTimeout(timer);
            }
        }
    }, [phone, selectedCountry]);

    useEffect(() => {
        const LocalData = localStorage.getItem('route');
        const Data = JSON.parse(LocalData);
        console.log("Data from localstorage", Data);

        setData(Data);
    }, []);

    const validatePhoneNumber = (phone, countryCode) => {
        try {
            const phoneNumber = parsePhoneNumberFromString(`+${phone}`, countryCode.toUpperCase());
            if (!phoneNumber || !phoneNumber.isValid()) {
                if (fromCreateAccount === true) {
                    formatErr('Enter valid phone number');
                } else if (fromSignIn === true) {
                    formatErr('Enter valid phone number');
                } else {
                    formatErr('Enter valid phone number');
                }
                // setError('Enter valid phone number');
                return;
            } else {
                // setError('');
                formatErr('');
            }
            phonenumber(phone); // Pass valid phone number up to parent
        } catch (error) {
            if (fromCreateAccount === true) {
                formatErr('Error occured while formating');
            } else if (fromSignIn === true) {
                formatErr('Error occured while formating');
            }
            // setError('Enter valid phone number');
        }
    };

    return (
        <div className='w-full'>
            <PhoneInput
                country={countryCode} // Default country for phone input
                value={phone}
                // autoFocus={autoFocus}
                // ref={phoneNumberInputRef}
                // inputProps={{
                //     ref: inputElementRef,
                // }}
                onChange={(phone, countryData) => {
                    setPhone(phone);
                    setSelectedCountry(countryData.countryCode); // Capture the selected country's code
                    // setError(null);
                    formatErr('');
                }}
                inputStyle={{
                    width: '100%',
                    fontSize: '16px',
                    borderRadius: '10px',
                    border: '#00000070',
                    paddingLeft: '60px',
                    height: 50,
                    backgroundColor: myCallerAccount ? '#EDEDED78' : '#EDEDED',
                }}
                onFocus={() => {
                    setFocus(true);
                    getGeoLocation();
                    console.log("OnFocus start")
                }}
                onBlur={() => {
                    console.log("OnBlur start")
                }}
                containerStyle={{
                    // marginBottom: '15px',
                }}
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
                    display: editAccess ? 'none' : 'block',
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
                    readOnly: editAccess ? true : false,
                    ref: inputElementRef,
                    // autoFocus: autoFocus
                }}
            />

            <div>
                {/* {error && (
                    <div className='mt-2' style={{ fontWeight: "400", fontSize: 12, fontFamily: "inter", color: "#FF0100", height: 13 }}>
                        {error}
                    </div>
                )} */}
            </div>

            <style jsx global>{`
                .flag-dropdown:hover .selected-flag {
                    background-color: transparent !important;
                }
                .flag-dropdown .selected-flag {
                    background-color: transparent !important;
                }
            `}</style>
        </div>
    );
};

export default PhoneNumberInput;
