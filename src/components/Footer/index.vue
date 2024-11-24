<script setup>
import { computed } from 'vue'
import { useCurrencyStore } from '../../store/useCurrency.js'
import { useRoute } from 'vue-router'
import { useDisplay } from 'vuetify'

const currencyStore = useCurrencyStore()
const route = useRoute()
const { xs: isMobile } = useDisplay()

const currentPage = computed({
  get: () => currencyStore.currentPage,
  set: (value) => currencyStore.setCurrentPage(value)
})

const isExcludedRoute = computed(() => route.path === '/exchange' || route.path.startsWith('/currency/'))
</script>

<template>
  <v-footer v-if="!isExcludedRoute" :class="['flex-0-1 justify-center py-2', {'pb-8': isMobile}]">
    <v-pagination
        v-model="currentPage"
        :length="currencyStore.totalPages"
        :total-visible="isMobile ? 4 : 10"
        active-color="var(--primary-color)"
        density="comfortable"
    />
  </v-footer>
</template>
