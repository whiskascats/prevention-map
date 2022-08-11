<template>
  <div class="col-12 pr-0">
    <div class="d-flex justify-content-between align-items-center">
      <p class="pharmacy-name text-primary "> {{item.properties.name}} </p>                  
      <div class="col-3 d-flex p-0">
        <div class="circle mr-1">
          <i class="fa-solid fa-phone"></i>
        </div>
        <div class="circle" @click="moveToPosition(item.geometry.coordinates); popUpMarker(index);">
          <i class="fa-solid fa-location-dot"></i>
        </div>
      </div>
    </div>
    <p class="pharmacy-phone">
      <i class="fa-solid fa-phone"></i>
      <a href=""> {{item.properties.phone}} </a>
    </p>                  
    <p class="pharmacy-address" @click="moveToPosition(item.geometry.coordinates); popUpMarker(index);">
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
</template>
<script>
import { moveToPosition, popUpMarker } from '@/composition-API/map.js';

export default {
  name: 'maskList',
  props:['item','index'],
  setup() {
    function classColor(value) {
      let className = ''
      if (value>=750) className = 'bg-primary'
      else if (value>=250) className = 'bg-warning'
      else if(value>=1) className = 'bg-danger'
      else className = 'bg-secondary'
      return className
    }

    return {
      classColor,
      moveToPosition,
      popUpMarker
    }
  }
}
</script>