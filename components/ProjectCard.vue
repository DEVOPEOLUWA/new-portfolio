<template>
  <a
    :href="link"
    target="_blank"
    rel="noopener noreferrer"
    class="group block overflow-hidden rounded-xl hover-lift"
  >
    <!-- Image Container -->
    <div class="relative overflow-hidden rounded-xl aspect-[16/10]">
      <img
        :src="image"
        :alt="title"
        class="w-full h-full object-cover img-hover-color"
      />
      <!-- Overlay on hover -->
      <div class="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
    </div>

    <!-- Info -->
    <div class="mt-5 md:mt-6">
      <div class="flex flex-wrap gap-2 mb-3">
        <span
          v-for="t in tags"
          :key="t"
          class="mono-tag px-3 py-1 rounded-full border border-line"
        >
          {{ t }}
        </span>
      </div>
      <h3 class="font-display text-2xl sm:text-3xl md:text-4xl tracking-tight group-hover:text-accent transition-colors duration-300">
        {{ title }}
      </h3>
      <p v-if="description" class="mt-2 font-sans text-sm md:text-base text-txt-secondary leading-relaxed max-w-lg">
        {{ description }}
      </p>
    </div>
  </a>
</template>

<script setup lang="ts">
defineProps<{
  title: string
  image: string
  tags: string[]
  link: string
  description?: string
}>()
</script>
