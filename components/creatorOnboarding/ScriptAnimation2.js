'use client'
import { Button, CircularProgress, FormControl, IconButton, InputAdornment, InputLabel, MenuItem, Select, TextField, Visibility, VisibilityOff } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useState } from "react";
import PhoneNumberInput from '../PhoneNumberInput';
import Apis from '../apis/Apis';
import axios from 'axios';
import AiSocialLinks from './AiSocialLinks';
import CallerInfo from './CallerInfo';
import SetPrice from './SetPrice';
import AddCard from '../loginform/Addcard/AddCard';
import { useRouter } from 'next/navigation';

const boxVariants = {
    enter: (direction) => ({
        x: direction > 0 ? '100%' : '-100%',
        opacity: 0.4,
    }),
    center: {
        x: 0,
        opacity: 1,
    },
    exit: (direction) => ({
        x: direction < 0 ? '100%' : '-100%',
        opacity: 0.4,
    }),
};

export default function ScriptAnimation2({ onChangeIndex }) {

    const router = useRouter();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState(0);
    const [value, setValue] = useState("");

    //code for getting value of input fields
    const [greetText, setGreetText] = useState("");
    const [serviceDetails, setServiceDetails] = useState("");
    const [selectCard, setSelectCard] = useState(null);
    const [inputs, setInputs] = useState([
        { value: '', placeholder: 'What is your name?' },
        { value: '', placeholder: 'Where are you from?' }
    ]);
    const [inputRows, setInputRows] = useState([
        { productAmount: '', productName: '' }
    ]);
    const [sellingProducts, setSellingProducts] = useState([]);
    const [sellProduct, setSellProduct] = useState(false);
    const [inviteWebinar, setInviteWebinar] = useState(false);
    const [somethingElse, setSetSomethingElse] = useState(false);
    const [webinarUrl, setWebinarUrl] = useState("");
    const [otherUrl, setOtherUrl] = useState("");
    const [otherGoal, setOtherGoal] = useState("");
    const [selected, setSlected] = useState("");

    //code for callingipt api
    const handleBuildScript = async (setPriceData) => {
        console.log("Data of setprice screen", setPriceData);

        try {
            let goalType = null;
            if (sellProduct === true) {
                goalType = "Product"
            } else if (inviteWebinar === true) {
                goalType = "Webinar"
            } else if (somethingElse === true) {
                goalType = "Other"
            }
            const ApiPath = Apis.BuildScript;
            const LocalData = localStorage.getItem('User');
            const Data = JSON.parse(LocalData);
            const AuthToken = Data.data.token;
            console.log("Auth token", AuthToken);
            const formData = new FormData();
            formData.append("greeting", greetText);
            formData.append("possibleUserQuery", serviceDetails);
            formData.append("goalType", goalType);

            //code to send social link
            const localData = localStorage.getItem('socialsUrl');
            if (localData) {
                const Data = JSON.parse(localData);
                console.log("social inks data recieved", Data);
                if (Data.discord_url) {
                    formData.append("discord_url", Data.discord_url)
                }
                if (Data.fb_url) {
                    formData.append("fb_url", Data.fb_url)
                }
                if (Data.insta_url) {
                    formData.append("insta_url", Data.insta_url)
                }
                if (Data.spotify_url) {
                    formData.append("spotify_url", Data.spotify_url)
                }
                if (Data.twitter_url) {
                    formData.append("twitter_url", Data.twitter_url)
                }
                if (Data.youtube_url) {
                    formData.append("youtube_url", Data.youtube_url)
                }
            }

            //checking the goal sending
            if (selected) {
                formData.append("productToSell", selected)
            } else if (webinarUrl) {
                formData.append("webinarUrl", webinarUrl)
            } else if (otherUrl) {
                formData.append("goalUrl", otherUrl)
            }
            if (otherGoal) {
                formData.append("goalTitle", otherGoal)
            }

            formData.append("isFree", setPriceData.toogleActive);
            if (setPriceData.callPrice) {
                formData.append("price", setPriceData.callPrice);
            }
            inputs.forEach((row, index) => {
                formData.append(`kycQuestions[${index}][question]`, row.value);
            });
            inputRows.forEach((row, index) => {
                formData.append(`products[${index}][name]`, row.productName);
                formData.append(`products[${index}][productPrice]`, row.productAmount);
            });
            console.log('Data being sent to the API:');
            for (let [key, value] of formData.entries()) {
                console.log(`${key}: ${value}`);
            }
            // return
            const response = await axios.post(ApiPath, formData, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + AuthToken
                }
            });

            if (response) {
                console.log("Response is", response.data);
                if (response.data.status === true) {
                    console.log("Response of buildscript api is", response);
                    handleContinue();
                    const data = {
                        from: "builScript"
                    }
                    localStorage.setItem('fromBuildScreen', JSON.stringify(data));
                } else {
                    console.log("Status is", response.data.status);
                }
            }

        } catch (error) {
            console.error("error occured in script api is", error);
        } finally {
            console.log("Done");
        }
    }

    const handleContinue = () => {
        // handleCurrentIndex();
        setDirection(1);
        setCurrentIndex((prevIndex) => prevIndex + 1);
    };


    const handleBack = () => {
        setDirection(-1);
        setCurrentIndex((prevIndex) => prevIndex - 1);
    };

    useEffect(() => {
        onChangeIndex(currentIndex)
    }, [currentIndex]);

    const containerStyles = {
        position: 'relative',
        // height: '40vh',
        width: '100%',
        overflow: 'hidden',
    };

    const styles = {
        // position: 'absolute', // Ensures the boxes are stacked on top of each other
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        // backgroundColor: "red",
        height: "20vh",
        // marginLeft: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginInline: 10
    };

    const goalsStyles = {
        button: {
            border: "1px solid #EDEDED",
            borderColor: "#EDEDED29",
            borderRadius: 5,
            padding: 10,
            // cursore:'pointer'
        }
    }


    const handleOnClick = (item) => {
        setSlected(item.name)
    }

    useEffect(() => {
        console.log('selected value', value)
    }, [value]);


    //code for card index

    const handleCardSelect = (index) => {
        if (selectCard === index) {
            setSelectCard(null); // Deselect the card if it is already select
        } else {
            setSelectCard(index); // Select the card if it is not selected
        }
    }

    //code for dynamic field

    const addInputField = () => {
        setInputs([...inputs, { value: '', placeholder: 'New Question' }]);
    };

    // Function to handle input value change
    const handleInputChange = (index, event) => {
        const newInputs = [...inputs];
        newInputs[index].value = event.target.value;
        setInputs(newInputs);
        console.log(newInputs);
    };

    const handleDeleteInput = (index) => {
        const newInputs = [...inputs];
        newInputs.splice(index, 1); // Remove the input at the given index
        setInputs(newInputs);
        console.log(newInputs);
    };

    const inputStyle = {
        inputContainer: {
            marginTop: 30,
            // display: "flex",
            // alignItems: "center",
            backgroundColor: "#EDEDED29", //EDEDED29 /* Light grey background */
            bordeRadius: 20, /* Rounded corners */
            padding: "10px 10px", /* Padding around input */
            display: 'flex', alignItems: 'center', marginBottom: '8px'
        }
    }

    //code to add dynamic fields onadd produce index


    // Function to handle adding a new row of input fields
    const addInputRow = () => {
        setInputRows([...inputRows, { productAmount: '', productName: '' }]);
    };

    // Function to handle input value change
    const handleInputChange2 = (index, field, event) => {
        const newInputRows = [...inputRows];
        newInputRows[index][field] = event.target.value;
        setInputRows(newInputRows);
        console.log(newInputRows);
    };

    // Function to handle deleting a row of input fields
    const handleDeleteRow = (index) => {
        const newInputRows = [...inputRows];
        newInputRows.splice(index, 1); // Remove the row at the given index
        setInputRows(newInputRows);
        console.log(newInputRows);
    };



    return (
        <div style={containerStyles}>
            <AnimatePresence initial={false} custom={direction}>
                {currentIndex === 0 && (
                    <div className='flex flex-col h-screen w-full justify-center' style={{ height: "" }}>
                        <motion.div
                            key="box1"
                            custom={direction}
                            variants={boxVariants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{ duration: 0.5 }}
                            style={styles}
                        >

                            <div className='w-full flex justify-center'>
                                <div className='w-10/12'>
                                    <div>
                                    </div>
                                    <div className='mt-6' style={{ fontSize: 24, fontWeight: "600", fontFamily: "inter" }}>
                                        Greet callers
                                    </div>
                                    <div className='text-lightWhite mt-2' style={{ fontSize: 13, fontWeight: "400" }}>
                                        {/* Name you ai */}
                                    </div>
                                    <div className='text-lightWhite' style={{ fontSize: 13, fontWeight: "400", fontFamily: "inter" }}>
                                        How would you like to greet your callers?
                                    </div>

                                    <TextField
                                        className='w-10/12 bg-grayBg mt-5'
                                        // label="Type here"
                                        style={{ borderRadius: 5 }}
                                        multiline
                                        rows={6} // Controls the number of visible rows
                                        variant="filled" // You can choose between outlined, filled, or standard
                                        // fullWidth
                                        value={greetText}
                                        onChange={e => setGreetText(e.target.value)}
                                        placeholder="Hey this is James. Feel free to ask me anything about...."
                                        sx={{
                                            '& .MuiFilledInput-root': {
                                                backgroundColor: 'transparent', // Optional: Removes the background color
                                                padding: '6px 8px', // Decrease the padding inside the input container
                                            },
                                            '& .MuiInputBase-input': {
                                                padding: '4px 0px', // Decrease the padding inside the input itself
                                            },
                                            '& .MuiFilledInput-root:before': {
                                                borderBottom: 'none', // Remove the default inactive state bottom border
                                            },
                                            '& .MuiFilledInput-root:after': {
                                                borderBottom: 'none', // Remove the focused state bottom border
                                            },
                                            '& .MuiFilledInput-root:hover:before': {
                                                borderBottom: 'none', // Remove the hover state bottom border
                                            },
                                            '& .MuiFilledInput-root.Mui-focused:before': {
                                                borderBottom: 'none', // Ensure no border is shown when the field is focused
                                            }
                                        }}
                                    />

                                    <div className='w-10/12'>
                                        <Button onClick={handleContinue}
                                            className='bg-purple hover:bg-purple text-white w-full mt-12'
                                            style={{ fontSize: 15, fontWeight: "400", height: "52px", borderRadius: "50px" }}>
                                            Continue
                                        </Button>
                                    </div>

                                </div>
                            </div>


                        </motion.div>
                    </div>
                )}
                {currentIndex === 1 && (
                    <div className='flex flex-col h-screen justify-center' style={{ height: "", }}>
                        <motion.div
                            key="box2"
                            custom={direction}
                            variants={boxVariants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{ duration: 0.5 }}
                            style={styles}
                        >
                            <div className='w-full flex justify-center'>
                                <div className='w-10/12'>
                                    <div>
                                        <button onClick={handleBack}>
                                            <Image src={'/assets/backarrow.png'} alt='back' height={14} width={16} />
                                        </button>
                                    </div>
                                    <div className='mt-6' style={{ fontSize: 24, fontWeight: "600", fontFamily: "inter" }}>
                                        What might users ask you about <br /> during the calls?
                                    </div>

                                    <TextField className=' w-9/12 mt-8'
                                        autofill='off'
                                        id="filled-basic"
                                        label="Description" variant="filled"
                                        multiline
                                        rows={6}
                                        value={serviceDetails}
                                        onChange={(e) => setServiceDetails(e.target.value)}
                                        placeholder='How to scale my business, how to overcome a breakup, etc '
                                        sx={{
                                            '& label.Mui-focused': {
                                                color: '#050A0890',
                                            },
                                            '& .MuiFilledInput-root': {
                                                backgroundColor: '#EDEDED', // Optional: Removes the background color
                                                // padding: '6px 8px', // Decrease the padding inside the input container
                                                fontSize: 13,
                                                fontWeight: '400'
                                            },
                                            '& .MuiFilledInput-root:before': {
                                                borderBottom: 'none', // Remove the default inactive state bottom border
                                            },
                                            '& .MuiFilledInput-root:after': {
                                                borderBottom: 'none', // Remove the focused state bottom border
                                            },
                                            '& .MuiFilledInput-root:hover:before': {
                                                borderBottom: 'none', // Remove the hover state bottom border
                                            },
                                            '& .MuiFilledInput-root.Mui-focused:before': {
                                                borderBottom: 'none', // Ensure no border is shown when the field is focused
                                            }
                                        }}
                                    />

                                    <div className='w-10/12'>
                                        <Button onClick={handleContinue}
                                            className='bg-purple hover:bg-purple text-white w-full mt-12'
                                            style={{ fontSize: 15, fontWeight: "400", height: "52px", borderRadius: "50px" }}>
                                            Continue
                                        </Button>
                                    </div>


                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
                {currentIndex === 2 && (
                    <div className='flex flex-col h-screen justify-center' style={{ height: "", }}>
                        <motion.div
                            key="box3"
                            custom={direction}
                            variants={boxVariants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{ duration: 0.5 }}
                            style={styles}>
                            <div className='w-full flex justify-center'>
                                <div className='w-10/12'>
                                    <div>
                                        <button onClick={handleBack}>
                                            <Image src={'/assets/backarrow.png'} alt='back' height={14} width={16} />
                                        </button>
                                    </div>
                                    {/* <div className='mt-6' style={{ fontSize: 24, fontWeight: "600", fontFamily: "inter" }}>
                                        What does  help your community with?
                                    </div> */}
                                    {/* <TextField className=' w-9/12 mt-8'
                                        autofill='off'
                                        id="filled-basic"
                                        label="Ai help tagline" variant="filled"
                                        multiline
                                        rows={3}
                                        placeholder='I help my community of followers with understanding their feelings for others, overcoming obstacles with their relationships, etc'
                                        sx={{
                                            '& label.Mui-focused': {
                                                color: '#050A0890',
                                            },
                                            '& .MuiFilledInput-root': {
                                                backgroundColor: '#EDEDED', // Optional: Removes the background color
                                                // padding: '6px 8px', // Decrease the padding inside the input container
                                                fontSize: 13,
                                                fontWeight: '400',
                                                fontFamily: "inter"
                                            },
                                            '& .MuiFilledInput-root:before': {
                                                borderBottom: 'none', // Remove the default inactive state bottom border
                                            },
                                            '& .MuiFilledInput-root:after': {
                                                borderBottom: 'none', // Remove the focused state bottom border
                                            },
                                            '& .MuiFilledInput-root:hover:before': {
                                                borderBottom: 'none', // Remove the hover state bottom border
                                            },
                                            '& .MuiFilledInput-root.Mui-focused:before': {
                                                borderBottom: 'none', // Ensure no border is shown when the field is focused
                                            }
                                        }}
                                    /> */}

                                    {/* <CallerInfo /> */}

                                    <div className='mt-6' style={{ fontSize: 24, fontWeight: "600", fontFamily: "inter" }}>
                                        KYC - What would you like to know about your callers?
                                    </div>
                                    <div className='text-sm text-gray-400 mt-2'>
                                        These are questions your AI will ask during the call to give you a better understanding about the person
                                    </div>
                                    <div style={{ maxHeight: "40vh", overflowY: "auto" }}>
                                        {inputs.map((input, index) => (
                                            <div key={index}
                                                // style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}
                                                style={inputStyle.inputContainer}
                                                className='flex -flex-row justify-between items-center rounded-lg'
                                            >
                                                <input className='w-full bg-transparent border-none outline-none'
                                                    type="text"
                                                    value={input.value}
                                                    onChange={(e) => handleInputChange(index, e)}
                                                    placeholder={input.placeholder}
                                                    style={{ marginRight: '8px', fontSize: 13, fontWeight: "400", fontFamily: "inter" }}
                                                />
                                                <button onClick={() => handleDeleteInput(index)}>
                                                    <Image src="/assets/croseBtn.png" alt='cross' height={20} width={20} />
                                                </button>
                                            </div>
                                        ))}
                                        <button onClick={addInputField} className='text-purple mt-8 outline-none border-none' style={{ textDecoration: 'underline' }}>
                                            New Question
                                        </button>
                                    </div>

                                    <div className='w-10/12'>
                                        <Button onClick={handleContinue}
                                            className='bg-purple hover:bg-purple text-white w-full mt-12'
                                            style={{ fontSize: 15, fontWeight: "400", height: "52px", borderRadius: "50px" }}>
                                            Continue
                                        </Button>
                                    </div>

                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
                {currentIndex === 3 && (
                    <div className='flex flex-col h-screen justify-center' style={{ height: "", }}>
                        <motion.div
                            key="box4"
                            custom={direction}
                            variants={boxVariants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{ duration: 0.5 }}
                            style={styles}>
                            <div className='w-full flex justify-center'>
                                <div className='w-10/12'>
                                    <div>
                                        <button onClick={handleBack}>
                                            <Image src={'/assets/backarrow.png'} alt='back' height={14} width={16} />
                                        </button>
                                    </div>
                                    <div className='mt-6' style={{ fontSize: 24, fontWeight: "600", fontFamily: "inter" }}>
                                        Do you sell any products or services that {name} can offer to qualified callers?
                                    </div>

                                    <div>
                                        {/* <AiSocialLinks /> */}
                                        {/* <div className='w-full flex flex-col justify-center items-center' >
                                            <div className='w-full'>
                                                <div className='w-11/12 flex flex-row gap-3 mt-6'>
                                                    <TextField
                                                        className='w-3/12 bg-grayBg'
                                                        style={{ borderRadius: 5 }}
                                                        // label="Product Name"
                                                        placeholder='$'
                                                        variant='filled'
                                                        sx={{
                                                            '& .MuiFilledInput-root': {
                                                                backgroundColor: 'transparent', // Optional: Removes the background color
                                                                padding: '6px 8px', // Decrease the padding inside the input container
                                                            },
                                                            '& .MuiInputBase-input': {
                                                                padding: '4px 0px', // Decrease the padding inside the input itself
                                                            },
                                                            '& .MuiFilledInput-root:before': {
                                                                borderBottom: 'none', // Remove the default inactive state bottom border
                                                            },
                                                            '& .MuiFilledInput-root:after': {
                                                                borderBottom: 'none', // Remove the focused state bottom border
                                                            },
                                                            '& .MuiFilledInput-root:hover:before': {
                                                                borderBottom: 'none', // Remove the hover state bottom border
                                                            },
                                                            '& .MuiFilledInput-root.Mui-focused:before': {
                                                                borderBottom: 'none', // Ensure no border is shown when the field is focused
                                                            }
                                                        }}

                                                    />
                                                    <TextField
                                                        className='w-6/12 bg-grayBg'
                                                        style={{ borderRadius: 5 }}
                                                        // label="Paste Product URL"
                                                        placeholder='Product name'
                                                        variant='filled'
                                                        sx={{
                                                            '& .MuiFilledInput-root': {
                                                                backgroundColor: 'transparent', // Optional: Removes the background color
                                                                padding: '6px 8px', // Decrease the padding inside the input container
                                                            },
                                                            '& .MuiInputBase-input': {
                                                                padding: '4px 0px', // Decrease the padding inside the input itself
                                                            },
                                                            '& .MuiFilledInput-root:before': {
                                                                borderBottom: 'none', // Remove the default inactive state bottom border
                                                            },
                                                            '& .MuiFilledInput-root:after': {
                                                                borderBottom: 'none', // Remove the focused state bottom border
                                                            },
                                                            '& .MuiFilledInput-root:hover:before': {
                                                                borderBottom: 'none', // Remove the hover state bottom border
                                                            },
                                                            '& .MuiFilledInput-root.Mui-focused:before': {
                                                                borderBottom: 'none', // Ensure no border is shown when the field is focused
                                                            }
                                                        }}


                                                    />
                                                </div>
                                                <div className='mt-6'>
                                                    <button className='text-purple' style={{ fontWeight: "400", fontSize: 13, fontFamily: "inter" }}>
                                                        <u>
                                                            Add New
                                                        </u>
                                                    </button>
                                                </div>
                                            </div>
                                        </div> */}
                                    </div>

                                    {/* Code to make dynamic routes */}
                                    <div className='mt-8' style={{ maxHeight: "20vh", overflowY: "auto", scrollbarWidth: "none" }}>
                                        {inputRows.map((row, index) => (
                                            <div className='w-full flex flex-row gap-2 mt-2' key={index} style={{}}>
                                                <div className='w-3/12 px-3 py-3 rounded-lg flex flex-row gap-4 items-center' style={{ backgroundColor: "#EDEDED80", }}>
                                                    <input
                                                        className='w-full border-none bg-transparent outline-none'
                                                        type="number"
                                                        value={row.name}
                                                        onChange={(e) => handleInputChange2(index, 'productAmount', e)}
                                                        placeholder="$"
                                                    // style={{ marginRight: '8px' }}
                                                    />
                                                </div>
                                                <div className='w-9/12 px-3 py-3 rounded-lg flex flex-row gap-4 items-center' style={{ backgroundColor: "#EDEDED80", }}>
                                                    <input
                                                        className='w-full border-none bg-transparent outline-none'
                                                        type="text"
                                                        value={row.email}
                                                        onChange={(e) => handleInputChange2(index, 'productName', e)}
                                                        placeholder="Product Name"
                                                    />
                                                    <button onClick={() => handleDeleteRow(index)} style={{ backgroundColor: "", }}>
                                                        <Image src="/assets/croseBtn.png" alt='cross' height={20} width={20} />
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                        <div className='mt-6'>
                                            <button onClick={addInputRow} className='text-purple' style={{ fontWeight: "400", fontSize: 13, fontFamily: "inter" }}>
                                                <u>
                                                    Add New
                                                </u>
                                            </button>
                                        </div>
                                    </div>

                                    <div className='w-10/12'>
                                        <Button onClick={handleContinue}
                                            className='bg-purple hover:bg-purple text-white w-full mt-12'
                                            style={{ fontSize: 15, fontWeight: "400", height: "52px", borderRadius: "50px" }}>
                                            Continue
                                        </Button>
                                    </div>

                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
                {currentIndex === 4 && (
                    <div className='flex flex-col h-screen justify-center' style={{ height: "", }}>
                        <motion.div
                            key="box5"
                            custom={direction}
                            variants={boxVariants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{ duration: 0.5 }}
                            style={styles}>
                            <div className='w-full flex justify-center'>
                                <div className='w-10/12'>
                                    <div>
                                        <button onClick={handleBack}>
                                            <Image src={'/assets/backarrow.png'} alt='back' height={14} width={16} />
                                        </button>
                                    </div>
                                    <div className='mt-6' style={{ fontSize: 24, fontWeight: "600", fontFamily: "inter" }}>
                                        Conversion goals?
                                    </div>
                                    <div className='w-full flex flex-col justify-center items-center '>
                                        <div className='w-full'>
                                            <div className='text-sm text-gray-400 mt-2'>
                                                What do you want your AI to do?
                                            </div>


                                            <div className='w-11/12 flex flex-col mt-8'>
                                                <div>
                                                    <div className='flex flex-row w-11/12 items-center justify-between '
                                                        style={goalsStyles.button}
                                                    >
                                                        <div style={{ fontSize: 12, fontWeight: 'normal' }}>
                                                            Sell a Product / Service
                                                        </div>
                                                        <Image
                                                            style={{ cursor: "pointer" }}
                                                            onClick={() => {
                                                                setSellProduct(!sellProduct);
                                                                setInviteWebinar(false);
                                                                setSetSomethingElse(false);
                                                            }}
                                                            src={sellProduct ? '/assets/selected.png' : '/assets/unselected.png'}
                                                            alt='cicle' height={30} width={30} />
                                                    </div>
                                                </div>

                                            </div>

                                            {
                                                sellProduct &&
                                                <div className='w-10/12 flex flex-col mt-8'>
                                                    <FormControl className='w-full mt-4'>
                                                        <Select
                                                            className=' border-none rounded-md'
                                                            displayEmpty
                                                            value={value}
                                                            onChange={(e) => {
                                                                setValue(e.target.value)
                                                                setSlected(e.target.value)
                                                            }}
                                                            renderValue={(selected) => {
                                                                if (selected.length === 0) {
                                                                    return <em>Select Type</em>;
                                                                }
                                                                return selected;
                                                            }}
                                                            sx={{
                                                                backgroundColor: '#EDEDED80',
                                                                '& .MuiOutlinedInput-notchedOutline': {
                                                                    border: 'none',
                                                                },
                                                            }}
                                                            MenuProps={{
                                                                PaperProps: {
                                                                    sx: { backgroundColor: '#ffffff' },
                                                                },
                                                            }}
                                                        >
                                                            <MenuItem value="none">
                                                                <em>Select Type</em>
                                                            </MenuItem>
                                                            {
                                                                inputRows.map((item) => (
                                                                    <MenuItem value={item.productName}>
                                                                        {item.productName}
                                                                    </MenuItem>
                                                                ))
                                                            }
                                                        </Select>
                                                    </FormControl>
                                                </div>
                                            }

                                            <div className='w-11/12 flex flex-col mt-8'>
                                                <div>
                                                    <div className='flex flex-row w-11/12 items-center justify-between '
                                                        style={goalsStyles.button}
                                                    >
                                                        <div style={{ fontSize: 12, fontWeight: 'normal' }}>
                                                            Invite to a webinar
                                                        </div>
                                                        <Image
                                                            style={{ cursor: "pointer" }}
                                                            onClick={() => {
                                                                setInviteWebinar(!inviteWebinar);
                                                                setSellProduct(false);
                                                                setSetSomethingElse(false);
                                                            }}
                                                            src={inviteWebinar ? '/assets/selected.png' : '/assets/unselected.png'}
                                                            alt='cicle' height={30} width={30} />
                                                    </div>
                                                </div>

                                                {
                                                    inviteWebinar &&
                                                    <div className='w-11/12 mt-8' style={{}}>
                                                        <input
                                                            value={webinarUrl}
                                                            onChange={(e) => setWebinarUrl(e.target.value)}
                                                            type='text'
                                                            className='w-full p-4 rounded-lg outline-none'
                                                            placeholder='Paste website or calender link'
                                                            style={{ backgroundColor: "#EDEDED80", border: "1px solid #EDEDED" }}
                                                        />
                                                    </div>
                                                }

                                            </div>

                                            <div className='w-11/12 flex flex-col mt-8'>
                                                <div>
                                                    <div className='flex flex-row w-11/12 items-center justify-between '
                                                        style={goalsStyles.button}
                                                    >
                                                        <div style={{ fontSize: 12, fontWeight: 'normal' }}>
                                                            Something else
                                                        </div>
                                                        <Image
                                                            style={{ cursor: "pointer" }}
                                                            onClick={() => {
                                                                setSetSomethingElse(!somethingElse);
                                                                setSellProduct(false);
                                                                setInviteWebinar(false);
                                                            }}
                                                            src={somethingElse ? '/assets/selected.png' : '/assets/unselected.png'}
                                                            alt='cicle' height={30} width={30} />
                                                    </div>
                                                    {
                                                        somethingElse &&
                                                        <div>
                                                            <div className='w-11/12 mt-8' style={{}}>
                                                                <input
                                                                    value={otherGoal}
                                                                    onChange={(e) => setOtherGoal(e.target.value)}
                                                                    type='text'
                                                                    className='w-full p-4 rounded-lg outline-none'
                                                                    placeholder='What is the goal?'
                                                                    style={{ backgroundColor: "#EDEDED80", border: "1px solid #EDEDED" }}
                                                                />
                                                            </div>
                                                            <div className='w-11/12 mt-8' style={{}}>
                                                                <input
                                                                    value={otherUrl}
                                                                    onChange={(e) => setOtherUrl(e.target.value)}
                                                                    type='text'
                                                                    className='w-full p-4 rounded-lg outline-none'
                                                                    placeholder='URL'
                                                                    style={{ backgroundColor: "#EDEDED80", border: "1px solid #EDEDED" }}
                                                                />
                                                            </div>
                                                        </div>
                                                    }
                                                </div>

                                            </div>

                                        </div>
                                    </div>

                                    <div className='w-10/12'>
                                        <Button onClick={handleContinue}
                                            className='bg-purple hover:bg-purple text-white w-full mt-12'
                                            style={{ fontSize: 15, fontWeight: "400", height: "52px", borderRadius: "50px" }}>
                                            Continue
                                        </Button>
                                    </div>

                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
                {
                    currentIndex === 5 && (
                        <div className='flex h-screen flex-col justify-center' style={{ height: "", }}>
                            <motion.div
                                key="box6"
                                custom={direction}
                                variants={boxVariants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                transition={{ duration: 0.5 }}
                                style={styles}>
                                <div className='w-full flex justify-center'>
                                    <div className='w-10/12'>
                                        <div>
                                            <button onClick={handleBack}>
                                                <Image src={'/assets/backarrow.png'} alt='back' height={14} width={16} />
                                            </button>
                                        </div>
                                        <div className='mt-6' style={{ fontSize: 24, fontWeight: "600", fontFamily: "inter" }}>
                                            Set your price.
                                        </div>
                                        <button onClick={handleContinue} className='text-lightWhite mt-2' style={{ fontSize: 13, fontWeight: "400" }}>
                                            How much do you charge per minute?
                                        </button>

                                        <div>
                                            <SetPrice handleContinue={handleBuildScript} />
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    )
                }
                {currentIndex === 6 && (
                    <div className='flex flex-col justify-center h-screen' style={{ height: "", }}>
                        <motion.div
                            key="box7"
                            custom={direction}
                            variants={boxVariants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{ duration: 0.5 }}
                            style={styles}>
                            <div className='w-full flex flex-row' style={{ height: "auto" }}>
                                <div className='w-6/12'>
                                    <div style={{ height: 14 }}>
                                        <button onClick={handleBack}>
                                            <Image src={'/assets/backarrow.png'} alt='back' height={14} width={16} />
                                        </button>
                                    </div>
                                    <div className='mt-12' style={{ fontSize: 24, fontWeight: "600", fontFamily: "inter" }}>
                                        Subscribe
                                    </div>
                                    <div className='flex flex-row items-center w-8/12 px-6 rounded-xl justify-between' style={{ height: "70px", border: "1px solid #EFEFEF", marginTop: 30 }}>
                                        <div style={{ fontWeight: "500", fontSize: 20, fontFamily: "inter" }}>
                                            $97/ mo
                                        </div>
                                        <button onClick={() => handleCardSelect(1)}>
                                            {
                                                selectCard === 1 ?
                                                    <Image alt='selected' style={{ borderRadius: "50%" }} src='/assets/selected.png' height={27} width={27} /> :
                                                    <Image alt='selected' style={{ borderRadius: "50%" }} src='/assets/unselected.png' height={27} width={27} />
                                            }
                                        </button>
                                    </div>
                                    <div className='items-center w-8/12 px-6 rounded-xl justify-between' style={{ height: "70px", border: "1px solid #EFEFEF", marginTop: 50 }}>
                                        <div className='w-full flex flex-row justify-end'>
                                            <div className='bg-purple text-white px-2 py-1' style={{ borderRadius: "50px", width: "fit-content", marginTop: "-18px" }}>
                                                Recomended
                                            </div>
                                        </div>
                                        <div className='flex flex-row items-center w-full rounded-xl justify-between'>
                                            <div style={{ fontWeight: "500", fontSize: 20, fontFamily: "inter" }}>
                                                <div style={{ fontWeight: "500", fontSize: 20, fontFamily: "inter" }}>
                                                    $1200/ yr
                                                </div>
                                                <div style={{ fontWeight: "400", fontSize: 18, fontFamily: "inter" }}>
                                                    Save $200 (12 %)
                                                </div>
                                            </div>
                                            <div className='flex flex-row gap-2 items-center'>
                                                <button onClick={() => handleCardSelect(2)}>
                                                    {
                                                        selectCard === 2 ?
                                                            <Image alt='selected' style={{ borderRadius: "50%" }} src='/assets/selected.png' height={27} width={27} /> :
                                                            <Image alt='selected' style={{ borderRadius: "50%" }} src='/assets/unselected.png' height={27} width={27} />
                                                    }
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='w-8/12 flex justify-center' style={{ marginTop: 30 }}>
                                        <button className='w-full py-3 text-white bg-purple' style={{ borderRadius: "50px" }}>
                                            Continue
                                        </button>
                                    </div>
                                    <div style={{ fontWeight: "700", fontSize: 16, fontFamily: "inter", marginTop: 30 }}>
                                        You will not be charged right now!
                                    </div>
                                    <div className='text-lightWhite w-8/12' style={{ fontWeight: "500", fontFamily: "inter", fontSize: 13, marginTop: 20 }}>
                                        Your account will be under review. We do this to ensure we CreatorX is a safe and authentic platform for creators. You'll need to complete this step for our team to review your creator account. We'll be in touch in 24hrs.
                                    </div>
                                </div>
                                <div className='w-6/12'>
                                    <div style={{ fontSize: 20, fontWeight: '400', fontFamily: 'inter', marginTop: 40 }}>
                                        Make Payment
                                    </div>
                                    <div style={{ fontSize: 15, fontWeight: '400', fontFamily: 'inter', marginTop: 30 }}>
                                        You are only charged for minutes talked
                                    </div>
                                    <div className='flex flex-row gap-6' style={{ marginTop: 25 }}>
                                        <Image src="/assets/card.png" alt='card' height={64} width={140} />
                                        <Image src="/assets/eps.png" alt='card' height={64} width={140} />
                                        <Image src="/assets/giro.png" alt='card' height={64} width={140} />
                                    </div>
                                    <div className='w-8/12'>
                                        <AddCard handleContinue={handleContinue} />
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}

                {
                    currentIndex === 7 && (
                        <div className='flex h-screen flex-col justify-center' style={{ height: "", }}>
                            <motion.div
                                key="box8"
                                custom={direction}
                                variants={boxVariants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                transition={{ duration: 0.5 }}
                                style={styles}>
                                <div className='w-full flex justify-center'>
                                    <div className='w-full flex flex-col justify-center items-center '>
                                        <div className='w-8/12'>
                                            <button style={{ marginTop: 20 }}
                                                onClick={handleBack}
                                            >
                                                {/* <Image src={"/assets/backArrow.png"} width={30} height={30} /> */}
                                            </button>

                                            <Image className='mt-5' src={"/assets/redNotificationIcon.png"} width={30} height={30} />

                                            <div className='text-2xl mt-10'>
                                                Notification Permission.
                                            </div>
                                            <div className='text-sm text-gray-400 mt-5'>
                                                Get notified when Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                            </div>
                                            <div className='w-11/12 flex flex-row'>



                                                <button className='w-5/12 mt-5' style={{
                                                    height: 40, backgroundColor: '#552AFF', borderRadius: 5, color: 'white', borderRadius: "50px"
                                                }}
                                                    onClick={() => {
                                                        router.push("/profile")
                                                    }}
                                                >
                                                    {/* <div className='text-red'> */}
                                                    Countinue
                                                    {/* </div> */}
                                                </button>
                                                <button className='w-3/12 mt-5'
                                                    onClick={() => {
                                                        router.push("/profile")
                                                    }}
                                                >
                                                    {/* <div className='text-red'> */}
                                                    Skip
                                                    {/* </div> */}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    )
                }

            </AnimatePresence>
        </div>
    );
}