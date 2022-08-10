<template>

</template>

<script>
import { ref, onMounted } from 'vue';
import { markerSet, markerRemove } from '@/composition-API/map.js';
import { getCityData, getMaskData } from '@/composition-API/useApi.js';
import { useUserData } from '@/stores/useData';
import { storeToRefs } from 'pinia';
import axios from 'axios';
import $ from 'jquery'

export default {
  name:'Mask',
  
  setup() {
    const userData = useUserData()
    const { cityData, maskData } = storeToRefs(userData)
    onMounted(async() => {
      await getCityData()
      await getMaskData()
      $('#searchBox').modal('show')
    })
  }
}
</script>