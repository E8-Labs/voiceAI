"use client"
import PhoneNumberInput from '@/components/PhoneNumberInput';
import Apis from '@/components/apis/Apis';
import axios from 'axios';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';
import imageCompression from 'browser-image-compression';
import { Alert, CircularProgress, Fade, Snackbar } from '@mui/material';

const Page = () => {

    const fileInputRef = useRef(null);
    const router = useRouter();
    const [accessDenied, setAccessDenied] = useState("not allowed");
    const [userDetails, setUserDetails] = useState(null);
    const [userName, setUserName] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState(null);
    const [myCallerAccountStatus, setmyCallerAccountStatus] = useState(true);
    const [profileData, setProfileData] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);
    const [imageLoader, setImageLoader] = useState(null);
    const [nameLoader, setNameLoader] = useState(null);
    const [showSaveBtn, setShowSaveBtn] = useState(false);
    const [successSnack, setSuccessSnack] = useState(false);
    const [checkUserEmailData, setCheckUserEmailData] = useState(null);
    const [emailValidationError, setEmailValidationError] = useState(false);
    const [debounceTimeout, setDebounceTimeout] = useState(null);

    useEffect(() => {
        const timer = setTimeout(() => {
            setSuccessSnack(false);
        }, 3000);

        // Cleanup the timeout on component unmount
        return () => clearTimeout(timer);
    }, [successSnack]);

    useEffect(() => {
        if (selectedImage) {
            console.log("image recieved");
            handleEditProfile();
        } else {
            console.log("nothing recieved");
        };
    }, [selectedImage]);

    // useEffect(() => {
    //     if (userEmail) {
    //         const timeOut = setTimeout(() => {
    //             checkUserEmail();
    //         }, 500);
    //         return () => clearTimeout(timeOut);
    //     }
    // }, [userEmail]);

    const checkUserEmail = async (emailValue) => {
        const ApiPath = Apis.checkUserEmail;
        const data = {
            email: emailValue
        }
        console.log("Email sending in api", data);
        try {
            const response = await axios.post(ApiPath, data, {
                headers: {
                    "Content-Type": "application/json"
                }
            });
            if (response) {
                if (response.data) {
                    console.log("Response of checkemail", response.data);
                    setCheckUserEmailData(response.data);
                    if (response.data.status === false) {
                        setShowSaveBtn(true);
                    } else
                        if (response.data.status === true) {
                            setShowSaveBtn(true);
                        }
                }
            }
        } catch (error) {
            console.error("Error occured in checkuseremail api", error);

        }
    }


    // console.log("Getting nuber", phoneNumber);
    useEffect(() => {
        console.log("Phone number updated:", phoneNumber);
    }, [phoneNumber]);

    useEffect(() => {
        const localData = localStorage.getItem('User');
        if (localData) {
            const Data = JSON.parse(localData);
            setProfileData(Data.data.user);
            console.log("user data is", Data);
            setUserDetails(Data.data.user);
            if (Data.data.user.name) {
                const name = Data.data.user.name;
                setUserName(name.charAt(0).toUpperCase() + name.slice(1));
            }
            if (Data.data.user.email) {
                setUserEmail(Data.data.user.email)
            }
            if (Data.data.user.phone) {
                setPhoneNumber(Data.data.user.phone)
            }

        }
        // if (Data.data.user.phone) {
        //     console.log("Recieving nummber", Data.data.user.phone);

        //     setPhoneNumber(Data.data.user.phone)
        // }
    }, []);

    const styles = {
        input: {
            backgroundColor: '#EDEDED78',
            padding: 10,
            borderRadius: 5,
            border: 'none',
            outline: 'none',
        }
    }

    const handleLogout = () => {
        const modalData = localStorage.getItem('assistantName');
        const LocalData = JSON.parse(modalData);
        console.log("assistant name", LocalData);

        // return
        localStorage.removeItem('User');
        router.push(`/${LocalData}`);
        // window.open(`/${LocalData}`, '_blank')
    }

    //code to add img

    const handleImageChange = async (event) => {
        // setShowSaveBtn(true);
        const file = event.target.files[0];
        // if (file) {
        //     setSelectedImage(file);
        //     const url = URL.createObjectURL(file);
        //     setImageUrl(url);
        // }

        if (file) {
            try {
                // Compression options
                const options = {
                    maxSizeMB: 1, // Maximum size in MB
                    maxWidthOrHeight: 1920, // Max width/height
                    useWebWorker: true, // Use web workers for better performance
                };

                // Compress the image
                const compressedFile = await imageCompression(file, options);

                // Set the compressed image
                setSelectedImage(compressedFile);

                // Create a URL for the compressed image
                const url = URL.createObjectURL(compressedFile);
                setImageUrl(url);
            } catch (error) {
                console.error("Error while compressing the image:", error);
            }
        }

    };

    //update user profile
    const handleEditProfile = async () => {
        const ApiPath = Apis.updateProfile;
        const localData = localStorage.getItem('User');
        const Data = JSON.parse(localData);
        console.log("Loasdfoiefh0", Data.data.user);
        // return
        const AuthToken = Data.data.token;
        const formData = new FormData();
        formData.append("name", userName);
        formData.append("email", userEmail);
        setImageLoader(true);
        setNameLoader(true);
        if (selectedImage) {
            formData.append("media", selectedImage);
        }
        // else if (profileData.profile_image) {
        //     console.log("sending profile");
        //     formData.append("media", profileData.profile_image);
        //     console.log("Image sending", profileData.profile_image);
        // }
        try {
            const response = await axios.post(ApiPath, formData, {
                headers: {
                    'Authorization': 'Bearer ' + AuthToken
                }
            });
            if (response) {
                console.log("Response of update api is :", response.data.data);
                if (response.data.status === true) {
                    Data.data.user = response.data.data;
                    localStorage.setItem('User', JSON.stringify(Data));
                    setShowSaveBtn(false);
                    setSuccessSnack(true);
                    const event = new CustomEvent('updateProfile', {
                        detail: {
                            message: "Event created for profile update"
                        }
                    });

                    window.dispatchEvent(event);

                } else {
                    console.log("Could not update", response.data.message);
                    setUpdateErr(true);
                }
            }
        } catch (error) {
            console.error("Error occured in update api");
        } finally {
            setImageLoader(false);
            setNameLoader(false);
        }
    }


    const handleUploadClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const getPhoneNumber = (number) => {
        setPhoneNumber(number)
    }

    //code to validate email
    const validateEmail = (email) => { // Accept email directly as a string
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailPattern.test(email); // Test the email string directly
    };

    return (
        <div className='h-screen w-full' style={{ backgroundColor: "#ffffff30", }}>
            <div className='w-full py-10 px-2 lg:px-5' style={{}}>
                <div className='flex flex-row justify-between items-center'>
                    <div style={{ fontSize: 20, fontWeight: "bold", fontFamily: 'inter', paddingLeft: 10 }} >
                        My Account
                    </div>
                    <button className='lg:hidden px-2 ' onClick={handleLogout}
                        style={{
                            backgroundColor: '#FF424250',
                            // backgroundColor: '#ffffff',
                            fontWeight: '400', fontFamily: 'inter',
                            color: '#FF4242', cursor: "pointer", borderRadius: '25px',
                        }}>
                        Logout
                    </button>
                </div>
                <div className='w-11/12 pe-4 lg:w-8/12 py-6 px-8 mt-3 flex flex-col gap-5' style={{
                    backgroundColor: '#FFFFFF40', borderRadius: 10
                }}>
                    <div className='w-full flex flex-row justify-end'>
                        <button className='lg:flex hidden px-4 py-1' onClick={handleLogout}
                            style={{ backgroundColor: '#FF424250', fontWeight: '400', fontFamily: 'inter', color: '#FF4242', cursor: "pointer", borderRadius: '25px' }}>
                            Logout
                        </button>
                    </div>

                    <div className='lg:w-7/12 flex flex-row items-center justify-between'>
                        <div className='flex flex-row items-center gap-4'>
                            <div>
                                {/* {
                                    imageUrl ?
                                        <button onClick={handleUploadClick}>
                                            {
                                                imageLoader ?
                                                    <CircularProgress size={25} /> :
                                                    <img src={imageUrl} alt='profile'
                                                        style={{ borderRadius: '50%', height: "70px", width: "70px", resize: "contain", border: "3px solid white" }} />
                                            }
                                        </button>
                                        :
                                        <div>
                                            {
                                                imageLoader ?
                                                    <CircularProgress size={25} /> :
                                                    <div>
                                                        {profileData && profileData.profile_image ?
                                                            <button onClick={handleUploadClick}>
                                                                <img src={profileData.profile_image} alt='profile'// height={70} width={70}
                                                                    style={{ backgroundColor: "", height: "70px", width: "70px", borderRadius: "50%", resize: "cover", border: "3px solid white" }} />
                                                            </button> :
                                                            <button onClick={handleUploadClick}>
                                                                <Image src="/assets/placeholderImg.jpg" alt='profile' height={70} width={70}
                                                                    style={{ borderRadius: '50%', border: "3px solid white" }} />
                                                            </button>
                                                        }
                                                    </div>
                                            }
                                        </div>

                                } */}
                                <div>
                                    {
                                        imageLoader ?
                                            <CircularProgress size={25} /> :
                                            <div>
                                                {profileData && profileData.profile_image ?
                                                    <button onClick={handleUploadClick}>
                                                        <img src={profileData.profile_image} alt='profile'// height={70} width={70}
                                                            style={{ backgroundColor: "", height: "70px", width: "70px", borderRadius: "50%", resize: "cover", border: "3px solid white" }} />
                                                    </button> :
                                                    <button onClick={handleUploadClick}>
                                                        <Image src="/assets/placeholderImg.jpg" alt='profile' height={70} width={70}
                                                            style={{ borderRadius: '50%', border: "3px solid white" }} />
                                                    </button>
                                                }
                                            </div>
                                    }
                                </div>
                            </div>
                            <div>
                                <div style={{ fontWeight: '400', fontFamily: 'inter', fontSize: 15 }}>
                                    Upload Profile
                                </div>
                                <div style={{ fontWeight: '400', fontFamily: 'inter', fontSize: 13 }}>
                                    Max file size 5mb
                                </div>
                            </div>
                        </div>

                        {/* Code to select img */}

                        <input
                            type="file"
                            accept="image/*"
                            ref={fileInputRef}
                            onChange={handleImageChange}
                            className="hidden"
                        />

                        <button onClick={handleUploadClick} className='text-purple'>
                            <Image src="/assets/editIcon.png" alt='edit' height={35} width={35} />
                        </button>

                        {/* {imageLoader ?
                            <CircularProgress size={25} /> :
                            <button onClick={handleUploadClick} className='text-purple'>
                                Upload
                            </button>
                        } */}

                    </div>

                    <div className='flex flex-row justify-between lg:w-7/12 pe-4'>
                        <input
                            className='w-full '
                            placeholder='Name'
                            value={userName}
                            onChange={(e) => {
                                setUserName(e.target.value);
                                setShowSaveBtn(true);
                            }}
                            style={styles.input}
                        />
                    </div>

                    <div className='lg:w-7/12 pe-4'>
                        <input
                            className='w-full '
                            placeholder='Email address'
                            value={userEmail}
                            onChange={(e) => {
                                setUserEmail(e.target.value);
                                // setShowSaveBtn(true);
                                setCheckUserEmailData(null);
                                const value = e.target.value;
                                if (debounceTimeout) {
                                    clearTimeout(debounceTimeout);
                                }

                                // Set a new timeout for the API call
                                const timeout = setTimeout(() => {
                                    if (!validateEmail(value)) {
                                        setEmailValidationError(true);
                                        setShowSaveBtn(false);
                                    } else {
                                        setEmailValidationError(false);
                                        checkUserEmail(value); // Pass the input value directly to the API call
                                    }
                                }, 500); // Delay of 500ms after the last keystroke

                                // Store the timeout ID to clear it later
                                setDebounceTimeout(timeout);
                            }}
                            style={styles.input}
                        />

                        {
                            emailValidationError ?
                                <div className='mt-2' style={{ fontWeight: "400", fontSize: 12, fontFamily: "inter", color: "#FF0100", height: 13 }}>
                                    Enter valid email
                                </div> :
                                <div>
                                    {
                                        checkUserEmailData && checkUserEmailData.status === true ?
                                            <div className='mt-2 ms-2' style={{ fontWeight: "400", fontSize: 12, fontFamily: "inter", color: "green", height: 13 }}>
                                                Email available
                                            </div> :
                                            <div className='mt-2 ms-2' style={{ fontWeight: "400", fontSize: 12, fontFamily: "inter", color: "#FF0100", height: 13 }}>
                                                {checkUserEmailData && checkUserEmailData.status === false && "Email already taken"}
                                            </div>
                                    }
                                </div>
                        }

                        {/* <div style={styles.input} className='flex flex-row justify-between w-full mt-4 pe-4'>
                            {phoneNumber}
                        </div> */}
                    </div>

                    <PhoneNumberInput editAccess={accessDenied} phonenumber={getPhoneNumber} myCallerAccount={myCallerAccountStatus} />

                    {
                        showSaveBtn && (userName || selectedImage) ?
                            <div className='w-full lg:w-7/12 pe-4 flex flex-row justify-end text-purple' style={{ fontWeight: '500' }}>
                                {
                                    nameLoader ?
                                        <CircularProgress size={25} /> :
                                        <button style={{fontWeight: '400', fontFamily: 'inter'}} className='bg-purple px-2 rounded-3xl text-white' onClick={handleEditProfile}>
                                            {/* bg-purple text-white px-2 rounded-3xl */}
                                            Save
                                        </button>
                                }
                            </div> :
                            ""
                    }



                    {/* <input
                        className='w-6/12 mb-20'
                        placeholder='Phone Number'
                        style={styles.input}
                    /> */}




                </div>
            </div>

            {/* code for snack message */}
            <Snackbar
                open={successSnack}
                autoHideDuration={5000}
                onClose={() => setSuccessSnack(false)}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
                TransitionComponent={Fade}
                TransitionProps={{
                    timeout: {
                        enter: 1000,
                        exit: 1000,
                    }
                }}
                sx={{
                    position: 'fixed', // Ensures it stays in place
                    top: 20, // Adjust as needed for spacing from the top
                    left: '50%', // Center horizontally
                    transform: 'translateX(-50%)', // Center horizontally
                    // width: '400px', // Set width to 309px
                    // border: "2px solid red",
                }}
            >
                <Alert
                    severity="success"
                    sx={{
                        width: '100%', // Ensures the Alert takes up the full width of the Snackbar
                        backgroundColor: 'white',
                        color: 'black',
                        borderRadius: "10px",
                    }}
                >
                    <div>
                        {/* <div style={{ color: "#FF543E", fontWeight: "bold", fontSize: 11 }}>
                            Error
                        </div> */}
                        <div>
                            Profile updated.
                        </div>
                    </div>
                </Alert>
            </Snackbar>

        </div>
    )
}

export default Page