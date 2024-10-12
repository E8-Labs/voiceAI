
import { initializeApp } from "firebase/app";
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber, PhoneAuthProvider, signInWithCredential } from "firebase/auth";
import { getMessaging, getToken } from "firebase/messaging"

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAiuIyprCIjIZzd4vxUTJakKsdi9hpCHuI",
    authDomain: "voice-ai-a36f3.firebaseapp.com",
    projectId: "voice-ai-a36f3",
    storageBucket: "voice-ai-a36f3.appspot.com",
    messagingSenderId: "583480872487",
    appId: "1:583480872487:web:2b9e895137623b3dfac802",
    measurementId: "G-34XCWFD251"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
console.log("Auth instance:", auth);
//for notification permission
const messaging = getMessaging(app);
// getToken(messaging, {vapidKey: "BP02e6DxWt-XrDCaKSciMKcKiltnwSNHATw8IEwX_9E8efLn_6HNoymQHY"});

// auth.settings.appVerificationDisabledForTesting = true;


//key pair generated is
//BP02e6DxWt-XrDCaKSciMKcKiltnwSNHATw8IEwX_9E8efLn_6HNoymQHY

export { auth, RecaptchaVerifier, signInWithPhoneNumber, PhoneAuthProvider, signInWithCredential, messaging };

