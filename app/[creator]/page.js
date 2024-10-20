import Creator from '@/components/Creator';
import axios from 'axios';
import Apis from '@/components/apis/Apis';

// Dynamically generate the metadata (title, description, etc.)
export async function generateMetadata({ params }) {
  let title = "Creator: AndrewTate";
  let description = "Explore amazing content from Tate.ai!";
  let imageUrl = 'https://www.blindcircle.com/voiceapp/uploads/images/thumbnail_1727247585368.jpeg';

  try {
    // Fetch data from the API
    const response = await axios.get(`${Apis.GetAssistantData}?username=AndrewTate`);
    const assistantData = response.data.data;

    if (assistantData) {
      title = `Creator: ${assistantData.assitant.name}`;
      description = `Explore amazing content from ${assistantData.assitant.name} on CreatorX!`;
      imageUrl = assistantData.profile_image || imageUrl; // fallback if image is missing
    }
  } catch (error) {
    console.error('Error fetching assistant data:', error);
  }

  return {
    title,
    description,
    icons: {
      icon: imageUrl,
    },
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
const Page = async () => {
  return (
    <div className='w-full'>
      <Creator />
    </div>
  );
};

export default Page;
