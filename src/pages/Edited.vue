<script setup>
import CurrencyList from '../components/CurrencyList'
import { useCurrencyStore } from '../store/useCurrency.js'
import { onMounted, ref } from 'vue'

const currencyStore = useCurrencyStore()
const data = ref()

const handleResetCurrencies = () => {
  currencyStore.clearModifiedCurrencies()
  data.value = currencyStore.getModifiedCurrencies()
}

onMounted(() => {
  data.value = currencyStore.getModifiedCurrencies()
})
</script>

<template>
  <div class="d-flex flex-column justify-space-between pa-0">
    <div>
      <currency-list :data="currencyStore.getPaginatedData(data)"/>
    </div>
    <v-btn class="ma-5" color="error" @click="handleResetCurrencies">
      Reset Modified Currencies
    </v-btn>
  </div>
</template>
