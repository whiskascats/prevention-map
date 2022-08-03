<template>
  <div>
    <div id="sidebar" :class="{ 'active': slidebar }">
    
      <div class="sidebar-header p-3">          
        <div class="d-flex justify-content-between">
          <h2>口罩地圖</h2>
          <button type="button" class="btn" @click="slidebar = !slidebar">
            <i class="fa-solid fa-xmark"></i>
          </button>
        </div>
        <div>
          <img src="@/assets/images/doctor-icon.svg" alt="">
        </div>
        <div class="mt-3">
          <button type="button" class="btn btn-outline-primary rounded-pill col-12" data-toggle="modal" data-target="#searchBox">
            <font-awesome-icon icon="fa-solid fa-magnifying-glass" />
            <span class="county pl-2"></span>
            <span class="town pl-2"></span>
          </button>
        </div>

      </div>

      <div class="pharmacy-list">
        <ul v-if="filterData">
          <li class="card flex-wrap pt-2" v-for="(item,index) in filterData" :key="item.properties.id">
            <div class="col-12 pr-0">
              <div class="d-flex justify-content-between align-items-center">
                <p class="pharmacy-name text-primary "> {{item.properties.name}} </p>                  
                <div class="col-3 d-flex p-0">
                  <div class="circle mr-1">
                    <font-awesome-icon icon="fa-solid fa-phone-flip" />
                  </div>
                  <div class="circle" @click="moveToPosition(item.geometry.coordinates); popUpMarker(index);">
                    <font-awesome-icon icon="fa-solid fa-location-dot" />
                  </div>
                </div>
              </div>
              <p class="pharmacy-phone">
                <font-awesome-icon icon="fa-solid fa-phone-flip" />
                <a href=""> {{item.properties.phone}} </a>
              </p>                  
              <p class="pharmacy-address" @click="moveToPosition(item.geometry.coordinates); popUpMarker(index);">
                <font-awesome-icon icon="fa-solid fa-location-dot" />
                {{item.properties.address}}
              </p>
              <p class="pharmacy-note">
                <font-awesome-icon icon="fa-solid fa-message" />
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

    <div class="sidebar-btn" :class="{ 'active': slidebar }">
      <button type="button" class="btn btn-primary p-2" @click="slidebar = !slidebar">
        
        <div>
          側邊欄
        </div>
      </button>
    </div>  
  </div>
</template>
<script>
import { ref } from 'vue';

export default {
  name: 'MySidebar',
  props: ['filterData'],
  setup() {
    const slidebar = ref(false)

    function classColor(value) {
      let className = ''
      if (value>=750) className = 'bg-primary'
      else if (value>=250) className = 'bg-warning'
      else if(value>=1) className = 'bg-danger'
      else className = 'bg-secondary'
      return className
    }
    return {
      slidebar,
      classColor
    }
  },
}
</script>
