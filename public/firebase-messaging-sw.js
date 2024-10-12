// public/firebase-messaging-sw.js
importScripts('https://www.gstatic.com/firebasejs/8.8.0/firebase-app.js');
// eslint-disable-next-line no-undef
importScripts('https://www.gstatic.com/firebasejs/8.8.0/firebase-messaging.js');

// Your Firebase config here
const firebaseConfig = {
  apiKey: "AIzaSyAiuIyprCIjIZzd4vxUTJakKsdi9hpCHuI",
  authDomain: "voice-ai-a36f3.firebaseapp.com",
  projectId: "voice-ai-a36f3",
  storageBucket: "voice-ai-a36f3.appspot.com",
  messagingSenderId: "583480872487",
  appId: "1:583480872487:web:2b9e895137623b3dfac802",
  measurementId: "G-34XCWFD251"
};

// Initialize the Firebase app in the service worker
firebase.initializeApp(firebaseConfig);
// eslint-disable-next-line no-undef
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log(
    '[firebase-messaging-sw.js] Received background message ',
    payload
  );
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: './logo.png',
  };
  self.registration.showNotification(notificationTitle, notificationOptions);
});
