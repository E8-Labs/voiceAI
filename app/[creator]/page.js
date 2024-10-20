

import Creator from '@/components/Creator';
import MetaTags from '@/components/Metatags/MetaTags';
import axios from 'axios';
import Apis from '@/components/apis/Apis';
import Head from 'next/head';

export const metadata = {
    title: "Creator : AndrewTate",
    description: "Explore amazing content from Tate.ai",
};

const Page = async () => {


    return (

        <>
            <Head>
                <link rel="icon" href="/myself.jpeg" />
            </Head>
            <div className='w-full'>
                <Creator />
            </div>
        </>
    );
};

export default Page;
