// // components/MetaTags.js

// import Head from 'next/head';

// const MetaTags = ({ title, description, image }) => {
//     console.log("Meta tags of Hamza tate are ", {title, description, image})
//     return (
//         <Head>
//             <meta property="og:type" content="website" />
//             <meta property="og:title" content={title} />
//             <meta property="og:description" content={description} />
//             {/* <meta property="og:image" content={image} /> */}
//             <meta property="og:image:secure_url" content={image} />
//             <meta property="og:url" content={typeof window !== 'undefined' ? window.location.href : ''} />
//             <meta name="twitter:card" content="summary_large_image" />
//             <meta name="twitter:title" content={title} />
//             <meta name="twitter:description" content={description} />
//             <meta name="twitter:image" content={image} />
//             <title>{title}</title>
//         </Head>
//     );
// };

// export default MetaTags;


import React from 'react';
import Head from 'next/head';

const MetaTags = React.memo(({ title, description,  }) => {
    console.log("Meta tags of Hamza tate are ", { title, description,  });
    return (
        <Head>
            <meta property="og:type" content="website" />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:image:secure_url" content="/myself.jpeg" />
            <meta property="og:url" content={typeof window !== 'undefined' ? window.location.href : ''} />
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content="myself.jpeg" />
            <title>{title}</title>
        </Head>
    );
});

export default MetaTags;


