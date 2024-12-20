import { Alert, Button, CircularProgress, Fade, FormControl, FormHelperText, InputLabel, MenuItem, Select, Snackbar, TextField } from '@mui/material';
import axios from 'axios';
import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import Apis from '../apis/Apis';
import JSZip from 'jszip';

const Knowledgebase = ({ handleContinue, closeModal, recallApi }) => {

    const [questionType, setQuestionType] = useState('');
    const [showDocument, setShowDocument] = useState(false);
    const [text, setText] = useState(false);
    const [webUrl, setWebUrl] = useState(false);
    const [fileName, setFileName] = useState('');
    const [selectedDocument, setSelectedDocument] = useState(null);
    const [selectedFileName, setSelectedFileName] = useState('');
    const [isDragging, setIsDragging] = useState(false);

    //selected data send in api
    const [textData, setTextData] = useState("");
    const [documentName, setDocumentName] = useState("");
    const [documentDescription, setDocumentDescription] = useState("");
    const [urlData, setUrlData] = useState("");
    const [subjectData, setSubjectData] = useState("");
    const [loader, setLoader] = useState(false);
    const [showError, setShowError] = useState(false);
    const [aiData, setAiData] = useState([]);
    const [aiLoader, setAiLoader] = useState(false);
    const [validLinkErr, setValidLinkErr] = useState(false);
    const [addKBSnack, setAddKBSnack] = useState(null);

    //code for list
    const [userSelectedData, setUserSelectedData] = useState([]);

    //ai data
    // const getAiData = async () => {
    //     const localData = localStorage.getItem('User');
    //     const Data = JSON.parse(localData);
    //     setAiLoader(true);
    //     // console.log("Data from local for nowledge", Data);
    //     const AuthToken = Data.data.token;
    //     console.log("Auth token is", AuthToken);
    //     try {
    //         const response = await axios.get(Apis.MyAiapi, {
    //             headers: {
    //                 'Authorization': 'Bearer ' + AuthToken,
    //                 'Content-Type': 'application/json'
    //             }
    //         });

    //         if (response) {
    //             console.log("Response of myai api is", response.data.data);
    //             if (response.data.status === true) {
    //                 // setAiData(response.data.data.kb);
    //                 setUserSelectedData(response.data.data.kb);
    //                 // getknowledgeData(response.data.data.kb);
    //                 closeModal(false);
    //                 // localStorage('KnowledgeBase', JSON.stringify(response.data.data.kb));
    //             } else {
    //                 console.error("Status of kb api", response.data.message);
    //             }
    //         }
    //     } catch (error) {
    //         console.error("Error occured in kb", error);
    //     } finally {
    //         setAiLoader(false);
    //     }

    // }

    // useEffect(() => {
    //     setQuestionType("Document")
    //     setShowDocument(true);
    //     setText(false);
    //     setWebUrl(false);
    // }, [])

    //code for adding data in list
    const listdata = () => {
        let content = null;
        if (textData) {
            content = textData;
        } else if (urlData) {
            content = urlData;
        } else if (selectedFileName) {
            content = selectedFileName;
        }
        // const newData = {
        //     id: userSelectedData.length + 1,
        //     title: questionType,
        //     content: content
        // };
        // setUserSelectedData([...userSelectedData, newData]);
        // setUserSelectedData(newData);
        getAiData();
        // const dataTostore = [...userSelectedData, newData];
        // localStorage.setItem('knowledgebase')
    }

    const handleDelAddedData = (itemId) => {
        setUserSelectedData(userSelectedData.filter(userSelectedData => userSelectedData.id !== itemId));
    }

    //code to select document

    const handleFileChange = async (event) => {
        const file = event.target.files[0];
        if (file) {
            setFileName(file.name);
            setSelectedFileName(file.name);
            // setSelectedDocument(file);
            // compressDocument(file);
            try {
                // Compress the selected document
                const compressedFile = await compressDocument(file);

                // Set the compressed document
                setSelectedDocument(compressedFile);

                console.log("Original file:", file);
                console.log("Compressed file:", compressedFile);
            } catch (error) {
                console.error("Error compressing the document:", error);
            }
        }
    };

    const handleDrop = async (event) => {
        event.preventDefault();
        event.stopPropagation();
        setIsDragging(false);

        const file = event.dataTransfer.files[0];
        if (file) {
            setFileName(file.name);
            setSelectedFileName(file.name);
            // setSelectedDocument(file);
            // compressDocument(file);
            try {
                // Compress the selected document
                const compressedFile = await compressDocument(file);

                // Set the compressed document
                setSelectedDocument(compressedFile);

                console.log("Original file:", file);
                console.log("Compressed file:", compressedFile);
            } catch (error) {
                console.error("Error compressing the document:", error);
            }
        }
    };

    // cons

    const handleDragOver = (event) => {
        event.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const handleButtonClick = () => {
        if (typeof window !== 'undefined') {
            document.getElementById('fileInput').click();
        }
    };

    const handleDeselect = () => {
        setFileName('');
        if (typeof window !== 'undefined') {
            document.getElementById('fileInput').value = '';
        }
    };

    //code to compress document
    const compressDocument = async (file) => {
        const zip = new JSZip();
        zip.file(file.name, file);

        // Generate the zip file as a blob
        const compressedBlob = await zip.generateAsync({ type: "blob" });

        return new File([compressedBlob], `${file.name}.zip`, {
            type: "application/zip",
        });
    };

    const handleChange = (e) => {
        setQuestionType(e.target.value);
        console.log("selected question type", e.target.value);
        if (e.target.value === "Document") {
            setShowDocument(true);
            setText(false);
            setWebUrl(false);
        }
        else if (e.target.value === "Text") {
            setText(true);
            setShowDocument(false);
            setWebUrl(false);
        } else if (e.target.value === "Url") {
            setWebUrl(true);
            setShowDocument(false);
            setText(false);
        } else {
            setWebUrl(false);
            setShowDocument(false);
            setText(false);
        }
    };

    const MuiFieldStyle = {
        '& label.Mui-focused': {
            color: 'black',
        },
        '& .MuiFilledInput-root': {
            fontSize: 13,
            fontWeight: '400',
        },
        '& .MuiOutlinedInput-root': {
            borderRadius: 2,
            height: "auto", // Set height to auto for multiline
            backgroundColor: "#EDEDEDC7",
            color: "black",
            '& fieldset': {
                borderColor: 'transparent',
            },
            '&:hover fieldset': {
                borderColor: 'transparent',
            },
            '&.Mui-focused fieldset': {
                borderColor: '#00000000',
                color: "#000000",
            },
            '& .MuiOutlinedInput-input': {
                color: 'black !important',
            },
            '&.Mui-focused .MuiOutlinedInput-input': {
                color: 'black !important',
            },
            '& .MuiOutlinedInput-inputMultiline': {
                padding: '12px 14px', // Adjust padding for multiline
            },
        },
    };


    //api call of knowledge base questions
    const handleAddKnowledgeClick = async () => {
        setLoader(true);
        try {
            const ApiPath = Apis.KnowledgeBaseApi;
            const localData = localStorage.getItem('User');
            const Data = JSON.parse(localData);
            console.log("Data from local for nowledge", Data);
            const AuthToken = Data.data.token;
            console.log("Auth token is", AuthToken);
            const formData = new FormData();
            formData.append("type", questionType);
            if (urlData) {
                formData.append("content", urlData);
                formData.append("subject", subjectData);
            } else if (textData) {
                formData.append("content", textData);
            } else if (documentName) {
                formData.append("name", documentName);
                formData.append("description", documentDescription);
            }
            if (selectedDocument) {
                formData.append("media", selectedDocument);
                console.log("Selected doc is", selectedDocument);
            }
            // return
            const response = await axios.post(ApiPath, formData, {
                headers: {
                    "Authorization": "Bearer " + AuthToken,
                    // "Content-Type": "application/json"
                }
            });

            if (response) {
                console.log("Response of add KB api is", response.data);
                setAddKBSnack(response.data.message);
                if (response.data.status === true) {
                    // handleContinue()
                    // return
                    // listdata();
                    // getAiData();
                    closeModal(false);
                    recallApi();
                    setTextData("");
                    setDocumentName("");
                    setDocumentDescription("");
                    setUrlData("");
                } else {
                    setShowError(true);
                }
            }

        } catch (error) {
            console.error("ERROR occured in knowledge questions api", error);
        }
        finally {
            setLoader(false);
        }
    }
    //simple url validation pattern
    const validateUrl = (url) => {
        const urlRegex = /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/[^\s]*)?$/;
        return urlRegex.test(url);
    };
    const linkErrStyle = {
        fontSize: 12, height: 13,
        fontFamily: 'inter', fontWeight: '400',
        color: '#FF0100',
        // marginLeft: 50
    }

    return (
        <div className='w-full' style={{
            // border: "2px solid blue", 
            backgroundColor: '#ffffff23',
            padding: 30,
            borderRadius: 5
            //height: "60vh", overflow: "auto"

        }}>
            <div className='w-full' style={{ border: "", backgroundColor: 'white', padding: 10 }}>
                <div className='p-4 rounded-xl mt-4' style={{ border: "" }} >
                    <div style={{ fontWeight: "500", fontSize: 15, fontFamily: "inter" }}>
                        Select Type
                    </div>
                    <FormControl className='w-full mt-4'>
                        <Select
                            className=' border-none rounded-md'
                            displayEmpty
                            value={questionType}
                            onChange={(e) => {
                                handleChange(e);
                                setTextData("");
                                setDocumentName("");
                                setDocumentDescription("");
                                setUrlData("");
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
                            <MenuItem value="Select Type">
                                <em>Select Type</em>
                            </MenuItem>
                            <MenuItem value="Document">Document</MenuItem>
                            <MenuItem value="Text">Plain Text</MenuItem>
                            <MenuItem value="Url">Web URL</MenuItem>
                        </Select>
                    </FormControl>

                    {
                        showDocument &&

                        <div className='flex flex-col gap-4' style={{ marginTop: 18 }}>
                            <div className='flex flex-col gap-4'>
                                <TextField className=' w-full'
                                    autofill='off'
                                    id="filled-basic"
                                    value={documentName}
                                    onChange={(e) => setDocumentName(e.target.value)}
                                    // label="Name Document"
                                    variant="outlined"
                                    placeholder='Name Document'
                                    sx={MuiFieldStyle}
                                    inputProps={{
                                        style: {
                                            color: 'black !important',  // Apply black color directly
                                            // marginTop: 15
                                        },
                                    }}
                                    style={{ color: "black" }}
                                />

                                <TextField className=' w-full'
                                    autofill='off'
                                    id="filled-basic"
                                    value={documentDescription}
                                    onChange={(e) => setDocumentDescription(e.target.value)}
                                    // label="Description" 
                                    variant="outlined"
                                    placeholder='Description'
                                    sx={MuiFieldStyle}
                                    multiline
                                    rows={4}
                                    inputProps={{
                                        maxLength: 250,
                                        style: {
                                            color: 'black !important',  // Apply black color directly
                                        },
                                    }}
                                    style={{ color: "black" }}
                                />

                            </div>

                            <div className='' style={{ fontWeight: "400", fontSize: 13, fontFamily: "inter" }}>
                                Upload Document
                            </div>

                            <div className="flex flex-row items-center gap-6">
                                <input
                                    type="file"
                                    id="fileInput"
                                    accept=".pdf,.doc,.docx,.txt,.csv"
                                    className="hidden"
                                    onChange={handleFileChange}
                                />
                                {fileName ? (
                                    <div className="flex items-center text-gray-700 p-4 rounded gap-2" style={{ backgroundColor: "#EDEDED80", fontSize: 13, fontFamily: "inter" }}>
                                        <span>{fileName}</span>
                                        <button
                                            onClick={handleDeselect}
                                        >
                                            <Image src="/assets/croseBtn.png" alt='cross' height={20} width={20} />
                                        </button>
                                    </div>
                                ) :
                                    <div className='flex flex-row w-full justify-center rounded items-center' style={{
                                        height: "100px", border: "2px dashed #0000001006",
                                        backgroundColor: "#EDEDED80"
                                    }}
                                        onDragOver={handleDragOver}
                                        onDragLeave={handleDragLeave}
                                        onDrop={handleDrop}
                                    >
                                        <button
                                            onClick={handleButtonClick}
                                            className="px-4 py-2 h-full" style={{ fontWeight: "500", fontSize: 16, fontFamily: "inter" }}
                                        >
                                            Drop file or
                                            <br /> <span className='text-purple'> Browse</span>
                                        </button>
                                    </div>
                                }
                            </div>
                        </div>

                    }

                    {
                        text &&
                        <div style={{ marginTop: 18 }}>
                            <TextField className=' w-full'
                                autofill='off'
                                id="filled-basic"
                                value={textData}
                                onChange={(e) => setTextData(e.target.value)}
                                // label="Text" 
                                variant="outlined"
                                placeholder='Type or paste your text'
                                sx={MuiFieldStyle}
                                multiline
                                rows={4}
                                inputProps={{
                                    // maxLength: 250,
                                    style: {
                                        color: 'black !important',  // Apply black color directly
                                    },
                                }}
                                style={{ color: "black" }}
                            />
                        </div>
                    }

                    {
                        webUrl &&
                        <div style={{ marginTop: 18 }}>
                            <TextField className=' w-full'
                                autofill='off'
                                id="filled-basic"
                                value={urlData}
                                onChange={(e) => {
                                    setUrlData(e.target.value);
                                    const url = e.target.value;

                                    if (urlData) {
                                        if (validateUrl(url)) {
                                            console.log("Valid URL");
                                            setValidLinkErr(false);
                                        } else {
                                            console.log("Invalid URL");
                                            setValidLinkErr(true);
                                        }
                                    }
                                }}
                                // label="URL" 
                                variant="outlined"
                                placeholder='Enter URL'
                                sx={MuiFieldStyle}
                                inputProps={{
                                    style: {
                                        color: 'black !important',  // Apply black color directly
                                    },
                                }}
                                style={{ color: "black" }}
                            />
                            <div>
                                {
                                    urlData && validLinkErr ?
                                        <div style={linkErrStyle}>
                                            Invalid link
                                        </div> : ""
                                }
                            </div>
                            <TextField className=' w-full'
                                autofill='off'
                                id="filled-basic"
                                value={subjectData}
                                onChange={(e) => {
                                    setSubjectData(e.target.value);
                                    const url = e.target.value;

                                    // if (subjectData) {
                                    //     // if (validateUrl(url)) {
                                    //     //     console.log("Valid URL");
                                    //     //     setValidLinkErr(false);
                                    //     // } else {
                                    //     //     console.log("Invalid URL");
                                    //     //     setValidLinkErr(true);
                                    //     // }
                                    // }
                                }}
                                // label="URL" 
                                variant="outlined"
                                placeholder='Enter subject'
                                sx={MuiFieldStyle}
                                inputProps={{
                                    style: {
                                        color: 'black !important',  // Apply black color directly
                                    },
                                }}
                                style={{ color: "black", marginTop: 25 }}
                            />
                        </div>
                    }

                </div>
                {
                    loader ?
                        <div className='mt-8 flex flex-row justify-center'>
                            <CircularProgress size={25} />
                        </div> :
                        <div className='w-full flex flex-row justify-center mt-4'>
                            <button className='w-full text-white bg-purple py-2' onClick={handleAddKnowledgeClick} style={{
                                fontWeight: "400", fontSize: 13, fontFamily: "inter", textAlign: "center",
                                borderRadius: '50px'
                            }}>
                                Save
                            </button>
                        </div>
                }
                <div className='w-full flex flex-row justify-center'>
                    {/* <Button onClick={handleContinue}
                    className='bg-purple hover:bg-purple text-white w-11/12 mt-8'
                    style={{ fontSize: 15, fontWeight: "400", height: "52px", borderRadius: "50px" }}>
                    Continue
                </Button> */}
                </div>

                {/* {
                aiLoader ?
                    <div className='w-full flex flex-row justify-center mt-8'>
                        <CircularProgress size={25} />
                    </div> :
                    <div>
                        {
                            userSelectedData.map((item) => (
                                <div key={item.id} className='bg-gray-200 mt-8 p-4 rounded-lg'>
                                    <div className='flex flex-row w-full justify-between items-center'>
                                        <div>
                                            {item.type}
                                        </div>
                                        <div>
                                            <button onClick={() => handleDelAddedData(item.id)}>
                                                <Image src="/assets/delIcon.png" height={20} width={20} alt='del' />
                                            </button>
                                        </div>
                                    </div>
                                    <div className='w-full'>
                                        {item.content}
                                    </div>
                                </div>
                            ))
                        }
                    </div>
            } */}

                {/* Api result snack message */}

                <div>
                    <Snackbar
                        open={addKBSnack}
                        autoHideDuration={3000}
                        onClose={() => {
                            setAddKBSnack(null);
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
                                setAddKBSnack(null)
                            }} severity="none"
                            className='bg-purple rounded-lg text-white'
                            sx={{ width: 'auto', fontWeight: '700', fontFamily: 'inter', fontSize: '22' }}>
                            {addKBSnack}
                        </Alert>
                    </Snackbar>
                </div>


            </div>
        </div>
    )
}

export default Knowledgebase