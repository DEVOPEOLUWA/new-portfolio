<template>
  <div :class="['mb-12 md:mb-16', alignment === 'center' ? 'text-center' : '']">
    <span v-if="tag" class="mono-tag mb-4 block">{ {{ tag }} }</span>
    <h2 class="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[0.95] tracking-tight">
      <slot>{{ title }}</slot>
    </h2>
    <div
      v-if="showDivider"
      class="accent-divider mt-6"
      :class="alignment === 'center' ? 'mx-auto' : ''"
    />
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title?: string
  tag?: string
  alignment?: 'left' | 'center'
  showDivider?: boolean
}>()
</script>
