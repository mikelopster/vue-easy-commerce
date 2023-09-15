<script setup>
import { onMounted } from 'vue'
import { RouterView } from 'vue-router'

import { useEventStore } from '@/stores/event'
import { useProductStore } from './stores/admin/product'

import Toast from '@/components/Toast.vue'

const eventStore = useEventStore()
const productStore = useProductStore()

onMounted(() => {
  // load product when load page
  productStore.loadProduct()
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
