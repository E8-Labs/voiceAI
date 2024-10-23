"use client"
import Apis from '@/components/apis/Apis';
import SocialOAuth from '@/components/creatorOnboarding/SocialOAuth';
import loginFunction from '@/components/loginFunction';
import { CircularProgress } from '@mui/material';
import { ApplePodcastsLogo, FacebookLogo, InstagramLogo, SpotifyLogo, XLogo, YoutubeLogo } from '@phosphor-icons/react';
import axios from 'axios';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { CircularProgressbar, CircularProgressbarWithChildren } from 'react-circular-progressbar';

const Page = () => {

    loginFunction();
    const [userDetails, setUserDetails] = useState(null);
    const value = 0.12;
    const [fbUrl, setFbUrl] = useState(null);
    const [youtubeUrl, setYoutubeUrl] = useState(null);
    const [twitterUrl, setTwitterUrl] = useState(null);
    const [applePodcastUrl, setApplePodcastUrl] = useState(null);
    const [spotifyUrl, setSpotifyUrl] = useState(null);
    const [instaUrl, setInstaUrl] = useState(null);
    const [loader, setLoader] = useState(false);

    const getAiApi = async () => {
        try {
            setLoader(true);
            console.log("Trying....")
            const ApiPath = Apis.MyAiapi;
            const localData = localStorage.getItem('User');
            const Data = JSON.parse(localData);
            const AuthToken = Data.data.token;
            console.log("Authtoken is", AuthToken);
            console.log("Apipath is", ApiPath);

            const response = await axios.get(ApiPath, {
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": "Bearer " + AuthToken
                }
            });
            // return
            if (response) {
                console.log("Response of getai on socials mein screen api", response.data.data);
                if (response.data) {
                    // setAiData(response.data.data);
                    if (response.data.status === true) {
                        let linkData = response.data.data
                        console.log("Data of user is", Data.data.user);
                        if (Data?.data?.user?.ai?.fbUrl) {
                            setFbUrl(Data.data.user.ai.fbUrl)
                        }
                        if (linkData?.ai?.youtubeUrl) {
                            setYoutubeUrl(linkData?.ai?.youtubeUrl)
                        }
                        if (linkData?.ai?.twitterUrl) {
                            setTwitterUrl(linkData?.ai?.twitterUrl)
                        }
                        // if (linkData?.ai?.fbUrl) {
                        //     setApplePodcastUrl(linkData?.ai?.fbUrl)
                        // }
                        if (linkData?.ai?.spotify_url) {
                            setSpotifyUrl(linkData?.ai?.spotify_url)
                        }
                        if (linkData?.ai?.instaUrl) {
                            setInstaUrl(linkData?.ai?.instaUrl)
                        }
                    }
                }
            }
        } catch (error) {
            console.error("ERR occured in get ai api is", error);
        } finally {
            setLoader(false);
        }
    }

    useEffect(() => {
        getAiApi();
    }, []);



    // useEffect(() => {
    //     const localData = localStorage.getItem('User');
    //     if (localData) {
    //         const Data = JSON.parse(localData);
    //         console.log("Data of user is", Data.data.user);
    //         setUserDetails(Data.data.user);
    //         if (Data?.data?.user?.ai?.fbUrl) {
    //             setFbUrl(Data.data.user.ai.fbUrl)
    //         }
    //         if (Data?.data?.user?.ai?.youtubeUrl) {
    //             setYoutubeUrl(Data?.data?.user?.ai?.youtubeUrl)
    //         }
    //         if (Data?.data?.user?.ai?.twitterUrl) {
    //             setTwitterUrl(Data?.data?.user?.ai?.twitterUrl)
    //         }
    //         // if (Data?.data?.user?.ai?.fbUrl) {
    //         //     setApplePodcastUrl(Data?.data?.user?.ai?.fbUrl)
    //         // }
    //         if (Data?.data?.user?.ai?.spotify_url) {
    //             setSpotifyUrl(Data?.data?.user?.ai?.spotify_url)
    //         }
    //         if (Data?.data?.user?.ai?.instaUrl) {
    //             setInstaUrl(Data?.data?.user?.ai?.instaUrl)
    //         }
    //     }
    // }, [])

    const styles = {
        button: {
            paddingTop: 6, paddingBottom: 8, paddingLeft: 8, paddingRight: 8, borderRadius: 5
        },
        input: {
            fontWeight: "500",
            fontSize: 13,
            fontFamily: "inter",
        }
    }

    return (
        <div className='w-full h-screen' style={{ overflow: 'auto', backgroundColor: "#ffffff40" }}>
            <div className='w-11/12 pt-12 pl-10 pb-8'>
                <div className='w-fll flex flex-row items-center justify-between'>
                    <p style={{ fontSize: 28, fontWeight: "500", fontFamily: "inter" }}>
                        Socials
                    </p>
                    {/* <Image
                        src="/assets/placeholderImg.jpg"
                        alt='profile'
                        height={70}
                        width={70}
                        style={{
                            width: '70px',
                            height: '70px',
                            backgroundColor: "",
                            borderRadius: "50%",
                            border: "3px solid white",
                            objectFit: 'cover',
                            objectPosition: 'center',
                            // backgroundColor: 'red'
                        }}
                    /> */}
                </div>
                <div className='w-11/12 flex flex-row items-center justify-between mt-4 bg-white px-6 py-4 rounded-2xl'>
                    <div className='flex flex-row items-center gap-2'>
                        <div style={{ height: "71px", width: "71px" }}>
                            <CircularProgressbar value={value} maxValue={1} text={`${value * 100}%`}
                                strokeWidth={4}
                                styles={{
                                    path: {
                                        stroke: `#552AFF`, // Change the color to red
                                    },
                                    text: {
                                        fill: '#000000', // Change the text color to red
                                        fontSize: 20,
                                        fontWeight: "500"
                                    },
                                    trail: {
                                        stroke: '#d6d6d6', // Change the trail color (if needed)
                                    },
                                }} />
                        </div>
                        <div className='flex flex-col gap-1'>
                            <div style={{ fontWeight: "500", fontSize: 15, fontFamily: "inter" }}>
                                Complete Profile
                            </div>
                            <div style={{ fontWeight: "500", fontSize: 13, fontFamily: "inter" }}>
                                Voice, Kb, SocialLinks etc
                            </div>
                        </div>
                    </div>
                    <div>
                        <button className='text-white bg-purple px-4 py-2' style={{ fontWeight: "500", fontSize: 13, fontFamily: "inter", borderRadius: "50px" }}>
                            Complete
                        </button>
                    </div>
                </div>

                <div className='w-11/12 flex flex-row items-start gap-4 mt-4'>
                    {
                        loader ?
                            <div className='w-6/12 flex flex-row justify-center mt-12'>
                                <CircularProgress size={35} />
                            </div> :
                            <div className='w-6/12 px-8 py-4 rounded-2xl' style={{ backgroundColor: "#ffffff70" }}>
                                <div className='mt-1' style={{ fontSize: 15, fontWeight: 500, fontFamily: "inter" }}>
                                    URL Links
                                </div>

                                {/* User social URL Links */}
                                <div className='flex flex-col gap-6'>
                                    <div className='flex flex-row gap-4 mt-7 items-center'>
                                        <FacebookLogo size={25} />
                                        <div className='bg-transparent w-full flex flex-row justify-between gap-2'
                                            style={styles.button}
                                        >
                                            <div className='w-full'>
                                                <input className='w-full bg-transparent outline-none border-none' style={styles.input}
                                                    value={fbUrl}
                                                    onChange={(e) => setFbUrl(e.target.value)}
                                                    placeholder='URL' />
                                            </div>

                                        </div>
                                    </div>

                                    <div className='flex flex-row gap-4 items-center'>
                                        <YoutubeLogo size={25} />
                                        <div className='bg-transparent w-full flex flex-row justify-between gap-2'
                                            style={styles.button}
                                        >
                                            <div className='w-full'>
                                                <input className='w-full bg-transparent outline-none border-none' style={styles.input}
                                                    value={youtubeUrl}
                                                    onChange={(e) => setYoutubeUrl(e.target.value)}
                                                    placeholder='URL' />
                                            </div>

                                        </div>
                                    </div>

                                    <div className='flex flex-row gap-4 items-center'>
                                        <XLogo size={25} />
                                        <div className='bg-transparent w-full flex flex-row justify-between gap-2'
                                            style={styles.button}
                                        >
                                            <div className='w-full'>
                                                <input className='w-full bg-transparent outline-none border-none' style={styles.input}
                                                    value={twitterUrl}
                                                    onChange={(e) => setTwitterUrl(e.target.value)}
                                                    placeholder='URL' />
                                            </div>

                                        </div>
                                    </div>

                                    <div className='flex flex-row gap-4 items-center'>
                                        <ApplePodcastsLogo size={25} />
                                        <div className='bg-transparent w-full flex flex-row justify-between gap-2'
                                            style={styles.button}
                                        >
                                            <div className='w-full'>
                                                <input className='w-full bg-transparent outline-none border-none' style={styles.input}
                                                    value={applePodcastUrl}
                                                    onChange={(e) => setApplePodcastUrl(e.target.value)}
                                                    placeholder='URL' />
                                            </div>

                                        </div>
                                    </div>

                                    <div className='flex flex-row items-center gap-4'>
                                        <SpotifyLogo size={25} />
                                        <div className='bg-transparent w-full flex flex-row justify-between gap-2'
                                            style={styles.button}
                                        >
                                            <div className='w-full'>
                                                <input className='w-full bg-transparent outline-none border-none' style={styles.input}
                                                    value={spotifyUrl}
                                                    onChange={(e) => setSpotifyUrl(e.target.value)}
                                                    placeholder='URL' />
                                            </div>

                                        </div>
                                    </div>

                                    <div className='flex flex-row gap-4 mb-5 items-center'>
                                        <InstagramLogo size={25} />
                                        <div className='bg-transparent w-full flex flex-row justify-between gap-2'
                                            style={styles.button}
                                        >
                                            <div className='w-full'>
                                                <input className='w-full bg-transparent outline-none border-none' style={styles.input}
                                                    value={instaUrl}
                                                    onChange={(e) => setInstaUrl(e.target.value)}
                                                    placeholder='URL' />
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                    }
                    <div className='w-6/12 px-8 py-4 rounded-2xl' style={{ backgroundColor: "#ffffff70" }}>
                        <SocialOAuth />
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Page