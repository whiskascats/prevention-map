import axios from 'axios';
import { useUserData } from '@/stores/useData';
import { storeToRefs } from 'pinia';

export async function getCityData() {
    const userData = useUserData()
    const { cityData } = storeToRefs(userData)
    if(cityData.value) {
        await axios.get('./cityData.json')
        .then(res => {
            cityData.value = res.data
        })
    }
}
export async function getMaskData() {
    const userData = useUserData()
    const { maskData } = storeToRefs(userData)
    await axios.get('https://raw.githubusercontent.com/kiang/pharmacies/master/json/points.json')
    .then(res => {
        maskData.value = res.data.features
        maskData.value.map(item => {
            let [latitude, longitude] = item.geometry.coordinates
            item.geometry.coordinates = [longitude, latitude]
        })
    })
}
export async function getQuickData() {
    const userData = useUserData()
    const { quickData } = storeToRefs(userData)
    await axios.get('https://data.startupterrace.tw/api/dataset_api/6af1cf24-75c6-4b7b-bf5c-9f38ccafdf4a')
    .then(res => {
        quickData.value = res.data
    })
}