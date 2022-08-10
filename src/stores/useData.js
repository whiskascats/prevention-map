import { defineStore } from 'pinia'

export const useUserData = defineStore({
  id: 'Data',
  state: () => ({
    maskData: [],
    quickData: [],
    filterData: [],
    cityData: []
  }),
//   actions: {
   
//   }
})