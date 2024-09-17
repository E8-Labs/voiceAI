"use client"; // Mark this as a Client Component

import { useSession } from "next-auth/react";
import { useState } from "react";

export default function YouTubeVideos() {
    const { data: session } = useSession();
    const [videos, setVideos] = useState([]);
    const [error, setError] = useState(null);

    const fetchUserVideos = async () => {
        if (!session?.accessToken) return;

        try {

            let token = localStorage.get("Token")
            console.log("Token object from localStorage is ", token)
            let account = localStorage.get("Account")
            console.log("Account object from localStorage is ", account)
            console.log("Access Token is ", session.accessToken)
            console.log("Refresh Token is ", session.refreshToken)
            // Step 1: Get the user's channel ID
            const channelResponse = await fetch(
                "https://www.googleapis.com/youtube/v3/channels?part=id&mine=true",
                {
                    headers: {
                        Authorization: `Bearer ${session.accessToken}`,
                    },
                }
            );
            const channelData = await channelResponse.json();

            // Check if the channel data has items
            if (!channelData.items || channelData.items.length === 0) {
                setError("No channels found for this user.");
                return;
            }

            const channelId = channelData.items[0].id;

            // Step 2: Get the user's uploaded videos using the channel ID

            const videosResponse = await fetch(
                `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&maxResults=10&type=video&order=date`,
                {
                    headers: {
                        Authorization: `Bearer ${session.accessToken}`,
                    },
                }
            );
            const videosData = await videosResponse.json();

            // Check if videos were returned
            if (!videosData.items || videosData.items.length === 0) {
                setError("No videos found for this channel.");
                return;
            }

            setVideos(videosData.items); // Store videos in state to display them
        } catch (error) {
            console.error("Error fetching YouTube videos:", error);
            setError("An error occurred while fetching videos.");
        }
    };

    return (
        <div>
            <button onClick={fetchUserVideos}>Get User Videos</button>
            {error && <p>{error}</p>}
            <ul>
                {videos.map((video) => (
                    <li key={video.id.videoId}>
                        <h3>{video.snippet.title}</h3>
                        <p>{video.snippet.description}</p>
                        <img src={video.snippet.thumbnails.default.url} alt={video.snippet.title} />
                    </li>
                ))}
            </ul>
        </div>
    );
}
