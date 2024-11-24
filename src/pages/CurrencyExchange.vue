<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useCurrencyStore } from '../store/useCurrency.js'
import { storeToRefs } from 'pinia'

const currencyStore = useCurrencyStore()
const { currencies } = storeToRefs(currencyStore)
const fromCurrency = ref('USD')
const toCurrency = ref('UAH')
const amount = ref(1)
const convertedAmount = ref(0)
const activeField = ref('amount')

const formattedList = computed(() => [{ cc: 'UAH' }, ...currencies.value].map(({ cc }) => cc))
const fromRate = computed(() => {
  const currency = currencies.value.find(c => c.cc === fromCurrency.value)
  return currency?.rate || 1
})
const toRate = computed(() => {
  const currency = currencies.value.find(c => c.cc === toCurrency.value)
  return currency?.rate || 1
})

const formatNumber = (value, decimals = 2) => {
  return parseFloat(value.toFixed(decimals))
}

const calculateRate = (newAmount, newConvertedAmount) => {
  activeField.value === 'amount'
    ? convertedAmount.value = formatNumber((newAmount * fromRate.value) / toRate.value)
    : amount.value = formatNumber((newConvertedAmount * toRate.value) / fromRate.value)
}

const switchCurrencies = () => {
  const temp = fromCurrency.value
  fromCurrency.value = toCurrency.value
  toCurrency.value = temp
  calculateRate(amount.value, convertedAmount.value)
}

watch(
  [amount, convertedAmount],
  ([newAmount, newConvertedAmount]) => calculateRate(newAmount, newConvertedAmount)
)
watch(
  [fromCurrency, toCurrency],
  () => calculateRate(amount.value, convertedAmount.value)
)

onMounted(async () => {
  if (!currencies.value.length) {
    await currencyStore.getCurrencies()
  }
  convertedAmount.value = formatNumber((amount.value * fromRate.value) / toRate.value)
})
</script>

<template>
  <v-container class="d-flex justify-center align-center my-2">
    <v-row align="center" class="w-100" justify="center">
      <v-col class="max-w-500" cols="12" sm="6">
        <v-text-field
            v-model="amount"
            :min="0"
            class="custom-autocomplete"
            hide-details
            hide-spin-buttons
            label="Amount"
            type="number"
            @focus="activeField = 'amount'"
        >
          <template v-slot:append>
            <v-autocomplete
                v-model="fromCurrency"
                :items="formattedList"
                hide-details
                width="110px"
            ></v-autocomplete>
          </template>
        </v-text-field>
        <v-btn class="my-3 w-100" color="var(--primary-color)" @click="switchCurrencies">
          <v-icon icon="mdi-swap-horizontal"></v-icon>
          Switch
        </v-btn>
        <v-text-field
            v-model="convertedAmount"
            :min="0"
            class="custom-autocomplete mb-3"
            hide-details
            hide-spin-buttons
            label="Converted Amount"
            type="number"
            @focus="activeField = 'convertedAmount'"
        >
          <template v-slot:append>
            <v-autocomplete
                v-model="toCurrency"
                :items="formattedList"
                hide-details
                width="110px"
            ></v-autocomplete>
          </template>
        </v-text-field>
      </v-col>
    </v-row>
  </v-container>
</template>

<style>
.custom-autocomplete .v-input__append {
  margin-inline-start: 0 !important;
}

.custom-autocomplete .v-field {
  border-top-left-radius: 0 !important;
  border-top-right-radius: 0 !important;
}

.max-w-500 {
  max-width: 500px;
}
</style>
