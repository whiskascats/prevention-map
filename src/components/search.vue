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
          <select class="form-control" @change="changeCity($event.target.value)" v-model="cacheCounty">
            <option class="d-none" value="">請選擇縣市</option>
            <option :value="item.CityName" v-for="(item,index) in cityData" :key="index"> {{item.CityName}} </option>
          </select>
          <select class="form-control mt-3" v-model="cacheTown">
            <option class="d-none" value="">請選擇鄉鎮</option>
            <option value="全區" v-if="cacheCounty!=''"> 全區 </option>
            <option :value="item.AreaName" v-for="(item, index) in townData" :key="index"> {{item.AreaName}} </option>
          </select>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary" data-dismiss="modal" @click="search">
            <i class="fa-solid fa-magnifying-glass"></i>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import { useUserData } from '@/stores/useData';
import { markerSetMask, markerSetQuick, markerRemove } from '@/composition-API/map.js';

export default {
  name:'search',
  
  setup() {
    const userData = useUserData()
    const { type, cityData, maskData, quickData, filterData, chooseCounty, cacheCounty, chooseTown, cacheTown } = storeToRefs(userData)
    const townData = ref([])
    const county  = ref('')
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
      chooseCounty.value = cacheCounty.value
      chooseTown.value = cacheTown.value
      let data  = []
      if(type.value=='mask') {
        data = maskData.value
        if(chooseCounty.value!='') data = data.filter(item=> item.properties.county == chooseCounty.value)
        if(chooseTown.value!=''&&chooseTown.value!='全區') data = data.filter(item=> item.properties.town == chooseTown.value)
        filterData.value = data
        markerSetMask(data)
      }
      else {
        data = quickData.value
        if(chooseCounty.value!='') data = data.filter(item=> item.address.indexOf(chooseCounty.value)>-1)
        if(chooseTown.value!=''&&chooseTown.value!='全區') data = data.filter(item=> item.address.indexOf(chooseTown.value)>-1)
        filterData.value = data
        markerSetQuick(data)
      }

      
    }

    return {
      cityData,
      townData,
      cacheCounty,
      cacheTown,    
      changeCity,
      search
    }
  },
}
</script>