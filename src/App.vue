<script setup>
import { onMounted } from 'vue'
import { RouterView } from 'vue-router'
import { collection, getDocs } from 'firebase/firestore/lite'

import { db } from '@/firebase'

import { useEventStore } from '@/stores/event'
import { useProductStore } from './stores/admin/product'
import { useUserCartStore } from '@/stores/user/cart'

import Toast from '@/components/Toast.vue'

const eventStore = useEventStore()
const productStore = useProductStore()
const userCartStore = useUserCartStore()

onMounted(async () => {
  // load product when load page
  productStore.loadProduct()
  userCartStore.loadCart()

  // test connection
  const citiesCol = collection(db, 'cities')
  const citySnapshot = await getDocs(citiesCol)
  const cityList = citySnapshot.docs.map(doc => doc.data())
  console.log('cityList', cityList)
})
</script>

<template>
  <div>
    <Toast
      v-if="eventStore.alert"
      :status="eventStore.data.status"
      :message="eventStore.data.message"
    >
    </Toast>
    <RouterView />
  </div>
</template>
