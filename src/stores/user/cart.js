import { defineStore } from 'pinia'

export const useUserCartStore = defineStore('user-cart', {
  state: () => ({
    items: []
  }),
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
      this.items[index].quantity = quantity
      localStorage.setItem('cart-item', JSON.stringify(this.items))
    }
  }
})