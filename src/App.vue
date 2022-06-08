<template>
  <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
  <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
  <div>
    <div class="wrapper">
      <div id="sidebar" class="p-3" :class="{ 'active': slidebar }">
        <div class="sidebar-header">
          <h1>口罩地圖</h1>
        </div>
        <div>
          <img src="@/assets/images/doctor-icon.svg" alt="">
        </div>
        <div class="pharmacy-list">
          <ul>
            <li class="card flex-wrap pt-2">
              <div class="col-9 pr-0">
                <p class="pharmacy-name text-green ">宏岳藥局</p>
                <p class="pharmacy-phone">
                  <i class="fa-solid fa-phone"></i>                  
                  <a href="">09-878787877</a>
                </p>
                <p class="pharmacy-address">
                  <i class="fa-solid fa-location-dot"></i>
                  基隆市仁愛區仁二路５號
                </p>
                <p class="pharmacy-note">
                  <i class="fa-solid fa-message"></i>
                  每日早上九點，不用領號碼牌開始發放口罩.
                </p>
              </div>
              <div class="col-3 d-flex p-0">
                <div class="circle mr-1">
                  <i class="fa-solid fa-phone"></i>
                </div>
                <div class="circle">
                  
                </div>
              </div>
              <div class="w-100 d-flex">
                <div class="col-6 pharmacy-box">
                  成人: 
                  <span>123</span>
                </div>
                <div class="col-6 pharmacy-box">
                  兒童:
                  <span>456</span>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <button type="button" class="btn btn-green sidebar-btn" @click="slidebar = !slidebar">
          <div :class="{ 'active':slidebar }">
            <i class="fa-solid fa-angle-right"></i>
          </div>
        </button>
      </div>


      <div id="map"></div>
    </div>

  </div>

</template>

<script>
// import HelloWorld from './components/HelloWorld.vue';
// import axios from 'axios'
import leaflet from 'leaflet'

let openStreetMap = {}

export default {
  name: 'App',
  components: {
    // HelloWorld
  },
  data() {
    return {
      slidebar: false
    }
  },
  mounted() {
    openStreetMap = leaflet.map('map', {
      center: [25.042474, 121.513729],
      zoom: 18,
      zoomControl: false
    });

    leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 20,
    }).addTo(openStreetMap);
  },
}
</script>
