// import {  ref, onMounted, computed } from 'vue';
import leaflet from 'leaflet'
import 'leaflet.markercluster/dist/MarkerCluster.Default.css'
import 'leaflet.markercluster/dist/leaflet.markercluster.js'
import icons from '@/composition-API/icon.js'
import { storeToRefs } from 'pinia';
import { useUserData } from '@/stores/useData';

let openStreetMap = {}
let markers = {}
let markerList = {}
export function createMap() {
  openStreetMap = leaflet.map('map', {
    center: [24.052137, 120.555235],
    zoom: 8,
    zoomControl: false
  })

  leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 20,
  }).addTo(openStreetMap)

  markers = new leaflet.MarkerClusterGroup({
    spiderfyOnMaxZoom: true,
    showCoverageOnHover: false,
    zoomToBoundsOnClick: true
  }).addTo(openStreetMap);
}

export function getLocation() {
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

export function moveToPosition(data) {  
  const userData = useUserData()
  const { slidebar } = storeToRefs(userData)
  slidebar.value = true
  openStreetMap.panTo(data).setView(data,19)  
}
export function popUpMarker(index) {
  setTimeout(()=> {
    markerList[index].openPopup()
  },300)
}

export function markerSetMask(data) {
  const { greenIcon, yellowIcon, redIcon, greyIcon } = iconSet()  
  data.forEach((item,index) => {
    let maskTotal = item.properties.mask_adult+item.properties.mask_child
    let iconColor = {}
    if (maskTotal>=1500) iconColor = greenIcon
    else if (maskTotal>=750) iconColor = yellowIcon 
    else if (maskTotal>=1) iconColor = redIcon
    else iconColor = greyIcon

    let newIcon = 
    leaflet.marker(item.geometry.coordinates, {icon: iconColor})
    .bindPopup(`
      <h3>${item.properties.name}</h3>
      <p>地址: ${item.properties.address}</p>
      <p>電話: ${item.properties.phone}</p>
      <p>成人口罩數量: ${item.properties.mask_adult}</p>
      <p>兒童口罩數量: ${item.properties.mask_child}</p>
    `)
    markers.addLayer(newIcon)
    markerList[index] = newIcon
  })
}

export function markerSetQuick(data) {
  const { greenIcon, yellowIcon, redIcon, greyIcon } = iconSet()  
  data.forEach((item,index) => {
    let iconColor = {}
    if (item.stock>=80) iconColor = greenIcon
    else if (item.stock>=30) iconColor = yellowIcon 
    else if (item.stock>=1) iconColor = redIcon
    else iconColor = greyIcon

    let newIcon = 
    leaflet.marker([item.latitude,item.longitude], {icon: iconColor})
    .bindPopup(`
      <h3>${item.name}</h3>
      <p>地址: ${item.address}</p>
      <p>電話: ${item.telephone}</p>
      <p>快篩試劑數量: ${item.stock}</p>
    `)
    markers.addLayer(newIcon)
    markerList[index] = newIcon
  })
}

export function markerRemove() {
  markerList = {}
  markers.clearLayers()
}

function iconSet() {
  const { green, yellow, red, gray } = icons()
  const markerIconsConfig = {
    iconSize: [30, 41],
    iconAnchor: [12, 41],
    popupAnchor: [4, -34],
    shadowSize: [45, 45],
  };
  const greenIcon = new leaflet.Icon({
    iconUrl: green,
    ...markerIconsConfig
  })
  const yellowIcon = new leaflet.Icon({
    iconUrl: yellow,
    ...markerIconsConfig
  })
  const redIcon = new leaflet.Icon({
    iconUrl: red,
    ...markerIconsConfig
  })
  const grayIcon = new leaflet.Icon({
    iconUrl: gray,
    ...markerIconsConfig
  })

  return {
    greenIcon,
    yellowIcon,
    redIcon,
    grayIcon
  }
}