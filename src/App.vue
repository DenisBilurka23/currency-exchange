<script setup>
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import PageTitle from './components/PageTitle'
</script>

<template>
  <v-app>
    <Navbar/>
    <v-main>
      <v-container class="px-1">
        <page-title/>
        <router-view/>
      </v-container>
    </v-main>
    <Footer/>
  </v-app>
</template>
