// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { RecaptchaVerifier, getAuth } from 'firebase/auth'
// // import { getAnalytics } from "firebase/analytics";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//     apiKey: "AIzaSyAiuIyprCIjIZzd4vxUTJakKsdi9hpCHuI",
//     authDomain: "voice-ai-a36f3.firebaseapp.com",
//     projectId: "voice-ai-a36f3",
//     storageBucket: "voice-ai-a36f3.appspot.com",
//     messagingSenderId: "583480872487",
//     appId: "1:583480872487:web:2b9e895137623b3dfac802",
//     measurementId: "G-34XCWFD251"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// // const analytics = getAnalytics(app);
// export const auth = getAuth(app);
// export { RecaptchaVerifier };



import { initializeApp } from "firebase/app";
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber, PhoneAuthProvider, signInWithCredential } from "firebase/auth";

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
// auth.settings.appVerificationDisabledForTesting = true;
export { auth, RecaptchaVerifier, signInWithPhoneNumber, PhoneAuthProvider, signInWithCredential };

