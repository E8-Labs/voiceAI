import React, { useEffect, useState } from 'react';
import { CircularProgressbar, CircularProgressbarWithChildren } from 'react-circular-progressbar';
import Apis from './apis/Apis';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const ProfileStat = () => {

    const router = useRouter();

    const value = 0.2;

    const [showSocials, setShowSocials] = useState(false);
    const [showKb, setShowKb] = useState(false);
    // const [showSocials, setShowSocials] = useState(false);

    const getAiApi = async () => {
        try {
            console.log("Trying....");
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
                console.log("Response of getai on parent screen api", response.data.data);
                if (response.data) {
                    localStorage.setItem('aiPersonaDetails', JSON.stringify(response.data.data));
                    if (response.data.data.ai.audio === null) {
                        // setshowVoi(true);
                    }
                    if (response.data.data.kb.length < 0) {
                        setShowKb(true)
                    }
                    const ResponseData = response.data.data.ai;
                    if (ResponseData.discordUrl || ResponseData.fbUrl || ResponseData.instaUrl || ResponseData.twitterUrl || ResponseData.webUrl || ResponseData.youtubeUrl === "") {
                        setShowSocials(true);
                    }
                }
            }
        } catch (error) {
            console.error("ERR occured in get ai api is", error);
        } finally {
            // setLoader(false);
        }
    }

    useEffect(() => {
        getAiApi();
    }, []);

    return (
        <div>
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
                            {
                                showKb && (
                                    <button onClick={() => { router.push('/creator/profile/knowledgebase') }}>
                                        Knowledge Base,
                                    </button>
                                )
                            }
                            {
                                showSocials && (
                                    <button onClick={() => { router.push('/creator/profile/socials') }}>
                                        Missing Social Links,
                                    </button>
                                )
                            }
                            {
                                showKb || showSocials && (
                                    "etc"
                                )
                            }
                        </div>
                    </div>
                </div>
                <div>
                    <button className='text-white bg-purple px-4 py-2' style={{ fontWeight: "500", fontSize: 13, fontFamily: "inter", borderRadius: "50px" }}>
                        Complete
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ProfileStat;
