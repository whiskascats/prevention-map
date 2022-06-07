<template>
  <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
  <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
  <div>

    <div class="wrapper">
      <div id="sidebar" :class="{ 'active': slidebar }">
        <div class="sidebar-header">
            <h3>jQueryScript</h3>
          </div>
          <ul class="lisst-unstyled components">
            <p>My Nav</p>
            <li class="active">
              <a href="#foodSubmenu" data-toggle="collapse" aria-expanded="false" class="dropdown-toggle">DropDown MENU</a>
              <ul class="collapse lisst-unstyled" id="foodSubmenu">
                <li><a href="#">jQuery</a></li>
                <li><a href="#">Script</a></li>
                <li><a href="#">Net</a></li>
              </ul>
            </li>
            <li>
              <a href="#">Contact</a>
            </li>
            <li>
              <a href="#">About</a>
            </li>
          </ul>
          <button type="button" class="btn btn-dark" @click="slidebar = !slidebar">
            <i class="fas fa-bars"></i><span> Toggle Sidebar</span>
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
      slidebar: true
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

<style>
*{
  margin: 0;
  padding: 0;
}
.wrapper {
  display: flex;
  text-decoration: none;
  overflow-x: hidden;
  transition: all 0.4s;
}

#sidebar {
  width: 20%;
  transition: all 0.4s;
}

#sidebar.active {
  margin-left: -20%;
}

#map { 
  width: 100%;
  height: 100vh; 
  margin: 0;
}
</style>
