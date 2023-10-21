import { defineStore } from 'pinia'

import {
  collection,
  getDocs,
  doc,
  getDoc
} from 'firebase/firestore'

import { db } from '@/firebase'

export const useOrderStore = defineStore('order', {
  state: () => ({
    list: []
  }),
  actions: {
    async loadOrder () {
      const orderRef = collection(db, 'orders')
      const orderSnapshot = await getDocs(orderRef)
      const orderList = orderSnapshot.docs.map(doc => {
        let convertedData = doc.data()
        convertedData.createdAt = convertedData.createdAt.toDate()
        convertedData.orderId = doc.id
        return convertedData
      })
      this.list = orderList
    },
    async getOrder (orderId) {
      try {
        const orderRef = doc(db, 'orders', orderId)
        const orderSnapshot = await getDoc(orderRef)
        return orderSnapshot.data()
      } catch (error) {
        console.log('error', error)
      }
    }
  }
})