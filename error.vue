<script setup>
defineProps({
  error: Object,
})

async function handleClearError() {
  clearError()
  await navigateTo('/', {
    external: true,
  })
}
</script>

<template>
  <div v-if="error" class="grid h-screen place-content-center bg-white px-4">
    <div class="text-center">
      <h1 class="text-9xl font-black text-gray-200">
        {{ error?.statusCode }}
      </h1>

      <p class="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl">
        Uh-oh!
      </p>

      <p class="mt-4 text-gray-500">
        {{ error?.message }}
      </p>

      <code v-if="error?.data" class="block mt-4 bg-gray-50 rounded-md p-4" v-text="error?.data" />

      <NuxtLink
        class="mt-6 cursor-pointer inline-block rounded bg-indigo-600 px-5 py-3 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring"
        @click="handleClearError"
      >
        Go Back Home
      </NuxtLink>
    </div>
  </div>
</template>
