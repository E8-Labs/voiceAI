import Creator from '@/components/Creator';
import axios from 'axios';
import Apis from '@/components/apis/Apis';

// Dynamically generate metadata for Open Graph and Twitter
export async function generateMetadata({ params }) {
  const username = params.creator; // Get the dynamic username from the URL
  let title = `Creator: ${username}`;
  let description = `Explore amazing content from ${username} on CreatorX!`;
  let imageUrl = 'https://www.blindcircle.com/voiceapp/uploads/images/thumbnail_1727247585368.jpeg';

  try {
    // Fetch data from the API based on the username
    const response = await axios.get(`${Apis.GetAssistantData}?username=${username}`);
    const assistantData = response.data.data;

    if (assistantData) {
      title = `Creator: ${assistantData.assitant.name}`;
      description = `Explore amazing content from ${assistantData.assitant.name} on CreatorX!`;
      imageUrl = assistantData.profile_image || imageUrl;
    }
  } catch (error) {
    console.error('Error fetching assistant data:', error);
  }

  // This metadata will be used for sharing the link (Open Graph, Twitter, etc.)
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [
        {
          url: imageUrl,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [imageUrl],
    },
  };
}

// The page component itself
const Page = async ({ params }) => {
  const { username } = params; // Get the username from the URL

  return (
    <div className='w-full'>
      <Creator username={username} /> {/* Pass the username to the Creator component */}
    </div>
  );
};

export default Page;
