import React, { useRef, useState } from 'react';
import imageCompression from 'browser-image-compression';
import Image from 'next/image';

const LicenseBackSide = ({ handleContinue, handleBack }) => {

    const backImgInputRef = useRef();

    const [isDragging, setIsDragging] = useState(false);
    const [backImage, setBackImage] = useState(null);
    const [backImageUrl, setBackImageUrl] = useState(null);


    const handleDragOver = (event) => {
        event.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };


    //code for backImage select
    const handleBackFileClick = (event) => {
        const file = event.target.files[0];
        if (file) {
            handleBackImageChange(file);
            // Reset the input value to allow selecting the same image again
            event.target.value = null;
        }
    };

    const handleBackImgClick = () => {
        if (backImgInputRef.current) {
            backImgInputRef.current.click();
        }
    };

    const handleBackImgDrop = (event) => {
        event.preventDefault();
        event.stopPropagation();

        const file = event.dataTransfer.files[0];
        if (file) {
            handleBackImageChange(file);
        }
        setIsDragging(false);
    };

    const handleBackImageChange = async (file) => {
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
                setBackImage(compressedFile);

                // Create a URL for the compressed image
                const url = URL.createObjectURL(compressedFile);
                setBackImageUrl(url);
            } catch (error) {
                console.error("Error while compressing the image:", error);
            }
        }
    };

    // Reset the input and image
    const handleRemoveBackImage = () => {
        setBackImage(null);
        setBackImageUrl(null);
    };

    return (
        <div>
            <div>
                <button onClick={handleBack}>
                    <Image src="/assets/backarrow.png" height={14} width={18} />
                </button>
            </div>
            <div style={{ fontSize: 24, fontWeight: '700', fontFamily: 'inter', marginTop: 25 }}>
                Upload License
            </div>


            <div style={{ fontWeight: 'bold', fontSize: 13, fontFamily: 'inter', color: '#00000070', marginTop: 25 }}>
                Back
            </div>


            <div>
                {/* Hidden file input */}
                <input
                    type="file"
                    accept="image/*"
                    ref={backImgInputRef}
                    onChange={handleBackFileClick}
                    className="hidden"
                />

                <div
                    onDragOver={handleDragOver}
                    onDrop={handleBackImgDrop}
                    onDragLeave={handleDragLeave}
                    style={{
                        border: isDragging ? '2px dashed #4A90E2' : '2px dashed #ccc',
                        borderRadius: '8px',
                        padding: '10px',
                        textAlign: 'center',
                        cursor: 'pointer',
                        marginTop: '20px',
                        backgroundColor: isDragging ? '#f0f8ff' : '#fff'
                    }}
                    onClick={handleBackImgClick}
                >
                    {backImageUrl ? (
                        <div className='w-full flex flex-row gap-2 items-start'>
                            <div style={{
                                position: 'relative',
                                display: 'inline-block',
                                width: '90%',
                                maxWidth: '90%',
                                wordWrap: 'break-word',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'normal',
                                // padding: '10px',
                                // border: '1px solid #ccc',
                            }}>
                                {backImageUrl}
                                {/* <img
                                    src={backImageUrl}
                                    alt="Selected"
                                    style={{ height: '100px', width: '100px', objectFit: 'cover' }}
                                /> */}
                            </div>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleRemoveBackImage();
                                }} className='pe-4' >
                                <Image src="/assets/crossBtn3.png" style={{
                                    height: '15px', width: "15px",
                                    objectFit: 'cover', objectPosition: "center"
                                }} height={15} width={15} />
                            </button>
                        </div>
                    ) : (
                        <div style={{ fontWeight: "500", fontSize: 13, fontFamily: "inter" }}>
                            <p>Drop file or<br /><span className='text-purple'>Browse</span></p>
                            {/* {isDragging ? (
                            <p>Drop the image here...</p>
                        ) : (
                            <p>Drag and drop an image, or click to select</p>
                        )} */}
                        </div>
                    )}
                </div>


            </div>


            <div className='w-full mt-8'>
                <button className='w-full bg-purple'
                    onClick={handleContinue}
                    style={{
                        borderRadius: '50px',
                        height: '45px', fontSize: 15, fontWeight: '500', fontFamily: 'inter', color: 'white'
                    }}>
                    Continue
                </button>
            </div>



        </div>
    );
};

export default LicenseBackSide;
