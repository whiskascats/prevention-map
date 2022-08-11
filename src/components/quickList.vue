<template>
  <div class="col-12 pr-0">
    <div class="d-flex justify-content-between align-items-center">
      <p class="pharmacy-name text-primary "> {{item.name}} </p>
      <div class="col-3 d-flex p-0">
        <div class="circle mr-1">
          <i class="fa-solid fa-phone"></i>
        </div>
        <div class="circle" @click="moveToPosition([item.latitude,item.longitude]); popUpMarker(index);">
          <i class="fa-solid fa-location-dot"></i>
        </div>
      </div>
    </div>
    <p class="pharmacy-phone">
      <i class="fa-solid fa-phone"></i>
      <a href=""> {{item.telephone}} </a>
    </p>                  
    <p class="pharmacy-address" @click="moveToPosition([item.latitude,item.longitude]); popUpMarker(index);">
      <i class="fa-solid fa-location-dot"></i>
      {{item.address}}
    </p>
    <p class="pharmacy-note">
      <i class="fa-solid fa-message"></i>
      {{item.remark}}
    </p>
    <p class="pharmacy-type">
      <i class="fa-solid fa-bars-progress"></i>
      {{item.brand}}
    </p>
  </div>
  <div class="w-100 d-flex">
    <div class="col-12 pharmacy-box" :class="classColor(item.stock)">
      快篩數量: 
      <span> {{item.stock}} </span>
    </div>
  </div>
</template>
<script>
import { moveToPosition, popUpMarker } from '@/composition-API/map.js';

export default {
  name: 'quickList',
  props:['item','index'],
  setup() {
    function classColor(value) {
      let className = ''
      if (value>=80) className = 'bg-primary'
      else if (value>=30) className = 'bg-warning'
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