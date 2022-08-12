<template>

</template>

<script>

import { ref, onMounted } from 'vue';
import { getCityData, getMaskData } from '@/composition-API/useApi.js';
import $ from 'jquery'

export default {
  name:'Mask',
  
  setup() {
    onMounted(async() => {
      await getCityData()
      await getMaskData()
      $('#searchBox').modal('show')
    })
  }
}
</script>