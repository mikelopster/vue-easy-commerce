<script setup>
import { onMounted , ref } from 'vue'
import { useRoute } from 'vue-router'
import { useOrderStore } from '@/stores/admin/order'

import AdminLayout from '@/layouts/AdminLayout.vue'

const route = useRoute()
const orderStore = useOrderStore()

const orderId = ref(-1)
let orderData = ref({
  products: []
})

onMounted(async () => {
  if (route.params.id) {
    orderId.value = route.params.id
    orderData.value = await orderStore.getOrder(orderId.value)
  }
})
</script>

<template>
  <AdminLayout>
    <div class="flex pt-8 px-6">
      <div class="card w-full p-6 bg-base-100 shadow-xl">
        <div>
          <h1 class="text-3xl font-bold">Order detail id: {{ orderId }}</h1>
        </div>
        <div class="divider"></div>
        <div class="flex mb-2">
          <div class="flex-1">
            <div class="font-bold">Order date</div>
            <div>{{ orderData.updatedAt }}</div>
          </div>
          <div class="flex-1">
            <div class="font-bold">Order Number</div>
            <div>{{ orderData.no }}</div>
          </div>
        </div>
        <div class="flex">
          <div class="flex-1">
            <div class="font-bold">Payment method</div>
            <div>{{ orderData.paymentMethod }}</div>
          </div>
          <div class="flex-1">
            <div class="font-bold">Address</div>
            <div>{{ orderData.address }}</div>
          </div>
        </div>
        <div class="divider"></div>
        <div v-for="(product, index) in orderData.products" class="flex items-center my-2" :key="index">
          <div>
            <img
              class="w-24"
              :src="product.imageUrl"
            />
          </div>
          <div class="flex-1 ml-4">
            <div class="font-bold">{{ product.name }}</div>
            <div>{{ product.description }}</div>
          </div>
          <div class="flex-1">จำนวน {{ product.quantity }} ชิ้น</div>
          <div>{{ product.price }} ฿</div>
        </div>
        <div class="divider"></div>
        <div class="flex align-middle justify-between mb-2">
          <div class="font-bold">ราคาสินค้าทั้งหมด</div>
          <div>{{ orderData.totalPrice }} ฿</div>
        </div>
        <div class="flex justify-end">
          <RouterLink to="/admin/orders" class="btn btn-ghost">
            Back
          </RouterLink>
        </div>
      </div>
    </div>
  </AdminLayout>
</template>
