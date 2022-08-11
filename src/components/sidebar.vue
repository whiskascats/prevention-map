<template>
  <div>
    <div id="sidebar" :class="{ 'active': slidebar }">
    
      <div class="sidebar-header p-3">          
        <div class="d-flex row">          
          <div class="col-10 d-flex justify-content-between">
            <h2 v-if="type=='mask'">口罩地圖</h2>
            <h2 v-else>快篩地圖</h2>
            <small class="small" v-if="quickData.length!=0">資料更新於:<br> {{quickData[0].source_time}} </small>
          </div>
          <div class="col-2">
            <button type="button" class="btn" @click="slidebar = !slidebar">
              <i class="fa-solid fa-xmark"></i>
            </button>
          </div>
        </div>
        <div class="d-flex">
          <img src="@/assets/images/doctor-icon.svg" alt="">
          <p class="h4 text-info mx-3" v-if="type=='mask'">
            注意！！<br>因為口罩即時資料已停止更新<br>本地圖僅供展示
          </p>
        </div>
        <div class="mt-3">
          <button type="button" class="btn btn-outline-primary rounded-pill col-12" data-toggle="modal" data-target="#searchBox">
            <i class="fa-solid fa-magnifying-glass"></i>
            <span class="county pl-2"> {{chooseCounty}} </span>
            <span class="town pl-2"> {{chooseTown}} </span>
          </button>
        </div>

      </div>

      <div class="pharmacy-list">
        <ul v-if="filterData">
          <li class="card flex-wrap pt-2" v-for="(item,index) in filterData" :key="index">
            <template v-if="type=='mask'">
              <mask-list-component :item="item" :index="index"></mask-list-component>
            </template>
            <template v-else>
              <quick-list-component :item="item" :index="index"></quick-list-component>
            </template>
          </li>
        </ul>
      </div>  
    </div>

    <div class="sidebar-btn toggle-btn" :class="{ 'active': slidebar }">
      <button type="button" class="btn btn-danger p-2" @click="changeType">        
        <div>
          <span v-if="type=='mask'">
            <router-link to="/quick">
              切換至快篩地圖
            </router-link>
          </span>
          <span v-else>
            <router-link to="/">
              切換至口罩地圖
            </router-link>
          </span>
        </div>
      </button>
    </div>

    <div class="sidebar-btn" :class="{ 'active': slidebar }">
      <button type="button" class="btn btn-primary p-2" @click="slidebar = !slidebar;">        
        <div>
          側邊欄
        </div>
      </button>
    </div>
  </div>
</template>
<script>
import { ref, watch  } from 'vue';
import { storeToRefs } from 'pinia';
import { useUserData } from '@/stores/useData';
import { useRouter, useRoute } from 'vue-router'
import { markerRemove } from '@/composition-API/map.js';
import maskList from '@/components/maskList.vue'
import quickList from '@/components/quickList.vue'

export default {
  name: 'sidebar',
  components: {
    'mask-list-component': maskList,
    'quick-list-component': quickList
  },
  setup(props) {
    const slidebar = ref(false)
    const route = useRoute()
    const title = ref('')
    const userData = useUserData()
    const { type, filterData, chooseCounty, chooseTown, quickData } =  storeToRefs(userData);
    type.value = route.name

    function changeType() {
      slidebar.value = true
      if(type.value=='mask') type.value = 'quick'
      else type.value = 'mask'
      markerRemove()
      filterData.value = []
      setTimeout(() => {
        slidebar.value = false
      }, 800);
    }
    return {
      slidebar,
      filterData,
      changeType,
      type,
      title,
      chooseCounty,
      chooseTown,
      quickData
    }
  },
}
</script>
