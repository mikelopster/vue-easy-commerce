import { defineStore } from 'pinia'

export const useUserProductStore = defineStore('user-product', {
  state: () => ({
    list: [],
    loaded: false
  }),
  actions: {
    loadProduct () {
      const productList = localStorage.getItem('product-data')
      if (productList) {
        this.list = JSON.parse(productList)
      }
      this.loaded = true
    },
    filterProducts (searchName) {
      if (!this.loaded) {
        this.loadProduct()
      }
      return this.list.filter(product => product.name.includes(searchName))
    }
  }
})