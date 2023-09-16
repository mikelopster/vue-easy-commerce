<script setup>
import { useProductStore } from '@/stores/admin/product'
import { useEventStore } from '@/stores/event'

import { RouterLink } from 'vue-router'

import AdminLayout from '@/layouts/AdminLayout.vue'
import TrashIcon from '@/components/icons/Trash.vue'
import EditIcon from '@/components/icons/Edit.vue'

const productStore = useProductStore()
const eventStore = useEventStore()

const removeProduct = (index) => {
  productStore.removeProduct(index)
  eventStore.popupMessage('success', 'DELETE Successful!')
}
</script>
<template>
  <AdminLayout>
    <div class="flex-1  pt-8 px-6 bg-base-100">
      <div class="card w-full p-6 mt-2">
        <div class="text-xl font-semibold inline-block">
          Product
          <div class="inline-block float-right">
            <div class="inline-block float-right">
              <RouterLink
                to="/admin/products/create"
                class="btn px-6 btn-sm normal-case btn-primary"
              >
                Add New
              </RouterLink>
            </div>
          </div>
        </div>
        <div class="divider mt-2"></div>
        <div class="h-full w-full pb-6 bg-base-100">
          <div class="overflow-x-auto w-full">
            <table class="table w-full">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Image</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Status</th>
                  <th>Updated At</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(product, index) in productStore.list" :key="index">
                  <td>
                    <div class="font-bold">{{ product.name }}</div>
                  </td>
                  <td>
                    <div class="mask mask-squircle w-12 h-12">
                      <img :src="product.imageUrl" />
                    </div>
                  </td>
                  <td>{{ product.price }}</td>
                  <td>{{ product.remainQuantity }} / {{ product.quantity }}</td>
                  <td>
                    <div class="badge" :class="product.status === 'open' ? 'badge-success' : 'badge-error'">
                      {{ product.status }}
                    </div>
                  </td>
                  <td>{{ product.updatedAt }}</td>
                  <td>
                    <RouterLink :to="{ name: 'admin-products-update', params: { id: index } }">
                      <button class="btn btn-square btn-ghost">
                        <EditIcon></EditIcon>
                      </button>
                    </RouterLink>
                    <button @click="removeProduct(index)" class="btn btn-square btn-ghost">
                      <TrashIcon></TrashIcon>
                    </button>
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
