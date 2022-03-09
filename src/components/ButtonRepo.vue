
<script setup>
import { inject } from "vue";
import { getToken } from "firebase/messaging";
const messaging = inject("messaging");

function onSend(){

getToken(messaging, { vapidKey: `${import.meta.env.VITE_VAPID_KEY}` })
  .then((currentToken) => {
    if (currentToken) {
      console.log("currentToken", currentToken);
    } else {
      console.log("No registration token available");
    }
  })
  .catch((err) => {
    console.log("err", err);
  });


  if ("serviceWorker" in navigator) {
        window.navigator.serviceWorker
          .register("/firebase-messaging-sw.js")
          .then(
            function (registration) {
              const title = 'SEND NOTIFICATION FROM CLICK EVENT'
              const body = 'send background message from click event'
              registration.showNotification(title, {body})
            },
            /*catch*/ function (error) {
              console.log("Service worker registration failed:", error);
            }
          );
      } else {
        console.log("Service workers are not supported.");
      }
}
</script>

<template>
  <div class="ml-3 inline-flex rounded-md shadow">
    <button
      @click="onSend"
      class="
        inline-flex
        items-center
        justify-center
        rounded-md
        border border-transparent
        bg-white
        px-5
        py-3
        text-base
        font-medium
        leading-6
        text-indigo-600
        transition
        duration-150
        ease-in-out
        hover:text-indigo-500
        focus:outline-none
      "
    >
      Send Notification
    </button>
  </div>
</template>
