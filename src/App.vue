<template>
  <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
  <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
  <div>
    <div class="wrapper">
      <div>
        <div id="sidebar" :class="{ 'active': slidebar }">
        
          <div class="sidebar-header p-3">          
            <div class="d-flex justify-content-between">
              <h2>口罩地圖</h2>
              <span>資料更新於： {{updateTime}} </span>
              <button type="button" class="btn" @click="slidebar = !slidebar">
                <i class="fa-solid fa-xmark"></i>
              </button>
            </div>
            <div>
              <img src="@/assets/images/doctor-icon.svg" alt="">
            </div>
            <div class="mt-3">
              <button type="button" class="btn btn-outline-primary rounded-pill col-12" data-toggle="modal" data-target="#searchBox">
                <i class="fa-solid fa-magnifying-glass"></i>
                <span class="county pl-2"></span>
                <span class="town pl-2"></span>
              </button>
            </div>

          </div>
          
          <div class="pharmacy-list">
            <ul v-if="pharmaciesList">
              <li class="card flex-wrap pt-2" v-for="(item, index) in filterData" :key="index">
                <div class="col-12 pr-0">
                  <div class="d-flex justify-content-between align-items-center">
                    <p class="pharmacy-name text-primary "> {{item.properties.name}} </p>                  
                    <div class="col-3 d-flex p-0">
                      <div class="circle mr-1">
                        <i class="fa-solid fa-phone"></i>
                      </div>
                      <div class="circle" @click="moveToMarker(item,index)">
                        <i class="fa-solid fa-location-dot"></i>
                      </div>
                    </div>
                  </div>
                  <p class="pharmacy-phone">
                    <i class="fa-solid fa-phone"></i>                  
                    <a href=""> {{item.properties.phone}} </a>
                  </p>
                  <p class="pharmacy-address" @click="moveToMarker(item,index)">
                    <i class="fa-solid fa-location-dot"></i>
                    {{item.properties.address}}
                  </p>
                  <p class="pharmacy-note">
                    <i class="fa-solid fa-message"></i>
                    {{item.properties.note}}
                  </p>
                </div>
                <div class="w-100 d-flex">
                  <div class="col-6 pharmacy-box" :class="classColor(item.properties.mask_adult)">
                    成人: 
                    <span> {{item.properties.mask_adult}} </span>
                  </div>
                  <div class="col-6 pharmacy-box" :class="classColor(item.properties.mask_child)">
                    兒童:
                    <span> {{item.properties.mask_child}} </span>
                  </div>
                </div>
              </li>
            </ul>
          </div>  
        </div>

        <div class="sidebar-btn">
          <button type="button" class="btn btn-primary p-2" @click="slidebar = !slidebar">
            <div>
              側邊欄
            </div>
          </button>
        </div>  
      </div>

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
          <option value="">請選擇鄉鎮</option>
          <option :value="item" v-for="(item, index) in townList" :key="index"> {{item}} </option>
        </select>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-primary" data-dismiss="modal" @click="search">
          <i class="fa-solid fa-magnifying-glass"></i>
        </button>
        <!-- <button type="button" class="btn btn-primary">Save changes</button> -->
      </div>
    </div>
  </div>
</div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue';
import {  ref, onMounted, computed } from 'vue';
import { createMap, markerSet, markerRemove, moveToMarker } from '@/composition-API/map.js';
import axios from 'axios';
import $ from 'jquery'

export default {
  name: 'App',
  components: {
    // HelloWorld
  },
  setup() {
    const pharmaciesList = ref([])
    const filterData = ref([])
    const updateTime = ref('')
    const countyData = computed(() => {
      let data = []
      const set = new Set();
      pharmaciesList.value.forEach(item => {
        data.push({
          'county': item.properties.county,
          'town': []
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
      await axios
      // .get(' http://localhost:3000/features')
      .get('https://raw.githubusercontent.com/kiang/pharmacies/master/json/points.json')
      .then(res => {
        pharmaciesList.value = res.data.features
        updateTime.value = pharmaciesList.value[0].properties.updated
      })
      $('#searchBox').modal('show')
    })
    
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
      document.querySelector('.county').innerHTML = county.value
      document.querySelector('.town').innerHTML = town.value
      markerRemove()
      let data = pharmaciesList.value
      if(county.value!='') data = data.filter(item=> item.properties.county == county.value)
      if(town.value!='') data = data.filter(item=> item.properties.town == town.value)
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
      updateTime,
      countyData,
      townList,
      county,
      town,
      classColor,
      moveToMarker,
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
   
    console.log($('#sidebar'))
  },
  computed: {
    
  }
}
</script>
