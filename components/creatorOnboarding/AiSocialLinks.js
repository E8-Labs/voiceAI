"use client"
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { Button } from '@mui/material'

function AiSocialLinks({ handleContinue, aiName }) {

    const [text, setText] = useState("");
    //socials url values
    const [fbUrl, setFburl] = useState("");
    const [youtubeUrl, setYoutubeurl] = useState("");
    const [appleProducts, setAppleProducts] = useState("");
    const [twitterUrl, setTwitterurl] = useState("");
    const [spotifyurl, setSpotifyurl] = useState("");
    const [instaUrl, setInstaurl] = useState("");

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
                        <Image src="/assets/placeholderImg.jpg" alt='Profile' //height={50} width={50}
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
                    <div className='sm:flex sm:flex-row sm:gap-2'>
                        <div>
                            {aiName}
                        </div>
                        <div className='flex flex-row gap-2 items-center'>
                            <Image style={styles.image}
                                src={'/assets/twiterIcon.png'} alt='Youtube'
                                height={30} width={30} />
                            <Image style={styles.image}
                                src={'/assets/youtubeIcon.png'} alt='Youtube'
                                height={30} width={30} />
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
                <div className='flex flex-row gap-5 mb-8'>
                    <Image style={styles.image}
                        src={'/assets/instagram.png'} alt='web'
                        height={30} width={30} />
                    <div className='bg-grayBg w-full sm:w-8/12' style={styles.button}>
                        <input style={styles.urlsInput}
                            value={instaUrl}
                            onChange={(e) => setInstaurl(e.target.value)}
                            className='w-full bg-transparent outline-none border-none px-2' type='text' placeholder='Paste URL'
                        />

                    </div>
                </div>

                <div className='flex flex-row gap-5 mb-8'>
                    <Image style={styles.image}
                        src={'/assets/youtubeIcon.png'} alt='Youtube'
                        height={30} width={30} />
                    <div className='bg-grayBg w-full sm:w-8/12' style={styles.button}>
                        <input style={styles.urlsInput}
                            value={youtubeUrl}
                            onChange={(e) => setYoutubeurl(e.target.value)}
                            className='w-full bg-transparent outline-none border-none px-2' type='text' placeholder='Paste URL'
                        />

                    </div>
                </div>

                <div className='flex flex-row gap-5 mb-8'>
                    <Image style={styles.image}
                        src={'/assets/twiterIcon.png'} alt='twiter'
                        height={30} width={30} />
                    <div className='bg-grayBg w-full sm:w-8/12' style={styles.button}>
                        <input style={styles.urlsInput}
                            value={twitterUrl}
                            onChange={(e) => setTwitterurl(e.target.value)}
                            className='w-full bg-transparent outline-none border-none px-2' type='text' placeholder='Paste URL'
                        />

                    </div>
                </div>

                <div className='flex flex-row gap-5 mb-8'>
                    <Image style={styles.image}
                        src={'/assets/appleProducts.png'} alt='Icon'
                        height={30} width={30} />
                    <div className='bg-grayBg w-full sm:w-8/12' style={styles.button}>
                        <input style={styles.urlsInput}
                            value={appleProducts}
                            onChange={(e) => setAppleProducts(e.target.value)}
                            className='w-full bg-transparent outline-none border-none px-2' type='text' placeholder='Paste URL'
                        />

                    </div>
                </div>

                <div className='flex flex-row gap-5 mb-8'>
                    <Image style={styles.image}
                        src={'/assets/spotify.png'} alt='tiktok'
                        height={30} width={30} />
                    <div className='bg-grayBg w-full sm:w-8/12' style={styles.button}>
                        <input style={styles.urlsInput}
                            value={spotifyurl}
                            onChange={(e) => setSpotifyurl(e.target.value)}
                            className='w-full bg-transparent outline-none border-none px-2' type='text' placeholder='Paste URL'
                        />

                    </div>
                </div>

                <div className='flex flex-row gap-5 mb-8'>
                    <Image style={styles.image}
                        src={'/assets/fbIcon.png'} alt='facebook'
                        height={30} width={30} />
                    <div className='bg-grayBg w-full sm:w-8/12' style={styles.button}>
                        {/* <input style={styles.urlsInput}
                            className='w-full bg-transparent outline-none border-none px-2' type='text' placeholder='Paste URL'
                        /> */}
                        <input style={styles.urlsInput}
                            value={fbUrl}
                            onChange={(e) => setFburl(e.target.value)}
                            className='w-full bg-transparent outline-none border-none px-2' type='text' placeholder='Paste URL'
                        />
                    </div>
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