<script setup>
import { computed } from 'vue'
import { useCurrencyStore } from '../../store/useCurrency.js'
import { useRoute } from 'vue-router'

const currencyStore = useCurrencyStore()
const route = useRoute()

const currentPage = computed({
  get: () => currencyStore.currentPage,
  set: (value) => currencyStore.setCurrentPage(value)
})
</script>

<template>
  <v-footer v-if="route.path !== '/exchange'" class="flex-0-1 justify-center">
    <v-pagination
        v-model="currentPage"
        :length="currencyStore.totalPages"
        :total-visible="5"
        active-color="var(--primary-color)"
    />
  </v-footer>
</template>
