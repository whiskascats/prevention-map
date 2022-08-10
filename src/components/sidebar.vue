<template>
  <div>
    <div id="sidebar" :class="{ 'active': slidebar }">
    
      <div class="sidebar-header p-3">          
        <div class="d-flex justify-content-between">
          <h2> {{title}} </h2>
          <button type="button" class="btn" @click="slidebar = !slidebar">
            <i class="fa-solid fa-xmark"></i>
          </button>
        </div>
        <div class="d-flex">
          <img src="@/assets/images/doctor-icon.svg" alt="">
          <p class="h4 text-info mx-3" v-if="type=='mask'">
            注意！！<br>因為口罩即時資料已停止更新<br>本地圖僅供展示
          </p>
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
            <mask-list-component :item="item" :index="index"></mask-list-component>
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
import masklist from '@/components/maskList.vue'

export default {
  name: 'sidebar',
  components: {
    'mask-list-component': masklist
  },
  setup(props) {
    const slidebar = ref(false)
    const route = useRoute()
    const title = ref('')
    const userData = useUserData()
    const { type, filterData } =  storeToRefs(userData);
    type.value = route.name
    watch(type,() => {
      if(type.value=='mask') title.value = '口罩地圖'
      else title.value = '快篩地圖'
    },{ immediate: true })

    function changeType() {
      slidebar.value = true
      if(type.value=='mask') type.value = 'quick'
      else type.value = 'mask'
      setTimeout(() => {
        slidebar.value = false
      }, 800);
    }
    return {
      slidebar,
      filterData,
      changeType,
      type,
      title
    }
  },
}
</script>
