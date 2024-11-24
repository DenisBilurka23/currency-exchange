<script setup>
import CurrencyList from '../components/CurrencyList'
import { onMounted, ref } from 'vue'
import { useCurrencyStore } from '../store/useCurrency.js'

const currencyStore = useCurrencyStore()
const data = ref()

onMounted(async () => {
  data.value = await currencyStore.getCurrencies()
})
</script>

<template>
  <currency-list :data="currencyStore.getPaginatedData(data)" :loading="currencyStore.loading"/>
</template>

<style></style>
