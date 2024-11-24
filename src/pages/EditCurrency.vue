<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useCurrencyStore } from '../store/useCurrency.js'
import { storeToRefs } from 'pinia'
import CurrencyItem from '../components/CurrencyItem'

const route = useRoute()
const currencyStore = useCurrencyStore()
const { currencies } = storeToRefs(currencyStore)
const currency = ref()
const newRate = ref()

const handleModifyRate = () => {
  currencyStore.changeCurrencyRate(currency.value.cc, newRate.value)
}

onMounted(async () => {
  if (!currencies.value.length) {
    await currencyStore.getCurrencies()
  }
  currency.value = currencies?.value.find(currency => currency.cc.toLowerCase() === route.params.code)
  newRate.value = currency.value.rate
})

watch(currencies, newValue => console.log(newValue))
</script>

<template>
  <v-container>
    <v-skeleton-loader v-if="!currency" type="card"/>
    <v-card v-else-if="currency" class="elevation-2" @keyup.enter="handleModifyRate">
      <currency-item :currency="currency" isDisabled/>
      <v-divider></v-divider>
      <v-card-actions class="d-flex flex-column align-start ma-2">
        <v-text-field
            v-model="newRate"
            class="mb-3 w-100"
            clearable
            hide-details
            hide-spin-buttons
            label="New Rate"
            type="number"
        />
        <v-btn
            :disabled="!newRate"
            class="w-100" color="var(--primary-color)"
            @click="handleModifyRate"
        >
          Modify Rate
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<style scoped>
.v-container {
  max-width: 500px;
  width: 100%;
}
</style>
