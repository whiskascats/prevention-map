import { defineStore } from 'pinia'

export const useUserData = defineStore({
  id: 'Data',
  state: () => ({
    type: '',
    maskData: [],
    quickData: [],
    filterData: [],
    cityData: [],
    chooseCounty: '',
    chooseTown: ''
  }),
  actions: {
   reset() {
     this.$state.filterData = []
     this.$state.chooseCity = ''
     this.$state.chooseTown = ''
   }
  }
})