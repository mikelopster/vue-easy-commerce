import { defineStore } from 'pinia'

export const useProductStore = defineStore('product', {
  state: () => ({
    list: []
  }),
  actions: {
    loadProduct () {
      const productList = localStorage.getItem('product-data')
      if (productList) {
        this.list = JSON.parse(productList)
      }
    },
    getProduct (index) {
      return this.list[index]
    },
    addProduct (productData) {
      productData.remainQuantity = productData.quantity
      this.list.push(productData)
      // save to localstorage
      localStorage.setItem('product-data', JSON.stringify(this.list))
    },
    updateProduct (index, productData) {
      this.list[index].name = productData.name
      this.list[index].imageUrl = productData.imageUrl
      this.list[index].quantity = productData.quantity
      this.list[index].remainQuantity = productData.quantity
      this.list[index].status = productData.status
      this.list[index].updatedAt = (new Date).toLocaleString()
      // save to localstorage
      localStorage.setItem('product-data', JSON.stringify(this.list))
    },
    removeProduct (index) {
      this.list.splice(index, 1)
      // save to localstorage
      localStorage.setItem('product-data', JSON.stringify(this.list))
    }
  }
})