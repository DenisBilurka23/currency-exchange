import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import 'vuetify/styles'
import router from './router/index.js'
import { createPinia } from 'pinia'

import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: 'dark'
  }
})

const app = createApp(App)
app.use(vuetify)
app.use(router)
app.use(createPinia())
app.mount('#app')
