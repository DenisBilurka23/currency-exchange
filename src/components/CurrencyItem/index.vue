<script setup>
import { defineProps } from 'vue'
import { getFlag } from '../../utils/helpers.js'

defineProps({
  currency: {
    type: Object,
    required: true
  },
  isDisabled: {
    type: Boolean,
    default: false
  }
})
</script>

<template>
  <v-card :class="{ 'no-hover': isDisabled }" class="pa-0">
    <v-card-title>
      <v-row align="center" justify="space-between">
        <v-col cols="auto ma-2">
          <v-row align="center">
            <v-img :src="getFlag(currency.cc)" alt="Flag" width="30"/>
            <v-col class="pa-0 mx-4">
              <div>{{ currency.cc }}</div>
              <div class="text-caption" style="font-size: 0.8rem">{{ currency.txt }}</div>
            </v-col>
          </v-row>
        </v-col>
        <v-col class="text-right ma-2 pa-0">
          <div>{{ currency.rate }}</div>
        </v-col>
      </v-row>
    </v-card-title>
  </v-card>
</template>

<style scoped>
.text-caption {
  font-size: 0.8rem;
  color: gray;
}

.v-card, .text-caption {
  cursor: pointer;
  transition: all 0.3s ease;
}

.v-card:hover {
  transform: scale(1.03);
  background: var(--primary-color);
}

.v-card:hover .text-caption {
  color: #fff;
}

.no-hover:hover {
  cursor: default;
  transform: none;
  background: none;
}

.no-hover .text-caption {
  color: inherit;
}
</style>
