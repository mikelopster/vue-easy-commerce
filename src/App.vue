<script setup>
import { onMounted } from 'vue'
import { RouterView } from 'vue-router'
import { useEventStore } from '@/stores/event'
import { useUserCartStore } from '@/stores/user/cart'

import Toast from '@/components/Toast.vue'

const eventStore = useEventStore()
const userCartStore = useUserCartStore()

onMounted(async () => {
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
