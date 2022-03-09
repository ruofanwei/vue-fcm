<script setup>
import ButtonRepo from "@/components/ButtonRepo.vue";
import { inject, reactive } from "vue";
import { getMessaging, onMessage } from "firebase/messaging";
// const messaging = inject("messaging");
const notification = reactive({
  title: '',
  body: ''
})
const messaging = getMessaging();
onMessage(messaging, (payload) => {
  console.log("Message received. ", payload);
  notification.title = payload.notification.title
  notification.body = payload.notification.body
});
if ("serviceWorker" in navigator) {
  window.navigator.serviceWorker.register("/firebase-messaging-sw.js").then(
    function (registration) {
      console.log("Service worker registration succeeded:", registration);
    },
    /*catch*/ function (error) {
      console.log("Service worker registration failed:", error);
    }
  );
} else {
  console.log("Service workers are not supported.");
}
</script>

<template>
  <div class="bg-gray-50">
    <div
      class="
        mx-auto
        max-w-screen-xl
        px-4
        py-12
        sm:px-6
        lg:flex lg:items-center lg:justify-between lg:py-16 lg:px-8
      "
    >
      <h2
        class="
          text-3xl
          font-bold
          leading-9
          tracking-tight
          text-gray-900
          sm:text-4xl sm:leading-10
        "
      >
        Message
        <br />
        <span class="text-indigo-600 text-xl">title: {{notification.title}}</span>
        <br />
        <span class="text-indigo-600 text-xl">body: {{notification.body}}</span>
      </h2>
      <div class="mt-8 flex lg:mt-0 lg:flex-shrink-0">
        <div class="inline-flex rounded-md shadow">
          <router-link
            to="/about"
            class="
              inline-flex
              items-center
              justify-center
              rounded-md
              border border-transparent
              bg-indigo-600
              px-5
              py-3
              text-base
              font-medium
              leading-6
              text-white
              transition
              duration-150
              ease-in-out
              hover:bg-indigo-500
              focus:outline-none
            "
            >Next Page</router-link
          >
        </div>
        <ButtonRepo />
      </div>
    </div>
  </div>
</template>
