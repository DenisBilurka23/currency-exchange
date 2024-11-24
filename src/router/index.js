import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  { path: '/', name: 'Home', component: () => import('../pages/Home.vue') },
  { path: '/search', name: 'SearchRates', component: () => import('../pages/Search.vue') },
  { path: '/currency/:code', name: 'CurrencyEdit', component: () => import('../pages/EditCurrency.vue') },
  { path: '/modified', name: 'EditedRates', component: () => import('../pages/Edited.vue') },
  { path: '/exchange', name: 'CurrencyExchange', component: () => import('../pages/CurrencyExchange.vue') }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
