import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { fetchCurrencies } from '../api'

export const useCurrencyStore = defineStore('currency', () => {
  const currencies = ref([])
  const modifiedCurrencies = ref([])
  const currentPage = ref(1)
  const totalPages = ref(1)
  const loading = ref(false)
  const defaultPageSize = 10

  const getCurrencies = async (date = null, searchTerm = '', size = defaultPageSize) => {
    try {
      loading.value = true
      const res = await fetchCurrencies(date, searchTerm)
      currencies.value = res
      totalPages.value = Math.ceil(currencies.value.length / size)
      currentPage.value = 1
      return res
    } catch (error) {
      console.error('Error loading currencies:', error)
    } finally {
      loading.value = false
    }
  }

  const changeCurrencyRate = (cc, newRate) => {
    const currency = currencies.value.find(c => c.cc === cc)
    if (currency) {
      currency.rate = newRate
      const index = modifiedCurrencies.value.findIndex(c => c.cc === cc)
      if (index !== -1) {
        modifiedCurrencies.value[index] = { ...currency }
      } else {
        modifiedCurrencies.value.push({ ...currency })
      }
      localStorage.setItem('modifiedCurrencies', JSON.stringify(modifiedCurrencies.value))
    }
  }

  const setCurrentPage = (page) => {
    currentPage.value = page
  }

  const getModifiedCurrencies = () => {
    const localModifiedCurrencies = localStorage.getItem('modifiedCurrencies')
    if (localModifiedCurrencies) {
      modifiedCurrencies.value = JSON.parse(localModifiedCurrencies)
    }
    totalPages.value = Math.ceil(modifiedCurrencies.value.length / defaultPageSize)
    setCurrentPage(1)
    return modifiedCurrencies.value
  }

  const getPaginatedData = computed(() => data => {
    if (data) {
      const start = (currentPage.value - 1) * defaultPageSize
      const end = currentPage.value * defaultPageSize
      return data.slice(start, end)
    }
  })

  const clearModifiedCurrencies = () => {
    modifiedCurrencies.value = []
    localStorage.removeItem('modifiedCurrencies')
  }

  return {
    currencies,
    modifiedCurrencies,
    currentPage,
    totalPages,
    loading,
    getCurrencies,
    changeCurrencyRate,
    setCurrentPage,
    clearModifiedCurrencies,
    getModifiedCurrencies,
    getPaginatedData
  }
})
