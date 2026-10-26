<template>
  <div class="app">
    <ClientOnly>
      <CustomCursor />
    </ClientOnly>
    <NuxtPage />
  </div>
</template>

<script setup lang="ts">
const { sync } = useFlavour()
onMounted(sync)
</script>
