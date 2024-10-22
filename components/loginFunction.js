import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'

const loginFunction = () => {

    const router = useRouter();

    useEffect(() => {
        const localData = localStorage.getItem('User');
        if (localData) {
            const Data = JSON.parse(localData);
            console.log("Data recieved from localstorage in global component :", Data);
            return
        }else{
            console.log("User is not logged in");
            router.push("/");
            console.log("User redirected")
            return;
        }
    })
}

export default loginFunction