<template>
  <div class="group grid grid-cols-12 gap-4 py-5 md:py-6 border-b border-line transition-smooth hover:pl-2">
    <div class="col-span-5 md:col-span-4">
      <span class="font-sans text-sm md:text-base font-medium">{{ role }}</span>
    </div>
    <div class="col-span-4 md:col-span-5">
      <span class="font-sans text-sm md:text-base text-txt-secondary">{{ company }}</span>
    </div>
    <div class="col-span-3 text-right">
      <span class="font-mono text-xs md:text-sm text-txt-muted">{{ period }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  role: string
  company: string
  period: string
}>()
</script>
