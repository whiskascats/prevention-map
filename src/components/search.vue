<template>
    <!-- Modal -->
  <div class="modal fade" id="searchBox" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">搜尋條件</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <select class="form-control" @change="changeCity($event.target.value)" v-model="county">
            <option class="d-none" value="">請選擇縣市</option>
            <option :value="item.CityName" v-for="(item,index) in cityData" :key="index"> {{item.CityName}} </option>
          </select>
          <select class="form-control mt-3" v-model="town">
            <option class="d-none" value="">請選擇鄉鎮</option>
            <option value="全區" v-if="county"> 全區 </option>
            <option :value="item.AreaName" v-for="(item, index) in townData" :key="index"> {{item.AreaName}} </option>
          </select>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary" data-dismiss="modal" @click="search">
            <font-awesome-icon icon="fa-solid fa-magnifying-glass" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { markerSet, markerRemove } from '@/composition-API/map.js';
import { getMaskData } from '@/composition-API/useApi.js';
import { useUserData } from '@/stores/useData';
import { storeToRefs } from 'pinia';
import axios from 'axios';
import $ from 'jquery'
export default {
  name: 'search',
  setup() {
    const userData = useUserData()
    const { cityData, maskData, filterData } = storeToRefs(userData)
    const pharmaciesList = ref([])
    const townData = ref([])
    const county = ref('')
    const town = ref('')
    
    function changeCity(value) {
      town.value = ''
      cityData.value.find(item => {
        if(item.CityName == value) {
          townData.value = item.AreaList
        }
      })      
    }
    function search() {
      markerRemove()
      document.querySelector('.county').innerHTML = county.value
      document.querySelector('.town').innerHTML = town.value
      let data = maskData.value
      if(county.value!='') data = data.filter(item=> item.properties.county == county.value)
      if(town.value!=''&&town.value!='全區') data = data.filter(item=> item.properties.town == town.value)
      filterData.value = data
      markerSet(data)
    }

    return {
      cityData,
      townData,
      county,
      town,    
      changeCity,
      search
    }
  },
}
</script>