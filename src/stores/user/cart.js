import { defineStore } from 'pinia'

import {
  doc,
  increment,
  updateDoc,
  writeBatch
} from 'firebase/firestore'

import { db } from '@/firebase'

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
    }
  },
  actions: {
    loadCart () {
      const cartItem = localStorage.getItem('cart-item')
      if (cartItem) {
        this.items = JSON.parse(cartItem)
      }
    },
    addToCart (productData) {
      const itemIndex = this.items.findIndex(
        item => item.name === productData.name
      )
      if (itemIndex >= 0) {
        this.updateQuantity(itemIndex, this.items[itemIndex].quantity + 1)
      } else {
        productData.quantity = 1
        this.items.push(productData)
      }
      localStorage.setItem('cart-item', JSON.stringify(this.items))
    },
    updateQuantity (index, quantity) {
      this.items[index].quantity = parseInt(quantity)
      localStorage.setItem('cart-item', JSON.stringify(this.items))
    },
    removeItemInCart (index) {
      this.items.splice(index, 1)
      localStorage.setItem('cart-item', JSON.stringify(this.items))
    },
    async checkout (checkoutData) {
      try {
        let checkout = {
          ...checkoutData,
          totalPrice: this.summaryPrice,
          paymentMethod: 'Credit Card',
          createdAt: (new Date()).toLocaleString(),
          orderNumber: `AA${(Math.floor(Math.random() * 900000) + 100000).toString()}`,
          products: this.items
        }

        console.log(checkout.products)

        const batch = writeBatch(db)
        // workaround (update stock = checkout complete), not write order
        for (const product of checkout.products) {
          const productRef = doc(db, 'products', product.productId)
          batch.update(productRef, {
            remainQuantity: increment(-1)
          })
        }
        await batch.commit()

        localStorage.setItem('checkout-data', JSON.stringify(checkout))
      } catch (error) {
        console.log('error', error.code)
        throw new Error('out of stock')
      }
    },
    loadCheckout () {
      let checkoutData = localStorage.getItem('checkout-data')
      if (checkoutData) {
        this.checkout = JSON.parse(checkoutData)
      }
    }
  }
})