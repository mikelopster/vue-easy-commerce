<script setup>
import { ref, computed, onMounted } from 'vue'
import { RouterLink } from 'vue-router'

import { useProductStore } from '@/stores/admin/product'
import { useEventStore } from '@/stores/event'

import AdminLayout from '@/layouts/AdminLayout.vue'
import TrashIcon from '@/components/icons/Trash.vue'
import EditIcon from '@/components/icons/Edit.vue'
import Pagination from '@/components/Pagination.vue'

const productStore = useProductStore()
const eventStore = useEventStore()

onMounted(async () => {
  await productStore.loadProduct()
})

const search = async () => {
  await productStore.loadProduct()
}

const changePage = async (page) => {
  const mode = page > productStore.page.activePage ? 'next' : 'previous'
  productStore.page.activePage = page
  await productStore.loadNextProduct(mode)
}

const removeProduct = async (index) => {
  try {
    await productStore.removeProduct(productStore.list[index].uid)
    await productStore.loadProduct()
    eventStore.popupMessage('success', 'DELETE Successful!')
  } catch (error) {
    console.log('error', error)
  }
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
        <div class="flex justify-between">
          <div class="flex-1">
            <input v-model="productStore.search.text" placeholder="Type here" class="input input-bordered w-full" />
          </div>
          <div class="flex-1 ml-2">
            Updated at
            <div class="btn-group">
              <button
                class="btn"
                :class="productStore.search.sort === 'asc' ? 'btn-active' : ''"
                @click="productStore.changeSortOrder('asc')">
                ASC
              </button>
              <button
                class="btn"
                :class="productStore.search.sort === 'desc' ? 'btn-active' : ''"
                @click="productStore.changeSortOrder('desc')">
                DESC
              </button>
            </div>
          </div>
          <div class="flex-1 ml-2">
            Status
            <div class="btn-group">
              <button
                class="btn"
                :class="productStore.search.status === 'open' ? 'btn-active' : ''"
                @click="productStore.changeFilterStatus('open')">
                open
              </button>
              <button
                class="btn"
                :class="productStore.search.status === 'close' ? 'btn-active' : ''"
                @click="productStore.changeFilterStatus('close')">
                close
              </button>
            </div>
          </div>
          <div class="flex-1">
            <button class="btn" @click="search">Search</button>
          </div>
        </div>
        <div class="h-full w-full pb-6 bg-base-100 mt-2">
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
                    <RouterLink :to="{ name: 'admin-products-update', params: { id: product.uid } }">
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
            <Pagination
              :maxPage="productStore.totalPage"
              :activePage="productStore.page.activePage"
              :changePage="changePage"
            ></Pagination>
          </div>
        </div>
      </div>
    </div>
  </AdminLayout>
</template>
