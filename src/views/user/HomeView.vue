<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'

import { useUserProductStore } from '@/stores/user/product'
import { useUserCartStore } from '@/stores/user/cart'

import UserLayout from '@/layouts/UserLayout.vue'

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
    <div class="grid grid-cols-4 gap-6 m-10">
      <div v-for="(product, index) in userProductStore.list" class="card w-full bg-base-100 shadow-xl" :key="index">
        <figure>
          <img class="w-full" :src="product.imageUrl" alt="Shoes" />
        </figure>
        <div class="card-body">
          <h2 class="card-title">{{ product.name }}</h2>
          <p>{{ product.about }}</p>
          <div class="card-actions justify-end">
            <button @click="addToCart(product)" class="btn btn-primary">Buy Now</button>
          </div>
        </div>
      </div>
    </div>
  </UserLayout>
</template>