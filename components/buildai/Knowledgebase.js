import { Button, CircularProgress, Fade, FormControl, FormHelperText, InputLabel, MenuItem, Select, Snackbar, TextField } from '@mui/material';
import axios from 'axios';
import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import Apis from '../apis/Apis';
import JSZip from 'jszip';

const Knowledgebase = ({ handleContinue, closeModal, getknowledgeData }) => {

    const [questionType, setQuestionType] = useState('');
    const [showDocument, setShowDocument] = useState(false);
    const [text, setText] = useState(false);
    const [webUrl, setWebUrl] = useState(false);
    const [fileName, setFileName] = useState('');
    const [selectedDocument, setSelectedDocument] = useState(null);
    const [selectedFileName, setSelectedFileName] = useState('');

    //selected data send in api
    const [textData, setTextData] = useState("");
    const [documentName, setDocumentName] = useState("");
    const [documentDescription, setDocumentDescription] = useState("");
    const [urlData, setUrlData] = useState("");
    const [loader, setLoader] = useState(false);
    const [showError, setShowError] = useState(false);
    const [aiData, setAiData] = useState([]);
    const [aiLoader, setAiLoader] = useState(false);

    //code for list
    const [userSelectedData, setUserSelectedData] = useState([]);

    //ai data
    const getAiData = async () => {
        const localData = localStorage.getItem('User');
        const Data = JSON.parse(localData);
        setAiLoader(true);
        // console.log("Data from local for nowledge", Data);
        const AuthToken = Data.data.token;
        console.log("Auth token is", AuthToken);
        try {
            const response = await axios.get(Apis.MyAiapi, {
                headers: {
                    'Authorization': 'Bearer ' + AuthToken,
                    'Content-Type': 'application/json'
                }
            });

            if (response) {
                console.log("Response of myai api is", response.data.data);
                if (response.data.status === true) {
                    // setAiData(response.data.data.kb);
                    setUserSelectedData(response.data.data.kb);
                    getknowledgeData(response.data.data.kb);
                    closeModal(false);
                    // localStorage('KnowledgeBase', JSON.stringify(response.data.data.kb));
                } else {
                    console.error("Status of kb api", response.data.message);
                }
            }
        } catch (error) {
            console.error("Error occured in kb", error);
        } finally {
            setAiLoader(false);
        }

    }

    // useEffect(() => {
    //     const data = localStorage.getItem("KnowledgeBase");
    //     if (data) {
    //         const LocalData = JSON.parse(data);
    //         setAiData(LocalData)
    //     }
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
        const newData = {
            id: userSelectedData.length + 1,
            title: questionType,
            content: content
        };
        setUserSelectedData([...userSelectedData, newData]);
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

    const handleButtonClick = () => {
        document.getElementById('fileInput').click();
    };

    const handleDeselect = () => {
        setFileName('');
        document.getElementById('fileInput').value = '';
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
        } else if (e.target.value === "Web URL") {
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
    const handleKnowledgeClick = async () => {
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
            } else
                if (textData) {
                    formData.append("content", textData);
                } else if (documentName) {
                    formData.append("content", documentName)
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
                console.log("Response of knowledge api is", response.data.data);
                if (response.data.status === true) {
                    // handleContinue()
                    listdata();
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

    return (
        <div className='w-full' style={{ height: "60vh", overflow: "auto" }}>
            <div className='p-4 rounded-xl mt-4' style={{ border: "2px solid #EDEDED78" }} >
                <div style={{ fontWeight: "400", fontSize: 13, fontFamily: "inter" }}>
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
                        <MenuItem value="none">
                            <em>Select Type</em>
                        </MenuItem>
                        <MenuItem value="Document">Document</MenuItem>
                        <MenuItem value="Text">Plain Text</MenuItem>
                        <MenuItem value="Web URL">Web URL</MenuItem>
                    </Select>
                </FormControl>

                {
                    showDocument &&

                    <div>
                        <div>
                            <TextField className=' w-full mt-10'
                                autofill='off'
                                id="filled-basic"
                                value={documentName}
                                onChange={(e) => setDocumentName(e.target.value)}
                                label="Name Document" variant="outlined"
                                placeholder='Name Document'
                                sx={MuiFieldStyle}
                                inputProps={{
                                    style: {
                                        color: 'black !important',  // Apply black color directly
                                    },
                                }}
                                style={{ color: "black" }}
                            />

                            <TextField className=' w-full mt-10'
                                autofill='off'
                                id="filled-basic"
                                value={documentDescription}
                                onChange={(e) => setDocumentDescription(e.target.value)}
                                label="Description" variant="outlined"
                                placeholder='Description'
                                sx={MuiFieldStyle}
                                multiline
                                rows={4}
                                inputProps={{
                                    style: {
                                        color: 'black !important',  // Apply black color directly
                                    },
                                }}
                                style={{ color: "black" }}
                            />

                        </div>

                        <div className='mt-4' style={{ fontWeight: "400", fontSize: 13, fontFamily: "inter" }}>
                            Upload Document
                        </div>

                        <div className="flex flex-row items-center gap-6 mt-4">
                            <div className='flex flex-row justify-center rounded items-center' style={{ height: "100px", border: "2px dashed #0000001006", backgroundColor: "#EDEDED80" }}>
                                <button
                                    onClick={handleButtonClick}
                                    className="px-4 py-2 h-full" style={{ fontWeight: "500", fontSize: 11, fontFamily: "inter" }}
                                >
                                    Drop file or
                                    <br /> <span className='text-purple'> Browse</span>
                                </button>
                            </div>
                            <input
                                type="file"
                                id="fileInput"
                                accept=".pdf,.doc,.docx,.txt"
                                className="hidden"
                                onChange={handleFileChange}
                            />
                            {fileName && (
                                <div className="flex items-center text-gray-700 p-4 rounded gap-2" style={{ backgroundColor: "#EDEDED80", fontSize: 13, fontFamily: "inter" }}>
                                    <span>{fileName}</span>
                                    <button
                                        onClick={handleDeselect}
                                    >
                                        <Image src="/assets/croseBtn.png" alt='cross' height={20} width={20} />
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                }

                {
                    text &&
                    <div>
                        <TextField className=' w-full mt-10'
                            autofill='off'
                            id="filled-basic"
                            value={textData}
                            onChange={(e) => setTextData(e.target.value)}
                            label="Text" variant="outlined"
                            placeholder='Type or paste your text'
                            sx={MuiFieldStyle}
                            multiline
                            rows={4}
                            inputProps={{
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
                    <div>
                        <TextField className=' w-full mt-10'
                            autofill='off'
                            id="filled-basic"
                            value={urlData}
                            onChange={(e) => setUrlData(e.target.value)}
                            label="URL" variant="outlined"
                            placeholder='Enter URL'
                            sx={MuiFieldStyle}
                            inputProps={{
                                style: {
                                    color: 'black !important',  // Apply black color directly
                                },
                            }}
                            style={{ color: "black" }}
                        />
                    </div>
                }

            </div>
            {
                loader ?
                    <div className='mt-8 flex flex-row justify-center'>
                        <CircularProgress size={30} />
                    </div> :
                    <button className='w-full text-purple mt-10' onClick={handleKnowledgeClick} style={{ fontWeight: "400", fontSize: 13, fontFamily: "inter", textAlign: "center" }}>
                        Save
                    </button>
            }
            <div className='w-full flex flex-row justify-center'>
                {/* <Button onClick={handleContinue}
                    className='bg-purple hover:bg-purple text-white w-11/12 mt-8'
                    style={{ fontSize: 15, fontWeight: "400", height: "52px", borderRadius: "50px" }}>
                    Continue
                </Button> */}
            </div>

            {
                aiLoader ?
                    <div className='w-full flex flex-row justify-center mt-8'>
                        <CircularProgress size={25} />
                    </div> :
                    <div>
                        {/* {
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
                        } */}
                    </div>
            }

            {/* Error snack message */}

            {
                showError &&
                <Snackbar
                    open={credentialsErr}
                    autoHideDuration={3000}
                    onClose={() => {
                        setShowError(false)
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
                            setShowError(false)
                        }} severity="error"
                        sx={{ width: 'auto', fontWeight: '700', fontFamily: 'inter', fontSize: '22' }}>

                    </Alert>
                </Snackbar>
            }


        </div>
    )
}

export default Knowledgebase