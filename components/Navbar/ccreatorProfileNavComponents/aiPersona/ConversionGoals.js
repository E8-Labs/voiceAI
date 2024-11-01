import Apis from '@/components/apis/Apis';
import { Alert, CircularProgress, Fade, FormControl, MenuItem, Select, Snackbar } from '@mui/material';
import axios from 'axios';
import Image from 'next/image';
import React, { useEffect, useState } from 'react'

const ConversionGoals = () => {

    const [conversationLoader, setConversationLoader] = useState(false);
    const [SuccessSnack, setSuccessSnack] = useState(null);
    const [ErrSnack, setErrSnack] = useState(null);
    //sell a product
    const [sellProduct, setSellProduct] = useState(false);
    const [value, setValue] = useState([]);
    const [selected, setSlected] = useState("");
    const [inputRows, setInputRows] = useState([]);
    const [selectedRows, setSelectedRows] = useState([]);

    //invite to webinar
    const [inviteWebinar, setInviteWebinar] = useState(false);
    const [webinarUrl, setWebinarUrl] = useState("");
    const [validLinkErr, setValidLinkErr] = useState(false);

    //some thing else
    const [someThingElse, setSomeThingElse] = useState(false);
    const [otherGoal, setOtherGoal] = useState("");
    const [otherUrl, setOtherUrl] = useState("");
    const [validOtherLinkErr, setValidOtherLinkErr] = useState(false);

    useEffect(() => {
        const AiPersona = localStorage.getItem("aiPersonaDetails");
        if (AiPersona) {
            const AiPersonaDetails = JSON.parse(AiPersona);
            console.log("Ai details recieved from localstorage are :---", AiPersonaDetails);
            setInputRows(AiPersonaDetails.products);
            // const namesArray = AiPersonaDetails.products.map((item) => item.name);
            const namesArray = AiPersonaDetails.products.filter((item) => item.isSelling === true)
                .map((item) => item.name);
            setValue(namesArray);
            if (AiPersonaDetails.products.length > 0) {
                setSellProduct(true);
            }
            if (AiPersonaDetails.ai.webinarUrl) {
                setInviteWebinar(true);
                setWebinarUrl(AiPersonaDetails.ai.webinarUrl);
            }
            if (AiPersonaDetails.ai.goalUrl && AiPersonaDetails.ai.goalTitle) {
                setSomeThingElse(true);
                setOtherGoal(AiPersonaDetails.ai.goalUrl);
                setOtherUrl(AiPersonaDetails.ai.goalTitle);
            }
        }
    }, []);

    useEffect(() => {
        console.log("Values selected are", value);
        console.log("Input rows are", inputRows);
    }, [value, inputRows])

    //select multiple menuitems
    const handleChange = (event) => {
        setValue(event.target.value);

        const {
            target: { value }
        } = event;

        // Update selected rows
        setSelectedRows(
            typeof value === "string" ? value.split(",") : value
        );

        // Update isSelling based on selection
        setInputRows((prevRows) =>
            prevRows.map((row) => ({
                ...row,
                isSelling: value.includes(row.name)
            }))
        );
    };

    //code to update AI
    const handleUpdateAi = async () => {
        try {
            setConversationLoader(true);
            const localData = localStorage.getItem("User");
            if (localData) {
                const loginDetails = JSON.parse(localData);
                const Authtoken = loginDetails.data.token;
                const ApiPath = Apis.UpdateBuilAI;
                const formData = new FormData();
                // formData.append("calCalendarApiKey", CalenderKey);

                if (inputRows) {
                    inputRows.forEach((product) => {
                        formData.append(`id[${product.id}][productName]`, product.name);
                        formData.append(`id[${product.id}][isSelling]`, product.isSelling);
                    });
                }

                formData.append("webinarUrl", webinarUrl);
                formData.append("goalUrl", otherUrl);
                formData.append("goalTitle", otherGoal);

                console.log("Data sending in update ai api is");
                for (let [key, value] of formData.entries()) {
                    console.log(`${key}: ${value}`);
                }

                const response = await axios.post(ApiPath, formData, {
                    headers: {
                        "Authorization": "Bearer " + Authtoken,
                    }
                });

                console.log("Api path is :----", ApiPath);
                // return
                if (response) {
                    console.log("Response of update api is", response.data.data);
                    if (response.data.status === true) {
                        localStorage.setItem('aiPersonaDetails', JSON.stringify(response.data.data));
                        setSuccessSnack(response.data.message);
                    } else if (response.data.status === false) {
                        setErrSnack(response.data.message);
                    }
                }

            } else {
                alert("Cannot Proceed!! No user logged in");
                return
            }
        }
        catch (error) {
            console.error("Error occured in update ai api is", error);
        }
        finally {
            setConversationLoader(false);
        }
    }

    //code to validate urls
    const validateUrl = (url) => {
        const urlRegex =
            /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/[^\s]*)?$/;
        return urlRegex.test(url);
    };

    //styes code
    const goalsStyles = {
        button: {
            border: "2px solid #EDEDED",
            borderRadius: 5,
            padding: 10,
            // cursore:'pointer'
        },
    };

    const linkErrStyle = {
        fontSize: 12,
        height: 13,
        fontFamily: "inter",
        fontWeight: "400",
        color: "#FF0100",
        // marginLeft: 50
    };

    return (
        <div className='overflow-auto max-h-[70vh] scrollbar scrollbar-track-transparent scrollbar-thin scrollbar-thumb-purple'>
            <div>
                <span style={{ color: "#00000060" }}>Products & Services |</span> Conversion Goals
            </div>
            <div>
                <div className='w-8/12'>
                    <button
                        className="w-full flex flex-row w-11/12 items-center justify-between mt-8"
                        style={goalsStyles.button}
                        onClick={() => {
                            setSellProduct(!sellProduct);
                            // setInviteWebinar(false);
                            // setSetSomethingElse(false);
                        }}
                    >
                        <div style={{ fontSize: 12, fontWeight: "normal" }}>
                            Sell a Product / Service
                        </div>
                        <Image
                            style={{ cursor: "pointer" }}
                            // onClick={() => {
                            //   setSellProduct(!sellProduct);
                            //   // setInviteWebinar(false);
                            //   // setSetSomethingElse(false);
                            // }}
                            src={
                                sellProduct
                                    ? "/assets/selected.png"
                                    : "/assets/unselected.png"
                            }
                            alt="cicle"
                            height={30}
                            width={30}
                        />
                    </button>
                </div>

                {sellProduct && (
                    // <div className="w-6/12 flex flex-col mt-8">
                    //     <FormControl className="w-full mt-4">
                    //         <Select
                    //             className=" border-none rounded-md"
                    //             displayEmpty
                    //             value={value}
                    //             onChange={(e) => {
                    //                 setValue(e.target.value);
                    //                 setSlected(e.target.value);
                    //             }}
                    //             renderValue={(selected) => {
                    //                 if (selected.length === 0) {
                    //                     return (
                    //                         <span style={{ textDecoration: "none" }}>
                    //                             Select
                    //                         </span>
                    //                     );
                    //                 }
                    //                 return selected;
                    //             }}
                    //             sx={{
                    //                 backgroundColor: "#EDEDED80",
                    //                 "& .MuiOutlinedInput-notchedOutline": {
                    //                     border: "none",
                    //                 },
                    //             }}
                    //             MenuProps={{
                    //                 PaperProps: {
                    //                     sx: { backgroundColor: "#ffffff" },
                    //                 },
                    //             }}
                    //         >
                    //             <MenuItem value="">
                    //                 <span>Select</span>
                    //             </MenuItem>
                    //             {inputRows.map((item, index) => (
                    //                 <MenuItem value={item.name} key={index}>
                    //                     {item.name}
                    //                 </MenuItem>
                    //             ))}
                    //         </Select>
                    //     </FormControl>
                    // </div>
                    <div className="w-8/12 flex flex-col mt-4">
                        <FormControl className="w-full mt-4">
                            <Select
                                multiple
                                className="border-none rounded-md"
                                displayEmpty
                                value={value}
                                onChange={handleChange}
                                renderValue={(selected) => {
                                    if (selected.length === 0) {
                                        return <span style={{ textDecoration: 'none' }}>Select</span>;
                                    }
                                    return selected.join(', ');
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
                                <MenuItem disabled value="">
                                    <span>Select</span>
                                </MenuItem>
                                {inputRows.map((item, index) => (
                                    <MenuItem key={index} value={item.name}>
                                        {item.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </div>
                )
                }

                <div className='w-8/12'>
                    <button
                        className="w-full flex flex-row w-11/12 items-center justify-between mt-8"
                        style={goalsStyles.button}
                        onClick={() => {
                            setInviteWebinar(!inviteWebinar);
                        }}
                    >
                        <div style={{ fontSize: 12, fontWeight: "normal" }}>
                            Invite to a webinar
                        </div>
                        <Image
                            style={{ cursor: "pointer" }}
                            src={
                                inviteWebinar
                                    ? "/assets/selected.png"
                                    : "/assets/unselected.png"
                            }
                            alt="cicle"
                            height={30}
                            width={30}
                        />
                    </button>
                </div>

                {inviteWebinar && (
                    <div className="w-8/12 mt-8" style={{}}>
                        <input
                            value={webinarUrl}
                            onChange={(e) => {
                                setWebinarUrl(e.target.value);
                                const url = e.target.value;

                                if (webinarUrl) {
                                    if (validateUrl(url)) {
                                        console.log("Valid URL");
                                        setValidLinkErr(false);
                                    } else {
                                        console.log("Invalid URL");
                                        setValidLinkErr(true);
                                    }
                                }
                            }}
                            type="text"
                            className="w-full p-4 rounded-lg outline-none"
                            placeholder="Paste website or calender link"
                            style={{
                                backgroundColor: "#EDEDED80",
                                border: "1px solid #EDEDED",
                            }}
                        />
                        <div style={linkErrStyle}>
                            {webinarUrl && validLinkErr && "Invalid link"}
                        </div>
                    </div>
                )}
                <div className='w-8/12'>
                    <button
                        className="w-full flex flex-row w-11/12 items-center justify-between mt-8"
                        style={goalsStyles.button}
                        onClick={() => {
                            setSomeThingElse(!someThingElse);
                        }}
                    >
                        <div style={{ fontSize: 12, fontWeight: "normal" }}>
                            Some thing else
                        </div>
                        <Image
                            style={{ cursor: "pointer" }}
                            src={
                                someThingElse
                                    ? "/assets/selected.png"
                                    : "/assets/unselected.png"
                            }
                            alt="cicle"
                            height={30}
                            width={30}
                        />
                    </button>
                </div>

                {someThingElse && (
                    <div className='w-8/12'>
                        <div className="w-full mt-8" style={{}}>
                            <input
                                value={otherGoal}
                                onChange={(e) => setOtherGoal(e.target.value)}
                                type="text"
                                className="w-full p-4 rounded-lg outline-none"
                                placeholder="What is the goal?"
                                style={{
                                    backgroundColor: "#EDEDED80",
                                    border: "1px solid #EDEDED",
                                }}
                            />
                        </div>
                        <div className="w-full mt-8" style={{}}>
                            <input
                                value={otherUrl}
                                onChange={(e) => {
                                    setOtherUrl(e.target.value);
                                    const url = e.target.value;

                                    if (otherUrl) {
                                        if (validateUrl(url)) {
                                            console.log("Valid URL");
                                            setValidOtherLinkErr(false);
                                        } else {
                                            console.log("Invalid URL");
                                            setValidOtherLinkErr(true);
                                        }
                                    }
                                }}
                                type="text"
                                className="w-full p-4 rounded-lg outline-none"
                                placeholder="URL"
                                style={{
                                    backgroundColor: "#EDEDED80",
                                    border: "1px solid #EDEDED",
                                }}
                            />
                            <div style={linkErrStyle}>
                                {otherUrl &&
                                    validOtherLinkErr &&
                                    "Invalid link"}
                            </div>
                        </div>
                    </div>
                )}

                <div className='w-8/12 mt-8'>
                    {
                        conversationLoader ? (
                            <div className='flex flex-row justify-center'>
                                <CircularProgress size={35} />
                            </div>
                        ) : (
                            <button className='text-white bg-purple w-full outline-none border-none' style={{ borderRadius: "50px", height: "50px" }} onClick={handleUpdateAi}>
                                Update
                            </button>
                        )
                    }
                </div>

            </div>

            <div>
                <Snackbar
                    open={SuccessSnack}
                    autoHideDuration={3000}
                    onClose={() => {
                        setSuccessSnack(null);
                    }}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'center'
                    }}
                    TransitionComponent={Fade}
                    TransitionProps={{
                        direction: 'center'
                    }}
                >
                    <Alert
                        onClose={() => {
                            setSuccessSnack(null)
                        }} severity="success"
                        // className='bg-purple rounded-lg text-white'
                        sx={{ width: 'auto', fontWeight: '700', fontFamily: 'inter', fontSize: '22' }}
                    >
                        {SuccessSnack}
                    </Alert>
                </Snackbar>
            </div>

            <div>
                <Snackbar
                    open={ErrSnack}
                    autoHideDuration={3000}
                    onClose={() => {
                        setErrSnack(null);
                    }}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'center'
                    }}
                    TransitionComponent={Fade}
                    TransitionProps={{
                        direction: 'center'
                    }}
                >
                    <Alert
                        onClose={() => {
                            setErrSnack(null)
                        }} severity="success"
                        // className='bg-purple rounded-lg text-white'
                        sx={{ width: 'auto', fontWeight: '700', fontFamily: 'inter', fontSize: '22' }}
                    >
                        {ErrSnack}
                    </Alert>
                </Snackbar>
            </div>

        </div>
    )
}

export default ConversionGoals