"use client"
import ProfileStat from '@/components/ProfileStat';
import Apis from '@/components/apis/Apis';
import SocialOAuth from '@/components/creatorOnboarding/SocialOAuth';
import loginFunction from '@/components/loginFunction';
import { Box, CircularProgress, Modal } from '@mui/material';
import { ApplePodcastsLogo, FacebookLogo, Globe, InstagramLogo, LinkedinLogo, SpotifyLogo, XLogo, YoutubeLogo } from '@phosphor-icons/react';
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
    const [linkedInUrl, setLinkedInUrl] = useState("");
    const [webUrl, setWebUrl] = useState("");
    // const [spotifyurl, setSpotifyurl] = useState("");
    const [appleProducts, setAppleProducts] = useState("");
    const [loader, setLoader] = useState(false);

    const [validLinkErr, setValidLinkErr] = useState(false);
    const [validYoutubeLinkErr, setValidYoutubeLinkErr] = useState(false);
    const [validTwitterLinkErr, setValidTwitterLinkErr] = useState(false);
    const [validApplePodcastLinkErr, setValidApplePodcastLinkErr] = useState(false);
    const [validSpotifyLinkErr, setValidSpotifyLinkErr] = useState(false);
    const [validFacebookLinkErr, setValidFacebookLinkErr] = useState(false);
    const [validWebLinkErr, setValidWebLinkErr] = useState(false);
    const [validLinkedInLinkErr, setValidLinkedInLinkErr] = useState(false);
    const [addSocialsPopup, setAddSocialsPopup] = useState(false);

    const [socials, setSocials] = useState([]);
    const [availableSocials, setAvailableSocials] = useState(['instagram', 'youtube', 'twitter', 'facebook', 'linkedin', 'web', 'applepodcast', 'spotify']);
    const [updateLoader, setUpdateLoader] = useState(false);

    // const handleAddSocial = (social) => {
    //     setSocials((prevSocials) => [...prevSocials, social]);
    //     setAddSocialsPopup(false); // Close modal after adding
    // };

    const handleRemoveSocial = (social) => {
        setSocials((prevSocials) => prevSocials.filter((s) => s !== social));
        setAvailableSocials((prevAvailable) => [...prevAvailable, social]);
        switch (social) {
            case 'facebook': setFbUrl(""); break;
            case 'youtube': setYoutubeUrl(""); break;
            case 'twitter': setTwitterUrl(""); break;
            case 'instagram': setInstaUrl(""); break;
            case 'spotify': setSpotifyUrl(""); break;
            case 'applepodcast': setApplePodcastUrl(""); break;
            // Add cases for other socials as needed
            default: break;
        }
    };

    const handleAddSocial = (social) => {
        setSocials((prevSocials) => [...prevSocials, social]);
        setAvailableSocials((prevAvailable) => prevAvailable.filter((s) => s !== social));
        setAddSocialsPopup(false);
    };

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
                    // if (response.data.status === true) {
                    //     let linkData = response.data.data
                    //     console.log("Data of user is", Data.data.user);
                    //     if (Data?.data?.user?.ai?.fbUrl) {
                    //         setFbUrl(Data.data.user.ai.fbUrl)
                    //     }
                    //     if (linkData?.ai?.youtubeUrl) {
                    //         setYoutubeUrl(linkData?.ai?.youtubeUrl)
                    //     }
                    //     if (linkData?.ai?.twitterUrl) {
                    //         setTwitterUrl(linkData?.ai?.twitterUrl)
                    //     }
                    //     // if (linkData?.ai?.fbUrl) {
                    //     //     setApplePodcastUrl(linkData?.ai?.fbUrl)
                    //     // }
                    //     if (linkData?.ai?.spotify_url) {
                    //         setSpotifyUrl(linkData?.ai?.spotify_url)
                    //     }
                    //     if (linkData?.ai?.instaUrl) {
                    //         setInstaUrl(linkData?.ai?.instaUrl)
                    //     }
                    // }

                    if (response && response.data.status === true) {
                        const linkData = response.data.data.ai;
                        const initialSocials = [];

                        if (linkData.fbUrl) {
                            setFbUrl(linkData.fbUrl);
                            initialSocials.push('facebook');
                        }
                        if (linkData.youtubeUrl) {
                            setYoutubeUrl(linkData.youtubeUrl);
                            initialSocials.push('youtube');
                        }
                        if (linkData.twitterUrl) {
                            setTwitterUrl(linkData.twitterUrl);
                            initialSocials.push('twitter');
                        }
                        if (linkData.spotify_url) {
                            setSpotifyUrl(linkData.spotify_url);
                            initialSocials.push('spotify');
                        }
                        if (linkData.instaUrl) {
                            setInstaUrl(linkData.instaUrl);
                            initialSocials.push('instagram');
                        }
                        if (linkData.applePodcastUrl) {
                            setApplePodcastUrl(linkData.applePodcastUrl);
                            initialSocials.push('applepodcast');
                        }

                        setSocials(initialSocials);
                        setAvailableSocials(availableSocials.filter(social => !initialSocials.includes(social)));
                    }
                }
            }
        } catch (error) {
            console.error("ERR occured in get ai api is", error);
        } finally {
            setLoader(false);
        }
    }

    const handleUpdateAi = async () => {
        try {
            setUpdateLoader(true);
            console.log("Trying....")
            const ApiPath = Apis.UpdateBuilAI;
            const localData = localStorage.getItem('User');
            const Data = JSON.parse(localData);
            const AuthToken = Data.data.token;
            console.log("Authtoken is", AuthToken);
            console.log("Apipath is", ApiPath);
            const formData = new FormData();
            if (applePodcastUrl) {
                formData.append("discord_url", applePodcastUrl);
            }
            if (fbUrl) {
                formData.append("fb_url", fbUrl);
            }
            if (instaUrl) {
                formData.append("insta_url", instaUrl);
            }
            if (spotifyUrl) {
                formData.append("spotify_url", spotifyUrl);
            }
            if (twitterUrl) {
                formData.append("twitter_url", twitterUrl);
            }
            if (youtubeUrl) {
                formData.append("youtube_url", youtubeUrl);
            }

            console.log("Data being sent to the API:");
            for (let [key, value] of formData.entries()) {
                console.log(`${key}: ${value}`);
            }

            const response = await axios.post(ApiPath, {
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": "Bearer " + AuthToken
                }
            });

            if (response) {
                console.log("Response of update ai api is :::", response.data.data);
            }
        } catch (error) {
            console.error("Error occured in update ai api is", error);
        } finally {
            setUpdateLoader(false);
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

    const styleLoginModal = {
        height: 'auto',
        bgcolor: 'transparent',
        // p: 2,
        mx: 'auto',
        my: '50vh',
        transform: 'translateY(-55%)',
        borderRadius: 2,
        border: "none",
        outline: "none",
        // border: "2px solid green"
    };



    const validateUrl = (url) => {
        const urlRegex = /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/[^\s]*)?$/;
        return urlRegex.test(url);
    };

    const linkErrStyle = {
        fontSize: 12, height: 13,
        fontFamily: 'inter', fontWeight: '400',
        color: '#FF0100',
        marginLeft: 50
    }

    return (
        <div className='w-full h-screen' style={{ overflow: 'auto', backgroundColor: "#ffffff40" }}>
            <div className='w-11/12 pt-2 pl-10 pb-8'>
                <div className='w-fll flex flex-row items-center justify-between'>

                    {/*<p style={{ fontSize: 28, fontWeight: "500", fontFamily: "inter" }}>
                        Socials
                    </p>
                     <Image
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
                {/*<div className='w-11/12 flex flex-row items-center justify-between mt-4 bg-white px-6 py-4 rounded-2xl'>
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
                            </div>*/}

                <div>
                    <ProfileStat />
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
                                {/* <div className='flex flex-col gap-6'>
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
                                </div> */}


                                {/* <div className='overflow-auto max-h-[40vh] scrollbar scrollbar-track-transparent scrollbar-thin scrollbar-thumb-purple mt-4'>
                                    {socials.map((social) => {
                                        switch (social) {
                                            case 'instagram':
                                                return (
                                                    <div key="instagram">
                                                        <div className='flex flex-row gap-3 items-center'>
                                                            <InstagramLogo size={30} />
                                                            <div className='bg-grayBg w-full sm:w-8/12' style={styles.button}>
                                                                <input style={styles.urlsInput}
                                                                    value={instaUrl}
                                                                    onChange={(e) => {
                                                                        setInstaurl(e.target.value);
                                                                        const url = e.target.value;

                                                                        if (url && url.trim().length > 0) {
                                                                            if (validateUrl(url)) {
                                                                                console.log("Valid URL");
                                                                                setValidLinkErr(false);
                                                                            } else {
                                                                                console.log("Invalid URL");
                                                                                setValidLinkErr(true);
                                                                            }
                                                                        } else {
                                                                            // Optionally reset the error when input is cleared
                                                                            setValidLinkErr(false);
                                                                        }
                                                                    }}
                                                                    className='w-full bg-transparent outline-none border-none px-2'
                                                                    type='text' placeholder='Paste Instagram URL'
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className='mt-1 mb-1' style={linkErrStyle}>
                                                            {
                                                                instaUrl && validLinkErr && "Invalid link" //: 'valid'
                                                            }
                                                        </div>
                                                    </div>
                                                );
                                            case 'youtube':
                                                return (
                                                    <div key="youtube">
                                                        <div className='flex flex-row gap-3 items-center'>
                                                            <YoutubeLogo size={30} />
                                                            <div className='bg-grayBg w-full sm:w-8/12' style={styles.button}>
                                                                <input style={styles.urlsInput}
                                                                    value={youtubeUrl}
                                                                    onChange={(e) => {
                                                                        setYoutubeurl(e.target.value);
                                                                        const url = e.target.value;

                                                                        if (url && url.trim().length > 0) {
                                                                            if (validateUrl(url)) {
                                                                                console.log("Valid URL");
                                                                                setValidYoutubeLinkErr(false);
                                                                            } else {
                                                                                console.log("Invalid URL");
                                                                                setValidYoutubeLinkErr(true);
                                                                            }
                                                                        } else {
                                                                            // Optionally reset the error when input is cleared
                                                                            setValidYoutubeLinkErr(false);
                                                                        }
                                                                    }}
                                                                    className='w-full bg-transparent outline-none border-none px-2'
                                                                    type='text' placeholder='Paste YouTube URL'
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className='mt-1 mb-2' style={linkErrStyle}>
                                                            {
                                                                youtubeUrl && validYoutubeLinkErr && "Invalid link"
                                                            }
                                                        </div>
                                                    </div>
                                                );
                                            case 'twitter':
                                                return (
                                                    <div key="twitter">
                                                        <div className='flex flex-row gap-3 items-center'>
                                                            <XLogo size={30} />
                                                            <div className='bg-grayBg w-full sm:w-8/12' style={styles.button}>
                                                                <input style={styles.urlsInput}
                                                                    value={twitterUrl}
                                                                    onChange={(e) => {
                                                                        setTwitterurl(e.target.value);
                                                                        const url = e.target.value;

                                                                        if (url && url.trim().length > 0) {
                                                                            if (validateUrl(url)) {
                                                                                console.log("Valid URL");
                                                                                setValidTwitterLinkErr(false);
                                                                            } else {
                                                                                console.log("Invalid URL");
                                                                                setValidTwitterLinkErr(true);
                                                                            }
                                                                        } else {
                                                                            // Optionally reset the error when input is cleared
                                                                            setValidTwitterLinkErr(false);
                                                                        }
                                                                    }}
                                                                    className='w-full bg-transparent outline-none border-none px-2'
                                                                    type='text' placeholder='Paste Twitter URL'
                                                                />
                                                            </div>
                                                        </div>

                                                        <div className='mt-1 mb-2' style={linkErrStyle}>
                                                            {
                                                                twitterUrl && validTwitterLinkErr && "Invalid link"
                                                            }
                                                        </div>
                                                    </div>
                                                );
                                            case 'facebook':
                                                return (
                                                    <div key="facebook">
                                                        <div className='flex flex-row gap-3 items-center'>
                                                            <FacebookLogo size={30} />
                                                            <div className='bg-grayBg w-full sm:w-8/12' style={styles.button}>
                                                                <input style={styles.urlsInput}
                                                                    value={fbUrl}
                                                                    onChange={(e) => {
                                                                        setFburl(e.target.value);
                                                                        const url = e.target.value;

                                                                        if (url && url.trim().length > 0) {
                                                                            if (validateUrl(url)) {
                                                                                console.log("Valid URL");
                                                                                setValidFacebookLinkErr(false);
                                                                            } else {
                                                                                console.log("Invalid URL");
                                                                                setValidFacebookLinkErr(true);
                                                                            }
                                                                        } else {
                                                                            // Optionally reset the error when input is cleared
                                                                            setValidFacebookLinkErr(false);
                                                                        }

                                                                        // if (fbUrl) {
                                                                        //     if (validateUrl(url)) {
                                                                        //         console.log("Valid URL");
                                                                        //         setValidFacebookLinkErr(false);
                                                                        //     } else {
                                                                        //         console.log("Invalid URL");
                                                                        //         setValidFacebookLinkErr(true);
                                                                        //     }
                                                                        // }
                                                                    }}
                                                                    className='w-full bg-transparent outline-none border-none px-2'
                                                                    type='text' placeholder='Paste Facebook URL'
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className='mt-1 mb-2' style={linkErrStyle}>
                                                            {
                                                                fbUrl && validFacebookLinkErr && "Invalid link"
                                                            }
                                                        </div>
                                                    </div>
                                                );
                                            case 'linkedin':
                                                return (
                                                    <div key="linkedin">
                                                        <div className='flex flex-row gap-3 items-center'>
                                                            <LinkedinLogo size={30} />
                                                            <div className='bg-grayBg w-full sm:w-8/12' style={styles.button}>
                                                                <input style={styles.urlsInput}
                                                                    value={linkedInUrl}
                                                                    onChange={(e) => {
                                                                        setLinkedInurl(e.target.value);
                                                                        const url = e.target.value;

                                                                        if (url && url.trim().length > 0) {
                                                                            if (validateUrl(url)) {
                                                                                console.log("Valid URL");
                                                                                setValidLinkedInLinkErr(false);
                                                                            } else {
                                                                                console.log("Invalid URL");
                                                                                setValidLinkedInLinkErr(true);
                                                                            }
                                                                        } else {
                                                                            // Optionally reset the error when input is cleared
                                                                            setValidLinkedInLinkErr(false);
                                                                        }
                                                                    }}
                                                                    className='w-full bg-transparent outline-none border-none px-2'
                                                                    type='text' placeholder='Paste LinkedIn URL'
                                                                />
                                                            </div>
                                                        </div>

                                                        <div className='mt-1 mb-2' style={linkErrStyle}>
                                                            {
                                                                linkedInUrl && validLinkedInLinkErr && "Invalid link"
                                                            }
                                                        </div>
                                                    </div>
                                                );
                                            case 'web':
                                                return (
                                                    <div key="web">
                                                        <div className='flex flex-row gap-3 items-center'>
                                                            <Globe size={30} />
                                                            <div className='bg-grayBg w-full sm:w-8/12' style={styles.button}>
                                                                <input style={styles.urlsInput}
                                                                    value={webUrl}
                                                                    onChange={(e) => {
                                                                        setWeburl(e.target.value);
                                                                        const url = e.target.value;

                                                                        if (url && url.trim().length > 0) {
                                                                            if (validateUrl(url)) {
                                                                                console.log("Valid URL");
                                                                                setValidWebLinkErr(false);
                                                                            } else {
                                                                                console.log("Invalid URL");
                                                                                setValidWebLinkErr(true);
                                                                            }
                                                                        } else {
                                                                            // Optionally reset the error when input is cleared
                                                                            setValidWebLinkErr(false);
                                                                        }
                                                                    }}
                                                                    className='w-full bg-transparent outline-none border-none px-2'
                                                                    type='text' placeholder='Paste Website URL'
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className='mt-1 mb-2' style={linkErrStyle}>
                                                            {
                                                                webUrl && validWebLinkErr && "Invalid link"
                                                            }
                                                        </div>
                                                    </div>
                                                );
                                            case 'applepodcast':
                                                return (
                                                    <div key="applepodcast">
                                                        <div className='flex flex-row gap-3 items-center'>
                                                            <ApplePodcastsLogo size={30} />
                                                            <div className='bg-grayBg w-full sm:w-8/12' style={styles.button}>
                                                                <input style={styles.urlsInput}
                                                                    value={appleProducts}
                                                                    onChange={(e) => {
                                                                        setAppleProducts(e.target.value);
                                                                        const url = e.target.value;

                                                                        if (url && url.trim().length > 0) {
                                                                            if (validateUrl(url)) {
                                                                                console.log("Valid URL");
                                                                                setValidApplePodcastLinkErr(false);
                                                                            } else {
                                                                                console.log("Invalid URL");
                                                                                setValidApplePodcastLinkErr(true);
                                                                            }
                                                                        } else {
                                                                            // Optionally reset the error when input is cleared
                                                                            setValidApplePodcastLinkErr(false);
                                                                        }
                                                                    }}
                                                                    className='w-full bg-transparent outline-none border-none px-2'
                                                                    type='text' placeholder='Paste Apple Podcast URL'
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className='mt-1 mb-2' style={linkErrStyle}>
                                                            {
                                                                appleProducts && validApplePodcastLinkErr && "Invalid link"
                                                            }
                                                        </div>
                                                    </div>
                                                );
                                            case 'spotify':
                                                return (
                                                    <div key="spotify">
                                                        <div className='flex flex-row gap-3 items-center'>
                                                            <SpotifyLogo size={30} />
                                                            <div className='bg-grayBg w-full sm:w-8/12' style={styles.button}>
                                                                <input style={styles.urlsInput}
                                                                    value={spotifyurl}
                                                                    onChange={(e) => {
                                                                        setSpotifyurl(e.target.value);
                                                                        const url = e.target.value;

                                                                        if (url && url.trim().length > 0) {
                                                                            if (validateUrl(url)) {
                                                                                console.log("Valid URL");
                                                                                setValidSpotifyLinkErr(false);
                                                                            } else {
                                                                                console.log("Invalid URL");
                                                                                setValidSpotifyLinkErr(true);
                                                                            }
                                                                        } else {
                                                                            // Optionally reset the error when input is cleared
                                                                            setValidSpotifyLinkErr(false);
                                                                        }
                                                                    }}
                                                                    className='w-full bg-transparent outline-none border-none px-2'
                                                                    type='text' placeholder='Paste Spotify URL'
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className='mt-1 mb-2' style={linkErrStyle}>
                                                            {
                                                                spotifyurl && validSpotifyLinkErr && "Invalid link"
                                                            }
                                                        </div>
                                                    </div>
                                                );
                                            default:
                                                return null;
                                        }
                                    })}
                                </div> */}

                                <div className='overflow-auto max-h-[40vh] scrollbar scrollbar-track-transparent scrollbar-thin scrollbar-thumb-purple mt-4'>
                                    {socials.map((social) => (
                                        <div key={social}>
                                            <div className='flex flex-row gap-3 items-center'>
                                                {/* Render appropriate logo based on social */}
                                                {social === 'instagram' && <InstagramLogo size={30} />}
                                                {social === 'youtube' && <YoutubeLogo size={30} />}
                                                {social === 'twitter' && <XLogo size={30} />}
                                                {social === 'facebook' && <FacebookLogo size={30} />}
                                                {social === 'linkedin' && <LinkedinLogo size={30} />}
                                                {social === 'web' && <Globe size={30} />}
                                                {social === 'applepodcast' && <ApplePodcastsLogo size={30} />}
                                                {social === 'spotify' && <SpotifyLogo size={30} />}

                                                <div className='bg-grayBg w-full sm:w-full' style={styles.button}>
                                                    <input
                                                        style={styles.urlsInput}
                                                        value={
                                                            social === 'instagram' ? instaUrl :
                                                                social === 'youtube' ? youtubeUrl :
                                                                    social === 'twitter' ? twitterUrl :
                                                                        social === 'facebook' ? fbUrl :
                                                                            social === 'linkedin' ? linkedInUrl :
                                                                                social === 'web' ? webUrl :
                                                                                    social === 'applepodcast' ? applePodcastUrl :
                                                                                        social === 'spotify' ? spotifyUrl : ""
                                                        }
                                                        onChange={(e) => {
                                                            const url = e.target.value;
                                                            // Update respective URL state
                                                            social === 'instagram' && setInstaUrl(url);
                                                            social === 'youtube' && setYoutubeUrl(url);
                                                            social === 'twitter' && setTwitterUrl(url);
                                                            social === 'facebook' && setFbUrl(url);
                                                            social === 'linkedin' && setLinkedInUrl(url);
                                                            social === 'web' && setWebUrl(url);
                                                            social === 'applepodcast' && setApplePodcastUrl(url);
                                                            social === 'spotify' && setSpotifyUrl(url);
                                                        }}
                                                        className='w-full bg-transparent outline-none border-none px-2'
                                                        type='text'
                                                        placeholder={`Paste ${social.charAt(0).toUpperCase() + social.slice(1)} URL`}
                                                    />
                                                </div>

                                                {/* Close button */}
                                                <button onClick={() => handleRemoveSocial(social)}>
                                                    <Image src={"/assets/croseBtn.png"} alt='cross' height={20} width={20} />
                                                </button>
                                            </div>
                                            {/* Display error message conditionally */}
                                            <div className='mt-1 mb-2' style={linkErrStyle}>
                                                {
                                                    social === 'instagram' && instaUrl && validLinkErr && "Invalid Instagram link" ||
                                                    social === 'youtube' && youtubeUrl && validYoutubeLinkErr && "Invalid YouTube link" ||
                                                    social === 'twitter' && twitterUrl && validTwitterLinkErr && "Invalid Twitter link" ||
                                                    social === 'facebook' && fbUrl && validFacebookLinkErr && "Invalid Facebook link"
                                                    // Add other social error cases as needed
                                                }
                                            </div>
                                        </div>
                                    ))}

                                    {/* Modal to add new social link */}
                                    {/* {addSocialsPopup && (
                                        <div>
                                            <h3>Select a social to add</h3>
                                            {availableSocials.map((social) => (
                                                <button key={social} onClick={() => handleAddSocial(social)}>
                                                    {social.charAt(0).toUpperCase() + social.slice(1)}
                                                </button>
                                            ))}
                                            <button onClick={() => setAddSocialsPopup(false)}>Close</button>
                                        </div>
                                    )} */}


                                    <Modal
                                        open={addSocialsPopup}
                                        onClose={() => setAddSocialsPopup(false)}
                                        closeAfterTransition
                                        BackdropProps={{
                                            timeout: 1000,
                                            sx: {
                                                backgroundColor: 'transparent',
                                                backdropFilter: 'blur(10px)',
                                            },
                                        }}
                                    >
                                        <Box className="lg:w-5/12 sm:w-7/12 w-full" sx={styleLoginModal}>
                                            <div style={{ backgroundColor: '#D3D3D360', padding: 18, borderRadius: 10 }}>
                                                <div style={{ fontWeight: '700', fontFamily: 'inter', fontSize: 16 }}>Add More Socials</div>
                                                <div className='flex flex-row items-center gap-4 mt-4'>
                                                    {!socials.includes('linkedin') && (
                                                        <button onClick={() => handleAddSocial('linkedin')}>
                                                            <LinkedinLogo size={30} />
                                                        </button>
                                                    )}
                                                    {!socials.includes('web') && (
                                                        <button onClick={() => handleAddSocial('web')}>
                                                            <Globe size={30} />
                                                        </button>
                                                    )}
                                                    {!socials.includes('facebook') && (
                                                        <button onClick={() => handleAddSocial('facebook')}>
                                                            <FacebookLogo size={30} />
                                                        </button>
                                                    )}
                                                    {!socials.includes('applepodcast') && (
                                                        <button onClick={() => handleAddSocial('applepodcast')}>
                                                            <ApplePodcastsLogo size={30} />
                                                        </button>
                                                    )}
                                                    {!socials.includes('spotify') && (
                                                        <button onClick={() => handleAddSocial('spotify')}>
                                                            <SpotifyLogo size={30} />
                                                        </button>
                                                    )}
                                                </div>
                                            </div>
                                        </Box>
                                    </Modal>



                                </div>

                                <div className='flex flex-row items-center justify-between w-full'>
                                    <button className='underline text-purple' onClick={() => { setAddSocialsPopup(true) }}>
                                        Add New
                                    </button>
                                    {
                                        updateLoader ?
                                            <CircularProgress size={20} /> :
                                            <button className='underline text-purple' onClick={handleUpdateAi}>
                                                Save
                                            </button>
                                    }
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