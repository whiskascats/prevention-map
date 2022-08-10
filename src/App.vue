<template>
  <div>
    <div class="wrapper">
      <sidebar-component></sidebar-component>
      <div id="map"></div>
    </div>
    <router-view></router-view>
  </div>
  
</template>

<script>
import {  ref, onMounted, computed } from 'vue';
import { createMap, getLocation } from '@/composition-API/map.js';
import sidebar from '@/components/sidebar.vue';
export default {
  name: 'App',
  components: {
    'sidebar-component': sidebar
  },
  setup(props) {
    onMounted(async() => {      
      createMap()
      getLocation()
    })
  }
}
</script>
