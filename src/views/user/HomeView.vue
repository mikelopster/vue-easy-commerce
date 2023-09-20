<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'

import { useUserProductStore } from '@/stores/user/product'
import { useUserCartStore } from '@/stores/user/cart'

import UserLayout from '@/layouts/UserLayout.vue'
import ProductList from '@/components/ProductList.vue'

const userProductStore = useUserProductStore()
const userCartStore = useUserCartStore()

const router = useRouter()

onMounted(() => {
  userProductStore.loadProduct()
})

const addToCart = (productData) => {
  userCartStore.addToCart(productData)
  router.push({ name: 'cart' })
}
</script>

<template>
  <UserLayout>
    <div class="hero h-96 bg-base-200 bg-image">
      <div class="hero-content text-center">
        <div class="max-w-md">
          <h1 class="text-5xl font-bold">Hello to shop</h1>
          <p class="py-6">Trust your intuition</p>
        </div>
      </div>
    </div>
    <ProductList
      :products="userProductStore.list"
      :addToCart="addToCart"
    >
    </ProductList>
  </UserLayout>
</template>

<style scoped>
.bg-image {
  background-image: url('https://firebasestorage.googleapis.com/v0/b/mikelopster.appspot.com/o/mikelopster-assets%2Fimages%2Fsarah-dorweiler-x2Tmfd1-SgA-unsplash.jpg?alt=media&token=59c90f4b-e815-4051-829c-77b94c251bef')
}
</style>