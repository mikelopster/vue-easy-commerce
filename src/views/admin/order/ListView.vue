<script setup>
import { onMounted } from 'vue'
import { RouterLink } from 'vue-router'

import { useOrderStore } from '@/stores/admin/order'
import AdminLayout from '@/layouts/AdminLayout.vue'

const orderStore = useOrderStore()

onMounted(async () => {
  await orderStore.loadOrder()
})
</script>

<template>
  <AdminLayout>
    <div class="flex-1  pt-8 px-6 bg-base-100">
      <div class="card w-full p-6 mt-2">
        <div class="text-xl font-semibold inline-block">
          Order
        </div>
        <div class="divider mt-2"></div>
        <div class="h-full w-full pb-6 bg-base-100">
          <div class="overflow-x-auto w-full">
            <table class="table w-full">
              <thead>
                <tr>
                  <th>Customer Name</th>
                  <th>Price</th>
                  <th>Status</th>
                  <th>Updated At</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(order, index) in orderStore.list" :key="index">
                  <td>
                    <div class="font-bold">
                      {{ order.name }}
                    </div>
                  </td>
                  <td>{{ order.totalPrice }} ฿</td>
                  <td>
                    <div class="badge">
                      {{ order.status }}
                    </div>
                  </td>
                  <td>{{ order.createdAt }}</td>
                  <td>
                    <RouterLink :to="{ name: 'admin-order-detail', params: { id: order.orderId }}">
                      <button class="btn">
                        See detail
                      </button>
                    </RouterLink>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </AdminLayout>
</template>