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

    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState(0);
    const [selected, setSlected] = useState("");
    const [value, setValue] = useState("");

    //code for getting value of input fields
    const [greetText, setGreetText] = useState("");
    const [serviceDetails, setServiceDetails] = useState("");

    //code for callingipt api
    const handleBuildScript = async () => {
        try{
            const ApiPath = Apis.BuildScript;
            const LocalData = localStorage.getItem('User');
            const Data = JSON.parse(LocalData);
            const AuthToken = Data.data.token;
            console.log("Auth token", AuthToken);
            const fromData = new FormData();
            fromData.append("greeting", greetText);
            fromData.append("possibleUserQuery", serviceDetails);
            const response = await axios.post(ApiPath, fromData, {
                headers:{
                    'Content-Type': 'application/json',
                    'Authorization' : 'Bearer ' + AuthToken
                }
            });

            if(response){
                console.log("Response is", response.data);
                if(response.data.status === true){
                    console.log("Response of buildscript api is", response);
                    
                }else{
                    console.log("Status is", response.data.status);
                }
            }

        }catch(error){
            console.error("error occured in script api is", error);
        }finally{
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
            borderWidth: 1,
            borderColor: "#EDEDED29",
            borderRadius: 5,
            padding: 10,
            // cursore:'pointer'
        }
    }

    const goals = [
        {
            id: 1,
            name: 'Sell a Product / Service',
            type: "input"
        }, {
            id: 2,
            name: 'Select',
            type: "dropdown"
        }, {
            id: 3,
            name: 'Invite to a webinar',
            type: "input"
        }, {
            id: 4,
            name: 'Something else',
            type: "input"
        },

    ]

    const handleOnClick = (item) => {
        setSlected(item.name)
    }

    useEffect(() => {
        console.log('selected value', value)
    }, [value])

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
                            transition={{ duration: 1 }}
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
                            transition={{ duration: 1 }}
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
                            transition={{ duration: 1 }}
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

                                    <CallerInfo />

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
                            transition={{ duration: 1 }}
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
                                        <div className='w-full flex flex-col justify-center items-center' >
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
                            transition={{ duration: 1 }}
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

                                            {
                                                goals.map((item) => (
                                                    item.type === "input" ? (
                                                        <div className='w-11/12 flex flex-col mt-8'>
                                                            <button
                                                                onClick={() => handleOnClick(item)}
                                                            >
                                                                <div className='flex flex-row w-11/12 items-center justify-between '
                                                                    style={goalsStyles.button}
                                                                >
                                                                    <div style={{ fontSize: 12, fontWeight: 'normal' }}>
                                                                        {item.name}
                                                                    </div>
                                                                    <Image src={item.name === selected ? '/assets/selected.png' : '/assets/unSelected.png'}
                                                                        alt='cicle' height={30} width={30} />
                                                                </div>
                                                            </button>

                                                        </div>
                                                    ) : (
                                                        <div className='w-10/12 flex flex-col mt-8'>
                                                            <FormControl
                                                                variant='outlined'
                                                            // sx={{
                                                            //     minWidth: 300,
                                                            //     backgroundColor: '#f5f5f5', // Light background similar to the image
                                                            //     borderRadius: '5px', // Rounded corners
                                                            // }}
                                                            >
                                                                <InputLabel id="dropdown-label">Select</InputLabel>
                                                                <Select
                                                                    labelId='dropdown-label'
                                                                    label="Select"
                                                                    value={value}
                                                                    onChange={(e) => {
                                                                        setValue(e.target.value)
                                                                        setSlected(e.target.value)
                                                                    }}
                                                                >
                                                                    <MenuItem value="Option 1">Option 1</MenuItem>
                                                                    <MenuItem value="Option 2">Option 2</MenuItem>
                                                                    <MenuItem value="Option 3">Option 3</MenuItem>

                                                                </Select>
                                                            </FormControl>

                                                        </div>
                                                    )

                                                ))
                                            }

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
                                transition={{ duration: 1 }}
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
                                        <div className='text-lightWhite mt-2' style={{ fontSize: 13, fontWeight: "400" }}>
                                            How much do you charge perinute?
                                        </div>

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
                            transition={{ duration: 1 }}
                            style={styles}>
                            <div className='w-full' style={{ height: "auto", border: "2px solid green", height: "100%" }}>
                                <div style={{ height: 14 }}>
                                    <button onClick={handleBack}>
                                        <Image src={'/assets/backarrow.png'} alt='back' height={14} width={16} />
                                    </button>
                                </div>
                                {/* <Image src={'/assets/congratulations.png'} alt='congrats' height={445} width={445} /> */}
                                <div style={{ fontSize: 24, fontWeight: "600", textAlign: ' center' }}>
                                    Add card
                                </div>
                                {/* <Image
                                    src={'/assets/applogo.png'}
                                    alt='congrats'
                                    height={550}
                                    width={445}
                                    layout="responsive"
                                    objectFit="contain"
                                // style={{
                                //     aspectRatio: '3 / 2',
                                //     maxWidth: '100%',
                                //     height: 'auto'
                                // }}
                                /> */}
                                {/* <div className='flex flex-row mt-6 justify-center w-full gap-1'>
                                    <button style={{ fontSize: 11, fontWeight: "400" }}>
                                        Privacy policy -
                                    </button>
                                    <button style={{ fontSize: 11, fontWeight: "400" }}>
                                        Terms & Condition -
                                    </button>
                                    <button style={{ fontSize: 11, fontWeight: "400" }}>
                                        Cookie Policy
                                    </button>
                                </div> */}

                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}