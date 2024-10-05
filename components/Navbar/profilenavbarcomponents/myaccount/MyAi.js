import React, { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import axios from 'axios';
import Apis from '@/components/apis/Apis';
import { CircularProgress } from '@mui/material';

const MyAi = () => {

    const greetingTextRef = useRef(null);
    const userQueryRef = useRef(null);
    const priceRef = useRef(null);
    const kycRef = useRef([]);
    const conversationalGoalsRef = useRef([]);

    const [showGreetingSaveBtn, setShowGreetingSaveBtn] = useState(false);
    const [greetingText, setGreetingText] = useState("");
    const [showQueryBtn, setShowQueryBtn] = useState(false);
    const [userQueryText, setUserQueryText] = useState("");
    const [showCallPriceBtn, setShowCallPriceBtn] = useState(false);
    const [callPrice, setCallPrice] = useState("");
    const [updateLoader, setUpdateLoader] = useState(false);
    const [showPriceError, setShowPriceErr] = useState("");
    //code for kyc questions
    const [kycQuestion, setKycQuestion] = useState([]);
    const [showKYCBtn, setShowKYCBtn] = useState(null);
    //code for conversational goals
    const [converstationGoals, setConverstationGoals] = useState([]);
    const [converstationGoalsBtn, setConverstationGoalsBtn] = useState(null);
    const [successSnackMessage, setSuccessSnackMessage] = useState(true);

    const handleGreetingInputFocus = () => { greetingTextRef.current.focus() }

    //code to update kyc questions
    const handleKycQuestionsChange = (id, newQuestion) => {
        const updatedQuestion = kycQuestion.map((item) =>
            item.id === id ? { ...item, question: newQuestion } : item
        )
        setKycQuestion(updatedQuestion);
    }

    //focus kyc input field
    const handleFocusKycInput = (index) => {
        setShowKYCBtn(index)
        if (kycRef.current[index]) {
            kycRef.current[index].focus();
        }
    };

    const handleFocusConversationGoalsInput = (index) => {
        setConverstationGoalsBtn(index)
        if (conversationalGoalsRef.current[index]) {
            conversationalGoalsRef.current[index].focus();
        }
    };

    //code for conversational goals input
    const handleConversationalInput = (id, newProduct) => {
        const newProductName = converstationGoals.map((item) =>
            item.id === id ? { ...item, name: newProduct } : item
        )
        setConverstationGoals(newProductName)
    }

    const handleGreetingTextBlur = () => {
        console.log("I am trigered")
        setShowGreetingSaveBtn(false);
    }

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
                    setGreetingText(response.data.data.ai.greeting);
                    setUserQueryText(response.data.data.ai.possibleUserQuery);
                    setCallPrice(response.data.data.ai.price);
                    setKycQuestion(response.data.data.questions);
                    setConverstationGoals(response.data.data.products);
                }
            }
        } else {
            console.log("No user login")
        }
    }

    useEffect(() => {
        getAiDetails()
    }, [])

    //code to update AI
    const updateAI = async () => {
        try {
            setUpdateLoader(true);
            const localData = localStorage.getItem('User');
            const Data = JSON.parse(localData);
            const AuthToken = Data.data.token;
            const formData = new FormData();
            if (greetingText) {
                formData.append('greeting', greetingText);
            }
            if (userQueryText) {
                formData.append('possibleUserQuery', userQueryText);
            }
            if (callPrice) {
                formData.append('price', callPrice);
            }
            // if(kycQuestion){
            //     formData.append(`products[${index}][name]`, row.kycQuestion);
            // }
            // kycQuestion.forEach((item, index) => {
            //     formData.append(`products[${index}][name]`, item.question);
            // });
            // converstationGoals.forEach((item, index) => {
            //     formData.append(`products[${index}][name]`, item.name);
            // });
            console.log("Below is the data sending in api :::::::")
            for (let [key, value] of formData.entries()) {
                console.log(`${key}:`, value)
            }
            const response = await axios.post(Apis.BuildScript, formData, {
                headers: {
                    "Authorization": "Bearer " + AuthToken
                }
            });
            if (response) {
                console.log("Response of api is", response);
            }
        } catch (error) {
            console.error("Error occured in update api is :::", error);
        }
        finally {
            setUpdateLoader(false);
        }
    }

    const styles = {
        inputContainer: {
            marginTop: 30,
            display: "flex",
            alignItems: "center",
            // backgroundColor: "#EDEDED40", /* Light grey background */
            bordeRadius: 5, /* Rounded orners */
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
            color: '#000', // Ensure text is black
        },
        box: {
            marginTop: 10,
            alignItems: "center",
            backgroundColor: "#f5f5f5", /* Light grey background */
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

        <div style={{}}
            className='w-full flex flex-row gap-24 pt-5'>
            <div className='w-6/12 flex flex-col items-start mt-3'>
                <div style={{ fontSize: 12, color: '#00000050', marginTop: 30 }}>
                    Greeting Text
                </div>

                <div className='w-full mt-2 rounded' style={styles.inputContainer2}>
                    <input className='w-8/12' style={styles.input} ref={greetingTextRef}
                        value={greetingText}
                        onChange={(e) => { setGreetingText(e.target.value) }}
                        onFocus={() => { setShowGreetingSaveBtn(true) }}
                        onBlur={handleGreetingTextBlur}
                        // onBlur={(e) => {
                        //     if (!e.relatedTarget || !e.relatedTarget.classList.contains('save-button')) {
                        //         // Only hide save button if the blur isn't caused by the save button
                        //         setShowGreetingSaveBtn(false);
                        //     }
                        // }}
                        placeholder="Lorem ipsum"
                    />
                    <div>
                        {
                            showGreetingSaveBtn ?
                                <div>
                                    {
                                        updateLoader ?
                                            <CircularProgress size={20} /> :
                                            <button className='text-purple'
                                                onMouseDown={(e) => e.preventDefault()}
                                                onClick={updateAI}
                                            >
                                                Save
                                            </button>
                                    }
                                </div> :
                                <button
                                    onClick={handleGreetingInputFocus}
                                    className='text-purple'>
                                    Edit
                                </button>
                        }
                    </div>
                </div>


                <div style={{ fontSize: 12, color: '#00000050', marginTop: 30 }}>
                    What might users ask you about during the calls?
                </div>

                <div className='w-full flex flex-row items-start mt-2 rounded' style={styles.inputContainer2}>
                    <textarea ref={userQueryRef}
                        className="w-8/12"
                        onFocus={() => { setShowQueryBtn(true) }}
                        onBlur={() => { setShowQueryBtn(false) }}
                        value={userQueryText}
                        onChange={(e) => setUserQueryText(e.target.value)}
                        style={{
                            border: 'none',
                            outline: 'none',
                            backgroundColor: 'transparent',
                            flexGrow: 1, resize: 'none',
                            fontSize: '16px',
                            paddingLeft: '10px',
                            color: '#000',
                        }}
                        placeholder="Lorem ipsum dolor sit amet consectetur. Volutpat sit condimentum purus lorem. Praesent odio morbi sit sem risus habitant vitae. Neque aliquam risus gravida vivamus non. Suscipit ut sed elementum ullamcorper varius integer. Sit penatibus posuere."
                        rows={6} // Adjust the number of rows to set the height of the textarea
                        multiple
                    />
                    <div>
                        {
                            showQueryBtn ?
                                <div>
                                    {
                                        updateLoader ?
                                            <CircularProgress size={20} /> :
                                            <button className='text-purple'
                                                onMouseDown={(e) => e.preventDefault()}
                                                onClick={updateAI}>
                                                Save
                                            </button>
                                    }
                                </div> :
                                <button className='text-purple'
                                    onClick={() => { userQueryRef.current.focus() }}
                                >
                                    Edit
                                </button>
                        }
                    </div>
                </div>
            </div>

            <div className='w-4/12 flex flex-col items-start mt-3'>
                <div style={{ fontSize: 12, color: '#00000050', marginTop: 30 }}>
                    KYC - What would you like to know about your callers?
                </div>

                {
                    kycQuestion.map((item, index) => (
                        <div key={item.id} className='w-full mt-2 rounded' style={styles.inputContainer2}>
                            <input className='w-8/12' style={styles.input}
                                placeholder="Name"
                                value={item.question}
                                onChange={(e) => { handleKycQuestionsChange(item.id, e.target.value) }}
                                ref={(el) => (kycRef.current[index] = el)}
                            />
                            <div className='w-4/12flex items-center'>
                                {
                                    showKYCBtn === index ?
                                        <button
                                        // onClick={}
                                        >
                                            <div className='text-purple' onClick={() => { updateAI(index) }}
                                                onMouseDown={(e) => e.preventDefault()}>
                                                Save
                                            </div>
                                        </button> :
                                        <button
                                        // onClick={}
                                        >
                                            <div className='text-purple' onClick={() => { handleFocusKycInput(index) }}>
                                                Edit
                                            </div>
                                        </button>
                                }
                            </div>
                        </div>
                    ))
                }

                {/* <div className='w-full mt-2 rounded' style={styles.inputContainer2}>
                    <input className='w-8/12' style={styles.input}
                        placeholder="Age"
                    />
                    <div className='w-4/12flex flex-row gap-2 justify-center items-center'>

                        <button
                        // onClick={}
                        >
                            <div className='text-purple'>
                                Edit
                            </div>
                        </button>
                    </div>
                </div>

                <div className='w-full mt-2 rounded' style={styles.inputContainer2}>
                    <input className='w-8/12' style={styles.input}
                        placeholder="Favorite quote"
                    />
                    <div className='w-4/12flex flex-row gap-2 justify-center items-center'>

                        <button
                        // onClick={}
                        >
                            <div className='text-purple'>
                                Edit
                            </div>
                        </button>
                    </div>
                </div> */}


                <div style={{ fontSize: 12, color: '#00000050', marginTop: 30 }}>
                    Conversation Goals
                </div>

                <div className='max-h-40vh overflow-scrollbar scrollbar scrollbar-thumb-purple scrollbar-track-transparent scrollbar-thin w-full'>
                    {
                        converstationGoals.map((item, index) => (
                            <div key={item.id} className='w-full mt-2 rounded' style={styles.inputContainer2}>
                                <input
                                    value={item.name}
                                    onChange={(e) => handleConversationalInput(item.id, e.target.value)}
                                    className='w-8/12'
                                    style={styles.input}
                                    ref={(el) => (conversationalGoalsRef.current[index] = el)}
                                    placeholder="Sell Product"
                                />
                                <div className='w-4/12flex items-center'>
                                    {
                                        converstationGoalsBtn === index ?
                                            <button
                                            // onClick={}
                                            >
                                                <div className='text-purple' onClick={() => { updateAI(index) }}
                                                    onMouseDown={(e) => e.preventDefault()}>
                                                    Save
                                                </div>
                                            </button> :
                                            <button
                                            // onClick={}
                                            >
                                                <div className='text-purple' onClick={() => { handleFocusConversationGoalsInput(index) }}>
                                                    Edit
                                                </div>
                                            </button>
                                    }
                                </div>
                            </div>
                        ))
                    }
                </div>

                <div style={{ fontSize: 12, color: '#00000050', marginTop: 30 }}>
                    Charge Per Minute
                </div>

                <div className='w-full mt-2 rounded' style={styles.inputContainer2}>
                    <div style={{ display: 'flex', alignItems: 'center', position: 'relative', width: '100%' }}>
                        <span style={{
                            position: 'absolute',
                            left: '10px', // Adjust the left value as needed
                            color: '#000', // Color of the dollar sign
                            fontSize: '16px',
                        }}>$</span>
                        <input
                            className='w-full'
                            type='text'
                            inputMode='numeric' // Ensures numeric keypad on mobile
                            pattern='[0-9]*'
                            style={{
                                ...styles.input,
                                paddingLeft: '25px' // Adds padding so text doesn't overlap with the dollar sign
                            }}
                            ref={priceRef}
                            value={callPrice}
                            // onChange={(e) => { setCallPrice(e.target.value) }}
                            onChange={(e) => {
                                e.target.value = e.target.value.replace(/[^0-9 .]/g, '');
                                if (e.target.value < 1) {
                                    setShowPriceErr(true)
                                } else {
                                    setShowPriceErr(false)
                                }
                                setCallPrice(e.target.value);
                            }}
                            placeholder="Call Price"
                            onFocus={() => { setShowCallPriceBtn(true) }}
                            onBlur={() => { setShowCallPriceBtn(false) }}
                        />
                    </div>
                    <div className='w-4/12flex items-center'>
                        {
                            showCallPriceBtn ?
                                <div>
                                    {
                                        updateLoader ?
                                            <CircularProgress size={20} /> :
                                            <button className='text-purple outline-none border-none'
                                                onClick={updateAI}
                                                onMouseDown={(e) => { e.preventDefault() }}
                                            >
                                                Save
                                            </button>
                                    }
                                </div> :
                                <button className='text-purple outline-none border-none'
                                    onClick={() => { priceRef.current.focus() }}>
                                    Edit
                                </button>
                        }
                    </div>
                </div>
                <div className='text-red mt-1' style={{ fontWeight: "400", fontSize: 13 }}>
                    {
                        callPrice && showPriceError ?
                            "Nothing less than 1" : ""
                    }
                </div>



            </div>
        </div>
    )
}

export default MyAi