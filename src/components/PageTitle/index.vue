<script setup>
import { useRoute } from 'vue-router'
import { computed } from 'vue'
import { pageTitles } from '../../utils/helpers.js'

const route = useRoute()
const titleData = computed(() => pageTitles.find(({ path }) => {
  if (path.includes(':')) {
    const basePath = path.split('/:')[0]
    return route.path.startsWith(basePath)
  }
  return route.path === path
}))
</script>

<template>
  <v-col v-if="titleData" class="text-center exchange" cols="12">
    <h1 class="exchange--title">{{ titleData.title }}</h1>
    <p class="exchange--subtitle">{{ titleData.subtitle }}</p>
  </v-col>
</template>

<style scoped>
.exchange--title {
  font-size: 2.5rem;
  line-height: normal;
  font-weight: bold;
  color: var(--primary-color);
  margin-bottom: 1rem;
  text-shadow: 1px 1px 5px rgba(0, 0, 0, 0.1);
}

.exchange--subtitle {
  font-size: 1rem;
  color: gray;
  margin-bottom: 1rem;
}
</style>
