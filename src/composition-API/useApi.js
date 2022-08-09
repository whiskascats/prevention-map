import axios from 'axios';
import { useUserData } from '@/stores/useData';
import { storeToRefs } from 'pinia';

const userData = useUserData()

export function getCityData() {
    const { cityData } = storeToRefs(userData)
    axios.get('./cityData.json')
    .then(res => {
        cityData.value = res.data
    })
}