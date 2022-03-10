<script setup>
import { ref, onMounted, getCurrentInstance } from 'vue'
import { provide } from 'vue'
import messaging from './service/firebase-init'

const app = getCurrentInstance()
provide('messaging', messaging)
onMounted(() => {
  console.log('Firebase cloud messaging object', app.appContext.config.globalProperties.messaging)
})

</script>

<template>
  <div>
    <header class="bg-white shadow" v-if="$route.meta.title">
      <div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 bg-gray-50">
        <h1
          class="text-3xl font-bold leading-tight text-gray-900"
        >
          {{ $route.meta.title }}
        </h1>
      </div>
    </header>
    <main>
      <router-view />
    </main>
  </div>
</template>
