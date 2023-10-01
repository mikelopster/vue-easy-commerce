<script setup>
import { onMounted } from 'vue'
import { RouterView } from 'vue-router'
import { useEventStore } from '@/stores/event'
import { useProductStore } from './stores/admin/product'
import { useUserCartStore } from '@/stores/user/cart'

import Toast from '@/components/Toast.vue'

const eventStore = useEventStore()
const productStore = useProductStore()
const userCartStore = useUserCartStore()

onMounted(async () => {
  // load product when load page
  await productStore.loadProduct()
  userCartStore.loadCart()
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
