import { defineStore } from 'pinia'

import {
  collection,
  getDocs,
  query,
  where
} from 'firebase/firestore'

import { db } from '@/firebase'

export const useUserProductStore = defineStore('user-product', {
  state: () => ({
    list: [],
    loaded: false,
    page: 1,
    limit: 2
  }),
  actions: {
    async loadProduct () {
      const productsCol = query(collection(db, 'products'), where('status', '==', 'open'))
      const productSnapshop = await getDocs(productsCol)
      const productList = productSnapshop.docs.map(doc => ({
        productId: doc.id,
        ...doc.data()
      }))
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