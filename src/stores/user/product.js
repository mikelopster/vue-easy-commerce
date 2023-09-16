import { defineStore } from 'pinia'

export const useUserProductStore = defineStore('user-product', {
  state: () => ({
    list: []
  }),
  actions: {
    loadProduct () {
      const productList = localStorage.getItem('product-data')
      if (productList) {
        this.list = JSON.parse(productList)
      }
    }
  }
})