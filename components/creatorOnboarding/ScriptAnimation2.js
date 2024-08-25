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
        try {
            const ApiPath = Apis.BuildScript;
            const LocalData = localStorage.getItem('User');
            const Data = JSON.parse(LocalData);
            const AuthToken = Data.data.token;
            console.log("Auth token", AuthToken);
            const fromData = new FormData();
            fromData.append("greeting", greetText);
            fromData.append("possibleUserQuery", serviceDetails);
            const response = await axios.post(ApiPath, fromData, {
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
    }, [value]);


    //code for card index
    const [selectCard, setSelectCard] = useState(null);

    const handleCardSelect = (index) => {
        if (selectCard === index) {
            setSelectCard(null); // Deselect the card if it is already select
        } else {
            setSelectCard(index); // Select the card if it is not selected
        }
    }

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
                                        <button onClick={handleContinue} className='text-lightWhite mt-2' style={{ fontSize: 13, fontWeight: "400" }}>
                                            How much do you charge perinute?
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
                            transition={{ duration: 1 }}
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
                                        <AddCard />
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}