"use client"
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { signIn, signOut, useSession } from "next-auth/react";
import YouTubeVideos from '../socialAuth/YoutubeVideos';
import axios from 'axios';
import Apis from '../apis/Apis';

function SocialOAuth({ handleContinue, aiName, currentIndex }) {

    const [text, setText] = useState("");
    //socials url values
    const [fbUrl, setFburl] = useState("");
    const [youtubeUrl, setYoutubeurl] = useState("");
    const [appleProducts, setAppleProducts] = useState("");
    const [twitterUrl, setTwitterurl] = useState("");
    const [spotifyurl, setSpotifyurl] = useState("");
    const [instaUrl, setInstaurl] = useState("");
    const { data: session } = useSession();

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

    const connectButtonStyle = {
        borderRadius: '50px',
        fontWeight: '400',
        fontSize: 15,
        fontFamily: 'inter'
    }

    const SocialIconsName = {
        fontWeight: '400',
        fontSize: 15,
        fontFamily: 'inter'
    }

    const [loading, setLoading] = useState(false);

    const handleYoutubeSignin = async () => {
        setLoading(true);
        // window.open('/youtubelogin');
        localStorage.setItem('BuildaiIndex', JSON.stringify(currentIndex));
        await signIn('google'); // Signing in with Google (or YouTube via Google OAuth)
        // console.log("Data of session is", session);

        setLoading(false); // This will automatically redirect and update the session
    };

    const handleSignout = async () => {
        setLoading(true);
        signOut();
        setLoading(false);
    }

    const handleLoginGoogle = async () => {
        try {
            const localData = localStorage.getItem('User');
            if (localData) {
                const Data = JSON.parse(localData);
                console.log("Data from localstorage", Data.data.token);
                const AuthToken = Data.data.token;
                const apiData = {
                    providerAccountId: session.providerAccountId,
                    accessToken: session.accessToken,
                    idToken: session.idToken,
                    expiresAt: session.expires,
                    scope: session.scope
                }
                console.log("Data sending in api", apiData);
                const response = await axios.post(Apis.Login_Google, apiData, {
                    headers:{
                        "Content-Type" : "application/json",
                        "Authorization" : 'Bearer ' + AuthToken
                    }
                });
                if(response){
                    console.log("Response of api is", response.data);
                    
                }
            }
        } catch (error) {
            console.error("Error occured in api is", error);
        }
    }

    useEffect(() => {
        if (session) {
            console.log("Session data recieved", session);
            handleLoginGoogle();
        } else {
            console.log("No session data for now");

        }
    }, [session]);

    return (
        <div className='w-full flex flex-col justify-center items-center' style={{}} >
            <div className='w-full'>

                {/* <div className="mt-12 flex flex-row items-center gap-2">
                    <div className='flex flex-row items-center'>
                        <Image src="/myself.jpeg" alt='Profile' //height={50} width={50}
                            height={70}
                            width={70}
                            style={{
                                width: '70px',
                                height: '70px',
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
                </div> */}

                <div
                    className="mt-2"
                    style={{
                        fontSize: 24,
                        fontWeight: "600",
                        fontFamily: "inter",
                    }}
                >
                    Social OAuth
                </div>

                <div className='text-gray-400 text-sm mt-3 mb-10 mb-5 w-11/12'>
                    This is used as your knowledge base to train your ai model.
                </div>
                <div className='flex flex-row w-full sm:w-10/12 justify-between mb-8 items-center'>
                    <div className='flex flex-row items-center gap-6'>
                        <Image style={styles.image}
                            src={'/assets/instagram.png'} alt='web'
                            height={30} width={30} />
                        <div style={SocialIconsName}>
                            Instagram
                        </div>
                    </div>
                    <button className='bg-purple text-white px-2 py-1' style={connectButtonStyle}>
                        Connect
                    </button>
                </div>

                <div className='flex flex-row w-full sm:w-10/12 mb-8 justify-between items-center'>
                    <div className='flex flex-row items-center gap-6'>
                        <Image style={styles.image}
                            src={'/assets/youtubeIcon.png'} alt='Youtube'
                            height={30} width={30} />
                        <div style={SocialIconsName}>
                            Youtube
                        </div>
                    </div>
                    {!session ? (
                        <button
                            // onClick={() => signIn("google")}
                            onClick={handleYoutubeSignin}
                            className='bg-purple text-white px-2 py-1' style={connectButtonStyle}>
                            {loading ? 'Connecting...' : 'Connect'}
                        </button>
                    ) : (
                        <div>
                            <button
                                onClick={handleSignout}
                                className='bg-transparent text-purple px-2 py-1' style={connectButtonStyle}>
                                Signout
                            </button>
                            {/* <p>Welcome, {session.user.name}!</p>
                            <button onClick={() => signOut()}>Sign out</button>

                            <YouTubeVideos /> */}
                        </div>
                    )}
                </div>

                <div className='flex flex-row items-center justify-between w-full sm:w-10/12 mb-8'>
                    <div className='flex flex-row gap-6 items-center'>
                        <Image style={styles.image}
                            src={'/assets/twiterIcon.png'} alt='twiter'
                            height={30} width={30} />
                        <div style={SocialIconsName}>
                            X(Formerly Twitter)
                        </div>
                    </div>
                    <button className='bg-purple text-white px-2 py-1' style={connectButtonStyle}>
                        Connect
                    </button>
                </div>

                <div className='flex flex-row w-full sm:w-10/12 mb-8 justify-between'>
                    <div className='flex flex-row gap-6 items-center'>
                        <Image style={styles.image}
                            src={'/assets/appleProducts.png'} alt='Icon'
                            height={30} width={30} />
                        <div>
                            Apple Podcast
                        </div>
                    </div>
                    <button className='bg-purple text-white px-2 py-1' style={connectButtonStyle}>
                        Connect
                    </button>
                </div>

                <div className='flex flex-row w-full sm:w-10/12 mb-8 justify-between'>
                    <div className='flex flex-row gap-6 items-center'>
                        <Image style={styles.image}
                            src={'/assets/spotify.png'} alt='tiktok'
                            height={30} width={30} />
                        <div style={SocialIconsName}>
                            Spotify Podcast
                        </div>
                    </div>
                    <button className='bg-purple text-white px-2 py-1' style={connectButtonStyle}>
                        Connect
                    </button>
                </div>

                <div className='flex flex-row w-full sm:w-10/12 mb-8 justify-between'>
                    <div className='flex flex-row gap-6 items-center'>
                        <Image style={styles.image}
                            src={'/assets/fbIcon.png'} alt='facebook'
                            height={30} width={30} />
                        <div style={SocialIconsName}>
                            Facebook
                        </div>
                    </div>
                    <button className='bg-purple text-white px-2 py-1' style={connectButtonStyle}>
                        Connect
                    </button>
                </div>
                <div>
                    <button onClick={handleContinue}
                        className='bg-purple hover:bg-purple text-white px-4 mt-2 w-full sm:w-10/12 py-2'
                        style={{ fontSize: 15, fontWeight: "400", borderRadius: "50px" }}>
                        Continue
                    </button>
                    {/* {
                        fbUrl || youtubeUrl || appleProducts || twitterUrl || spotifyurl || instaUrl ?
                            <button onClick={handleContinue}
                                className='bg-purple hover:bg-purple text-white px-4 mt-2 w-full sm:w-10/12 py-2'
                                style={{ fontSize: 15, fontWeight: "400", borderRadius: "50px" }}>
                                Continue
                            </button> :
                            <button
                                disabled
                                // onClick={handleContinueSocial}
                                className='bg-purple2 hover:bg-purple text-white px-4 mt-2 w-full sm:w-10/12 py-2'
                                style={{ fontSize: 15, fontWeight: "400", borderRadius: "50px", color: "white" }}>
                                Continue
                            </button>
                    } */}
                </div>
            </div>
        </div>
    )
}

export default SocialOAuth