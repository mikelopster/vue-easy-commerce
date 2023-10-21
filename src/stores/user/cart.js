import { defineStore } from 'pinia'
import axios from 'axios'

import {
  collection,
  getDocs,
  doc,
  getDoc
} from 'firebase/firestore'

import {
  db,
  realtimeDB
} from '@/firebase'

import {
  ref,
  set,
  onValue
} from 'firebase/database'

import { useAccountStore } from '@/stores/account'

Omise.setPublicKey(import.meta.env.VITE_OMISE_PUBLIC_KEY)

const createSource = (amount) => {
  return new Promise((resolve, reject) => {
    Omise.createSource('rabbit_linepay', {
      amount: (amount * 100),
      currency: 'THB'
    }, (statusCode, response) => {
      if (statusCode !== 200) {
        return reject(response)
      }
      resolve(response)
    })
  })
}

export const useUserCartStore = defineStore('user-cart', {
  state: () => ({
    items: [],
    checkout: {}
  }),
  getters: {
    summaryPrice (state) {
      return state.items.reduce((acc, item) => acc + (item.price * item.quantity), 0)
    },
    quantity (state) {
      return state.items.reduce((acc, item) => acc + item.quantity, 0)
    },
    user (state) {
      const accountStore = useAccountStore()
      return accountStore.user
    },
    cartRef (state) {
      return ref(realtimeDB, `carts/${this.user.uid}`)
    }
  },
  actions: {
    loadCart () {
      if (this.user.uid) {
        onValue(this.cartRef, (snapshot) => {
          const data = snapshot.val()
          this.items = data || []
        })
      } else {
        const cartItem = localStorage.getItem('cart-item')
        if (cartItem) {
          this.items = JSON.parse(cartItem)
        }
      }
    },
    async addToCart (productData) {
      const itemIndex = this.items.findIndex(
        item => item.name === productData.name
      )
      if (itemIndex >= 0) {
        this.updateQuantity(itemIndex, this.items[itemIndex].quantity + 1)
      } else {
        productData.quantity = 1
        this.items.push(productData)
      }

      await set(this.cartRef, this.items)
      localStorage.setItem('cart-item', JSON.stringify(this.items))
    },
    async updateQuantity (index, quantity) {
      this.items[index].quantity = parseInt(quantity)
      await set(this.cartRef, this.items)
      localStorage.setItem('cart-item', JSON.stringify(this.items))
    },
    async removeItemInCart (index) {
      this.items.splice(index, 1)
      await set(this.cartRef, this.items)
      localStorage.setItem('cart-item', JSON.stringify(this.items))
    },
    async checkout (checkoutData) {
      try {
        let checkout = {
          ...checkoutData,
          products: this.items.map(product => ({
            productId: product.productId,
            quantity: product.quantity
          }))
        }

        const omiseResponse = await createSource(this.summaryPrice)
        const sourceId = omiseResponse.id

        const response = await axios.post('/api/placeorder', {
          source: sourceId,
          checkout
        }, {
          headers: {
            'Authorization': this.user.accessToken
          }
        })
        return response.data
      } catch (error) {
        console.log('error', error.code)
        throw new Error('out of stock')
      }
    },
    async loadCheckout (orderId) {
      try {
        console.log(orderId)
        const orderRef = doc(db, 'orders', orderId)
        const docSnap = await getDoc(orderRef)
        let checkoutData = docSnap.data()
        checkoutData.orderNumber = orderId
        checkoutData.createdAt = checkoutData.createdAt.toDate()
        console.log(checkoutData)
        this.checkout = checkoutData
      } catch (error) {
        console.log('error', error)
      }
    }
  }
})