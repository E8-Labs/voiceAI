'use client'
import React, { useCallback, useEffect, useState } from 'react'
import { signIn, signOut, useSession } from "next-auth/react";

const Page = () => {

    const { data: session } = useSession();
    const [loaded, setLoaded ] = useState(false)
    //testing
    const handleLogin = useCallback (async () => {
        let loaded = local
        if(!loaded){
            await signIn('google');
            
        }
    }, [])

    useEffect(() => {
        handleLogin()
        setLoaded(true)
    },[])

    return (
        <div>
            hello
        </div>
    )
}

export default Page