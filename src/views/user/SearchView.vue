<script setup>
import { ref, watch, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import ProductList from '@/components/ProductList.vue'
import UserLayout from '@/layouts/UserLayout.vue'

import { useUserProductStore } from '@/stores/user/product'
import { useUserCartStore } from '@/stores/user/cart'

const userProductStore = useUserProductStore()
const userCartStore = useUserCartStore()

const route = useRoute()
const router = useRouter()

const searchText = ref('')
const filterProducts = ref([])

watch(() => route.query.q, (newSearchText) => {
  searchText.value = newSearchText
  filterProducts.value = userProductStore.filterProducts(searchText.value)
}, { immediate: true })

const addToCart = (productData) => {
  userCartStore.addToCart(productData)
  router.push({ name: 'cart' })
}
</script>

<template>
  <UserLayout>
    <div class="m-10">
      <h1 class="text-3xl">Search: <span class="font-bold">{{ searchText }}</span></h1>
    </div>
    <div v-if="filterProducts.length > 0">
      <ProductList
        :products="filterProducts"
        :addToCart="addToCart"
      >
      </ProductList>
    </div>
    <div class="m-10" v-else>
      <div class="text-center text-3xl">Product not found</div>
    </div>
  </UserLayout>
</template>