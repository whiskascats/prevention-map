<template>
  <div>
    <div class="wrapper">
      <sidebar-component></sidebar-component>
      <div id="map"></div>
    </div>
    <router-view></router-view>
    <search-component></search-component>
  </div>
  
</template>

<script>
import {  ref, onMounted, computed } from 'vue';
import { createMap, getLocation } from '@/composition-API/map.js';
import sidebar from '@/components/sidebar.vue';
import search from '@/components/search.vue';
export default {
  name: 'App',
  components: {
    'sidebar-component': sidebar,
    'search-component': search
  },
  setup(props) {
    onMounted(async() => {      
      createMap()
      getLocation()
    })
  }
}
</script>
