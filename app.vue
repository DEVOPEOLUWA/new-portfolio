<template>
  <div class="grain-overlay">
    <ClientOnly>
      <CustomCursor />
    </ClientOnly>
    <NuxtPage />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'

onMounted(() => {
  // Mark body as ready to prevent FOUC
  document.body.classList.add('app-ready')
})
</script>