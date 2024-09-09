<script setup lang="ts">
useHead({
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk} - KawanLama To-Do` : 'KawanLama To-Do'
  },
})
</script>

<template>
  <div>
    <NuxtLoadingIndicator />
    <NuxtPage />
  </div>
</template>
