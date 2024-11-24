<script setup>
import { defineProps } from 'vue'
import CurrencyItem from '../CurrencyItem'

defineProps({
  data: {
    type: Array,
    required: true
  },
  loading: {
    type: Boolean
  }
})
</script>

<template>
  <v-row v-if="data" class="ma-2">
    <v-col v-for="currency in data" :key="currency.r030" class="py-2" cols="12" md="6">
      <router-link :to="`/currency/${currency.cc.toLowerCase()}`" class="text-decoration-none">
        <currency-item :currency="currency"/>
      </router-link>
    </v-col>
  </v-row>
  <v-row v-if="loading" class="ma-2">
    <v-col v-for="loader in 7" :key="loader" class="py-2" cols="12" md="6">
      <v-skeleton-loader type="list-item"/>
    </v-col>
  </v-row>
</template>
