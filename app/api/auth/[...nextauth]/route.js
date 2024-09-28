import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { NextResponse } from 'next/server';

export const authOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            authorization: {
                params: {
                    scope: "openid email profile https://www.googleapis.com/auth/youtube https://www.googleapis.com/auth/youtube.readonly https://www.googleapis.com/auth/youtube.force-ssl",
                },
            },
        }),
    ],
    callbacks: {
        async jwt({ token, account }) {
            console.log("JWT callback called");
            console.log("Account data:", account);
            console.log("Token data before update:", token);
            // localStorage.setItem("Token", JSON.stringify(token))
            // localStorage.setItem("Account", JSON.stringify(account))
            if (account) {
                token.accessToken = account.access_token;
                token.refreshToken = account.refresh_token;
                token.expiresAt = account.expires_at;
                token.scope = account.scope;
                token.idToken = account.id_token;
                token.providerAccountId = account.providerAccountId;
            }

            console.log("Token data after update:", token);
            return token;
        },
        async session({ session, token }) {
            console.log("Session callback called", session);
            console.log("Token data:", token);
            session.refreshToken = token.refreshToken;
            session.accessToken = token.accessToken;
            // session.expiresAt = token.expires_at;
            session.scope = token.scope;
            session.idToken = token.idToken;
            session.providerAccountId = token.providerAccountId;
            console.log("Session after update", session);
            return session;

        },
    },
    // debug: true, // Enable debug mode

};
