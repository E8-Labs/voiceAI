// components/MetaTags.js

import Head from 'next/head';

const MetaTags = ({ title, description, image }) => {
    return (
        <Head>
            <meta property="og:type" content="website" />
            <meta property="og:title" content={"Andrew Tate"} />
            <meta property="og:description" content={"Andrew tate's CreatorX"} />
            <meta property="og:image" content={"https://static.independent.co.uk/2022/08/11/16/Andrew%20Tate.jpg?quality=75&width=1200&auto=webp"} />
            <meta property="og:url" content={typeof window !== 'undefined' ? window.location.href : ''} />
            
            <title>{title}</title>
        </Head>
    );
};

export default MetaTags;
