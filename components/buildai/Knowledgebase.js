import { FormControl, FormHelperText, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import Image from 'next/image';
import React, { useState } from 'react'

const Knowledgebase = () => {

    const [questionType, setQuestionType] = useState('');
    const [showDocument, setShowDocument] = useState(false);
    const [text, setText] = useState(false);
    const [webUrl, setWebUrl] = useState(false);
    const [fileName, setFileName] = useState('');
    const [selectedDocument, setSelectedDocument] = useState('');

    //code to select document

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setFileName(file.name);
            setSelectedDocument(file);
        }
    };

    const handleButtonClick = () => {
        document.getElementById('fileInput').click();
    };

    const handleDeselect = () => {
        setFileName('');
        document.getElementById('fileInput').value = '';
    };

    const handleChange = (e) => {
        setQuestionType(e.target.value);
        console.log("selected question type", e.target.value);
        if (e.target.value === "Document") {
            setShowDocument(true);
            setText(false);
            setWebUrl(false);
        }
        else if (e.target.value === "Plain Text") {
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

    return (
        <div className='border-2 border-grey-200 p-4 rounded-xl mt-4'>
            <div style={{ fontWeight: "400", fontSize: 13, fontFamily: "inter" }}>
                Select Type
            </div>
            <FormControl className='w-full mt-4'>
                <Select
                    className='bg-gray-200 border-none rounded-md'
                    displayEmpty
                    value={questionType}
                    onChange={handleChange}
                    renderValue={(selected) => {
                        if (selected.length === 0) {
                            return <em>Select Type</em>;
                        }
                        return selected;
                    }}
                    sx={{
                        backgroundColor: 'grey.200',
                        '& .MuiOutlinedInput-notchedOutline': {
                            border: 'none',
                        },
                    }}
                    MenuProps={{
                        PaperProps: {
                            sx: { backgroundColor: 'grey.200' },
                        },
                    }}
                >
                    <MenuItem value="none">
                        <em>Select Type</em>
                    </MenuItem>
                    <MenuItem value="Document">Document</MenuItem>
                    <MenuItem value="Plain Text">Plain Text</MenuItem>
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
                            // value={userName}
                            // onChange={(e) => setUserName(e.target.value)}
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
                            // value={userName}
                            // onChange={(e) => setUserName(e.target.value)}
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
                        <div className='flex flex-row justify-center rounded items-center bg-gray-200' style={{ height: "100px", border: "2px dashed #0000001006" }}>
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
                            <div className="flex items-center text-gray-700 gap-2">
                                <span>Selected Document: {fileName}</span>
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
                    text
                </div>
            }

            {
                webUrl &&
                <div>
                    Web URL
                </div>
            }

        </div>
    )
}

export default Knowledgebase