// import {  ref, onMounted, computed } from 'vue';
import leaflet from 'leaflet'
import icons from '@/composition-API/icon.js'

let openStreetMap = {}
let markers = {}

export function createMap() {
  openStreetMap = leaflet.map('map', {
    center: [25.052137, 121.555235],
    zoom: 18,
    zoomControl: false
  })

  leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 20,
  }).addTo(openStreetMap)
}

export function moveToMarker(data,index) {
  openStreetMap.panTo(data.geometry.coordinates).setView(data.geometry.coordinates,15)
  
  markers[index].openPopup()
}

export function markerSet(data) {
  const { greenIcon, yellowIcon, redIcon, greyIcon } = iconSet()
  data.forEach((item, index) => {
    let maskTotal = item.properties.mask_adult+item.properties.mask_child
    let iconColor = {}
    if (maskTotal>=1500) iconColor = greenIcon
    else if (maskTotal>=750) iconColor = yellowIcon 
    else if (maskTotal>=1) iconColor = redIcon
    else iconColor = greyIcon
    markers[index] = 
    leaflet.marker(item.geometry.coordinates, {icon: iconColor})
    .bindPopup(`
      <h3>${item.properties.name}</h3>
      <p>地址: ${item.properties.address}</p>
      <p>電話: ${item.properties.phone}</p>
      <p>成人口罩數量: ${item.properties.mask_adult}</p>
      <p>兒童口罩數量: ${item.properties.mask_child}</p>
    `)
    .addTo(openStreetMap)    
  })
}

export function markerRemove() {
  markers = {}
  openStreetMap.eachLayer(layer => {
    if (layer instanceof leaflet.Marker) openStreetMap.removeLayer(layer);
  })
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