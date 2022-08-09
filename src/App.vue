<template>
  <div>
    <div class="wrapper">
      <sidebar-component :filter-data="filterData"></sidebar-component>
      <div id="map"></div>
    </div>
    <router-view></router-view>
  </div>
  
</template>

<script>
import {  ref, onMounted, computed } from 'vue';
import { createMap, getLocation } from '@/composition-API/map.js';
import Sidebar from '@/components/Sidebar.vue';
export default {
  name: 'App',
  components: {
    'sidebar-component': Sidebar
  },
  setup(props) {
    onMounted(async() => {      
      createMap()
      getLocation()
    })
  }
}
</script>
