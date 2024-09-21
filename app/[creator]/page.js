// "use client"
import Creator from '@/components/Creator';
// import React, { useEffect } from 'react';
import MetaTags from '@/components/Metatags/MetaTags';

const Page = () => {

    // const [getAssistantData, setGetAssistantData] = useState(null);


    // const getUserData = async () => {
    //     // console.log("Username for testing", creator);
    //     const ApiPath = `${Apis.GetAssistantData}?username=${creator}`;
    //     console.log("Api path is", ApiPath);
    //     try {
    //         const getResponse = await axios.get(ApiPath, {
    //             headers: {
    //                 "Content-Type": "application/json"
    //             }
    //         });
    //         if (getResponse) {
    //             if (getResponse.data.status === true) {
    //                 const AssistanName = creator;
    //                 localStorage.setItem('assistantName', JSON.stringify(AssistanName));
    //                 console.log("Response of getassistant data", getResponse.data.data);
    //                 const AssistantData = getResponse.data.data;
    //                 localStorage.setItem('assistantData', JSON.stringify(AssistantData));
    //                 setGetAssistantData(getResponse.data.data);
    //             } else {
    //                 setAssistantDataErr(true);
    //             }
    //         } else {
    //             console.log("Error occured");
    //         }
    //     } catch (error) {
    //         console.error("Error occured in getassistant api is", error);
    //     }
    // }

    // useEffect(() => {
    //     getUserData();
    // }, []);

    return (
        <>
            {/* <MetaTags
                // title={`Creator: Hamza tate`}
                title={`Creator: Hamza tate`}
                description={`Explore amazing content from Hamza tate on CreatorX!`}
                image={'/myself.jpeg'} // URL fetched from your API
            /> */}
            <div className='w-full'>
                <Creator />
            </div>
        </>
    )
}

export default Page;
