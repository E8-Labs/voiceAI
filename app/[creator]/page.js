import Creator from '@/components/Creator';
import axios from 'axios';
import Apis from '@/components/apis/Apis';

// Dynamically generate metadata for Open Graph and Twitter
export async function generateMetadata({ params }) {
  const username = params.creator;
  let title = `Creator: ${username}`;
  let description = `Explore amazing content from ${username} on CreatorX!`;
  let imageUrl = 'https://www.blindcircle.com/voiceapp/uploads/images/thumbnail_1727247585368.jpeg';

  try {
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

  return {
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
  const { username } = params;

  return (
    <div className='w-full'>
      <Creator username={username} />
    </div>
  );
};

export default Page;
