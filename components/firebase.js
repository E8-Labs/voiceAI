
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

//check for browser friendly environment
let messaging = null;
let requestToken = null;


if (typeof window !== 'undefined' && "serviceWorker" in navigator) {
  //for notification permission
  messaging = getMessaging(app);

  requestToken = (FCMToken) => {
    //Wsm1QqLusvqnBUIT1PHoHymUfJua8iBVuKBU2O9arg4
    getToken(messaging, { vapidKey: process.env.NEXT_PUBLIC_Public_Notification_VAPID_key }).then((currentToken) => {
      if (currentToken) {
        console.log("Token is", currentToken);
        FCMToken(currentToken);
      } else {
        // Show permission request UI
        console.log('No registration token available. Request permission to generate one.');
        // ...
      }
    }).catch((err) => {
      console.log('An error occurred while retrieving token. ', err);
      // ...
    }).finally(() => {
      console.log("Access token request completed")
    });
  }
} else {
  console.log("FcM is not supported in this browser");
}


// auth.settings.appVerificationDisabledForTesting = true;


export { auth, RecaptchaVerifier, signInWithPhoneNumber, PhoneAuthProvider, signInWithCredential, messaging, requestToken };

