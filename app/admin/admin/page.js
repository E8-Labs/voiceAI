"use client"
import axios from 'axios';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
import Apis from '@/components/apis/Apis';
import { Alert, CircularProgress, Fade, Slide, Snackbar } from '@mui/material';
import { useRouter } from 'next/navigation';
import loginFunction from '@/components/loginFunction';

const Page = () => {

    loginFunction();
    const router = useRouter();
    const [creators, setCreators] = useState([]);
    const [creatorDetails, setCreatorDetails] = useState();
    const [description, setDescription] = useState("");
    const spanRef = useRef(null);
    const [inputWidth, setInputWidth] = useState(0);
    const [updateLoader, setUpdateLodaer] = useState(false);
    const [adminData, setAdminData] = useState(null);
    const [successUpdate, setUpdateSuccess] = useState(null);


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
                        setCreators(response.data.data);
                        setCreatorDetails(response.data.data[0]);
                        setDescription(response.data.data[0].assitant.prompt);
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
    }, [])

    const handleCreatorDetailsClick = (item) => {
        setCreatorDetails(item);
        if (item.assitant.prompt !== null) {
            setDescription(item.assitant.prompt);
        } else {
            console.log("trying to set null")
            setDescription("");
        }
        console.log("Prompt setting in the description", item.assitant.prompt);
    }

    const handleUpdate = async () => {
        console.log("Started.....");
        setUpdateLodaer(true);
        try {
            const LocalData = localStorage.getItem('User');
            if (LocalData) {
                const Data = JSON.parse(LocalData);
                const AuthToken = Data.data.token;
                console.log("Auth is", AuthToken);
                console.log("Data of localuser", Data);
                console.log("Creator details are", creatorDetails);
                // const formData = new FormData();
                // formData.append('creatorId', creatorDetails.id);
                // formData.append('prompt', description);
                // console.log("Data sending in update api");

                // for (let [key, value] of formData.entries()) {
                //     console.log(`${key}: ${value}`);
                // }
                // for (let [key, value] of formData.entries()) {
                //     console.log(`${key}: ${value}`)
                // }

                let reqData = { creatorId: creatorDetails.id, prompt: description }
                const ApiPath = Apis.UpdateCreatorAdminSide;
                console.log('Apipath is', ApiPath);
                const response = await axios.post(ApiPath, reqData, {
                    headers: {
                        'Authorization': 'Bearer ' + AuthToken,
                        'Content-Type': 'application/json'
                    }
                });
                if (response) {
                    console.log("Response of api is", response);
                    if (response.data.status === true) {
                        // const timer = setTimeout(() => {
                        //     setUpdateSuccess(response.data.message);
                        // }, 300);
                        // return (() => clearTimeout(timer));
                        setUpdateSuccess(response.data.message);
                        console.log("data to show in snack is", response.data.message);
                    } else if (response.data.status === false) {
                        setUpdateSuccess(response.data.message);
                        console.log("Response is", response.data.message);
                    }
                }
            }
        } catch (error) {
            console.error("Error occured in api is", error);
        } finally {
            setUpdateLodaer(false);
        }
    }
    useEffect(() => {
        // if(successUpdate === true) {
        console.log("Success of snack bar", successUpdate);
        // }
    }, [successUpdate])



    const backgroundImage = {
        backgroundImage: 'url("/creatorProfileBg.png")', // Ensure the correct path
        backgroundSize: "cover",
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        width: '100%',
        height: '100svh',
        overflow: 'hidden',
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
        <div className='w-full flex flex-row' style={backgroundImage}
        >
            <div className='w-2/12 ps-4' style={{ border: '' }}>
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
                <div className='mt-8' style={{ maxHeight: '80vh', border: '', overflowY: 'auto', scrollbarWidth: 'none' }}
                >
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
                <div>
                    <button onClick={() => {
                        localStorage.removeItem('User');
                        router.push('/tate.ai');
                    }}
                        className='px-2 py-1 mt-4'
                        style={{
                            backgroundColor: '#FF424250',
                            // backgroundColor: '#ffffff',
                            fontWeight: '400', fontFamily: 'inter',
                            color: '#FF4242', cursor: "pointer", borderRadius: '25px',
                        }}>
                        Logout
                    </button>
                </div>
            </div>
            <div className='w-9/12'>
                {
                    creatorDetails ?
                        <div className='w-full flex flex-col gap-4 pt-8 ps-4' style={{ backgroundColor: '#ffffff60', border: '', height: '100%' }}>
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
                            <div>
                                <div style={headingStyle}>
                                    Description:
                                </div>
                                <textarea
                                    className='px-3 py-1 rounded outline-none border-none w-11/12'
                                    style={{
                                        ...subText,
                                        backgroundColor: '#EDEDED70',
                                        height: '50vh',
                                        paddingVertical: 10,
                                        marginTop: 15
                                        // width: `${inputWidth + 10}px`  // Adding padding
                                    }}
                                    placeholder='Description'
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    disabled={false}  // remove "disabled" to allow typing
                                />
                            </div>
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
                                            onClick={() => {
                                                handleUpdate(creatorDetails);
                                                // setUpdateSuccess(true);
                                            }}
                                        >
                                            Save
                                        </button>
                                }

                            </div>
                        </div> :
                        <div className='w-full flex flex-row justify-center mt-8'>
                            <CircularProgress />
                        </div>
                }

                <div>
                    <Snackbar
                        open={successUpdate}
                        autoHideDuration={3000}
                        onClose={() => {
                            setUpdateSuccess(false);
                        }}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'center'
                        }}
                        TransitionComponent={Fade}
                    >
                        <Alert
                            onClose={() => {
                                setUpdateSuccess(false);
                            }} severity="none"
                            className='bg-purple rounded-lg text-white'
                            sx={{ width: 'auto', fontWeight: '700', fontFamily: 'inter', fontSize: '22' }}
                        >
                            {successUpdate}
                        </Alert>
                    </Snackbar>

                </div>
            </div>
        </div>
    )
}

export default Page