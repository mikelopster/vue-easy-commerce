import { defineStore } from 'pinia'

import { collection, getDocs } from 'firebase/firestore/lite'

import { db } from '@/firebase'

export const useUserProductStore = defineStore('user-product', {
  state: () => ({
    list: [],
    loaded: false
  }),
  actions: {
    async loadProduct () {
      const productsCol = collection(db, 'products')
      const productSnapshop = await getDocs(productsCol)
      const productList = productSnapshop.docs.map(doc => doc.data())
      if (productList && productList.length > 0) {
        this.list = productList
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