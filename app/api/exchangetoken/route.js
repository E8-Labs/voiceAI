import { NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(req) {
    try {
        const body = await req.json();
        console.log('Received request body:', body);

        const { client_id, client_secret, redirect_uri, code } = body;
        console.log('Client ID:', client_id);
        console.log('Client Secret:', client_secret);
        console.log('Redirect URI:', redirect_uri);
        console.log('Code:', code);

        const response = await axios.post(
            `https://api.instagram.com/oauth/access_token`,
            {
                client_id,
                client_secret,
                grant_type: 'authorization_code',
                redirect_uri,
                code,
            }
        );

        console.log('Received response from Instagram API:', response.data);
        return NextResponse.json(response.data);
    } catch (error) {
        console.error('Error exchanging code for access token:', error.response ? error.response.data : error.message);
        return NextResponse.json({ error: 'Failed to exchange code for access token' }, { status: 500 });
    }
}
