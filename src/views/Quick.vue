<template>

</template>

<script>

import { ref, onMounted } from 'vue';
import { getCityData, getMaskData, getQuickData } from '@/composition-API/useApi.js';
import $ from 'jquery'

export default {
  name:'Quick',
  
  setup() {
    onMounted(async() => {
      await getCityData()
      await getQuickData()
      // $('#searchBox').modal('show')
    })
  }
}
</script>