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
    cacheTown: '',
    slidebar: false
  }),
  actions: {
    reset() {
      this.$state.slidebar = true
      this.$state.type == 'mask' ? this.$state.type = 'quick' : this.$state.type = 'mask'
      this.$state.filterData = []
      this.$state.chooseCounty = ''
      this.$state.cacheCounty = ''
      this.$state.chooseTown = ''
      this.$state.cacheTown = ''
      setTimeout(() => {
        this.$state.slidebar = false
      }, 800);
    }
  }
})