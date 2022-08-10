import axios from 'axios';
import { useUserData } from '@/stores/useData';
import { storeToRefs } from 'pinia';

const userData = useUserData()

export async function getCityData() {
    const { cityData } = storeToRefs(userData)
    if(cityData.value) {
        await axios.get('./cityData.json')
        .then(res => {
            cityData.value = res.data
        })
    }
}

export async function getMaskData() {
    const { maskData } = storeToRefs(userData)
    if(maskData.value) {
        await axios.get('https://raw.githubusercontent.com/kiang/pharmacies/master/json/points.json')
        .then(res => {
            maskData.value = res.data.features
        })
    }
}

export async function getQuickData() {
    const { quickData } = storeToRefs(userData)
    if(quickData.value) {
        await axios.get('https://data.startupterrace.tw/api/dataset_api/6af1cf24-75c6-4b7b-bf5c-9f38ccafdf4a')
        .then(res => {
            quickData.value = res.data
        })
    }
}