import { initializeApp } from "firebase/app";
import { getToken } from "firebase/messaging";
import { getMessaging } from "firebase/messaging/sw";
import axios from "axios";

export const firebaseConfig = {
  apiKey: `${import.meta.env.VITE_API_KEY}`,
  authDomain: `${import.meta.env.VITE_AUTHDOMAIN}`,
  projectId: `${import.meta.env.VITE_PROJECTID}`,
  storageBucket: `${import.meta.env.VITE_STORAGEBUCKET}`,
  messagingSenderId: `${import.meta.env.VITE_MESSAGINGSENDERID}`,
  appId: `${import.meta.env.VITE_APPID}`,
  measurementId: `${import.meta.env.VITE_MEASUREMENTID}`,
};
const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);


export default messaging;


getToken(messaging, { vapidKey: `${import.meta.env.VITE_VAPID_KEY}` })
  .then(async (currentToken) => {
    if (currentToken) {
      console.log("currentToken", currentToken);
       const config = {
         headers: {
           Authorization: "key=" + `${import.meta.env.VITE_SERVER_KEY}`,
         },
       };

       const url = `${import.meta.env.VITE_FCM_URL}`;

       const data = {
         notification: {
           title: "PUSH NOTIFICATION FROM POST API",
           body: "push notification",
           icon: "firebase-logo.png",
           click_action:
             `${import.meta.env.MODE}` === "production"
               ? `${import.meta.env.VITE_DOMIAN_URL}`
               : "http://localhost:3001/",
         },
         to: currentToken,
       };
      await axios.post(url, data, config);
    } else {
      console.log("No registration token available");
    }
  })
  .catch((err) => {
    console.log("err", err);
  });

