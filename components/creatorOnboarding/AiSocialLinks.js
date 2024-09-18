"use client"
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { Button } from '@mui/material'
import { color } from 'framer-motion';

function AiSocialLinks({ handleContinue, aiName }) {

    const [text, setText] = useState("");
    //socials url values
    const [fbUrl, setFburl] = useState("");
    const [youtubeUrl, setYoutubeurl] = useState("");
    const [appleProducts, setAppleProducts] = useState("");
    const [twitterUrl, setTwitterurl] = useState("");
    const [spotifyurl, setSpotifyurl] = useState("");
    const [instaUrl, setInstaurl] = useState("");
    const [userData, setUserData] = useState(null);
    const [validLinkErr, setValidLinkErr] = useState(false);
    const [validYoutubeLinkErr, setValidYoutubeLinkErr] = useState(false);
    const [validTwitterLinkErr, setValidTwitterLinkErr] = useState(false);
    const [validApplePodcastLinkErr, setValidApplePodcastLinkErr] = useState(false);
    const [validSpotifyLinkErr, setValidSpotifyLinkErr] = useState(false);
    const [validFacebookLinkErr, setValidFacebookLinkErr] = useState(false);

    useEffect(() => {
        const localData = localStorage.getItem('User');
        if (localData) {
            const Data = JSON.parse(localData);
            console.log("User data recieved", Data.data.user);
            setUserData(Data.data.user);
        }
    }, []);

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
        handleContinue();
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

    return (
        <div className='w-full flex flex-col justify-center items-center' style={{}} >
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
                        <div style={triangle} />
                    </div>
                    <div className='sm:flex sm:flex-row sm:gap-2 items-center'>
                        <div style={{ fontWeight: '400', fontSize: 15, fontFamily: 'inter' }}>
                            {userData && userData.name ?
                                <div>
                                    {userData.name}
                                </div> :
                                <div>
                                    {userData && userData.email}
                                </div>
                            }
                        </div>
                        <div className='flex flex-row gap-2 items-center'>
                            {
                                instaUrl && <Image style={styles.image}
                                    src={'/assets/instagram.png'} alt='Youtube'
                                    height={30} width={30} />
                            }
                            {
                                youtubeUrl && <Image style={styles.image}
                                    src={'/assets/youtubeIcon.png'} alt='Youtube'
                                    height={30} width={30} />
                            }
                            {
                                twitterUrl && <Image style={styles.image}
                                    src={'/assets/twiterIcon.png'} alt='Youtube'
                                    height={30} width={30} />
                            }
                            {
                                appleProducts && <Image style={styles.image}
                                    src={'/assets/appleProducts.png'} alt='Youtube'
                                    height={30} width={30} />
                            }
                            {
                                spotifyurl && <Image style={styles.image}
                                    src={'/assets/spotify.png'} alt='Youtube'
                                    height={30} width={30} />
                            }
                            {
                                fbUrl && <Image style={styles.image}
                                    src={'/assets/fbIcon.png'} alt='Youtube'
                                    height={30} width={30} />
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
                    This is used as your knowledge base to train your ai model.
                </div>
                <div className='flex flex-row gap-5'>
                    <Image style={styles.image}
                        src={'/assets/instagram.png'} alt='web'
                        height={30} width={30} />
                    <div className='bg-grayBg w-full sm:w-8/12' style={styles.button}>
                        <input style={styles.urlsInput}
                            value={instaUrl}
                            onChange={(e) => {
                                setInstaurl(e.target.value);
                                const url = e.target.value;

                                if (instaUrl) {
                                    if (validateUrl(url)) {
                                        console.log("Valid URL");
                                        setValidLinkErr(false);
                                    } else {
                                        console.log("Invalid URL");
                                        setValidLinkErr(true);
                                    }
                                }
                            }}
                            className='w-full bg-transparent outline-none border-none px-2' type='text' placeholder='Paste URL'
                        />
                    </div>
                </div>
                <div className='mt-2 mb-8' style={linkErrStyle}>
                    {
                        instaUrl && validLinkErr && "Invalid link" //: 'valid'
                    }
                </div>

                <div className='flex flex-row gap-5'>
                    <Image style={styles.image}
                        src={'/assets/youtubeIcon.png'} alt='Youtube'
                        height={30} width={30} />
                    <div className='bg-grayBg w-full sm:w-8/12' style={styles.button}>
                        <input style={styles.urlsInput}
                            value={youtubeUrl}
                            onChange={(e) => {
                                setYoutubeurl(e.target.value);
                                const url = e.target.value;

                                if (youtubeUrl) {
                                    if (validateUrl(url)) {
                                        console.log("Valid URL");
                                        setValidYoutubeLinkErr(false);
                                    } else {
                                        console.log("Invalid URL");
                                        setValidYoutubeLinkErr(true);
                                    }
                                }
                            }}
                            className='w-full bg-transparent outline-none border-none px-2' type='text' placeholder='Paste URL'
                        />
                    </div>
                </div>
                <div className='mt-2 mb-8' style={linkErrStyle}>
                    {
                        youtubeUrl && validYoutubeLinkErr && "Invalid link"
                    }
                </div>

                <div className='flex flex-row gap-5'>
                    <Image style={styles.image}
                        src={'/assets/twiterIcon.png'} alt='twiter'
                        height={30} width={30} />
                    <div className='bg-grayBg w-full sm:w-8/12' style={styles.button}>
                        <input style={styles.urlsInput}
                            value={twitterUrl}
                            onChange={(e) => {
                                setTwitterurl(e.target.value);
                                const url = e.target.value;

                                if (twitterUrl) {
                                    if (validateUrl(url)) {
                                        console.log("Valid URL");
                                        setValidTwitterLinkErr(false);
                                    } else {
                                        console.log("Invalid URL");
                                        setValidTwitterLinkErr(true);
                                    }
                                }
                            }}
                            className='w-full bg-transparent outline-none border-none px-2' type='text' placeholder='Paste URL'
                        />

                    </div>
                </div>
                <div className='mt-2 mb-8' style={linkErrStyle}>
                    {
                        twitterUrl && validTwitterLinkErr && "Invalid link"
                    }
                </div>

                <div className='flex flex-row gap-5'>
                    <Image style={styles.image}
                        src={'/assets/appleProducts.png'} alt='Icon'
                        height={30} width={30} />
                    <div className='bg-grayBg w-full sm:w-8/12' style={styles.button}>
                        <input style={styles.urlsInput}
                            value={appleProducts}
                            onChange={(e) => {
                                setAppleProducts(e.target.value);
                                const url = e.target.value;

                                if (appleProducts) {
                                    if (validateUrl(url)) {
                                        console.log("Valid URL");
                                        setValidApplePodcastLinkErr(false);
                                    } else {
                                        console.log("Invalid URL");
                                        setValidApplePodcastLinkErr(true);
                                    }
                                }
                            }}
                            className='w-full bg-transparent outline-none border-none px-2' type='text' placeholder='Paste URL'
                        />

                    </div>
                </div>
                <div className='mt-2 mb-8' style={linkErrStyle}>
                    {
                        appleProducts && validApplePodcastLinkErr && "Invalid link"
                    }
                </div>

                <div className='flex flex-row gap-5'>
                    <Image style={styles.image}
                        src={'/assets/spotify.png'} alt='tiktok'
                        height={30} width={30} />
                    <div className='bg-grayBg w-full sm:w-8/12' style={styles.button}>
                        <input style={styles.urlsInput}
                            value={spotifyurl}
                            onChange={(e) => {
                                setSpotifyurl(e.target.value);
                                const url = e.target.value;

                                if (spotifyurl) {
                                    if (validateUrl(url)) {
                                        console.log("Valid URL");
                                        setValidSpotifyLinkErr(false);
                                    } else {
                                        console.log("Invalid URL");
                                        setValidSpotifyLinkErr(true);
                                    }
                                }
                            }}
                            className='w-full bg-transparent outline-none border-none px-2' type='text' placeholder='Paste URL'
                        />

                    </div>
                </div>
                <div className='mt-2 mb-8' style={linkErrStyle}>
                    {
                        spotifyurl && validSpotifyLinkErr && "Invalid link"
                    }
                </div>

                <div className='flex flex-row gap-5'>
                    <Image style={styles.image}
                        src={'/assets/fbIcon.png'} alt='facebook'
                        height={30} width={30} />
                    <div className='bg-grayBg w-full sm:w-8/12' style={styles.button}>
                        {/* <input style={styles.urlsInput}
                            className='w-full bg-transparent outline-none border-none px-2' type='text' placeholder='Paste URL'
                        /> */}
                        <input style={styles.urlsInput}
                            value={fbUrl}
                            onChange={(e) => {
                                setFburl(e.target.value);
                                const url = e.target.value;

                                if (spotifyurl) {
                                    if (validateUrl(url)) {
                                        console.log("Valid URL");
                                        setValidFacebookLinkErr(false);
                                    } else {
                                        console.log("Invalid URL");
                                        setValidFacebookLinkErr(true);
                                    }
                                }
                            }}
                            className='w-full bg-transparent outline-none border-none px-2' type='text' placeholder='Paste URL'
                        />
                    </div>
                </div>
                <div className='mt-2 mb-8' style={linkErrStyle}>
                    {
                        fbUrl && validFacebookLinkErr && "Invalid link"
                    }
                </div>
                <div>
                    {
                        fbUrl || youtubeUrl || appleProducts || twitterUrl || spotifyurl || instaUrl ?
                            <button onClick={handleContinueSocial}
                                className='bg-purple hover:bg-purple text-white px-4 mt-2 w-full sm:w-9/12 py-2'
                                style={{ fontSize: 15, fontWeight: "400", borderRadius: "50px" }}>
                                Continue
                            </button> :
                            <button
                                disabled
                                // onClick={handleContinueSocial}
                                className='bg-purple2 hover:bg-purple text-white px-4 mt-2 w-full sm:w-9/12 py-2'
                                style={{ fontSize: 15, fontWeight: "400", borderRadius: "50px", color: "white" }}>
                                Continue
                            </button>
                    }
                </div>
            </div>
        </div>
    )
}

export default AiSocialLinks