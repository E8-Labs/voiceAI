"use client"
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { signIn, signOut, useSession } from "next-auth/react";
import YouTubeVideos from '../socialAuth/YoutubeVideos';
import axios from 'axios';
import Apis from '../apis/Apis';
import { CircularProgress } from '@mui/material';
import { AppleLogo, FacebookLogo, InstagramLogo, SpotifyLogo, XLogo, YoutubeLogo } from '@phosphor-icons/react';

function SocialOAuth() {

    const { data: session } = useSession();
    const [loading, setLoading] = useState(false);
    const [instaLoading, setInstaLoading] = useState(false);
    const [posts, setPosts] = useState([]);

    const [authCode, setAuthCode] = useState(null);
    const [accessToken, setAccessToken] = useState(null);
    const [userInfo, setUserInfo] = useState(null);

    const clientId = process.env.NEXT_PUBLIC_INSTAGRAM_CLIENT_ID;
    const redirectUri = process.env.NEXT_PUBLIC_NEXTAUTH_URL;
    const clientSecret = process.env.NEXT_PUBLIC_INSTAGRAM_CLIENT_SECRET;

    const handleInstagramLogin = () => {
        setInstaLoading(true);
        const instagramAuthUrl = `https://api.instagram.com/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=user_profile,user_media&response_type=code`;
        window.location.href = instagramAuthUrl; // Redirect to Instagram login page
        setInstaLoading(false);
    };

    useEffect(() => {
        const handleCallback = async () => {
            const code = new URL(window.location.href).searchParams.get('code');
            if (code && !accessToken) {
                setAuthCode(code);
                try {
                    const response = await axios.post(
                        `https://api.instagram.com/auth/access_token`,
                        {
                            client_id: clientId,
                            client_secret: clientSecret,
                            grant_type: 'authorization_code',
                            redirect_uri: redirectUri,
                            code: code,
                        }
                    );
                    const { access_token } = response.data;
                    setAccessToken(access_token);

                    const userResponse = await axios.get(
                        `https://graph.instagram.com/me?fields=id,username&access_token=${access_token}`
                    );
                    setUserInfo(userResponse.data);
                    const postsResponse = await axios.get(
                        `https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,permalink,thumbnail_url,timestamp,username&access_token=${access_token}`
                    );
                    setPosts(postsResponse.data.data); // Set the fetched posts in state
                    console.log('user insta posts are', postsResponse.data.data)

                } catch (error) {
                    console.error('Error exchanging code for access token:', error.response ? error.response.data : error.message);
                }
            }
        };

        handleCallback();
    }, [accessToken, clientId, clientSecret, redirectUri]);


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


    const handleYoutubeSignin = async () => {
        setLoading(true);
        // window.open('/youtubelogin');
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
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": 'Bearer ' + AuthToken
                    }
                });
                if (response) {
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
        <div className='w-full flex flex-col justify-center items-center' >
            <div className='w-full' >

                <div
                    className="mt-2"
                    style={{
                        fontSize: 15,
                        fontWeight: "700",
                        fontFamily: "inter",
                    }}
                >
                    Social Accounts
                </div>

                <div className='text-gray-400 text-sm mt-3 mb-10 mb-5 w-11/12'>
                    This is used as your knowledge base to train your ai model.
                </div>
                <div className='flex flex-row w-full   justify-between mb-4 items-center'>
                    <div className='flex flex-row items-center gap-6'>
                        {/* <Image style={styles.image}
                            src={'/assets/instagram.png'} alt='web'
                            height={30} width={30} /> */}
                            <InstagramLogo size={25} />
                        <div style={SocialIconsName}>
                            Instagram
                        </div>
                    </div>
                    {
                        instaLoading ?
                            <CircularProgress size={20} /> :
                            <button className='bg-purple text-white px-2 py-1' style={connectButtonStyle}
                                onClick={handleInstagramLogin}>
                                Connect
                            </button>
                    }
                </div>

                <div className='flex flex-row w-full   mb-4 justify-between items-center'>
                    <div className='flex flex-row items-center gap-6'>
                        {/* <Image style={styles.image}
                            src={'/assets/youtubeIcon.png'} alt='Youtube'
                            height={30} width={30} /> */}
                        <YoutubeLogo size={25} />
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

                <div className='flex flex-row items-center justify-between w-full   mb-4'>
                    <div className='flex flex-row gap-6 items-center'>
                        {/* <Image style={styles.image}
                            src={'/assets/twiterIcon.png'} alt='twiter'
                            height={30} width={30} /> */}
                        <XLogo size={25} />
                        <div style={SocialIconsName}>
                            X(Formerly Twitter)
                        </div>
                    </div>
                    <button className='bg-purple text-white px-2 py-1' style={connectButtonStyle}>
                        Connect
                    </button>
                </div>

                <div className='flex flex-row w-full   mb-4 justify-between'>
                    <div className='flex flex-row gap-6 items-center'>
                        {/* <Image style={styles.image}
                            src={'/assets/appleProducts.png'} alt='Icon'
                            height={30} width={30} /> */}
                        <AppleLogo size={25} />
                        <div>
                            Apple Podcast
                        </div>
                    </div>
                    <button className='bg-purple text-white px-2 py-1' style={connectButtonStyle}>
                        Connect
                    </button>
                </div>

                <div className='flex flex-row w-full   mb-4 justify-between'>
                    <div className='flex flex-row gap-6 items-center'>
                        {/* <Image style={styles.image}
                            src={'/assets/spotify.png'} alt='tiktok'
                            height={30} width={30} /> */}
                        <SpotifyLogo size={25} />
                        <div style={SocialIconsName}>
                            Spotify Podcast
                        </div>
                    </div>
                    <button className='bg-purple text-white px-2 py-1' style={connectButtonStyle}>
                        Connect
                    </button>
                </div>

                <div className='flex flex-row w-full   mb-4 justify-between'>
                    <div className='flex flex-row gap-6 items-center'>
                        {/* <Image style={styles.image}
                            src={'/assets/fbIcon.png'} alt='facebook'
                            height={30} width={30} /> */}
                        <FacebookLogo size={25} />
                        <div style={SocialIconsName}>
                            Facebook
                        </div>
                    </div>
                    <button className='bg-purple text-white px-2 py-1' style={connectButtonStyle}>
                        Connect
                    </button>
                </div>
                {/* <div>
                    <button onClick={handleContinue}
                        className='bg-purple hover:bg-purple text-white px-4 mt-2 w-full   py-2'
                        style={{ fontSize: 15, fontWeight: "400", borderRadius: "50px" }}>
                        Continue
                    </button>
                </div> */}
            </div>
        </div>
    )
}

export default SocialOAuth