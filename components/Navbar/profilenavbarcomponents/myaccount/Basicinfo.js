import React, { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import axios from 'axios';
import Apis from '@/components/apis/Apis';
import { CircularProgress } from '@mui/material';

const BasicInfo = () => {

    const aiNameRef = useRef();
    const emailRef = useRef();
    const userNameRef = useRef();
    const creatorTxtRef = useRef();
    const comunityTextRef = useRef();


    const [aiNameFocus, setAiNameFocus] = useState(false);
    const [aiName, setAiName] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [emailFocus, setEmailFocus] = useState(false);
    const [debounceTimeout, setDebounceTimeout] = useState(null);
    const [emailValidationError, setEmailValidationError] = useState(null);
    const [userPhonenumber, setUserPhonenumber] = useState("");
    const [updateLoader, setUpdateLoader] = useState(false);
    const [userName, setUserName] = useState("")
    const [showUserNameBtn, setShowUserNameBtn] = useState(false);
    const [creatorText, setCreatorText] = useState("");
    const [creatorBtn, setCreatorBtn] = useState(false);
    const [comunityHelpText, setComunityHelpText] = useState("");
    const [comunityHelpBtn, setComunityHelpBtn] = useState(false);

    //get aiData
    const getAiDetails = async () => {
        const localData = localStorage.getItem('User');
        if (localData) {
            const Data = JSON.parse(localData);
            const AuthToken = Data.data.token;
            console.log("Auth token is", AuthToken);
            const response = await axios.get(Apis.MyAiapi, {
                headers: {
                    'Authorization': "bearer " + AuthToken,
                    "Content-Type": "application/json"
                }
            });
            if (response) {
                console.log("Response of myAi api is", response.data.data);
                if (response.data.data) {
                    setAiName(response.data.data.ai.name);
                    setCreatorText(response.data.data.ai.tagline);
                    setComunityHelpText(response.data.data.ai.action);
                }
            }
        } else {
            console.log("No user login")
        }
    }
    const getProfileDetails = async () => {
        const localData = localStorage.getItem('User');
        if (localData) {
            const Data = JSON.parse(localData);
            const AuthToken = Data.data.token;
            console.log("Auth token is", AuthToken);
            const response = await axios.get(Apis.MyProfile, {
                headers: {
                    'Authorization': "bearer " + AuthToken,
                    "Content-Type": "application/json"
                }
            });
            if (response) {
                console.log("Response of myprofile api is", response.data.data);
                if (response.data.data) {
                    // setAiName(response.data.data.ai.name);
                    setUserName(response.data.data.name);
                    setUserEmail(response.data.data.email);
                    setUserPhonenumber(response.data.data.phone);
                }
            }
        } else {
            console.log("No user login")
        }
    }

    useEffect(() => {
        getAiDetails();
        getProfileDetails();
    }, [])

    const handleInputFocus = () => {
        setAiNameFocus(true);
    }
    const handleInputBlur = (e) => {
        setAiNameFocus(false);
    }

    const aiNameInputFocus = () => {
        aiNameRef.current.focus();
        setAiNameFocus(true);
    }
    const emailInputFocus = () => {
        emailRef.current.focus();
        setEmailFocus(true);
    }

    const emailBlur = () => {
        setEmailFocus(false);
    }

    //code to update email check email format also check email availablity
    const validateEmail = (email) => { // Accept email directly as a string
        // const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        // return emailPattern.test(email); // Test the email string directly
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        // Check if email contains consecutive dots, which are invalid
        if (/\.\./.test(email)) {
            return false;
        }

        // Check the general pattern for a valid email
        return emailPattern.test(email);
    };

    //check email available
    const checkUserEmail = async (emailValue) => {
        const localData = localStorage.getItem('User');
        let oldEmail = null;
        if (localData) {
            const Data = JSON.parse(localData);
            console.log("user data is", Data);
            if (Data.data.user.email) {
                // setUserEmail(Data.data.user.email)
                oldEmail = Data.data.user.email;
            }
        }
        if (oldEmail === emailValue) {
            console.log("it is old email value");
            return;
        }
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
                    // setCheckUserEmailData(response.data);
                    if (response.data.status === true) {
                        setEmailValidationError(response.data.message);
                    } else if (response.data.status === false) {
                        setEmailValidationError(response.data.message);
                    }
                }
            }
        } catch (error) {
            console.error("Error occured in checkuseremail api", error);

        }
    }


    //code to call update AI api
    const handleUpdateAi = async () => {
        try {
            setUpdateLoader(true);
            const localData = localStorage.getItem('User');
            const Data = JSON.parse(localData);
            const AuthToken = Data.data.token;
            const formData = new FormData();
            if (aiName) {
                formData.append('name', aiName);
            }
            if (creatorText) {
                formData.append('tagline', creatorText);
            }
            if (comunityHelpText) {
                formData.append('action', comunityHelpText);
            }
            for (let [key, value] of formData.entries()) {
                console.log("name sendng in api")
                console.log(`${key}`, value)
            }
            const response = await axios.post(Apis.UpdateAi, formData, {
                headers: {
                    "Authorization": "Bearer " + AuthToken
                }
            });
            if (response) {
                console.log("Response of update AI api is :::::", response.data)
            }
        } catch (error) {
            console.error("Error occured in update api is :::", error);
        }
        finally {
            setUpdateLoader(false);
        }
        // setAiNameFocus(false);
    }
    // const aiNameInputFocus = () => { () => { aiNameRef.current.focus() } }

    //code to update profile
    const updateProfile = async () => {
        try {
            setUpdateLoader(true);
            const localData = localStorage.getItem("User");
            const Data = JSON.parse(localData);
            const AuthToken = Data.data.token;
            // const formData = new FormData();
            // formData.append("userName", )
            const data = {
                name: userName,
                email: userEmail
            }
            const response = await axios.post(Apis.updateProfile, data, {
                headers: {
                    "Authorization": "Bearer " + AuthToken
                }
            });
            if (response) {
                console.log('Response of update profile api is', response.data);
            }
        } catch (error) {
            console.error("Error occured in update profile api is", error);
        } finally {
            setUpdateLoader(false);
        }
    }

    const styles = {
        inputContainer: {
            marginTop: 30,
            display: "flex",
            alignItems: "center",
            backgroundColor: "#ffffff40", /* Light grey background */
            bordeRadius: 20, /* Rounded orners */
            padding: "8px 8px" /* Padding around input */

        },
        inputContainer2: {
            marginTop: 10,
            display: "flex",
            backgroundColor: "#ffffff40", /* Light grey background */
            bordeRadius: 5, /* Rounded orners */
            padding: "8px 8px" /* Padding around input */

        },
        input: {
            border: 'none',
            outline: 'none',
            backgroundColor: 'transparent',
            flexGrow: 1,
            fontSize: '16px',
            paddingLeft: '10px',
            color: '#000000', // Ensure text is black
            fontWeight: "400"
        },
        box: {
            marginTop: 10,
            alignItems: "center",
            backgroundColor: "#ffffff40", /* Light grey background */
            bordeRadius: 20, /* Rounded orners */
            padding: "8px 8px" /* Padding around input */

        },
        image: {
            resize: "cover", objectFit: "contain"
        },
        button: {
            paddingTop: 8, paddingBottom: 8, paddingLeft: 5, paddingRight: 5, borderRadius: 5
        }
    }


    return (
        <div className='w-full flex flex-col'>
            <div className='w-4/12 flex flex-col mt-5'>

                <div className='w-full rounded' style={styles.inputContainer}>
                    <input className='w-8/12'
                        value={aiName}
                        onChange={(e) => {
                            setAiName(e.target.value);
                        }}
                        style={styles.input}
                        ref={aiNameRef}
                        onFocus={handleInputFocus}
                        onBlur={handleInputBlur}
                        placeholder="voice.ai/name"
                    />
                    <div className='w-2/12 text-end pe-2'>
                        {
                            aiNameFocus ?
                                <div>
                                    {
                                        updateLoader ?
                                            <CircularProgress size={20} /> :
                                            <button
                                                onClick={handleUpdateAi}
                                                onMouseDown={(e) => { e.preventDefault() }}
                                                className='text-purple outline-none border-none'>
                                                Save
                                            </button>
                                    }
                                </div> :
                                <button
                                    onClick={aiNameInputFocus}
                                    className='text-purple outline-none border-none'>
                                    Edit
                                </button>
                        }
                    </div>
                </div>

                <div className='w-full rounded' style={styles.inputContainer}>
                    <input className='w-8/12' style={styles.input} ref={emailRef}
                        value={userEmail}
                        onFocus={() => { setEmailFocus(true) }}
                        onBlur={emailBlur}
                        onChange={(e) => {
                            setUserEmail(e.target.value);
                            // setShowSaveBtn(true);
                            // setCheckUserEmailData(null);
                            const value = e.target.value;
                            if (debounceTimeout) {
                                clearTimeout(debounceTimeout);
                            }

                            // Set a new timeout for the API call
                            const timeout = setTimeout(() => {
                                if (!validateEmail(value)) {
                                    console.log("Email  invalid")
                                    setEmailValidationError("Enter valid email");
                                } else {
                                    setEmailValidationError(null);
                                    console.log("Email  valid")
                                    checkUserEmail(value);
                                }
                            }, 500); // Delay of 500ms after the last keystroke

                            // Store the timeout ID to clear it later
                            setDebounceTimeout(timeout);
                        }}
                        placeholder="tate@gmail.com"
                    />
                    <div className='w-2/12 text-end pe-2'>
                        {
                            emailFocus ?
                                <div>
                                    {
                                        updateLoader ?
                                            <CircularProgress size={20} /> :
                                            <button
                                                onClick={updateProfile}
                                                onMouseDown={(e) => { e.preventDefault() }}
                                                className='text-purple outline-none border-none'>
                                                Save
                                            </button>
                                    }
                                </div> :
                                <button
                                    onClick={emailInputFocus}
                                    className='text-purple outline-none border-none'>
                                    Edit
                                </button>
                        }
                    </div>
                </div>

                <div
                    // className={`text-${emailValidationError === "email available" ? 'green' : 'red'}`}
                    style={{
                        fontWeight: "400", fontSize: 13, fontFamily: "inter",
                        color: emailValidationError === "email available" ? "green" : "#FF0100"
                    }} >
                    {
                        userEmail && emailValidationError && (
                            <div>
                                {emailValidationError.charAt(0).toUpperCase() + emailValidationError.slice(1)}
                            </div>
                        )
                    }
                </div>

                <div className='w-full rounded' style={styles.inputContainer}>
                    <input className='w-8/12' style={styles.input}
                        value={userPhonenumber}
                        onChange={(e) => setUserPhonenumber(e.target.value)}
                        placeholder="Phone number"
                    />
                    <div className='w-2/12 text-end pe-2'
                    // onClick={}
                    >
                        <div className='text-purple outline-none border-none'>
                            Edit
                        </div>
                    </div>
                </div>

            </div>
            {/* ?\divider */}
            <div className='w-full bg-gray-100 h-0.5 mt-20'></div>

            <div style={{}}
                className='w-full flex flex-row justify-between pt-5'>

                <div className='w-4/12 flex flex-col items-start mt-3'
                    style={{ height: "45vh", overflow: "auto", scrollbarWidth: "none", msOverflowStyle: 'none', }}>
                    <div style={{ fontSize: 12, color: '#00000050' }}>
                        AI Name
                    </div>

                    <div className='w-full mt-2 rounded' style={styles.inputContainer2}>
                        <input className='w-8/12' style={styles.input}
                            ref={userNameRef}
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                            onFocus={() => { setShowUserNameBtn(true) }}
                            onBlur={() => { setShowUserNameBtn(false) }}
                            placeholder="Noah's ai"
                        />
                        {
                            showUserNameBtn ?
                                <div>
                                    {
                                        updateLoader ?
                                            <CircularProgress size={20} /> :
                                            <button
                                                onClick={updateProfile}
                                                onMouseDown={(e) => { e.preventDefault() }}
                                                className='text-purple outline-none border-none'>
                                                Save
                                            </button>
                                    }
                                </div> :
                                <button onClick={() => {
                                    userNameRef.current.focus()
                                }} className='text-purple outline-none border-none'>
                                    Edit
                                </button>
                        }
                    </div>


                    <div style={{ fontSize: 12, color: '#00000050', marginTop: 30 }}>
                        What does (name) do as a creator or influencer?
                    </div>

                    <div className='w-full mt-2 rounded' style={styles.inputContainer2}>
                        <input className='w-8/12' style={styles.input}
                            value={creatorText}
                            ref={creatorTxtRef}
                            onChange={(e) => {
                                setCreatorText(e.target.value);
                            }}
                            onFocus={() => { setCreatorBtn(true) }}
                            onBlur={() => { setCreatorBtn(false) }}
                            placeholder="Content Creator"
                        />
                        {
                            creatorBtn ?
                                <div>
                                    {
                                        updateLoader ?
                                            <CircularProgress size={20} /> :
                                            <button onClick={handleUpdateAi}
                                                onMouseDown={(e) => e.preventDefault()}
                                                className='text-purple outline-none border-none'>
                                                Save
                                            </button>
                                    }
                                </div> :
                                <button
                                    onMouseDown={(e) => { e.preventDefault() }}
                                    onClick={() => {
                                        creatorTxtRef.current.focus()
                                    }} className='text-purple outline-none border-none'>
                                    Edit
                                </button>
                        }
                    </div>


                    <div style={{ fontSize: 12, color: '#00000050', marginTop: 30 }}>
                        What does (name) help your community with?
                    </div>

                    <div className='w-full flex  flex-row items-start mt-2 rounded' style={styles.inputContainer2}>
                        <textarea
                            className="w-8/12"
                            value={comunityHelpText}
                            onChange={(e) => {
                                setComunityHelpText(e.target.value);
                            }}
                            onFocus={() => { setComunityHelpBtn(true) }}
                            onBlur={() => { setComunityHelpBtn(false) }}
                            ref={comunityTextRef}
                            style={{
                                border: 'none',
                                outline: 'none',
                                backgroundColor: 'transparent',
                                flexGrow: 1, resize: 'none',
                                fontSize: '16px',
                                paddingLeft: '10px',
                                color: '#000',
                            }}
                            placeholder="Empowering creators and users to harness the power of AI through our AI prompt marketplace."
                            rows={3} // Adjust the number of rows to set the height of the textarea
                            multiple
                        />
                        {
                            comunityHelpBtn ?
                                <div>
                                    {
                                        updateLoader ?
                                            <CircularProgress size={20} /> :
                                            <button className='text-purple outline-none border-none'
                                                onClick={handleUpdateAi}
                                                onMouseDown={(e) => e.preventDefault()}
                                            >
                                                Save
                                            </button>
                                    }
                                </div> :
                                <button
                                    onMouseDown={(e) => { e.preventDefault() }}
                                    onClick={() => {
                                        comunityTextRef.current.focus()
                                    }}
                                    className='text-purple outline-none border-none'>
                                    Edit
                                </button>
                        }
                    </div>

                    <div style={{ fontSize: 12, color: '#00000050', marginTop: 30 }}>
                        Do you sell any products or services that (name) can offer to qualified callers?
                    </div>
                    <div className='w-full mt-2 rounded' style={styles.box}>
                        <div className='w-full flex flex-row justify-between '>
                            <div style={{ fontSize: 16, color: '#000' }}>
                                Mentorship
                            </div>
                            <button className='w-2/12 self-start'
                            // onClick={}
                            >
                                <div className='text-purple outline-none border-none'>
                                    Edit
                                </div>
                            </button>
                        </div>
                        <div className='text-purple w-full mt-3'>
                            bit.me/htnao30r3xzlsipq
                        </div>
                    </div>

                    <div className='w-full mt-2 rounded' style={styles.box}>
                        <div className='w-full flex flex-row justify-between '>
                            <div style={{ fontSize: 16, color: '#000' }}>
                                Course
                            </div>
                            <button className='w-2/12 self-start'
                            // onClick={}
                            >
                                <div className='text-purple mt-3 outline-none border-none'>
                                    Edit
                                </div>
                            </button>
                        </div>
                        <div className='text-purple'>
                            bit.me/htnao30r3xzlsipq
                        </div>
                    </div>
                    <div className='w-full mt-2 rounded' style={styles.box}>
                        <div className='w-full flex flex-row justify-between '>
                            <div style={{ fontSize: 16, color: '#000' }}>
                                Consultation
                            </div>
                            <button className='w-2/12 self-start'
                            // onClick={}
                            >
                                <div className='text-purple outline-none border-none'>
                                    Edit
                                </div>
                            </button>
                        </div>
                        <div className='text-purple mt-3'>
                            bit.me/htnao30r3xzlsipq
                        </div>
                    </div>
                </div>

                <div className='w-4/12 flex flex-col mt-3 mr-20 '
                    style={{ height: "45vh", overflow: "auto", scrollbarWidth: "none", msOverflowStyle: 'none', }}>

                    {/* <div style={{ fontSize: 15, color: '#000' }}>Social Accounts</div>


                    <div className='flex flex-row gap-5 mt-5 mb-5'>
                        <Image style={styles.image}
                            src={'/assets/fbIcon.png'} alt='facebook'
                            height={30} width={30} />
                        <div className='bg-grayBg w-8/12' style={styles.button}>
                            <button style={{ color: '#000' }}>
                                Paste url
                            </button>

                        </div>
                    </div>

                    <div className='flex flex-row gap-5 mb-5'>
                        <Image style={styles.image}
                            src={'/assets/youtubeIcon.png'} alt='Youtube'
                            height={30} width={30} />
                        <div className='bg-grayBg w-8/12' style={styles.button}>
                            <button style={{ color: '#000' }}>
                                Paste url
                            </button>

                        </div>
                    </div>

                    <div className='flex flex-row gap-5 mb-5'>
                        <Image style={styles.image}
                            src={'/assets/icon.png'} alt='Icon'
                            height={30} width={30} />
                        <div className='bg-grayBg w-8/12' style={styles.button}>
                            <button style={{ color: '#000' }}>
                                Paste url
                            </button>

                        </div>
                    </div>

                    <div className='flex flex-row gap-5 mb-5'>
                        <Image style={styles.image}
                            src={'/assets/twiterIcon.png'} alt='twiter'
                            height={30} width={30} />
                        <div className='bg-grayBg w-8/12' style={styles.button}>
                            <button style={{ color: '#000' }}>
                                Paste url
                            </button>

                        </div>
                    </div>

                    <div className='flex flex-row gap-5 mb-5'>
                        <Image style={styles.image}
                            src={'/assets/tiktokIcon.png'} alt='tiktok'
                            height={30} width={30} />
                        <div className='bg-grayBg w-8/12' style={styles.button}>
                            <button style={{ color: '#000' }}>
                                Paste url
                            </button>

                        </div>
                    </div>

                    <div className='flex flex-row gap-5 mb-5'>
                        <Image style={styles.image}
                            src={'/assets/webIcon.png'} alt='web'
                            height={30} width={30} />
                        <div className='bg-grayBg w-8/12' style={styles.button}>
                            <button style={{ color: '#000' }}>
                                Paste url
                            </button>

                        </div>
                    </div> */}


                    <div style={{ fontSize: 12, color: '#00000050' }}>
                        Total Followers
                    </div>
                    <div className='w-10/12 mt-2 bg-grayBg rounded' style={styles.inputContainer2}>
                        <input className='w-full' style={styles.input}
                            placeholder="400k"
                        />
                        <button className='w-2/12'
                        // onClick={}
                        >
                            <div className='text-purple outline-none border-none'>
                                Edit
                            </div>
                        </button>
                    </div>

                </div>

            </div>

        </div >
    )
}

export default BasicInfo