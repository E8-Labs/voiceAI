"use client"
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { Box, Button, CircularProgress, Modal } from '@mui/material'
import { color } from 'framer-motion';
import { AppleLogo, ApplePodcastsLogo, FacebookLogo, Globe, InstagramLogo, LinkedinLogo, SpotifyLogo, TwitterLogo, XLogo, YoutubeLogo } from '@phosphor-icons/react';

function AiSocialLinks({ handleBuildAI, aiName, buildAiLoader }) {

    const [text, setText] = useState("");
    //socials url values
    const [fbUrl, setFburl] = useState("");
    const [youtubeUrl, setYoutubeurl] = useState("");
    const [appleProducts, setAppleProducts] = useState("");
    const [twitterUrl, setTwitterurl] = useState("");
    const [spotifyurl, setSpotifyurl] = useState("");
    const [instaUrl, setInstaurl] = useState("");
    const [webUrl, setWeburl] = useState("");
    const [linkedInUrl, setLinkedInurl] = useState("");
    const [userData, setUserData] = useState(null);
    const [validLinkErr, setValidLinkErr] = useState(false);
    const [validYoutubeLinkErr, setValidYoutubeLinkErr] = useState(false);
    const [validTwitterLinkErr, setValidTwitterLinkErr] = useState(false);
    const [validApplePodcastLinkErr, setValidApplePodcastLinkErr] = useState(false);
    const [validSpotifyLinkErr, setValidSpotifyLinkErr] = useState(false);
    const [validFacebookLinkErr, setValidFacebookLinkErr] = useState(false);
    const [validWebLinkErr, setValidWebLinkErr] = useState(false);
    const [validLinkedInLinkErr, setValidLinkedInLinkErr] = useState(false);
    const [addSocialsPopup, setAddSocialsPopup] = useState(false);
    //show the more socials icons
    const [showLinked, setShowLinkedIn] = useState(false);
    const [showWeb, setShowWeb] = useState(false);
    const [showApplePodCast, setShowApplePodcast] = useState(false);
    const [showFb, setShowFb] = useState(false);
    const [showSpotify, setShowSpotify] = useState(false);
    const [aiLoader, setAiLoader] = useState(buildAiLoader);
    //code for showing the new social links
    const [socials, setSocials] = useState(['instagram', 'youtube', 'twitter']);

    const handleAddSocial = (social) => {
        setSocials((prevSocials) => [...prevSocials, social]);
        setAddSocialsPopup(false); // Close modal after adding
    };

    useEffect(() => {
        const localData = localStorage.getItem('User');
        if (localData) {
            const Data = JSON.parse(localData);
            console.log("User data recieved", Data.data.user);
            setUserData(Data.data.user);
        }
    }, []);

    console.log("Loader status is", aiLoader)
    useEffect(() => {
        const localData = localStorage.getItem('socialsUrl');
        if (localData) {
            const Data = JSON.parse(localData);
            console.log("social inks data recieved", Data);
            if (Data.discord_url) {
                setAppleProducts(Data.discord_url)
            }
            if (Data.fb_url) {
                setFburl(Data.fb_url)
            }
            if (Data.insta_url) {
                setInstaurl(Data.insta_url)
            }
            if (Data.spotify_url) {
                setSpotifyurl(Data.spotify_url)
            }
            if (Data.twitter_url) {
                setTwitterurl(Data.twitter_url)
            }
            if (Data.youtube_url) {
                setYoutubeurl(Data.youtube_url)
            }
        }
    }, [])

    //validate instagram url
    // const validateInstagramUrl = (url) => {
    //     const profileRegex = /^(https?:\/\/)?(www\.)?instagram\.com\/[a-zA-Z0-9._]{1,30}(\/)?(\?.*)?$/;
    //     return profileRegex.test(url);
    // }

    //simple url validation pattern
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


    const handleContinueSocial = () => {
        const data = {
            fb_url: fbUrl,
            youtube_url: youtubeUrl,
            discord_url: appleProducts,
            twitter_url: twitterUrl,
            spotify_url: spotifyurl,
            insta_url: instaUrl
        }
        console.log("Social links url", data);

        localStorage.setItem('socialsUrl', JSON.stringify(data));
        handleBuildAI();
    }

    const styles = {
        image: {
            resize: "cover", objectFit: "contain"
        },
        button: {
            paddingTop: 8, paddingBottom: 8, paddingLeft: 5, paddingRight: 5, borderRadius: 5
        },
        buttonFont: {
            fontWeight: "400",
            fontSize: 13,
            fontFamily: "inter"
        },
        urlsInput: {
            fontWeight: "400",
            fontSize: 13,
            fontFamily: "inter"
        }
    }

    //code to make triangle
    const triangle = {
        width: 5,
        height: 5,
        // border: "2px solid red",
        borderTop: "4px solid transparent",
        borderBottom: "4px solid transparent",
        borderLeft: "6px solid #000000"
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

    return (
        <div className='w-full flex flex-col justify-center items-center' //style={{ height: '100%', overflow: 'auto' }} 
        >
            {/* remove scroll from here */}
            <div className='w-full'>

                <div className="mt-12 flex flex-row items-center gap-2">
                    <div className='flex flex-row items-center'>
                        <Image src={userData && userData.profile_image ? userData.profile_image : "/assets/placeholderImg.jpg"} alt='Profile' //height={50} width={50}
                            height={55}
                            width={55}
                            style={{
                                width: '55px',
                                height: '55px',
                                backgroundColor: "",
                                borderRadius: "50%",
                                border: "3px solid black",
                                objectFit: 'cover',
                                objectPosition: 'center',
                                padding: 4
                                // backgroundColor: 'red'
                            }} />
                        {/* <div style={triangle} /> */}
                    </div>
                    <div className='sm:flex sm:flex-row sm:gap-2 items-center'>
                        <div style={{ fontWeight: '400', fontSize: 15, fontFamily: 'inter' }}>
                            {/* {userData && userData.name ?
                                <div>
                                    {userData.name}
                                </div> :
                                <div>
                                    {userData && userData.email}
                                </div>
                            } */}

                            {aiName &&
                                <div>
                                    {aiName}
                                </div>
                            }
                        </div>
                        <div className='flex flex-row gap-2 items-center'>
                            {
                                instaUrl &&
                                <InstagramLogo size={25} />
                            }
                            {
                                youtubeUrl && <YoutubeLogo size={25} />
                            }
                            {
                                twitterUrl && <XLogo size={25} />
                            }
                            {
                                appleProducts && <ApplePodcastsLogo size={25} />
                            }
                            {
                                spotifyurl && <SpotifyLogo size={25} />
                            }
                            {
                                fbUrl && <FacebookLogo size={25} />
                            }
                            {
                                webUrl && <Globe size={25} />
                            }
                            {
                                linkedInUrl && <LinkedinLogo size={25} />
                            }
                        </div>
                    </div>
                </div>

                <div
                    className="mt-2"
                    style={{
                        fontSize: 24,
                        fontWeight: "600",
                        fontFamily: "inter",
                    }}
                >
                    Socials
                </div>

                <div className='text-gray-400 text-sm mt-3 mb-10 mb-5 w-11/12'>
                    {/* This is used as your knowledge base to train your ai model. */}
                    Add your social media pages
                </div>
                <div className='overflow-auto max-h-[40vh] scrollbar scrollbar-track-transparent scrollbar-thin scrollbar-thumb-purple'>
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
                                        <div className='flex flex-row gap-3 items-center mt-4'>
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
                                        <div className='flex flex-row gap-3 items-center mt-4'>
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
                                        <div className='flex flex-row gap-3 items-center mt-4'>
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
                                        <div className='flex flex-row gap-3 items-center mt-4'>
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
                                        <div className='flex flex-row gap-3 items-center mt-4'>
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
                                        <div className='flex flex-row gap-3 items-center mt-4'>
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
                </div>
            </div>
            <div className='w-full justify-start'>
                <button onClick={() => { setAddSocialsPopup(true) }}
                    className='text-purple px-4 mt-2 py-2'
                    style={{ fontSize: 15, fontWeight: "400", borderRadius: "50px" }}>
                    Add social
                </button>
            </div>
            <div className='w-full'>
                {
                    fbUrl || youtubeUrl || appleProducts || twitterUrl || spotifyurl || instaUrl || linkedInUrl || webUrl ?
                        <div>
                            {
                                buildAiLoader ?
                                    <div className=' w-full sm:w-9/12 flex flex-row justify-center mt-2'>
                                        <CircularProgress size={20} />
                                    </div> :
                                    <button onClick={handleContinueSocial}
                                        className='bg-purple hover:bg-purple text-white px-4 mt-2 w-full sm:w-9/12 outline-none border-none'
                                        // style={{ fontSize: 15, fontWeight: "400", borderRadius: "50px" }}
                                        style={{
                                            fontSize: 15,
                                            fontWeight: "400",
                                            height: "52px",
                                            borderRadius: "50px",
                                        }}
                                    >
                                        Continue
                                    </button>
                            }
                        </div> :
                        <button
                            disabled
                            // onClick={handleContinueSocial}
                            className='bg-purple2 hover:bg-purple2 text-white px-4 mt-2 w-full sm:w-9/12'
                            style={{
                                fontSize: 15,
                                fontWeight: "400",
                                height: "52px",
                                borderRadius: "50px",
                            }}
                        // style={{ fontSize: 15, fontWeight: "400", borderRadius: "50px", color: "white" }}
                        >
                            Continue
                        </button>
                }
            </div>


            {/* Modal to add more social links */}
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
    )
}

export default AiSocialLinks