<template>
  <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
  <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
  <div>
    <div class="wrapper">
      <sidebar-component :filter-data="filterData"></sidebar-component>

      <div id="map"></div>
    </div>
  </div>
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
        <select class="form-control" @change="changeCounty($event.target.value)" v-model="county">
          <option class="d-none" value="">請選擇縣市</option>
          <option :value="item.county" v-for="(item,index) in countyData" :key="index"> {{item.county}} </option>
        </select>
        <select class="form-control mt-3" v-model="town">
          <option class="d-none" value="">請選擇鄉鎮</option>
          <option :value="item" v-for="(item, index) in townList" :key="index"> {{item}} </option>
        </select>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-primary" data-dismiss="modal" @click="search">
          <font-awesome-icon icon="fa-solid fa-magnifying-glass" />
        </button>
        <!-- <button type="button" class="btn btn-primary">Save changes</button> -->
      </div>
    </div>
  </div>
</div>
</template>

<script>
import {  ref, onMounted, computed } from 'vue';
import MySidebar from './components/Sidebar.vue';
import { createMap, markerSet, markerRemove, moveToPosition, popUpMarker } from '@/composition-API/map.js';
import axios from 'axios';
// import dayjs from 'dayjs'
import $ from 'jquery'

export default {
  name: 'App',
  components: {
    'sidebar-component': MySidebar
    // HelloWorld
  },
  setup() {
    const pharmaciesList = ref([])
    const filterData = ref([])
    const countyData = computed(() => {
      let data = []
      const set = new Set();
      pharmaciesList.value.forEach(item => {
        data.push({
          'county': item.properties.county,
          'town': ['全區']
        })
      })
      data = data.filter(item => !set.has(item.county) ? set.add(item.county) : false)
      data = data.filter(item => item.county)
      pharmaciesList.value.forEach(item => {
        data.find(item2 => {
          if(item2.county == item.properties.county) item2.town.push(item.properties.town)
        }) 
      })
      data.forEach(item => {
        item.town = item.town.filter((element, index, arr) => arr.indexOf(element) === index)
      })
      return data
    })
    const townList = ref([])
    const county = ref('')
    const town = ref('')
    onMounted(async() => {      
      createMap()
      getLocation()
      await axios
      // .get('http://localhost:3000/features')
      .get('https://raw.githubusercontent.com/kiang/pharmacies/master/json/points.json')
      .then(res => {
        pharmaciesList.value = res.data.features
      })
      $('#searchBox').modal('show')
    })
    function getLocation() {
      const succFn = function(position) {
        let lat = position.coords.latitude;
        let lng = position.coords.longitude;
        moveToPosition([lat, lng])
      };
      const errFn = function() {
        //reject
      }
      const options = {
        maximumAge: 60000,
        timeout: 45000
      };
      navigator.geolocation.getCurrentPosition(succFn, errFn, options);
    }
    function classColor(value) {
      let className = ''
      if (value>=750) className = 'bg-primary'
      else if (value>=250) className = 'bg-warning'
      else if(value>=1) className = 'bg-danger'
      else className = 'bg-secondary'
      return className
    }
    function changeCounty(value) {
      town.value = ''
      countyData.value.find(item => {
        if(item.county == value) {
          townList.value = item.town
        }
      })      
    }
    function search() {
      markerRemove()
      document.querySelector('.county').innerHTML = county.value
      document.querySelector('.town').innerHTML = town.value
      let data = pharmaciesList.value
      if(county.value!='') data = data.filter(item=> item.properties.county == county.value)
      if(town.value!=''&&town.value!='全區') data = data.filter(item=> item.properties.town == town.value)
      data.forEach(item => {
        let [latitude, longitude] = item.geometry.coordinates
        item.geometry.coordinates = [longitude, latitude]
      })
      filterData.value = data
      markerSet(data)
    }

    return {
      pharmaciesList,
      filterData,
      countyData,
      townList,
      county,
      town,
      classColor,
      moveToPosition,
      popUpMarker,
      changeCounty,
      search
    }
  },
  data() {
    return {
      slidebar: false,
    }
  },
  filter() {

  },
  mounted() {
  },
  computed: {
    
  }
}
</script>
