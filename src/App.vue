<script setup>
import { RouterView } from 'vue-router'
import { useEventStore } from '@/stores/event'

import Toast from '@/components/Toast.vue'

const eventStore = useEventStore()
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
