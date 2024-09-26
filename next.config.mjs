// /** @type {import('next').NextConfig} */
// const nextConfig = {
//     images: {
//         domains: ['randomuser.me', 'www.blindcircle.com:444'],
//       },
// };

// export default nextConfig;


/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.blindcircle.com',
        port: '444',  // Specify the port here
        pathname: '/voiceapp/uploads/images/**',  // Allow specific path
      },
      {
        protocol: 'https',
        hostname: 'randomuser.me',  // Another domain you're using
      },
      {
        protocol: 'https',
        hostname: 'iggi-media.s3.amazonaws.com',  // Another domain you're using
      },
    ],
  },
};

export default nextConfig;

