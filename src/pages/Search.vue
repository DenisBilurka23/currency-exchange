<script setup>
import CurrencyList from '../components/CurrencyList'
import { ref, onMounted, watch } from 'vue'
import { useCurrencyStore } from '../store/useCurrency.js'
import debounce from 'lodash/debounce'

const currencyStore = useCurrencyStore()
const searchTerm = ref('')
const selectedDate = ref(null)
const menu = ref(false)
const data = ref()

const handleDateChange = async () => {
  data.value = await currencyStore.getCurrencies(selectedDate.value, searchTerm.value)
  menu.value = false
}

const debouncedSearch = debounce(async () => {
  data.value = await currencyStore.getCurrencies(selectedDate.value, searchTerm.value)
}, 250)

const dateFormatter = (date) => {
  if (date) {
    const options = { day: '2-digit', month: 'short', year: 'numeric' }
    return new Date(date).toLocaleDateString('en-US', options)
  }
}

watch(searchTerm, debouncedSearch)
onMounted(async () => {
  data.value = await currencyStore.getCurrencies()
})
</script>

<template>
  <v-row class="ma-2">
    <v-col class="pb-0" cols="12" md="6">
      <v-text-field
          v-model="searchTerm"
          clearable
          hide-details
          label="Search currency by name or code"
          outlined
          prepend-inner-icon="mdi-magnify"
      />
    </v-col>
    <v-col class="pb-0" cols="12" md="6">
      <v-menu
          v-model="menu"
          :close-on-content-click="false"
          max-width="290px"
          min-width="290px"
          offset-y
          transition="scale-transition"
      >
        <template #activator="{ props }">
          <v-text-field
              v-model="selectedDate"
              :value="dateFormatter(selectedDate)"
              hide-details
              label="Select a date"
              outlined
              prepend-inner-icon="mdi-calendar"
              readonly
              v-bind="props"
          />
        </template>
        <v-date-picker
            v-model="selectedDate"
            no-title
            @update:model-value="handleDateChange"
        />
      </v-menu>
    </v-col>
  </v-row>
  <currency-list :data="currencyStore.getPaginatedData(data)" :loading="currencyStore.loading"/>
</template>
