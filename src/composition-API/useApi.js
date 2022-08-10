import axios from 'axios';
import { useUserData } from '@/stores/useData';
import { storeToRefs } from 'pinia';

const userData = useUserData()

export async function getCityData() {
    const { cityData } = storeToRefs(userData)
    await axios.get('./cityData.json')
    .then(res => {
        cityData.value = res.data
    })
}

export async function getMaskData() {
    const { maskData } = storeToRefs(userData)
    await axios.get('https://raw.githubusercontent.com/kiang/pharmacies/master/json/points.json')
    .then(res => {
        maskData.value = res.data.features
    })
}