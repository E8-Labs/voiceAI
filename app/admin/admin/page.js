"use client"
import axios from 'axios';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
import Apis from '@/components/apis/Apis';
import { CircularProgress } from '@mui/material';

const Page = () => {

    const [creators, setCreators] = useState([
        {
            id: 1,
            name: 'Salman',
            email: 'Salman@gmail.com',
            description: 'Hey James how are you?'
        },
        {
            id: 2,
            name: 'Hamza',
            email: 'Hamza@gmail.com',
            description: 'Hello users how can i assist you?'
        },
        {
            id: 3,
            name: 'Arslan',
            email: 'Arslan@gmail.com',
            description: 'Hello guys how you want me to assist you?'
        },
    ]);
    const [creatorDetails, setCreatorDetails] = useState(creators[0]);
    const [description, setDescription] = useState(creators[0].description);
    const spanRef = useRef(null);
    const [inputWidth, setInputWidth] = useState(0);
    const [updateLoader, setUpdateLodaer] = useState(false);
    const [adminData, setAdminData] = useState(null);

    useEffect(() => {
        // Update input width based on span width
        setInputWidth(spanRef.current.offsetWidth);
    }, [description]);

    //getting creators

    const getCreators = async () => {
        try {
            const LocalData = localStorage.getItem('User');
            if (LocalData) {
                const Data = JSON.parse(LocalData);
                setAdminData(Data.data.user);
                const AuthToken = Data.data.token;
                console.log("Auth is", AuthToken);
                console.log("Data of localuser", Data)
                const ApiPath = Apis.GetCreators;
                console.log("Api path is", ApiPath)
                const response = await axios.get(ApiPath, {
                    headers: {
                        'Authorization': 'Bearer ' + AuthToken,
                        'Content-Type': 'application/json'
                    }
                });
                if (response) {
                    console.log("Response fo get creaators api is", response.data);
                    if (response.data.status === true) {
                        // setCreatorDetails()
                        // setCreators(response.data.data)
                    }
                }
            }
        } catch (error) {
            console.error("Error occured in getcreators list api is", error);
        }
        // finally {
        //     console.log('Ended the api call')
        // }
    }

    useEffect(() => {
        getCreators();
    },[])

    const handleCreatorDetailsClick = (item) => {
        setCreatorDetails(item);
        setDescription(item.description)
    }

    const backgroundImage = {
        backgroundImage: 'url("/creatorProfileBg.png")', // Ensure the correct path
        backgroundSize: "cover",
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        width: '100%',
        height: '100svh',
        overflow: 'hidden'
    }

    const headingStyle = {
        fontWeight: '600',
        fontSize: 18,
        fontFamily: 'inter'
    }
    const subText = {
        fontWeight: '400',
        fontFamily: 'inter',
        fontSize: 14
    }

    return (
        <div className='w-full flex flex-row' style={backgroundImage}>
            <div className='w-2/12 ps-4'>
                <div className='flex flex-row gap-2 items-center mt-8'>
                    <Image src={adminData?.profile_image ? adminData?.profile_image : "/assets/placeholderImg.jpg"} alt='Profile'
                        height={50}
                        width={50}
                        style={{
                            width: '50px',
                            height: '50px',
                            backgroundColor: "",
                            borderRadius: "50%",
                            border: "3px solid white",
                            objectFit: 'cover',
                            objectPosition: 'center',
                            // backgroundColor: 'red'
                        }} />
                    <div>
                        {/* Noah Nega */}
                        {adminData?.name}
                    </div>
                </div>
                <div className='mt-8' style={{ maxHeight: '80vh', border: '', overflow: 'auto', scrollbarWidth: 'none' }}>
                    {
                        creators.map((item) => (
                            <div key={item.id}>
                                <button onClick={() => { handleCreatorDetailsClick(item) }}
                                    className='px-2 py-1 rounded'
                                    style={{
                                        backgroundColor: item.id === creatorDetails.id ? '#620FEB' : '',
                                        color: item.id === creatorDetails.id ? 'white' : '#000000'
                                        // padding: 4
                                    }}>
                                    {item.name}
                                </button>
                                {/* <button>
                                    {item.email}
                                </div>
                                <div>
                                    {item.name}
                                </div> */}
                            </div>
                        ))
                    }
                </div>
            </div>
            <div className='w-9/12 flex flex-col gap-4 pt-8 ps-4' style={{ backgroundColor: '#ffffff60' }}>
                <div>
                    <div style={headingStyle}>
                        Name:
                    </div>
                    <div style={subText}>
                        {creatorDetails?.name}
                    </div>
                </div>
                <div>
                    <div style={headingStyle}>
                        Email:
                    </div>
                    <div style={subText}>
                        {creatorDetails?.email}
                    </div>
                </div>
                <diiv>
                    <div style={headingStyle}>
                        Description:
                    </div>
                    <input
                        className='px-3 py-1 rounded outline-none border-none'
                        style={{
                            ...subText,
                            backgroundColor: '#EDEDED',
                            width: `${inputWidth + 10}px`  // Adding padding
                        }}
                        placeholder='Description'
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        disabled={false}  // remove "disabled" to allow typing
                    />
                </diiv>
                {/* Hidden span to measure text width */}
                <span
                    ref={spanRef}
                    style={{
                        visibility: 'hidden',
                        whiteSpace: 'pre',
                        position: 'absolute',
                        fontSize: '16px',  // ensure the font size matches the input
                        padding: '0 8px'  // match input padding
                    }}>
                    {description || 'Description'}
                </span>
                <div>

                    {
                        updateLoader ?
                            <div className='ms-4'>
                                <CircularProgress size={23} />
                            </div>
                            :
                            <button
                                className='bg-purple text-white px-4 py-1 rounded-2xl'
                            >
                                Save
                            </button>
                    }

                </div>
            </div>
        </div>
    )
}

export default Page