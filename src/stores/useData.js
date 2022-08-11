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
    cacheCounty: '',
    chooseTown: '',
    cacheTown: ''
  }),
  actions: {
    reset() {
      this.$state.type == 'mask' ? this.$state.type = 'quick' : this.$state.type = 'mask'
      this.$state.filterData = []
      this.$state.chooseCounty = ''
      this.$state.cacheCounty = ''
      this.$state.chooseTown = ''
      this.$state.cacheTown = ''
    }
  }
})