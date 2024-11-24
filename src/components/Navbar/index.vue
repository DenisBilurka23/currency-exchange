<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { useDisplay } from 'vuetify'
import { navItems } from '../../utils/helpers.js'

const route = useRoute()
const drawer = ref(false)
const { xs: isMobile } = useDisplay()

const isActive = (link) => route.path === link
</script>

<template>
  <v-navigation-drawer v-model="drawer" app temporary>
    <v-list class="py-4">
      <v-list-item-group v-for="(item, index) in navItems" :key="index">
        <v-list-item>
          <v-list-item-content>
            <router-link
                :class="['drawer-link', { 'active-link': isActive(item.link) }]"
                :to="item.link"
            >
              {{ item.text }}
            </router-link>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-navigation-drawer>
  <v-app-bar>
    <v-app-bar-nav-icon v-if="isMobile" @click="drawer = !drawer"></v-app-bar-nav-icon>
    <div v-else class="desktop-nav">
      <router-link
          v-for="(item, index) in navItems"
          :key="index"
          :class="{'active-link': isActive(item.link)}"
          :to="item.link"
          class="nav-link"
      >
        {{ item.text }}
      </router-link>
    </div>
  </v-app-bar>
</template>

<style scoped>
.nav-link, .drawer-link {
  color: inherit;
  text-transform: uppercase;
  transition: all 0.3s ease;
  text-decoration: none;
}

.nav-link:hover, .drawer-link:hover {
  color: var(--primary-color);
  transform: scale(1.1);
}

.active-link {
  color: var(--primary-color);
  font-weight: bold;
}

.desktop-nav {
  display: flex;
  justify-content: center;
  gap: 2rem;
  width: 100%;
}

.v-navigation-drawer {
  background: #121212;
}

</style>
