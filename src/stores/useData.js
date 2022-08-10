import { defineStore } from 'pinia'

export const useUserData = defineStore({
  id: 'Data',
  state: () => ({
    type: '',
    maskData: [],
    quickData: [],
    filterData: [],
    cityData: []
  }),
//   actions: {
   
//   }
})