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
    <div class="hero min-h-screen bg-base-200">
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